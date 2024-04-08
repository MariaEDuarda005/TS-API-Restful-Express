import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// decide se deixa seguir ou não

export const validate = (req: Request, res: Response, next: NextFunction) => {
    // lidando com os erros que vem
    const errors = validationResult(req)

    // se esta vazio erro array de erros da um next, continua a criação de filmes no sistema
    if(errors.isEmpty()) {
        return next()
    }

    // matriz vazia chamada extratectErrors para armazenar os erros de validação extraídos da requisição.
    const extratectErrors: object[] = [];

    // mapeando os erros de validação para um formato mais legível, onde cada erro é um objeto com a chave sendo o parâmetro (err.param) e o valor sendo a mensagem de erro (err.msg).
    errors.array().map((err) => extratectErrors.push({ [err.param]: err.msg }));


    return res.status(422).json({
        errors: extratectErrors,
    })
}