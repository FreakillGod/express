const express= require('express')
const router=express.Router();


router.post('/',(req,res)=>{
    console.log(req.body)
    const {name}= req.body
    if(name){
        return res.status(200).send(`wecolme ${name}`)
    }
        return res.status(404).send('plese provide credentials')
})

module.exports=router;