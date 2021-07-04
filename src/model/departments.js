
module.exports = (sequelize, DataTypes) => {
    const depaertments = sequelize.define('depaertments', {
        
        depaertmentName: DataTypes.STRING,
        depaertmentDesc:DataTypes.STRING,
        onDelete: 'CASCADE',
     
    })

    return depaertments;
}

