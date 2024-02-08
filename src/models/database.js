const  sequelize  = require("../config/sequelize-config");

const { ecomm } = require("./ec_suppliers");

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database synced");
  })

  .catch((error) => {
    console.log("Database not synced", error);
  });