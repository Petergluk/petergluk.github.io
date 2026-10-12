const fs = require('fs');

let code = fs.readFileSync('src/pages/classes/[category].astro', 'utf8');

// We want to extract 'laboratoriya' class if it exists and render it separately.
const injection = `
				<div class="prose intro">
					<p>{category.description}</p>
				</div>

				{category.id === 'dyhanie' && (() => {
					const lab = category.classes.find(c => c.id === 'laboratoriya');
					if (!lab) return null;
					return (
						<div class="lab-section">
							<div class="section-head">
								<span class="eyebrow">Большой курс</span>
								<h2>Онлайн-ретрит на 5 недель</h2>
								<p class="muted" style="margin-top: 1rem; max-width: 800px; font-size: 1.05rem;">
									Важно: ниже представлены отдельные, разовые мастер-классы (каждый содержит по одной практике на 1,5-2 часа). А "Лаборатория дыхания" — это большой онлайн-ретрит, который длится 5 недель и включает в себя более 40 практик, в том числе всё то, что даётся на коротких мастер-классах, но системно и глубоко.
								</p>
							</div>
							
							<a class="card class-item-horiz lab-card" href="/laboratoriya-dyhaniya/">
								<div class="card-cover-horiz" style="background-image: url('/images/defolt/bg_01.jpg'); background-size: cover; background-position: center;" />
								<div class="class-content">
									<h3 style="font-size: 1.8rem; margin-bottom: 1rem; color: var(--accent);">{lab.title}</h3>
									<div class="muted class-desc" set:html={lab.description} />
									<span class="link-label">Узнать подробности &rarr;</span>
								</div>
							</a>
						</div>
					);
				})()}

				<div class="classes-list">
					<h2 style={category.id === 'dyhanie' ? 'margin-top: 4rem;' : ''}>
						{category.id === 'dyhanie' ? 'Разовые мастер-классы' : 'Мастер-классы в этом направлении'}
					</h2>
					<div class="classes-grid">
						{
							category.classes.filter(c => c.id !== 'laboratoriya').map((cls, i) => (
`;

code = code.replace(`
				<div class="prose intro">
					<p>{category.description}</p>
				</div>

				<div class="classes-list">
					<h2>Мастер-классы в этом направлении</h2>
					<div class="classes-grid">
						{
							category.classes.map((cls, i) => (
`, injection);

if (!code.includes('.lab-section {')) {
	code = code.replace('</style>', `
	.lab-section {
		margin-bottom: 4rem;
		padding-bottom: 4rem;
		border-bottom: 1px solid var(--line);
	}
	.lab-card {
		border: 2px solid var(--accent-soft);
		background: var(--paper-warm);
	}
	.lab-card:hover {
		border-color: var(--accent);
	}
</style>`);
}

fs.writeFileSync('src/pages/classes/[category].astro', code);
