# Figma MCP Integration Guide

Этот проект теперь интегрирован с Figma для автоматического получения макетов и помощи в верстке.

## 🚀 Быстрый старт

### 1. Обновление данных из Figma

```bash
# Выгрузить все изображения и JSON макета
npm run figma-fetch

# Проанализировать конкретный фрейм (по умолчанию 265:270)
npm run figma-analyze

# Проанализировать конкретный node ID
npm run figma-analyze -- 265:270
```

### 2. Просмотр макета в браузере

После запуска `npm run dev` откройте:
```
http://localhost:3000/figma-viewer
```

Вы увидите интерактивный интерфейс со:
- Списком всех элементов макета
- Подробной информацией о каждом элементе
- Цветовой палитрой
- Размерами и стилями
- Layout параметрами (auto layout, padding, constraints)

## 📁 Структура файлов

```
kel/
├── figma-file.json              # Полные данные из Figma API
├── figma-analysis/              # Проанализированные данные по фреймам
│   └── node-265_270-analysis.json
├── public/figma/                # Выгруженные изображения элементов
│   ├── 265:278.png
│   ├── 265:279.png
│   └── ...
├── scripts/
│   ├── figma-fetch.ts           # Скрипт выгрузки данных из Figma
│   ├── figma-analyze.ts         # Скрипт анализа структуры макета
│   ├── figma-mcp-server.ts      # MCP сервер для доступа к данным
│   └── find-node.ts             # Поиск node ID по имени
└── src/pages/
    └── figma-viewer.tsx         # Интерфейс просмотра макета
```

## 🔍 Как найти нужный node ID

1. Откройте макет в Figma
2. Кликните на нужный фрейм/элемент
3. В URL браузера будет `node-id=XXX-YYY` (например, `node-id=265-280`)
4. Замените дефис на двоеточие: `265:280`

Или используйте скрипт поиска:
```bash
npx ts-node ./scripts/find-node.ts
```

## 📊 Что содержится в анализе

Для каждого фрейма анализ включает:

### Основная информация
- `nodeId` - уникальный ID элемента
- `name` - название из Figma
- `type` - тип (FRAME, TEXT, RECTANGLE, INSTANCE и т.д.)
- `dimensions` - размеры (width × height)
- `position` - координаты (x, y)

### Дочерние элементы
Для каждого ребенка:
- Базовая информация (id, name, type, dimensions)
- Стили (fills, strokes, cornerRadius, opacity)
- Layout параметры (layoutMode, itemSpacing, padding, justifyContent, alignItems)
- Текст и стили текста (characters, fontFamily, fontSize, fontWeight)
- Constraints

### Цветовая палитра
Все уникальные цвета во фрейме с hex-кодами

## 🤖 MCP Server (для AI агентов)

MCP сервер предоставляет инструменты для программного доступа к данным Figma:

### Доступные инструменты:

1. **get_figma_analysis** - Получить полный анализ макета
2. **get_figma_colors** - Получить все цвета
3. **get_figma_children** - Получить список элементов с фильтрацией
4. **get_figma_images** - Получить список изображений
5. **search_figma_text** - Поиск текста в макете

### Запуск MCP сервера:

```bash
# Требуется установка @modelcontextprotocol/sdk
npm install @modelcontextprotocol/sdk
npx ts-node ./scripts/figma-mcp-server.ts
```

## 🎨 Пример использования для верстки

1. **Запустите анализ:**
   ```bash
   npm run figma-analyze -- 265:270
   ```

2. **Откройте viewer:**
   ```
   http://localhost:3000/figma-viewer
   ```

3. **Изучите структуру:**
   - Посмотрите размеры фрейма (1920×1080)
   - Найдите нужные элементы по имени
   - Скопируйте цвета из палитры
   - Посмотрите layout параметры для воссоздания структуры

4. **Верстайте по данным:**
   ```tsx
   // Пример: воссоздание header на основе данных
   <header style={{
     height: '70px',
     backgroundColor: '#23365e', // из анализа
     display: 'flex',
     justifyContent: 'space-between',
     alignItems: 'center',
     padding: '0 80px'
   }}>
     <Logo width={125} height={119} />
     <Nav items={['О компании', 'Проекты', ...]} />
   </header>
   ```

## 🔄 Рабочий процесс

1. Дизайнер вносит изменения в Figma
2. Запускаете `npm run figma-fetch` для обновления данных
3. Запускаете `npm run figma-analyze` для анализа
4. Открываете `figma-viewer` для изучения структуры
5. Верстаете компоненты на основе полученных данных
6. При необходимости используете MCP инструменты для автоматизации

## 📝 Заметки

- Все изображения сохраняются в `/public/figma/` и доступны по URL `/figma/{id}.png`
- Анализ сохраняется в `/figma-analysis/` в формате JSON
- Для работы скриптов необходимы переменные окружения в `.env.local`:
  - `FIGMA_PERSONAL_ACCESS_TOKEN`
  - `FIGMA_FILE_KEY`

## 🛠️ Настройка

Если нужно изменить параметры по умолчанию:

1. Откройте `scripts/figma-analyze.ts`
2. Измените значение по умолчанию для `targetNodeId`
3. Или передавайте node-id как аргумент: `npm run figma-analyze -- YOUR_NODE_ID`
