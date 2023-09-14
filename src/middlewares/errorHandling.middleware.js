const { ValidationError } = require('sequelize');

const errorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    const messages = err.errors.map((error) => error.message);
    return res.status(400).json({ errors: messages });
  }
  return res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = errorHandler;
