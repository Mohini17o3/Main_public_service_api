import express from 'express' ;
import bodyParser from 'body-parser';
import cors from 'cors';
import registerRoute from './routes/registerRoute.js';
import loginRoute from './routes/loginRoute.js';
import candidateRoute from './routes/candidateRoute.js';
import authmiddleware from './middlewares/authmiddleware.js';

const app = express() ;
app.use(bodyParser.json());
app.use(cors());

app.post('/register' , registerRoute) ;
app.post('/login' , loginRoute) ;
app.post('/candidate' ,authmiddleware, candidateRoute);
app.get('/candidate' ,authmiddleware, candidateRoute);



app.listen(8000 , ()=>{
    console.log("server started at port 8000");
})




