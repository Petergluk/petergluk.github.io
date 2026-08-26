const fs = require('fs');

let content = fs.readFileSync('src/pages/[slug].astro', 'utf8');

// Remove max-width and margin from all .wrap elements
content = content.replace(/<div class="wrap" style="max-width: 800px; margin: 0 auto; font-size: 1.1rem; line-height: 1.6;">/g, '<div class="wrap" style="font-size: 1.1rem; line-height: 1.6;">');
content = content.replace(/<div class="wrap" style="max-width: 800px; margin: 0 auto;">/g, '<div class="wrap">');
content = content.replace(/<div class="wrap" style="max-width: 900px; margin: 0 auto; text-align: center;">/g, '<div class="wrap" style="text-align: center;">');
content = content.replace(/<div class="wrap" style="max-width: 800px; margin: 0 auto; text-align: center;">/g, '<div class="wrap" style="text-align: center;">');

fs.writeFileSync('src/pages/[slug].astro', content);
console.log("Patched slug.astro widths");
