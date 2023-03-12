"use strict";


window.addEventListener("load", function () {
    /*Cuando le demos click al botón se vavan a mostrar todos los registros de la base de datos. */
    document.getElementById("botonHumanos").addEventListener("click", function () {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                /*La respuesta la debemos parsear con el método JSON */
                var objetoJSON = JSON.parse(this.responseText);
                var tabla = document.getElementById("tabla");
                tabla.innerHTML = "";
                var cabecera = tabla.createTHead();
                var filaCabecera = cabecera.insertRow();

                filaCabecera.innerHTML = "<th>Imagen</th><th>Nombre</th><th>Especie</th><th>Género</th><th>Casa</th><th>Año de nacimiento</th>";

                var cuerpo = tabla.createTBody();

                for (var i = 0; i < objetoJSON.length; i++) {
                    var fila = cuerpo.insertRow();
                    var imagen = "<img src='" + objetoJSON[i].image + "' class='img-thumbnail' alt='" + objetoJSON[i].name + "'>";
                    fila.innerHTML = "<td>" + imagen + "</td><td>" +
                        objetoJSON[i].name + "</td><td>" +
                        objetoJSON[i].species + "</td><td>" +
                        objetoJSON[i].gender + "</td><td>" +
                        objetoJSON[i].house + "</td><td>" +
                        objetoJSON[i].yearOfBirth + "</td>";
                }
            }
        };
        xhr.open("GET", "harry-potter-characters.json", true);
        xhr.send();
    });
});