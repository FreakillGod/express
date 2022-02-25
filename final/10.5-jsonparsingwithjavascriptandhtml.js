const express= require('express');
const app=express();
let {people}= require('./data')

app.use(express.static('./methods-public'))

//parse form data
app.use(express.urlencoded({extended:false}))
//parse json for incoming json data
app.use(express.json())

app.get('/api/people',(req,res)=>{
    res.status(200).json({success:true,data:people})
})

app.post('/api/people',(req,res)=>{
    const {name} =req.body
    if(!name){
        return res.status(400).json({success:false,msg:'please enter valied name'})
    }
    res.status(201).json({success:true,person:name})    //use json for parsing
})

app.post('/login',(req,res)=>{
    console.log(req.body)
    const {name}= req.body
    if(name){
        return res.status(200).send(`wecolme ${name}`)
    }
        return res.status(404).send('plese provide credentials')
})

app.listen(5000,()=>{
    console.log('server is running on port 5000...')
})


