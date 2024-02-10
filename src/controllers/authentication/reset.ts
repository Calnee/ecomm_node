import EcSuppliers from "../../models/ec_suppliers";
import express, {Router, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const reset = async (req: Request, res: Response):  Promise <void> => {

    const { e_mail, new_password, user_type } = req.body;
try {
  if (user_type == "supplier") {
    const reset = await EcSuppliers.update(
      { password: new_password },
      { where: { password: "password" } }
    );
    console.log(reset);

    res.status(200).json({ message: "password updated" });
  } else {
    res.status(400).json({ error: "Wrong credential" });
  }
} catch(error:any) {
  console.log(error);
  res.status(400).json({ message: "Internal error" });
}

}
export default reset;
