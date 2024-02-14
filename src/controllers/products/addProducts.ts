import { Request, Response } from "express";
import { MongoClient, Db, InsertOneResult } from "mongodb";
import mongoUri from "../../config/mongodb-config";

// Assuming you have the MongoClient already initialized somewhere in your code
const client = new MongoClient(mongoUri);

const addProducts = async (req: Request, res: Response): Promise<any> => {
  try {
    // const { product_category, product_name, photo, stock, product_price } = req.body;
    const products:[ { product_category:string, product_name:string, photo:string, stock:string, product_price:string }] = req.body;
   // await client.connect();

    const ecommerce: Db = client.db("ecommerce");

    // const result: InsertOneResult = await ecommerce.collection('products').insertOne({
    //   product_category,
    //   product_name,
    //   photo,
    //   stock,
    //   product_price,
    // });
    const result = await ecommerce.collection('products').insertMany(products);

    // Check if the insertion was successful
    if (result) {
      return res.status(201).json({ message: "Product added successfully"});
    } else {
      return res.status(500).json({ message: "Failed to add product" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    // Close the MongoDB connection in the finally block to ensure it's always closed
    await client.close();
  }
};

export default addProducts;
