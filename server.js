const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('dotenv').config({ path: __dirname + '/.env' })

const app = express();

// Database Connection
mongoose.connect(process.env.MONGOOSE_URL, { user: process.env.API_USER, pass: process.env.API_KEY }).then(
    () => console.log('Connected to Database...')
).catch(
    err => console.log("Database Connection Error: " + err)
)

const corsOptions = {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}
// Routing Policies
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + '/campaign documents'));
app.use('/api/user', require('./routes/user'));
app.use('/api/campaign', require('./routes/campaign'));

// Server Listner
app.listen(process.env.PORT, () => {
    console.log(`Server Running on Port ${process.env.PORT}`);
});