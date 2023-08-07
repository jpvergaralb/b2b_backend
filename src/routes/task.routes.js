import express from "express"
import { 
  getTask, 
  getTasks, 
  postTask, 
  deleteTask, 
  updateTask 
} from "../controllers/task.controllers.js"

export const taskRoutes = express.Router()

taskRoutes.route("/")
          .get(getTasks)
          .post(postTask)

taskRoutes.route("/:id")
          .get(getTask)
          .put(updateTask)
          .delete(deleteTask)


