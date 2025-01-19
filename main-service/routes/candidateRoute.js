import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import authmiddleware from "../middlewares/authmiddleware.js";

const router = Router() ;
const prisma = new PrismaClient() ;


router.post('/candidate' , authmiddleware, async(req , res) => {

    try {

     const {first_name , last_name , email  , password} = req.body ; 

     const candidateExists = await prisma.candidate.findUnique({where : {email} }) ;
     const userId = req.userId ; 

     if(candidateExists) {
        return res.status(400).json({error : "candidate already exists"}) ;
     }
if(userId) {
    const candidate =  await prisma.candidate.create({
        data : {
           first_name  , 
           last_name , 
           email , 
           password ,
           userId : userId, 
        }
    })

    res.status(200).json({message : "candidate creation success" ,candidate: candidate} );

}

 
    } catch(error) {
        console.log(error);
         res.status(500).json({error : "Internal server error"}) ;
    }
})



router.get('/candidate' , authmiddleware , async(req , res)=> {
    try {
        const userId = req.userId; 

        const candidates = await prisma.candidate.findMany({
            where  : {userId } , 
        }) ;

        res.status(200).json(candidates);
    } catch(error) {
         res.status(500).json({error : "Internal server error"});
    }
})



export default router  ; 