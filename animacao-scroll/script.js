/*
  Tour em sequência de quadros: ../assets/tour/frames/frame-0001.jpg … frame-0300.jpg (os mesmos do hero do site)
  O palco fica preso (position: sticky) e a rolagem dentro de .tour escolhe o quadro.
  Sem JS ou com prefers-reduced-motion, a página fica só com o pôster (ver styles.css).
*/
(() => {
  if (!document.documentElement.classList.contains('sequencia')) return;

  const PASTA = '../assets/tour/frames/';
  const TOTAL = 300;
  const SUAVIDADE = .075; // 0 a 1: menor = acompanha a rolagem com mais atraso macio
  // celular ou economia de dados: um quadro sim, um não (metade do download e da memória)
  const conexao = navigator.connection || {};
  const PASSO = conexao.saveData || /2g/.test(conexao.effectiveType || '') ? 2 : 1;

  const tour = document.querySelector('.tour');
  const palco = tour.querySelector('.tour__palco');
  const canvas = tour.querySelector('.tour__canvas');
  const ctx = canvas.getContext('2d');
  const barra = tour.querySelector('.tour__barra span');
  const contador = tour.querySelector('.tour__carregando span');
  const textos = [...tour.querySelectorAll('.tour__texto')];

  let alvo = 0, atual = 0, rodando = false, antes = 0;

  const numeros = [];
  for (let n = 1; n <= TOTAL; n += PASSO) numeros.push(n);
  if (numeros[numeros.length - 1] !== TOTAL) numeros.push(TOTAL);
  const ultimo = numeros.length - 1;

  /* ---------- pré-carregamento ---------- */
  const pronto = [];
  let carregados = 0;
  const conta = () => {
    carregados++;
    contador.textContent = Math.round(carregados / imagens.length * 100) + '%';
    if (carregados === imagens.length) {
      document.documentElement.classList.add('pronto');
      if (!pronto.some(Boolean)) console.warn(`Nenhum quadro encontrado em "${PASTA}".`);
    }
  };
  const imagens = numeros.map((n, i) => {
    const img = new Image();
    img.onload = () => { pronto[i] = true; if (Math.abs(i - atual) < 2) desenha(); conta(); };
    img.onerror = conta;
    img.src = `${PASTA}frame-${String(n).padStart(4, '0')}.jpg`;
    return img;
  });

  /* ---------- desenho ---------- */
  // "cover": enche o canvas inteiro sem distorcer; o excesso é cortado nas bordas
  // tela estreita (celular em pé): mostra pelo menos 45% da largura do vídeo, com o centro a 40% da altura, e as
  // faixas de cima e de baixo recebem o próprio quadro reduzido e esticado (desfoque barato), igual ao hero do site
  const fundo = document.createElement('canvas');
  const fctx = fundo.getContext('2d');
  const pinta = (img, alfa) => {
    const cw = canvas.width, ch = canvas.height, iw = img.naturalWidth, ih = img.naturalHeight;
    const s = Math.min(Math.max(cw / iw, ch / ih), cw / (.45 * iw));
    const w = iw * s, h = ih * s;
    let y = (ch - h) / 2;
    ctx.globalAlpha = alfa;
    if (h < ch) {
      y = Math.min(Math.max(ch * .4 - h / 2, 0), ch - h);
      const fs = Math.max(fundo.width / iw, fundo.height / ih);
      fctx.drawImage(img, (fundo.width - iw * fs) / 2, (fundo.height - ih * fs) / 2, iw * fs, ih * fs);
      ctx.drawImage(fundo, 0, 0, cw, ch);
      ctx.fillStyle = 'rgba(14,16,19,.35)';
      ctx.fillRect(0, 0, cw, ch);
    }
    ctx.drawImage(img, (cw - w) / 2, y, w, h);
  };
  // quadro ainda não chegou: usa o carregado mais próximo
  const maisPerto = i => {
    for (let d = 0; d <= ultimo; d++) {
      if (pronto[i - d]) return i - d;
      if (pronto[i + d]) return i + d;
    }
    return -1;
  };

  function desenha() {
    const p = atual / ultimo;
    barra.style.transform = `scaleX(${p})`;
    textos.forEach(el => el.classList.toggle('visivel', p >= +el.dataset.de && p < +el.dataset.ate));

    // um quadro inteiro por vez, como um vídeo: misturar dois quadros faz o fantasma de movimento
    const i = Math.round(atual);
    const j = pronto[i] ? i : maisPerto(i);
    if (j >= 0) pinta(imagens[j], 1);
  }

  /* ---------- rolagem ---------- */
  const progresso = () => {
    const curso = tour.offsetHeight - palco.offsetHeight;
    return curso > 0 ? Math.min(1, Math.max(0, -tour.getBoundingClientRect().top / curso)) : 0;
  };

  function passo(agora) {
    const dt = Math.min(100, Math.max(0, agora - antes));
    antes = agora;
    atual += (alvo - atual) * (1 - Math.pow(1 - SUAVIDADE, dt / 16.67)); // mesma suavidade em 60 Hz ou 120 Hz
    if (Math.abs(alvo - atual) < .005) atual = alvo;
    desenha();
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
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(palco.clientWidth * dpr);
    canvas.height = Math.round(palco.clientHeight * dpr);
    fundo.width = 32;
    fundo.height = Math.max(1, Math.round(32 * canvas.height / canvas.width));
    ctx.imageSmoothingQuality = 'high';
    desenha();
    mira();
  }

  alvo = atual = progresso() * ultimo; // abriu no meio da página (recarregar)? começa no quadro certo
  new ResizeObserver(ajusta).observe(palco);
  addEventListener('scroll', mira, { passive: true });

  // rolagem com inércia no computador (mesmo Lenis do site): a roda vira um movimento contínuo, não saltos
  if (window.Lenis && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const lenis = new Lenis({ lerp: .085, wheelMultiplier: .9 });
    const ciclo = t => { lenis.raf(t); requestAnimationFrame(ciclo); };
    requestAnimationFrame(ciclo);
  }
})();
