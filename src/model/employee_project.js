module.exports = (sequelize, DataTypes) => {
    const employee_project = sequelize.define('employee_projects', {
       
        proj_id: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          emp_id: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          onDelete: 'CASCADE',
        

    });


    return employee_project;
}