import express from 'express'
import multer from 'multer'
import { uploadImage, getImages } from '../controllers/fileController.js'
import path from 'path'
import { requireAuth } from '../middlewares/authMiddleware.js'

const router = express.Router()
const uploadDir = path.resolve('uploads')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`
    cb(null, uniqueName)
  }
})

const imageFileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed!'), false)
  }
}

const upload = multer({ storage, fileFilter: imageFileFilter })

router.post('/upload', requireAuth, upload.single('image'), uploadImage)
router.get('/all', getImages)

export default router