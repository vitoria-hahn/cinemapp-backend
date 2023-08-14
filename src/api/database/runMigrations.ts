import fs from "fs";
import path from "path";

import { connectDb } from "./connection";

async () => {
  const pool = await connectDb();

  const fileDatabaseDir = path.join(__dirname, "migrations");

  fs.readdir(fileDatabaseDir, (error, files) => {
    files.forEach((file) => {
      fs.readFile(path.join(fileDatabaseDir, file), async (error, content) => {
        if (error) {
          console.error(error);
        }

        const runMigrationQuery = content.toString();

        await pool.query(runMigrationQuery);
        console.log(content.toString);
      });
    });
  });
};
