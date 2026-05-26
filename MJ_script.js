import { comunidades } from "./data/comunidades";

let comunidadSeleccionada = null;

function ordenarComunidades(lista,criterio) {
    return [...lista].sort((a, b) =>{
        if(criterio === "nombre") return a.nombre.localeCompare(b.nombre);
        if (criterio === "poblacion") return b.poblacion_total - a.poblacion_total;
    });
}


function rellenarLista(lista) {
    const ul = document.getElementById("lista-comunidades");

    ul.innerHTML = lista.map(comunidad => `
        <li class="list-group-item list-group-item-action"
            data-nombre="${comunidad.nombre}"
            style="cursor:pointer">
            ${comunidad.nombre}
        </li>
        `).join("");

    ul.querySelectorAll("li").forEach(li => {
        li.addEventListener("click", () => seleccionar(li.dataset.nombre, li));
    });
}







































document.addEventListener("DOMContentLoaded", () => {
    const criterio = document.getElementById("criterio-orden");
    rellenarLista(ordenarComunidades(comunidades, "nombre"));

    criterio.addEventListener("change", () => {
        rellenarLista(ordenarComunidades(comunidades, criterio.value));
    });

    document.getElementById("form-presidente").addEventListener("input", actualizarBoton);

    document.getElementById("btn-guardar").addEventListener("click", () => {
        const input = document.getElementById("form-presidente");
        const valor = input.value.trim();

        if (valor === "") {
            document.getElementById("error-msg").style.display = "block";
            return;
        }

        document.getElementById("error-msg").style.display = "none";

        // Actualizar el objeto original en el array
        comunidadSeleccionada.presidente = valor;

        const exito = document.getElementById("exito-msg");
        exito.style.display = "block";
        setTimeout(() => exito.style.display = "none", 4000);
    });
});