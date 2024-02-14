import express, { Request, Response } from "express";
import subPlan from "../models/subPlan";

const viewplan = async (req:Request, res: Response): Promise<any> => {

    try{

    const subscriptionPlan = await subPlan.findAll();
    res.status(200).json({message:subscriptionPlan});

    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'Internal server error'});
    }
}

export default viewplan;