"use strict";

const mongoose = require("mongoose");
const { BadRequestError } = require("../errors/customError");


module.exports = (req, res, next) => {
  console.log(mongoose.Types.ObjectId.isValid(req.params.id));
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new BadRequestError("Invalid MongoDB ID");
  }
  next();
};

