import { Sequelize } from "sequelize";
import dbConfig from "../config/database.js";
import defineNoteModel from "./Note.js";

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: dbConfig.logging,
  }
);

const Note = defineNoteModel(sequelize, Sequelize.DataTypes);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    throw error;
  }
};

export { sequelize, Sequelize, Note, testConnection };
