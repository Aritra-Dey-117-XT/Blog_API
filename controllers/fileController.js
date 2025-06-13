import fs from 'fs'
import path from 'path'

const uploadDir = path.resolve('uploads')

export const uploadImage = (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded.' })

  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  res.status(200).json({ message: 'Image uploaded successfully', imageUrl })
}

export const getImages = (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).json({ message: 'Error reading images' })

    const urls = files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file}`)
    res.status(200).json({ images: urls })
  })
}
