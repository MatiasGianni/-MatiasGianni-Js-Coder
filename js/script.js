fetch("js/productos.json")
.then(respuesta=>respuesta.json())
.then(data =>{
console.log(data)
    const autos = data.autos;
    const autosContainer = document.getElementById("productos");

    autos.forEach(auto => {
        const autoElement = document.createElement("div");
        autoElement.className = "col-12 col-sm-12 col-md-4 col-lg-4 producto";
        autoElement.innerHTML = `
        <div class="card">
            <img src="${auto.img}" class="card-img-top" alt="${auto.modelo}">
            <div class="card-body">
                <h2 class="card-title">Modelo: ${auto.modelo}</h2>
                <p class="card-text">Precio: $${auto.precio}</p>
                <p class="card-text">Km:${auto.km}</p>
                <p class="card-text">Año:${auto.año}</p>
                <button class="btn btn-danger btn-lg agregar" id="${auto.id}">Agregar articulo</button>
            </div>
        </div>
        `;
        autosContainer.appendChild(autoElement);
    });

})
.catch(error => {
    console.error("Error al cargar los datos", error);
})

document.addEventListener("DOMContentLoaded", function() {

    const carrito = document.getElementById("carrito");
    const vaciarCarritoB = document.getElementById("limpiar-carrito");
    const comprarBtn = document.querySelector(".comprar");

    cargarEventos();

    function cargarEventos() {
        const elementos = document.querySelectorAll(".agregar-articulo");
        elementos.forEach(elemento => {
            elemento.addEventListener("click", comprarElemento);
        });
        carrito.addEventListener("click", eliminarElemento);
        vaciarCarritoB.addEventListener("click", vaciarCarrito);
        comprarBtn.addEventListener("click", comprar);
    }

    function comprarElemento(e) {
        e.preventDefault();
        const elemento = e.target.parentElement.parentElement;
        const modelo = elemento.querySelector(".card-title").textContent.split(":")[1].trim();
        const año = elemento.querySelector(".card-text:nth-child(4)").textContent.split(":")[1].trim();
        const precio = elemento.querySelector(".card-text:nth-child(2)").textContent.split("$")[1].trim();
        insertarElemento(modelo, año, precio);
    }

    function insertarElemento(modelo, año, precio) {
        const lista = document.querySelector("#carrito tbody");
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${modelo}</td>
            <td>${año}</td>
            <td>${precio}</td>
            <td><button class="btn btn-danger btn-sm eliminar">Eliminar</button></td>
        `;
        lista.appendChild(row);
    }

    function eliminarElemento(e) {
        e.preventDefault();
        if (e.target.classList.contains("eliminar")) {
            e.target.parentElement.parentElement.remove();
        }
    }

    function vaciarCarrito() {
        const lista = document.querySelector("#carrito tbody");
        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }
    }

    function comprar() {
        Swal.fire("Gracias por comprar");
    }
});
