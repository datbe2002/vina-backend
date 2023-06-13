const express = require('express')
const router = express.Router();
const blogController = require('../controller/blog.controller')


router.route('/')
    .get(blogController.getAllBlog)
    .post(blogController.createNewBlog)

router.route('/:id')
    .get(blogController.getBlogById)

module.exports = router;