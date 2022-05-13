const db=require("../models");
const Op=db.Sequelize.Op;
const users=db.users;
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
module.exports.getAll=(req,res)=>{
    users.findAll()
    .then(data=>{
            res.send(data);
    }).catch(err=>{
        res.send(err);
    })
}
module.exports.getOne=(req,res)=>{
    users.findByPk(req.params.id)
    .then(data=>{
            res.send(data);
    }).catch(err=>{
        res.send(err);
    })
}
module.exports.register=(req,res)=>{
    const user={
        name:req.body.name, 
        age:req.body.age,
        address:req.body.address,
        password:req.body.password,
        email:req.body.email,

    }
    users.create(user)
    .then((data)=>{
        res.status(200).json({Status:"Registered",data:{data}});
    }).catch(err=>{
        console.log(err);
    })
}
module.exports.modify=(req,res)=>{
    users.update(req.body,{
        where:{id:req.params.id}
    })
    .then(num=>{
        if(num == 1){
            let usar;
            users.findByPk(req.params.id).then(data=>usar=data);
            res.json({message:"User updated successfully",usar});
        }else{
           res.send("Something went wrong");
        }  
    }).catch(err=>{
       console.log(err);
    })
};
module.exports.deleteAll=(req,res)=>{
    users.destroy({where:{},truncate:false})
    .then(num=>{
        // res.send(`${num}deleted successfully`);
        res.send("user deleted successfully");
    }).catch(err=>{
    console.log(err);
    })
};
module.exports.deleteOne=(req,res)=>{
    users.destroy({where:{id:req.params.id}})
    .then(num=>{
        if(num == 1){
            res.send("User deleted successfully");
        }else{
           res.send("Something went wrong");
        }
    }).catch(err=>{
       console.log(err);
    })
}
module.exports.login=(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const condition=email?{email:{[Op.iLike]:`%${email}%`}}:null;
    let user=false;
    var user1;
    users.findOne({where:condition}).then((data)=>{
        user1=data;
        if(user1 && bcrypt.compare(password,user1.password)){
        const token = jwt.sign({user_id:user.id,email,username:user1.name,age:user1.age,address:user1.address},"key");
        user1.token=token;
        res.status(200).send({user_id:user1.id,email,username:user1.name,age:user1.age,address:user1.address,token});
        }else{
            res.send("Incorect Email or Password ");
        }
    });
}