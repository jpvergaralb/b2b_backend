const express = require('express');
const cookieParser = require('cookie-parser');
const welcomeRoutes = require('./routes/welcome.routes');
const userRoutes = require('./routes/user.routes');
const courseRouter = require('./routes/course.routes');
const taskRoutes = require('./routes/task.routes');
const requestLoggerMiddleware = require('./middlewares/requestLogger.middleware');
require('dotenv').config();

const app = express();

// Middlewares
app.use(requestLoggerMiddleware);
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/', welcomeRoutes)
app.use('/users', userRoutes);
app.use('/courses', courseRouter);
app.use('/tasks', taskRoutes);

// Server
module.exports = app