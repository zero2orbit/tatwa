const express = require('express');

const commonController = require('../controller/commonController')


const router = express.Router()

router.post('/project/add', commonController.addProject)

router.put('/project/update/:id', commonController.updateProjectById)

router.get('/projects', commonController.getAllProjects)

router.get('/project/:id', commonController.getProjectById)

router.delete('/project/delete/:id', commonController.deleteProjectById)


module.exports = router