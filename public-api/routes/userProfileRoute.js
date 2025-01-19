import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router() ;
const prisma = new PrismaClient() ;

router.get('/public/profile' , async(req , res )=>{

    try { 

        const apiKey = req.headers['x-api-key'] ;

        if (!apiKey) {
            return res.status(401).json({ error: "API key is missing" });
          }


    const user = await prisma.user.findUnique({where : {apiKey : apiKey}}) ;

        if(!user) {
            return res.status(403).json({error : "User with this api key does not exist"}) ;
        }
        
        return res.status(200).json(user) ;

    } catch(error) {
        console.log(error) ;
        return res.status(500).json({error : "Internal Server Error"}) ;
    }




}) 


export default router ; 