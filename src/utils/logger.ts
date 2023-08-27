import * as winston from "winston";

const logger = winston.createLogger({
  level: "info", // atau sesuaikan level logging yang Anda inginkan
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs.log" }), // file logs akan disimpan dalam root proyek
  ],
});

export default logger;
