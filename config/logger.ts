// configura a biblioteca winston para lidar com logs na sua aplicação Node.js

import winston from "winston";
import config from "config";
import { debug, warn } from "console";

// como a aplicação vai se comportar diante dos erros
// mapeia nomes de níveis de log para seus respectivos valores. Isso é usado para configurar os níveis de log em sua aplicação.
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
}

// citar o arquivo de configuração
// retorna o nível de log com base no ambiente da aplicação.
const level = () => {
    const env = config.get<string>("env") || "development";
    // Se o ambiente for "development", o nível de log será "debug"; caso contrário, será "warn"
    const isDevelopment = env === "development"
    return isDevelopment ? "debug" : "warn"
}

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white"
}

winston.addColors(colors)

// mostra a cor e o level do problema
const format = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }), 
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} - ${info.level}: ${info.message}`
    )
);

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: "logs/error.log",
        level: "error"
    }),
    new winston.transports.File({filename:"logs/all.log"}),
];

const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports
})

export default Logger;