/* eslint-disable @typescript-eslint/no-namespace */
import { MongoClient } from 'mongodb';

declare global {
  // Força o TypeScript a entender que esta variável global existe
  // e que ela tem o tipo Promise<MongoClient>.
  // Se já estiver declarada em outro lugar, esta declaração será mesclada.
  namespace NodeJS {
    interface Global {
      _mongoClientPromise: Promise<MongoClient>;
    }
  }
}

const uri = process.env.NEXT_PUBLIC_DATABASE_URI;

if (!uri) {
  throw new Error(
    'Please define the NEXT_PUBLIC_DATABASE_URI environment variable inside .env.local',
  );
}

const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the MongoClient instance is not
  // recreated on every request.
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
