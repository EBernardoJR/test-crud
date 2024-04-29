const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const app = express()
const cors = require('cors')

app.use(express.json())
mongoose.connect(`mongodb+srv://emanoel04091999:dTDDcl5WBlbHGqQS@cluster-testes.8s06mil.mongodb.net/?retryWrites=true&w=majority&appName=cluster-testes`, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('DATABASE connected')
}).catch(() => {
    console.log('Error to connect database')
})
app.use(cors())
app.use(routes)

//tests
module.exports = app