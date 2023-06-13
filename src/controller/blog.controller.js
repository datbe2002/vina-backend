const Blog = require('../schema/blog.schema');
const blogController = {
    async getAllBlog(req, res) {
        try {
            const blogs = await Blog.find({});
            res.status(200).json(blogs);
        } catch (err) {
            console.error('Error retrieving blogs:', err);
            res.status(500).json({ error: 'Failed to retrieve blogs' });
        }
    },

    async createNewBlog(req, res) {
        try {
            const title = req.body.title
            const content = req.body.content

            const newBlog = await new Blog({
                title: title,
                content: content,
            })
            const blog = await newBlog.save()
            console.log(blog)
            res.status(200).json(blog)
        } catch (error) {
            console.log(error)
        }
    },

    async getBlogById(req, res) {
        try {
            const id = req.params.id
            const blog = await Blog.findById(id)
            res.status(200).json(blog)
        } catch (error) {
            console.log(error)
        }
    }
}


module.exports = blogController;