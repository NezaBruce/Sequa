module.exports=(sequelize,Sequelize)=>{
    const users=sequelize.define("users",{
          name: {
            type: Sequelize.STRING
          },
          age: {
            type: Sequelize.INTEGER
          },
          address: {
            type: Sequelize.STRING
          },
          password: {
            type: Sequelize.STRING
          },
          email: {
            type: Sequelize.STRING,
            allowNull:false,
            unique:true
          },
          token: {
            type: Sequelize.STRING,
            },
    });
    return users;
}