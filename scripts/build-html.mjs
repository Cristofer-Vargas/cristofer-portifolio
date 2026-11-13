import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const componentsDir = path.join(rootDir, 'src', 'components');

const pages = [
  { template: 'index.template.html', output: 'index.html', usesComponents: true },
  { template: 'dsantis-food.template.html', output: 'dsantis-food.html', usesComponents: false },
];

function compileTemplate(templatePath, usesComponents) {
  const template = fs.readFileSync(templatePath, 'utf8');
  if (!usesComponents) return template;

  return template.replace(/^([ \t]*)\{\{component:([a-z0-9-]+)\}\}/gm, (_, indent, name) => {
    const partialPath = path.join(componentsDir, name, `${name}.html`);
    if (!fs.existsSync(partialPath)) {
      throw new Error(`Missing HTML component partial: ${partialPath}`);
    }

    const partial = fs.readFileSync(partialPath, 'utf8').trimEnd();
    return partial
      .split(/\r?\n/)
      .map((line) => (line.length > 0 ? `${indent}${line}` : ''))
      .join('\n');
  });
}

for (const page of pages) {
  const templatePath = path.join(rootDir, 'src', 'pages', page.template);
  const outPath = path.join(rootDir, page.output);
  const compiled = compileTemplate(templatePath, page.usesComponents);
  const banner = `<!-- Generated from src/pages/${page.template}${page.usesComponents ? ' & src/components/**/*.html' : ''} (npm run build) -->\n`;
  fs.writeFileSync(outPath, `${banner}${compiled}`, 'utf8');
  console.log(`Built ${path.relative(rootDir, outPath)} successfully.`);
}
