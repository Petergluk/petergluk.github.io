const fs = require('fs');
let file = fs.readFileSync('src/pages/texts/index.astro', 'utf8');

file = file.replace(/<script>([\s\S]*?)<\/script>/, `<script>
document.addEventListener('astro:page-load', () => {
$1
});
</script>`);

fs.writeFileSync('src/pages/texts/index.astro', file);
