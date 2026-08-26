const fs = require('fs');

let content = fs.readFileSync('src/layouts/TextLayout.astro', 'utf8');

// Change showToc logic
content = content.replace(
    'const showToc = Boolean(frontmatter.toc) && tocItems.length >= 2;',
    'const showToc = frontmatter.toc !== false && tocItems.length >= 2;'
);

// Inject image cover
const imageCoverHtml = `
				<div class="article-body">
					{(() => {
						let imgUrl = frontmatter.image;
						if (!imgUrl) {
							const defaultIdx = ((frontmatter.title || '').length % 15) + 1;
							imgUrl = \`/images/defolt/bg_\${String(defaultIdx).padStart(2, '0')}.jpg\`;
						}
						return (
							<div class="article-cover" style={\`background-image: url('\${imgUrl}'); background-size: cover; background-position: center; border-radius: var(--radius); width: 100%; height: 350px; margin-bottom: 2rem;\`} />
						);
					})()}
					<article class="prose">
`;
content = content.replace(
    '<div class="article-body">\n\					<article class="prose">',
    imageCoverHtml
);

fs.writeFileSync('src/layouts/TextLayout.astro', content);
console.log("Patched TextLayout.astro");
