import express, {Express, NextFunction, Request, Response } from 'express';
import router from '../roots';

interface User {
    registrationId: number;
  }
  
  // Middleware function to check if the user is admin
  const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User; // Assuming you attach the user to the request
  
    if (user && user.registrationId === 1) {
      next();
    } else {
      res.status(403).json({ message: 'Permission denied. Only admin can perform this action.' });
    }
  };
  
  // Example route to create a subscription plan
  router.post('/subscription-plans', isAdmin, (req: Request, res: Response) => {
    // Logic to create a subscription plan goes here
    res.json({ message: 'Subscription plan created successfully!' });
  });
