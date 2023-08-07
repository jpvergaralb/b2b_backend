import express from "express"
import { 
  getUser, 
  getUsers, 
  postUser, 
  updateUser, 
  deleteUser 
} from "../controllers/user.controllers.js"

export const userRoutes = express.Router()

userRoutes.route("/")
          .get(getUsers)
          .post(postUser)

userRoutes.route("/:id")
          .get(getUser)
          .put(updateUser)
          .delete(deleteUser)







