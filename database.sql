CREATE TABLE USUARIO (
    IDUSUARIO SERIAL PRIMARY KEY
    ,   NOME VARCHAR(100)
    ,   SOBRENOME VARCHAR(100)
    ,   NASCIMENTO DATE
    ,   EMAIL VARCHAR(500)
    ,   SENHA VARCHAR(50)
    ,   TELEFONE VARCHAR(15)
    ,   CEP VARCHAR(8)
    ,   CIDADE VARCHAR(200)
    ,   ESTADO CHAR(2)
    ,   BIOGRAFIA VARCHAR(1000)
    ,   FOTO_PERFIL VARCHAR(100)
    ,   FOTO_CAPA VARCHAR(100)
);

CREATE TABLE ANUNCIO (
    IDANUNCIO SERIAL PRIMARY KEY
    , IDUSUARIO INT NOT NULL
    ,   SITUACAO VARCHAR(50)
    ,   TITULO VARCHAR(100)
    ,   DESCRICAO VARCHAR(500)
    ,   CATEGORIA VARCHAR(50)
    ,   DATA_POST TIMESTAMP
    ,   FOTO_1 VARCHAR(100)
    ,   FOTO_2 VARCHAR(100)
    ,   FOTO_3 VARCHAR(100)
    ,   FOTO_4 VARCHAR(100)
    ,   FOTO_5 VARCHAR(100)
    ,   FOTO_6 VARCHAR(100)
    ,   FOTO_7 VARCHAR(100)
    ,   FOTO_8 VARCHAR(100)
    ,   FOTO_9 VARCHAR(100)
    ,   FOTO_10 VARCHAR(100)
    , FOREIGN KEY (IDUSUARIO) REFERENCES USUARIO(IDUSUARIO)
);