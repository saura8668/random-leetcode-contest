import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://saura8668:test@cluster0.1kje6jg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    await client.db("leetcode").command({ ping: 1 });
    console.log("Pinged your 'leetcode' database. You successfully connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }
}

export { client };
