const express = require('express');
const { loginUser, registerUser, getProfile} = require('../controllers/userController');
const upload = require('../middleware/multer');
const authUser = require('../middleware/authUser');

const userRouter = express.Router();

userRouter.post("/signup", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/get-profile", authUser, getProfile)

module.exports = userRouter;