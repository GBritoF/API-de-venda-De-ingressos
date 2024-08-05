import { NextFunction, Request, Response } from "express"
import bancoDeDados from "../bancoDeDados"

export const verificarMaxPreco = (req: Request, res: Response, next: NextFunction) => {
    const { maxPreco } = req.query

    if(!maxPreco) {
        return res.status(200).json(bancoDeDados.eventos)
    }

    if(Number(maxPreco) < 0 || !Number(maxPreco))  {
        return res.status(400).json({
            mensagem: "O preço máximo do evento deve conter apenas números e deve ser positivo"
        })
    }

    next()
}