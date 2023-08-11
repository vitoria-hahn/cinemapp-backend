import fs from "fs";
import path from "path";

import { connectDb } from "./connection";

await (async () => {
  const { client } = await connectDb();

  const fileDatabaseDir = path.join(__dirname, "migrations");

  fs.readdir(fileDatabaseDir, (error, files) => {
    files.forEach((file) => {
      fs.readFile(path.join(fileDatabaseDir, file), async (error, content) => {
        if (error) {
          console.error(error);
        }

        const runMigrationQuery = content.toString();

        await client.query(runMigrationQuery);
        console.log(content.toString);
      });
    });
  });
})();
