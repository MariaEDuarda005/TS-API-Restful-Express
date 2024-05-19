// Importe o módulo dotenv
require('dotenv').config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;


// Use as variáveis de ambiente conforme necessário
console.log("Usuário do banco de dados:", dbUser);
console.log("Senha do banco de dados:", dbPassword);

export default {
    port: 3000,
    dbUri: 
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.cfac1rn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&appName=Cluster0`,
    env: "development",
};

// mongodb+srv://mf548800:<password>@cluster0.cfac1rn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 - mchhbkj