import express from "express"
import { 
  getSubject, 
  getSubjects, 
  postSubject, 
  deleteSubject, 
  updateSubject } 
  from "../controllers/subject.controller.js"

export const subjectRouter = express.Router()

subjectRouter.route("/")
            .get(getSubjects)
            .post(postSubject)

subjectRouter.route("/:id")
            .get(getSubject)
            .put(updateSubject)
            .delete(deleteSubject)