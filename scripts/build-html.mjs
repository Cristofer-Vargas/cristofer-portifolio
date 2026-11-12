import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const templatePath = path.join(rootDir, 'src', 'pages', 'index.template.html');
const componentsDir = path.join(rootDir, 'src', 'components');
const outPath = path.join(rootDir, 'index.html');

const template = fs.readFileSync(templatePath, 'utf8');

const compiled = template.replace(/^([ \t]*)\{\{component:([a-z0-9-]+)\}\}/gm, (_, indent, name) => {
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

const banner = '<!-- Generated from src/pages/index.template.html & src/components/**/*.html (npm run build) -->\n';
fs.writeFileSync(outPath, `${banner}${compiled}`, 'utf8');
console.log(`Built ${path.relative(rootDir, outPath)} successfully.`);
