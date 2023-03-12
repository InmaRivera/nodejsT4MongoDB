const http = require("http");
const url = require("url");
const { MongoClient } = require("mongodb");
const urlConexion = "mongodb://127.0.0.1:27017";
//creamos la constante del json
const fs = require("fs");
const datos = require('./harry-potter-characters.json');
const client = new MongoClient(urlConexion);

http.createServer(function (peticion, respuesta) {

    let urlBase = url.parse(peticion.url, true);
    let pathname = urlBase.pathname;
    respuesta.setHeader('Access-Control-Allow-Origin', '*');
    respuesta.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTION, PUT, PATCH, DELETE');
    // creamos las variables de bd y coleccion
    let basedatos = 'harry';
    let coleccion = "personajes";
    // let datos = "harry-potter-characters.json";

    //Ejercicio 1 crear la base de datos
    if (pathname == "/importar") {
        //crear conexion
        crearConexion(basedatos, coleccion, respuesta);
    }

    ////Ejercicio 2
    //para mostrar tabla de personajes
    else if (pathname == "/filtrar") {

        let datosPost = "";

        //mientras no llegan los datos
        peticion.on('data', function (data) {
            datosPost += data;

        }).on('end', function () {
            let datos;
            let parametros;
            if (peticion.method === 'GET') {
                datos = urlBase.query;
            } else {
                datos = datosPost;
            }
            parametros = new URLSearchParams(datos);

            let db = "harry";
            let coleccion = "personajes";
            let filtro = {};

            consultar(db, coleccion, filtro, respuesta)
                .then(respuesta)
                .catch(console.error)
                .finally(() => client.close());
        })

    }
    //Ejercicio 3 mostrar por filtros
    else if (pathname == "/anio") {
        let datosPost = "";

        peticion.on('data', function (data) {
            datosPost += data;

        }).on('end', function () {
            let datos;
            let parametros;
            if (peticion.method === 'GET') {
                datos = urlBase.query;
            } else {
                datos = datosPost;
            }
            parametros = new URLSearchParams(datos);

            let db = "harry";
            let coleccion = "personajes";
            let filtro = { "yearOfBirth": { $lt: 1979 } };

            consultar(db, coleccion, filtro, respuesta)
                .then(respuesta)
                .catch(console.error)
                .finally(() => client.close());
        })
    }
    //mostramos los humanos
    else if (pathname == "/gender") {
        let datosPost = "";

        peticion.on('data', function (data) {
            datosPost += data;

        }).on('end', function () {
            let datos;
            let parametros;
            if (peticion.method === 'GET') {
                datos = urlBase.query;
            } else {
                datos = datosPost;
            }
            parametros = new URLSearchParams(datos);

            let db = "harry";
            let coleccion = "personajes";
            let filtro = { species: "human" };

            consultar(db, coleccion, filtro, respuesta)
                .then(respuesta)
                .catch(console.error)
                .finally(() => client.close());
        })
    }
    else if (pathname == "/holly") {
        let datosPost = "";

        //mostramos los humanos
        peticion.on('data', function (data) {
            datosPost += data;

        }).on('end', function () {
            let datos;
            let parametros;
            if (peticion.method === 'GET') {
                datos = urlBase.query;
            } else {
                datos = datosPost;
            }
            parametros = new URLSearchParams(datos);

            let db = "harry";
            let coleccion = "personajes";
            let filtro = { "wand.wood": "holly" };

            consultar(db, coleccion, filtro, respuesta)
                .then(respuesta)
                .catch(console.error)
                .finally(() => client.close());
        })
    }
    else if (pathname == "/vivos") {
        let datosPost = "";
        //mostramos los vivos
        peticion.on('data', function (data) {
            datosPost += data;

        }).on('end', function () {
            let datos;
            let parametros;
            if (peticion.method === 'GET') {
                datos = urlBase.query;
            } else {
                datos = datosPost;
            }
            parametros = new URLSearchParams(datos);

            let db = "harry";
            let coleccion = "personajes";
            let filtro = { "alive": true, "hogwartsStudent": true };

            consultar(db, coleccion, filtro, respuesta)
                .then(respuesta)
                .catch(console.error)
                .finally(() => client.close());
        })
    }

    //Ejercicio4 boton borrar
    else if (pathname == "/borrar?name=") {

        global_req = req;
        global_res = res;
        let name = global_req.filtro.name;

        if (name) borrarPersonaje("harry", "personajes", name);
        borrarPersonaje(basedatos, collection, name);
        // let datosPost = "";

        //mientras no llegan los datos
        peticion.on('data', function (data) {
            datosPost += data;

        }).on('end', function () {
            let datos;
            let parametros;
            if (peticion.method === 'GET') {
                datos = urlBase.query;
            } else {
                datos = datosPost;
            }
            parametros = new URLSearchParams(datos);

            let db = "harry";
            let coleccion = "personajes";
            let filtro = { borrarPersonaje };

            consultar(db, coleccion, filtro, respuesta)
                .then(respuesta)
                .catch(console.error)
                .finally(() => client.close());
        })

    }
    else {
        fs.readFile('404.html', function (err, dato) {
            respuesta.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8 ' });
            respuesta.write(dato);
            respuesta.end();
            // respuesta.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
            // // respuesta.write("<h1>Esta página no se encuentra</h1>");
            // respuesta.end();
            // client.close();
        })

    }
}).listen(8090, function (err) {
    if (err) {
        console.log("Error al iniciar el servidor");
    }
    console.log("Servidor corriendo en 8090");
});


