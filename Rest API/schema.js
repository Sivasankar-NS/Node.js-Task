const mongoose = require('mongoose')
const userdata = new mongoose.Schema({
    Username : String,
    Product : String,
})
module.exports = mongoose.model('User',userdata)