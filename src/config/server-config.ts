import { Environment } from "./environment";

export const LOGGER_CONFIG = {
  transport: {
    target: "pino-pretty",
  },
  level: Environment.logger.level,
};

export const CORS_CONFIG = {
  strictPreflight: false,
  origin: "*",
  allowedHeaders: "*",
  exposedHeaders: "*",
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
};