/* completar y testear */

/* TATETI */

//tengo una clase de objetos: Tateti, un tateti tiene los atributos o variables de instancia un tablero, tiene fichaComputadora, fichaHumano
//y después tiene 
// un constructor, un agregarficha,
// observadores: obtenerTablero, obtenerFichaHumano, obtenerFichaComputadora, estaOcupada?(tablero, fila, columna),
// estaTerminado?(tateti), 
//otras operaciones: diagonales, columnas, filas. Aunque filas sería el mismo tablero.

//constructor de Tateti
var Tateti = function(fichaH, turno) {
	this.tablero = [[{ocupada: false, ficha: "", posicion: [0,0]},{ocupada: false, ficha: "", posicion: [0,1]}, {ocupada: false, ficha: "", posicion: [0,2]}],
	              [{ocupada: false, ficha: "", posicion: [1,0]},{ocupada: false, ficha: "", posicion: [1,1]}, {ocupada: false, ficha: "", posicion: [1,2]}],
	              [{ocupada: false, ficha: "", posicion: [2,0]},{ocupada: false, ficha: "", posicion: [2,1]}, {ocupada: false, ficha: "", posicion: [2,2]}]];
	this.fichaHumano = fichaH;
	this.fichaComputadora = (fichaH == 'X' )? 'O' : 'X';
	this.turno = turno, //h humano, c computadora
    this.jugados = 0; //
	


	//métodos
    this.setFichaHumano = function(ficha){
      this.fichaHumano = ficha;
      this.fichaComputadora = (ficha == 'X' )? 'O' : 'X';
    };
	
	this.reset = function(fichaH, turno){
		this.tablero = 	this.tablero = [[{ocupada: false, ficha: "", posicion: [0,0]},{ocupada: false, ficha: "", posicion: [0,1]}, {ocupada: false, ficha: "", posicion: [0,2]}],
	              [{ocupada: false, ficha: "", posicion: [1,0]},{ocupada: false, ficha: "", posicion: [1,1]}, {ocupada: false, ficha: "", posicion: [1,2]}],
	              [{ocupada: false, ficha: "", posicion: [2,0]},{ocupada: false, ficha: "", posicion: [2,1]}, {ocupada: false, ficha: "", posicion: [2,2]}]];
		this.fichaHumano = fichaH;
		this.fichaComputadora = (fichaH == 'X' )? 'O' : 'X';
		this.turno = turno;
		this.jugados = 0;
	};

	this.agregarFicha = function(tipoFicha, fila, columna){
	  this.tablero[fila][columna].ocupada = true;
	  this.tablero[fila][columna].ficha = tipoFicha;
	};
	  
	this.estaOcupada = function(fila, columna){
	  return this.tablero[fila][columna].ocupada;
	};
	
	this.cambiarTurno = function(){
	  if (this.turno == 'c'){
	    this.turno = 'h';
	  } else {
	    this.turno = 'c';
	  }
	};
	
	//¿para qué quiero esta función?
	this.mostrarTablero = function(){
	  for (var i = 0; i < this.tablero.length; i++){
	    var f = this.tablero[i];	    
	    for (var j = 0; j < f.length; j++){
	      var c = f[j];
	      var txt = "(" + i + ", " + j + ")";
	      console.log(txt);
	    }
	  }
	}
	
	//otra podría ser que cuente las jugadas, si fueron 9, listo.
	this.estaLleno = function(){
		return this.jugados >= 9;
	}

/*
	this.estaLleno = function(){
	  for (var f of this.tablero){
	    for (var c of f){
	       if(!c.ocupada){
		 return false;
	       }
	    }
	  }
	  return true;
	}
*/
	
	//otras operaciones
	this.diagonales = function(){
	  var res = [];
	  res.push([]);
	  res.push([]);
	  res[0].push(this.tablero[0][0]);
	  res[0].push(this.tablero[1][1]);
	  res[0].push(this.tablero[2][2]);
	  res[1].push(this.tablero[0][2]);
	  res[1].push(this.tablero[1][1]);
	  res[1].push(this.tablero[2][0]);
	  return res;
	}
	
	this.columna = function(n){
	  var res = [];
	  for (var f of this.tablero){ //¡¡i no cambia nunca, por eso sólo funciona cuando n es 0!!
	    res.push(f[n]);
	  }
	  return res;
	}
	
	this.columnas = function(){
	  var res = [];
	  res.push(this.columna(0));
	  res.push(this.columna(1));
	  res.push(this.columna(2));	  
	  return res;
	}
	
	this.estaTerminado = function(){
	  //si para toda fila y toda columna y toda diagonal no hay tres fichas iguales o queda alguna celda vacía entonces no está terminado
	  //chequear si están todas las celdas ocupadas, en ese caso 	devolver true, está terminado
	  //si no están todas ocupadas, chequear si hay tres en línea 	en filas, columnas y diagonales
	  return tateti.estaLleno() || tateti.hay3EnLinea();
	}

	//devuelve una lista de posiciones de celdas vacías que están en líneas con dos celdas ocupadas
	
    //¿¿acá faltaría pedir que las dos ocupadas sean por el mismo tipo de ficha??
    
    this.celdasVaciasDeLineasConDosOcupadas = function(ficha){
    	var lineas = this.columnas().concat(this.tablero).concat(this.diagonales());
    	var res = [];
    	for (var linea of lineas){
    		var tiene = this.tieneUnaSolaDesocupada(linea, ficha); //espero un array vacío o uno no vacío con dos elementos correspondientes a una posición de celda del tablero
    		if (tiene.length !== 0){
    			res.push(tiene);
    		}
    	}
    	return res;
    }

    //¿podría haber dos líneas xx y oo?
    //¿qué sería mejor? ¿una función que devuelva las posiciones, no importa si son propias o no?
    this.tieneUnaSolaDesocupada = function(linea, tipoFicha){
    	//revisar y reescribir esta función
    	var count = 0;
    	var posicion = [];
    	for (var celda of linea){
    		if (celda.ocupada){
    			if (celda.ficha === tipoFicha){
    				count++;
    			}
    		} else {
    			//guardar la celda desocupada
    			posicion = celda.posicion;
    		}
    	}
    	if (count === 2){
    		return posicion;
    	} else {
    		return [];
    	}
    }

	this.hay3EnLinea = function(){
		var lineas = this.columnas().concat(this.tablero).concat(this.diagonales());
		for (var linea of lineas){
			if(this.hay3Iguales(linea)){
				return true;
			}
		}
		return false;
	}

	this.hay3Iguales = function(linea){
		//revisar y reescribir para mejor legibilidad y principalmente para que funcione como debiera
		//console.log("línea:");
		//console.log(linea);
		var count = 0;
		var ficha = "";
		for (var celda of linea){
			if (celda.ocupada){
				if (ficha !== ""){
					if(ficha === celda.ficha){
						count++;
					} else {
						return false;
					}
				} else {
					ficha = celda.ficha;
					count++;
				}
			} else {
				return false;
			}
		}
		return count === 3;
	}
	
    //podría modificarse el método de abajo para que devuelva una al azar entre las desocupadas en vez de la primera, para que sea menos previsible.
	this.desocupada = function(){
	  //busca y devuelve una celda desocupada
	  var posicion = [];//un par ordenado de fila, columna
	  for (var i = 0; i < this.tablero.length; i++){
	    var f = this.tablero[i];	    
	    for (var j = 0; j < f.length; j++){
	      if(!this.estaOcupada(i,j)){
		posicion = [i, j];
		return posicion; //devuelve la primera que encuentra
	      }
	    }
	  }
	}
};

