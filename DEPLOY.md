# 🚀 Деплой на Vercel

## Быстрый старт (5 минут)

### 1. Залей код на GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/твой-username/kel.git
git push -u origin main
```

### 2. Подключи проект в Vercel

1. Зайди на https://vercel.com
2. Нажми **"Add New Project"**
3. Выбери **"Import Git Repository"**
4. Найди свой репозиторий `kel`
5. Нажми **"Import"**

### 3. Настройки проекта (оставь по умолчанию)

- **Framework Preset**: Next.js (определится автоматически)
- **Root Directory**: `./`
- **Build Command**: `yarn build`
- **Output Directory**: `.next`

### 4. Нажми **"Deploy"**

Vercel автоматически:
- ✅ Установит зависимости
- ✅ Соберёт проект
- ✅ Задеплоит на `https://kel-xxxx.vercel.app`

---

## 🔄 Автоматический деплой

Теперь при каждом `git push` в ветку `main`:
- Vercel автоматически задеплоит новую версию
- Старая версия сохранится (можно откатиться)
- Получишь preview URL для проверки

---

## 🌐 Свой домен (когда будешь готов)

1. В панели Vercel: **Project Settings → Domains**
2. Добавь свой домен: `dk-group.ru` (или другой)
3. Vercel даст DNS-записи для настройки у регистратора
4. Через 5-60 минут домен заработает

---

## 🔓 Включить индексацию (когда сайт готов)

### 1. Удали `noindex` из `app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: 'ООО ДК ГРУПП | Строительство и ремонт',
  description: 'Специализированная строительная компания...',
  // Удали эти строки:
  // robots: {
  //   index: false,
  //   follow: false,
  // },
};
```

### 2. Обнови `public/robots.txt`:
```txt
User-agent: *
Allow: /
Sitemap: https://твой-домен.ru/sitemap.xml
```

### 3. Отправь в поисковики:
- **Google**: https://search.google.com/search-console
- **Яндекс**: https://webmaster.yandex.ru

---

## 📊 Переменные окружения

Если нужны секреты (API ключи и т.п.):
1. В панели Vercel: **Project Settings → Environment Variables**
2. Добавь переменные (например, `FIGMA_API_KEY`)
3. Они автоматически подхватятся при следующем деплое

---

## 🆘 Если что-то пошло не так

### Ошибка сборки
```bash
yarn build
```
Запусти локально — увидишь те же ошибки, что и в Vercel.

### Откат к предыдущей версии
В панели Vercel: **Deployments** → выбери рабочую версию → **"Promote to Production"**

---

## 💰 Тарифы

- **Hobby** (бесплатно): достаточно для старта
  - Неограниченные деплои
  - 100 ГБ трафика в месяц
  - Автоматический HTTPS

- **Pro** ($20/мес): когда нужен приоритет и больше лимитов

Для начала более чем достаточно бесплатного тарифа.
