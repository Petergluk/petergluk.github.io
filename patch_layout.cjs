const fs = require('fs');

let textLayout = fs.readFileSync('src/layouts/TextLayout.astro', 'utf8');
textLayout = textLayout.replace(
    /<span class="tag">\{tag\}<\/span>/g,
    '<a href={`/texts/?tag=${encodeURIComponent(tag)}`} class="tag">#{tag}</a>'
);
// Also modify the layout for index pages where we have tags if needed, but the user asked for individual texts
fs.writeFileSync('src/layouts/TextLayout.astro', textLayout);

let layout = fs.readFileSync('src/layouts/Layout.astro', 'utf8');
if (!layout.includes('a.tag {')) {
    layout = layout.replace('</style>', `
	a.tag {
		text-decoration: none;
		transition: background 0.2s, color 0.2s;
		cursor: pointer;
	}
	a.tag:hover {
		background: var(--accent);
		color: var(--on-accent);
	}
</style>`);
    fs.writeFileSync('src/layouts/Layout.astro', layout);
}
