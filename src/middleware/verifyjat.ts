import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const verifyjwt = (req:Request, res:Response, next:NextFunction) => {

    let token = req.headers.authorization;
    if(!token){

        return res.status(401).json({error:'token not provided'});
    }

    token = token?.split("Bearer ")[1];
   
    jwt.verify(token as string, 'my_secret', (err, decoded) => {

        if(err){
            return res.status(401).json({error:'failed to authenticate token'});
        }
        req.body.jwt_decoded = decoded;
        next();
    });
    
  };

  export default verifyjwt;