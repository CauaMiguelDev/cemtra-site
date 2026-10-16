# CEMTRA – Medicina do Trabalho

Site institucional da CEMTRA (Centro Especializado em Medicina do Trabalho), em Brasília. Feito com HTML, CSS e JavaScript puros, sem etapa de build.

**Site no ar:** https://cauamigueldev.github.io/cemtra-site/

## Rodar localmente

Sirva a pasta por HTTP (algumas fontes e recursos não carregam abrindo o `index.html` direto pelo navegador):

```bash
python -m http.server 8000
```

Depois abra http://localhost:8000

## Estrutura

- `index.html`: página única (hero, serviços, unidades, perguntas frequentes e contato).
- `styles.css`: estilos do site.
- `main.js`: interações, animações (GSAP) e navegação. O hero tem uma entrada animada: o sol nasce, a fachada sobe dentro do arco, o título sobe palavra a palavra e a nota do Google conta até 4,8.
- `assets/`: imagens, fontes e bibliotecas em `vendor/` (GSAP, ScrollTrigger, SplitText e Lenis).
  - `img/fachada.webp` e `img/recepcao.webp`: fachada e recepção da matriz, usadas no hero.

## Publicação

O site é publicado com GitHub Pages a partir da branch `main`, pasta raiz.
