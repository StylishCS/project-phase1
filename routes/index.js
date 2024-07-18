var express = require("express");
const UserPrivileges = require("../middlewares/isUser");
var router = express.Router();

/* GET home page. */
router.get("/", UserPrivileges);

module.exports = router;
