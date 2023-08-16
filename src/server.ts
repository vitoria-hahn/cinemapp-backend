import express from "express";
import { router } from "./routes/CreateMovieRouter";
import { connection } from "./api/database/connection";

import "./api/database/runMigrations";

const app = express();

app.use(express.json());

app.use(router);

app.listen(8888, () => "server running on port 8888");

process.on('SIGINT', function () {
    if (connection) {
        connection.end();
        console.log("Database connection closed!");
    }
});