import superAdmin from "../../models/ec_superAdmin";
import express, { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const adminLogin = async (req: Request, res: Response): Promise<Response<any>> => {

    const { e_mail, password, registration_id, user_type } = req.body;

    try {
        if (user_type === 'admin') {  // Use triple equals for strict equality check
            const admin = await superAdmin.findOne({
                where: {
                    registration_id: 1
                },
            });

            if (admin !== null) {  // Check if admin is not null before using it
                if (bcrypt.compareSync(password, admin.password)) {
                    const token = jwt.sign({ user_reg: admin?.registration_id, user_type }, "admin_secret", { expiresIn: "24h" });
                    return res.status(200).json({
                        token,
                        message: "Admin Login successful",
                        user: admin.id,
                        client_type: user_type
                    });
                } else {
                    return res.status(400).json({ error: 'Invalid credentials' });
                }
            } else {
                // Handle the case where the admin is not found
                return res.status(400).json({ error: 'Invalid credentials' });
            }
        } else {
            return res.status(401).json({ error: 'Wrong user-type' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Admin Login error" });  // Changed status code to 500 for internal server error
    }
}

export default adminLogin;
