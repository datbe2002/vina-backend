const express = require("express");
const blogRoute = require('./blog.route')
const contactRoute = require('./contact.route')


const router = express.Router();
const routesIndex = [
    {
        path: '/blog',
        route: blogRoute,
    },
    {
        path: '/contact',
        route: contactRoute,
    }
]

routesIndex.forEach((route) => {
    router.use(route.path, route.route);
});
module.exports = router;