const fs = require('fs');
let content = fs.readFileSync('src/pages/texts/index.astro', 'utf8');
content = content.replace(
    /<div class=\{\`card-cover watercolor watercolor-\$\{\(i % 3\) \+ 1\}\`\} \/>/g,
    '<div class="card-cover" style={`background-image: url(\'/images/defolt/bg_${String((i % 15) + 1).padStart(2, "0")}.jpg\'); background-size: cover; background-position: center;`} />'
);
fs.writeFileSync('src/pages/texts/index.astro', content);
