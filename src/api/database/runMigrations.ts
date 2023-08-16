import fs from "fs";
import path from "path";

import { connection } from "./connection";

(async () => {
  const client = connection;

  const fileDatabaseDir = path.join(__dirname, "migrations");

  fs.readdir(fileDatabaseDir, (error, files) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Started Migrations");

      files.forEach((file) => {
        fs.readFile(
          path.join(fileDatabaseDir, file),
          async (error, content) => {
            if (error) {
              console.error(error);
            }

            const runMigrationQuery = content.toString();

            await client.query(runMigrationQuery);
            console.log("Ended Migrations");
          },
        );
      });
    }
  });
})();