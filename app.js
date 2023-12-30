//require express
const express = require("express");

const userRouter = require("./routes/userRoutes");


//create a new express app
const app = express();

//import cors
const cors = require("cors");

//use the cors middleware
app.use(cors());

//use the express.json middleware
app.use(express.json());

//define the endpoints
app.use('/api/users', userRouter);









//export the app
module.exports = app;
