"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const express = require("express");
const { dbConnection, mongoose } = require("./src/configs/dbConnection");
const app = express();

/* ------------------------------------------------------- */

// continue from here...
// envVariables to process.env:
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */
// //* LOGGER

// Moved to file:
app.use(require('./src/middlewares/logger'))

/* ------------------------------------------------------- */
//* DOCUMENTATION

//* JSON
app.use('/documents/json', (req, res) => {
  res.sendFile('swagger.json', { root: '.' })
})

//* SWAGGER
const swaggerUi = require('swagger-ui-express')
const swaggerJson = require('./swagger.json')
app.use('/documents/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson, { swaggerOptions: { persistAuthorization: true } }))

//* REDOC
const redoc = require('redoc-express')
app.use('/documents/redoc', redoc({ specUrl: '/documents/json', title: 'Redoc UI' }))


/* ------------------------------------------------------- */
//db connection
dbConnection();

//body parser
app.use(express.json());

// cookie: httpOnly:true XSS Cross Site Scripting, secure:https
const session = require("cookie-session");

// Run with general settings:
app.use(
  session({
    secret: process.env.SECRET_KEY,
    httpOnly: false,
  })
);

// res.getModelList():
app.use(require("./src/middlewares/queryHandler"));

// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PERSONNEL API",
    document: {
      json: 'https://personnelapi-irkn.onrender.com/documents/json',
      swagger: 'https://personnelapi-irkn.onrender.com/documents/swagger/',
      redoc: 'https://personnelapi-irkn.onrender.com/documents/redoc'
    },
    session: req.session,
  });
});

app.use(require("./src/routes/index"))

//not found routes
app.all("*", async (req, res) => {
  res.status(404).send({
    error: true,
    message: "Route not available",
  });
});

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
require('./src/helpers/sync')()

if (process.env.NODE_ENV == "development") {
  return;
  require("./src/helpers/dataCreate")()
    .then((res) => console.log("Data synched"))
    .catch((err) => console.error("Data could not synched"));
}
