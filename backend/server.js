import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const todoSchema = z.object({
  title: z.string().min(3),
  completed: z.boolean().optional(),
});

// **Signup Route**
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = userSchema.parse(req.body);
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    res.json({ message: "User created", user });
  } catch (err) {
    res.status(400).json({ error: err.errors || err.message });
  }
});

// **Login Route**
app.post("/login", async (req, res) => {
  try {
    const { email, password } = userSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.errors || err.message });
  }
});

// **Middleware for authentication**
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized. No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

// **Get All Todos**
app.get("/todos", authMiddleware, async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({ where: { userId: req.userId } });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// **Add a Todo**
app.post("/todos", authMiddleware, async (req, res) => {
  try {
    const { title } = todoSchema.parse(req.body);
    const todo = await prisma.todo.create({
      data: { title, userId: req.userId },
    });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.errors || err.message });
  }
});

// **Update a Todo (Ensure User Owns the Todo)**
app.put("/todos/:id", authMiddleware, async (req, res) => {
  try {
    const { title, completed } = todoSchema.parse(req.body);
    
    const todo = await prisma.todo.findUnique({ where: { id: req.params.id } });
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    if (todo.userId !== req.userId) return res.status(403).json({ error: "Unauthorized to update this todo" });

    const updatedTodo = await prisma.todo.update({
      where: { id: req.params.id },
      data: { title, completed },
    });

    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ error: err.errors || err.message });
  }
});

app.put("/todos/:id", authMiddleware, async (req, res) => {
    try {
      const { title, completed } = todoSchema.partial().parse(req.body);
  
      const todo = await prisma.todo.findUnique({ where: { id: req.params.id } });
      if (!todo) return res.status(404).json({ error: "Todo not found" });
      if (todo.userId !== req.userId) return res.status(403).json({ error: "Unauthorized to update this todo" });
  
      const updatedTodo = await prisma.todo.update({
        where: { id: req.params.id },
        data: { title, completed },
      });
  
      res.json(updatedTodo);
    } catch (err) {
      res.status(400).json({ error: err.errors || err.message });
    }
});
  

// **Delete a Todo (Ensure User Owns the Todo)**
app.delete("/todos/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await prisma.todo.findUnique({ where: { id: req.params.id } });
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    if (todo.userId !== req.userId) return res.status(403).json({ error: "Unauthorized to delete this todo" });

    await prisma.todo.delete({ where: { id: req.params.id } });
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
