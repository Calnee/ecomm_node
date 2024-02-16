import express, { Request, Response } from "express";
import sup_cus_mapp from '../models/supp_cus_map';

const inviteStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { supplier_id, customer_id, status, user_type } = req.body;

        if (user_type === 'customer') {
            const updated = await sup_cus_mapp.update(
                { status: status },
                { where: { customer_id: customer_id } }
            );

            console.log(updated);

            res.status(200).json({ message: 'The invitation status successfully updated' });
        } else {
            res.status(400).json({ error: 'Updation failed' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default inviteStatus;
