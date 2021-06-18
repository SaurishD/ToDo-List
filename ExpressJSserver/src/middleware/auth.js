import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../controllers/key';

var userId;

export const jwtAuth = (req,res,next) =>{
    try{
        const token = req.header('x-auth-token');
        const decoded = jwt.verify(token, JWT_SECRET);
        userId = decoded.id;
        next();
    }catch{
        res.json({validUser: 0});
        return;
    }
}

export const getId = () =>{
    return userId;
}