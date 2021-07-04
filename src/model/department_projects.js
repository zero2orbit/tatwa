module.exports = (sequelize, DataTypes) => {
    const department_projects = sequelize.define('department_projects', {
       
        proj_id: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          dept_id: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          onDelete: 'CASCADE',
        

    });

    return department_projects;
}