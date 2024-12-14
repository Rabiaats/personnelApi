'use strict'

const router = require('express').Router();

const {isAdmin} = require('../middlewares/permission');

const token = require('../controllers/token')

router.use(isAdmin)

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