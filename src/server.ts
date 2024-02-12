import express, {Express, NextFunction, Request, Response } from 'express';

const app:Express= express();

import sequelize from "./config/sequelize-config";

import EcSuppliers from "./models/ec_suppliers";
import indexRoutes from './roots/index.ts';
import supplierRoutes from './roots/supplierRoutes.ts';

app.use(express.json());
app.use('/api/v2',indexRoutes);
// app.use(middleWare);
//app.use('/api/v1',mioddleWare,supplierRoutes);
app.use('/api/v1',supplierRoutes);
// app.use(req, res, next) => middleWare (req, res, next);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synced");
  })

  .catch((error:any) => {
    console.log("Database not synced", error);
  });

app.listen(3000, () => console.log("listening..."));
