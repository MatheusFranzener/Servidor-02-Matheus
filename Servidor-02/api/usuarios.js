const express = require('express');
const router = express.Router();

router.use(express.json());

function mostrarUsuarios(){
    return listaUsuarios;
}

const listaUsuarios = [
    {
        id:1,
        nome:"Gabriel",
        senha:"g123"
    },
    {
        id:2,
        nome:"Ramos",
        senha:"r123"
    },
    {
        id:3,
        nome:"Antonio",
        senha:"a123"
    }
];

router.get('/',(req,res) =>{
    res.send(mostrarUsuarios());
});

router.get('/:id',(req,res) =>{
    const id = req.params.id;
    const usuario = listaUsuarios.find(u=> u.id == id);
    res.json(usuario);
});

router.post('/', (req, res) => {
    const usuario = req.body;
    if (usuario.nome && usuario.senha != "") {
        usuario.id = listaUsuarios.length + 1;
        listaUsuarios.push(usuario);
        res.json(usuario);
    } else {
        res.status(400).send("Preencha as informações!")
    }
});

module.exports = {
    router,
    mostrarUsuarios
}