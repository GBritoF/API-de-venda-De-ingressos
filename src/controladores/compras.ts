import { Request, Response } from "express"
import bancoDeDados from "../bancoDeDados"
import { v4 as uuidv4 } from 'uuid';

export const cadastrarCompra = (req: Request, res: Response) =>  {
    const { idEvento } = req.body
    const { comprovante } = req.query

    const [frase, id] = String(comprovante)?.split('/')

    const novaCompra = {
        id: uuidv4(),
        id_usuario: id,
        id_evento: idEvento,
    }

    bancoDeDados.compras.push(novaCompra)

    res.status(201).json(novaCompra)
}

export const listarCompras = (req: Request, res: Response) => {

    const { comprovante } = req.query

    const [frase, id] = String(comprovante).split('/')

    const comprasDoUsuario = bancoDeDados.compras.filter((element) => {
        return element.id_usuario === id
    })

    if (!comprasDoUsuario) {
        return res.status(401).send()
    }

    const arrayCompras = comprasDoUsuario.map(compra => {
        const evento = bancoDeDados.eventos.find((element) => {
            return element.id === compra.id_evento
        })

        if (!evento) {
            return null 
        }

        return {
            idCompra: compra.id,
            idEvento: compra.id_evento,
            nome: evento.nome,
            endereco: evento.endereco,
            data: evento.data,
            preco: evento.preco
        }
    }).filter(compra => compra !== null) 

    return res.status(200).json(arrayCompras)
}

export const deletarCompra = (req: Request, res: Response) => {
    const { id } = req.params
   

    const indexCompra = bancoDeDados.compras.findIndex(item => {
        return item.id === id
    })

    bancoDeDados.compras.splice(indexCompra, 1)

    res.status(204).send()
}
