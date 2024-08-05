import { Request, Response } from "express"
import bancoDeDados from "../bancoDeDados"
import { v4 as uuidv4 } from 'uuid';
import criptografarSenha from "../auxiliares/criptografia";
import fraseSecreta from "../fraseSecreta";

export const cadastrarUsuario = (req: Request, res: Response) => {
    const { nome, email, senha } = req.body

    const novoCadastro = {
        id: uuidv4(),
        nome,
        email,
        senha: criptografarSenha(senha)
    }

    bancoDeDados.usuarios.push(novoCadastro)

    return res.status(201).json({
        id: uuidv4(),
        nome,
        email
    }) 
}

export const loginUsuario = (req: Request, res: Response) => {
    const { email } = req.body
    
    const verificaEmail = bancoDeDados.usuarios.find((item) => {
        return item.email === email
    })
    
    const id = verificaEmail?.id

    return res.status(200).json({
        comprovante: `${fraseSecreta}/${id}`
    })
}