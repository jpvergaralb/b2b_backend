import express from 'express'
import { userRoutes }  from './routes/user.routes.js'
import { subjectRouter } from './routes/subject.routes.js'
import { taskRoutes } from './routes/task.routes.js'
import { requestLoggerMiddleware } from './middlewares/requestLogger.middleware.js'
import dotenv from 'dotenv'
dotenv.config()
import { sequelize } from './db/db.js'
import { User, Subject, Task } from './models/models.js'

          
const app = express()

// db
const syncDatabase = async () => {
  try {
    await sequelize.sync({alter: true})
    console.log('Connection has been established successfully from main server.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
syncDatabase()

// Middlewares
app.use(requestLoggerMiddleware)

// Routes
app.use("/users", userRoutes)
app.use("/subjects", subjectRouter)
app.use("/tasks", taskRoutes)


// Server
const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Running server on ${port}...`)
})

