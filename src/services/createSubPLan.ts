import { Request, Response } from 'express';
import subPlan from '../models/subPlan';

const createSubPlan = async (req: Request, res: Response): Promise<Response<any>> => {
  try {
    const { plan_name, sub_fee, no_of_customers, user_type } = req.body;

    if (user_type === 'admin') {

        const newSubscriptionPlan = await subPlan.create({
            plan_name,
            sub_fee,
            no_of_customers,
          });
      
          return res.status(201).json({ message: 'Subscription plan created successfully', data: newSubscriptionPlan });
    }
    else{

        return res.status(403).json({ error: 'Unauthorized access. Admins only.' });

    }
   
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default createSubPlan;
