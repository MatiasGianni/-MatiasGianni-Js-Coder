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
