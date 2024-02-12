import superAdmin from "../../models/ec_superAdmin";
import express, { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const adminLogin = async (req: Request, res: Response): Promise<Response<any>> => {

    try{

        const{e_mail, password, registration_id, user_type} = req.body;

        if(user_type == "admin"){

            const admin = await superAdmin.findOne({
                where:{
                    registration_id : registration_id
                },
            });
        }

        if(admin! = null){

            

        }

        else{
            return res.status(401).json({error:"Wrong user-type"});
        }
    }
    catch{

    }

}