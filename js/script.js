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
    const elementos = document.getElementById("lista-1");
    const lista = document.querySelector("#lista-carrito tbody");
    const vaciarCarritoB = document.getElementById("vaciar-carrito");

    cargarEventos();

    function cargarEventos(){
    elementos.addEventListener("click", comprarElemento);
    carrito.addEventListener("click", elimatarElemento);
    vaciarCarritoB.addEventListener("click", vaciarCarrito);
    }
}





function cargarEventos(){
    elementos.addEventListener("click", comprarElemento);
    carrito.addEventListener("click", elimatarElemento);
    vaciarCarritoB.addEventListener("click", vaciarCarrito);
});

function comprarElemento(e){
    e.prevenDefault();
    if(e.targer.classList.contains("agregar-carrito")){
        const elemento = e.targer.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento){
    const infoElemento ={
        imagen: elemento.querySelector("img").src,
        titulo: elemento.querySelector("h3").textContent,
        precio: elemento.querySelector("precio").textContent,
        id: elemento.querySelector("a").getAtribute("data-id")
    }
    insetarCarrito(infoElemento);
}

function insetarCarrito(elemento){

    const row = document.createElement("tr")
    row.innerHTML=`
        <td><img src=${aelemento.imagen}</td>
        <td>${elemento.titulo}</td>
        <td>${elemento.precio}</td>
        <td><a herf="a" class="borrar" data-id${elemento.id}">X</td>
    `;
lista.appendChild(row);
}

function elimarElemento(e){
    e.preventDefault();
    elementoId;
    if(e.target.classList.contains("borrar")){
        e.targer.parentElement.parentElement.remove();
        elemento = e.targer.parentElement.parentElement;
        elementoId = elemento.querySelector("a").getAttribute("date-id");
    }
}

function vaciarCarrito(){
    while(lista.firsChild){
        lista.removeChild(lista.firstChild);
    }
    return false;
}