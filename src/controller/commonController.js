var db = require('../db/dbConnection');
const {employeeRegSchema, projectSchema, DepaertmentSchema} = require('../utils/validationSchema')

const Employees = db.employees;
const Project = db.projects;
const Department = db.departments;

const Employees_Projects = db.employee_project;
const Department_Projects = db.department_projects;
const Employeee_Under_Department = db.employees_under_department;

exports.addEmployee = async (req, res) => {

    try {
        const {name, email} = req.body;
       const result =  employeeRegSchema.validate(req.body);

       if (result.error) {
           return res.status(400).json({message: result.error.details[0].message})
       }

        await Employees.create({name, email});
        return res.status(200).json({data:"ok"})
    } catch (e) {
        console.log(e);
        return res.status(400).json({data:e})
    }
    
}

exports.getAllEmployees = async (req, res) => {
    try {

       
        const allEmp = await Employees.findAll({
            attributes: ['id', 'name', 'email']
        })

        return res.status(200).json({data:allEmp})
    } catch (e) {
        return res.status(404).json({data:e.message})
    }
}

exports.getEmployeeById = async (req, res) => {
    try {


        const proj = await Employees_Projects.findAll({where:{emp_id:req.params.id}})

        if (proj) {
            console.log(proj);
        }
        const emp = await Employees.findByPk(req.params.id, {attributes: ['id', 'name', 'email']}
        );

        if (emp == null) {
            return res.status(402).json({data:'No data found'})
        }

        return res.status(200).json({data:emp})
    } catch (e) {
        return res.status(404).json({data:e.message})
    }
}

exports.updateEmployeeById = async (req, res) => {
    try {

        const emp = await Employees.findByPk(req.params.id);

        if (emp == null) {
            return res.status(402).json({data:'No record found'})
        }
        if (req.body === null) {
            return res.status(206).json({data:'please send data'})
        }
        const data  = await Employees.update({name: req.body.name, email: req.body.email}, {
            where: {id:req.params.id}
        }) 
        return res.status(200).json({data:'updated'})
    } catch (e) {
        return res.status(404).json({data:e.message})
    }
}

exports.deleteEmployeeById = async (req, res) => {
    try {
        await Employees.destroy({
            where: {id:req.params.id}
        })
        return res.status(200).json({data:'record deleted successfully'});
    } catch (e) {
        return res.status(400).json({data:e.message})
    }
}



//*************************       PROJECT           */



exports.addProject = async (req, res) => {

    try {
        const {projectName, projectDesc, dept_id} = req.body;

       const result =  projectSchema.validate(req.body);

       if (result.error) {
           return res.status(400).json({message: result.error.details[0].message})
       }

        await Project.create({projectName, projectDesc, dept_id});
        return res.status(200).json({data:"ok"})
    } catch (e) {
        console.log(e);
        return res.status(400).json({data:e.message})
    }
    
}

exports.getAllProjects = async (req, res) => {
    try {
        const allEmp = await Project.findAll({
            attributes: ['id', 'projectName', 'projectDesc'],
            
        })
        return res.status(200).json({data:allEmp})
    } catch (e) {
        return res.status(404).json({data:e.message})
    }
}

exports.getProjectById = async (req, res) => {
    try {
        const pro = await Project.findByPk(req.params.id, {attributes: ['id', 'projectName', 'projectDesc']});

        if (pro == null) {
            return res.status(402).json({data:'No data found'})
        }

        return res.status(200).json({data:pro})
    } catch (e) {
        return res.status(404).json({data:e.message})
    }
}

exports.updateProjectById = async (req, res) => {
    try {


        const emp = await Project.findByPk(req.params.id);

        if (emp == null) {
            return res.status(402).json({data:'No record found'})
        }
        if (req.body === null) {
            return res.status(206).json({data:'please send data'})
        }
        const data  = await Project.update({projectName: req.body.projectName, projectDesc: req.body.projectDesc}, {
            where: {id: req.params.id }
        }) 
        return res.status(200).json({data:'updated'})
    } catch (e) {
        return res.status(404).json({data:e.message})
    }
}

exports.deleteProjectById = async (req, res) => {
    try {
        await Project.destroy({
            where:{id: req.params.id}
        })
        return res.status(200).json({data:'record deleted successfully'});
    } catch (e) {
        return res.status(400).json({data:e.message})
    }
}





////******************************** DEPARTMENT */




