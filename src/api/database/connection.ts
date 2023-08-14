import { Pool } from "pg";
//import dotenv from "dotenv";

//dotenv.config();

const connectDb = async () => {
  const pool = new Pool({
    user: "vitoria",
    host: "localhost",
    database: "cinemapp",
    password: "password",
    port: 5432,
  });

  pool.connect(() => {
    console.log("Connected!");
  });

  return pool;
};

export { connectDb };
