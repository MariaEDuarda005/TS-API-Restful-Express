// StreamOptions de morgan, que é um tipo de dados usado para definir como os logs serão tratados.
import morgan, {StreamOptions} from "morgan";
import config from "config";
import Logger from "../../config/logger";


// configurando um objeto chamado stream, que é do tipo StreamOptions. Esse objeto tem um método write, que recebe uma mensagem e a passa para o logger configurado
const stream: StreamOptions = {
    write: (message) => Logger.http(message),
};


//função chamada skip, que determina se o logging deve ser ignorado com base no ambiente de execução da aplicação. Se o ambiente não for "development", a função retorna true, caso contrário, retorna false.z
const skip = () => {
    const env =  config.get<string>("env") || "development"
    return env !== "development"
}

const morganMiddleware = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    {stream, skip}
);

//o stream configurado para direcionar os logs para o seu logger e a função skip para determinar se os logs devem ser ignorados.

export default morganMiddleware;