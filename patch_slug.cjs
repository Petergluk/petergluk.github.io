const fs = require('fs');

function patch(file) {
    let content = fs.readFileSync(file, 'utf8');
    
    content = content.replace(
        /<div class=\{\`card-cover watercolor watercolor-\$\{\(i % 3\) \+ 1\}\`\} style="min-height: 160px;" \/>/g,
        '<div class="card-cover" style={`background-image: url(\'/images/defolt/bg_${String((i % 15) + 1).padStart(2, "0")}.jpg\'); background-size: cover; background-position: center; min-height: 160px;`} />'
    );

    fs.writeFileSync(file, content);
}

patch('src/pages/[slug].astro');
