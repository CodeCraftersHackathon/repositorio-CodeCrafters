import Todo from "../models/Todo.js";

class TodoService {
  constructor() {}

  async getAll() {
    try {
      const todo = await Todo.find();
      if (!todo || !todo.length) {
        throw new Error("Todos not found");
      }
      return todo;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getOne(id) {
    try {
      const todo = await Todo.findOne({ _id: id });
      if (!todo) {
        throw new Error("Todo not found");
      }
      return todo;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(todo) {
    try {
      const newTodo = await Todo.create(todo);
      if (!newTodo) {
        throw new Error("Failed to create todo");
      }
      return newTodo;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(id, todo) {
    try {
      const updateTodo = await Todo.findByIdAndUpdate(id, todo, {
        new: true,
      });
      if (!updateTodo) {
        throw new Error("Failed to update todo");
      }
      return updateTodo;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id) {
    
    try {
      const todo = await Todo.findByIdAndDelete(id);
      if (!todo) {
        throw new Error("Failed to delete todo");
      }
      return todo;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteAll() {
    try {
      const todo = await Todo.deleteMany();
      if (!todo) {
        throw new Error("Failed to delete todos");
      }
      return todo;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default TodoService;
