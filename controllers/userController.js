import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import jwtConfig from '../config/jwt.js'

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" })
    }

    const usernameUsed = await User.findOne({ username })
    if (usernameUsed) {
      return res.status(400).json({ message: "Username already in use" })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({ 
      username, 
      email, 
      password: hashedPassword 
    })

    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    )

    res.cookie('token', token, jwtConfig.cookieOptions)

    const userResponse = user.toObject()
    delete userResponse.password

    return res.status(201).json({
      message: "User created successfully",
      user: userResponse
    })

  } catch (error) {
    next(error)
  }
}

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    )

    res.cookie('token', token, jwtConfig.cookieOptions)

    const userResponse = user.toObject()
    delete userResponse.password

    return res.status(200).json({
      message: "Login successful",
      user: userResponse
    })

  } catch (error) {
    next(error)
  }
}

const logout = (req, res) => {
  res.clearCookie('token', jwtConfig.cookieOptions)
  res.status(200).json({ message: 'Logged out successfully' })
}

export { signup, signin, logout }