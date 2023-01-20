
// import mongoose dependency
const mongoose = require('mongoose');

// import config file
const config = require('../config');


// connect to remote 
mongoose.connect(
    config.db.remote, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((conn) =>{
    console.log("Database successfully connected");
}).catch((err)=>{
    console.log('Error while connecting to database');
});

// initializing mongoose connection
const db_conn = mongoose.connection;


// Handle error after connecting
db_conn.on("error", (err) => {
    console.log(`Error while connecting to DB`);
    console.log(err);
  });
  
db_conn.on("disconnected", () => {
console.log(`DB is disconnected`);
});


module.exports = db_conn;