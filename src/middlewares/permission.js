'use strict'


module.exports = {

    isLogin: (req, res, next) => {
        if(req.user && req.user.isActive){
            next();
        }else {
            res.errorStatusCode = 403;
            // kullanici user degil ve aktif degilse
            throw new Error('No permission: You must Login.')
        }
    },

    isAdmin: (req, res, next) => {
        if(req.user && req.user.isActive && req.user.isAdmin){
            next();
        }else {
            res.errorStatusCode = 403;
            
            throw new Error('No permission: You must Login and to be Admin.')
        }
    },

    isAdminOrLead: (req, res, next) => {
        if(req.user && req.user.isActive && (req.user.isAdmin || req.user.isLead && req.user.departmentId == req.params.id)){
            next();
        }else {
            res.errorStatusCode = 403;
            
            throw new Error('No permission: You must login to be Admin or DepartmentId.')
        }
    }

}