"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const personnel = require("../controllers/personnel");
const idValidation = require("../middlewares/idValidation");

// URL: /personnels
//http://localhost:8000/personnels/login

//! Login Logout
// router.post("/login", personnel.login);
// router.all("/logout", personnel.logout);

router.route("/").get(personnel.list).post(personnel.create);

router
  .route("/:id")
  .get(idValidation, personnel.read)
  .put(personnel.update)
  .patch(personnel.update)
  .delete(personnel.delete);

/* ------------------------------------------------------- */
module.exports = router;
