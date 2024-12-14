'use strict'

//! sen kimsin

const Token = require('../models/token');

module.exports = async (req, res, next) => {

    //Authorization: Token ...
    //Authorization: Apikey ...
    //Authorization: Bearer ...
    //! bu middleware 'Token ...' formatinda gelen headerlari kontrol eder

    const auth = req.headers?.authorization || null;
    // Token ...tokenKey...

    const tokenKey = auth ? auth.split(' ') : null;
    // ['Token', 'tokenKey']

    if(tokenKey && tokenKey[0] == 'Token'){
        
        const tokenData = await Token.findOne({token: tokenKey[1]}).populate('userId');
        console.log(tokenData);

        if(tokenData) req.user = tokenData.userId;

        console.log(req.user)
    }

    next();
}