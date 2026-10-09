/*
  Hero em sequência de quadros: 300 quadros (assets/tour/frames) acompanham a rolagem da primeira tela.
  Os quadros são decodificados numa Web Worker (fora da thread principal) e só uma janela pequena fica na memória,
  perto da posição atual. O canvas desenha só quando o quadro muda.
  Sem JS, com prefers-reduced-motion ou sem canvas, o hero fica estático (pôster), ver styles.css.
*/
(() => {
  const html = document.documentElement;
  const hero = document.querySelector('[data-hero]');
  if (!hero || !html.classList.contains('tour')) return;

  const canvas = hero.querySelector('.hero__quadros');
  const cena = hero.querySelector('.hero__cena');
  if (!canvas || !canvas.getContext || !cena || !window.createImageBitmap) { html.classList.remove('tour'); return; }
  const ctx = canvas.getContext('2d', { alpha: false });
  const barra = hero.querySelector('.hero__barra span');
  const copia = hero.querySelector('.hero__conteudo');
  const legendas = [...hero.querySelectorAll('.hero__legenda')];

  const PASTA = 'assets/tour/frames/';
  const TOTAL = 300;
  const SUAVIDADE = .075;
  // celular fraco ou economia de dados: um quadro sim, um não
  const conexao = navigator.connection || {};
  const PASSO = html.classList.contains('leve') || conexao.saveData || /2g/.test(conexao.effectiveType || '') ? 2 : 1;
  // quantos quadros ficam decodificados de cada lado da posição atual (memória da placa de vídeo)
  const JANELA = navigator.deviceMemory && navigator.deviceMemory <= 4 ? 5 : 8;

  let alvo = 0, atual = 0, rodando = false, antes = 0;
  let ultimoQuadro = -1, ultimoP = -1, centro = 0;
  const numeros = [];
  for (let n = 1; n <= TOTAL; n += PASSO) numeros.push(n);
  if (numeros[numeros.length - 1] !== TOTAL) numeros.push(TOTAL);
  const ultimo = numeros.length - 1;
  const endereco = i => new URL(`${PASTA}frame-${String(numeros[i]).padStart(4, '0')}.jpg`, document.baseURI).href;

  /* ---------- decodificação fora da thread principal ---------- */
  const decodificados = new Map(); // índice -> ImageBitmap pronto para desenhar
  const falhas = new Set();
  let emCurso = -1;
  const agenda = f => (window.requestIdleCallback ? requestIdleCallback(f, { timeout: 150 }) : setTimeout(f, 0));

  // a Worker baixa e decodifica o JPEG; o ImageBitmap volta pronto (transferido, sem cópia)
  const codigoWorker = `self.onmessage = async e => {
    try {
      const resposta = await fetch(e.data.url);
      const bmp = await createImageBitmap(await resposta.blob());
      self.postMessage({ i: e.data.i, bmp }, [bmp]);
    } catch (erro) { self.postMessage({ i: e.data.i, erro: true }); }
  };`;
  let worker = null;
  try { worker = new Worker(URL.createObjectURL(new Blob([codigoWorker], { type: 'text/javascript' }))); } catch (e) { worker = null; }

  function recebe(i, bmp) {
    if (!bmp && worker && !tentouNaThread.has(i)) {
      // a Worker não conseguiu: tenta o mesmo quadro na thread principal (uma vez)
      tentouNaThread.add(i);
      fetch(endereco(i)).then(r => r.blob()).then(b => createImageBitmap(b)).then(b => recebe(i, b), () => recebe(i, null));
      return;
    }
    emCurso = -1;
    if (bmp && Math.abs(i - centro) <= JANELA) {
      decodificados.set(i, bmp);
      desenha(true);
      if (!hero.classList.contains('pronto')) hero.classList.add('pronto');
    } else if (bmp) bmp.close();
    else falhas.add(i);
    agenda(proximo);
  }
  const tentouNaThread = new Set();

  if (worker) worker.onmessage = e => recebe(e.data.i, e.data.erro ? null : e.data.bmp);

  // mantém na memória só a janela ao redor do centro
  function aquece() {
    const a = Math.max(0, centro - JANELA), b = Math.min(ultimo, centro + JANELA);
    for (const [i, bmp] of decodificados) {
      if (i < a || i > b) { bmp.close(); decodificados.delete(i); }
    }
    agenda(proximo);
  }

  // pede o quadro que falta mais perto da posição atual, um de cada vez
  function proximo() {
    if (emCurso >= 0) return;
    let escolhido = -1, dist = Infinity;
    const a = Math.max(0, centro - JANELA), b = Math.min(ultimo, centro + JANELA);
    for (let i = a; i <= b; i++) {
      if (!decodificados.has(i) && !falhas.has(i) && Math.abs(i - centro) < dist) { escolhido = i; dist = Math.abs(i - centro); }
    }
    if (escolhido < 0) return;
    emCurso = escolhido;
    if (worker) {
      worker.postMessage({ i: escolhido, url: endereco(escolhido) });
    } else {
      const i = escolhido;
      fetch(endereco(i)).then(r => r.blob()).then(b => createImageBitmap(b)).then(bmp => recebe(i, bmp), () => recebe(i, null));
    }
  }

  /* ---------- desenho ---------- */
  // "cover": enche a cena sem distorcer; o excesso é cortado nas bordas
  const pinta = bmp => {
    const s = Math.max(canvas.width / bmp.width, canvas.height / bmp.height);
    const w = bmp.width * s, h = bmp.height * s;
    ctx.drawImage(bmp, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
  };
  // o quadro decodificado mais próximo (nunca desenha um quadro que ainda não está pronto)
  const maisPerto = i => {
    for (let d = 0; d <= ultimo; d++) {
      if (decodificados.has(i - d)) return i - d;
      if (decodificados.has(i + d)) return i + d;
    }
    return -1;
  };
  const suave = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

  function desenha(forca) {
    const p = atual / ultimo;
    const i = Math.round(atual);
    centro = i;

    // um quadro inteiro por vez, e só quando o quadro muda (ou a cena foi redimensionada)
    if (forca || i !== ultimoQuadro) {
      const j = maisPerto(i);
      if (j >= 0) pinta(decodificados.get(j));
      ultimoQuadro = i;
      aquece();
    }

    // texto e barra só mudam quando o progresso muda de verdade
    if (forca || Math.abs(p - ultimoP) > .0005) {
      ultimoP = p;
      if (copia) copia.style.opacity = 1 - suave(.1, .2, p);
      legendas.forEach(el => el.classList.toggle('visivel', p >= +el.dataset.de && p < +el.dataset.ate));
      if (barra) barra.style.transform = `scaleX(${p})`;
    }
  }

  /* ---------- rolagem ---------- */
  const progresso = () => {
    const curso = hero.offsetHeight - cena.offsetHeight;
    return curso > 0 ? Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / curso)) : 0;
  };

  function passo(agora) {
    const dt = Math.min(100, Math.max(0, agora - antes));
    antes = agora;
    atual += (alvo - atual) * (1 - Math.pow(1 - SUAVIDADE, dt / 16.67));
    if (Math.abs(alvo - atual) < .005) atual = alvo;
    desenha(false);
    if (atual !== alvo) requestAnimationFrame(passo);
    else rodando = false;
  }

  function mira() {
    alvo = progresso() * ultimo;
    if (rodando) return;
    rodando = true;
    antes = performance.now();
    requestAnimationFrame(passo);
  }

  /* ---------- canvas responsivo ---------- */
  function ajusta() {
    // limite de 1.5x: acima disso o custo sobe muito e não há ganho visível na tela
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(cena.clientWidth * dpr);
    canvas.height = Math.round(cena.clientHeight * dpr);
    desenha(true);
    mira();
  }

  alvo = atual = progresso() * ultimo;
  new ResizeObserver(ajusta).observe(cena);
  addEventListener('scroll', mira, { passive: true });
  ajusta();
})();
