
# 📝 Full-Stack Todo App (React + Express + PostgreSQL)

This is a **full-stack** To-Do app with **React (Vite) for frontend**, **Express.js for backend**, and **PostgreSQL for database**.  
Users can **sign up, log in, add, edit, delete** their to-dos. Authentication is handled using **JWT**.

---

## 🚀 Features
- ✅ **User Authentication** (Signup & Login using JWT)
- ✅ **Add, Edit, Delete Todos**
- ✅ **Bootstrap UI** (No custom CSS needed)
- ✅ **React Router for Navigation**
- ✅ **PostgreSQL with Prisma ORM**
- ✅ **Zod for Backend Validation**
- ✅ **Protected API Routes**

---

## 📁 Folder Structure
```
📦 project-root
│── backend/           # Express.js Backend
│   ├── prisma/        # Prisma Database Schema
│   ├── node_modules/  # Backend Dependencies
│   ├── .env           # Environment Variables
│   ├── server.js      # Express Server
│   ├── package.json   # Backend Dependencies
│── frontend/          # React Frontend
│   ├── public/        # Static Assets (Bootstrap CDN added)
│   ├── src/           # React Components & Pages
│   ├── node_modules/  # Frontend Dependencies
│   ├── package.json   # Frontend Dependencies
│   ├── index.html     # Main HTML File
│── README.md          # Documentation
```

---

## 🛠 Setup Instructions
### 1️⃣ Clone Repository
```sh
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

---

## 🔥 Backend Setup
### 2️⃣ Navigate to Backend
```sh
cd backend
```

### 3️⃣ Install Dependencies
```sh
npm install
```

### 4️⃣ Configure Environment Variables
Create a `.env` file inside the `backend` folder:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/todolist"
JWT_SECRET="your_jwt_secret"
```

### 5️⃣ Setup Database
```sh
npx prisma migrate dev --name init
```

### 6️⃣ Start Backend Server
```sh
node server.js
```
✅ Backend will start at `http://localhost:5000/`

---

## 🎨 Frontend Setup
### 7️⃣ Navigate to Frontend
```sh
cd ../frontend
```

### 8️⃣ Install Dependencies
```sh
yarn install
```

### 9️⃣ Start Frontend Server
```sh
yarn dev
```
✅ Frontend will start at `http://localhost:5173/`

---

## 🔗 API Endpoints
### 🔐 Authentication
| Method | Endpoint    | Description           | Auth Required |
|--------|------------|----------------------|--------------|
| POST   | `/signup`  | User Signup          | ❌ No        |
| POST   | `/login`   | User Login (JWT)     | ❌ No        |

### 📌 Todos
| Method | Endpoint         | Description          | Auth Required |
|--------|-----------------|----------------------|--------------|
| GET    | `/todos`        | Fetch all todos     | ✅ Yes       |
| POST   | `/todos`        | Add new todo        | ✅ Yes       |
| PUT    | `/todos/:id`    | Update a todo       | ✅ Yes       |
| DELETE | `/todos/:id`    | Delete a todo       | ✅ Yes       |

---

## 🎯 Usage
- **Login / Signup** to access todos.
- **Add, Edit, Delete** todos using the UI.
- **Click Logout** to end session.

---

## 🤝 Contributing
1. **Fork** the repository  
2. **Clone** your fork  
3. Create a **new branch** (`git checkout -b feature-name`)  
4. **Commit changes** (`git commit -m "Added feature X"`)  
5. **Push** to GitHub (`git push origin feature-name`)  
6. Create a **Pull Request** 🚀  

---

## 📜 License
This project is **MIT Licensed**. Feel free to use and modify it.  

---

### 💡 Happy Coding! 🚀
