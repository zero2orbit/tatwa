const express = require('express');

const commonController = require('../controller/commonController')


const router = express.Router()

router.post('/department/add', commonController.addDepartment)

router.put('/department/update/:id', commonController.updateDepartmentById)

router.get('/departments', commonController.getAllDepartments)

router.get('/department/:id', commonController.getDepartmentById)

router.delete('/department/delete/:id', commonController.deleteDepartmentById)


module.exports = router