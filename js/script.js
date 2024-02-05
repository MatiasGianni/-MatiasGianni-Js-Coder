/* PRIMER Entrega

let suma=0
let cont=0 
let promedio = 0

const array = []

function contador(){
    cont = cont +1
}

let entrada = prompt("Ingrese notas para saber si esta aprobado (1 a 10)")


while(entrada !== null){

    const nota = parseFloat(entrada);

    if(nota >= 1 && nota <=10){
        array.push(nota)
        suma=suma+nota
        contador();
        entrada = prompt("Ingrese otra nota o oprima cancelar para ver el promedio")
    }
    else{
    entrada = prompt("ERROR ingrese notas de 1 a 10")
    }

}

promedio= suma/cont

promedio=alert("El promedio es: " + promedio)
*/

const boton = document.getElementById("guardar");
const forRegis = document.getElementById("registros");
const modeloAuto = document.getElementById("modelo");
const modeloAño = document.getElementById("año");
const modeloPatente = document.getElementById("patente");

boton.addEventListener("click", () => {
    
    const auto = modeloAuto.value;
    const año = modeloAño.value;
    const patente = modeloPatente.value;

if (!auto || !año || !patente){
    alert("Ingresar datos del vehiculo");
    return;
}

const newCard = document.createElement("div");
newCard.innerHTML=`
<div class="col-12 col-md-12 col-lg-4 text-center card-auto justify-content-center">
<h2>Registro</h2>
<h3>Modelo: ${auto}</h3>
<h3>Año: ${año}</h3>
<h3>Patente: ${patente}</h3>
</div>
`;

forRegis.appendChild(newCard);

modeloAuto.value = "";
modeloAño.value = "";
modeloPatente.value = "";

});