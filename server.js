const app = require('./app');
const { PORT } = require('./config/config.js');
const connectDB = require('./config/database.js')

async function startServer(){
    try{
        await connectDB();

        app.listen(PORT, () => {
        console.log('Server is running on port ' + PORT);
        });
    }catch(error){
        console.log('Error starting server:' , error);
        process.exit(1);
    }
}
startServer()