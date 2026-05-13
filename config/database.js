const mongoose = require('mongoose');
const{ MONGODB_URI } = require('./config');

async function connectDB(){
    try{
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected to '+ mongoose.connection.host);
    } catch(error){
        console.error("Database connection failed : " , error.message);
        process.exit(1);
    }
    
}

module.exports = connectDB;