import express from 'express'
import connectToDB from './config/db.js'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/errorHandler.js'
import { requestLogger } from './middlewares/logger.js'
import userRoutes from './routes/userRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import fileRoutes from './routes/fileRoutes.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = 3000

try {
  await connectToDB()
} catch (error) {
  console.error("Failed to connect to DB:", error.message)
  process.exit(1)
}

app.use(express.json())
app.use(cookieParser())
app.use(requestLogger)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use("/user", userRoutes)
app.use("/blog", blogRoutes)
app.use('/upload', fileRoutes)

app.get('/', (req, res) => {
  res.send(`Auth API running on port ${port}`)
})

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
