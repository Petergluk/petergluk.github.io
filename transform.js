import fs from 'fs';

// Read categories
let content = fs.readFileSync('src/data/categories.ts', 'utf8');

// We will just do a regex replace to add an ID based on index
let currentCategoryId = '';
let classIndex = 0;

const cyrillicToLatin = (text) => {
    const map = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
        'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c',
        'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
    };
    return text.toLowerCase().replace(/[а-яё]/g, match => map[match] || match).replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const regex = /title: '(.+?)',\n\s+description: '(.+?)',/g;
let newContent = content.replace(regex, (match, title, desc) => {
    let slug = cyrillicToLatin(title.split(' (')[0]); // Use part before parenthesis
    return `id: '${slug}',\n\t\t\t\ttitle: '${title}',\n\t\t\t\tdescription: '${desc}',\n\t\t\t\tcontent: '${desc}',`;
});

// Update the interface
newContent = newContent.replace('export interface MasterClass {\n\ttitle: string;\n\tdescription: string;\n}', 'export interface MasterClass {\n\tid: string;\n\ttitle: string;\n\tdescription: string;\n\tcontent: string;\n}');

fs.writeFileSync('src/data/categories.ts', newContent);
console.log("Done");
