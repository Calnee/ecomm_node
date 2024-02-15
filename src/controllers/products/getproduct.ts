import { Request, Response } from "express";
import { MongoClient, Db, SortDirection } from "mongodb";
import mongoUri from "../../config/mongodb-config";

const getProducts = async (req: Request, res: Response): Promise<any> => {
  const client = new MongoClient(mongoUri);
  let db: Db;

  try {
    await client.connect();
    db = client.db("ecommerce");

    const page = parseInt(req.query.page as string) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    // Get the sorting parameters from the request query
    const sortBy = "product_category"; // Update to the actual field name
    const sortOrder: SortDirection = 1; // 1 for ascending order, -1 for descending order

    // Get the search query from the request (assuming it's in the "searchQuery" query parameter)
    const searchQuery = req.query.searchQuery as string;

    // Define the filter object
    const filter: { [key: string]: any } = {};

    // If a search query is provided, add a regex condition for the "product_category" field
    if (searchQuery) {
      filter.product_category = { $regex: new RegExp(searchQuery, 'i') };
    }

    const sortOptions: [string, SortDirection][] = [];
    sortOptions.push([sortBy, sortOrder]);

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

export default getProducts;
