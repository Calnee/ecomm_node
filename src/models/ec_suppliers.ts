import { DataTypes, Sequelize } from 'sequelize';
import  sequelize  from '../config/sequelize-config'; // Import the Sequelize instance

import EcSuppliers from '../../types/modelTypes/ec_suppliers';
import bcrypt from 'bcrypt';

EcSuppliers.init(

  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    }  ,
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    e_mail:{
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
     
    },
    profile_pic:{
      type:DataTypes.STRING,
      allowNull: true,
    },
    registration_id:{
      type:DataTypes.STRING,
      allowNull: true,
      unique: true,
      defaultValue: () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
      },
    },
    pur_sub_plan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    registration_time_stamp:{
      type:DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt:{
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), 
    },
   
  },
  {
    sequelize,
    modelName: 'ec_suppliers',
    tableName: 'ec_suppliers',
    hooks: {
      beforeCreate: (supplier: EcSuppliers) => {
        const hashPassword = bcrypt.hashSync(supplier.password, bcrypt.genSaltSync(10));
        supplier.password = hashPassword;
      }
    }

  }

)


export default EcSuppliers ;