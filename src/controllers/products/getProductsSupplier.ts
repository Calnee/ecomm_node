import { Request, Response } from "express";
import { MongoClient, Db, SortDirection } from "mongodb";
import mongoUri from "../../config/mongodb-config";

const getProductsSupplier = async (req: Request, res: Response): Promise<any> => {
  const client = new MongoClient(mongoUri);
  let db: Db;

  try {
    await client.connect();
    db = client.db("ecommerce");

    const page = parseInt(req.query.page as string) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    const sortBy = "product_category"; 
    const sortOrder: SortDirection = 1; 

    const filter = {
      product_category: 'food',
    };

    const sortOptions: [string, SortDirection][] = [];
    sortOptions.push([sortBy, sortOrder]);

    

    // const sortOptions: { [key: string]: number } = {};
    // sortOptions[sortBy] = sortOrder;

    const products = await db.collection('products')
      .find(filter)
      .sort(sortOptions)
      .skip(offset)
      .limit(limit)
      .toArray();

    res.status(200).json({ data: products });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
};

export default getProductsSupplier;
