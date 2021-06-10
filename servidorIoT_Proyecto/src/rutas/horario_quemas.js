const { Router } = require('express');
const router = Router();
const mysql = require('mongodb');
let MongoClient = require('mongodb').MongoClient;
require('../host.js')()
let url = `mongodb://${hostName()}:27017/`;

router.get('/datosm', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DB_ManuelitaCañas");
        dbo.collection("datosHorario").find({}).sort({ _id: -1 }).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
});

router.get('/datosm/:zona', (req, res) => {
    var zona = req.params.zona;
    query = { ZonaP: zona };
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DB_ManuelitaCañas");
        dbo.collection("datosHorario").find(query).sort({ _id: -1 }).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
});

router.get('/datosm/ID/:id', (req, res) => {
    var ID = req.params.id;
    mongo = require('mongodb');

    query = { _id: new mongo.ObjectId(ID) };
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DB_ManuelitaCañas");
        dbo.collection("datosHorario").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
});

router.get('/datosm/fecha_horario/:fecha', (req, res) => {
    var fecha = req.params.fecha;

    let fecha_I = new Date(`${fecha} 00:00:00`)
    let fecha_F = new Date(`${fecha} 23:59:00`)
    console.log(fecha_I + "La fecha I ");
    console.log(fecha_F + "La fecha F ");
    query = {
        "HorasP.fechaInicialP": {
            "$gte": fecha_I,
            "$lte": fecha_F
        }
    };

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DB_ManuelitaCañas");
        dbo.collection("datosHorario").find(query).sort({ _id: -1 }).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
});



router.post('/datosm', (req, res) => {

    console.log(req.body);
    var json2 = req.body;

    fechaInicialP = json2.fechaInicialP
    fechaFinalP = json2.fechaFinalP
    ZonaP = json2.ZonaP

    body = {

    }
    body["HorasP"] = {
        "fechaInicialP": new Date(fechaInicialP),
        "fechaFinalP": new Date(fechaFinalP)
    };
    body["ZonaP"] = ZonaP;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DB_ManuelitaCañas");
        dbo.collection("datosHorario").insertOne(body, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });

});


router.delete('/datosm/:id', (req, res) => {
    var id = req.params.id; //recogemos el parámetro enviado en la url
    console.log(id);
    mongo = require('mongodb');
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DB_ManuelitaCañas");
        //console.log(query);
        var query = { _id: new mongo.ObjectId(id) };
        console.log(query);
        dbo.collection("datosHorario").deleteOne(query, function(err, result) {
            if (err) throw err;
            console.log("1 document deleted");
            res.json(result);
            db.close();
        });
    });

});


router.delete('/datosm/delete', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DB_ManuelitaCañas");
        //console.log(query);
        var query = {};
        console.log(query);
        dbo.collection("datosHorario").deleteMany(query, function(err, res) {
            if (err) throw err;
            console.log("All documents deleted");
            res.json(result);
            db.close();
        });
    });

});


router.put('/datosm/put/:id', (req, res) => {
    var id = req.params.id; //recogemos el parámetro enviado en la url
    mongo = require('mongodb');

    var json2 = req.body;

    fechaInicialP = new Date(json2.fechaInicialP)
    fechaFinalP = new Date(json2.fechaFinalP)
    ZonaP = json2.ZonaP



    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DB_ManuelitaCañas");
        //console.log(query);
        var query = {};
        console.log(query);
        dbo.collection("datosHorario").updateOne({ _id: new mongo.ObjectId(id) }, {
            $set: {
                "HorasP": {
                    "fechaInicialP": fechaInicialP,
                    "fechaFinalP": fechaFinalP
                },
                "ZonaP": ZonaP
            }
        }, function(err, result) {
            if (err) throw err;
            console.log("1 document updated");
            res.json(result);
            db.close();
        });

    });

});

router.get('/horarios2/:id_zona', (req, res) => {

    let idZona = req.params.id_zona; //recogemos el parámetro enviado en la url

    const query = [{ "$match": { "ZonaP": idZona } }, { "$sort": { "_id": -1 } },
        {
            $project: {
                ZonaP: "$ZonaP",
                Year: { $year: "$HorasP.fechaInicialP" },
                Month: { $month: "$HorasP.fechaInicialP" },
                Day: { $dayOfMonth: "$HorasP.fechaInicialP" },
                Hour: { $hour: "$HorasP.fechaInicialP" },
                Minutes: { $minute: "$HorasP.fechaInicialP" },
                Seconds: { $second: "$HorasP.fechaInicialP" },
                Milliseconds: { $millisecond: "$HorasP.fechaInicialP" },

                Year1: { $year: "$HorasP.fechaFinalP" },
                Month1: { $month: "$HorasP.fechaFinalP" },
                Day1: { $dayOfMonth: "$HorasP.fechaFinalP" },
                Hour1: { $hour: "$HorasP.fechaFinalP" },
                Minutes1: { $minute: "$HorasP.fechaFinalP" },
                Seconds1: { $second: "$HorasP.fechaFinalP" },
                Milliseconds1: { $millisecond: "$HorasP.fechaFinalP" }
            }
        }
    ];

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DB_ManuelitaCañas");
        dbo.collection("datosHorario").aggregate(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
});

module.exports = router;