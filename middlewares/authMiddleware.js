import jwt from 'jsonwebtoken'
import jwtConfig from '../config/jwt.js'

export const requireAuth = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' })
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized: Invalid token' })
  }
}