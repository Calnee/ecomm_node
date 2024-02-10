import EcSuppliers from "../../models/ec_suppliers";
import express, { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const profile = async (req: Request, res: Response):  Promise <void> => {

    try {
        const { registration_id, user_type } = req.body;
      
        if (user_type == "supplier") {
          const supplier = await EcSuppliers.findOne({
            where: {
              registration_id: registration_id,
            },
          });
          res
            .status(200)
            .json({message: "Supplier profile:", user_details: supplier });
        } else {
          res.status(404).json("Wrong id");
        }
      } catch (error:any){
        console.log(error);
        res.status(400).json({ error: "Internal error" });
      }
}

export default profile;
