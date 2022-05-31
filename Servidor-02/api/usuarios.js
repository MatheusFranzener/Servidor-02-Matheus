const express = require('express');
const router = express.Router();

router.use(express.json());

function mostrarUsuarios(){
    return listaUsuarios;
}

function mostrarUsuario(id){
    const usuario = listaUsuarios.find(u => u.id == id);
    return usuario;
}

function criarUsuario(usuario){
    if (usuario.nome && usuario.senha != "") {
        usuario.id = listaUsuarios.length + 1;
        listaUsuarios.push(usuario);
        return usuario;
    } else {
        return res.status(400).send("Preencha as informações!");
    }
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
    res.json(mostrarUsuario(req.params.id));
});

router.post('/', (req, res) => {
    res.json(criarUsuario(req.body));
});

module.exports = {
    router,
    mostrarUsuarios,
    criarUsuario,
    mostrarUsuario
}