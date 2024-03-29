import { DataTypes, Sequelize } from 'sequelize';
import  sequelize  from '../config/sequelize-config'; // Import the Sequelize instance
import Associations from './Association';
import subPlan from '../../types/modelTypes/sub_plan';

Associations();
subPlan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    }  ,
    plan_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sub_fee: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    no_of_customers: {
        type: DataTypes.INTEGER,
        allowNull: false
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
    modelName: 'subPlan',
    tableName: 'subPlan',
  }

)


export default subPlan ;