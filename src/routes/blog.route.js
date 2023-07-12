const express = require('express')
const router = express.Router();
const blogController = require('../controller/blog.controller');
const multer = require('multer');
// const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

var storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads');
    },
});

const uploadMiddleware = multer({ storage: storage });

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



