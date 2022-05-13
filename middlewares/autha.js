const jwt = require('jsonwebtoken');
const verifyToken=(req,res,next)=>{
    
    const bearerHeader=req.headers['authorization'];
    
    if(typeof(bearerHeader) !== "undefined"){
        const bearer=bearerHeader.split(' ');
        const bearerToken=bearer[1];
        req.token=bearerToken;
        const data=jwt.verify(req.token,'key');
        req.user=data;
        next();
    }
    else{
        res.status(403).send("Unothorized")
    }
}
module.exports=verifyToken;