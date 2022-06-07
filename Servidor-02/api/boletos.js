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

function criarBoleto(boleto) {
    if (boleto.valor > 0) {
        if (boleto.id_pessoa) {
            if (pessoa.mostrarPessoa(boleto.id_pessoa) != null) {
                boleto.id = listaBoletos.length + 1;
                listaBoletos.push(boleto)
                return boleto;
            } else {
                res.status(400).send("A pessoa não existe!")
            }
        } else {
            if (usuario.mostrarUsuario(boleto.id_usuario) != null) {
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

function editarBoleto(id, boleto) {
    const index = listaBoletos.findIndex(b => b.id == id);
    boleto.id = id;
    listaBoletos[index] = boleto;
    return boleto;
}

function boletoPessoa(id) {
    const boletoPessoa = listaBoletos.find(b => b.id_pessoa == id);
    return boletoPessoa;
}

function boletoUsuario(id) {
    const boletoUsuario = listaBoletos.find(b => b.id_usuario == id);
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

router.put('/:id', (req, res) => {
    res.json(editarBoleto(req.params.id,req.body));
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
    editarBoleto
}