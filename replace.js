const fs = require('fs');

let content = fs.readFileSync('src/pages/classes/index.astro', 'utf8');

// Replace top matter
content = content.replace(
  "const categories = categoriesData.categories;",
  "const categories = categoriesData.categories;\n\nconst group1 = categories.filter(c => ['smysly', 'chuvstva', 'telo'].includes(c.id));\nconst group2 = categories.filter(c => ['dyhanie', 'tishina'].includes(c.id));\nconst group3 = categories.filter(c => ['prikosnovenie', 'embodiment', 'otnosheniya'].includes(c.id));"
);

// Replace the single section block with the three section blocks
const oldSection = `		<!-- Основные направления (8 категорий) -->
		<section class="band">
			<div class="wrap">
				<div class="section-head">
					<span class="eyebrow">Архитектура смыслов</span>
					<h2>Направления работы</h2>
					<p class="muted">
						Выберите интересующее направление, чтобы посмотреть расписание и программы.
					</p>
				</div>
				<div class="grid grid-auto">
					{
						categories.map((cat, i) => (
							<a class="card cat-card" href={\`/classes/\${cat.id}/\`}>
								{cat.image ? (
									<div class="card-cover" style={\`background-image: url('\${cat.image}'); background-size: cover; background-position: center;\`} />
								) : (
									<div class={\`card-cover watercolor watercolor-\${(i % 3) + 1}\`} />
								)}
								<h3>{cat.title}</h3>
								<p class="muted">{cat.subtitle}</p>
								<p class="link-label"><span class="arrow">Подробнее →</span></p>
							</a>
						))
					}
				</div>
			</div>
		</section>`;

const newSections = `		<!-- Блок 1: Смыслы, Чувства, Тело -->
		<section class="band">
			<div class="wrap">
				<div class="section-head">
					<span class="eyebrow">Архитектура смыслов</span>
					<h2>Основа практики</h2>
					<p class="muted">
						Смыслы, чувства и телесность как фундамент контакта с собой.
					</p>
				</div>
				<div class="grid grid-3">
					{
						group1.map((cat, i) => (
							<a class="card cat-card" href={\`/classes/\${cat.id}/\`}>
								{cat.image ? (
									<div class="card-cover" style={\`background-image: url('\${cat.image}'); background-size: cover; background-position: center;\`} />
								) : (
									<div class={\`card-cover watercolor watercolor-\${(i % 3) + 1}\`} />
								)}
								<h3>{cat.title}</h3>
								<p class="muted">{cat.subtitle}</p>
								<p class="link-label"><span class="arrow">Подробнее →</span></p>
							</a>
						))
					}
				</div>
			</div>
		</section>

		<!-- Блок 2: Дыхание, Тишина -->
		<section class="band band-warm">
			<div class="wrap">
				<div class="section-head">
					<span class="eyebrow">Тонкая настройка</span>
					<h2>Состояния и внимание</h2>
					<p class="muted">
						Практики глубокого покоя, управления вниманием и жизненной энергией.
					</p>
				</div>
				<div class="grid grid-2">
					{
						group2.map((cat, i) => (
							<a class="card cat-card" href={\`/classes/\${cat.id}/\`}>
								{cat.image ? (
									<div class="card-cover" style={\`background-image: url('\${cat.image}'); background-size: cover; background-position: center;\`} />
								) : (
									<div class={\`card-cover watercolor watercolor-\${(i % 3) + 2}\`} />
								)}
								<h3>{cat.title}</h3>
								<p class="muted">{cat.subtitle}</p>
								<p class="link-label"><span class="arrow">Подробнее →</span></p>
							</a>
						))
					}
				</div>
			</div>
		</section>

		<!-- Блок 3: Прикосновение, Эмбодимент, Отношения -->
		<section class="band">
			<div class="wrap">
				<div class="section-head">
					<span class="eyebrow">Взаимодействие</span>
					<h2>Контакт и проявление</h2>
					<p class="muted">
						Как мы выражаем себя в мире, строим отношения и передаем состояния.
					</p>
				</div>
				<div class="grid grid-3">
					{
						group3.map((cat, i) => (
							<a class="card cat-card" href={\`/classes/\${cat.id}/\`}>
								{cat.image ? (
									<div class="card-cover" style={\`background-image: url('\${cat.image}'); background-size: cover; background-position: center;\`} />
								) : (
									<div class={\`card-cover watercolor watercolor-\${(i % 3) + 3}\`} />
								)}
								<h3>{cat.title}</h3>
								<p class="muted">{cat.subtitle}</p>
								<p class="link-label"><span class="arrow">Подробнее →</span></p>
							</a>
						))
					}
				</div>
			</div>
		</section>`;

content = content.replace(oldSection, newSections);

// Also increase font size of h3
content = content.replace("font-size: 1.35rem;", "font-size: 1.6rem;");

fs.writeFileSync('src/pages/classes/index.astro', content);
