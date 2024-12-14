"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const department = require("../controllers/department");

const permissions = require('../middlewares/permission');

/* ------------------------------------------------------- */
router.route("/").get(permissions.isAdmin, department.list).post(permissions.isAdmin, department.create);

//! isLogin privaterouter

router
  .route("/:id")
  .get(permissions.isLogin,department.read)
  .put(permissions.isAdmin, department.update)
  .patch(permissions.isAdmin, department.update)
  .delete(permissions.isAdmin, department.delete);

//! /department/:id/personnel

router.get("/:id/personnel", permissions.isAdminOrLead, department.personnels)
module.exports = router;
