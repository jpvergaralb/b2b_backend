const jwt = require('jsonwebtoken')
require('dotenv').config()

const validateToken = (req, res, next) => {
  const token = req.cookies ? req.cookies.authToken : null

  if (!token) {
    res.status(401).json({ error: 'You must be logged in to access this resource' })
  }

  try {
    // we check if the token is valid. If its not it will throw an error
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
    // if its valid then we create a new property called 'user' and give it the value of the token
    req.user = verifiedToken
    next()
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' })
  }
}

module.exports = validateToken