//Crear conexion 
async function crearConexion(basedatos, coleccion, respuesta) {
    await client.connect();
    console.log("Conexión correcta");
    const dbo = client.db(basedatos);
    let leer = "";
    let salida = "";

    leer = leerDatos(basedatos, coleccion, respuesta);

    respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    respuesta.write("<h2>Conexión correcta</h2>");
    respuesta.write(leer);
    respuesta.write(salida);
    // respuesta.write(insert);
    respuesta.end();
    client.close();
}
//leer primero el archivo json 
async function leerDatos(basedatos, coleccion, respuesta) {
    fs.readFile("harry-potter-characters.json", function (err, datos) {
        if (err) throw err;
        //crear coleccion si no estuviera
        crearColeccion(basedatos, coleccion, respuesta)
            .then(console.log)
            .catch(console.error)
            .finally(() => client.close());
        console.log("cerrado");
        // insertar los datos hay que parsear los datos de JSON para evitar fallos
        insertar(basedatos, coleccion, respuesta, JSON.parse(datos))
            .then(console.log)
            .catch(console.error)
            //solo se añade al final
            .finally(() => client.close());

    });
}
//Ejercicio 1 crear bd e insertar collection
async function crearColeccion(basedatos, coleccion, respuesta) {
    await client.connect();
    console.log("Conexión correcta");
    const dbo = client.db(basedatos);
    let resultCreate = await dbo.createCollection(coleccion);
    //mostrar mensaje por consola
    console.log("Colección creada =>", resultCreate.collectionName.collection);
}

async function insertar(basedatos, coleccion, respuesta, datos) {
    await client.connect();
    console.log("Conexión correcta");
    const dbo = client.db(basedatos);

    // Insertar datos del json a la coleccion
    let result = await dbo.collection(coleccion).insertMany(datos);
    //mostramos resultados
    respuesta.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
    respuesta.write("<h1>Inserción creada correctamente</h1>");
    console.log("Documentos insertados =>", result.insertedCount);
}

//Creamos funcion de consultar la tabla

async function consultar(db, coleccion, filtro, respuesta) {
    await client.connect();
    console.log("Conexion correcta");
    const dbo = client.db(db);
    const resultado = await dbo.collection(coleccion).find(filtro).toArray();
    respuesta.end(JSON.stringify(resultado));

    return JSON.stringify(resultado);
}

//función borrar
async function borrarPersonaje(basedatos, collection, name) {
    await client.connect(uri + basedatos, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        const dbo = client.db(basedatos);
        let filtro = { name: name };
        dbo.collection(collection).deleteOne(filtro, function (err, result) {
            if (err) throw err;
            global_res.send({ name: name, ok: result.deletedCount == 1 });
            db.close();
        });
    });
}

