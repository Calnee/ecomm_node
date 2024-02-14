//login

import EcSuppliers from "../models/ec_suppliers";
import express, {Router, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import login from "../controllers/authentication/login";
import register from "../controllers/authentication/register";
import adminLogin from "../controllers/authentication/adminLogin.";


const router = Router();

router.post("/register", async (req: Request, res:Response) => {

    register(req, res);

  });

  router.post("/login", async (req:Request, res:Response) => {

   // login(req, res);
    adminLogin(req, res);

  });

  export default router;