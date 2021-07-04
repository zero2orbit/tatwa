
module.exports = (sequelize, DataTypes) => {
    const projects = sequelize.define('projects', {
        
        projectName: DataTypes.STRING,
        projectDesc:DataTypes.STRING,
        onDelete: 'CASCADE',
        
          
    })


    return projects;
}

