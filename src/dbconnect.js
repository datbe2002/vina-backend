const mongoose = require('mongoose');
const { dbURI } = require('./constants/envConst');



const uri = dbURI
console.log(uri)
async function connect() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

module.exports = {
    connect,
};