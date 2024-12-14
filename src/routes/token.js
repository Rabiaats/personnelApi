'use strict'

const router = require('express').Router();

const {isAdmin} = require('../middlewares/permission');
// const {list, create, read, update, delete: deleteToken} = require('../controllers/token')
// swagger da delete i gosterdi # yapmamiza ragmen 

const token = require('../controllers/token')

// router.route('/')
//     .get(isAdmin, token.list)

router.use(isAdmin)
//! her router a gecmeden once bunu kontrol et kullan

router.route('/')
    .get(token.list)
    .post(token.create);

    //? neden token lari listeliyoruz active olanları görmek icin mi

router.route('/:id')
    .get(token.read)
    .put(token.update)
    .patch(token.update)
    .delete(token.delete);

module.exports = router;