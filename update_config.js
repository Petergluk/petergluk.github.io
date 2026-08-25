const fs = require('fs');
const yaml = require('yaml'); // Need to check if yaml is installed, if not, I will just append text

const text = fs.readFileSync('public/admin/config.yml', 'utf8');
const appended = text + `
          - label: "Текст с картинкой"
            name: "image_text"
            widget: "object"
            fields:
              - { label: "Надзаголовок", name: "eyebrow", widget: "string", required: false }
              - { label: "Заголовок блока", name: "title", widget: "string", required: false }
              - { label: "Текст", name: "content", widget: "markdown" }
              - { label: "Картинка", name: "image", widget: "image", required: false }
              - { label: "Картинка справа?", name: "image_right", widget: "boolean", default: true, required: false }
              - { label: "Серый фон?", name: "warm_bg", widget: "boolean", default: false, required: false }
          - label: "Аккордеон (FAQ / Программа)"
            name: "accordion"
            widget: "object"
            fields:
              - { label: "Надзаголовок", name: "eyebrow", widget: "string", required: false }
              - { label: "Заголовок блока", name: "title", widget: "string", required: false }
              - { label: "Серый фон?", name: "warm_bg", widget: "boolean", default: false, required: false }
              - label: "Пункты (Вопрос - Ответ)"
                name: "items"
                widget: "list"
                fields:
                  - { label: "Заголовок (Вопрос)", name: "title", widget: "string" }
                  - { label: "Текст (Ответ)", name: "content", widget: "markdown" }
          - label: "Отзывы"
            name: "reviews"
            widget: "object"
            fields:
              - { label: "Надзаголовок", name: "eyebrow", widget: "string", required: false }
              - { label: "Заголовок блока", name: "title", widget: "string", required: false }
              - { label: "Серый фон?", name: "warm_bg", widget: "boolean", default: false, required: false }
              - label: "Отзывы"
                name: "items"
                widget: "list"
                fields:
                  - { label: "Автор", name: "author", widget: "string" }
                  - { label: "Регалии", name: "subtitle", widget: "string", required: false }
                  - { label: "Текст отзыва", name: "text", widget: "text" }
          - label: "Видео"
            name: "video"
            widget: "object"
            fields:
              - { label: "Надзаголовок", name: "eyebrow", widget: "string", required: false }
              - { label: "Заголовок блока", name: "title", widget: "string", required: false }
              - { label: "URL видео (YouTube/Vimeo)", name: "url", widget: "string" }
              - { label: "Серый фон?", name: "warm_bg", widget: "boolean", default: false, required: false }
          - label: "Вставка кода (HTML/Форма)"
            name: "html"
            widget: "object"
            fields:
              - { label: "Надзаголовок", name: "eyebrow", widget: "string", required: false }
              - { label: "Заголовок блока", name: "title", widget: "string", required: false }
              - { label: "HTML Код", name: "code", widget: "code", required: false }
              - { label: "Серый фон?", name: "warm_bg", widget: "boolean", default: false, required: false }
`;
fs.writeFileSync('public/admin/config.yml', appended);
console.log("Appended blocks to config.yml");
