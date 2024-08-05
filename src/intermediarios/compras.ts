import { NextFunction, Request, Response } from "express"
import bancoDeDados from "../bancoDeDados"

export const validarComprovante = (req: Request, res: Response, next: NextFunction) => {
    const { comprovante } = req.query

    if(!comprovante) {
        return res.status(401).json({
            mensagem: "Falha na autenticação"
        })
    }
    const [frase, id] = String(comprovante).split('/')

    const idValido = bancoDeDados.usuarios.find((element) => {
        return element.id === id
    })

    if(!idValido) {
        return res.status(401).json({
            mensagem: "Falha na autenticação"
        })
    }

    next()
}

export const validarNovaCompra = (req: Request, res: Response, next: NextFunction) => {
    const { idEvento } = req.body
    const { comprovante } = req.query

    const [frase, id] = String(comprovante)?.split('/')

    if(!idEvento) {
        res.status(400).json({
            mensagem: "O identificador do evento é obrigatório"
          })
    }

    const evento = bancoDeDados.eventos.find((element) => {
        return element.id === idEvento
    })

    if(!evento) {
        return res.status(404).json({
            mensagem: "Evento não encontrado"
          })
    }

    next()
}

export const ValidaCompra = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { comprovante } = req.query
    const [frase, idUsuario] = String(comprovante).split('/')

    const idCompra = bancoDeDados.compras.find(item => {
        return item.id === id
    }) 

    const compraValida = idCompra?.id_usuario === idUsuario

    if(!compraValida) {
        return res.status(404).json({
            mensagem: "Compra não encontrada"
        })
    }

    if(!idCompra) {
        return res.status(400).json({
            mensagem: "Compra não encontrada"
        })
    }

    next()
}

