const express = require ('express')
const app = express()
const mongoose = require('mongoose')
const schema = require('./schema')
mongoose.connect('mongodb://127.0.0.1:27017/Data')
.then(()=>{
    console.log("DB Connected");
})
.catch(()=>{
    console.log("DB Not Connected");
})
app.use(express.json())  
app.use(express.urlencoded({ extended: false}))
app.post('/post',async(req,res)=>{
    const data = new schema({
       ...req.body
    })
    await data.save()
    res.json(data)
})
app.get('/get',async(req,res)=>{
    const data = await schema.find({})
    res.json(data)
})
app.put('/put/:id',async(req,res)=>{
   const data = await schema.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
   res.json(data)
})
app.delete('/delete/:id',async(req,res)=>{
    const data = await schema.findByIdAndDelete(req.params.id)
    res.json("deleted sucessfully")
})
port=3000
app.listen(port,()=>{
    console.log(`server is running on port:${port}`);
})