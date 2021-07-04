const express = require('express');
require('./db/dbConnection')
const employeesRouter = require('../src/routers/employeesRoute')
const projectsRouter = require('../src/routers/projectsRouts')
const departmentsRouter = require('../src/routers/departmentsRoute')
const coreRouts = require('../src/routers/coreRouts')


const path = require('path')

const app = express();

const PORT = process.env.PORT || 9090
app.set('view engine', 'ejs');

app.use('/js', express.static(path.resolve(__dirname, 'pages/js/')))

app.get('/', (req, res) => {
    var data = {"name": "jay"}
    res.status(200).sendFile('home.html', {root: path.join(__dirname, 'pages')});
})

app.get('/project', (req, res) => {
    var data = {"name": "jay"}
    res.status(200).sendFile('project.html', {root: path.join(__dirname, 'pages')});
})

app.get('/department', (req, res) => {
    var data = {"name": "jay"}
    res.status(200).sendFile('department.html', {root: path.join(__dirname, 'pages')});
})

app.use(express.json())



app.use(employeesRouter)
app.use(projectsRouter)
app.use(departmentsRouter)
app.use(coreRouts)

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})