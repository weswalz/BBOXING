import { MongoClient } from 'mongodb';

const uri = import.meta.env.MONGODB_URI || process.env.MONGODB_URI;
const client = new MongoClient(uri);

let isConnected = false;

export async function connectToDatabase() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
    console.log('Connected to MongoDB');
  }
  return client.db();
}

export async function getCollection(collectionName) {
  const db = await connectToDatabase();
  return db.collection(collectionName);
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await client.close();
  process.exit(0);
});
