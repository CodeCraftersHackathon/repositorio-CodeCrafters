import TodoService from "../services/TodoService.js";
import { decodedToken } from "../helpers/jwt.js";
const messages = {
  internalError: "Error interno del servidor",
  notFound: "Aun no hay Todos cargados!",
  notCreated: "Error al crear el Todo",
  created: "Todoo creado con éxito",
  notUpdated: "Error al intentar actualizar el Todo",
  updated: "Todoo actualizado con éxito!",
  notDeleted: "Error al intentar eliminar el Todo",
  deleted: "Todoo eliminado con éxito!",
  deletedAll: "Todos los Todos han sido eliminados con éxito!",
};

class TodoCtrl {
  constructor() {
    this.todoService = new TodoService();
  }

  async getTodos(req, res) {
    try {
      const token = req.headers["authorization"].split(" ")[1];
      const decoded = decodedToken(token);
      const userId = decoded.id;
      const todos = await this.todoService.getAll({
        userId,
      });
      return res.status(200).json(todos);
    } catch (error) {
      console.error(error);
      if (error.message === "Todos not found") {
        return res.status(404).json({
          status: 404,
          message: messages.notFound,
        });
      }
      return res.status(500).json({
        status: 500,
        message: messages.internalError,
      });
    }
  }

  async createTodo(req, res) {
    try {
      const token = req.headers["authorization"].split(" ")[1];
      const decoded = decodedToken(token);
      req.body.userId = decoded.id;
      const body = req.body;
      const newTodo = await this.todoService.create(body);
      console.log(newTodo);

      return res.status(201).json({
        status: 201,
        message: messages.created,
        data: newTodo,
      });
    } catch (error) {
      console.error(error);
      if (error.message === "Failed to create todo") {
        return res.status(400).json({
          status: 400,
          message: messages.notCreated,
        });
      }
      return res.status(500).json({
        status: 500,
        message: messages.internalError,
      });
    }
  }

  async getTodo(req, res) {
    try {
      const todo = await this.todoService.getOne(req.params.id);
      return res.status(200).json(todo);
    } catch (error) {
      console.error(error);
      if (error.message === "Todo not found") {
        return res.status(404).json({
          status: 404,
          message: messages.notFound,
        });
      }
      return res.status(500).json({
        status: 500,
        message: messages.internalError,
      });
    }
  }

  async updateTodo(req, res) {
    try {
      const { id } = req.params;
      const body = req.body;
      const todo = await this.todoService.getOne(id);
      const updateTodo = await this.todoService.update(id, body);
      return res.status(200).json({
        status: 200,
        message: messages.updated,
        data: updateTodo,
      });
    } catch (error) {
      console.error(error);
      if (error.message === "Failed to update todo") {
        return res.status(400).json({
          status: 400,
          message: messages.notUpdated,
        });
      }
      return res.status(500).json({
        status: 500,
        message: messages.internalError,
      });
    }
  }

  async deleteTodo(req, res) {
    try {
      const { id } = req.body;

      await this.todoService.delete(id);
      return res.status(200).json({
        status: 200,
        message: messages.deleted,
      });
    } catch (error) {
      console.error(error);
      if (error.message === "Failed to delete todo") {
        return res.status(400).json({
          status: 400,
          message: messages.notDeleted,
        });
      }
      return res.status(500).json({
        status: 500,
        message: messages.internalError,
      });
    }
  }
  async deleteALl() {
    try {
      const token = req.headers["authorization"].split(" ")[1];
      const decoded = decodedToken(token);
      const userId = decoded.id;
      await this.todoService.deleteAll({
        userId,
      });
      return res.status(200).json({
        status: 200,
        message: messages.deletedAll,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        message: messages.internalError,
      });
    }
  }
}

export default TodoCtrl;