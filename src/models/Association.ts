import EcSuppliers from "../models/ec_suppliers";
import EcCustomers from "../models/ec_customers";
import SupplierCustomerMapping from "../models/supp_cus_map";
import subPlan from "./subPlan";
 
const associations = () => {
    EcCustomers.hasMany(SupplierCustomerMapping, {
        foreignKey: 'customer_id',
        sourceKey: 'registration_id',
    })
    SupplierCustomerMapping.belongsTo(EcCustomers, {
        foreignKey: 'customer_id',
        targetKey: 'registration_id',
    })
    EcSuppliers.hasMany(SupplierCustomerMapping, {
        foreignKey: 'supplier_id',
        sourceKey: 'registration_id',
    })
    SupplierCustomerMapping.belongsTo(EcSuppliers, {
        foreignKey: 'supplier_id',
        targetKey: 'registration_id',
    })

    subPlan.hasMany(EcSuppliers, {
        foreignKey: 'pur_sub_plan',
        sourceKey: 'plan_id'
    })
}
 
export default associations

// const association = () => {

// Supplier.belongsToMany(Customer, {
//     as: "Mapping",
//     through: MappingTable,
//     foreignKey: "customer_id",
//     otherKey: "supplier_id",
// });

// };

// export default association;
