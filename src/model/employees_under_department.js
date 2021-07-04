module.exports = (sequelize, DataTypes) => {
    const employees_under_department = sequelize.define('employees_under_department', {
       
        emp_id: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          dept_id: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          onDelete: 'CASCADE',
        

    });

    return employees_under_department;
}