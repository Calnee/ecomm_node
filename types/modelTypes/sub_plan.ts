import { Model} from 'sequelize';

class subPlan extends Model {

    public id? : number;
    public plan_name! : string;
    public sub_fee! : number;
    public no_of_customers! : number;
    public createdAt? : Date;
    public updatedAt? : Date;
}

export default subPlan;