const express = require('express');
const router = express.Router();
const boletos = require('./boletos');

router.use(express.json());

function mostrarUsuarios(){
    return listaUsuarios;
}

function mostrarUsuario(id){
    const usuario = listaUsuarios.find(u => u.id == id);
    return usuario;
}

function editarUsuario(id, usuario) {
    const index = listaUsuarios.findIndex(u => u.id == id);
    usuario.id = id;
    listaUsuarios[index] = usuario;
    return usuario;
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
    const usuario = req.body;
    if (usuario.nome == undefined || usuario.senha == undefined) {
        res.status(400).send("Preencha as informações!");
    } else {
        usuario.id = listaUsuarios.length + 1;
        listaUsuarios.push(usuario);
        res.json(usuario);
    }
});

router.put('/:id', (req, res) => {
    res.json(editarUsuario(req.params.id,req.body));
});

router.delete('/:id',(req,res)=>{
    const id = req.params.id; 
    if(boletos.boletoUsuario(id)){
        res.status(400).send("O usuário possui boletos!");
    } else {
        const index = listaUsuarios.findIndex(u => u.id == id);
        listaUsuarios.splice(index, 1);
        res.json(listaUsuarios);
    }
})

module.exports = {
    router,
    boletos,
    mostrarUsuarios,
    mostrarUsuario,
    editarUsuario
}