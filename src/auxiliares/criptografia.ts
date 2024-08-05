function criptografarSenha(senha: string) {
    const senhaInvertida = senha.split('').reverse().join('')
    const senhaCriptografada = `zz${senhaInvertida}yy`
    console.log(senhaCriptografada)
    return senhaCriptografada
}

export default criptografarSenha