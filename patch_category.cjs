const fs = require('fs');

let content = fs.readFileSync('src/pages/classes/[category].astro', 'utf8');

// Remove Подробнее →
content = content.replace(/<p class="link-label"><span class="arrow">Подробнее →<\/span><\/p>/g, '');

// Increase font size of h3
content = content.replace(/<h3>\{cls\.title\}<\/h3>/g, '<h3 style="font-size: 1.6rem; margin-bottom: 0.8rem; line-height: 1.2;">{cls.title}</h3>');

fs.writeFileSync('src/pages/classes/[category].astro', content);
console.log("Patched category");
