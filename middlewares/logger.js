import jwt from 'jsonwebtoken'
import jwtConfig from '../config/jwt.js'

export const requestLogger = (req, res, next) => {

  const token = req.cookies.token
  try {
    if (!token) {
      req.user = null
    } else {
      const decoded = jwt.verify(token, jwtConfig.secret)
      req.user = decoded
    }
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized: Invalid token' })
  }

  const time = new Date().toISOString()
  const method = req.method
  const url = req.originalUrl
  const ip = req.ip

  const user = req.user ? `UserID: ${req.user.userId}` : 'Guest'
  console.log(`[${time}] ${method} ${url} from ${ip} - ${user}`)
  next()
}