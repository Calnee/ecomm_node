import Supplier from "../models/ec_suppliers";
import Customer from "../models/ec_customers";
import MappingTable from "../models/supp_cus_map";

const association = () => {

Supplier.belongsToMany(Customer, {
    as: "Mapping",
    through: MappingTable,
    foreignKey: "customer_id",
    otherKey: "supplier_id",
});

};

export default association;
