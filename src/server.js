const express = require("express");
const cors = require("cors");
const router = require('./routes');
require("dotenv").config();
const app = express();

const db = require('./dbconnect');
const { port } = require("./constants/envConst");
db.connect();

app.use(cors());
app.use(express.json())

app.use("/api", router);
app.get('/', (req, res) => {
    res.send('Hello, Express.js!');
});


// const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});