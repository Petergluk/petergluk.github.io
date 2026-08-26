const fs = require('fs');

let content = fs.readFileSync('src/pages/[slug].astro', 'utf8');

if (!content.includes("import ScrollReveal")) {
  content = content.replace("import { marked } from 'marked';", "import { marked } from 'marked';\nimport ScrollReveal from '../components/ScrollReveal';");
}

content = content.replace(/return \(\n\t\t\t\t\t<section/g, 'return (\n\t\t\t\t\t<ScrollReveal client:visible>\n\t\t\t\t\t<section');
content = content.replace(/<\/section>\n\t\t\t\t\);/g, '</section>\n\t\t\t\t\t</ScrollReveal>\n\t\t\t\t);');

fs.writeFileSync('src/pages/[slug].astro', content);
console.log("Patched slug.astro with ScrollReveal");
