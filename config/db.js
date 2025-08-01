import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error)
    }
}

export default connectToDB