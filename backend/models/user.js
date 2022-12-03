const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const StudentSchema = require('./student');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required : [true , "Please provide a username"]
    },
    firstname: {
        type : String,
        required : [true, "please provide your firstname"]
    },
    lastname: {
        type : String,
        required : [true, "please provide your lastname"]
    },
    email: {
        type: String,
        required : [true, " Please provide an email"],
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email"
    ]
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength:6,
        select : false
    },
    isAdmin: {
        type: Boolean
    },
    student1: {
        type: Number
        

    },
    resetPasswordToken: String,
    resetPasswordExpire: Date 
  
},{ timestamps: true });

// save the pwd with pre func (mongoose) and hash it 
UserSchema.pre("save", async function(next) {
    // if pwd passed in is not modified will save it
    if(!this.isModified("password")){
        next();
    }
    // hash the pwd with bcrypt func 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();

});

// a function we will use it in auth.js to compare 
UserSchema.methods.matchPasswords = async function ( password ){
    return await bcrypt.compare(password, this.password)
};

// a function we will use it in auth.js to generate a Token
UserSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

UserSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)

    return resetToken;

}

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

const User = mongoose.model("User", UserSchema)
//const Student = mongoose.model("Student", StudentSchema)
module.exports = User;
