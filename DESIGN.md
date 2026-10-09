---
name: CEMTRA
description: Medicina do trabalho em Brasília, vestida de concreto frio, sol laranja e vidro fosco.
colors:
  sol: "#F26B1D"
  sol-claro: "#FF9147"
  sol-texto: "#C2410C"
  tinta: "#15171B"
  tinta-2: "#474C54"
  tinta-3: "#656B73"
  concreto: "#F3F4F5"
  concreto-2: "#E8EAED"
  concreto-3: "#DADDE1"
  branco: "#FFFFFF"
  noite: "#0E1013"
  linha: "rgba(21, 23, 27, .09)"
  ok: "#17924F"
  erro: "#C0352B"
typography:
  display:
    fontFamily: "Urbanist, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 5.4vw, 5.25rem)"
    fontWeight: 850
    lineHeight: 0.98
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Urbanist, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 4.3vw, 3.9rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Urbanist, Segoe UI, system-ui, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Urbanist, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 500
    lineHeight: 1.6
  body-lead:
    fontFamily: "Urbanist, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.3vw, 1.1875rem)"
    fontWeight: 500
    lineHeight: 1.6
  label:
    fontFamily: "Urbanist, Segoe UI, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 750
    lineHeight: 1.2
rounded:
  lg: "28px"
  md: "20px"
  sm: "16px"
  pill: "999px"
spacing:
  pad: "clamp(18px, 4vw, 48px)"
  secao: "clamp(80px, 8.5vw, 124px)"
  nav-h: "68px"
  container: "1320px"
components:
  button-tinta:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.branco}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "54px"
  button-tinta-hover:
    backgroundColor: "{colors.sol}"
    textColor: "{colors.tinta}"
  button-vidro:
    backgroundColor: "rgba(255,255,255,.66)"
    textColor: "{colors.tinta}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "54px"
  button-contorno:
    backgroundColor: "transparent"
    textColor: "{colors.tinta}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "54px"
  button-contorno-hover:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.branco}"
  card-vidro:
    backgroundColor: "rgba(255,255,255,.72)"
    textColor: "{colors.tinta}"
    rounded: "{rounded.lg}"
    padding: "32px"
  card-vidro-noite:
    backgroundColor: "rgba(255,255,255,.05)"
    textColor: "{colors.branco}"
    rounded: "{rounded.lg}"
    padding: "28px"
  input-campo:
    backgroundColor: "rgba(255,255,255,.82)"
    textColor: "{colors.tinta}"
    rounded: "{rounded.sm}"
    padding: "16px 46px 16px 52px"
    height: "58px"
  chip-ficha:
    backgroundColor: "rgba(255,255,255,.82)"
    textColor: "{colors.tinta}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "42px"
  chip-ficha-selected:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.branco}"
  ico-bloco:
    backgroundColor: "{colors.sol}"
    textColor: "{colors.tinta}"
    rounded: "18px"
    size: "58px"
  nav-link:
    textColor: "{colors.tinta}"
    rounded: "{rounded.pill}"
    padding: "0 15px"
    height: "42px"
  nav-link-atual:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.branco}"
---

# Design System: CEMTRA

## Overview

**Creative North Star: "Brasília Modernista"**

A CEMTRA se apresenta como um edifício moderno de Brasília: concreto frio e claro, um sol laranja baixo no horizonte, vidro fosco sobre o concreto, arcos e cúpulas que emolduram fotos reais da clínica, a colunata do Alvorada na base do primeiro viewport e os azulejos de Athos Bulcão como único ornamento. O dia é a regra; a noite (silhueta do Congresso sob um céu de estrelas) é um capítulo deliberado, reservado às normas regulamentadoras e ao rodapé.

A densidade é generosa e respirada: seções com ritmo único, títulos grandes e pesados em Urbanist, corpo em peso médio com contraste alto. A matéria de toda caixa é o vidro: gradiente branco translúcido, borda clara de 1px, desfoque com saturação e uma luz laranja que segue o cursor, pintando o preenchimento e a borda. O movimento é parte do mundo (paralaxe da colunata e do sol, rotação dos azulejos sob o mouse, trilho horizontal de serviços), sempre com caminho completo sem movimento e sem JavaScript.

O mundo recusa o hero de banco de imagem com cards iguais e a placa de sinalização chapada da versão anterior (laranja em placa, LED, split-flap): nada disso volta.

