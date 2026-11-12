# Portfólio — Cristofer Vargas de Santis

Portfólio de desenvolvimento back-end com foco em C#, .NET, APIs REST e bancos de dados relacionais. O site reúne projetos pessoais e acadêmicos, tecnologias, formação e experiência em design gráfico.

## Desenvolvimento

- `npm ci` instala as dependências.
- `npm run dev` gera o HTML e inicia o servidor local.
- `npm run build` recompila o `index.html`.

O HTML principal é gerado a partir de `src/pages/index.template.html` e dos componentes em `src/components/`. Cada seção tem seus próprios arquivos HTML e CSS. O JavaScript acrescenta o menu compacto, os filtros dos projetos e as ilustrações em canvas. Os projetos e os links estão disponíveis no HTML.

O domínio do GitHub Pages é configurado no arquivo `CNAME`. O fluxo de versionamento usa Commitizen (`npm run commit`) e Semantic Release (`npm run release:dry-run` para simulação).
