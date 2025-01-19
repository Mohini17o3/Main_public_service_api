import { Router } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';


const router = Router() ;
const prisma = new PrismaClient();


router.post('/register' , async(req , res)=>{

    try{
        const {first_name , last_name , email , password} = req.body ; 

        const existingUser  = await prisma.user.findUnique({where:{email}}) ;
         
         if(existingUser){
            return res.status(400).json({error: 'this email is already registered'});
         }

        const hashPassword = await bcrypt.hash(password , 10) ;
        const apiKey = crypto.randomBytes(32).toString('hex');


        const user = await prisma.user.create({
             data : {
                first_name : first_name ,
                last_name : last_name , 
                email  : email , 
                password : hashPassword ,
                apiKey : apiKey , 

             }
        }) ;

        res.status(200).json({message: 'User registration success' ,  user : user , apiKey :apiKey} );
    } catch(error){
        console.log(error);
        res.status(500).json({error : 'Registration failed'})
    }
})


export default router  ;

