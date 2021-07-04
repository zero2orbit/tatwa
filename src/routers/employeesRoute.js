const express = require('express');

const commonController = require('../controller/commonController')




const router = express.Router()

router.post('/employee/add', commonController.addEmployee)

router.put('/employee/update/:id', commonController.updateEmployeeById)

router.get('/employees', commonController.getAllEmployees)

router.get('/employee/:id', commonController.getEmployeeById)

router.delete('/employee/delete/:id', commonController.deleteEmployeeById)


module.exports = router