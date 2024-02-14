import { Router, Request, Response } from 'express';
import subPlan from '../models/subPlan';
import superAdmin from '../models/ec_superAdmin';

// Middleware to check if the user is an admin
const isAdmin = async (req: Request, res: Response, next: Function) => {
  const { user_type } = req.body; 
  if (user_type === 'admin') {
    next(); // Allow the request to continue to the next middleware or route handler
  } else {
    return res.status(403).json({ error: 'Permission denied. Only admin can perform this action.' });
  }
};

export default isAdmin;