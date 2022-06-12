const express = require('express');
const router = express.Router();

router.use(express.json());

const pessoa = require('./pessoas');
const usuario = require('./usuarios');

function mostrarBoletos() {
    const listaBoletos = [];

    pessoa.listaBoletosPessoas.forEach(function (e) {
        listaBoletos.push(e);
    });

    usuario.listaBoletosUsuarios.forEach(function (e) {
        listaBoletos.push(e);
    });

    return listaBoletos;
}

function mostrarBoleto(id) {
    const listaBoletos = [];

    pessoa.listaBoletosPessoas.forEach(function (e) {
        listaBoletos.push(e);
    });

    usuario.listaBoletosUsuarios.forEach(function (e) {
        listaBoletos.push(e);
    });

    const boleto = listaBoletos.find(b => b.id_boleto == id);
    return boleto;
}

function criarBoletoPessoa(boleto) {
    const listaBoletos = [];

    pessoa.listaBoletosPessoas.forEach(function (e) {
        listaBoletos.push(e);
    });

    usuario.listaBoletosUsuarios.forEach(function (e) {
        listaBoletos.push(e);
    });

    boleto.id = listaBoletos.length + 1;
    pessoa.listaBoletosPessoas.push(boleto);
    return boleto;
}

function criarBoletoUsuario(boleto) {
    const listaBoletos = [];

    pessoa.listaBoletosPessoas.forEach(function (e) {
        listaBoletos.push(e);
    });

    usuario.listaBoletosUsuarios.forEach(function (e) {
        listaBoletos.push(e);
    });

    boleto.id = listaBoletos.length + 1;
    usuario.listaBoletosUsuarios.push(boleto);
    return boleto;
}

function editarBoleto(id, boleto) {
    const listaBoletos = [];

    pessoa.listaBoletosPessoas.forEach(function (e) {
        listaBoletos.push(e);
    });

    usuario.listaBoletosUsuarios.forEach(function (e) {
        listaBoletos.push(e);
    });

    const index = listaBoletos.findIndex(b => b.id == id);
    boleto.id = id;
    listaBoletos[index] = boleto;
    return boleto;
}

function boletoPessoa(id) {
    const listaBoletos = [];

    pessoa.listaBoletosPessoas.forEach(function (e) {
        listaBoletos.push(e);
    });

    const boletoPessoa = listaBoletos.find(b => b.id_pessoa == id);
    return boletoPessoa;
}

function boletoUsuario(id) {
    const listaBoletos = [];

    usuario.listaBoletosUsuarios.forEach(function (e) {
        listaBoletos.push(e);
    });

    const boletoUsuario = listaBoletos.find(b => b.id_usuario == id);
    return boletoUsuario;
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
            if (buscaPessoa(body.id_pessoa) != null) {
                res.send(criarBoletoPessoa(body));
            } else {
                res.status(400).send("A pessoa não existe!");
            }
        } else {
            if (buscaUsuario(body.id_usuario) != null) {
                res.send(criarBoletoUsuario(body));
            } else {
                res.status(400).send("O usuário não existe!");
            }
        }
    } else {
        res.status(400).send("O valor é inválido!");
    }
})

router.put('/:id', (req, res) => {
    res.json(editarBoleto(req.params.id, req.body));
});

module.exports = {
    router,
    mostrarBoletos,
    mostrarBoleto,
    boletoPessoa,
    boletoUsuario,
    editarBoleto,
}