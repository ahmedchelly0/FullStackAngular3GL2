const mongoose = require('mongoose')


const Schema = mongoose.Schema


const StudentSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        //required: true
    }

}, { timestamps: true });

const Student = module.exports = mongoose.model('Student', StudentSchema);