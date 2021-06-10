let mqtt = require('mqtt');
require('../src/host')()
let client = mqtt.connect(`mqtt://${hostName()}`); //PC
//let client = mqtt.connect('mqtt://ec2-18-206-56-233.compute-1.amazonaws.com:1883');//Server
const mysql = require('mongodb');
let MongoClient = require('mongodb').MongoClient;
const { json } = require('express');
let url = `mongodb://${hostName()}:27017/`; //PC
//let url ="mongodb://ec2-18-206-56-233.compute-1.amazonaws.com:27017/"//Server
let detectada;

client.on('connect', function() {
    client.subscribe('topico1', function(err) {
        if (err) {
            console.log("error en la subscripcion")
        }
    })
})


client.on('message', function(topic, message) {
    // message is Buffer
    json1 = JSON.parse(message.toString()); //de esta manera se convierte el mensaje recibido en un json
    temp = json1.datos_nodo.temperatura; //de esta manera se obtiene un valor asociado a una clave en el json
    co2 = json1.datos_nodo.concentracion;
    latitud = json1.datos_nodo.ubicacion.lat;
    longitud = json1.datos_nodo.ubicacion.lng;
    let today = new Date().toString().toLocaleString('es-CO', { timeZone: "America/Bogota" });
    let date = new Date(today);
    //////
    let idZona = asignarZona(latitud, longitud);
    let quema_detectada = detectarIncendio(co2, temp);
    //Método de Julián
    let quema_controlada;
    // quema_controlada = aletarUsuario(quema_detectada, idZona, date.toString()); //Retorna booleano sobre si alertar o no al usuario de una quema no controlada
    quema_controlada = " "
        // if (detectada == 1) { quema_controlada = quemaControlada(idZona, date, program_zona, program_fhI, program_fhF); }

    // console.log("estas son las horas de hoy " + date.getHours());

    //console.log(message.toString())

    // message is Buffer
    json1 = JSON.parse(message.toString());
    json1["fecha_hora"] = date;
    json1["id_zona"] = idZona;



    if (quema_detectada === "No hay quema") {
        quema_controlada = "no detecto"
        json1["alertas"] = { "quema_detectada": quema_detectada, "quema_controlada": quema_controlada }
        console.log(json1)
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("DB_ManuelitaCañas");
            dbo.collection("datosNodo").insertOne(json1, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });

        });
    } else if (quema_detectada === "Hay quema") {

        MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("DB_ManuelitaCañas");
                dbo.collection("datosHorario").find({}).toArray(function(err, result) {
                    if (err) throw err;
                    console.log(result);
                    db.close();
                    var actual = new Date();
                    // var actual = new Date("2021-04-24T13:00:00.000Z");

                    for (let i = 0; i < result.length; i++) {
                        let zona = result[i].ZonaP;
                        let fechaIni = new Date(result[i].HorasP.fechaInicialP);
                        let fechaFin = new Date(result[i].HorasP.fechaFinalP);

                        if (idZona === zona && actual >= fechaIni && actual <= fechaFin) {
                            quema_controlada = "Quema Controlada";


                        } else {
                            quema_controlada = "Quema no controlada";


                        }

                    }
                    //  console.log("quema controlada es:" + quema_controlada);

                    json1["alertas"] = { "quema_detectada": quema_detectada, "quema_controlada": quema_controlada }
                    console.log(json1)
                    MongoClient.connect(url, function(err, db) {
                        if (err) throw err;
                        var dbo = db.db("DB_ManuelitaCañas");
                        dbo.collection("datosNodo").insertOne(json1, function(err, res) {
                            if (err) throw err;
                            console.log("1 document inserted");
                            db.close();
                        });

                    });
                });
            }

            //client.publish('topico2', 'mensaje recibido')


            //client.end() //si se habilita esta opción el servicio termina

        )
    }

})

function detectarIncendio(concentracion, temperatura) {
    let alerta = "";
    detectada = 0;
    if (temperatura > 500 && concentracion > 2500) {
        alerta = "Hay quema";
        detectada = 1;
    } else {
        alerta = "No hay quema";
    }
    return alerta;
}

function asignarZona(latitud, longitud) {

    let zona = "3";

    if (latitud >= 3.584063 && latitud < 3.586440 && longitud >= -76.282985 && longitud <= -76.280276) {
        zona = "1";
        console.log("entro a zona 1");
    } else if (latitud >= 3.586440 && latitud <= 3.589096 && longitud >= -76.285764 && longitud < -76.282985) {
        zona = "2";
        console.log("entro a zona 2");
    }
    return zona;
}