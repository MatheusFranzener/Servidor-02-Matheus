const express = require('express');
const router = express.Router();

const boletos = require('./listaBoletos');

router.use(express.json());

const listaPessoas = [
    {
        id: 1,
        nome: "Matheus",
        cpf: "123"
    },
    {
        id: 2,
        nome: "Franzener",
        cpf: "321"
    },
    {
        id: 3,
        nome: "Hohmann",
        cpf: "213"
    }
];

function mostrarPessoas() {
    return listaPessoas;
}

function mostrarPessoa(id) {
    const pessoa = listaPessoas.find(p => p.id == id);
    return pessoa;
}

function criarPessoa(pessoa) {
    pessoa.id = listaPessoas.length + 1;
    listaPessoas.push(pessoa);
    return pessoa;
}

function editarPessoa(id, pessoa) {
    const index = listaPessoas.findIndex(p => p.id == id);
    pessoa.id = id;
    listaPessoas[index] = pessoa;
    return pessoa;
}

function boletoPessoa(id) {
    const boletoDaPessoa = boletos.listaBoletos.find(p => p.id_pessoa == id);
    return boletoDaPessoa;
}

function excluirPessoa(id) {
    const pessoa = listaPessoas.findIndex(p => p.id == id);
    listaPessoas.splice(pessoa, 1);
    return listaPessoas;
}

router.get("/", (req, res) => {
    res.json(mostrarPessoas());
});

router.get('/:id', (req, res) => {
    res.json(mostrarPessoa(req.params.id));
});

router.post('/', (req, res) => {
    const pessoa = req.body;
    if (pessoa.nome == undefined || pessoa.cpf == undefined) {
        res.status(400).send("Preencha os campos!");
    } else {
        res.send(criarPessoa(pessoa));
    }
});

router.put('/:id', (req, res) => {
    res.json(editarPessoa(req.params.id, req.body));
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if (boletoPessoa(id)) {
        res.status(400).send("A pessoa possui boletos.");
    } else {
        res.json(excluirPessoa(id));
    }
})

module.exports = {
    router,
    mostrarPessoas,
    mostrarPessoa,
    criarPessoa,
    editarPessoa,
    boletoPessoa,
    excluirPessoa
}