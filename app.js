const express = require('express');
const bodyParser = require('body-parser');
const dotEnv = require('dotenv');
const morgan = require('morgan');

dotEnv.config();

const connectMongodb = require('./init/mongodb');
const { authRoute } = require("./routes");
const { errorHandler } = require("./middlewares");

const notfound=require("./controller/notfound");


//init app
const app = express();

//connect database
connectMongodb();


//third-party middleware 
app.use(express.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
app.use(morgan("dev"));

//route section
app.use('/api/v1/auth', authRoute);

//error handler middleware
app.use(errorHandler);

//not found route
app.use("*",notfound)


module.exports = app;