//modificar el código para obtener la ficha con la que juega el humano de lo que indica el jugador en la página web
//hacer posible que empiece la computadora en vez del humano.

var tateti = new Tateti('X', 'h');

var IDS = [['ceroCero', 'ceroUno', 'ceroDos'], ['unoCero', 'unoUno', 'unoDos'], ['dosCero', 'dosUno', 'dosDos']];


/* manejar los eventos de la página */

/*
function reset(){
	//limpiar todas las celdas de la página
	//volver a mostrar el mensaje para elegir la ficha con la cual jugar 
    //elegir uno de los jugadores al azar para que sea el turno
    limpiarCeldas();
    var ficha = 'X';
    var turno = 'h';
	nuevo = new Tateti(ficha, turno); //esta modificación de tateti ¿permanece una vez que se salió de la función reset?
	//esta asignación no modifica el tateti de afuera.
	//tengo que investigar un poco más cómo hacer
	
	//¿tendría que hacer una suerte de constructor por copia?
	//¿cómo hago? recorro cada propiedad y la voy asignando como el nuevo?

	//¿puedo devolver el nuevo tateti y que la asignación se haga desde el llamador?

	//cómo hacés para que no se superpongan cosas, o que se pueda clickear antes de que se resetee, etc.
	console.log("reset");
	return nuevo;
}
*/

