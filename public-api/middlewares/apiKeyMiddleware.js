import {PrismaClient} from '@prisma/client' ;

const prisma = new PrismaClient() ;


async function apiKeyMiddleware(req , res , next) {
    try {
     const apiKey = req.headers['x-api-key'];

     if(!apiKey){
        return res.status(401).json({error : "API Key is missing"}) ;
     }
     const user = await prisma.user.findUnique({where : {apiKey: apiKey}}) ;

     if(!user){
        return res.status(403).json({error : 'API Key is not valid for the user'}) ;
     }
    req.user = user ;
    next();
} catch(error){
    console.log(error) ;
    return res.send(500).json({error : 'Internal server error'});
}
}

export default apiKeyMiddleware ; 