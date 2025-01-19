import express from 'express' ; 
import bodyParser from 'body-parser';
import cors from 'cors' ;
import userProfileRoute from './routes/userProfileRoute.js';
import candidateByUserRoute from  './routes/candidateByUserRoute.js' ; 
import apiKeyMiddleware from './middlewares/apiKeyMiddleware.js'

const app = express() ;
app.use(bodyParser.json());
app.use(cors()) ;

app.get('/public/profile' , apiKeyMiddleware , userProfileRoute);
app.get('/public/candidate' , apiKeyMiddleware , candidateByUserRoute);



app.listen(8001 , ()=>{
    console.log("server is running on port 8001") ;
})
