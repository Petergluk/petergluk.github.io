const fs = require('fs');

function patchFile(path) {
	let content = fs.readFileSync(path, 'utf8');

	// Remove date
	content = content.replace(/\{\s*formatDate\(post\.frontmatter\.date\)[\s\S]*?<\/p>\s*\)\s*\}/g, '');
	
	// Remove tags block
	content = content.replace(/\{\s*\(post\.frontmatter\.tags \?\? \[\]\)\.length > 0[\s\S]*?<\/p>\s*\)\s*\}/g, '');
	
	// Remove Читать →
	content = content.replace(/<p><span class="arrow">Читать →<\/span><\/p>/g, '');
	
	// Change h3 styling to be larger and bold, maybe by adding a specific class or inline style
	// Let's add class="post-title" and define it in style, or just add a style attribute
	content = content.replace(/<h3>\{post\.frontmatter\.title \?\? 'Без названия'\}<\/h3>/g, '<h3 style="font-size: 1.6rem; margin-top: 1rem; margin-bottom: 0.5rem; line-height: 1.2;">{post.frontmatter.title ?? \'Без названия\'}</h3>');

	fs.writeFileSync(path, content);
	console.log("Patched " + path);
}

patchFile('src/pages/texts/index.astro');
patchFile('src/pages/classes/[category]/[class].astro');
