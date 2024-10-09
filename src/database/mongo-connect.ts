import { MongoClient, Db } from "mongodb";
import { Environment } from "../config/environment";
import Logger from "../helpers/logger";

let database: Db | null = null;
let client: MongoClient | null = null;

export const connectMongoDB = async (): Promise<Db> =>  {
  const uri: string = Environment.database.mongoDB.url;

  if (database) {
    return;
  }

  try {
    client = new MongoClient(uri, {
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    await client.connect();
    database = client.db(); // Get the default database from the client

    Logger.info("Connected to database", { actor: "MongoDB" });
    Logger.info("Database Name", { DB: database?.databaseName });

    return database
  } catch (error) {
    Logger.error("Error connecting to database", { actor: "MongoDB", error });
    throw error;
  }
};

export const disconnectMongoDB = async () => {
  if (!client) {
    return;
  }

  try {
    await client.close();
    Logger.info("Disconnected from database", { actor: 'MongoDB' });
    database = null;
    client = null;
  } catch (error) {
    Logger.info("Error disconnecting from database", { actor: 'MongoDB', error });
    throw error;
  }
};

export const getMongoDBInstance = async(): Promise<Db> => {
  if (!database) {
    throw new Error("Database connection is not established");
  }
  return database;
};
