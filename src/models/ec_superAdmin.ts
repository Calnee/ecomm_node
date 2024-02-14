import { DataTypes, Sequelize } from 'sequelize';
import  sequelize  from '../config/sequelize-config'; // Import the Sequelize instance

import superAdmin from '../../types/modelTypes/superAdmin';
import bcrypt from 'bcrypt';

superAdmin.init(

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
      allowNull: false,
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
    modelName: 'superAdmin',
    tableName: 'superAdmin',
    hooks: {
      beforeCreate: (admin: superAdmin) => {
        const hashPassword = bcrypt.hashSync(admin.password, bcrypt.genSaltSync(10));
        admin.password = hashPassword;
      }
    }

  }

)

export default superAdmin ;