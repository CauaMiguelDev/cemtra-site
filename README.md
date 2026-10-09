# CEMTRA – Medicina do Trabalho

Site institucional da CEMTRA (Centro Especializado em Medicina do Trabalho), em Brasília. Feito com HTML, CSS e JavaScript puros, sem etapa de build.

**Site no ar:** https://cauamigueldev.github.io/cemtra-site/

**Demo da animação de rolagem:** https://cauamigueldev.github.io/cemtra-site/animacao-scroll/

## Rodar localmente

A animação do hero carrega 300 quadros com `fetch`, então é preciso servir a pasta por HTTP. Abrir o `index.html` direto pelo navegador (`file://`) bloqueia o carregamento dos quadros.

```bash
python -m http.server 8000
```

Depois abra http://localhost:8000

## Estrutura

- `index.html`: página única (hero, serviços, unidades, perguntas frequentes e contato).
- `styles.css`: estilos do site.
- `main.js`: interações, revelações e navegação.
- `hero-tour.js`: animação do hero em sequência de quadros, decodificada numa Web Worker.
- `animacao-scroll/`: demo independente da animação de rolagem.
- `assets/`: imagens, fontes, quadros do hero (`tour/frames`) e bibliotecas em `vendor/` (GSAP, ScrollTrigger, SplitText e Lenis).

## Publicação

O site é publicado com GitHub Pages a partir da branch `main`, pasta raiz.
