import { DataTypes, Sequelize } from 'sequelize';
import  sequelize  from '../config/sequelize-config'; // Import the Sequelize instance
import supp_cus_mapp from '../../types/modelTypes/supp_cus_mapp';

supp_cus_mapp.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          }  ,
          customer_id: {
            type: DataTypes.STRING,
            allowNull: false,
          }  ,
          supplier_id: {
            type: DataTypes.STRING,
            allowNull: false,
          }  ,
          status: {
            type: DataTypes.STRING,
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
        modelName: 'cus_sup_mapp',
        tableName: 'cus_sup_mapp'
      }
)

export default supp_cus_mapp;