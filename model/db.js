import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const uri = process.env.DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function run() {
  try {
    await client.connect();
    await client.db(process.env.DB_SCHEMA).command({ ping: 1 });
    console.log(`Pinged your '${process.env.DB_SCHEMA}' database. You successfully connected to MongoDB!`);
  } catch (err) {
    console.error(err);
  }
}

export { client };