**Key Characteristics:**
- Concreto frio (#F3F4F5) como chão; branco e vidro como superfície; tinta quase preta como voz.
- Um sol laranja único: acento, fundo de ícone, luz do cursor, uma seção-chamada inteira.
- Laranja como texto só no tom escuro (#C2410C), por contraste AA.
- Molduras arquitetônicas: arco (topo em pílula, base 28px) e cúpula (círculo) para fotos.
- Azulejos de Athos Bulcão: quatro desenhos (laranja, tinta, branco) que giram sob o cursor.
- Uma noite só: normas e rodapé em #0E1013 com vidro escuro.

## Colors

Concreto frio e tinta neutra carregam tudo; um único laranja-sol faz o trabalho de marca, sempre em doses contidas fora da seção-chamada.

### Primary
- **Sol de Brasília** (sol): acento único do sistema. Preenchimento de ícones em bloco, círculo de ícone dos botões, varredura de hover dos botões, ponto ativo do mapa, linha de progresso, foco de teclado (anel 2.5px), seleção de texto, luz do cursor no vidro e fundo inteiro da seção-chamada. Nunca é cor de texto sobre claro.
- **Sol Claro** (sol-claro): o brilho do sol. Realce de gradientes radiais (mega-menu, célula "Resultados on-line"), códigos de NR e ícones sobre a noite, hover de controles já laranja.
- **Laranja-Texto** (sol-texto): a única forma de laranja como texto sobre concreto ou branco: ênfase no título do hero e da declaração, hover de links, links do FAQ, assinatura da citação, ícone de campo em foco.

### Neutral
- **Tinta** (tinta): texto principal, botão primário, aba e ficha selecionadas, destaque deslizante do item atual da navegação, ícone sobre o laranja.
- **Tinta Média** (tinta-2): subtítulos, parágrafos de apoio, legendas.
- **Tinta Clara** (tinta-3): rótulos secundários, setas em repouso, contadores, notas de formulário.
- **Concreto** (concreto): fundo da página e de quase todas as seções.
- **Concreto Sombra** (concreto-2): fundo de ícone circular do FAQ, base do mapa embutido.
- **Concreto Fundo** (concreto-3): fundo do painel de azulejos, linha pontilhada do "Como funciona", trilho da barra de progresso.
- **Branco** (branco): base do vidro, cartões de logo de parceiros, célula de mapa, texto sobre a noite.
- **Noite** (noite): fundo do capítulo noturno (normas, rodapé) e base escura sob fotos.
- **Linha** (linha): divisores de 1px entre itens de lista (links de colaborador, canais de contato, menu do celular).
- **Ok / Erro** (ok, erro): só estados de formulário (campo validado, mensagem de erro, botão "pronto").

### Named Rules
**The One Sun Rule.** Existe um laranja e um só papel para ele: luz. Fora da seção-chamada, o laranja aparece em pontos (ícone, borda iluminada, código de norma, ponto ativo), nunca como cor de fundo de seção ou de cartão comum.

**The Dark Orange Text Rule.** Texto laranja sobre fundo claro usa sempre `sol-texto`. `sol` e `sol-claro` só viram texto sobre a noite.

**The Warm Wash Ceiling Rule.** Lavagens radiais de laranja nos fundos de seção ficam entre 5% e 8% de opacidade. Elas aquecem o concreto; não o colorem.

## Typography

**Display Font:** Urbanist (variável 300–900, auto-hospedada; com Segoe UI, system-ui)
**Body Font:** Urbanist (mesma família)

**Character:** Uma geométrica única, de traço modernista, usada em pesos altos (800–850) com tracking negativo nos títulos e peso 500 no corpo. A hierarquia vem de tamanho e peso, não de troca de família.

### Hierarchy
- **Display** (850, clamp(2.3rem, 5.4vw, 5.25rem), 0.98, -0.045em): título do hero, máximo 15ch, três linhas no desktop. A mesma escala volta no título da seção-chamada (clamp(2.4rem, 5.6vw, 5.25rem)).
- **Headline** (800, clamp(2.2rem, 4.3vw, 3.9rem), 1.02, -0.04em): títulos de seção, máximo 17ch, `text-wrap: balance`. A declaração "sobre" usa uma variante maior (clamp(2rem, 4.5vw, 4.25rem), 1.08) com revelação palavra a palavra.
- **Title** (800, 1.6rem–1.75rem, 1.04): títulos de cartão (serviço, passo, unidade, formulário). Portas: clamp(1.75rem, 2.6vw, 2.4rem).
- **Body** (500, 1.0625rem, 1.6): texto corrido, `text-wrap: pretty`, 44–60ch. Lead de seção em clamp(1.0625rem, 1.3vw, 1.1875rem) na Tinta Média.
- **Label** (700–750, 0.8125rem–0.9375rem): botões (750), links de navegação (650), fichas, abas, rótulos de campo, status.
- **Numerais** (850, clamp(2.2rem, 3.2vw, 3rem), -0.04em, `tabular-nums`): códigos de norma (NR-7, NR-9...) e telefones; números sempre tabulares.

### Named Rules
**The No Kicker Rule.** Nenhum sobretítulo, eyebrow ou rótulo em caixa-alta acima de títulos. O título começa a seção. Caixa-alta espaçada existe só na assinatura do logotipo e nos cabeçalhos de coluna do rodapé.

**The Heavy Voice Rule.** Títulos nunca abaixo de peso 800; corpo nunca abaixo de 500. O contraste de peso é a hierarquia.

## Layout

Contêiner de 1320px com respiro lateral fluido (`pad`). Toda seção usa o mesmo ritmo vertical (`secao`, clamp(80px, 8.5vw, 124px)); a faixa de parceiros é a única mais curta. As grades são assimétricas em pares 7/5 ou 5/7 (hero, portas, unidades, contato, como funciona), o "sobre" usa um bento de 4 colunas com linhas de 230px mínimo, e as normas uma grade de 4 colunas com linha fixa de 72px para o código e NR-1 ocupando duas colunas.

Serviços: no desktop com movimento (≥1025px) o palco é fixado e o trilho anda na horizontal; sem movimento ou abaixo disso, é um trilho com scroll-snap horizontal. O cabeçalho de "Como funciona" é sticky (top 140px) ao lado da trilha de passos.

Pontos de quebra: 1180px (navegação vira botão de menu), 1024px (grades viram uma coluna, bento em 2 colunas, normas em 2), 760px (uma coluna, `nav-h` 62px, botão flutuante vira barra inferior fixa em pílula com WhatsApp e telefone).

**The One Rhythm Rule.** Seções não inventam espaçamento vertical próprio: `padding-block: var(--secao)`. O capítulo noturno só soma a altura da silhueta do Congresso.

## Elevation & Depth

Profundidade híbrida: vidro translúcido com desfoque sobre concreto, sombras longas, difusas e negativas (spread negativo, deslocamento vertical grande), e um realce interno de 1px branco no topo de cada superfície. Sombras sob elementos laranja e fotos em arco/cúpula são quentes (marrom-laranja), nunca cinza puro. Não há sombra dura deslocada. Um grão de concreto fixo (ruído SVG, 4.5%, multiply) cobre a página.

### Shadow Vocabulary
- **Vidro em repouso** (`inset 0 1px 0 rgba(255,255,255,.95), 0 1px 2px rgba(21,23,27,.04), 0 28px 56px -32px rgba(21,23,27,.3)`): todo cartão de vidro.
- **Vidro aceso** (`inset 0 1px 0 #fff, 0 1px 2px rgba(21,23,27,.04), 0 40px 70px -34px rgba(120,45,5,.38)`): hover de cartão com ponteiro fino, junto com subida de 5px.
- **Moldura arquitetônica** (`0 0 0 10px rgba(255,255,255,.5), 0 50px 90px -40px rgba(120,45,5,.55)`): arco e cúpula; anel branco translúcido + sombra quente.
- **Bloco de sol** (`inset 0 -6px 12px rgba(160,50,0,.25), inset 0 2px 0 rgba(255,255,255,.35), 0 12px 24px -12px rgba(242,107,29,.8)`): ícone em bloco laranja e botão flutuante, volume de peça esmaltada.
- **Flutuante** (`0 18px 44px -24px rgba(21,23,27,.45)` com realce interno): navegação compacta, chips de vidro, barra móvel.

### Named Rules
**The Lit Glass Rule.** Toda caixa é vidro (`.vidro` de dia, `.vidro-noite` à noite) e toda caixa interativa acende: um gradiente radial laranja segue o cursor no preenchimento (13%) e na borda (95%, máscara de 1.5px), aparecendo em hover e em `focus-within`.

**The Warm Shadow Rule.** Sombra sob laranja ou sob foto emoldurada é quente (rgba(120,45,5) / rgba(160,50,0)); sombra sob vidro neutro é tinta.

## Shapes

A regra de forma está escrita no cabeçalho do CSS: cartões 28px, mídias internas 20px, campos 16px, botões e fichas em pílula. Arcos e cúpulas são a geometria-assinatura: o arco é `999px 999px 28px 28px` (topo em meia-lua, base reta arredondada), a cúpula é um círculo com órbita tracejada laranja. A seção-chamada tem o topo em cúpula larga (`50% 50% 0 0 / clamp(60px,10vw,150px)`). Ícones em bloco usam 18px (14px no pequeno); azulejos são quadrados retos com 3px de junta.

**The Shape Ladder Rule.** 28 → 20 → 16 → pílula, de fora para dentro. Uma caixa dentro de outra desce um degrau; nunca usa o mesmo raio do pai.

## Components

### Buttons
Peças em pílula com um círculo de ícone laranja à esquerda e uma varredura de cor que entra pela origem do cursor.
- **Shape:** pílula (999px); alturas 46 / 54 / 62px (sm / padrão / lg).
- **Primário (tinta):** fundo Tinta, texto Branco, peso 750, círculo de ícone 40px em Sol. Hover: Sol varre da esquerda (`scaleX`, 0.6s, ease expo), texto vira Tinta, círculo vira Tinta com ícone Sol e gira -12°. Na seção-chamada a varredura é branca.
- **Vidro:** branco 66% com desfoque 12px e anel interno branco; varredura branca.
- **Contorno:** anel interno 1.5px Tinta; varredura Tinta com texto Branco. **Contorno claro** (na noite): anel branco 30%, hover vira Sol Claro sem varredura.
- **Ativo:** escala 0.97. Foco: anel Sol 2.5px, offset 3px.
- **Link-seta:** texto 750 com sublinhado Sol de 2px que cresce da esquerda e seta que avança 4px.

### Chips
- **Fichas (formulário):** pílula 42px, branco 82% com anel 1px de tinta 12%; selecionada vira Tinta com texto Branco; pressão em escala 0.95.
- **Fichas de informação:** pílula estática em tinta 5% com texto Tinta Média, para atributos de serviço.
- **Abas de unidade:** pílula 42px, branco 70%; selecionada em Tinta.
- **Chips de vidro:** vidro flutuante sobre a foto do hero (nota Google, endereço com status aberto).

### Cards / Containers
- **Corner Style:** 28px (`rounded.lg`); mídias e painéis internos 20px.
- **Background:** vidro claro (gradiente branco 86%→58%, blur 18px, saturate 165%) ou vidro noturno (branco 7%→2.5%, blur 14px).
- **Shadow Strategy:** Vidro em repouso / Vidro aceso (ver Elevation & Depth).
- **Border:** 1px branco 90% (dia) ou branco 9% (noite).
- **Internal Padding:** 28–44px (clamp nas portas e no formulário).
- **Listas internas:** dentro de um cartão, itens são uma lista com divisores `linha`, nunca caixas aninhadas (links de colaborador, canais de contato).
- **Cartão-foto:** foto de fundo com gradiente noturno e um painel de vidro escuro (20px) na base. Nos serviços, o cartão-foto tem o topo em arco (`999px 999px 28px 28px`), como a arcada do Itamaraty.
- **Reflexo do vidro:** além da luz laranja, um reflexo branco (240px, 75%) segue o cursor; o ícone em bloco acompanha o ponteiro em até 10px.

### Inputs / Fields
- **Style:** 58px de altura, raio 16px, borda 1px tinta 12%, fundo branco 82%, ícone à esquerda em Tinta Clara.
- **Hover:** borda tinta 28%.
- **Focus:** fundo branco, borda Sol, halo `0 0 0 5px rgba(242,107,29,.16)` e ícone em Laranja-Texto com escala 1.12.
- **Error:** borda Erro, fundo #FFF7F6, mensagem 700 em Erro. **Válido:** selo circular Ok com check à direita.

### Navigation
- **Desktop:** barra transparente de largura total que, ao rolar, se contrai (max-width 1320→1120px, 0.8s) numa pílula de vidro flutuante. Links em pílula 42px, peso 650; um destaque deslizante acompanha o hover (tinta 6%) e marca a seção atual em Tinta com texto Branco. Esconde ao descer, volta ao subir; linha de progresso Sol de 3px no topo.
- **Mega-menu:** painel de vidro 28px com grade de serviços (ícone 48px em concreto que vira Sol e gira no hover) e um painel-sol em gradiente radial.
- **Celular (<1180px):** botão circular Tinta; o menu abre com recorte circular a partir do botão sobre concreto com brilho laranja; links grandes (800) com divisores.

### Ícones em bloco
Quadrado 58px (46px pequeno), raio 18px, em Sol com ícone duotônico Tinta/branco, volume esmaltado; variantes Tinta e noite. Giram -8° e crescem 6% quando o cartão é tocado.

### Painel de azulejos (assinatura)
Grade de azulejos de Athos Bulcão (quatro desenhos em Sol, Tinta e Branco) com juntas de 3px sobre Concreto Fundo; cada azulejo gira sob o cursor (back.out). Reaparece no bento do "sobre", na borda superior do rodapé e como textura a 7% na seção-chamada.

### Colunata e céu (assinatura)
O hero tem um sol radial laranja e a colunata do Alvorada em volume iluminado/sombreado com sombra projetada; ambos com paralaxe de rolagem e de mouse. A noite tem estrelas, um brilho laranja que segue o cursor e a silhueta do Congresso subindo com a rolagem.

### Motion
Abertura só na primeira visita da sessão (sessionStorage): o logo surge girando devagar, o nome desfoca para nítido, um brilho de sol cresce atrás e tudo se dissolve enquanto o hero se monta (cerca de 4,5 s, easings power/sine, sem expo); clique acelera; a página sempre abre no topo (scrollRestoration manual); sem JS ou com movimento reduzido não aparece. A entrada da noite tem uma curva de Niemeyer em concreto com céu de pôr do sol. A faixa de parceiros anda com a rolagem (acelera e inverte o sentido). Os códigos das normas se embaralham ao aparecer. Os cartões de serviço inclinam até 3° com a velocidade da rolagem. As letras do CEMTRA gigante sobem uma a uma. Ease padrão `cubic-bezier(.16, 1, .3, 1)` (expo out) para quase tudo; `cubic-bezier(.77, 0, .175, 1)` para o recorte do menu. Títulos revelam palavra a palavra (SplitText). Rolagem suave com Lenis. Com `prefers-reduced-motion`: sem Lenis, sem pin, revelações instantâneas, transições a 1ms; sem JS o conteúdo aparece completo.

## Do's and Don'ts

### Do:
- **Do** usar vidro (`.vidro` / `.vidro-noite`) como a matéria de toda caixa, com a luz do cursor no preenchimento e na borda.
- **Do** manter a escada de raios 28 / 20 / 16 / pílula, descendo um degrau a cada nível de aninhamento.
- **Do** usar `sol-texto` (#C2410C) para qualquer laranja em texto sobre fundo claro.
- **Do** emoldurar fotos reais da clínica em arco ou cúpula, com anel branco translúcido e sombra quente.
- **Do** usar `padding-block: var(--secao)` em toda seção nova.
- **Do** separar itens dentro de um cartão com divisores de 1px (`linha`), não com caixas internas.
- **Do** manter o contraste total do texto em estados inativos; só ícones podem esmaecer.
- **Do** usar `tabular-nums` e hífens não separáveis em códigos (NR-7, S-2220).
- **Do** dar a cada efeito de movimento um caminho estático equivalente (reduced-motion e sem JS).

- **Do** usar um rótulo por intenção em todo o site: "Agendar" (agendamento), "Pedir orçamento" (orçamento), "Tirar dúvidas" (dúvidas).

### Don't:
- **Don't** colocar sobretítulos, eyebrows ou rótulos em caixa-alta acima de títulos.
- **Don't** usar `sol` ou `sol-claro` como cor de texto sobre concreto ou branco.
- **Don't** pintar seções ou cartões comuns de laranja; o fundo laranja inteiro pertence à seção-chamada e aos dois atalhos de destaque (painel-sol do mega-menu, célula "Resultados on-line").
- **Don't** abrir um novo capítulo noturno; a noite é das normas e do rodapé.
- **Don't** aninhar cartões de vidro dentro de cartões de vidro.
- **Don't** trazer de volta a linguagem retirada: placas de sinalização chapadas, fonte LED, painel split-flap.
- **Don't** usar sombras duras deslocadas ou sombras cinzentas sob elementos laranja.
- **Don't** passar as lavagens laranja de fundo de 8% de opacidade.
