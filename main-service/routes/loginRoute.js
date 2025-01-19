import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken' ;
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const router = Router() ;
const prisma = new PrismaClient();
const Secret = process.env.TOKEN_SECRET;


router.post('/login' , async(req , res)=>{

    try{
        const {email , password} = req.body ; 

        const UserExists  = await prisma.user.findUnique({where:{email}}) ;
         
         if(UserExists){
           
             const passwordCompare = await bcrypt.compare(password , UserExists.password) ;
               if(!passwordCompare){
                   return res.status(401).json({error : 'wrong password , authentication failed'});
               }
           const token =  jwt.sign({userId : UserExists.id} , Secret , {expiresIn :'1h'});

           res.status(200).json({token});

         } else {
            return res.status(401).json({error : "authentication failed"});
         }

    } catch(error){
        res.status(500).json({error : 'Login failed'})
    }
})


export default router  ;

