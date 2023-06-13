const express = require("express");
const blogRoute = require('./blog.route')


const router = express.Router();
const routesIndex = [
    {
        path: '/blog',
        route: blogRoute,
    }
]

routesIndex.forEach((route) => {
    router.use(route.path, route.route);
});
module.exports = router;