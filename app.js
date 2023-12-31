//require express
const express = require("express");

const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");


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
app.use('/api/posts', postRouter);









//export the app
module.exports = app;
