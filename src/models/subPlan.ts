import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/sequelize-config';
import EcSuppliers from '../../types/modelTypes/ec_suppliers';
import subPlan from '../../types/modelTypes/sub_plan';


subPlan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      //primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    }  ,
    plan_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    // plan_name: {
    //   type:DataTypes.STRING,
    //   allowNull: true,

    // },
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
      indexes: [
      {
        unique: true,
        fields: ['plan_id'],

      },
      // Add other indexes if needed
    ],

    sequelize,
    modelName: 'subPlan',
    tableName: 'subPlan',
  }

)


export default subPlan ;