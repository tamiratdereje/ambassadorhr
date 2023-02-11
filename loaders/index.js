//Require http
import { createServer } from 'http'

//Require config
import configs from '../configs.js'


//Require app 
import app from './app.js'

//Start Database Connection
import db_conn from './startDB.js'

export default ()=>{
    
    //Creating the server
    const server = createServer(app)
    
    //Provide the port
    const port = configs.PORT || 3000

    //Listening onto the server
    server.listen(port,()=>{
        console.log(`Server running on port ${port}...`)
    })

    // Implementing the Majestic Close

  process.on("SIGINT", () => {
    server.close(() => {
      console.log(`App is closing`);
    });
    close(() => {
      console.log(`DB is closing`);
    });
  });
}