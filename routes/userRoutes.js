import express from 'express'
import { body, validationResult } from 'express-validator'
import { passwordValidator } from '../utils/validators.js'
import { signin, signup, logout } from '../controllers/userController.js'
import { requireAuth } from '../middlewares/authMiddleware.js'
import { errorHandler } from '../middlewares/errorHandler.js'

const router = express.Router()

router.post('/signup',
  [
    body('username')
      .notEmpty().withMessage('Username is required')
      .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email'),
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').custom(passwordValidator)
  ],
  async(req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const validationError = new Error("Validation failed")
      validationError.statusCode = 400
      validationError.details = errors.array()
      return next(validationError)
    }
    next()
  },
  signup
)


router.post('/signin',
  [
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email'),
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').custom(passwordValidator)
  ],
  async(req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const validationError = new Error("Validation failed")
      validationError.statusCode = 400
      validationError.details = errors.array()
      return next(validationError)
    }
    next() 
  },
  signin
)


router.get('/profile', requireAuth,  (req, res) => {
  return res.json({ user: req.user })
})


router.post('/logout', requireAuth, logout)

router.use(errorHandler)

export default router