const express = require('express');
const router = express.Router();
const boletos = require('./boletos');

router.use(express.json());

function mostrarPessoas() {
    return listaPessoas;
}

function mostrarPessoa(id) {
    const pessoa = listaPessoas.find(p => p.id == id);
    return pessoa;
}

function criarPessoa(pessoa) {
    if (pessoa.nome && pessoa.cpf != "") {
        pessoa.id = listaPessoas.length + 1;
        listaPessoas.push(pessoa);
        return pessoa;
    } else {
        return res.status(400).send("Preencha os campos!");
    }
}

function editarPessoa(id, pessoa) {
    const index = listaPessoas.findIndex(p => p.id == id);
    pessoa.id = id;
    listaPessoas[index] = pessoa;
    return pessoa;
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
    res.json(mostrarPessoa(req.params.id));
});

router.post('/', (req, res) => {
    res.send(criarPessoa(req.body));
});

router.put('/:id', (req, res) => {
    res.json(editarPessoa(req.params.id,req.body));
});

router.delete('/:id',(req,res)=>{

})

module.exports = {
    router,
    boletos,
    mostrarPessoas,
    mostrarPessoa,
    criarPessoa,
    editarPessoa
}