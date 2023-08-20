const express = require('express');
const userRoutes = require('./routes/user.routes');
const courseRouter = require('./routes/course.routes');
const taskRoutes = require('./routes/task.routes');
const requestLoggerMiddleware = require('./middlewares/requestLogger.middleware');
require('dotenv').config();

const app = express();

// Middlewares
app.use(requestLoggerMiddleware);

// Routes
app.use('/users', userRoutes);
app.use('/courses', courseRouter);
app.use('/tasks', taskRoutes);

// Server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running server on ${port}...`);
});
