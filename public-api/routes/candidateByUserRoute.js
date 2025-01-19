import {Router} from "express" ; 
import { PrismaClient } from "@prisma/client";

const router  =  Router() ; 
const prisma =  new PrismaClient() ;

router.get('/public/candidate', async(req , res)=> {
    try{ 
    const apiKey= req.headers['x-api-key'] ;

    if (!apiKey) {
        return res.status(401).json({ error: "API key is missing" });
      }

    const user = await prisma.user.findUnique({where:{apiKey : apiKey}});  
    if (!user) {
        return res.status(404).json({ error: "User not found for this API key" });
    }

    const candidates = await prisma.candidate.findMany({where : {userId : user.id}}) ;
     
     if(!candidates) {
        return res.status(403).json({error : "candidates with this api key do not exist"});
     }
    if(candidates.length == 0) {
        return res.status(401).json({error : "No cadidates exist for this user"});
    }
     return res.status(200).json(candidates);

} catch(error){
    console.log(error) ;
    return res.status(500).json({error : "Internal server error"});
}
    

})

export default router ;





