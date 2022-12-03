require('dotenv').config({path: "./config.env"})
// get les modules
const express = require('express');
const cors = require('cors');




// connect to database require
const connectDB = require('./config/db')
// middleware 
const errorHandler = require('./middleware/error');

// func run to connect 
connectDB();

// init app veriable from express
const app = express();
app.use(cors())

app.use(express.json());



const student = require('./routes/students');


// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/private', require('./routes/private'));

// Error Handler (should be last piece of middleware)
app.use(errorHandler);

// port web
const port = process.env.PORT || 5000
const server = app.listen(port, () => console.log(`Serveur running on port ${port}...`));

// erreur log
process.on("unhandledRejection", (err, Promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1))
})

app.use('/student', student);
app.use('/api/user', require('./routes/auth'));



