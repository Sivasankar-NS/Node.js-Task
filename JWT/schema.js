const mongoose = require('mongoose')
const dataSchema = new mongoose.Schema({
    Name:String,
    Email:String,
    Password:String,
})
module.exports =mongoose.model('Data', dataSchema)