// database
const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect(process.env.MONGO_URL, {
        // <-- no longer necessary as the document say
        /* useNewUrlParser: true,
        useCreateIndex : true,
        useUnifiedTopology: true,
        useFindAndModify: true */
    });

    console.log('MongoDB connected Well');
};

module.exports = connectDB;