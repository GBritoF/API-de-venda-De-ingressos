import { Request, Response } from "express"
import bancoDeDados from "../bancoDeDados"

export const filtrarPrecos = (req: Request, res: Response) => {
    const { maxPreco } = req.query

    const precoFiltrado = bancoDeDados.eventos.filter(item => item.preco <= Number(maxPreco))

    return res.status(200).json(precoFiltrado)
}