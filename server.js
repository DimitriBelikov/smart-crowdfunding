const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' })

const app = express();

mongoose.connect(process.env.MONGOOSE_URL, {user: process.env.API_USER, pass: process.env.API_KEY}).then(
    () => console.log('Connected to Database...')
).catch(
    err => console.log("Database Connection Error: " + err)
)

app.use(express.json());
app.use('/api/user', require('./routes/user'));
app.use('/api/campaign', require('./routes/campaign'));

app.listen(process.env.PORT, ()=> {
    console.log(`Server Running on Port ${process.env.PORT}`);
});