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
    let index;
    
    boleto.id = id;
    index = boleto.listaBoletos.findIndex(p => p.id == id);
    boleto.listaBoletos[index] = boleto;
    return boleto;    
}

function boletoPessoa(id){
    const listaBoletosPessoa = [];
    
    boletos.listaBoletos.forEach(function (e){
        const boletoPessoa = boletos.listaBoletos.find(b => b.id_pessoa == id);
        listaBoletosPessoa.push(boletoPessoa);
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
    res.json(editarBoleto(req.params.id, req.body));
    if (editarBoleto(req.params.id, req.body) == 1) {
        res.status(400).send("O boleto não existe!")
    }
});

module.exports = {
    router,
    mostrarBoletos,
    criarBoleto,
    mostrarBoleto,
    boletoPessoa,
    editarBoleto,
}