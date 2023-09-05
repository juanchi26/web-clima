const app = document.querySelector(".clima-app");
const temp = document.getElementById("temp");
const fecha = document.querySelector(".fecha");
const hora = document.querySelector(".hora");
const condicion = document.querySelector(".condicion");
const nombre = document.querySelector(".name");
const icono = document.querySelector(".icon");
const nublado = document.querySelector(".nublado");
const humedad = document.querySelector(".humedad");
const viento = document.querySelector(".viento");
const form  = document.getElementById("imputLocation");
const buscar = document.querySelector(".search");
const boton = document.querySelector(".submit");
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
        app.style.opacity = "0"
    }
    )
});


form.addEventListener("submit", (e) => {
    e.preventDefault()
    if(buscar.value == ""){
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
        temp.innerText = `${data.current.temp_c}°`

        let clima = data.current.condition.text

        let CLIMAS = {
            "Clear": "Despejado",
            "Sunny": "Soleado",
            "Overcast": "Nublado",
            "Partly cloudy": "Parcialmente nublado",
            "Mist": "Niebla",
            "Rain": "Lluvia",
            "Snow": "Nieve",
            "Thunderstorm": "Tormenta"
        }
        
        condicion.innerHTML = CLIMAS[clima]
        const fechaNew = data.location.localtime
        console.log(fechaNew.substr(0,4))
        const y = parseInt(fechaNew.substr(0,4))
        const m = parseInt(fechaNew.substr(5,2))
        const d = parseInt(fechaNew.substr(8,2))
        const horaNew = fechaNew.substr(11)


        fecha.innerHTML = `${diaDeLaSemana(d, m, y)} ${d}, ${m} ${y}`
        hora.innerHTML = `${horaNew}`
        nombre.innerHTML = `${data.location.name}`
        
       const iconId = data.current.condition.icon.substr(".//cdn.weatherapi.com/weather/64x64".length)
       console.log(iconId)
       
       icono.src = "./iconos/" + iconId
       
       nublado.innerHTML = data.current.cloud + "%"
       humedad.innerHTML = data.current.humidity + "%"
       viento.innerHTML = data.current.wind_kph + "km/h"


       let tiempoDelDia = "day"

       const code = data.current.condition.code

       if(!data.current.is_day){
           tiempoDelDia = "night"
       }

       if(code == 1000){
        app.style.backgroundImage = `url("./img/${tiempoDelDia}/despejado.jpg")`;
        boton.style.background = "#e5ba92"
       }

       if(tiempoDelDia == "night"){
        boton.style.background = "#181e27"
       }

       else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
       ){
        app.style.backgroundImage = `url("./img/${tiempoDelDia}/nublado.jpg")`;
        boton.style.background = "#fa6d1b"
        if(tiempoDelDia == "night"){
            boton.style.background = "#181e27"
           }
       }
       else if( 
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1198 ||
        code == 1201 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252 
       ){
            app.style.backgroundImage = `url("./img/${tiempoDelDia}/lluvioso.jpg")`;
        boton.style.background = "#fa6d1b"
        if(tiempoDelDia == "night"){
            boton.style.background = "#325c80"
           }
       
    }else {
        app.style.backgroundImage = `url("./img/${tiempoDelDia}/despejado.jpg")`;
        boton.style.background = "#4d72aa"
        if(tiempoDelDia == "night"){
            boton.style.background = "#1b1b1b"
           
        }
    }

    app.style.opacity = "1"; //animacion



})
.catch(() => {
    alert("Ciudad no encontrada, Por favor intenta de nuevo")
    app.style.opacity = "1";
})
}

fetchClima()

app.style.opacity = "1"; 

})
console.log(temp)






