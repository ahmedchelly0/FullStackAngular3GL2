const crypto = require('crypto');
const User = require("../models/user");
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

const Users = require("../models/user");


exports.editUser = async (req, res, next) => {
    try{

        const {username, firstname, lastname, email} = req.body; 
        Users.findById(req.params.idUser)
        .then(user => user.updateOne({username, firstname, lastname, email} ).then(() => res.json({ success: true })))
        .catch(err => {
            res.status(404).json({ success: false, id: req.params.idUser, msg: err })
        })

    }catch(error){
        next(error)
    }
}


exports.deletUser = async (req, res, next) => {
    try{

        Users.findById(req.params.idUser)
        .then(user => user.remove().then(() => res.json({ success: true })))
        .catch(err => {
            res.status(404).json({ success: false, id: req.params.idUser, msg: err })
        })

    }catch(error){
        next(error)
    }
}

exports.getUser = async (req, res, next) => {
    try{

         Users
        .find()
        .sort({ date: 1 })
        .then(Users => res.json(Users))
        .catch(err => res.json({ succes: false, msg: err })) 
    }catch(error){
        next(error)
    }
}

exports.register = async (req, res, next) => {
    // is checked res.send("Regester route")
    const {username, firstname, lastname, email, password,isAdmin,student1} = req.body;

    try {
         const user =  User.create({
            username, firstname, lastname, email, password,isAdmin,student1
        }) 

         res.status(200).json({
            success:true,
            user,
            // token: "ahmed",
            
        }) 
        // changed to a token
        // sendToken(user, 200, res);

    } catch (error) {
        /* res.status(500).json({
            success: false,
            error : error.message,
        }) */

        // changed to middleware
        next(error)
    }
    
}

exports.login = async (req, res, next) => {
    //res.send("login route")
    const { email, password } = req.body;

    if(!email || !password ) {
        // res.status(400).json({ success: false, error: "Please provide email and password"})
        return next( new ErrorResponse("Please provide email and password", 401))

    }

    try{
        const user = await User.findOne({ email }).select("+password");
        console.log(user)
        if(!user) {
            // res.status(404).json({ success: false, error : "Invalid credentials"})
            return next( new ErrorResponse("Invalid credentials", 401))
        }

        const isMatch = await user.matchPasswords(password);

        if(!isMatch) {
            // res.status(404).json({ success: false, error: "Invalid credentials"})
            return next( new ErrorResponse("Invalid credentials", 401))
        }

        /* res.status(201).json({
            success:true,
            token:"azertyqsdfgh",
        }) */
        // changed to a token 
        sendToken(user, 200, res);

    }catch(error){
        res.status(500).json({ success: false, error: error.message })

    }
};

exports.forgotpassword = async (req, res, next) => {
    // res.send("forget password route")
    const {email} = req.body;

    try {
        const user = await User.findOne({email});
        console.log(email)

        if(!user){
            return next(new ErrorResponse("Email could not be sent", 404))
        }

        const resetToken = user.getResetPasswordToken();

        await user.save();
        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `

        try {
            await sendEmail({
                to:user.email,
                subject: "Password Reset Request",
                text: message,
            });

            res.status(200).json({ success: true, data: "Email Sent"});

        }catch(error){
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();
            return next(new ErrorResponse("Email could not be sent", 500));

        }
    }catch(error){
        next(error);

    }
};

exports.resetpassword = async (req, res, next) => {
    // res.send("reset password route")
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
        const user = await User.findOne({
            resetPasswordToken,
            // gt = graterThan
            resetPasswordExpire: {$gt: Date.now()}
        })

        if(!user){
            return next(new ErrorResponse("Invalid Reset Token", 400))
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({
            success:true,
            data: "Password Reset Success"
        })
    }catch(error){
        next(error)

    }
};



// create a function for token and call it 
const sendToken = (user, statusCode, res ) => {
    const token =  user.getSignedToken();
    res.status(statusCode).json({ success: true, token})
}