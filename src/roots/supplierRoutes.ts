import EcSuppliers from "../models/ec_suppliers";
import express, {Router, Request, Response, NextFunction} from 'express';
import reset from "../controllers/authentication/reset";
import profile from "../controllers/supplierReg/profile";
import middleWare from "../middleware/middlewares";
import verifyjwt from "../middleware/verifyjat";

const router = Router();


router.get("/profile", verifyjwt,async (req:Request, res:Response) => {
    
    profile(req, res);
    

  });
  
  router.patch("/reset", async (req:Request, res:Response) => {

    reset(req, res);
   
  });

  export default router;