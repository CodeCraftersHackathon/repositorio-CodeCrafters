import TodoCtrl from "../controllers/todo.controllers.js";
import { Router } from "express";

const router = Router();
const todoCtrl = new TodoCtrl();

router.get("/todos", todoCtrl.getTodos.bind(todoCtrl));

router.post("/todos", todoCtrl.createTodo.bind(todoCtrl));

router.get("/todos/:id", todoCtrl.getTodo.bind(todoCtrl));

router.put("/todos/:id", todoCtrl.updateTodo.bind(todoCtrl));

router.delete("/todos", todoCtrl.deleteTodo.bind(todoCtrl));

router.delete("/todos/deleteAll", todoCtrl.deleteALl.bind(todoCtrl));

export default router;
