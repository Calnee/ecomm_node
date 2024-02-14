
import EcSuppliers from "../models/ec_suppliers";
import express, {Router, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import addProducts from "../controllers/products/addProducts";


const router = Router();

router.post("/addproduct", async (req: Request, res:Response) => {

    addProducts(req, res);

  });


  export default router;