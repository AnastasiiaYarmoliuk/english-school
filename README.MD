# EngSchool LMS — Інформаційна система онлайн-школи

Повноцінна інформаційна система (Learning Management System), розроблена для автоматизації навчального процесу, фінансового моніторингу та управління користувачами в школі англійської мови.

## 🚀 Технологічний стек

Проєкт побудований на базі сучасного стеку **MERN** (з використанням Docker):

*   **Frontend:** [React](https://reactjs.org/) (збірка через **Vite**) — адаптивний та динамічний інтерфейс.
*   **Backend:** [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/) — розробка RESTful API.
*   **Database:** [MongoDB](https://www.mongodb.com/) — нереляційна документоорієнтована база даних.
*   **Containerization:** [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) — повна ізоляція та розгортання однією командою.
*   **Security:** [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) — криптографічне хешування паролів.
*   **Styling & Icons:** [CSS Modules](https://github.com/css-modules/css-modules) та [Lucide React](https://lucide.dev/).

---

## 🛠 Як запустити проєкт

Для запуску системи **не потрібно** встановлювати Node.js, MongoDB чи інше ПЗ локально. Весь процес автоматизований через Docker.

### 1. Попередні вимоги
*   Встановлений [Docker Desktop](https://www.docker.com/products/docker-desktop/).
*   Встановлений інструмент [Git](https://git-scm.com/downloads).

### 2. Клонування та запуск
Відкрийте термінал та виконайте наступні команди:

```bash
# 1. Клонуйте репозиторій
git clone https://github.com/AnastasiiaYarmoliuk/english-school

# 2. Перейдіть у директорію проєкту
cd english-school

# 3. Запустіть систему (збірка та старт усіх контейнерів)
docker-compose up --build
```
Після появи повідомлення ✅ ALL SYSTEMS GO: Database fully seeded! у логах бекенду, система буде доступна в браузері.

## 🔌 Використані порти
### Frontend: http://localhost:3000
### Backend API: http://localhost:5000/api
### MongoDB: localhost:27017 (доступ через MongoDB Compass)

## 📊 Міграції бази даних

У проєкті реалізовано механізм автоматичних міграцій (Database Seeding):
Як це працює: Скрипт backend/migrations/seed.js запускається автоматично при старті контейнера.
Результат: База даних самостійно наповнюється тестовими курсами, уроками, завданнями та обліковими записами для всіх ролей (Адмін, Вчитель, Студент, Батько). Вам не потрібно вручну створювати початкові дані.

## 👥 Тестові дані для входу

Ви можете протестувати систему під різними ролями:
Роль	Email	Пароль	Особливості
Студент	student@test.com	password123	Прогрес-бар, здача ДЗ (файли).
Батько	parent@test.com	parent123	Бачить прогрес дитини (Миколи).
Вчитель	teacher@school.com	teacher123	Перевірка ДЗ, виставлення балів.
Адмін	admin@school.com	admin123	Спец. код: ADM-777. Повна аналітика.

Примітка для входу Адміна: На сторінці логіну натисніть 3 рази на заголовок "З поверненням!", щоб відкрилося приховане поле для введення секретного коду адміністратора.

## 💻 Основні команди Docker

docker-compose up — звичайний запуск системи.
docker-compose down — зупинка контейнерів.
docker-compose down -v — повна зупинка з видаленням бази даних (для очищення).
docker-compose logs -f — перегляд логів у режимі реального часу.

## 📁 Структура репозиторію

/backend — Серверна частина (Node.js/Express).
/models — Схеми даних Mongoose.
/routes — Логіка API ендпоінтів.
/migrations — Скрипти автоматичного наповнення БД.
/uploads — Сховище для завантажених студентами файлів (Volume).
/frontend — Клієнтська частина (React/Vite).
/src/pages — Модульні сторінки кабінетів.
/src/components — Перевикористовувані UI-компоненти.

Розроблено в рамках курсової роботи з дисципліни "Проектування та розробка ІС", 2024.
