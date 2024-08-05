import { Router } from "express";
import { filtrarPrecos } from "./controladores/eventos";
import { verificarMaxPreco } from "./intermediarios/eventos";
import { cadastrarUsuario, loginUsuario } from "./controladores/usuarios";
import { verificaCadastroValido, verificaLogin } from "./intermediarios/usuarios";
import { ValidaCompra, validarComprovante, validarNovaCompra } from "./intermediarios/compras";
import { cadastrarCompra, deletarCompra, listarCompras } from "./controladores/compras";

const rotas = Router();

rotas.get('/', (req, res) => {
    return res.send({
        mensagem: "API de vendas de ingressos"
    })
})

rotas.get("/eventos", verificarMaxPreco, filtrarPrecos)

rotas.post("/usuarios", verificaCadastroValido, cadastrarUsuario)

rotas.post("/login", verificaLogin, loginUsuario )

rotas.post("/compras", validarComprovante, validarNovaCompra, cadastrarCompra)

rotas.get("/compras", listarCompras)

rotas.delete("/compras/:id", validarComprovante, ValidaCompra, deletarCompra)

export default rotas;
