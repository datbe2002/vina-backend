const express = require('express')
const router = express.Router();
const blogController = require('../controller/blog.controller');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });

router.route('/')
    .get(blogController.getAllBlog)
    .post(uploadMiddleware.single('file'), blogController.createNewBlog)
    .put(uploadMiddleware.single('file'), blogController.updateBlog)
router.route('/:id')
    .get(blogController.getBlogById)
    .post(blogController.delete)
router.route('/date/blogDate')
    .get(blogController.getAllBlogDateOnly)

module.exports = router;