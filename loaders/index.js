//Require http
const http = require('http')

//Require config
const config = require('../configs')


//Require app 
const app = require('./app')

//Start Database Connection
const db_conn = require('./startDB')

module.exports = ()=>{
    
    //Creating the server
    const server = http.createServer(app)
    
    //Provide the port
    const port = config.PORT || 3000

    //Listening onto the server
    server.listen(port,()=>{
        console.log(`Server running on port ${port}...`)
    })

    // Implementing the Majestic Close

  process.on("SIGINT", () => {
    server.close(() => {
      console.log(`App is closing`);
    });
    db_conn.close(() => {
      console.log(`DB is closing`);
    });
  });
}