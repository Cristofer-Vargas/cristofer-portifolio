# Portfólio — Cristofer Vargas de Santis

Portfólio pessoal desenvolvido em **HTML5**, **CSS3** e **JavaScript (ES6+)** com arquitetura modular por componentes e camadas, otimizado para **SEO**, metadados Open Graph/Twitter, JSON-LD e estética pixel-art/retro, utilizando **Live Server** e **Commitizen + Semantic Release** para integração contínua no GitHub.

## Estrutura do Projeto

- `index.html` — Página principal compilada a partir de `src/pages/index.template.html` e dos parciais HTML em `src/components/` (`npm run build`).
- `scripts/build-html.mjs` — Compositor estático sem dependências externas que gera o `index.html` mantendo todo o conteúdo acessível para mecanismos de busca.
- `src/pages/index.template.html` — Template raiz com metadados de SEO, Open Graph, Twitter Cards, Favicons e JSON-LD (`Person`, `WebSite`, `ItemList`).
- `src/components/` — Famílias de componentes (`header`, `hero`, `about`, `timeline`, `projects`, `technologies`, `contact`, `footer`) com HTML e CSS isolados.
- `src/styles/` — Design tokens (`tokens.css`), estilos base (`base.css`), primitivos reutilizáveis (`primitives.css`) e ponto de entrada (`main.css`).
- `src/js/` — Arquitetura em camadas com ES Modules:
  - `data/` — Fontes de dados (`projects.data.js`, `technologies.data.js`).
  - `services/` — Serviços compartilhados (`dom.service.js`, `clipboard.service.js`, `scroll.service.js`, `cardReflection.service.js`).
  - `components/` — Controladores de UI (`header`, `carousel`, `modal`, `technologies`, `contact`, `backToTop`).
  - `app.js` — Inicializador da aplicação.
- `assets/images/` & `assets/icons/` — Retrato (`perfil.png`), cenário pixel-art (`hero-castle.jpg`), imagem de compartilhamento Open Graph (`og-cover.png`) e favicons (`favicon.svg`, `favicon-32x32.png`, `apple-touch-icon.png`).
- `robots.txt`, `sitemap.xml` e `site.webmanifest` — Arquivos de indexação e manifesto web.
- `.czrc` / `commitlint.config.cjs` / `.releaserc.json` / `.github/workflows/release.yml` — Fluxo Commitizen + Commitlint + Semantic Release.

## Visualização Local e Build de HTML

Recompilar o `index.html` a partir dos componentes e iniciar o servidor local (`live-server`):

```powershell
npm run dev
```

Para apenas gerar o `index.html` após editar algum arquivo em `src/components/**/*.html` ou `src/pages/index.template.html`:

```powershell
npm run build
```

## Fluxo com Commitizen e Semantic Release

Para criar commits padronizados de forma interativa:

```powershell
npm run commit
```

Para simular o `semantic-release` localmente antes de enviar ao GitHub:

```powershell
npm run release:dry-run
```
