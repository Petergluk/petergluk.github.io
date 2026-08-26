const fs = require('fs');

function patch(file) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Classes index
    content = content.replace(
        /<div class=\{\`card-cover watercolor watercolor-\$\{\(i % 3\) \+ 1\}\`\} \/>/g,
        '<div class="card-cover" style={`background-image: url(\'/images/defolt/bg_${String((i % 15) + 1).padStart(2, "0")}.jpg\'); background-size: cover; background-position: center;`} />'
    );
    content = content.replace(
        /<div class=\{\`card-cover watercolor watercolor-\$\{\(i % 3\) \+ 2\}\`\} \/>/g,
        '<div class="card-cover" style={`background-image: url(\'/images/defolt/bg_${String(((i + 2) % 15) + 1).padStart(2, "0")}.jpg\'); background-size: cover; background-position: center;`} />'
    );
    content = content.replace(
        /<div class=\{\`card-cover watercolor watercolor-\$\{\(i % 3\) \+ 3\}\`\} \/>/g,
        '<div class="card-cover" style={`background-image: url(\'/images/defolt/bg_${String(((i + 4) % 15) + 1).padStart(2, "0")}.jpg\'); background-size: cover; background-position: center;`} />'
    );
    
    // Category specific
    content = content.replace(
        /<div class=\{\`card-cover-horiz watercolor watercolor-\$\{\(i % 3\) \+ 1\}\`\} \/>/g,
        '<div class="card-cover-horiz" style={`background-image: url(\'/images/defolt/bg_${String((i % 15) + 1).padStart(2, "0")}.jpg\'); background-size: cover; background-position: center;`} />'
    );

    fs.writeFileSync(file, content);
}

patch('src/pages/classes/index.astro');
patch('src/pages/classes/[category].astro');
