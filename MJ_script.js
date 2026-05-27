import { comunidades } from "./data/comunidades.js";

// Guarda la comunidad en la q el usuario a hecho click
let comunidadSeleccionada = null;


function ordenarComunidades(lista, criterio) {
    return [...lista].sort((a, b) => {
        if (criterio === "nombre") return a.nombre.localeCompare(b.nombre);
        // Descendente
        if (criterio === "poblacion") return b.poblacion_total - a.poblacion_total;
    });
}



function rellenarLista(lista) {
    const tbody = document.getElementById("lista-comunidades");

    // Recorre cada comunidad de la lista y los inserta en la lista de comunidades
    tbody.innerHTML = lista.map(c => `
        <tr data-nombre="${c.nombre}" style="cursor:pointer">
            <td>${c.nombre}</td>
            <td class="text-end">${c.poblacion_total.toLocaleString("es-ES")}</td>
        </tr>
    `).join("");
    // Une todas las filas generadas en un oslo string de texto

    // Selecciona todas las filas creadas y recorre cada una
    tbody.querySelectorAll("tr").forEach(tr => {
        // Cuando se haga click llama a seleccionar pasandole el nombre guardado y la propia fila
        tr.addEventListener("click", () => seleccionar(tr.dataset.nombre, tr));
    });
}


// Recibe el nombre de la comunida clickeada y el elemento tr
function seleccionar(nombre, trElemento) {
    // Quita el resaltado y  lo añade solo a la fila clickeada
    document.querySelectorAll("#lista-comunidades tr")
        .forEach(tr => tr.classList.remove("table-primary", "fw-bold"));
    trElemento.classList.add("table-primary", "fw-bold");

    comunidadSeleccionada = comunidades.find(c => c.nombre === nombre);
    cargarFormulario(comunidadSeleccionada);
}



function cargarFormulario(comunidad) {
    document.getElementById("comunidad").value = comunidad.nombre;
    document.getElementById("capital").value = comunidad.capital;
    document.getElementById("presidente").value = comunidad.presidente;
    // provincias es un array, se muestra una por línea
    document.getElementById("provincias").value = comunidad.provincias.join("\n");
    document.getElementById("error-msg").style.display = "none";
    document.getElementById("exito-msg").style.display = "none";
    actualizarBoton();
}



function actualizarBoton() {
    // Si el input esta relleno activa el boton
    const input = document.getElementById("presidente");
    document.getElementById("btn-guardar").disabled = input.value.trim() === "";
}



document.addEventListener("DOMContentLoaded", () => {
    // Ordena principalmetne por nombre y pinta la tabla
    rellenarLista(ordenarComunidades(comunidades, "nombre"));

    // Cada vez que cambia el select, repinta la tabla con el nuevo orden. e.target.value es  el valor de la opción que se ha elegido
    document.getElementById("criterio-orden").addEventListener("change", e => {
        rellenarLista(ordenarComunidades(comunidades, e.target.value));
    });

    // Cada letra que se escribe en el campo presidente activa actualizarBoton para habilitar o deshabilitar el botón en tiempo real
    document.getElementById("presidente").addEventListener("input", actualizarBoton);

    // Cuando pulsa guardar, comprueba si el campo está vacío, muestra error o éxito, y guarda el cambio
    document.getElementById("btn-guardar").addEventListener("click", () => {
        const input = document.getElementById("presidente");
        const valor = input.value.trim();

        if (valor === "") {
            document.getElementById("error-msg").style.display = "block";
            return;
        }

        document.getElementById("error-msg").style.display = "none";
        // Actualiza el objeto de la comunidad en el array con el nuevo nombre del presidente
        comunidadSeleccionada.presidente = valor;

        // Muestra el mensaje de éxito en verde, espera 4 segundos y luego oculta el mensaje
        const exito = document.getElementById("exito-msg");
        exito.style.display = "block";
        setTimeout(() => exito.style.display = "none", 4000);
    });
});