import EcSuppliers from "../../models/ec_suppliers";
import ec_customer from "../../models/ec_customers";
import superAdmin from "../../models/ec_superAdmin";
import express, { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { full_name, e_mail, password, profile_pic,user_type } = req.body;

    // Supplier register
    if (user_type === "supplier") {
      const createUser = await EcSuppliers.create(
        {
          full_name,
          e_mail,
          password,
          profile_pic
        },
        { raw: true }
      );
      return res.status(200).json({ message: "Supplier registration successful" });
    }

    // Customer register
    if (user_type === "customer") {
      const createCustomer = await ec_customer.create(
        {
          full_name,
          e_mail,
          password,
          profile_pic,
        },
        { raw: true }
      );
      return res.status(200).json({ message: "Customer registration successful" });
    }

    // Super Admin register
    if (user_type === "admin") {
      const createAdmin = await superAdmin.create(
        {
          full_name,
          e_mail,
          password,
          profile_pic,
          registration_id: 1,
        },
        { raw: true }
      );
      return res.status(200).json({ message: "Admin registration successful" });
    }

    // Default case
    return res.status(404).json("Wrong credentials");

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

export default register;

