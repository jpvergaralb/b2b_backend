const jwt = require('jsonwebtoken')
require('dotenv').config()

const validateToken = (req, res, next) => {
  const token = req.cookies ? req.cookies.authToken : null

  if (!token) {
    res.status(401).json({ error: 'You must be logged in to access this resource' })
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
    req.userPayload = verifiedToken
    next()
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' })
  }
}

module.exports = validateToken
