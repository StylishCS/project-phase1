var express = require("express");
const {
  adminLoginController,
  createAdminController,
} = require("../controllers/adminAuth.controllers");
const AdminPrivileges = require("../middlewares/isAdmin");
const upload = require("../utils/uploadImage");
const { createMovieController } = require("../controllers/movies.controllers");
var router = express.Router();

/* Admin Auth */
router.post("/login", adminLoginController);
router.post("/createAdmin", AdminPrivileges, createAdminController);

/* Movies */
router.post(
  "/movies",
  AdminPrivileges,
  upload.fields([
    {
      name: "images",
      maxCount: 3,
    },
    {
      name: "media",
      maxCount: 1,
    },
  ]),
  createMovieController
);

module.exports = router;
