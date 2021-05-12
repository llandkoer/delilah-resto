const express = require('express');
const sequelize = require ('./connection');
const router = require('./routes/login');
const app = express()
const Port= 3001;

app.use(express.json())

// app.use(require('./routes/login'))

app.listen(Port, ()=>{
    console.log(`listen in port ${Port}`)
})