function limpiarCeldas(){
	//recorrer los ids de las celdas, y para cada celda, ponerle un espacio como contenido o el número que le corresponde
	var celda;
	for (var fila of IDS){
		for (var id of fila){
			celda = document.getElementById(id);
			celda.textContent = "";//queda sin nada que mostrar.
			//si no, tendría que hacer el loop sobre los índices, si quisiera mostrar la posición de la celda. 
			//con el espacio vacío aparece un espacio entre las celdas, cambia el aspecto de la cuadrícula que se ve en la página
		}		
	}
}

/* Jugada humano */
function jugadaHumano(celda, fila, columna){ //tomo el tateti del js
  //antes tenés que ver si no está terminado el juego y si es el turno del jugador
//no chequeo si es el turno del jugador
console.log("click humano");
//console.log(tateti);
if(!tateti.hay3EnLinea() && tateti.jugados < 9){
	console.log("jugada");
    if (!tateti.estaOcupada(fila, columna)){
	    tateti.agregarFicha(tateti.fichaHumano, fila, columna);
	    tateti.jugados += 1;

	    mostrarCelda(celda, tateti.fichaHumano);

	    if(tateti.estaTerminado()){
	    	//alert("Se terminó."); //muestra esto antes de mostrar la jugada en la pantalla, ¿cómo lo soluciono?
            //podría llamar a una función que reinicie el juego con algo del estilo:
            // tateti = new Tateti('X', 'O', 'h');
            //podría tomar esos argumentos de lo que indique el usuario, es decir, antes de reemplazar el tateti anterior pedirle input al usuario sobre la ficha
       	    //terminado = true;
			//console.log(tateti);

			//Mostrar un mensaje sobre quién ganó.
       	    console.log("terminó Humano"); //no siempre que termina el humano es que ganó, puede ser que se haya completado el tablero sin completar la línea
       	    tateti.reset('X', 'h');
       	    limpiarCeldas();
			mostrarTurno(tateti);
       	    //console.log(tateti);

	    } else {
	    	tateti.cambiarTurno();
	    	mostrarTurno(tateti);
	    	console.log("turno: " + tateti.turno);
	    	//console.log(tateti.celdasVaciasDeLineasConDosOcupadas('X'));
	    	//llamar a la jugada de la computadora
	    	jugadaComputadora(tateti);
		    }
	  } else {
	    console.log('ocupada');
	  }
	}
}

function mostrarCelda(celda, ficha){
	celda.textContent = ficha;
}

/* Jugada computadora */

