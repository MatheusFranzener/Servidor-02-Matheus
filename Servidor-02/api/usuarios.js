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

function criarUsuario(usuario){
    if (usuario.nome && usuario.senha != "") {
        usuario.id = listaUsuarios.length + 1;
        listaUsuarios.push(usuario);
        return usuario;
    } else {
        return res.status(400).send("Preencha as informações!");
    }
}

function editarUsuario(id, usuario) {
    const index = listaUsuarios.findIndex(u => u.id == id);
    usuario.id = id;
    listaUsuarios[index] = usuario;
    return usuario;
}

function removerUsuario(id){
    if(boletos.boletoUsuario(id).length != 0){
        const index = listaUsuarios.findIndex(u => u.id == id);
        listaUsuarios.splice(index, 1);
        res.json(listaUsuarios);
    } else {
        return res.status(400).send("O usuário possui boletos!");
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

router.put('/:id', (req, res) => {
    res.json(editarUsuario(req.params.id,req.body));
});

router.delete('/:id',(req,res)=>{
    res.json((removerUsuario(req.params.id)))
})

module.exports = {
    router,
    boletos,
    mostrarUsuarios,
    criarUsuario,
    mostrarUsuario,
    editarUsuario,
    removerUsuario
}