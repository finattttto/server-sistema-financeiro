import {
  AppDataSource,
  MAIN_DATABASE,
  Maintenance,
} from "./persistence/data-source";
import express from "express";
import cors from "cors";
import routes from "./routes/routes";

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 50804;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded());

app.use("/server", routes);

Maintenance.initialize().then(() => {
  Maintenance.query(`Create database ${MAIN_DATABASE};`)
    .catch(() => {})
    .finally(() => {
      AppDataSource.initialize()
        .then(() => {
          AppDataSource.query(`CREATE EXTENSION if not exists unaccent;`)
            .then(() => {})
            .catch(() => {});
          app.listen(PORT, async () => {
            console.log(
              `\n======> Server is running in port: ${PORT}! :D <======\n`
            );
          });
        })
        .catch((error) => {
          console.log("Ops! Ocorreu um erro.");
          console.error(error);
        });
    });
});
