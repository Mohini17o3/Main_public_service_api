import jwt from 'jsonwebtoken';
import dotenv  from 'dotenv' ;


dotenv.config() ;

function authmiddleware (req , res , next)  {
    const token  = req.headers['authorization']?.split(' ')[1] ;
    const Secret = process.env.TOKEN_SECRET ; 

    if(!token) {
        return res.status(403).json({error: "bad request , token not present"});
    }

    try {
        const decoded = jwt.verify(token , Secret) ;
        req.userId = decoded.userId  ;
        next() ;
    }catch(error) {
        return res.status(403).json({ error: 'Invalid or expired token , try logging again' });
    }


}

export default authmiddleware ; 