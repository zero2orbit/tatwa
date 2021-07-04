const express = require('express');

const commonController = require('../controller/commonController')


const router = express.Router()

router.post('/employee/project/add', commonController.addEmployeeUnderProject)
router.post('/department/project/add', commonController.addDepaertmentUnderProject)
router.post('/employee/department/add', commonController.addEmployeeUnderDepartment)

router.post('/employee/project/details', commonController.getEmployeeProjectDetailsByEmployeeId)






module.exports = router