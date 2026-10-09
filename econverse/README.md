# Econverse — Teste Front-End

Vitrine de produtos da Econverse. React + TypeScript, empacotado com Vite.
Estilos em Sass com CSS Modules. Sem biblioteca de componentes: botão,
modal e carrossel são implementações próprias.

## Como clonar

```bash
git clone https://github.com/yyurimelo/teste-front-end.git
cd teste-front-end/econverse
npm install
```

Precisa de Node 20 ou superior (desenvolvi com Node 22).

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Dev server em http://localhost:5173 |
| `npm run build` | Checagem de tipos (`tsc -b`) + build em `dist/` |
| `npm run test` | Testes (roda uma vez e sai) |

## Testes

Vitest com Testing Library. Configuração em `vite.config.ts` (bloco
`test`) e `src/test/setup.ts`.

```bash
npm run test
```

Os testes cobrem o `useProducts` — os quatro estados que a vitrine
precisa (loading, success, error, retry), a URL que o fetch chama, e o
caso de desmontar o componente antes da resposta chegar.

O `fetch` é mockado com `vi.fn()`, então nada sai pra rede. Passar um
`Error` no mock simula a promise rejeitada, que é o cenário de CORS /
rede fora.

## Estrutura

```
econverse/
├── index.html
├── public/                    # logo, banners, ícones
└── src/
    ├── components/
    │   ├── features/          # seções da home
    │   ├── shared/header/     # top bar, busca, navegação
    │   └── ui/                # Button, Modal, Carousel, Container, icons
    ├── hooks/                 # useProducts
    ├── lib/                   # api, format, utils
    ├── styles/                # tokens, mixins, reset
    ├── test/                  # setup do Vitest
    ├── types/
    ├── App.tsx
    └── main.tsx
```

## Arquitetura

Sobre a escolha do stack: Next.js seria uma opção totalmente válida
aqui — a vitrine é uma página única, mas nada impede de montá-la com
framework. O que pesou foi o enunciado não especificar framework, e um
bundler CSR resolver o escopo com menos camadas deixa mais explícito
onde cada decisão está sendo tomada (principalmente a de CORS, que
depende de o fetch rodar no servidor ou no browser).

Comecei em Next e cheguei a montar o projeto, mas migrei para Vite
durante o desenvolvimento.

É uma SPA de página única. O `App.tsx` só monta as seções; a lógica
fica fora dele.

O caminho de um dado é: `App` → `useProducts` → `getProducts` → API. O
hook concentra os estados de loading/erro e o componente de products
só recebe `products`, `loading` e `error` como props. Assim a busca não
tem nada de UI e a UI não sabe que existe fetch.

Os componentes se dividem em três níveis:

- `ui/` — Button, Modal, Carousel, Container. Não sabem nada do
  domínio, são genéricos
- `shared/` — header, que é reutilizado em qualquer página
- `features/` — as seções da home (products, brands, categories...), que
  conhecem o domínio

Estilos por CSS Modules, um `.module.scss` por componente, sem CSS
global além do reset. As cores e o raio ficam em custom properties em
`src/styles/_tokens.scss`, então trocar a paleta é mexer em um lugar só.

## Responsividade

Mobile-first. Os breakpoints são 640, 768, 1024 e 1280px, definidos em
`src/styles/_mixins.scss` e usados como mixin:

```scss
@include breakpoint(md) {
  padding-inline: 0;
}
```

As unidades são relativas (`rem`, `%`) em vez de pixels fixos.

O `Container` centraliza e limita a 1400px, com padding lateral
crescendo no mobile e sumindo a partir de `md`. As seções que têm
grid flexível (carrossel de produtos, lista de categorias, marcas) usam
`overflow-x: auto` com scrollbar escondida — no mobile viram um
trilho horizontal rolável em vez de quebrar o layout.

O modal é o caso mais delicado: em telas estreitas ocupa
`calc(100% - 2rem)` e o conteúdo empilha (imagem acima do texto); a
partir de `sm` ele passa a ter 820px de largura máxima e as duas
colunas.

## Detalhes que talvez interessem

**Por que a URL da API é relativa.** O endpoint não envia header de
CORS, então o browser bloqueia ler a resposta de outra origem. Com Next
isso não acontece porque o fetch roda no servidor; aqui roda no browser,
então o `vite.config.ts` faz proxy de `/teste-front-end` para
`app.econverse.com.br` — o browser acha que está falando com o próprio
site. Vale notar que o proxy existe só em `dev` e `preview`: hospedar o
`dist/` num servidor estático precisaria de uma rota de API no servidor.

**Ícones.** `src/components/ui/icons.tsx` é um re-export do Phosphor.
Os imports são por subpath (`@phosphor-icons/react/Heart`) em vez do
barrel, senão o build varre os ~1500 ícones da lib. O wrapper também
injeta `aria-hidden`, que a lib não seta e os ícones aqui são todos
decorativos.

**Os SVG de `public/icons/`.** Seis deles (market, whiskey, run, tools,
hand-heart, fashion) são PNG 512×512 em base64 dentro de um `<pattern>`,
não vetores — vieram assim do Figma. Só `pc.svg` e `box-arrow.svg` são
paths de verdade.

**Modal.** `createPortal`, `role="dialog"`, `aria-modal`, fecha por
`Esc`/overlay/botão, trava o scroll e devolve o foco ao gatilho.

**Carrossel.** Scroll com CSS scroll-snap, setas que desabilitam nas pontas
e navegação por teclado. Sem Embla ou similar.