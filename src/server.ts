import express, {Express, NextFunction, Request, Response } from 'express';

const app:Express= express();

import sequelize from "./config/sequelize-config";
import cors from 'cors';


import indexRoutes from './roots/index.ts';
import supplierRoutes from './roots/supplierRoutes.ts';
import subPlanRoute from './roots/subPlanRoute.ts';
import requestPlan from './roots/requestPlan.ts';
import { connectToMongoDb } from './services/mongodb.ts';
import { stopMongoDb } from './services/mongodb.ts';
import addProducts from './roots/addProducts.ts';

app.use(express.json());
app.use(cors());
app.use('/api/v2',indexRoutes);
// app.use(middleWare);
//app.use('/api/v1',mioddleWare,supplierRoutes);
app.use('/api/v1',supplierRoutes);
app.use('/api/v3',subPlanRoute);
app.use('/api/v4',requestPlan);
app.use('/api/v5',addProducts);
connectToMongoDb();
// app.use(req, res, next) => middleWare (req, res, next);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synced");
  })

  .catch((error:any) => {
    console.log("Database not synced", error);
  });

process.on('SIGINT', () => {
  sequelize.close();
  stopMongoDb();
  process.exit();
});

process.on('exit', () => {
  sequelize.close();
  stopMongoDb();
});


app.listen(3000, () => console.log("listening..."));
