const express = require('express');
const router = express.Router();

const boletos = require('./listaBoletos');

router.use(express.json());

const listaUsuarios = [
    {
        id:1,
        nome:"Gabriel",
        senha:"g123"
    },
    {
        id:2,
        nome:"José",
        senha:"j123"
    },
    {
        id:3,
        nome:"Cleiton",
        senha:"c123"
    }
];

function mostrarUsuarios(){
    return listaUsuarios;
}

function mostrarUsuario(id){
    const usuario = listaUsuarios.find(u => u.id == id);
    return usuario;
}

function criarUsuario(usuario){
    usuario.id = listaUsuarios.length + 1;
    listaUsuarios.push(usuario);
    return usuario;
}

function editarUsuario(id, usuario) {
    const index = listaUsuarios.findIndex(u => u.id == id);
    usuario.id = id;
    listaUsuarios[index] = usuario;
    return usuario;
}

function boletoUsuario(id){
    const boletos2 = boletos.listaBoletos.find(u => u.id_usuario == id);
    return boletos2;
}

function excluirUsuario(id){
    const usuario = listaUsuarios.findIndex(u => u.id == id);
    listaUsuarios.splice(usuario, 1);
    return listaUsuarios;
}

router.get('/',(req,res) =>{
    res.send(mostrarUsuarios());
});

router.get('/:id',(req,res) =>{
    res.json(mostrarUsuario(req.params.id));
});

router.post('/', (req, res) => {
    const usuario = req.body;
    if (usuario.nome == undefined || usuario.senha == undefined) {
        res.status(400).send("Preencha os campos!");
    } else {
        res.send(criarUsuario(usuario));
    }
});

router.put('/:id', (req, res) => {
    res.json(editarUsuario(req.params.id,req.body));
});

router.delete('/:id',(req,res)=>{
    const id = req.params.id; 
    if(boletoUsuario(id)){
        res.status(400).send("O usuário possui boletos.");
    } else {
        res.json(excluirUsuario(id));
    }
})

module.exports = {
    router,
    mostrarUsuarios,
    mostrarUsuario,
    criarUsuario,
    editarUsuario,
    boletoUsuario,
    excluirUsuario
}