import express, {Router, Request, Response, NextFunction} from 'express';
import adminMiddleware from '../middleware/adminMiddleware';
import createSubPlan from '../services/createSubPLan';
import viewplan from '../services/viewSubPlan';



const router = Router();

router.post('/createsubplan',adminMiddleware, async (req:Request, res:Response) => {

    createSubPlan(req, res);
    
}) ;

router.get('/viewplans',async(req:Request, res:Response) => {

    viewplan(req, res);
})
export default router;