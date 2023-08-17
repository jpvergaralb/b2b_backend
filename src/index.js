import express from 'express'
import { userRoutes }  from './routes/user.routes.js'
import { subjectRouter } from './routes/subject.routes.js'
import { taskRoutes } from './routes/task.routes.js'
import { requestLoggerMiddleware } from './middlewares/requestLogger.middleware.js'
import dotenv from 'dotenv'
dotenv.config()
          
const app = express()



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

