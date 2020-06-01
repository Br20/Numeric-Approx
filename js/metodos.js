"use strict";


//---Actualizacion de valor con el movimiento de sliders----------

document.querySelector("#valSlider1").innerHTML = document.querySelector("#slider1").value;
document.querySelector("#slider1").addEventListener("change",actualizarSlider1);
function actualizarSlider1(){
    document.querySelector("#valSlider1").innerHTML = document.querySelector("#slider1").value;
}

document.querySelector("#valSlider2").innerHTML = document.querySelector("#slider2").value;
document.querySelector("#slider2").addEventListener("change",actualizarSlider2);
function actualizarSlider2(){
    document.querySelector("#valSlider2").innerHTML = document.querySelector("#slider2").value;
}

document.querySelector("#valSlider3").innerHTML = document.querySelector("#slider3").value;
document.querySelector("#slider3").addEventListener("change",actualizarSlider3);
function actualizarSlider3(){
    document.querySelector("#valSlider3").innerHTML = document.querySelector("#slider3").value;
}

document.querySelector("#valSlider4").innerHTML = document.querySelector("#slider4").value;
document.querySelector("#slider4").addEventListener("change",actualizarSlider4);
function actualizarSlider4(){
    document.querySelector("#valSlider4").innerHTML = document.querySelector("#slider4").value;
}


let h = 1;
let tiempo = 0;
let pasos = 35/h;
let k = 0.5;
let g = 9.8;
let m = 5;




// --FUNCION F(X,Y) = dv/dt---

function fDeXY(t, y) {
    return g - (k * Math.pow(y,2) /m);
}



// ---------------------METODO DE EULER------------------------

document.querySelector("#botonEuler").addEventListener("click",euler);

function euler(){
    h = document.querySelector("#slider1").value;
    h = Math.abs(h);
    let yN = document.querySelector("#inputInicial1").value;
    yN = Math.abs(yN);

    for (let index = h; index <= pasos; index = index + h) {
        yN = yN + (h * fDeXY(index - 1,yN));
        if (index == h){
            document.querySelector("#resEuler").innerHTML = "Y("+ h + ") = " + yN + "<br> ... <br>";
        }
    }
    document.querySelector("#resEuler").innerHTML = document.querySelector("#resEuler").innerHTML + "Y(35) = " + yN;
    return 0 ;  
}




// ---------------------METODO DE EULER MEJORADO------------------------

document.querySelector("#botonEulerMejo").addEventListener("click",eulerMejorado);

function eulerMejorado(){
        h = document.querySelector("#slider2").value;
        h = Math.abs(h);
        let yN = document.querySelector("#inputInicial2").value;
        yN = Math.abs(yN);
        let yTN = yN;
        for (let index = h; index <= pasos; index = index + h) {
            yTN = yTN + (h * fDeXY(index-1,yTN));
            yN = yN + (h/2 *(fDeXY(index-1,yN) + fDeXY(index,yTN)));
            if (index == h){
                document.querySelector("#resEulerMejo").innerHTML = "Y("+ h + ") = " + yN + "<br> ... <br>";
            }
        }
        document.querySelector("#resEulerMejo").innerHTML = document.querySelector("#resEulerMejo").innerHTML + "Y(35) = " + yN;
        return 0 ;
}



// ---------------------METODO DE RUNGE KUTTA------------------------


document.querySelector("#botonRunge").addEventListener("click",rungeKutta);
function rungeKutta(){
    h = document.querySelector("#slider3").value;
    h = Math.abs(h);
    let yN = document.querySelector("#inputInicial3").value;
    yN = Math.abs(yN);
    let k1 = 0;
    let k2 = 0;
    let k3 = 0;
    let k4 = 0;
    let ind = 0;
    let aux1 =0;
    let aux2 = 0;



    

    for (let index = h; index <= pasos; index = index + h) {
        
        ind = index -1;
        k1 = fDeXY(ind,yN);

        aux1 = ind + (h/2);
        aux2 = yN + (h/2) * k1;
        k2 = fDeXY(aux1, aux2);

        aux2 = yN + (h/2) * k2;
        k3 = fDeXY(aux1, aux2);
            
        aux1 = aux1 + (h/2);
        aux2 = yN + h*k3;
        k4 = fDeXY(aux1,aux2);

        yN = yN + (h * (k1 + 2*k2 + 2*k3 + k4)/6);

        if (index == h){
            document.querySelector("#resRunge").innerHTML = "Y("+ h + ") = " + yN + "<br> ... <br>";
        }    
    }
    document.querySelector("#resRunge").innerHTML = document.querySelector("#resRunge").innerHTML + "Y(35) = " + yN;
    return 0;
}



// ---------------------METODO MIXTO DE EULER Y RUNGE KUTTA------------------------

document.querySelector("#botonEulerRunge").addEventListener("click",eulerRunge);

function eulerRunge(){
    h = document.querySelector("#slider4").value;
    h = Math.abs(h);
    let yN = document.querySelector("#inputInicial4").value;
    yN = Math.abs(yN);
    //Parte de Euler
    for (let index = h; index <= 10; index = index + h) {
        yN = yN + (h * fDeXY(index - 1,yN));
        if (index == h){
            document.querySelector("#resEulerRunge").innerHTML = "Y("+ h + ") = " + yN + "<br> ... <br>";
        }
    }
    //Parte de Runge Kutta
    let k1 = 0;
    let k2 = 0;
    let k3 = 0;
    let k4 = 0;
    let ind = 0;
    let aux1 =0;
    let aux2 = 0;
    for (let index = 11; index <= 25; index = index + h) {
        ind = index -1;
        k1 = fDeXY(ind,yN);
        aux1 = ind + (h/2);
        aux2 = yN + (h/2) * k1;
        k2 = fDeXY(aux1, aux2);
        aux2 = yN + (h/2) * k2;
        k3 = fDeXY(aux1, aux2);
        aux1 = aux1 + (h/2);
        aux2 = yN + h*k3;
        k4 = fDeXY(aux1,aux2);
        yN = yN + (h * (k1 + 2*k2 + 2*k3 + k4)/6);  
    }
    document.querySelector("#resEulerRunge").innerHTML = document.querySelector("#resEulerRunge").innerHTML + "Y(35) = " + yN;


}





// prueba estado estacionario

function v(t){
   // let eElevado = Math.exp(2*t*Math.sqrt(98)); // parte de la ecuación e elevado a (2*t*raiz(98))
    //return Math.sqrt(98) * ((eElevado - 1) / (eElevado + 1));


    return Math.sqrt(98) * ((Math.exp(2*t*Math.sqrt(98)) - 1) / (Math.exp(2*t*Math.sqrt(98)) + 1));
}

function estacionario(){
    let umbral = 0.05;
    let diferencia = 1; // valor mayor que 0,05 para que no detecte el primer loop
    let avance = 0.0005;
    let vAnt = 1;
    let temp = 0;
    let auxiliar = 0;

    while (diferencia > umbral) {
        console.log(temp);
        console.log(auxiliar, vAnt);
        console.log
        auxiliar = v(temp);
        diferencia = Math.abs(auxiliar - vAnt);
        vAnt = auxiliar;
        temp = temp + avance;
    }
    console.log("tiempo conv: " + temp);
}
//estacionario();

