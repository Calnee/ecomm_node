import EcSuppliers from "../../models/ec_suppliers";
import express, { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const register = async (req: Request, res: Response):  Promise <void> => {

    try {
        const { full_name, e_mail, password, profile_pic, user_type } = req.body;
        if(user_type=="supplier"){
    
          const createUser = await EcSuppliers.create(
              {
                full_name,
                e_mail,
                password,
                profile_pic,
              },
              { raw: true }
            );
            res.status(200).json({ message: "Supplier registration successfull" });
          
        }
        else{
          res.status(404).json("Wrong credentials");
        }
        
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal error" });
      }
}

export default register;

