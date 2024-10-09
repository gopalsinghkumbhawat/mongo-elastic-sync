// Import environment variables
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export const Environment = {
  env: process.env.NODE_ENV,
  isDev: process.env.IS_DEV?.toLowerCase() === "true",
  host: process.env.HOST,
  port: parseInt(process.env.PORT ? process.env.PORT : "9000", 10),
  logger: {
    level: process.env.LOG_LEVEL,
  },
  database: {
    mongoDB: {
      url: process.env.MONGO_URL,
    },
    elastic: {
      url: process.env.ELASTIC_SEARCH_URL,
      username: process.env.ELASTIC_SEARCH_USERNAME,
      password: process.env.ELASTIC_SEARCH_PASSWORD,
      delay: parseInt(process.env.ELASTIC_DELAY ? process.env.ELASTIC_DELAY : "1000", 10),
    },
  },
};

console.log("----------------------------------------------------------------");
console.log("- Environment Configuration");
console.log("----------------------------------------------------------------");

console.log(`> NODE_ENV: ${Environment.env}`);
console.log(`> HOST: ${Environment.host}`);
console.log(`> PORT: ${Environment.port}`);
console.log(`> LOG_LEVEL: ${Environment.logger.level}`);

console.log("----------------------------------------------------------------");
