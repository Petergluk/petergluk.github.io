const fs = require('fs');
let file = fs.readFileSync('src/pages/texts/index.astro', 'utf8');

file = file.replace(
    /\.post-card\[hidden\]\s*\{\s*display:\s*none;\s*\}/,
    '.post-card[hidden] {\n\t\tdisplay: none !important;\n\t}'
);

fs.writeFileSync('src/pages/texts/index.astro', file);
