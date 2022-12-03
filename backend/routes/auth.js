// get les modules
const express = require('express');

const router = express.Router();

// all function and middleware inside poste()
const {register,getUser, login ,forgotpassword ,resetpassword,deletUser,editUser,findOne} = require('../controllers/auth');
router.route("/register").post(register);
router.route("/register1").get(getUser);

router.route("/login").post(login);
router.route("/forgotpassword").post(forgotpassword);
router.route("/resetpassword/:resetToken").put(resetpassword);
router.route("/delete/:idUser").delete(deletUser);
router.route("/edit/:idUser").put(editUser);
router.route("/getById/:id").get(findOne);

module.exports = router;