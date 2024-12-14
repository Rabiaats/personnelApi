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
// // npm i morgan -> expressjs.morgan
// const morgan = require('morgan'); 
// //! middleware dir app.use ile cagir
//* HTTP isteklerini kaydetmek icin kullanilir
// express-logger modulu de var ama cok kullanilmaz

// //? app.use(morgan('tiny')); -> 'dev' de ayni
// // clg de -> 
// //* GET /personnel 200 7196 - 93.237 ms bu bilgileri yazdi -> 
// // temel bir log kaydi -> personnel e istek attik anki bilgileri verdi  -> 7196 karakter var

// //? app.use(morgan('short'));
// // ::ffff:127.0.0.1 - GET /personnel HTTP/1.1 200 7196 - 61.743 ms -> tiny den farki ise yarar olarak API vermesi -> isletim sistemindeki user doner projedeki degil

// //? app.use(morgan('common'));
// // ::ffff:127.0.0.1 - - [12/Dec/2024:17:24:09 +0000] "GET /personnel HTTP/1.1" 200 7196(karakter sayisi)
// // api isletim-sistemi-useri ziyaret-ani yapilan-islem URL donen res.status 

// //? app.use(morgan('combined'));
// // ::ffff:127.0.0.1 -(burada useri gosterir) - [12/Dec/2024:17:26:30 +0000] "GET /personnel HTTP/1.1" 200 7196 "-"(referansi verir api nin ) "Thunder Client (https://www.thunderclient.com)"(istek atan herseyin bir imzasi olur) -> user acent -> thunder in surum app 
// //! user agent

// //^ bunlar onceden tanimliydi kendi formatimizi yapalim

// //? app.use(morgan('TIME=":date[iso]" - URL=":url - Method=":method" - IP=":remote-addr" - Ref=":referrer" - Status=":status" - Sign=":user-agent" (:response-time[digits] ms)'))
// // o anki tarihi ver basina TIME YAZ 
// // TIME="2024-12-12T17:38:11.497Z" - URL="/personnel - Method="GET" - IP="::ffff:127.0.0.1" - Ref="-" - Status="200" - Sign="Thunder Client (https://www.thunderclient.com)" (8 ms)

// //^ logger - Write to file -> dosyaya yazalim
// const fs = require('node:fs');
// // yerlesik module
// // app.use(morgan('combined', {
// //   stream: fs.createWriteStream('./access.log') // bu dosyaya loglari sakla
//   //& flags-> dosyaya erisim bicimi nasil eriseyim -> hangi kullanim amaciyla acsin dosyayi -> default u read
//   // 'a' -> sadece yazmak icin 
//   // 'a+' -> hem okurum hem de yazmak icin erisirim yoksa da olustururum
// // }))
// //? ben URL ye istek atinca bu access.log ta tuttu loglari
// // her istek atinca cogaliyor her istegi tum islemleri eee dosya sisecek -> log kayitlarini silmemeliyiz -> saatlik ya da gunluk tutabiliriz
// const now = new Date(); // su anki time
// // logs klasoru -> her gunun jaydini ayri dosyada tut -> gun lazim bana Date( object olarak geliyor)
// const today = now.toISOString().split('T')[0];
// // console.log(today) [ '2024-12-12', '17:56:19.623Z' ] bugunun tarihini aldik

// app.use(morgan('combined', {
//   stream: fs.createWriteStream(`./logs/${today}.log`, {flags:'a+'})}))

app.use(require('./src/middlewares/logger'))

//^ DOCUMENTATION
// npm i swagger-autogen(JSOB creator)(openapi ye ozel JSON) swagger-ui-express redoc-express

//^ JSON -> swaggerdan sonra yazdik 
app.use('/documents/json', (req, res) => {
  // res.sendFile('./swagger.json')
  // route belirle
  res.sendFile('swagger.json', {root: '.'})
})
//! redoc un istedigi URL

//^ Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJson = require('./swagger.json');

// dokumanin goruntulenecegi URL - swagger altyapisini calistir serve -> setup hangi json i swaggerda gostereceksin => dosya ve token i kullanma ayari
// yukaridaki tum ayarlama yaptiktan sonra bu komutu yazdik
//! swagger goruntuleme
app.use('/documents/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson, { swaggerOptions: { persistAuthorization: true } }))
//!http://127.0.0.1:8000/documents/swagger

// redoc URL olarak istiyor swagger.json degil
//^ REDOC
const redoc = require('redoc-express')
app.use('/documents/redoc', redoc({specUrl: '/documents/json', title: 'Redoc UI'}))
//! http://127.0.0.1:8000/documents/redoc

//^ onemli olan swagger ya da redoc degil openapi tarzindasi JSON dosyasi -> JSON basligi ile URL olarak yayinladik
//! http://127.0.0.1:8000/documents/json -> postmande de goruntuleyebiliriz -> solda importtan

//!^ simdi yaptik ama tam istedigimiz gibi gozukmuyor swaggerui onun icin ayarlar yapacagiz -> controller da #swagger yazarak

//! proje icinde arama yapmak 20.15 -> 12.12.2024

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

app.use(require('./src/middlewares/authentication'));
// res.getModelList():
app.use(require("./src/middlewares/queryHandler"));

// HomePath:
app.all("/", (req, res) => {
  console.log(req.user)
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

// router -> hepsini routes/index.js den import ettik
app.use(require('./src/routes/index'));

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
// require('./src/helpers/sync')()

if (process.env.NODE_ENV == "development") {
  // return;
  require("./src/helpers/dataCreate")()
    .then((res) => console.log("Data synched"))
    .catch((err) => console.error("Data could not synched"));
}
