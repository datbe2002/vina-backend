const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },

}, { versionKey: false, timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
