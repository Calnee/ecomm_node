import express, {Router, Request, Response, NextFunction} from 'express';
import requestPlan from '../services/requestPlan';
import inviteStatus from '../services/inviteStatus';
import requestInvite from '../services/requestInvite';

const router = Router();

router.post("/requestplan", async (req:Request, res:Response) => {

    requestPlan(req, res);
});

router.post("/requestinvite", async (req:Request, res:Response) => {

    requestInvite(req, res);
})

router.post("/invitestatus", async (req:Request, res:Response) => {

    inviteStatus(req, res);
});

export default router;