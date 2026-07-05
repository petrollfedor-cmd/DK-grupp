# Логика Telegram бота

## Структура

### Стейт пользователя (UserState)
```typescript
{
  mode: 'idle' | 'edit_navigation' | 'edit_hero' | 'edit_projects' | 'edit_footer';
  step: number;
  tempData: any;
}
```

### Шаги для каждого режима

#### edit_projects (добавление проекта)
- **step 10**: ввод названия → шаг 11
- **step 11**: ввод описания → шаг 12
- **step 12**: ввод фото → шаг 13
- **step 13**: подтверждение с кнопками редактирования:
  - ✏️ Название → step 14 → step 13
  - ✏️ Описание → step 15 → step 13
  - 🖼 Фото → step 16 → step 13
  - ↩️ Назад → back
  - ✅ Сохранить → confirm_add_project

#### edit_projects (редактирование существующего)
- **step 20**: меню редактирования:
  - ✏️ Название → step 21
  - 📝 Описание → step 22
  - 🖼 Фото → step 23
  - ↩️ Назад → back
  - ✅ Сохранить → proj_confirm_edit
- **step 21**: ввод нового названия → step 24
- **step 22**: ввод нового описания → step 24
- **step 23**: ввод нового фото → step 24
- **step 24**: подтверждение изменений → proj_confirm_edit

#### edit_projects (удаление)
- **proj_delete_item_X**: выбор проекта → step 12
- **confirm_delete_project**: подтверждение удаления

#### edit_projects (редактирование всего списка)
- **step 1**: ввод списка → step 2
- **step 2**: подтверждение → confirm_projects

#### edit_navigation
- **step 10**: ввод названия/ссылки → step 11
- **step 11**: подтверждение → confirm_nav_item

#### edit_hero
- **step 1**: ввод заголовка → step 2
- **step 2**: подтверждение → confirm_hero_title
- **step 3**: ввод описания → step 4
- **step 4**: подтверждение → confirm_hero_desc
- **step 5**: ввод фото → step 6
- **step 6**: подтверждение → confirm_hero_image

#### edit_footer
- **step 1**: ввод контактов → step 2
- **step 2**: подтверждение → confirm_footer_contacts

## Callback данные

### Основные
- `edit_navigation`, `edit_hero`, `edit_projects`, `edit_footer` — переход в раздел
- `stats` — статистика
- `back` — возврат в главное меню

### Навигация
- `nav_edit` — редактировать навигацию
- `nav_edit_item_X` — редактировать пункт X
- `nav_item_name`, `nav_item_name_X` — изменить название
- `nav_item_href` — изменить ссылку
- `confirm_nav_item`, `cancel_nav_item` — подтвердить/отменить

### Hero
- `hero_title`, `hero_desc`, `hero_image` — выбрать секцию
- `hero_change_title`, `hero_change_desc`, `hero_change_image` — начать изменение
- `confirm_hero_title`, `confirm_hero_desc`, `confirm_hero_image` — подтвердить
- `cancel_hero_title`, `cancel_hero_desc`, `cancel_hero_image` — отменить

### Проекты
- `proj_add` — добавить проект
- `proj_delete` — удалить проект
- `proj_delete_item_X` — выбрать проект для удаления
- `confirm_delete_project` — подтвердить удаление
- `proj_edit_item_X` — редактировать проект X
- `proj_edit_name`, `proj_edit_desc`, `proj_edit_image` — изменить поля
- `proj_confirm_edit`, `proj_cancel_edit` — подтвердить/отменить
- `proj_change` — редактировать весь список
- `confirm_projects`, `cancel_projects` — подтвердить/отменить
- `confirm_add_project`, `cancel_add_project` — подтвердить/отменить добавление
- `edit_add_title`, `edit_add_desc`, `edit_add_image` — редактировать на экране подтверждения

### Футер
- `footer_contacts` — контакты
- `footer_change_contacts` — изменить контакты
- `confirm_footer_contacts`, `cancel_footer_contacts` — подтвердить/отменить

## Функции из content.ts

- `getAllContent()` — получить все данные
- `updateNavigation(items)` — обновить навигацию
- `updateHero(data)` — обновить hero
- `updateProjects(items)` — обновить проекты
- `updateFooter(data)` — обновить футер
- `addProject(project)` — добавить проект
- `deleteProject(index)` — удалить проект
- `updateProject(index, project)` — обновить проект

## Загрузка фото

При получении фото:
1. Получить file_id
2. Скачать через bot.getFileStream(fileId)
3. Сохранить в `public/figma/project_{timestamp}.png`
4. Установить путь `/figma/project_{timestamp}.png`
