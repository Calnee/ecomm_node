import EcSuppliers from "../../models/ec_suppliers";
import express, { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import ec_customer from "../../models/ec_customers";

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

// const login = async (req: Request, res: Response): Promise<Response<any>> => {
//   try {
//     const { password, e_mail, user_type } = req.body;

//     //supplier login
//     if (user_type == "supplier") {
//       const supplier = await EcSuppliers.findOne({
//         where: {
//           e_mail: e_mail
//         },
//       });


//       if (supplier != null) {
//         if (supplier && bcrypt.compareSync(password, supplier.password)) {
//           const token = jwt.sign({ user_reg: supplier?.registration_id, user_type }, "my_secret", { expiresIn: "24h" });
//           return res
//             .status(200)
//             .json({
//               token,
//               message: "Login successful",
//               user: supplier.id,
//               client_type: user_type
//             });
//         } else {
//           // Handle the case where the password doesn't match
//           return res.status(400).json({ error: "Invalid credentials" });
//         }
//       } else {
//         // Handle the case where the supplier is not found
//         return res.status(400).json({ error: "Invalid credentials" });
//       }
//     } else {
//       // Handle the case where the user type is not "supplier"
//       return res.status(400).json({ error: "Wrong user type" });
//     }

//     //customer login
//     if (user_type == "customer") {
//       const customer = await ec_customer.findOne({
//         where: {
//           e_mail: e_mail
//         },
//       });


//       if (customer != null) {
//         if (customer && bcrypt.compareSync(password, customer.password)) {
//           const token = jwt.sign({ user_reg: customer?.registration_id, user_type }, "my_secret", { expiresIn: "24h" });
//           return res
//             .status(200)
//             .json({
//               token,
//               message: "Login successful",
//               user: customer.id,
//               client_type: user_type
//             });
//         } else {
//           // Handle the case where the password doesn't match
//           return res.status(400).json({ error: "Invalid credentials" });
//         }
//       } else {
//         // Handle the case where the supplier is not found
//         return res.status(400).json({ error: "Invalid credentials" });
//       }
//     } else {
//       // Handle the case where the user type is not "supplier"
//       return res.status(400).json({ error: "Wrong user type" });
//     }

//   } catch (error: any) {
//     console.log(error);
//     return res.status(401).json({ error: "Login error" });
//   }
// };
const login = async (req: Request, res: Response): Promise<Response<any>> => {
  try {
    const { password, e_mail, user_type } = req.body;

    // Check if user_type is "supplier" or "customer"
    if (user_type === "supplier" || user_type === "customer") {
      const model = user_type === "supplier" ? EcSuppliers : ec_customer;

      const user = await model.findOne({
        where: {
          e_mail: e_mail,
        },
      });

      if (user !== null) {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign(
            { user_reg: user?.registration_id, user_type },
            "my_secret",
            { expiresIn: "24h" }
          );
          return res.status(200).json({
            token,
            message: "Login successful",
            user: user.id,
            client_type: user_type,
          });
        } else {
          // Handle the case where the password doesn't match
          return res.status(400).json({ error: "Invalid credentials" });
        }
      } else {
        // Handle the case where the user (supplier or customer) is not found
        return res.status(400).json({ error: "Invalid credentials" });
      }
    } else {
      // Handle the case where the user type is neither "supplier" nor "customer"
      return res.status(400).json({ error: "Wrong user type" });
    }
  } catch (error: any) {
    console.log(error);
    return res.status(401).json({ error: "Login error" });
  }
};

export default login;



