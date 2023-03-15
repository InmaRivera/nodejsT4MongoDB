const http = require("http");
const url = require("url");
const { MongoClient } = require("mongodb");
//usamos el object id para recoger los id de mongo y poder eliminar
const { ObjectId } = require("mongodb");
const urlConexion = "mongodb://127.0.0.1:27017";
//creamos la constante del json
const fs = require("fs");
//creamos la constante del json donde recogemos los datos de harry potter
const datos = require('./harry-potter-characters.json');
const client = new MongoClient(urlConexion);
// creamos las variables de bd y coleccion con los nombres que se pide
let basedatos = 'harry';
let coleccion = "personajes";
// let datos = "harry-potter-characters.json";

http.createServer(function (peticion, respuesta) {

    let urlBase = url.parse(peticion.url, true);
    let pathname = urlBase.pathname;
    //para que evitar los errores de sistema del nuevo mongo.
    respuesta.setHeader('Access-Control-Allow-Origin', '*');
    respuesta.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTION, PUT, PATCH, DELETE');

    // let basedatos = 'harry';
    // let coleccion = "personajes";
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
            //filtro vacío para sacar todos los datos 
            let filtro = {};
            //indicamos que nos muestre los datos 
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
            //Ahora si indicamos el filtro para que nos muestre los personajes del año menor que 1979
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
            //indicamos en el filtro que muestre solo las especies humanas
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
            //Añadimos al filtro los holly
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
            //Añadimos al filtro solos los estudiantes vivos
            let coleccion = "personajes";
            let filtro = { "alive": true, "hogwartsStudent": true };

            consultar(db, coleccion, filtro, respuesta)
                .then(respuesta)
                .catch(console.error)
                .finally(() => client.close());
        })
    }

    //Ejercicio 4 boton borrar
    else if (pathname == "/borrar") {
        let datosPost = "";
        //mientras no llegan los datos
        peticion.on('data', function (data) {
            datosPost += data;

        }).on('end', function () {
            let datos;
            let parametros;
            if (peticion.method === 'POST') {
                datos = datosPost;
            } else {
                datos = urlBase.query;
            }
            parametros = new URLSearchParams(datos);
            //Creamos una variable para guardar los datos recogidos en el parametro del cliente
            let borrarId = parametros.get('_id');
            let db = "harry";
            let coleccion = "personajes";
            //Añado el valor al filtro 
            let filtro = { _id: new ObjectId(borrarId) };
            //llamamos a la función borrar
            borrarPersonaje(db, coleccion, filtro, respuesta)
                .then(respuesta)
                .catch(console.error)
                .finally(() => client.close());
        })

    }
    else if (pathname == "/registro") {
        let datosPost = "";
        //mientras no llegan los datos
        peticion.on('data', function (data) {
            datosPost += data;

        }).on('end', function () {
            let datos;
            let parametros;
            if (peticion.method === 'POST') {
                datos = datosPost;
            } else {
                datos = urlBase.query;
            }
            parametros = new URLSearchParams(datos);

            let db = "harry";
            let coleccion = "personajes";
            console.log("parametros " + parametros);
            // datos = parametros.get(datos);
            console.log("registro: " + parametros.get("name"));

            let registrosnuevos = {
                name: parametros.get("name"),
                species: parametros.get("species"),
                yearOfBirth: parametros.get("yearOfBirth"),
                gender: parametros.get("gender"),
                house: parametros.get("house"),
                wood: parametros.get("wood"),
                core: parametros.get("core"),
                length: parametros.get("length"),
                dateOfBirth: parametros.get("dateOfBirth"),
                ancestry: parametros.get("ancestry"),
                eyeColor: parametros.get("eyeColor"),
                hairColor: parametros.get("hairColor"),
                patronus: parametros.get("patronus"),
                hogwartsStudient: parametros.get("hogwartsStudient"),
                hogwartsStaff: parametros.get("hogwartsStaff"),
                actor: parametros.get("actor"),
                alive: parametros.get("alive"),
                image: parametros.get("image")
            }
            //llamamos a la función INSERTAR personajes
            insertarPersonaje(db, coleccion, registrosnuevos, respuesta)
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

        })

    }
    //indicamos que escuche en el puerto 8090 para evitar conflictos con el 8080
}).listen(8090, function (err) {
    if (err) {
        console.log("Error al iniciar el servidor");
    }
    console.log("Servidor corriendo en 8090");
});


//Crear la función de conexion 
async function crearConexion(basedatos, coleccion, respuesta) {
    await client.connect();
    console.log("Conexión correcta crearConexion");
    // const dbo = client.db(basedatos);
    let leer = "";


    leer = await leerDatos(basedatos, coleccion, respuesta);

    respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    respuesta.write("<h2>Conexión correcta</h2>");
    respuesta.end();
    // respuesta.close();
}
//leer primero el archivo json 
async function leerDatos(basedatos, coleccion, respuesta) {
    fs.readFile("harry-potter-characters.json", function (err, datos) {
        if (err) throw err;
        //limpiar coleccion
        limpiarColeccion(basedatos, coleccion, respuesta)
            .then(console.log)
            .catch(console.error)
        // .finally(() => client.close());
        console.log("cerrado");
        //crear coleccion si no estuviera
        crearColeccion(basedatos, coleccion, respuesta)
            .then(console.log)
            .catch(console.error)
        // .finally(() => client.close());
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
//limpiamos coleccion
async function limpiarColeccion(basedatos, coleccion, respuesta) {
    await client.connect();
    console.log("Conexión correcta");
    const dbo = client.db(basedatos);
    //eliminamos coleccion y volvemos a insertar 
    let limpiarBase = await dbo.collection(coleccion).drop();
    //mostramos resultados
    respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    respuesta.write("<h1>Coleccion borrada correctamente</h1>");
    console.log("Documentos eliminados =>", limpiarBase);
}
//Creamos la función de insertar datos
async function insertar(basedatos, coleccion, respuesta, datos) {
    await client.connect();
    console.log("Conexión correcta");
    const dbo = client.db(basedatos);
    //eliminamos coleccion y volvemos a insertar 
    // let limpiarBase = await dbo.collection(coleccion).deleteMany();

    // Insertar datos del json a la coleccion
    let result = await dbo.collection(coleccion).insertMany(datos);
    //mostramos resultados
    respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    respuesta.write("<h1>Inserción creada correctamente</h1>");
    console.log("Documentos insertados =>", result);
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

//función para borrar un personaje
async function borrarPersonaje(db, coleccion, filtro, respuesta) {
    await client.connect();
    console.log("Conexion correcta");

    //pasamos el filtro al deleteOne
    const dbo = client.db(db);
    let borrar = await dbo.collection(coleccion).deleteOne(filtro);
    console.log("Datos borrados =>", borrar.deletedCount)
    respuesta.end(JSON.stringify(borrar.deletedCount));
}
//funcion para añadir un personaje nuevo
async function insertarPersonaje(db, coleccion, registrosnuevos, respuesta) {
    await client.connect();
    console.log("Conexión correcta insertar personaje");
    const dbo = client.db(db);
    // Insertar datos nuevos al json 
    let personajeResult = await dbo.collection(coleccion).insertOne(registrosnuevos);
    //mostramos resultados
    respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    respuesta.write("<h1>Personaje guardado correctamente</h1>");
    console.log("Personaje insertado =>", personajeResult);
}