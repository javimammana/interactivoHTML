const arrayParedes = [];

class Medidas {
    constructor (nombre, posicion, altoPared, anchoPared, altoPuerta, anchoPuerta, altoVentana, anchoVentana) {
        this.nombre = nombre;
        this.posicion = posicion;
        this.altoPared = altoPared || 0;
        this.anchoPared = anchoPared || 0;
        this.m2Pared = altoPared * anchoPared;
        this.altoPuerta = altoPuerta || 0;
        this.anchoPuerta = anchoPuerta || 0;
        this.m2Puerta = altoPuerta * anchoPuerta;
        this.altoVentana = altoVentana || 0;
        this.anchoVentana = anchoVentana || 0;
        this.m2Ventana = altoVentana * anchoVentana;
        this.m2Averturas = this.m2Puerta + this.m2Ventana;
        this.m2Total = this.m2Pared - this.m2Averturas;
    }
}

const btnCaptura = document.getElementById ("btnCaptura");
const formuPared = document.getElementById ("formuPared");
const formuPuerta = document.getElementById ("formuPuerta");
const formuVentana = document.getElementById ("formuVentana");
const btnBorrar = document.getElementById ("btnBorrar");
const refresh = document.getElementById("refresh");
const listado = document.getElementById("listado");
const resultado = document.getElementById("resultado");

function capturar() {
    const nombrePared = "Pared";
    const altoPared = document.getElementById ("altoPared").value;
    const anchoPared = document.getElementById("anchoPared").value;
    if (altoPared != 0 && anchoPared != 0) {
        const altoPuerta = document.getElementById ("altoPuerta").value;
        const anchoPuerta = document.getElementById ("anchoPuerta").value;

        const altoVentana = document.getElementById ("altoVentana").value;
        const anchoVentana = document.getElementById ("anchoVentana").value;
        const posicion = (arrayParedes.length);

        nuevaPared = new Medidas (nombrePared, posicion, altoPared, anchoPared, altoPuerta, anchoPuerta, altoVentana, anchoVentana);   
        arrayParedes.push (nuevaPared);  
        console.log(arrayParedes.length);
    }
    formuPared.reset();
    formuPuerta.reset();
    formuVentana.reset();
}


function listaParedes() {
    listado.innerHTML = "";
    arrayParedes.forEach( arrayParedes => {
        const div = document.createElement ("div");
        div.innerHTML = `<div id="pared">
                            <h5>Pared</h5>
                            <p>m2 de Pared: ${arrayParedes.m2Pared}Mts2</p>
                            <p>m2 de Averturas: ${arrayParedes.m2Averturas}Mts2</p>
                            <p>Total m2 a cubrir: ${arrayParedes.m2Total}Mts2</p>
                            <button onclick="borrar(${arrayParedes.length + 1})">Borrar Pared</button>
                        </div>
                        `
        listado.appendChild(div);
    })
}

function borrar(p) {
    arrayParedes.splice (p, 1);
    listaParedes();
    console.log (arrayParedes);
}

function calcular() {
    const m2Resultado = arrayParedes.reduce ((acumulador, elemento) => acumulador + elemento.m2Total, 0);

    resultado.innerHTML = "";

    const div = document.createElement ("div");
        div.innerHTML = `<div>
                            <h5>Tenes que cubrir ${m2Resultado}Mts con pintura</h5>
                        </div>
                        `
        resultado.appendChild(div);

    console.log (m2Resultado);
}


refresh.addEventListener('click', _ => {
            location.reload();
})

btnCaptura.addEventListener (`click`, _ => {
    capturar();
    listaParedes();
    console.log (arrayParedes);
})

btnResultado.addEventListener(`click`, _ => {
    capturar();
    listaParedes();
    calcular();
})


