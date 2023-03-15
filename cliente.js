$(document).ready(function () {
    let tablaHTML;

    $("#obtener").click(function () {
        //comprobar
        // alert("hola");

        $.ajax({
            url: "http://127.0.0.1:8090/filtrar",
            method: 'GET',
            data: {},
            success: function (respuesta) {
                // alert(respuesta);
                let respuestaJSON = JSON.parse(respuesta);
                tablaHTML = crearTabla(respuestaJSON);
                // $.append("#tabla-personajes").html(body);
                $("#contenido").html(tablaHTML);
            }
        })
    })
    //funcion boton humano
    $("#botonHuman").click(function () {
        //comprobar

        $.ajax({
            url: "http://127.0.0.1:8090/gender",
            method: 'GET',
            data: {},
            success: function (respuesta) {
                // alert(respuesta);
                let respuestaJSON = JSON.parse(respuesta);
                tablaHTML = crearTabla(respuestaJSON);
                // $.append("#tabla-personajes").html(body);
                $("#contenido").html(tablaHTML);

            }
        })

    })
    //funcion boton año
    $("#botonAno").click(function () {
        //comprobar

        $.ajax({
            url: "http://127.0.0.1:8090/anio",
            method: 'GET',
            data: {},
            success: function (respuesta) {
                // alert(respuesta);
                let respuestaJSON = JSON.parse(respuesta);
                tablaHTML = crearTabla(respuestaJSON);
                // $.append("#tabla-personajes").html(body);
                $("#contenido").html(tablaHTML);

            }
        })

    })
    //boton holly
    $("#botonHolly").click(function () {
        //comprobar

        $.ajax({
            url: "http://127.0.0.1:8090/holly",
            method: 'GET',
            data: {},
            success: function (respuesta) {
                // alert(respuesta);
                let respuestaJSON = JSON.parse(respuesta);
                tablaHTML = crearTabla(respuestaJSON);
                // $.append("#tabla-personajes").html(body);
                $("#contenido").html(tablaHTML);

            }
        })

    })
    //boton vivos 
    $("#botonVivos").click(function () {
        $.ajax({
            url: "http://127.0.0.1:8090/vivos",
            method: 'GET',
            data: {},
            success: function (respuesta) {
                // alert(respuesta);
                let respuestaJSON = JSON.parse(respuesta);
                tablaHTML = crearTabla(respuestaJSON);
                // $.append("#tabla-personajes").html(body);
                $("#contenido").html(tablaHTML);

            }
        })
    })
});

