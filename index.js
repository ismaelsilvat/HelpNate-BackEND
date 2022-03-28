const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

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

app.post("/usuario", async(req,res) =>{
    try {
        const { nome } = req.body;
        await pool.query("INSERT INTO USUARIO(NOME) VALUES($1)", [nome]);
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

app.listen(5000, () =>{
    console.log(`Server started at port: ${5000}!`);
});