import { Request, Response } from "express";
import ec_suppliers from '../models/ec_suppliers';
import subPlan from '../models/subPlan';

const requestPlan = async (req: Request, res: Response): Promise<Response<any>> => {

    const { e_mail, user_type, plan_id } = req.body;

    try {

        if (user_type === 'supplier') {

            if (plan_id) {

                const planId = await subPlan.findByPk(plan_id);
            
                if (planId) {
                    const updatedSupplier = await ec_suppliers.update(
                        {
                            pur_sub_plan: plan_id,  
                        },
                        {
                            where: {
                                e_mail: e_mail
                            }
                        }
                    );

                    return res.status(200).json({ message: 'Subscription plan updated successfully' });

                } else {
                    return res.status(404).json({ error: 'Subscription plan not found' });
                }

            } else {
                return res.status(400).json({ error: 'Subscription plan error' });
            }

        } else {
            return res.status(500).json({ error: 'Wrong user type' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export default requestPlan;