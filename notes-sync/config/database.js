import "dotenv/config";

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "password",
  database: process.env.DB_NAME || "notes_db",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  dialect: process.env.DB_DIALECT || "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: process.env.NODE_ENV === "development" ? console.log : false,
};

export default dbConfig;
