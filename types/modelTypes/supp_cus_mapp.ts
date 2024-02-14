import { Model} from 'sequelize';

class SupplierCustomerMapping extends Model {

    public id? : number;
    public customer_id! : string;
    public supplier_id! : string;
    public status! : string;
    public registration_time_stamp? : Date;
    public createdAt? : Date;
    public updatedAt? : Date;

}

export default SupplierCustomerMapping;