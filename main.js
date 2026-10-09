(() => {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const html = document.documentElement;
  const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const leve = html.classList.contains('leve');
  const fino = matchMedia('(hover: hover) and (pointer: fine)').matches && !leve;
  const temGsap = !!(window.gsap && window.ScrollTrigger);

  /* =========================================================
     DADOS
     ========================================================= */
  const UNIDADES = [
    { id: 'tag', nome: 'Taguatinga', selo: 'Matriz', lat: -15.8044, lng: -48.0669,
      end: 'QND 47, Lote 08, em frente à Universal. Taguatinga, DF. CEP 72120-470.',
      wa: '5561993703306',
      rota: 'https://www.google.com/maps/search/?api=1&query=Cemtra+Centro+Esp.+em+Medicina+do+Trabalho+Taguatinga',
      mapa: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5368.589511498251!2d-48.066873099999995!3d-15.804408400000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a333899211777%3A0xe6cf59547eff8ae4!2sCemtra%20-%20Centro%20Esp.%20em%20Medicina%20do%20Trabalho!5e1!3m2!1spt-BR!2sbr!4v1757350044926!5m2!1spt-BR!2sbr' },
    { id: 'asa', nome: 'Asa Sul', lat: -15.7957, lng: -47.8849,
      end: 'Asa Sul, Brasília, DF.',
      wa: '5561993886775',
      rota: 'https://www.google.com/maps/search/?api=1&query=-15.7957459,-47.8848764',
      mapa: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5368.819197749105!2d-47.8848764!3d-15.7957459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a3ae10060fea3%3A0x6e3354e102f4c793!2sCl%C3%ADnica%20CEMTRA!5e1!3m2!1spt-BR!2sbr!4v1757350105243!5m2!1spt-BR!2sbr' },
    { id: 'sob', nome: 'Sobradinho', lat: -15.6444, lng: -47.7933,
      end: 'Sobradinho, DF.',
      wa: '5561992534533',
      rota: 'https://www.google.com/maps/search/?api=1&query=-15.6444156,-47.7932658',
      mapa: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3842.010757530247!2d-47.79326579999999!3d-15.644415599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a411cd5e63913%3A0xeb9dd60bd369c4bf!2sClinica%20Santa%20Rita%20-%20Sobradinho!5e0!3m2!1spt-BR!2sbr!4v1757350146507!5m2!1spt-BR!2sbr' },
    { id: 'agl', nome: 'Águas Lindas de Goiás', curto: 'Águas Lindas', lat: -15.7224, lng: -48.2880,
      end: 'Av. Jardim Brasília, Jardim Santa Lúcia. Águas Lindas de Goiás, GO. CEP 72910-000.',
      wa: '5561992581800',
      rota: 'https://www.google.com/maps/search/?api=1&query=-15.7224299,-48.2879671',
      mapa: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2685.379128371854!2d-48.2879671!3d-15.7224299!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935bb9024641e191%3A0x32410083e8ceb913!2sAv.%20Jardim%20Brasilia%20-%20Jardim%20Santa%20Lucia%2C%20%C3%81guas%20Lindas%20de%20Goi%C3%A1s%20-%20GO%2C%2072910-000!5e1!3m2!1spt-BR!2sbr!4v1757349779629!5m2!1spt-BR!2sbr' },
    // WhatsApp próprio pendente: o número do site antigo (55619992582301) tem um dígito a mais. Até confirmar, vai para a matriz.
    { id: 'sad', nome: 'Santo Antônio do Descoberto', curto: 'Santo Antônio', lat: -15.9460, lng: -48.2653,
      end: 'Santo Antônio do Descoberto, GO. Atendimento pelo WhatsApp da matriz.',
      wa: '5561993703306',
      rota: 'https://www.google.com/maps/search/?api=1&query=-15.9460449,-48.2653426',
      mapa: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1918.1467229654575!2d-48.2653426!3d-15.9460449!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935bdaf4e4155ab9%3A0xe455ee9273e59331!2sCl%C3%ADnica%20Santa%20Rita!5e0!3m2!1spt-BR!2sbr!4v1757350189416!5m2!1spt-BR!2sbr' }
  ];
  const waLink = (num, msg) => `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;

  /* =========================================================
     BÁSICO (funciona sem bibliotecas)
     ========================================================= */
  $$('[data-wa]').forEach(a => {
    const url = new URL(a.href);
    url.searchParams.set('text', a.dataset.wa);
    a.href = url.toString();
  });
  const ano = $('[data-ano]');
  if (ano) ano.textContent = new Date().getFullYear();

  // aberto / fechado no horário de Brasília
  const status = () => {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Sao_Paulo', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23'
    }).formatToParts(new Date()).map(x => [x.type, x.value]));
    const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday);
    const min = +p.hour * 60 + +p.minute;
    const util = dia >= 1 && dia <= 5;
    if (util && min >= 420 && min < 1020) return { aberto: true, txt: 'Aberto agora, até 17h' };
    if (util && min < 420) return { aberto: false, txt: 'Fechado, abre hoje às 7h' };
    if (dia >= 1 && dia <= 4) return { aberto: false, txt: 'Fechado, abre amanhã às 7h' };
    return { aberto: false, txt: 'Fechado, abre segunda às 7h' };
  };
  const pintaStatus = () => {
    const s = status();
    $$('[data-status]').forEach(el => { el.textContent = s.txt; el.classList.toggle('aberto', s.aberto); });
  };
  pintaStatus();
  setInterval(pintaStatus, 60000);

  /* ---------- azulejos de Athos Bulcão ---------- */
  const MOTIVOS = ['az-1', 'az-1', 'az-2', 'az-3', 'az-3', 'az-4', 'az-5', 'az-6'];
  const sorteia = arr => arr[Math.random() * arr.length | 0];
  const criaAzulejo = () => {
    const d = document.createElement('div');
    d.className = 'azulejo';
    const r = sorteia([0, 90, 180, 270]);
    d.dataset.r = r;
    d.style.transform = `rotate(${r}deg)`;
    d.innerHTML = `<svg viewBox="0 0 100 100"><use href="#${sorteia(MOTIVOS)}"/></svg>`;
    return d;
  };
  const enche = (grade, n) => {
    grade.textContent = '';
    for (let i = 0; i < n; i++) grade.appendChild(criaAzulejo());
  };
  const gira = (az, sentido = 1) => {
    const r = (+az.dataset.r || 0) + 90 * sentido;
    az.dataset.r = r;
    if (temGsap && !reduz) gsap.to(az, { rotation: r, duration: .8, ease: 'back.out(1.8)', overwrite: true });
    else az.style.transform = `rotate(${r}deg)`;
  };
  // proximidade do cursor: gira os azulejos perto do ponteiro
  const proximidade = (area, raio = 110) => {
    let ultimoX = 0;
    area.addEventListener('pointermove', e => {
      const sentido = e.clientX >= ultimoX ? 1 : -1;
      ultimoX = e.clientX;
      const agora = performance.now();
      for (const az of area.querySelectorAll('.azulejo')) {
        const r = az.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) continue;
        const dx = r.left + r.width / 2 - e.clientX, dy = r.top + r.height / 2 - e.clientY;
        if (dx * dx + dy * dy < raio * raio && agora - (+az.dataset.t || 0) > 650) {
          az.dataset.t = agora;
          gira(az, sentido);
        }
      }
    });
    area.addEventListener('click', e => { const az = e.target.closest('.azulejo'); if (az) gira(az); });
  };

  const gradeAz = $('[data-azulejos-grade]');
  const montaPainel = () => { if (gradeAz) enche(gradeAz, Math.ceil(innerWidth / 52 + 2) * 2); };
  montaPainel();
  if (gradeAz) proximidade($('[data-azulejos]'));
  const miniAz = $('.bento__azulejos');
  if (miniAz) {
    enche(miniAz, 40);
    const cel = $('[data-mini-azulejos]');
    let t;
    cel.addEventListener('pointerenter', () => { t = setInterval(() => gira(sorteia($$('.azulejo', miniAz))), 260); });
    cel.addEventListener('pointerleave', () => clearInterval(t));
  }
  const faixaAz = $('[data-faixa-azulejos]');
  if (faixaAz) { enche(faixaAz, Math.ceil(innerWidth / 46) + 4); proximidade(faixaAz, 80); }
  let larguraAz = innerWidth;
  addEventListener('resize', () => {
    if (innerWidth > larguraAz + 40) { larguraAz = innerWidth; montaPainel(); if (faixaAz) enche(faixaAz, Math.ceil(innerWidth / 46) + 4); }
  });

  /* ---------- mapa estilizado do DF ---------- */
  const proj = (lat, lng) => [(lng + 48.42) / 1.14 * 1000, (-15.42 - lat) / 0.70 * 600];
  const VB = { x: 80, y: 40, w: 940, h: 540 };
  const PLANO = [470, 318];
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs, pai) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); if (pai) pai.appendChild(n); return n; };
  const desenhaMapa = (svg, mini) => {
    svg.textContent = '';
    const g = el('g', {}, svg);
    // grade de quadras
    for (let x = 0; x <= 1000; x += 50) el('line', { x1: x, y1: 0, x2: x, y2: 600, stroke: 'rgba(21,23,27,.045)', 'stroke-width': 1 }, g);
    for (let y = 0; y <= 600; y += 50) el('line', { x1: 0, y1: y, x2: 1000, y2: y, stroke: 'rgba(21,23,27,.045)', 'stroke-width': 1 }, g);
    // limite do DF
    el('path', { d: 'M118 69H974V540H281L158 394L118 240Z', fill: 'rgba(242,107,29,.06)', stroke: 'rgba(21,23,27,.28)', 'stroke-width': 2, 'stroke-dasharray': '8 8', 'stroke-linejoin': 'round' }, g);
    if (!mini) {
      el('text', { x: 955, y: 524, 'text-anchor': 'end', 'font-size': 52, 'font-weight': 850, fill: 'rgba(21,23,27,.07)', 'font-family': 'Urbanist, sans-serif', 'letter-spacing': '-2' }, g).textContent = 'DISTRITO FEDERAL';
      el('text', { x: 92, y: 568, 'font-size': 20, 'font-weight': 800, fill: 'rgba(21,23,27,.22)', 'font-family': 'Urbanist, sans-serif', 'letter-spacing': '4' }, g).textContent = 'GOIÁS';
    }
    // Lago Paranoá
    el('path', { d: 'M505 250C530 238 560 250 572 268C590 290 612 300 606 322C600 345 572 352 556 372C545 386 520 384 514 368C508 350 528 336 522 318C516 300 492 292 492 274C492 262 497 254 505 250Z', fill: '#D9E2E8' }, g);
    // rotas a partir do Plano Piloto
    const rotas = el('g', { class: 'mapa-rotas' }, g);
    UNIDADES.forEach(u => {
      const [x, y] = proj(u.lat, u.lng);
      const cx = (PLANO[0] + x) / 2, cy = (PLANO[1] + y) / 2 - 40;
      el('path', { d: `M${PLANO[0]} ${PLANO[1]}Q${cx} ${cy} ${x} ${y}`, fill: 'none', stroke: 'rgba(21,23,27,.2)', 'stroke-width': 2.5, 'stroke-linecap': 'round', 'data-rota': u.id, pathLength: 1, 'stroke-dasharray': '1', 'stroke-dashoffset': '0' }, rotas);
    });
    // Plano Piloto: o avião de Lúcio Costa
    el('path', { d: 'M468 255Q432 318 470 372', fill: 'none', stroke: '#15171B', 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
    el('path', { d: 'M428 312L512 324', fill: 'none', stroke: '#15171B', 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
    if (mini) {
      UNIDADES.forEach(u => {
        const [x, y] = proj(u.lat, u.lng);
        el('circle', { cx: x, cy: y, r: 22, fill: 'rgba(242,107,29,.18)' }, g);
        el('circle', { cx: x, cy: y, r: 11, fill: '#F26B1D', stroke: '#fff', 'stroke-width': 5 }, g);
      });
    }
  };
  const mapaGrande = $('[data-mapa-df]');
  if (mapaGrande) { desenhaMapa(mapaGrande, false); mapaGrande.setAttribute('viewBox', VB.x + ' ' + VB.y + ' ' + VB.w + ' ' + VB.h); }
  const mapaMini = $('[data-mini-mapa]');
  if (mapaMini) { desenhaMapa(mapaMini, true); mapaMini.setAttribute('viewBox', '70 150 640 340'); mapaMini.setAttribute('preserveAspectRatio', 'xMidYMid meet'); }

  /* ---------- unidades: abas, pinos, painel ---------- */
  const abas = $('[data-unidades]');
  const pinos = $('[data-pinos]');
  const painelU = $('[data-unidade-painel]');
  const selUnidade = $('[data-select-unidade]');
  const rodapeU = $('[data-rodape-unidades]');
  let unidadeAtual = UNIDADES[0];
  const nomeCurto = u => u.curto || u.nome;

  UNIDADES.forEach((u, i) => {
    if (abas) {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'aba'; b.id = `aba-${u.id}`;
      b.setAttribute('role', 'tab'); b.setAttribute('aria-controls', 'unidade-painel');
      b.setAttribute('aria-selected', i === 0); b.tabIndex = i === 0 ? 0 : -1;
      b.dataset.u = u.id; b.textContent = nomeCurto(u);
      abas.appendChild(b);
    }
    if (pinos) {
      const [x, y] = proj(u.lat, u.lng);
      const p = document.createElement('button');
      p.type = 'button'; p.className = 'pino'; p.dataset.u = u.id; p.tabIndex = -1;
      p.setAttribute('aria-hidden', 'true');
      p.style.left = `${(x - VB.x) / VB.w * 100}%`; p.style.top = `${(y - VB.y) / VB.h * 100}%`;
      p.innerHTML = `<span class="pino__rotulo">${nomeCurto(u)}</span><span class="pino__ponto"></span>`;
      pinos.appendChild(p);
    }
    if (selUnidade) {
      const o = document.createElement('option');
      o.value = u.id; o.textContent = u.selo ? `${u.nome} (${u.selo.toLowerCase()})` : u.nome;
      selUnidade.appendChild(o);
    }
    if (rodapeU) {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${waLink(u.wa, `Olá! Gostaria de atendimento na unidade ${u.nome}.`)}" target="_blank" rel="noopener"><span>${u.nome}${u.selo ? ` <small>${u.selo.toLowerCase()}</small>` : ''}</span><svg class="i i--sm" aria-hidden="true"><use href="#b-whatsapp-logo"/></svg></a>`;
      rodapeU.appendChild(li);
    }
  });

  const selecionaUnidade = (id, foca) => {
    const u = UNIDADES.find(x => x.id === id);
    if (!u || !painelU) return;
    unidadeAtual = u;
    $$('.aba', abas).forEach(b => { const s = b.dataset.u === id; b.setAttribute('aria-selected', s); b.tabIndex = s ? 0 : -1; if (s && foca) b.focus(); });
    $$('.pino', pinos).forEach(p => p.classList.toggle('ativo', p.dataset.u === id));
    $$('[data-rota]', mapaGrande).forEach(r => {
      const s = r.dataset.rota === id;
      r.setAttribute('stroke', s ? '#F26B1D' : 'rgba(21,23,27,.2)');
      r.setAttribute('stroke-width', s ? 5 : 2.5);
      if (s && temGsap && !reduz) gsap.fromTo(r, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: 'expo.out' });
    });
    painelU.setAttribute('aria-labelledby', `aba-${id}`);
    painelU.classList.add('trocando');
    setTimeout(() => {
      $('[data-u-nome]', painelU).textContent = u.nome;
      $('[data-u-end]', painelU).textContent = u.end;
      $('[data-u-wa]', painelU).href = waLink(u.wa, `Olá! Gostaria de atendimento na unidade ${u.nome}.`);
      $('[data-u-rota]', painelU).href = u.rota;
      $('[data-u-mapa-nome]', painelU).textContent = u.nome;
      $('[data-u-mapa-link]', painelU).href = u.rota;
      painelU.classList.remove('trocando');
    }, 180);
  };
  if (painelU) {
    abas.addEventListener('click', e => { const b = e.target.closest('.aba'); if (b) selecionaUnidade(b.dataset.u); });
    abas.addEventListener('keydown', e => {
      const lista = $$('.aba', abas), i = lista.indexOf(document.activeElement);
      const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (i < 0) return;
      if (d) { e.preventDefault(); selecionaUnidade(lista[(i + d + lista.length) % lista.length].dataset.u, true); }
      if (e.key === 'Home') { e.preventDefault(); selecionaUnidade(lista[0].dataset.u, true); }
      if (e.key === 'End') { e.preventDefault(); selecionaUnidade(lista[lista.length - 1].dataset.u, true); }
    });
    pinos.addEventListener('click', e => { const p = e.target.closest('.pino'); if (p) selecionaUnidade(p.dataset.u); });
    selecionaUnidade('tag');
  }

  /* ---------- artes: a colunata sobe quando aparece ---------- */
  $$('[data-arte-colunata]').forEach(el => new IntersectionObserver((ents, io) => {
    if (ents[0].isIntersecting) { el.classList.add('visivel'); io.disconnect(); }
  }, { threshold: .2 }).observe(el));

  /* ---------- formulário → WhatsApp ---------- */
  const form = $('[data-formulario]');
  if (form) {
    const f = form.elements;
    const nome = f.nome, fone = f.telefone, msg = f.mensagem;
    const previa = $('[data-previa]'), previaU = $('[data-previa-unidade]'), contaMsg = $('[data-conta-msg]');
    const enviar = $('[data-enviar]'), enviarTxt = $('[data-enviar-txt]');
    const digitos = () => fone.value.replace(/\D/g, '');
    const regras = { nome: () => nome.value.trim().length > 1, telefone: () => !digitos().length || digitos().length >= 10 };
    const erroDe = { nome: $('#f-nome-erro'), telefone: $('#f-tel-erro') };
    const valida = c => {
      const ok = regras[c]();
      f[c].setAttribute('aria-invalid', String(!ok));
      erroDe[c].hidden = ok;
      f[c].parentElement.classList.toggle('ok', ok && f[c].value.trim() !== '');
      return ok;
    };
    ['nome', 'telefone'].forEach(c => {
      f[c].addEventListener('blur', () => { if (f[c].value.trim() || f[c].getAttribute('aria-invalid')) valida(c); });
      f[c].addEventListener('input', () => { if (f[c].getAttribute('aria-invalid') === 'true') valida(c); });
    });
    fone.addEventListener('input', () => {
      const d = digitos().slice(0, 11);
      let v = d;
      if (d.length > 2) v = `(${d.slice(0, 2)}) ${d.slice(2)}`;
      if (d.length > 6) v = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
      fone.value = v;
    });
    const unidadeForm = () => UNIDADES.find(u => u.id === f.unidade.value) || UNIDADES[0];
    const mensagem = () => [
      `Olá! Meu nome é ${nome.value.trim() || '[seu nome]'}.`,
      f.empresa.value.trim() && `Empresa: ${f.empresa.value.trim()}`,
      fone.value.trim() && `Telefone: ${fone.value.trim()}`,
      `Serviço: ${f.servico.value}`,
      `Unidade: ${unidadeForm().nome}`,
      msg.value.trim()
    ].filter(Boolean).join('\n');
    const atualiza = () => {
      previa.textContent = mensagem();
      previaU.textContent = unidadeForm().nome;
      contaMsg.textContent = `${msg.value.length}/500`;
    };
    form.addEventListener('input', atualiza);
    form.addEventListener('change', atualiza);
    atualiza();
    let estadoT;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const okN = valida('nome'), okF = valida('telefone');
      if (!okN || !okF) { (okN ? fone : nome).focus(); return; }
      window.open(waLink(unidadeForm().wa, mensagem()), '_blank', 'noopener');
      clearTimeout(estadoT);
      enviar.dataset.estado = 'abrindo'; enviarTxt.textContent = 'Abrindo o WhatsApp…';
      estadoT = setTimeout(() => {
        enviar.dataset.estado = 'pronto'; enviarTxt.textContent = 'Mensagem pronta no WhatsApp';
        estadoT = setTimeout(() => { delete enviar.dataset.estado; enviarTxt.textContent = 'Enviar pelo WhatsApp'; }, 3500);
      }, 900);
    });
  }

  /* ---------- faixa de parceiros ---------- */
  const faixa = $('[data-faixa]');
  if (faixa && !reduz) {
    const trilho = $('.faixa__trilho', faixa);
    [...trilho.children].forEach(li => { const c = li.cloneNode(true); c.setAttribute('aria-hidden', 'true'); $('img', c).alt = ''; trilho.appendChild(c); });
    faixa.classList.add('rodando');
    new IntersectionObserver(([e]) => faixa.classList.toggle('parado', !e.isIntersecting)).observe(faixa);
  }

  /* ---------- luz nas caixas (segue o cursor) e botões ---------- */
  if (fino) {
    $$('[data-card]').forEach(c => c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', `${e.clientX - r.left}px`);
      c.style.setProperty('--my', `${e.clientY - r.top}px`);
      c.style.setProperty('--px', ((e.clientX - r.left) / r.width - .5).toFixed(3));
      c.style.setProperty('--py', ((e.clientY - r.top) / r.height - .5).toFixed(3));
    }));
    $$('[data-card]').forEach(c => c.addEventListener('pointerleave', () => { c.style.setProperty('--px', 0); c.style.setProperty('--py', 0); }));
    // o laranja do botão entra pelo lado do cursor
    $$('.botao').forEach(b => {
      const lado = e => { const r = b.getBoundingClientRect(); b.style.setProperty('--origem', e.clientX < r.left + r.width / 2 ? 'left center' : 'right center'); };
      b.addEventListener('pointerenter', lado);
      b.addEventListener('pointerleave', lado);
    });
  }

  /* ---------- noite: luz do cursor no céu ---------- */
  const noite = $('[data-noite]');
  if (noite && fino && !reduz) {
    const ceu = $('[data-estrelas]', noite);
    noite.addEventListener('pointermove', e => {
      const r = noite.getBoundingClientRect();
      ceu.style.setProperty('--mx', `${e.clientX - r.left}px`);
      ceu.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  }

  /* ---------- navegação ---------- */
  const nav = $('[data-nav]');
  const navMenu = $('[data-nav-menu]');
  const luz = $('[data-nav-luz]');
  const links = $$('.nav__link');
  let atual = null, sobreLink = null;
  const poeLuz = alvo => {
    links.forEach(l => l.classList.toggle('na-luz', !sobreLink && l === alvo));
    if (!alvo || !alvo.offsetParent) { luz.classList.remove('on'); return; }
    const nr = navMenu.getBoundingClientRect(), lr = alvo.getBoundingClientRect();
    luz.style.width = `${lr.width}px`;
    luz.style.transform = `translate(${lr.left - nr.left}px, ${lr.top - nr.top}px)`;
    luz.classList.add('on');
    luz.classList.toggle('atual', !sobreLink && alvo === atual);
  };
  links.forEach(l => {
    l.addEventListener('pointerenter', () => { sobreLink = l; poeLuz(l); });
    l.addEventListener('focus', () => { sobreLink = l; poeLuz(l); });
    l.addEventListener('blur', () => { sobreLink = null; poeLuz(atual); });
  });
  navMenu.addEventListener('pointerleave', () => { sobreLink = null; poeLuz(atual); });
  addEventListener('resize', () => poeLuz(sobreLink || atual));
  const defineAtual = id => {
    atual = id === 'servicos' ? $('[data-mega-botao]') : links.find(l => l.getAttribute('href') === '#' + id) || null;
    links.forEach(l => l.removeAttribute('aria-current'));
    if (atual && atual.tagName === 'A') atual.setAttribute('aria-current', 'true');
    if (!sobreLink) poeLuz(atual);
  };

  // mega menu de serviços
  const megaBotao = $('[data-mega-botao]');
  const mega = $('[data-mega]');
  let megaT;
  const abreMega = () => {
    clearTimeout(megaT);
    if (!mega.hidden) return;
    mega.hidden = false;
    megaBotao.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => requestAnimationFrame(() => mega.classList.add('aberto')));
  };
  const fechaMega = (foca = false) => {
    clearTimeout(megaT);
    if (mega.hidden) return;
    mega.classList.remove('aberto');
    megaBotao.setAttribute('aria-expanded', 'false');
    megaT = setTimeout(() => { mega.hidden = true; }, reduz ? 0 : 200);
    if (foca) megaBotao.focus();
  };
  megaBotao.addEventListener('click', () => (megaBotao.getAttribute('aria-expanded') === 'true' ? fechaMega() : abreMega()));
  if (fino) {
    const item = megaBotao.parentElement;
    item.addEventListener('pointerenter', () => { clearTimeout(megaT); megaT = setTimeout(abreMega, 90); });
    item.addEventListener('pointerleave', () => { clearTimeout(megaT); megaT = setTimeout(() => fechaMega(), 240); });
  }
  mega.addEventListener('click', e => { if (e.target.closest('a')) fechaMega(); });
  document.addEventListener('click', e => { if (!e.target.closest('.nav__item--mega') && !mega.hidden) fechaMega(); });
  mega.addEventListener('focusout', e => { if (!megaBotao.parentElement.contains(e.relatedTarget)) fechaMega(); });

  // menu do celular
  const menu = $('[data-menu]');
  const abrir = $('[data-menu-abrir]');
  const fechar = $('[data-menu-fechar]');
  let lenis = null;
  const abreMenu = () => {
    const r = abrir.getBoundingClientRect();
    menu.style.setProperty('--cx', `${r.left + r.width / 2}px`);
    menu.style.setProperty('--cy', `${r.top + r.height / 2}px`);
    menu.hidden = false;
    abrir.setAttribute('aria-expanded', 'true');
    lenis ? lenis.stop() : (document.body.style.overflow = 'hidden');
    requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('aberto')));
    fechar.focus();
  };
  const fechaMenu = (volta = true) => {
    menu.classList.remove('aberto');
    abrir.setAttribute('aria-expanded', 'false');
    lenis ? lenis.start() : (document.body.style.overflow = '');
    setTimeout(() => { menu.hidden = true; }, reduz ? 0 : 800);
    if (volta) abrir.focus();
  };
  abrir.addEventListener('click', abreMenu);
  fechar.addEventListener('click', () => fechaMenu());
  menu.addEventListener('click', e => { if (e.target.closest('a')) fechaMenu(false); });
  menu.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const foco = $$('a, button', menu), prim = foco[0], ult = foco[foco.length - 1];
    if (e.shiftKey && document.activeElement === prim) { e.preventDefault(); ult.focus(); }
    else if (!e.shiftKey && document.activeElement === ult) { e.preventDefault(); prim.focus(); }
  });
  addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (!menu.hidden) fechaMenu();
    if (!mega.hidden) fechaMega(true);
  });

  // dúvida "o que levar": abre o item antes de rolar até ele
  $$('[data-abrir-duvida]').forEach(a => a.addEventListener('click', () => {
    const d = $(a.getAttribute('href'));
    if (d) d.open = true;
  }));

  /* ---------- sem bibliotecas ou com movimento reduzido ---------- */
  const flut = $('.flutuante');
  const barraMovel = $('.barra-movel');
  if (!temGsap || reduz) {
    html.classList.remove('carregando', 'intro');
    const ioNav = new IntersectionObserver(ents => ents.forEach(e => { if (e.isIntersecting) defineAtual(e.target.id); }), { rootMargin: '-45% 0px -50% 0px' });
    $$('main > section[id]').forEach(s => ioNav.observe(s));
    const prog = $('[data-progresso]');
    let max = 0;
    const mede = () => { max = html.scrollHeight - innerHeight; };
    mede(); addEventListener('resize', mede); addEventListener('load', mede);
    addEventListener('scroll', () => {
      nav.classList.toggle('compacto', scrollY > 60);
      prog.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      if (flut) flut.classList.toggle('escondido', scrollY < innerHeight * .7 || scrollY > max - 500);
    }, { passive: true });
    $$('[data-conta]').forEach(n => { const v = +n.dataset.conta; n.textContent = n.dataset.casas ? v.toFixed(+n.dataset.casas).replace('.', ',') : v.toLocaleString('pt-BR'); });
    return;
  }

  /* =========================================================
     MOVIMENTO (GSAP + ScrollTrigger + Lenis)
     ========================================================= */
  // espera a fonte para quebrar as linhas dos títulos com as medidas certas
  const comeca = () => {
  gsap.registerPlugin(ScrollTrigger);
  if (window.SplitText) gsap.registerPlugin(SplitText);

  // rolagem suave
  if (window.Lenis) {
    lenis = new Lenis({ lerp: .11, wheelMultiplier: 1, touchMultiplier: 1.4 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const rolaPara = (alvo, offset = -96) => {
    if (lenis) lenis.scrollTo(alvo, { offset, duration: 1.5, easing: t => 1 - Math.pow(1 - t, 4) });
    else (typeof alvo === 'number' ? scrollTo({ top: alvo, behavior: 'smooth' }) : alvo.scrollIntoView({ behavior: 'smooth' }));
  };

  // âncoras internas pela rolagem suave
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href') === '#') return;
    const id = a.getAttribute('href');
    const alvo = id === '#inicio' ? 0 : $(id);
    if (alvo === null) return;
    e.preventDefault();
    if (a.dataset.irServico) return irParaServico(a.dataset.irServico);
    rolaPara(alvo);
  });

  // topo: compacto, some ao descer, volta ao subir, progresso da página
  const prog = $('[data-progresso]');
  ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: s => {
      const y = s.scroll();
      nav.classList.toggle('compacto', y > 60);
      nav.classList.toggle('oculto', s.direction === 1 && y > 500 && menu.hidden && mega.hidden);
      if (barraMovel) barraMovel.classList.toggle('recolhida', s.direction === 1 && y > 400 && menu.hidden);
      prog.style.transform = `scaleX(${s.progress})`;
      if (flut) flut.classList.toggle('escondido', y < innerHeight * .7 || y > s.end - 600);
    }
  });
  $$('main > section[id]').forEach(sec => ScrollTrigger.create({
    trigger: sec, start: 'top 50%', end: 'bottom 50%',
    onToggle: s => { if (s.isActive) defineAtual(sec.id); }
  }));

  /* ---------- hero: entrada (cortina na primeira visita da sessão) ---------- */
  const quebra = (alvo, tipo = 'lines,words') => window.SplitText ? SplitText.create(alvo, { type: tipo, mask: 'lines', linesClass: 'linha' }) : null;
  const comecaHero = () => html.classList.remove('carregando');
  const cortina = $('.cortina');
  if (html.classList.contains('intro') && cortina && scrollY < 40) {
    (window.cemtraT || []).forEach(clearTimeout); // a cortina agora cuida da própria saída
    if (lenis) lenis.stop();
    // a marca entra sobre o concreto; o sol nasce atrás dela e a cortina sobe para mostrar o hero
    const letras = window.SplitText ? SplitText.create('.cortina__marca > span', { type: 'chars', mask: 'chars' }) : null;
    const tc = gsap.timeline({ defaults: { ease: 'expo.out' }, onComplete: () => { html.classList.remove('intro'); if (lenis) lenis.start(); ScrollTrigger.refresh(); } });
    tc.from('.cortina__marca img', { y: 16, scale: .92, opacity: 0, filter: 'blur(10px)', duration: 1.3 }, .1)
      .from(letras ? letras.chars : '.cortina__marca > span', { yPercent: 110, opacity: 0, duration: 1.1, stagger: .035 }, .4)
      .fromTo('.cortina__sol', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.8, ease: 'power2.out' }, .5)
      .to('.cortina__pular', { opacity: 0, duration: .4 }, 2.2)
      .to('.cortina__marca', { y: -14, opacity: 0, filter: 'blur(6px)', duration: .8, ease: 'power2.in' }, 2.35)
      .to('.cortina__sol', { scale: 1.2, duration: 1.2, ease: 'sine.inOut' }, 2.35)
      .add(comecaHero, 2.6)
      .to(cortina, { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, 2.7);
    cortina.addEventListener('click', () => tc.timeScale(4)); // clique em qualquer ponto ou no botão "Pular": termina mais rápido
  } else {
    html.classList.remove('intro');
    comecaHero();
  }

  /* ---------- títulos: palavras sobem de uma máscara ---------- */
  $$('[data-palavras]').forEach(h => {
    const sp = quebra(h);
    if (!sp) return;
    gsap.from(sp.words, { yPercent: 115, rotate: 4, duration: 1.1, stagger: .035, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 88%' } });
  });

  /* ---------- declaração: acende palavra por palavra ---------- */
  const decl = $('[data-declaracao]');
  if (decl && window.SplitText) {
    const sp = SplitText.create(decl, { type: 'words' });
    if (!leve) gsap.fromTo(sp.words, { opacity: .14 }, { opacity: 1, stagger: .12, ease: 'none', scrollTrigger: { trigger: decl, start: 'top 82%', end: 'bottom 42%', scrub: true } });
  }

  /* ---------- caixas: entrada em cascata ---------- */
  const caixas = $$('[data-card]').filter(c => !c.closest('.servicos__trilho') && !c.closest('.hero'));
  gsap.set(caixas, { opacity: 0, y: 70, rotationX: -12, transformPerspective: 1100, transformOrigin: '50% 100%' });
  ScrollTrigger.batch(caixas, {
    start: 'top 90%', once: true,
    onEnter: lote => gsap.to(lote, { opacity: 1, y: 0, rotationX: 0, duration: 1.2, stagger: .09, ease: 'expo.out', overwrite: true, clearProps: 'transform,opacity' })
  });
  $$('.bento__cel img').forEach(img => gsap.from(img, { scale: 1.35, duration: 1.8, ease: 'expo.out', scrollTrigger: { trigger: img.parentElement, start: 'top 88%' } }));
  $$('[data-lista]').forEach(l => gsap.from(l.children, { x: -24, opacity: 0, duration: .9, stagger: .07, ease: 'expo.out', scrollTrigger: { trigger: l, start: 'top 85%' } }));

  // inclinação 3D nas portas
  if (fino) $$('[data-tilt]').forEach(c => {
    const rx = gsap.quickTo(c, 'rotationX', { duration: .8, ease: 'power3' });
    const ry = gsap.quickTo(c, 'rotationY', { duration: .8, ease: 'power3' });
    const ty = gsap.quickTo(c, 'y', { duration: .8, ease: 'power3' });
    c.addEventListener('pointerenter', () => gsap.set(c, { transformPerspective: 1100 }));
    c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect();
      rx(-((e.clientY - r.top) / r.height - .5) * 7);
      ry(((e.clientX - r.left) / r.width - .5) * 9);
      ty(-6);
    });
    c.addEventListener('pointerleave', () => { rx(0); ry(0); ty(0); });
  });

  // botões magnéticos
  if (fino) $$('[data-ima]').forEach(b => {
    const mx = gsap.quickTo(b, 'x', { duration: .6, ease: 'power3' });
    const my = gsap.quickTo(b, 'y', { duration: .6, ease: 'power3' });
    b.addEventListener('pointermove', e => {
      const r = b.getBoundingClientRect();
      mx(((e.clientX - r.left) / r.width - .5) * 14);
      my(((e.clientY - r.top) / r.height - .5) * 12);
    });
    b.addEventListener('pointerleave', () => { mx(0); my(0); });
  });

  /* ---------- paralaxe das fotos ---------- */
  if (!leve) $$('[data-paralaxe]').forEach(img => {
    const v = +img.dataset.paralaxe || 8;
    gsap.fromTo(img, { yPercent: -v }, { yPercent: v, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  gsap.from('[data-cupula]', { scale: .8, rotation: -8, ease: 'expo.out', duration: 1.6, scrollTrigger: { trigger: '[data-cupula]', start: 'top 85%' } });
  if (!leve) gsap.to('[data-prof-scroll]', { yPercent: -40, ease: 'none', scrollTrigger: { trigger: '.mental', start: 'top bottom', end: 'bottom top', scrub: true } });
  if (!leve) gsap.fromTo('[data-congresso]', { yPercent: 30 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '[data-noite]', start: 'top bottom', end: 'bottom bottom', scrub: true } });
  if (!leve) gsap.fromTo('[data-chamada-sol]', { yPercent: 30, scale: .7 }, { yPercent: -10, scale: 1.05, ease: 'none', scrollTrigger: { trigger: '[data-chamada]', start: 'top bottom', end: 'bottom bottom', scrub: true } });

  /* ---------- normas: o código se embaralha ao aparecer ---------- */
  const embaralha = (el, atraso) => {
    const final = el.textContent, abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let q = 0;
    setTimeout(function passo() {
      q++;
      el.textContent = [...final].map((ch, k) => (ch === '-' || q > 5 + k * 2) ? ch : abc[Math.random() * abc.length | 0]).join('');
      if (q < 6 + final.length * 2) setTimeout(passo, 40); else el.textContent = final;
    }, atraso);
  };
  ScrollTrigger.create({ trigger: '.normas', start: 'top 80%', once: true, onEnter: () => $$('.norma__cod').forEach((c, i) => embaralha(c, 250 + i * 90)) });

  /* ---------- parceiros: a faixa responde à rolagem ---------- */
  const faixaEl = $('[data-faixa]');
  if (faixaEl) {
    faixaEl.classList.remove('rodando');
    const tr = $('.faixa__trilho', faixaEl);
    let pos = 0, extra = 0, dir = 1, vendo = false, devagar = false;
    new IntersectionObserver(([e]) => { vendo = e.isIntersecting; }).observe(faixaEl);
    faixaEl.addEventListener('pointerenter', () => { devagar = true; });
    faixaEl.addEventListener('pointerleave', () => { devagar = false; });
    ScrollTrigger.create({ trigger: faixaEl, start: 'top bottom', end: 'bottom top', onUpdate: st => { dir = st.direction; extra = Math.min(700, Math.abs(st.getVelocity()) * .35); } });
    gsap.ticker.add((t, dt) => {
      if (!vendo) return;
      const meio = tr.scrollWidth / 2;
      pos -= ((devagar ? 12 : 46) + extra) * dir * dt / 1000;
      extra *= .93;
      if (pos <= -meio) pos += meio;
      if (pos > 0) pos -= meio;
      tr.style.transform = `translate3d(${pos.toFixed(2)}px, 0, 0)`;
    });
  }

  /* ---------- números que contam ---------- */
  $$('[data-conta]').forEach(n => {
    const alvo = +n.dataset.conta, casas = +n.dataset.casas || 0, obj = { v: 0 };
    const fmt = v => casas ? v.toFixed(casas).replace('.', ',') : Math.round(v).toLocaleString('pt-BR');
    n.textContent = fmt(0);
    gsap.to(obj, { v: alvo, duration: 2, ease: 'expo.out', onUpdate: () => { n.textContent = fmt(obj.v); }, scrollTrigger: { trigger: n, start: 'top 90%' } });
  });

  /* ---------- painel de azulejos: a rolagem também gira ---------- */
  if (gradeAz) {
    let ultimo = 0;
    if (!leve) gsap.fromTo(gradeAz, { xPercent: -2 }, { xPercent: 2, ease: 'none', scrollTrigger: { trigger: gradeAz, start: 'top bottom', end: 'bottom top', scrub: true } });
    ScrollTrigger.create({
      trigger: gradeAz, start: 'top bottom', end: 'bottom top',
      onUpdate: s => {
        const agora = performance.now();
        if (Math.abs(s.getVelocity()) > 300 && agora - ultimo > 140) {
          ultimo = agora;
          const lista = $$('.azulejo', gradeAz);
          for (let i = 0; i < 3; i++) gira(sorteia(lista), s.direction);
        }
      }
    });
  }

  /* ---------- como funciona: a linha se desenha ---------- */
  const como = $('[data-como]');
  if (como) {
    como.classList.add('movimento');
    const linha = $('[data-linha]', como);
    linha.setAttribute('pathLength', '1');
    if (!leve) gsap.set(linha, { strokeDasharray: 1, strokeDashoffset: 1 });
    if (!leve) gsap.to(linha, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.como__trilha', start: 'top 62%', end: 'bottom 62%', scrub: true } });
    $$('[data-passo]', como).forEach(p => ScrollTrigger.create({
      trigger: p, start: 'top 64%',
      onEnter: () => p.classList.add('ativo'), onLeaveBack: () => p.classList.remove('ativo')
    }));
  }

  /* ---------- serviços: rolagem horizontal no desktop ---------- */
  const janela = $('[data-janela]');
  const trilho = $('[data-trilho]');
  const cardsServ = $$('.servico', trilho);
  const contador = $('[data-servico-atual]');
  const barra = $('[data-servicos-barra]');
  let panST = null;
  const mm = gsap.matchMedia();
  if (!leve) mm.add('(min-width: 1025px)', () => {
    html.classList.add('pan');
    let inclina = 0, inclinaAlvo = 0;
    const inclinaTick = () => {
      inclina += (inclinaAlvo - inclina) * .12;
      inclinaAlvo *= .88;
      if (Math.abs(inclina) > .02 || Math.abs(inclinaAlvo) > .02) gsap.set(cardsServ, { skewX: inclina });
    };
    if (!leve) gsap.ticker.add(inclinaTick);
    const dist = () => Math.max(0, trilho.scrollWidth - janela.clientWidth);
    const pan = gsap.to(trilho, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: {
        trigger: '.servicos', start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 1, invalidateOnRefresh: true,
        onUpdate: s => {
          inclinaAlvo = gsap.utils.clamp(-3, 3, s.getVelocity() / -600);
          barra.style.transform = `scaleX(${s.progress})`;
          contador.textContent = Math.min(cardsServ.length, Math.round(s.progress * (cardsServ.length - 1)) + 1);
        }
      }
    });
    panST = pan.scrollTrigger;
    cardsServ.forEach(c => gsap.from(c, {
      opacity: .35, scale: .92, rotationY: -8, transformPerspective: 1400, transformOrigin: '0% 50%', ease: 'none',
      scrollTrigger: { containerAnimation: pan, trigger: c, start: 'left 100%', end: 'left 72%', scrub: true }
    }));
    return () => { gsap.ticker.remove(inclinaTick); gsap.set(cardsServ, { skewX: 0 }); html.classList.remove('pan'); panST = null; };
  });
  mm.add('(max-width: 1024px)', () => {
    let maxJanela = 0;
    const medeJanela = () => { maxJanela = janela.scrollWidth - janela.clientWidth; };
    const atualizaBarra = () => { barra.style.transform = `scaleX(${maxJanela > 0 ? janela.scrollLeft / maxJanela : 0})`; };
    medeJanela(); addEventListener('resize', () => { medeJanela(); atualizaBarra(); });
    janela.addEventListener('scroll', atualizaBarra, { passive: true });
    atualizaBarra();
    gsap.from(cardsServ, { opacity: 0, x: 60, duration: 1, stagger: .08, ease: 'expo.out', scrollTrigger: { trigger: janela, start: 'top 85%' } });
  });
  const irParaServico = id => {
    const card = cardsServ.find(c => c.dataset.servico === id);
    if (!card) return;
    const destaca = () => { card.classList.add('destaque'); setTimeout(() => card.classList.remove('destaque'), 2200); };
    if (panST) {
      const frac = Math.min(1, Math.max(0, (card.offsetLeft - (janela.clientWidth - card.offsetWidth) / 2) / (trilho.scrollWidth - janela.clientWidth)));
      rolaPara(panST.start + frac * (panST.end - panST.start), 0);
      setTimeout(destaca, 900);
    } else {
      rolaPara($('#servicos'));
      setTimeout(() => { janela.scrollTo({ left: card.offsetLeft - 20, behavior: 'smooth' }); destaca(); }, 700);
    }
  };

  /* ---------- mapa: rotas se desenham ao entrar ---------- */
  if (mapaGrande) {
    const rotas = $$('[data-rota]', mapaGrande);
    gsap.set(rotas, { strokeDashoffset: 1 });
    gsap.to(rotas, { strokeDashoffset: 0, duration: 1.4, stagger: .15, ease: 'expo.out', scrollTrigger: { trigger: mapaGrande, start: 'top 80%' } });
    gsap.from('.pino', { y: -30, opacity: 0, duration: .9, stagger: .1, ease: 'back.out(1.8)', scrollTrigger: { trigger: mapaGrande, start: 'top 75%' } });
  }

  // recalcula depois das imagens e fontes
  addEventListener('load', () => ScrollTrigger.refresh());
  };
  Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise(r => setTimeout(r, 1200))]).then(comeca);
})();
