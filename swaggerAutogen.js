"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// Swagger Autogen
// https://swagger-autogen.github.io/docs/
// $ npm i swagger-autogen # JSON creator
// $ npm i swagger-ui-express
// $ npm i redoc-express
/* ------------------------------------------------------- */
require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000
/* ------------------------------------------------------- */

// const options = {
//     openapi:          <string>,     // Enable/Disable OpenAPI.                        By default is null
//     language:         <string>,     // Change response language.                      By default is 'en-US'
//     disableLogs:      <boolean>,    // Enable/Disable logs.                           By default is false
//     autoHeaders:      <boolean>,    // Enable/Disable automatic headers recognition.  By default is true
//     autoQuery:        <boolean>,    // Enable/Disable automatic query recognition.    By default is true
//     autoBody:         <boolean>,    // Enable/Disable automatic body recognition.     By default is true
//     writeOutputFile:  <boolean>     // Enable/Disable writing the output file.        By default is true
// };


// const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0', language:'tr-TR'});
// surumu ve dili 
//! defaultları yeterki
const swaggerAutogen = require('swagger-autogen')();

const packageJson = require('./package.json');

const document = {
    info: {
        version: packageJson.version,
        title: packageJson.name,
        description: packageJson.description,
        // termOfService: 'http://127.0.0.1/#',
        // contact: {name:'Clarusway', email:'qadir@clarusway.com'},
        contact: {name:packageJson.author, email:'qadir@clarusway.com'},
        // license: {name: 'Apache License'}
        license: packageJson.license
    },
    host: HOST + ':' + PORT,
    basePath: '/',
    schemes: ['http', 'https'],
    securityDefinition: {
        Token: {
            type: 'apiKey',
            // header da token gonderme apiKey
            in: 'header',
            name: 'Authorization',
            description: 'Simple Token * Example <b>Token ...tokenkey...</b>'
            // header da authorization basligi ile bu sekilde gonder -> burada openapi de tanimladigimiz icin swaggerda da calisacak
        }
    },
    // kimlik dogrulama islemi -> kullandigim
    security: [{Token: []}],
    // yukarda tanimladigim Token isimli guvenlik yontemini kullan diyorum
    
    definitions: {
        'Department': require('./src/models/department').schema.obj,
        'Personnel': require('./src/models/personnel').schema.obj,
    }
    // her bir modelin field namelerini yazdik #swagger.parameters ta kullanmak icin
    // bu require ile field nameleri aldik
}
// proje genel bilgileri -> ama packagace var neden package den cekmiyoruz

// projemin routes kaynagi nerede butun routes larin ortak alani -> index.js ana dizinde
const routes = ['./index.js']; // routes tara
const outputFile = './swagger.json' // bu dosyaya yaz ->> kendisi olusuyor

// RUN
swaggerAutogen(outputFile, routes, document)

// calis ouyputFile yaz indexedDB.js deki routes lari tara documenttekileri ekle 

// terminalde node swaggerAutogen.js 
// calistiriyoruz her degisiklikte yapmaliyiz

// openapi formatinda taridi ve istenen J>SO>N formatina getirdi 