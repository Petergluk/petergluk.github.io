const fs = require('fs');

let content = fs.readFileSync('src/layouts/Layout.astro', 'utf8');

content = content.replace("import { ClientRouter } from 'astro:transitions';\nimport '../styles/global.css';", "import { ClientRouter } from 'astro:transitions';");

content = content.replace(/document\.documentElement\.dataset\.theme = 'obsidian';\ndocument\.documentElement\.dataset\.mode = saved === 'light' \|\| saved === 'dark' \? saved : prefersDark \? 'dark' : 'light';/, "document.documentElement.dataset.theme =\n\t\t\t\t\tsaved === 'light' || saved === 'dark' ? saved : prefersDark ? 'dark' : 'light';");

content = content.replace(/root\.dataset\.mode = next;/g, "root.dataset.theme = next;");
content = content.replace(/root\.dataset\.mode === 'dark'/g, "root.dataset.theme === 'dark'");
content = content.replace(/\[data-mode='dark'\]/g, "[data-theme='dark']");

fs.writeFileSync('src/layouts/Layout.astro', content);
console.log("Reverted Layout.astro");
