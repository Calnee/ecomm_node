import { Model} from 'sequelize';

class EcSuppliers extends Model {

    public id? : number;
    public full_name! : string;
    public e_mail! : string;
    public password! : string;
    public profile_pic! : string;
    public registration_id! : string;
    public pur_sub_plan! : string;
    public registration_time_stamp? : Date;
    public createdAt? : Date;
    public updatedAt? : Date;

}

export default EcSuppliers;