import EcSuppliers from "../../models/ec_suppliers";
import express, { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Promise<
//   Response<any,
//     Record<string, { message: string } | {error: string}, 
//     {
//       token: string;
//       user_type: string;
//       e_mail: string;
//       password: string;
//       registration_id: string;
//       user:string;
//       client_type:string
//     }>>>

//Promise<
//Response<
//any,
//Record<string,| { message: string }
//| { token: string; client_type: "string"; registration_id: string }>
//>
//>

// const login = async (req: Request, res: Response):  Promise <Response<any>> => {
//   try {
//     const { password, e_mail, user_type } = req.body;

//     if (user_type == "supplier") {
//       const supplier = await EcSuppliers.findOne({
//         where: {
//           e_mail: e_mail
//         },
//       });

//       if (supplier != null) {
//         if (supplier && bcrypt.compareSync(password, supplier.password)) {
//           const token = jwt.sign({ user_reg: supplier?.registration_id, user_type }, "my_secret", { expiresIn: "24h" });
//            return res
//             .status(200)
//             .json({
//               token,
//               message: "Login successful",
//               user: supplier.id,
//               client_type: user_type
//             });
//         }
//       } else {
//        return res.status(400).json({ error: "Invalid credentials" });
//       }
//     } else {
//      return res.status(400).json({ error: "Wrong user type" });
//     }
//   } catch (error: any) {
//     console.log(error);
//    return res.status(401).json({ error: "Login error" });
//   }
// };

// export default login;

const login = async (req: Request, res: Response): Promise<Response<any>> => {
  try {
    const { password, e_mail, user_type } = req.body;

    if (user_type == "supplier") {
      const supplier = await EcSuppliers.findOne({
        where: {
          e_mail: e_mail
        },
      });

      if (supplier != null) {
        if (supplier && bcrypt.compareSync(password, supplier.password)) {
          const token = jwt.sign({ user_reg: supplier?.registration_id, user_type }, "my_secret", { expiresIn: "24h" });
          return res
            .status(200)
            .json({
              token,
              message: "Login successful",
              user: supplier.id,
              client_type: user_type
            });
        } else {
          // Handle the case where the password doesn't match
          return res.status(400).json({ error: "Invalid credentials" });
        }
      } else {
        // Handle the case where the supplier is not found
        return res.status(400).json({ error: "Invalid credentials" });
      }
    } else {
      // Handle the case where the user type is not "supplier"
      return res.status(400).json({ error: "Wrong user type" });
    }
  } catch (error: any) {
    console.log(error);
    return res.status(401).json({ error: "Login error" });
  }
};

export default login;

