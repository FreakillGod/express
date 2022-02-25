const express = require('express');
const path= require('path');
const app= express()
const {products}= require('./data.js');

// app.use(express.static('./public'))

app.get('/',(req,res)=>{
    res.send('<h1>Hello</h1> <a href="/api/products">Products</a>');
})

app.get('/api/products',(req,res)=>{
    const newProducts= products.map((product)=>{
        const{id,name,image}= product;
        return {id,name,image}
    })
    res.json(newProducts);                     
})
// :product is route paramter
// : to use route paramater
app.get('/api/products/:productID',(req,res)=>{
    console.log(req.params)
    const {productID} = req.params;
    const singleProduct = products.find((product)=>product.id === Number(productID))
    if(!singleProduct){   
        return res.status(404).send('product dies not exist')
        }

    return res.json(singleProduct);                     
})






app.listen(5000,()=>{
    console.log('server is listening on port 5000')
})


