
module.exports = (sequelize, DataTypes) => {
    const employee = sequelize.define('employees', {
       
        name: DataTypes.STRING,
        email:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false
        },
        onDelete: 'CASCADE',
        
        

    });


    return employee;
}

