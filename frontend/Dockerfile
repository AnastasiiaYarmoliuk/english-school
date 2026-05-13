FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
# Запуск у режимі розробки
CMD ["npm", "run", "dev", "--", "--host"]