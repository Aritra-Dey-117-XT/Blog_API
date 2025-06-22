import express from 'express'
import { body, validationResult } from 'express-validator'
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js'
import { requireAuth } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/all', getBlogs)

router.post('/create',
  requireAuth,
  [
    body('title')
      .notEmpty().withMessage('Title is required')
      .isLength({ min: 10 }).withMessage('Title must be at least 10 characters long'),
    body('description')
      .notEmpty().withMessage('Title is required')
      .isLength({ min: 20 }).withMessage('Description must be at least 10 characters long')
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
  createBlog
)

router.put('/update/:id',
  requireAuth,
  [
    body('title')
      .isLength({ min: 10 }).withMessage('Title must be at least 10 characters long'),
    body('description')
      .isLength({ min: 20 }).withMessage('Description must be at least 10 characters long')
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
  updateBlog
)

router.delete('/delete/:id', requireAuth,  deleteBlog)

export default router