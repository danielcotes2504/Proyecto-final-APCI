const { Router } = require('express');
const router = Router();
const mysql = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
require('../host.js')()
let url = `mongodb://${hostName()}:27017/`;


router.get('/datosnodo', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DB_ManuelitaCañas");
        dbo.collection("datosNodo").find({}).sort({ _id: -1 }).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
});

router.get('/datoListaN/:id_zona', (req, res) => {

    let idZona = req.params.id_zona; //recogemos el parámetro enviado en la url
    /*
      const query = {
        "id_nodo": idNodo
      };*/
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DB_ManuelitaCañas");
        dbo.collection("datosNodo").distinct("id_nodo", { id_zona: idZona }, function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
});
router.get('/datosnodo/:id_zona', (req, res) => {

    let idZona = req.params.id_zona; //recogemos el parámetro enviado en la url

    const query = {
        "id_zona": idZona
    };
    //console.log(query);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DB_ManuelitaCañas");
        dbo.collection("datosNodo").find(query).sort({ _id: -1 }).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
});


router.get('/datosnodo/:id_zona/:id_nodo', (req, res) => {
    let idZona = req.params.id_zona; //recogemos el parámetro enviado en la url
    let idNodo = req.params.id_nodo;

    const query = {
        'id_zona': idZona,
        'id_nodo': parseInt(idNodo)
    };

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DB_ManuelitaCañas");
        dbo.collection("datosNodo").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
});


//PARTE QUE AGREGÓ JULIÁN
//Agregar este para poder consultar por IDnodo en la pagina del usuario
router.get('/datosnodoid/:id_nodo', (req, res) => {

    let idNodo = parseInt(req.params.id_nodo); //recogemos el parámetro enviado en la url

    const query = {
        "id_nodo": idNodo
    };
    //console.log(query);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DB_ManuelitaCañas");
        dbo.collection("datosNodo").find(query).sort({ _id: -1 }).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
});

router.get('/datosnodo2/:id_zona', (req, res) => {

    let idZona = req.params.id_zona; //recogemos el parámetro enviado en la url

    const query = {
        "id_zona": idZona
    };
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DB_ManuelitaCañas");
        dbo.collection("datosNodo").find(query, { limit: 1 }).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
});
router.get('/datosnodoL/:id_zona/:id_nodo', (req, res) => {
    let idZona = req.params.id_zona; //recogemos el parámetro enviado en la url
    let idNodo = req.params.id_nodo;

    const query = {
        'id_zona': idZona,
        'id_nodo': parseInt(idNodo)
    };

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DB_ManuelitaCañas");
        dbo.collection("datosNodo").find(query, { limit: 1 }).sort({ _id: -1 }).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
});
router.get('/datosnodoL/:id_zona/:id_nodo', (req, res) => {
    let idZona = req.params.id_zona; //recogemos el parámetro enviado en la url
    let idNodo = req.params.id_nodo;

    const query = {
        'id_zona': idZona,
        'id_nodo': parseInt(idNodo)
    };

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DB_ManuelitaCañas");
        dbo.collection("datosNodo").find(query, { limit: 1 }).sort({ _id: -1 }).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
});
module.exports = router;