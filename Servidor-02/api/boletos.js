const express = require('express');

const router = express.Router();
const pessoa = require("./pessoas");
const usuario = require("./usuarios");

router.use(express.json());

function mostrarBoletos() {
    return listaBoletos;
}

function mostrarBoleto(id) {
    const boleto = listaBoletos.find(b => b.id_boleto == id);
    return boleto;
}

function procurarPessoa(id) {
    return pessoa.mostrarPessoa(id);
}

function procurarUsuario(id) {
    return usuario.mostrarUsuario(id);
}

function criarBoleto(boleto) {
    if (boleto.valor > 0) {
        if (boleto.id_pessoa) {
            if (procurarPessoa(boleto.id_pessoa) != null) {
                boleto.id = listaBoletos.length + 1;
                listaBoletos.push(boleto)
                return boleto;
            } else {
                res.status(400).send("A pessoa não existe!")
            }
        } else {
            if (procurarUsuario(boleto.id_usuario) != null) {
                boleto.id = listaBoletos.length + 1;
                listaBoletos.push(boleto)
                return boleto;
            } else {
                res.status(400).send("O usuário não existe!")
            }
        }
    } else {
        res.status(400).send("O valor é inválido!")
    }
}

function editarBoleto() {

}

function boletoPessoa(id) {
    const boletoPessoa = listaBoletos.find(p => p.id_pessoa == id);
    return boletoPessoa;
}

function boletoUsuario(id) {
    const boletoUsuario = listaBoletos.find(p => p.id_usuario == id);
    return boletoUsuario;
}



const listaBoletos = [
    {
        id_boleto: 1,
        valor: 2,
        status: "aberto",
        id_pessoa: 2,
        nome_pessoa: "Matheus"
    },
    {
        id_boleto: 2,
        valor: 3,
        status: "fechado",
        id_usuario: 2,
        nome_pessoa: "Carlos"
    }
]

router.get('/', (req, res) => {
    res.json(mostrarBoletos());
})

router.get('/:id', (req, res) => {
    res.json(mostrarBoleto(req.params.id));
})

router.get('/pessoa/:id', (req, res) => {
    res.json(boletoPessoa(req.params.id));
})

router.post('/', (req, res) => {
    res.json(criarBoleto(req.body));
})

router.put(':id/', (req, res) => {

})

module.exports = {
    router,
    pessoa,
    usuario,
    mostrarBoletos,
    mostrarBoleto,
    criarBoleto,
    boletoPessoa,
    boletoUsuario,
    procurarPessoa,
    procurarUsuario
}