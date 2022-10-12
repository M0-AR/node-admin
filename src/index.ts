import express, { Request, Response } from "express";
import cors from "cors";
import { routes } from "./routes";
import { createConnection } from "typeorm";

createConnection()
  .then(async (connection) => {
    const app = express();

    app.use(express.json());
    app.use(
      cors({
        credentials: true,
        origin: ["http://localhost:3000"],
      })
    );

    routes(app);

    app.listen(8000, () => {
      console.log("listening to port 8000");
    });
  })
  .catch((error) => console.log("Data Access Error: ", error));