function jugadaComputadora(tateti){
	//se podría modularizar un poco, encapsular y abstraer algunas partes de esta función...
	//console.log(tateti);
  	console.log("jugados: " + tateti.jugados);
	//se supone que es el turno de la computadora, no habría otra forma de llegar acá si no, del modo en que está escrito
	if(tateti.jugados < 9 && !tateti.hay3EnLinea()){//estos dos deberían estar en estaTerminado y reemplazar la guarda por !estaTerminado
	//toda esta parte debería estar encapsulada en una función, qué es lo que está haciendo la computadora, elegirCelda()

	//elegir una posicion al azar de entre 	celdasVaciasDeLineasConDosOcupadas(tateti.fichaComputadora); y si es vacío, si no hay ninguna
	// entonces de celdasVaciasDeLineasConDosOcupadas(tateti.fichaHumano);, es decir si no puede ganar entonces bloquear la posibilidad de ganar del contrario
	//y si no en la primera desocupada.
		var posicion = tateti.desocupada();

	    var posiblesParaGanar = tateti.celdasVaciasDeLineasConDosOcupadas(tateti.fichaComputadora);
	    var posiblesParaBloquear = tateti.celdasVaciasDeLineasConDosOcupadas(tateti.fichaHumano);

	    if (posiblesParaGanar.length >= 1){
	    	posicion = posiblesParaGanar[Math.floor(Math.random()* posiblesParaGanar.length)];//elijo al azar una de las celdas
		} else if (posiblesParaBloquear.length >= 1){
			posicion = posiblesParaBloquear[Math.floor(Math.random()* posiblesParaBloquear.length)];//elijo al azar una de las celdas
		} else {
			//antes de dejar que elija cualquiera desocupada, ver si está libre la del medio, la (1,1)
			if (!tateti.estaOcupada(1,1)) posicion = [1,1];
		}
		
		//una vez que eligió, pone la ficha en el tablero.
	    var fila = posicion[0];
		var columna = posicion[1];
		tateti.agregarFicha(tateti.fichaComputadora, fila, columna);
		tateti.jugados +=1; //esta acción tal vez tendría que hacerse dentro de agregar ficha 
	
		//una vez agregada, se muestra en la página

		var celda = document.getElementById(IDS[fila][columna]); 
		mostrarCelda(celda, tateti.fichaComputadora);

		//se debería esperar a que termine de mostrar la jugada en la página antes de continuar

		//chequear si con esa jugada se terminó el partido

		if(tateti.estaTerminado()){
			//alert("Se terminó.");
			//console.log(tateti);

			//Mostrar un mensaje sobre quién ganó.
			console.log("terminó Computadora");
			tateti.reset('X', 'h');//¿habría otra manera de no tener el reset en 2 lugares?
			limpiarCeldas();
			mostrarTurno(tateti);
			//console.log(tateti);
		} else {
			tateti.cambiarTurno();
			mostrarTurno(tateti);
			console.log("turno: " + tateti.turno);
		}
	}
}

function mostrarTurno(tateti){
	var turno;
	if (tateti.turno == 'h'){
		turno = tateti.fichaHumano;
	} else {
		turno = tateti.fichaComputadora;
	}
	var display = document.getElementById('turno');
	display.textContent = 'Turno: ' + turno;
}

//estaría bueno que lo que obtiene elige ficha lo pase al tateti y se muestre a su vez lo que está en el tateti, que esté unificado, que las modificaciones se hagan en un solo lugar.

function eligeFicha(tipoFicha){
    
    //dejar de mostrar la opción para elegir ficha y mostrar con qué juega cada uno
    var ficha = document.getElementById("ficha");
    ficha.style.display = "none";
    
    var hum = document.getElementById("hum");
    var comp = document.getElementById("comp");
    
    tateti.setFichaHumano(tipoFicha); //esto setea la ficha del humano y la computadora
    
    hum.textContent = "Humano juega con " + tateti.fichaHumano;
    comp.textContent = "Computadora juega con " + tateti.fichaComputadora; 
    
    jugadores.style.display = "block";
    
    
}

/* tests */
function testTateti(){
    console.log(tateti);
    tateti.agregarFicha('O', 0,2);
    tateti.agregarFicha('X', 0,1);
    tateti.agregarFicha('O', 0,0);
    tateti.agregarFicha('X', 1,1);
    tateti.agregarFicha('O', 1,0);
    tateti.agregarFicha('X', 2,1);
    //console.log("Test de hay 3 iguales (debería decir true): " + tateti.hay3Iguales(['O', 'O', 'O']));
    console.log("Test de hay 3 en línea (debería decir true): " + tateti.hay3EnLinea());
    //console.log("diagonales: ");
    //console.log(tateti.diagonales());
    //console.log("columnas: ");
    //console.log(tateti.columnas());
    //console.log("columna 1: ");
    //console.log(tateti.columna(1));
    /*
    console.log(tateti.estaOcupada(2,2));
    tateti.agregarFicha('O', 2,2);
    console.log(tateti.estaOcupada(2,2));
    console.log(tateti);

    tateti = new Tateti('O', 'c');
    console.log(tateti);
    tateti.mostrarTablero();
    */
}

/*
window.onload = function(){
	//test de limpiarCeldas
	limpiarCeldas();
};
*/