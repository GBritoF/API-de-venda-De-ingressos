import { NextFunction, Request, Response } from "express"
import bancoDeDados from "../bancoDeDados"
import criptografarSenha from "../auxiliares/criptografia"

export const verificaCadastroValido = (req: Request, res: Response, next: NextFunction) => {
    const { nome, email, senha } = req.body

    const emailCadastrado = bancoDeDados.usuarios.find((item) => {
        return item.email === email
    })

    if(!nome || !email || !senha) {
        return res.status(400).json({
            mensagem: "Todos os campos são obrigatórios"
        })
    } else if(emailCadastrado) {
        return res.status(400).json({
            mensagem: "E-mail já cadastrado"
        })
    }

    next()
}

export const verificaLogin = (req: Request, res: Response, next: NextFunction) => {
    const { email, senha} = req.body
    
    const verificaEmail = bancoDeDados.usuarios.find((item) => {
        return item.email === email
    })
    
    if(!email || !senha) {
        return res.status(400).json({
            mensagem: "Todos os campos são obrigatórios"
        })
    }

    const verificaSenhaUsuario = verificaEmail?.senha === criptografarSenha(senha)
    
    if(!verificaEmail || !verificaSenhaUsuario) {
        return res.status(400).json({
            mensagem: "E-mail ou senha inválidos"
        })
    }

    next()
}