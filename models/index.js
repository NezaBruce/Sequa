const dbconf=require("../config/db.config");
const Sequelize=require('sequelize');
const sequelize=new Sequelize(dbconf.DB,dbconf.USER,dbconf.PASSWORD,{
    host:dbconf.HOST,
    dialect:dbconf.dialect,
    operatorsAliases:false,
    pool:{
        max:dbconf.pool.max,
        min:dbconf.pool.min,
        acquire:dbconf.pool.acquire,
        idle:dbconf.pool.idle
    }
});
const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;
db.users=require("./user.models")(sequelize,Sequelize);
module.exports=db;