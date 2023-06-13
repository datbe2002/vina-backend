require("dotenv").config();

const port = process.env.PORT || 3000
const dbURI = process.env.MONGODB_URI
const dbName = 'vina-temp'

module.exports = {
    port, dbURI, dbName
}