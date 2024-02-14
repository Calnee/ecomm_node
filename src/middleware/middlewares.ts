
import express, {Express, NextFunction, Request, Response } from 'express';
import router from '../roots';

const middleWare = (req:Request, res:Response, next:NextFunction) => {
    if(req.headers["x-api-key"]==="25"){
      res.setHeader("set-cookie",["type=ninja","language=java"]);
      next();
    }
    else{
      res.status(400).json({message:"error"});
    }
  }

  router.use(middleWare);

export default middleWare;