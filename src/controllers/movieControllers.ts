import {Request, Response} from "express";

// Model 
import { MovieModel } from "../models/Movie";

//Logger 
import Logger from "../../config/logger";
import { error } from "console";

// todas são assincronas pois vão trabalhar com banco de dados então tem que esperar ele responder
export async function createMovie(req: Request, res: Response) {
    try{
        // recebendo os dados em json
        const data = req.body
        // esperando um input, que ativa o metodo create
        const movie = await MovieModel.create(data)
        // manda o movie de volta para mostrar no frontend
        return res.status(201).json(movie)
    }catch (e: any) {
        Logger.error(`Erro no sistema: ${e.message}`);
        return res.status(500).json({error: "Por favor, tente mais tarde!"});
    }
}

export async function findMovieById(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const movie = await MovieModel.findById(id);

        if (!movie) {
            // Se o filme não for encontrado, retornar uma resposta com status 404
            return res.status(404).json({ error: "O filme não existe" });
        }

        // Se o filme for encontrado, retornar uma resposta com o filme
        return res.status(200).json(movie);

    } catch (e: any) {
        Logger.error(`Erro no sistema: ${e.message}`);
        return res.status(500).json({error: "Por favor, tente mais tarde!"});
    }
}

export async function getAllMovies(req:Request, res:Response) {
    try {
        
        const movies = await MovieModel.find()
        return res.status(200).json(movies)

    } catch (e: any) {
        Logger.error(`Erro no sistema: ${e.message}`);
        return res.status(500).json({error: "Por favor, tente mais tarde!"})
    }
}

export async function removeMovie(req: Request, res: Response) {
    try {
        const id = req.params.id;
        // usando o método findOneAndDelete do Mongoose, que retorna um documento Mongoose para exclusão, se encontrado. Pois a função delete() não estava funcionando
        const movie = await MovieModel.findOneAndDelete({ _id: id });

        if (!movie) {
            return res.status(404).json({ error: "O filme não existe!" });
        }

        return res.status(200).json({ msg: "Removido com sucesso" });

    } catch (e: any) {
        Logger.error(`Erro no sistema: ${e.message}`);
        return res.status(500).json({ error: "Por favor, tente mais tarde!" });
    }
}

export async function updateMovie(req: Request, res: Response) {
    try {
        // obtendo o ID do filme que será atualizado.
        const id = req.params.id;
        // obtendo os dados a serem atualizados a partir do corpo da solicitação
        const data = req.body;

        // Remover o campo _id dos dados. Isso é feito para evitar a tentativa de modificar o campo _id, que é imutável no MongoDB.
        delete data._id;

        // Use findOneAndUpdate para atualizar o documento
        // Passar como argumentos o filtro { _id: id } para encontrar o filme pelo ID, os novos dados data que serão atualizados e a opção { new: true } para retornar o filme atualizado. Usar o await para aguardar a conclusão da operação
        const movie = await MovieModel.findOneAndUpdate({ _id: id }, data, { new: true });

        if (!movie) {
            return res.status(400).json({ error: "O filme não existe" });
        }

        return res.status(200).json(movie);

    } catch (e: any) {
        Logger.error(`Erro no sistema: ${e.message}`);
        return res.status(500).json({ error: "Por favor, tente mais tarde!" });
    }
}