//Ejercicio 4 funcion boton borrar
$(document).on("click", "#borrar", function (event) {
    id = $(this).attr('datoId');

    $.ajax({
        url: "http://localhost:8090/borrar",
        method: 'POST',
        data: { _id: id },
        success: function (respuesta) {

            let mensaje = "";

            if (respuesta == '0') {
                //si no se borra correctamente mostramos mensaje de error
                mensaje = '<div class="alert alert-danger alert-dismissible" role="alert"> No se ha podido borrar el documento. </div>';
                $('#mensaje').html(mensaje);
                //los mensajes los mostraremos por 5 segundos 
                $('.alert-dismissible').fadeTo(5000, 500).slideUp(500, function () {
                    $('.alert-dismissible').slideUp(500);
                });
            }
            else {
                //Si borramos correctamente volvemos a recargar página y mostramos mensaje
                $("#obtener").click();
                mensaje = '<div class="alert alert-success alert-dismissible" role="alert"> El documento ha sido borrado correctamente. </div';
                //añadimos al html el mensaje en el div que hemos creado para ello
                $('#mensaje').html(mensaje);
                //los mensajes los mostraremos por 5 segundos 
                $('.alert-dismissible').fadeTo(5000, 500).slideUp(500, function () {
                    $('.alert-dismissible').slideUp(500);
                });
            }
        }
    });
});
//Ejercicio 5 insertar personaje nuevo
// Evento para enviar el formulario
$('#agregar').on('click', function (event) {
    // Prevenimos la acción por defecto del formulario
    event.preventDefault();

    // Recogemos los valores del formulario
    let formData = {
        'name': $('input[name=name]').val(),
        'species': $('input[name=species]').val(),
        'yearOfBirth': $('input[name=yearOfBirth]').val(),
        'gender': $('select[name=gender]').val(),
        'house': $('input[name=house]').val(),
        'wood': $('input[name=wood]').val(),
        'core': $('input[name=core]').val(),
        'length': $('input[name=length]').val(),
        'dateOfBirth': $('input[name=dateOfBirth]').val(),
        'ancestry': $('input[name=ancestry]').val(),
        'eyeColor': $('input[name=eyeColor]').val(),
        'hairColor': $('input[name=hairColor]').val(),
        'patronus': $('input[name=patronus]').val(),
        'hogwartsStudient': $('select[name=hogwartsStudient]').val(),
        'hogwartsStaff': $('select[name=hogwartsStaff]').val(),
        'actor': $('input[name=actor]').val(),
        'alive': $('select[name=alive]').val(),
        'image': '' // URL de ejemplo para la imagen
    };
    // alert("datos insertados => ".formData);
    let resultado = "";
    // Validamos los datos que son obligatorios
    if (formData.name === '' || formData.species === '' || formData.yearOfBirth === '' || formData.house === '') {
        resultado = '<div class="alert alert-danger alert-dismissible" role="alert"> Por favor, rellene los campos obligatorios. </div>';
        $('#mensaje1').html(resultado);
        //los mensajes los mostraremos por 5 segundos 
        $('.alert-dismissible').fadeTo(5000, 500).slideUp(500, function () {
            $('.alert-dismissible').slideUp(500);
        });
    }

    // Enviamos la petición AJAX
    $.ajax({
        url: 'http://localhost:8090/registro',
        method: 'POST',
        data: formData,
        encode: true,
        success: function (respuesta) {
            if (respuesta == true) {
                //si no se borra correctamente mostramos mensaje de error
                alert("Personaje creado correctamente");
                resultado = '<div class="alert alert-danger alert-dismissible" role="alert"> Error al insertar los datos. </div>';
                $('#mensaje1').html(resultado);
                //los mensajes los mostraremos por 5 segundos 
                $('.alert-dismissible').fadeTo(5000, 500).slideUp(500, function () {
                    $('.alert-dismissible').slideUp(500);
                });
            }
            else {
                alert("El personaje NO ha sido creado");
                //Si borramos correctamente volvemos a recargar página y mostramos mensaje
                $("#obtener").click();
                resultado = '<div class="alert alert-success alert-dismissible" role="alert"> El personaje se ha creado correctamente. </div';
                //añadimos al html el mensaje en el div que hemos creado para ello
                $('#mensaje1').html(resultado);
                //los mensajes los mostraremos por 5 segundos 
                $('.alert-dismissible').fadeTo(5000, 500).slideUp(500, function () {
                    $('.alert-dismissible').slideUp(500);
                });
            }

            // .done(function (data) {
            //     // Mostramos una alerta de éxito
            //     alert('Registro guardado correctamente');
            //     let respuestaJSON = JSON.parse(respuesta);
            //     // Actualizamos la tabla con el nuevo registro
            //     tablaHTML = crearTabla(respuestaJSON);
            //     // $.append("#tabla-personajes").html(body);
            //     $("#contenido").html(tablaHTML);
            //     tablaHTML = crearTabla()
            // })
            // .fail(function (data) {
            //     // Mostramos una alerta de error
            //     alert('Error al guardar el registro');
            // })
        }
    });
});


let alerta = $('#alert');
function crearTabla(datos) {
    let tabla = `        <table class="table">
            <thead>
            <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Especie</th>
                <th>Género</th>
                <th>Casa</th>
                <th>Año de nacimiento</th>
            </tr>
        </thead>`;
    // let tabla = document.getElementById('tabla-personajes');
    // tabla += '<thead> <tr> <th>Nombre</th> <th>Apellidos</th></tr> </thead>'
    tabla += '<tbody class="table">';
    $.each(datos, function () {
        let harryimage = this.image;
        let harryname = this.name;
        let harryspecies = this.species;
        let harrygender = this.gender;
        let harryhouse = this.house;
        let harryyearOfBirth = this.yearOfBirth;
        let id = this._id;

        tabla += `<tr><td><img src="${harryimage}" width="100" height="130"></img></td><td>${harryname}</td><td>${harryspecies}</td><td>${harrygender}</td><td>${harryhouse}</td><td>${harryyearOfBirth}</td><td><button id="borrar" datoId="${id}" type="submit" class="btn btn-danger">Borrar</button></td></tr>`;
    })
    tabla += '</tbody></table>';
    return tabla;
}

