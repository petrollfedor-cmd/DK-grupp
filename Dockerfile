FROM node:20-alpine

WORKDIR /app

# Копируем package files и устанавливаем зависимости
COPY package.json ./
RUN npm install

# Копируем весь код (обновляется при каждом пуше)
COPY . .

# Убедимся что tsx доступен
RUN npx tsx --version 2>/dev/null || npm install tsx

# Бот
CMD ["npx", "tsx", "lib/telegram-bot.ts"]
