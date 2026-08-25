const fs = require('fs');

let content = fs.readFileSync('src/pages/[slug].astro', 'utf8');

const newBlocks = `
			if (block.type === 'image_text') {
				return (
					<section class={\`band \${block.warm_bg ? 'band-warm' : ''}\`}>
						<div class="wrap">
							<div style={\`display: grid; gap: 3rem; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); align-items: center;\`}>
								<div style={block.image_right ? 'order: 1;' : 'order: 2;'}>
									{block.eyebrow && <span class="eyebrow">{block.eyebrow}</span>}
									{block.title && <h2 style="margin-top: 0;">{block.title}</h2>}
									<div class="prose" set:html={block.content ? marked.parse(block.content) : ''} />
								</div>
								{block.image && (
									<div style={block.image_right ? 'order: 2;' : 'order: 1;'}>
										<img src={block.image} alt={block.title || ''} style="width: 100%; border-radius: var(--radius); box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);" />
									</div>
								)}
							</div>
						</div>
					</section>
				);
			}

			if (block.type === 'accordion') {
				return (
					<section class={\`band \${block.warm_bg ? 'band-warm' : ''}\`}>
						<div class="wrap" style="max-width: 800px; margin: 0 auto;">
							{(block.eyebrow || block.title) && (
								<div class="section-head">
									{block.eyebrow && <span class="eyebrow">{block.eyebrow}</span>}
									{block.title && <h2>{block.title}</h2>}
								</div>
							)}
							<div class="accordion-list" style="display: flex; flex-direction: column; gap: 1rem;">
								{(block.items || []).map((item: any) => (
									<details style="background: var(--bg); border: 1px solid var(--line); border-radius: var(--radius); padding: 1rem 1.5rem;">
										<summary style="font-size: 1.1rem; font-weight: 500; cursor: pointer; list-style-position: inside;">{item.title}</summary>
										<div style="margin-top: 1rem; color: var(--ink-dim);" set:html={item.content ? marked.parse(item.content) : ''} />
									</details>
								))}
							</div>
						</div>
					</section>
				);
			}

			if (block.type === 'video') {
				return (
					<section class={\`band \${block.warm_bg ? 'band-warm' : ''}\`}>
						<div class="wrap" style="max-width: 900px; margin: 0 auto; text-align: center;">
							{(block.eyebrow || block.title) && (
								<div class="section-head">
									{block.eyebrow && <span class="eyebrow">{block.eyebrow}</span>}
									{block.title && <h2>{block.title}</h2>}
								</div>
							)}
							<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: var(--radius); background: #000;">
								<iframe src={block.url} style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe>
							</div>
						</div>
					</section>
				);
			}

			if (block.type === 'reviews') {
				return (
					<section class={\`band \${block.warm_bg ? 'band-warm' : ''}\`}>
						<div class="wrap">
							{(block.eyebrow || block.title) && (
								<div class="section-head">
									{block.eyebrow && <span class="eyebrow">{block.eyebrow}</span>}
									{block.title && <h2>{block.title}</h2>}
								</div>
							)}
							<div style="display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
								{(block.items || []).map((item: any) => (
									<div class="card" style="padding: 2rem; display: flex; flex-direction: column;">
										<p style="font-size: 1.1rem; line-height: 1.6; font-style: italic; margin-bottom: 1.5rem; flex-grow: 1;">"{item.text}"</p>
										<div>
											<strong>{item.author}</strong>
											{item.subtitle && <div class="muted" style="font-size: 0.9rem; margin-top: 0.25rem;">{item.subtitle}</div>}
										</div>
									</div>
								))}
							</div>
						</div>
					</section>
				);
			}

			if (block.type === 'html') {
				return (
					<section class={\`band \${block.warm_bg ? 'band-warm' : ''}\`}>
						<div class="wrap" style="max-width: 800px; margin: 0 auto; text-align: center;">
							{(block.eyebrow || block.title) && (
								<div class="section-head">
									{block.eyebrow && <span class="eyebrow">{block.eyebrow}</span>}
									{block.title && <h2>{block.title}</h2>}
								</div>
							)}
							<div set:html={block.code || ''} />
						</div>
					</section>
				);
			}
`;

content = content.replace("return null;\n\t\t})}\n\t</main>", newBlocks + "\n\t\t\treturn null;\n\t\t})}\n\t</main>");

fs.writeFileSync('src/pages/[slug].astro', content);
