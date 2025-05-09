# Використовуємо офіційний образ Node.js
FROM node:22

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json та package-lock.json
COPY package.json package-lock.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо решту файлів
COPY . .

# Визначаємо порт
EXPOSE 3000

# Запускаємо додаток
CMD ["node", "server.js"]
