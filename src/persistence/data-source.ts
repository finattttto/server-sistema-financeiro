import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

export const MAIN_DATABASE = "sistema_financeiro";
const path = require("path");
const __dirEntity = path.join(__dirname, "..");
require("dotenv").config();

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.DBHOST || "localhost",
  port: Number(process.env.DBPORT || 5432),
  username: process.env.DBUSER || "habilx",
  password: process.env.DBPASSWORD || "koihw2017",
  database: MAIN_DATABASE,
  synchronize: true,
  logging: true,
  entities: [__dirEntity + "/entity/**/*.{js,ts}"],
};

export const AppDataSource = new DataSource({ ...dataSourceOptions });
export const Maintenance = new DataSource({
  ...dataSourceOptions,
  database: "postgres",
  entities: [],
});
