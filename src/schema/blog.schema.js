const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    summary: {
        type: String,
    },
    content: {
        type: String,
    },
    cover: {
        type: String,
    },
    author: {
        type: String,
        default: "Admin"
    }

}, { versionKey: false, timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
