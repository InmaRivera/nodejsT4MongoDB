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




    // $(document).ready(function () {
    //     //comprobar
    //     $('#borrar').click(function () {
    //         let id = $(this).data('id');
    //         let confirmar = confirm('¿Está seguro de que desea borrar el documento?');
    //         if (confirmar) {
    //             $.ajax({
    //                 url: 'http://127.0.0.1:8090/borrar?name=' + id,
    //                 type: 'DELETE',
    //                 success: function (result) {
    //                     alert('El documento ha sido borrado exitosamente');
    //                     window.location.reload();
    //                 }
    //             });
    //         }
    //     })
    // });
});

//Ejercicio 4 funcion boton borrar
$(document).on("click", ".borrar", borrar);

function borrar() {


    url += $(this).data("name");
    console.log(url);

    $.ajax({
        url: "http://localhost:8090/borrar?name=",
        method: 'GET',
        data: {},
        dataType: "html",
        success: function (respuesta) {
            console.log(respuesta);

            if (respuesta.ok) {
                alert("Se ha eliminado correctamente", "success");
            } else {
                alert("Error al eliminar personaje", "danger");
            }
            //actualizamos la tabla
            let respuestaJSON = JSON.parse(respuesta);
            tablaHTML = crearTabla(respuestaJSON);
            $("#contenido").html(tablaHTML);
            tablaHTML = crearTabla()
        }
    });

}
//Ejercicio 5 insertar personaje nuevo
$(document).ready(function () {
    // Evento para enviar el formulario
    $('#agregar').submit(function (event) {
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

        // Validamos los datos
        if (formData.name === '' || formData.species === '' || formData.yearOfBirth === '' || formData.house === '') {
            alert('Por favor, rellena todos los campos obligatorios');
            return false;
        }

        // Enviamos la petición AJAX
        $.ajax({
            url: 'http://localhost:8090/registro',
            method: 'GET',
            data: formData,
            // dataType: 'html',
            encode: true


                .done(function (data) {

                    // Mostramos una alerta de éxito
                    alert('Registro guardado correctamente');
                    let respuestaJSON = JSON.parse(respuesta);
                    // Actualizamos la tabla con el nuevo registro
                    tablaHTML = crearTabla(respuestaJSON);
                    // $.append("#tabla-personajes").html(body);
                    $("#contenido").html(tablaHTML);
                    tablaHTML = crearTabla()
                })
                .fail(function (data) {
                    // Mostramos una alerta de error
                    alert('Ha ocurrido un error al guardar el registro');
                })
        });
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
        let borrar = this.borrar

        tabla += `<tr><td><img src="${harryimage}" width="100" height="130"></img></td><td>${harryname}</td><td>${harryspecies}</td><td>${harrygender}</td><td>${harryhouse}</td><td>${harryyearOfBirth}</td><td><button id="${borrar}" class="btn btn-danger">Borrar</button></td></tr>`;
    })
    tabla += '</tbody></table>';
    return tabla;
}

