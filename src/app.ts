// ENV variables
require("dotenv").config();

import express from "express";
import config from "config";


const app = express()

//json middleware
app.use(express.json())

// DB
import db from "../config/db"

// Routes
import router from "./router";


//Logger
import Logger from "../config/logger";

// middlewares
import morganMiddleware from "./middleware/morganMiddleware";

// cada vez que eu tenho uma requisiçã ele entra nessa parte, imprimindo as requisições no terminal
// mostrando o verbo, a rota e os status
app.use(morganMiddleware);

app.use("/api/", router);


// app port
const port =  config.get<number>("port")

app.listen(3000, async () => {

    await db();

    Logger.info(`Aplicação está funcionando na porta: ${port}`);
});

