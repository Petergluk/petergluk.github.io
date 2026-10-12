const fs = require('fs');
let file = fs.readFileSync('src/pages/[slug].astro', 'utf8');
file = file.replace(/<ScrollReveal client:visible>/g, '');
file = file.replace(/<\/ScrollReveal>/g, '');
fs.writeFileSync('src/pages/[slug].astro', file);
