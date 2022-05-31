const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

router.use(express.json());

function mostrarPessoas() {
    return listaPessoas;
}

function mostrarPessoa(id,pessoa){
    id = req.params.id;
    pessoa = listaPessoas.find(p => p.id == id);
    return pessoa;
}

function criarPessoa(pessoa){
    pessoa = req.body;
    if (pessoa.nome && pessoa.cpf != "") {
        pessoa.id = listaPessoas.length + 1;
        listaPessoas.push(pessoa);
        return pessoa;
    } else {
        return res.status(400).send("Preencha as informações!");
    }
}

const listaPessoas = [
    {
        id: 1,
        nome: "Matheus",
        cpf: "123"
    },
    {
        id: 2,
        nome: "Felipe",
        cpf: "321"
    },
    {
        id: 3,
        nome: "Kenzo",
        cpf: "213"
    }
];

router.get("/", (req, res) => {
    res.json(mostrarPessoas());
});

router.get('/:id', (req, res) => {
    res.json(mostrarPessoa());
});

router.post('/', (req, res) => {
    res.json(criarPessoa());
});

module.exports = {
    router,
    mostrarPessoas,
    mostrarPessoa,
    criarPessoa
}