'use client'


//* LOGGER
// npm i morgan -> expressjs.morgan
const morgan = require('morgan'); 
//! middleware dir app.use ile cagir

//? app.use(morgan('tiny')); -> 'dev' de ayni
// clg de -> 
//* GET /personnel 200 7196 - 93.237 ms bu bilgileri yazdi -> 
// temel bir log kaydi -> personnel e istek attik anki bilgileri verdi  -> 7196 karakter var

//? app.use(morgan('short'));
// ::ffff:127.0.0.1 - GET /personnel HTTP/1.1 200 7196 - 61.743 ms -> tiny den farki ise yarar olarak API vermesi -> isletim sistemindeki user doner projedeki degil

//? app.use(morgan('common'));
// ::ffff:127.0.0.1 - - [12/Dec/2024:17:24:09 +0000] "GET /personnel HTTP/1.1" 200 7196(karakter sayisi)
// api isletim-sistemi-useri ziyaret-ani yapilan-islem URL donen res.status 

//? app.use(morgan('combined')); -> yeterli olur
// ::ffff:127.0.0.1 -(burada useri gosterir) - [12/Dec/2024:17:26:30 +0000] "GET /personnel HTTP/1.1" 200 7196 "-"(referansi verir api nin ) "Thunder Client (https://www.thunderclient.com)"(istek atan herseyin bir imzasi olur) -> user acent -> thunder in surum app 
//! user acent

//^ bunlar onceden tanimliydi kendi formatimizi yapalim

//? app.use(morgan('TIME=":date[iso]" - URL=":url - Method=":method" - IP=":remote-addr" - Ref=":referrer" - Status=":status" - Sign=":user-agent" (:response-time[digits] ms)'))
// o anki tarihi ver basina TIME YAZ 
// TIME="2024-12-12T17:38:11.497Z" - URL="/personnel - Method="GET" - IP="::ffff:127.0.0.1" - Ref="-" - Status="200" - Sign="Thunder Client (https://www.thunderclient.com)" (8 ms)

//^ logger - Write to file -> dosyaya yazalim
const fs = require('node:fs');
// yerlesik module
// app.use(morgan('combined', {
//   stream: fs.createWriteStream('./access.log') // bu dosyaya loglari sakla
//* stream aktarim demek
  //& flags-> dosyaya erisim bicimi nasil eriseyim -> hangi kullanim amaciyla acsin dosyayi -> default u read
  // 'a' -> sadece yazmak icin 
  // 'a+' -> hem okurum hem de yazmak icin erisirim yoksa da olustururum
// }))
//? ben URL ye istek atinca bu access.log ta tuttu loglari
// her istek atinca cogaliyor her istegi tum islemleri eee dosya sisecek -> log kayitlarini silmemeliyiz -> saatlik ya da gunluk tutabiliriz
const now = new Date(); // su anki time
// logs klasoru -> her gunun jaydini ayri dosyada tut -> gun lazim bana Date( object olarak geliyor)
const today = now.toISOString().split('T')[0];
// console.log(today) [ '2024-12-12', '17:56:19.623Z' ] bugunun tarihini aldik

// app.use(morgan('combined', {
//   stream: fs.createWriteStream(`./logs/${today}.log`, {flags:'a+'})}))

module.exports = morgan('combined', {
  stream: fs.createWriteStream(`./logs/${today}.log`, {flags:'a+'})
});