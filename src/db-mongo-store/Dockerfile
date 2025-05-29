# Вказуємо базовий образ Node.js
FROM node:18

# Вказуємо робочу директорію в контейнері
WORKDIR /app

# Копіюємо файли package.json та package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо решту коду додатку
COPY . .

# Відкриваємо порт 3000
EXPOSE 3000

# Команда для запуску додатку
CMD ["node", "src/index.js"]
