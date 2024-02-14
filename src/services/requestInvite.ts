import { Request, Response } from "express";
import sup_cus_mapp from '../models/supp_cus_map';

const requestInvite = async(req:Request, res:Response): Promise<any> => {

    try{
        const {customer_id, supplier_id, status, user_type} = req.body;  

        if(user_type === 'supplier') {

            const mappingEntry = await sup_cus_mapp.create(
                {
                    customer_id: customer_id,
                    supplier_id: supplier_id,
                    status: 'Pending'
                },
                {raw: true}
            );
           return res.status(200).json({message:'Request sent successsfully'});
        }
        else{
            res.status(400).json({error:'Invitation failed'});
        }
    }
    catch(error){
        res.status(500).json({error:'Internal server error'});
    }

}

export default requestInvite;