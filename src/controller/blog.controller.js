const path2 = require('path');
const Blog = require('../schema/blog.schema');
const fs = require('fs');
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

    async getAllBlogDateOnly(req, res) {
        try {
            const blogs = await Blog.find({});
            const formattedBlogs = blogs.map(blog => {
                const createdAt = blog.createdAt;
                const date = createdAt.toLocaleDateString('en-GB');
                return { ...blog._doc, createdAt: date };
            })
            res.status(200).json(formattedBlogs);
        } catch (err) {
            console.error('Error retrieving blogs:', err);
            res.status(500).json({ error: 'Failed to retrieve blogs' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const blog = await Blog.findById(id);
            if (req.file) {
                const coverPath = path2.join(__dirname, '..', blog.cover);
                const srcIndex = coverPath.indexOf('src');
                const sanitizedCoverPath = coverPath.slice(0, srcIndex) + coverPath.slice(srcIndex + 4);
                fs.unlinkSync(sanitizedCoverPath);
            }
            const deleted = await Blog.findByIdAndDelete(id)
            res.status(200).json({ message: "delete success" });

        } catch (error) {
            res.status(500).json({ error: 'Failed to delete blogs' });

        }
    },

    async createNewBlog(req, res) {
        try {
            const { originalname, path } = req.file;
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            const newPath = path + '.' + ext;
            fs.renameSync(path, newPath);

            const { title, summary, content } = req.body
            const postDoc = await Blog.create({
                title,
                summary,
                content,
                cover: newPath
            })
            res.status(200).json({ message: "Created successfully" })
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
    },

    async updateBlog(req, res) {
        let newPath = null
        const { id, title, summary, content } = req.body
        if (req.file) {
            //delete existing path
            const blog = await Blog.findById(id);
            const coverPath = path2.join(__dirname, '..', blog.cover);
            const srcIndex = coverPath.indexOf('src');
            const sanitizedCoverPath = coverPath.slice(0, srcIndex) + coverPath.slice(srcIndex + 4);
            fs.unlinkSync(sanitizedCoverPath);


            const { originalname, path } = req.file;
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            newPath = path + '.' + ext;
            fs.renameSync(path, newPath);

        }

        const doc = await Blog.findById(id)
        const updated = await Blog.findOneAndUpdate({ _id: id }, {
            title: title,
            summary: summary,
            content: content,
            cover: newPath ? newPath : doc.cover
        }, {
            new: true
        })
        res.status(200).json({ message: "Created successfully" })
    }
}


module.exports = blogController;