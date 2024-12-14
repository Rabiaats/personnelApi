"use strict";

const router = require("express").Router();
/* ------------------------------------------------------- */

const personnel = require("../controllers/personnel");
const idValidation = require("../middlewares/idValidation");

router.route("/").get(personnel.list).post(personnel.create);

router
  .route("/:id")
  .get(idValidation, personnel.read)
  .put(personnel.update)
  .patch(personnel.update)
  .delete(personnel.delete);

/* ------------------------------------------------------- */
module.exports = router;
