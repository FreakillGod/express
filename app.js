const express= require('express');
const app=express();

let {people}= require('./data')

app.use(express.static('./methods-public'))

app.use(express.urlencoded({extended:false}))

app.use(express.json())

app.post('/login',(req,res)=>{
    const{name}=req.body;
    if(name){
        return res.send(`hello ${name}`)
    }
    res.send('post')
})

app.get('/api/people',(req,res)=>{
    res.status(200).json({success:true,data:people})
})

app.post('/api/people',(req,res)=>{
    const{name}=req.body;
    if(!name){
        res.status(400).json({success:false,msg:'undefined name'})
    }
    res.status(201).json({success:true,person:name})
})


app.post('/api/people/postman',(req,res)=>{
    const{name} = req.body;
    if(!name){
        res.status(400).json({success:false,msg:'undefined name'})
    }
    res.status(201).json({success:true,data:[...people,name]})
})

app.put('/api/people/:id', (req,res)=>{
    const {id}= req.params;
    const {name}=req.body;

    const newPerson=people.find((person)=>{
        return person.id===Number(id);
    })

    if(!newPerson){
        return res.status(404).json({success:false,msg:'user not found'})
    }
    
    const newPeople=people.map((person)=>{
        if(person.id===Number(id)){
           return {...person,id:id,name:name};
        }
        return person;
    })
    res.status(201).json({success:true,data:newPeople});
    
})

app.delete('/api/people/:id',(req,res)=>{
    const{id}=req.params;

    const person=people.find((person)=>person.id===Number(id));
    if(!person){
        return res.status(404).json({success:false,msg:'user not found'})
    }
    const newPeople = people.filter((person)=>person.id!==Number(id));

    res.status(202).json({succes:true,data:newPeople})
})

app.listen(5000,()=>{
    console.log('server is running on port 5000...')
})
