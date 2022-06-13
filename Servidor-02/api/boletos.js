const express = require('express');
const router = express.Router();

const boletos = require('./listaBoletos');
const pessoa = require('./pessoas');
const usuario = require('./usuarios');

router.use(express.json());

function mostrarBoletos() {
    return boletos.listaBoletos;
}

function mostrarBoleto(id) {
    const boleto = boletos.listaBoletos.find(b => b.id_boleto == id);
    return boleto;
}

function criarBoleto(boleto) {
    boleto.id = boletos.listaBoletos.length + 1;
    boletos.listaBoletos.push(boleto);
    return boleto;
}

function editarBoleto(id, boleto) {
    boleto.id = id;
    const index = boletos.listaBoletos.findIndex(p => p.id == id);
    boletos.listaBoletos[index] = boleto;
    return boleto;    
}

function boletoPessoa(id){
    const listaBoletosPessoa = [];
    
    boletos.listaBoletos.forEach(function (e){
        if(e.id_pessoa == id){
        listaBoletosPessoa.push(e);
        }
    }) 

    return listaBoletosPessoa;
}

function buscaPessoa(id) {
    return pessoa.mostrarPessoa(id);
}

function buscaUsuario(id) {
    return usuario.mostrarUsuario(id);
}

router.get('/', (req, res) => {
    res.json(mostrarBoletos());
});

router.get('/:id', (req, res) => {
    res.json(mostrarBoleto(req.params.id));
});

router.get('/pessoa/:id', (req, res) => {
    res.json(boletoPessoa(req.params.id));
})

router.post('/', (req, res) => {
    const body = req.body;
    if (body.valor > 0) {
        if (body.id_pessoa) {
            if (buscaPessoa(body.id_pessoa) != null && buscaUsuario(body.id_usuario) != null) {
                res.send(criarBoleto(body));
            } else {
                res.status(400).send("Pessoa/Usuário não existem!");
            }
        } 
    } else {
        res.status(400).send("O valor é inválido!");
    }
})

router.put('/:id', (req, res) => {
    res.send(editarBoleto(req.params.id, req.body));
});

module.exports = {
    router,
    mostrarBoletos,
    criarBoleto,
    mostrarBoleto,
    editarBoleto
}