const express = require("express");
const { RegisterController, LoginController, GetAllUser, GetOtp, UpdatePasswordController, ProfileUpdateController, UpdateUserController, deleteAuser } = require("../contrller/user.controller");
const verifyToken = require("../Middleware/Authentication.Middleware");
const router = express.Router();

router.get("/userdata", GetAllUser);
router.post("/register", RegisterController);
router.post("/login", LoginController);
router.post("/getotp",GetOtp);
router.patch("/updatepassword",UpdatePasswordController);
router.patch("/profileupdate/:id",ProfileUpdateController);
router.put("/userupdate/:id",verifyToken,UpdateUserController);
router.delete("/delete/:id",verifyToken,deleteAuser);

module.exports = router;
