const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(process.env.DB, process.env.USERID, process.env.PASSWORD, {
    host: process.env.DBURL,
    dialect:process.env.DATABASE,
    logging:false,
    pool: {max:5, min:0, idle:10000}
});


sequelize.authenticate().then(() => {
    console.log('Successfully database connected')
}).catch((err) => {
    console.log('Getting Error in database connection: ' + err);
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync()
    .then(() => {
        console.log('Successfully Sync');
    })
    .catch(err => {})


db.employees = require('../model/employees')(sequelize, DataTypes)
db.projects = require('../model/projects')(sequelize, DataTypes)
db.departments = require('../model/departments')(sequelize, DataTypes)


db.employee_project = require('../model/employee_project')(sequelize, DataTypes)
db.department_projects = require('../model/department_projects')(sequelize, DataTypes)
db.employees_under_department = require('../model/employees_under_department')(sequelize, DataTypes)


db.employee_project.belongsTo(db.projects, {foreignKey:'proj_id'})
db.projects.hasMany(db.employee_project, {foreignKey:'proj_id'})

db.employee_project.belongsTo(db.employees, {foreignKey:'emp_id'})
db.employees.hasMany(db.employee_project, {foreignKey:'emp_id'})

db.employees_under_department.belongsTo(db.departments, {foreignKey:'dept_id'})
db.departments.hasMany(db.employees_under_department, {foreignKey:'dept_id'})

db.employees_under_department.belongsTo(db.employees, {foreignKey:'emp_id'})
db.employees.hasMany(db.employees_under_department, {foreignKey:'emp_id'})


db.department_projects.belongsTo(db.projects, {foreignKey:'proj_id'})
db.projects.hasMany(db.department_projects, {foreignKey:'proj_id'})

db.department_projects.belongsTo(db.departments, {foreignKey:'dept_id'})
db.departments.hasMany(db.department_projects, {foreignKey:'dept_id'})





















module.exports = db;
