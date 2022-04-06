const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const multer = require('multer');
const PORT = process.env.PORT || 5000;

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, 'uploads/');
    },
    filename: (req,file,cb) => {
        cb(null, Date.now()+'-'+file.originalname);
    }
});

const upload = multer({storage});

app.use(cors());
app.use(express.json());
app.get("/")

app.use('/uploads', express.static(__dirname + '/uploads'));

app.get("/usuarios", async(req,res) =>{
    try {
        const Usuarios = await pool.query("SELECT * FROM USUARIO;");
        res.json(Usuarios.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/anuncios", async(req,res) =>{
    try {
        const Anuncios = await pool.query("SELECT * FROM ANUNCIO;");
        res.json(Anuncios.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/usuarios/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const Usuario = await pool.query("SELECT * FROM USUARIO WHERE IDUSUARIO = $1", [id]);
        res.json(Usuario.rows)
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/anuncios/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const Anuncio = await pool.query("SELECT * FROM ANUNCIO WHERE IDUSUARIO = $1", [id]);
        res.json(Anuncio.rows)
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/imagemPerfil", upload.single('img'), async(req,res) =>{
    try {          
        console.log(req.file);
        console.log(req.body.id);
        await pool.query(`UPDATE USUARIO SET FOTO_PERFIL = ${req.file.filename} WHERE IDUSUARIO = ${req.body.id}`);
    } catch (error) {
        console.log(error.message);
    }
});

app.post("/usuarioIncompleto", async(req,res) =>{
    try {
        await pool.query("INSERT INTO USUARIO(NOME, SOBRENOME, NASCIMENTO, EMAIL, SENHA, TELEFONE) VALUES($1, $2, $3, $4, $5, $6)", 
        [req.body.nome, req.body.sobrenome, req.body.nascimento, req.body.email, req.body.senha, req.body.telefone]);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/usuarioCompleto", async(req,res) =>{
    try {
        let novoUsuario = await pool.query("INSERT INTO USUARIO(NOME, SOBRENOME, NASCIMENTO, EMAIL, SENHA, TELEFONE, CEP, CIDADE, ESTADO, BIOGRAFIA) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING IDUSUARIO;" ,
        [req.body.nome, req.body.sobrenome, req.body.nascimento, req.body.email, req.body.senha, req.body.telefone,
            req.body.cep, req.body.cidade, req.body.estado, req.body.biografia]);
        res.json(novoUsuario.rows)
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/anuncio", async(req,res) =>{
    try {
        const { titulo } = req.body;
        const { doador } = req.body
        await pool.query("INSERT INTO ANUNCIO(TITULO, IDUSUARIO) VALUES($1, $2)", [titulo, doador]);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(PORT, () =>{
    console.log(`TO CONECTADO AQUI MEU! PORTA: ${PORT}`);
});