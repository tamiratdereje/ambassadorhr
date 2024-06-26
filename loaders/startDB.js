
// import mongoose dependency
import mongoose from 'mongoose';

// import config file
import config from '../configs.js';


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


export default db_conn;