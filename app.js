const app = document.querySelector("clima-app");
const temp = document.getElementById("temp");
const fecha = document.querySelector("fecha");
const hora = document.querySelector("hora");
const condicion = document.getElementsByClassName("condicion");
const nombre = document.querySelector("name");
const icono = document.querySelector("icon");
const nublado = document.querySelector("nublado");
const humedad = document.querySelector("humedad");
const viento = document.querySelector("viento");
const form  = document.getElementById("imputLocation");
const buscar = document.querySelector("search");
const boton = document.querySelector("submit");
const ciudades = document.querySelectorAll(".ciudad");

let ciudad_Default = "Montevideo"
console.log(ciudades)

document.addEventListener("DOMContentLoaded", () => {
//agrega un evento click a cada ciudad de la lista
ciudades.forEach((ciudad) => {
    console.log(ciudad)
    ciudad.addEventListener("click", (e) => {
        ciudad_Default = e.target.innerText;
        // cambia la ciudad de default por la clickeada
        fetchClima() //realiza la peticion con la ciudad clickeada y la muestra
        app.style.opacity = "0" //animacion
    }
    )
});


form.addEventListener("submit", (e) => {
    e.preventDefault()
    if(buscar.value.length == 0){
        alert ("Ingrese una ciudad")
    }else {
        ciudad_Default = buscar.value; 
        fetchClima() //realiza la peticion con la ciudad clickeada y la muestra
        buscar.value = "";// limpia el imput
        app.style.opacity = "0"; //animacion
    }
})


function diaDeLaSemana(dia, mes , año){
    let dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
    let fecha = new Date(`${dia}/${mes}/${año}`)
    return dias[fecha.getDay()]
}

function fetchClima(){
    fetch(`http://api.weatherapi.com/v1/current.json?key=1055fb8004734338977181034230409&q=${ciudad_Default}`)
    .then(res => res.json())
    .then(data => {
        console.log(data.current.condition.text)
        temp.innerText = `${data.current.temp_c} °`
        condicion.innerHTML = `${data.current.condition.text} C`

    })
}
console.log(condicion)
})
console.log(temp)