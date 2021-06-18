import express from 'express';
import mongoose from 'mongoose';
import { createRequire } from 'module';
import routes from './src/routes/todoRoutes.js';
import bcrypt from'bcryptjs';
const require = createRequire(import.meta.url);



const app = express();
const PORT = 2500;


const cors = require('cors')

app.use( express.json() ); 


//Mongo Connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/todoDB',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})



var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',// some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions));

app.use(express.static('pub'));

app.use(`/fetch`,express.static('img'));


routes(app);
app.listen(PORT,()=>{
    console.log(`The app is running on port ${PORT}`);
    //console.log(data);
})