const express = require("express");
const app = express();
const sequelize = require("./config/sequelize-config");

const ecomm = require("./models/ec_suppliers");
app.use(express.json());
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synced");
  })

  .catch((error) => {
    console.log("Database not synced", error);
  });

app.post("/register", async (req, res) => {
  try {
    const { full_name, e_mail, password, profile_pic } = req.body;
    const createUser = await ecomm.create(
      {
        full_name,
        e_mail,
        password,
        profile_pic,
      },
      { raw: true }
    );
    res.status(200).json({ message: "Supplier registration successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { full_name, e_mail, user_type } = req.body;

    if (user_type == "supplier") {
      const supplier = await ecomm.findOne({
        where: {
          full_name: full_name,
          e_mail: e_mail,
        },
      });
      res
        .status(200)
        .json({
          message: "Login successfull",
          user: supplier.id,
          client_type: user_type,
        });
    } else {
      res.status(400).json({ error: "wrong user" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Login error" });
  }
});

app.get("/profile", async (req, res) => {
  try {
    const { registration_id, user_type } = req;
    if (user_type == "supplier") {
      const supplier = await ecomm.findOne({
        where: {
          registration_id: registration_id,
        },
      });
      res
        .status(200)
        .json({ message: "Supplier profile:", user_details: supplier });
    } else {
      res.status(404).json("Wrong id");
    }
  } catch (error){
    console.log(error);
    res.status(400).json({ error: "Internal error" });
  }
});

app.patch("/reset", async (req, res) => {
  const { e_mail, new_password, user_type } = req.body;
  try {
    if (user_type == "supplier") {
      const reset = await ecomm.update(
        { password: new_password },
        { where: { password: "password" } }
      );
      console.log(reset);

      res.status(200).json({ message: "password updated" });
    } else {
      res.status(400).json({ error: "Wrong credential" });
    }
  } catch(error) {
    console.log(error);
    res.status(400).json({ message: "Internal error" });
  }
});

app.listen(3000, () => console.log("listening..."));
