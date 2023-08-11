import { Pool } from "pg";
//import dotenv from "dotenv";

//dotenv.config();

const connectDb = async () => {
  const client = new Pool({
    user: "vitoria",
    host: "localhost",
    database: "cinemapp",
    password: "Casa0049",
    port: 5432,
  });

  client.connect(() => {
    console.log("Connected!");
  });

  return { client };
};

export { connectDb };
