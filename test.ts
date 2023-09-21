Названия базовых компонентов​
Базовые компоненты (также известные как презентационные, немые или чистые компоненты), которые применяют стили и соглашения, специфичные для приложения, должны начинаться с определенного префикса, например Base, Appили V.

Детальное объяснение
Плохой

components/
|- MyButton.vue
|- VueTable.vue
|- Icon.vue
Хороший

components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue

components/
|- AppButton.vue
|- AppTable.vue
|- AppIcon.vue

components/
|- VButton.vue
|- VTable.vue
|- VIcon.vue
