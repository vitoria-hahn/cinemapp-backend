import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();
const connection = new Client({
  user: "vitoria",
  host: "localhost",
  database: "cinemapp",
  password: "password",
  port: 5432,
});

let isConnected = false;

connection
  .connect()
  .then(() => {
    isConnected = true;
    console.log("Connected!");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
  });

async (): Promise<Client> => {
  if (!isConnected) {
    console.log("Connecting to the database...");
    try {
      await connection.connect();
      isConnected = true;
      console.log("New Connection Started!");
    } catch (error) {
      console.error("Error connecting to the database:", error);
    }
  }

  return connection;
};

export { connection };
