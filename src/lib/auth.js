import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri = process.env.BETTER_AUTH_DB_URL;
if (!uri) {
  throw new Error("BETTER_AUTH_DB_URL is not set. Add it to .env.local");
}

// reuse one MongoClient in dev so hot reloads don't open new connections
const globalForMongo = globalThis;
const client = globalForMongo._mongoClient ?? new MongoClient(uri);
if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClient = client;
}

const db = client.db();

export const auth = betterAuth({
  // reads BETTER_AUTH_SECRET and BETTER_AUTH_URL from the environment
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
  // passing `client` turns on Mongo transactions (needs a replica set / Atlas)
  database: mongodbAdapter(db, { client }),
});
