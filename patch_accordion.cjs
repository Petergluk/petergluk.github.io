const fs = require('fs');

let content = fs.readFileSync('src/pages/[slug].astro', 'utf8');

// Replace the accordion rendering
content = content.replace(
	/\{\(block\.items \|\| \[\]\)\.map\(\(item: any, i: number\) => \([\s\S]*?<\/Accordion>\n\t\t\t\t\t\t\t\)\)\}/m,
	`<Accordion items={(block.items || []).map((item: any, i: number) => ({
		id: \`faq-\${index}-\${i}\`,
		title: item.title,
		content: item.content ? marked.parse(item.content) : '',
		defaultOpen: i === 0
	}))} />`
);

fs.writeFileSync('src/pages/[slug].astro', content);
console.log("Patched accordion");
