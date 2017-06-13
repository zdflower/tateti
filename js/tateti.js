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
	  for (var f of this.tablero){
	    for (var c of f){
	       if(!c.ocupada){
		 return false;
	       }
	    }
	  }
	  return true;
	}
	
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
	  var i = 0;
	  for (var f of this.tablero){
	    if(i === n){
	      res.push(f[i]);
	    }
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
	//acá faltaría pedir que las dos ocupadas sean por el mismo tipo de ficha
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
		console.log("línea:");
		console.log(linea);
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


var tateti = new Tateti('X', 'h');

/* testeando el tipo Tateti */
console.log(tateti);
//tateti.agregarFicha('O', 1,1);
//tateti.agregarFicha('O', 0,0);
//tateti.agregarFicha('O', 2,2);
//console.log("Test de hay 3 iguales (debería decir true): " + tateti.hay3Iguales(['O', 'O', 'O']));
//console.log("Test de hay 3 en línea (debería decir true): " + tateti.hay3EnLinea());
//console.log(tateti.diagonales());
/*
console.log(tateti.estaOcupada(2,2));
tateti.agregarFicha('O', 2,2);
console.log(tateti.estaOcupada(2,2));
console.log(tateti);

tateti = new Tateti('O', 'c');
console.log(tateti);
tateti.mostrarTablero();
*/

/* setear eventos */
var IDS = [['ceroCero', 'ceroUno', 'ceroDos'], ['unoCero', 'unoUno', 'unoDos'], ['dosCero', 'dosUno', 'dosDos']];

/* manejar los eventos de la página */

/* Jugada humano */

/*************************
//acá celda es el objeto mismo
function jugadaHumano(tateti, celda, fila, columna){ //celda sería el objeto de la página web que se clickeó y donde voy a mostrar la ficha o celda sería el id? ¿qué conviene?
	if (!tateti.terminado && turno == 'h') {//es el turno del humano
       if (!estaOcupada(tateti, fila, columna)){
       	    agregarFicha(tateti, fichaHumano, fila, columna);
       	    //ahora tenés que mostrar la ficha en la pantalla
       	    mostrarCelda(celda, tateti.fichaHumano);
       	    if(!estaTerminado(tateti, ficha, columna)){
       			tateti.cambiarTurno(); //cuando termina cambia el turno a la computadora.
       			jugadaComputadora(tateti);// llamás a la jugada de la computadora
       		} else {
       			tateti = new Tateti('X', 'O', 'h');//podría tomar esos argumentos de lo que indique el usuario, es decir, antes de reemplazar el tateti anterior pedirle input al usuario sobre la ficha
       			terminado = true;
       		}
       }
	}
}
*************************/
function jugadaHumano(celda, fila, columna){ //tomo el tateti del js
  //antes tenés que ver si no está terminado el juego y si es el turno del jugador
if(!tateti.hay3EnLinea() && tateti.jugados < 9){
	//console.log("¿Hay 3 en línea?: " + tateti.hay3EnLinea()); // no está detectando si hay 3 en línea...
	  if (!tateti.estaOcupada(fila, columna)){
	    tateti.agregarFicha(tateti.fichaHumano, fila, columna);
	    mostrarCelda(celda, tateti.fichaHumano);
	    tateti.jugados += 1;
	    //console.log(tateti.columnas());
	    //console.log("lleno? " + tateti.estaLleno());
	    if(tateti.estaTerminado()){
	    	alert("Se terminó.");
	    } else {
	    	tateti.cambiarTurno();
	    	mostrarTurno(tateti);
	    	console.log("turno: " + tateti.turno);
	    	console.log(tateti.celdasVaciasDeLineasConDosOcupadas('X'));
	    	//llamar a la jugada de la computadora
	    	jugadaComputadora(tateti);
	    	//console.log(tateti);  
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
  console.log(tateti);
  console.log("jugados: " + tateti.jugados);
	//se supone que es el turno de la computadora, no habría otra forma de llegar acá si no, del modo en que está escrito
	//esto de chequear la variable terminado es temporal, hasta que vea qué hacer cuando se terminó una partida
	if(tateti.jugados < 9 && !tateti.hay3EnLinea()){
	//elegir una posicion al azar de entre 	celdasVaciasDeLineasConDosOcupadas(tateti.fichaComputadora); y si es vacío, si no hay ninguna
	// entonces de celdasVaciasDeLineasConDosOcupadas(tateti.fichaHumano);, es decir si no puede ganar entonces bloquear la posibilidad de ganar del contrario
	//y si no en la primera desocupada.
		var posicion = tateti.desocupada();
		console.log("Posición: " + posicion);
	    var posiblesParaGanar = tateti.celdasVaciasDeLineasConDosOcupadas(tateti.fichaComputadora);
	    var posiblesParaBloquear = tateti.celdasVaciasDeLineasConDosOcupadas(tateti.fichaHumano);
	    console.log("Posibles para ganar: " + posiblesParaGanar);
	    console.log("Posibles para bloquear: " + posiblesParaBloquear);
	    //podés no tener ninguna para ganar pero tal vez tampoco para bloquear
	    if (posiblesParaGanar.length >= 1){
	    	posicion = posiblesParaGanar[Math.floor(Math.random()* posiblesParaGanar.length)];//elijo al azar una de las celdas

		} else if (posiblesParaBloquear.length >= 1){
			posicion = posiblesParaBloquear[Math.floor(Math.random()* posiblesParaBloquear.length)];//elijo al azar una de las celdas
		} else {
			//antes de dejar que elija cualquiera desocupada, ver si está libre la del medio, la (1,1)
			if (!tateti.estaOcupada(1,1)) posicion = [1,1];
		}
	    console.log("Posición: " + posicion);
	    var fila = posicion[0];
		var columna = posicion[1];
		tateti.agregarFicha(tateti.fichaComputadora, fila, columna);
		var celda = document.getElementById(IDS[fila][columna]);
		mostrarCelda(celda, tateti.fichaComputadora);
		tateti.jugados +=1;
		//tal vez antes de cambiar el turno habría que testear si hay 3 en línea o está terminado y si es así, volver a empezar o mostrar algún mensaje.
		if(tateti.estaTerminado()){
			alert("Se terminó.");
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
