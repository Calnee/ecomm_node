import EcSuppliers from "../models/ec_suppliers";
import express, {Router, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import addProducts from "../controllers/products/addProducts";
import getProductsSupplier from "../controllers/products/getProductsSupplier";


const router = Router();

router.get("/getproduct", async (req: Request, res:Response) => {

    getProductsSupplier(req, res);

  });


  export default router;