exports.addDepartment = async (req, res) => {

    try {
        const {depaertmentName, depaertmentDesc} = req.body;

       const result =  DepaertmentSchema.validate(req.body);

       if (result.error) {
           return res.status(400).json({message: result.error.details[0].message})
       }

        await Department.create({depaertmentName, depaertmentDesc});
        return res.status(200).json({data:"ok"})
    } catch (e) {
        console.log(error);
        return res.status(400).json({data:e.message})
    }
    
}

exports.getAllDepartments = async (req, res) => {
    try {
        const allEmp = await Department.findAll({
            attributes: ['id', 'depaertmentName', 'depaertmentDesc'],
    
            
        })
        return res.status(200).json({data:allEmp})
    } catch (e) {
        return res.status(404).json({data:e.message})
    }
}

exports.getDepartmentById = async (req, res) => {
    try {
        const emp = await Department.findByPk(req.params.id,  {attributes: ['id', 'depaertmentName', 'depaertmentDesc']});

        if (emp == null) {
            return res.status(402).json({data:'No data found'})
        }

        return res.status(200).json({data:emp})
    } catch (e) {
        return res.status(404).json({data:e.message})
    }
}

exports.updateDepartmentById = async (req, res) => {
    try {

        const emp = await Department.findByPk(req.params.id);

        if (emp == null) {
            return res.status(402).json({data:'No record found'})
        }
      
        const data  = await Department.update({depaertmentName: req.body.depaertmentName, depaertmentDesc: req.body.depaertmentDesc}, {
            where: {
                id : req.params.id
            }
        }) 
        return res.status(200).json({data:'updated'})
    } catch (e) {
        return res.status(404).json({data:e.message})
    }
}

exports.deleteDepartmentById = async (req, res) => {
    try {
        await Department.destroy({
            where:{id : req.params.id}
        })
        return res.status(200).json({data:'record deleted successfully'});
    } catch (e) {
        return res.status(400).json({data:e.message})
    }
}






//////***********************************   CORE */

exports.addEmployeeUnderProject = async (req, res) => {
    try {

       
        const {emp_id, proj_id} = req.body;

        const result = await Employees.findByPk(emp_id);

       

        if (!result) {
            return res.status(404).json({ data: "Employee Not Found"})
        }

        const result1 = await Project.findByPk(proj_id);
        if (!result1) {
            return res.status(404).json({ data: "Project Not Found"})
        }

        await Employees_Projects.create({emp_id, proj_id});
        return res.status(200).json({data:'ok'});
    } catch (e) {
        console.log(e);
        return res.status(400).json({data:e.message})
    }
}


exports.addDepaertmentUnderProject = async (req, res) => {
    try {
        const {dept_id, proj_id} = req.body;

        const result = await Department.findByPk(dept_id);
        if (!result) {
            return res.status(404).json({ data: "Department Not Found"})
        }

        const result1 = await Project.findByPk(proj_id);
        if (!result1) {
            return res.status(404).json({ data: "Project Not Found"})
        }

        await Department_Projects.create({dept_id, proj_id});
        return res.status(200).json({data:'ok'});
    } catch (e) {
        console.log(e);
        return res.status(400).json({data:e.message})
    }
}


exports.addEmployeeUnderDepartment = async (req, res) => {
    try {
        const {dept_id, emp_id} = req.body;

        const result = await Department.findByPk(dept_id);
        if (!result) {
            return res.status(404).json({ data: "Department Not Found"})
        }

        const result1 = await Employees.findByPk(emp_id);
        if (!result1) {
            return res.status(404).json({ data: "Employee Not Found"})
        }

        await Employeee_Under_Department.create({dept_id, emp_id});
        return res.status(200).json({data:'ok'});
    } catch (e) {
        return res.status(400).json({data:e.message})
    }
}





exports.getEmployeeProjectDetailsByEmployeeId = async (req, res) => {

    try {
        const {emp_id, proj_id} = req.body;

        if (emp_id && proj_id) {
            const employeeProjectIds = await Employees_Projects.findAll({
                where:{emp_id, proj_id}, attributes:['proj_id', 'emp_id'],
                include:[Employees, Project]
            })         
            res.status(200).json({data: employeeProjectIds});
        }
        return res.status(206).json({data: 'please send both employee and  project ids'})

        
    } catch (e) {
        res.status(404).json({data:e.message})
    }



}
