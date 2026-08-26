const fs = require('fs');

let content = fs.readFileSync('src/layouts/Layout.astro', 'utf8');

// Inject the import to global CSS
if (!content.includes("import '../styles/global.css';")) {
  content = content.replace("import { ClientRouter } from 'astro:transitions';", "import { ClientRouter } from 'astro:transitions';\nimport '../styles/global.css';");
}

// Modify the inline script to use 'obsidian' as the data-theme, and 'dark' or 'light' as data-mode
content = content.replace(/document\.documentElement\.dataset\.theme =[^;]+;/, "document.documentElement.dataset.theme = 'obsidian';\ndocument.documentElement.dataset.mode = saved === 'light' || saved === 'dark' ? saved : prefersDark ? 'dark' : 'light';");

fs.writeFileSync('src/layouts/Layout.astro', content);
console.log("Patched Layout.astro");
