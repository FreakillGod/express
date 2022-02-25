const authorize=(req,res,next)=>{
    const {user}=req.query;
    if(user==='john'){
        req.user={name:'milkha',id:32};
        
        next();
    }else{
        res.send('LOL not authorized')
    }
}

module.exports = authorize;