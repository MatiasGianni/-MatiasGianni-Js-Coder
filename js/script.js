const iconTrolley = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-x" viewBox="0 0 16 16">
<path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793z"/>
<path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg>`;
const iconTrolleyPlus = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-check" viewBox="0 0 16 16">
<path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
<path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg>`;
async function feching() {
  return await fetch("js/productos.json")
    .then((respuesta) => respuesta.json())
    .then((data) => data)
    .catch((error) => {
      console.error("Error al cargar los datos", error);
    });
}
function loadCards(props) {
  const autosContainer = document.getElementById("productos");
  props.autos.forEach((auto) => {
    const img =
      auto.img ||
      "https://banner2.cleanpng.com/20180403/ooq/kisspng-volkswagen-group-car-volkswagen-golf-volkswagen-pa-motocross-5ac3d81e2d3b93.7930281315227842861853.jpg";
    const modelo = auto.modelo ?? "";
    const precio = auto.precio ?? "";
    const km = auto.km ?? "";
    const año = auto.año ?? "";
    const id = auto.id ?? "";
    const autoElement = document.createElement("div");
    autoElement.className = "col-12 col-sm-12 col-md-6 col-lg-4 producto";
    autoElement.innerHTML = `
      <div class="card">
          <img src="${img}" class="card-img-top" alt="${modelo}">
          <div class="card-body">
            <div class="description">
              <p class="card-title">${modelo}</p>
              <div class="propiedades">
                <p class="card-text">$${precio}</p>
                <p class="card-text">${km} Km </p>
                <p class="card-text bashed">${año}</p>
              </div>
            </div>
            <button class="btn btn-trolley  btn-lg agregar" id="${id}-card">${iconTrolleyPlus}
          </button>
          </div>
      </div>
      `;
    autosContainer.appendChild(autoElement);
  });
}
document.addEventListener("DOMContentLoaded", function () {
  let carritoArray = [];
  const carrito = document.getElementById("carrito");
  const vaciarCarritoB = document.getElementById("limpiar-carrito");
  const comprarBtn = document.getElementById("comprar-todo");
  function cargarEventos({ autos }) {
    autos.forEach((car) => {
      const cardAuto = document.getElementById(`${car?.id}-card`);
      cardAuto.addEventListener("click", () => {
        if (isHasCarInTrolley(car?.id)) {
          insertarElemento(car);
        } else {
          eliminarElemento(car.id);
        }
      });
    });
    vaciarCarritoB.addEventListener("click", vaciarCarrito);
    comprarBtn.addEventListener("click", comprar);
  }
  function insertarElemento(props) {
    if (isHasCarInTrolley(props.id)) {
      carritoArray.push(props);
      const lista = document.querySelector("#carrito tbody");
      const row = document.createElement("tr");
      const modelo = props.modelo ?? "";
      const año = props.año ?? "";
      const precio = props.precio ?? "";
      const id = props.id ?? "";
      row.setAttribute("id", `${id}-card-tr`);
      row.innerHTML = `  
      <td>${modelo}</td>
      <td>${año}</td>
      <td>$${precio}</td>
      <td><button class="btn btn-danger btn-sm eliminar" id="${id}-delete"><i class="bi bi-trash3"></i></button></td>
      `;
      lista.appendChild(row);
      const buttonDelete = document.getElementById(`${id}-delete`);
      buttonDelete.addEventListener("click", () => eliminarElemento(id));
      alert("Se agrego el producto");
    }
    modificarEstadoTrolley(props.id);
  }
  function modificarEstadoTrolley(id) {
    const button = document.getElementById(`${id}-card`);
    button?.querySelector("svg")?.remove();
    const icon = document.createElement("div");
    if (!isHasCarInTrolley(id)) {
      icon.innerHTML = iconTrolley;
      button.style.backgroundColor = "#7066e0";
    } else {
      icon.innerHTML = iconTrolleyPlus;
      button.style.backgroundColor = "#1b1e20";
    }
    button.appendChild(icon);
  }
  function eliminarElemento(id) {
    document.getElementById(`${id}-card-tr`).remove();
    carritoArray = carritoArray.filter((card) => card.id !== id);
    alert("Se elimino el elemento");
    modificarEstadoTrolley(id);
    console.log(carritoArray);
  }
  function vaciarCarrito() {
    if (carritoArray.length > 0) {
      const lista = document.querySelector("#carrito tbody");
      while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
      }
      carritoArray = [];
      alert("Se vacio el carrito");
    } else {
      alert("No tiene productos");
    }
  }
  function comprar() {
    if (carritoArray.length > 0) {
      alert("Gracias por comprar");
    } else {
      alert("No tiene productos");
    }
  }
  const isHasCarInTrolley = (id) => {
    const carIntrolley = carritoArray.filter((card) => card?.id === id);
    return carIntrolley.length === 0;
  };
  const alert = (title) =>
    Swal.fire({
      title: title,
      background: "#1b1e20",
    });
  feching().then((autos) => {
    loadCards(autos);
    cargarEventos(autos);
  });
});
