import Blog from '../models/Blog.js'
import User from '../models/User.js'

const getBlogs = async (req, res, next) => {
    const userID = req.query.userId
    try {
        let blogs = []
        if(userID) {
            const user = await User.findById(userID)
            if(!user) {
                return res.status(404).json({ message: "User not found" })
            }
            blogs = await Blog.find({user: userID})
        } else {
            blogs = await Blog.find()
        }
        return res.status(200).json(blogs)
    } catch (error) {
        next(error)
    }
}

const createBlog = async (req, res, next) => {
    const { title, description } = req.body
    try {
        const blog = await Blog.create({ title, description, user: req.user.userId })
        return res.status(201).json({message: "Blog created successfully", blog})
    } catch (error) {
        next(error)
    }
}

const updateBlog = async (req, res, next) => {

    const blogId = req.params.id
    const { title: new_title, description: new_description } = req.body

    try {

        if(!blogId) {
            return res.status(400).json({ message: "Blog ID is required" })
        }
        const blog = await Blog.findById(blogId)
        if(!blog) {
            return res.status(404).json({ message: "Blog not found" })
        }
        if(blog.user._id.toString() !== req.user.userId) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const { title, description } = blog
        blog.title = new_title || title
        blog.description = new_description || description
        await blog.save()
        return res.status(200).json({message: "Blog updated successfully", blog})

    } catch (error) {
        next(error)
    }
}

const deleteBlog = async (req, res, next) => {
    
    const blogId = req.params.id
    try {
        if(!blogId) {
            return res.status(400).json({ message: "Blog ID is required" })
        }
        const blog = await Blog.findById(blogId)
        if(!blog) {
            return res.status(404).json({ message: "Blog not found" })
        }
        if(blog.user._id.toString() !== req.user.userId) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        await Blog.findByIdAndDelete(blogId)
        return res.status(200).json({message: "Blog deleted successfully", blog})

    } catch (error) {
        next(error)
    }
}

export { getBlogs, createBlog, updateBlog, deleteBlog }