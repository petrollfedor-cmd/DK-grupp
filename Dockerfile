FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate 2>/dev/null || true

EXPOSE 3000

CMD ["npx", "tsx", "lib/telegram-bot.ts"]
