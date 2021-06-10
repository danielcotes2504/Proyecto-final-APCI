const { Router } = require('express');
const router = Router();
const mysql = require('mongodb');
let MongoClient = require('mongodb').MongoClient;
require('../host.js')()
let url = `mongodb://${hostName()}:27017/`;

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */


router.get('/datosquema/:tipo_quema/:id_zona/:fecha_I/:fecha_F', (req, res) => {
    let tipoQuema = req.params.tipo_quema; //recogemos el parámetro enviado en la url
    let idZona = req.params.id_zona;
    let F_Inicio = req.params.fecha_I;
    let F_Fin = req.params.fecha_F;
    console.log("Tipo quema " + tipoQuema)

    let Fecha_inicial = new Date(F_Inicio);
    let Fecha_Final = new Date(F_Fin);
    const query = {
        'alertas.quema_controlada': tipoQuema,
        'id_zona': idZona,
        'fecha_hora': {
            '$gte': new Date(Fecha_inicial),
            '$lte': new Date(Fecha_Final)
        }
    };
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("DB_ManuelitaCañas");
        dbo.collection("datosNodo").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
});

router.get('/alertaquema', (req, res) => {
    let tipoQuema = req.body.tipo_quema;
    const query = {
        'alertas.quema_controlada': tipoQuema
    };

    const sort = {
        'fecha_hora': -1
    };
    const limit = 1;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DB_ManuelitaCañas");
        dbo.collection("datosNodo").find(query, { sort: sort, limit: limit }).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
});

router.get('/alertaquemaWeb', (req, res) => {


    const sort = {
        'fecha_hora': -1
    };
    const limit = 1;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DB_ManuelitaCañas");
        dbo.collection("datosNodo").find({}, { sort: sort, limit: limit }).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
});
router.get('/datosquemaL/:id_zona/:id_nodo', (req, res) => {
    let tipoQuema = req.body.tipo_quema; //recogemos el parámetro enviado en la url
    let idZona = req.params.id_zona;
    let idNodo = req.params.id_nodo;


    let idnodopar = parseInt(idNodo);


    const query = [{ "$match": { "id_zona": idZona, "id_nodo": idnodopar } }, { "$sort": { _id: -1 } }, { $limit: 1 },
        { $project: { ZonaP: "$id_zona", NodoP: "$id_nodo", QuemaD: "$alertas.quema_controlada", FechaI: "$fecha_hora" } }
    ];

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("DB_ManuelitaCañas");
        dbo.collection("datosNodo").aggregate(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
});
module.exports = router;