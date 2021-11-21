const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' })

const app = express();

mongoose.connect(process.env.MONGOOSE_URL, {user: process.env.API_USER, pass: process.env.API_KEY});
conn = mongoose.connection;
conn.once("open", () => console.log('Connected to Database...'));
conn.on("error", console.error.bind(console, "connection error:"));

app.get('/', function(req, res){
    res.send('Server GET at /...');
})

app.listen(process.env.PORT, ()=> {
    console.log(`Server Running on Port ${process.env.PORT}`);
})