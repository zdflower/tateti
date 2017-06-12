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
	this.tablero = [[{ocupada: false, ficha: ""},{ocupada: false, ficha: ""}, {ocupada: false, ficha: ""}],
	              [{ocupada: false, ficha: ""},{ocupada: false, ficha: ""}, {ocupada: false, ficha: ""}],
	              [{ocupada: false, ficha: ""},{ocupada: false, ficha: ""}, {ocupada: false, ficha: ""}]];
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

	this.hay3EnLinea = function(){
	  /* completar */
	  //esto se podría chequear en el momento de la jugada después de llamar a ubicar una ficha, viendo si las de la misma fila, columna o diagonal que la que recién pusiste eran del mismo tipo. 
	  //recorro las filas

	  //recorro las diagonales

	  //recorro las columnas
	  return false;
	}

	this.hay2EnLinea = function(){
	  /* completar */
	  return false;
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

/* testeando el tipo Tateti */
var tateti = new Tateti('X', 'h');
console.log(tateti);
//tateti.agregarFicha('O', 1,1);
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
/* completar la parte de mostrar la celda recién completada, podría haber una función mostrar celda */

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
  if (!tateti.estaOcupada(fila, columna)){
    tateti.agregarFicha(tateti.fichaHumano, fila, columna);
    mostrarCelda(celda, tateti.fichaHumano);
    tateti.jugados += 1;
    //console.log(tateti.columnas());
    //antes de cambiar turno tenés que ver si completaste línea o si está todo el tablero ocupado.
    console.log("lleno? " + tateti.estaLleno());
    tateti.cambiarTurno();
    console.log("turno: " + tateti.turno);
    //llamar a la jugada de la computadora
    jugadaComputadora(tateti);
    //console.log(tateti);  
  } else {
    console.log('ocupada');
  }
}

function mostrarCelda(celda, ficha){
	celda.textContent = ficha;
}

/* Jugada computadora */
/* ¿cómo voy de fila y columna al div correspondiente para mostrar la ficha que puso la computadora? 
¿uso un mapa tipo {"ceroCero": {fila: 0, col: 0}} y me las arreglo para recorrer los values
*/
function jugadaComputadora(tateti){
  console.log(tateti);
  console.log("jugados: " + tateti.jugados);
	//se supone que es el turno de la computadora, no habría otra forma de llegar acá si no, del modo en que está escrito
	
	//esto de chequear la variable terminado es temporal, hasta que vea qué hacer cuando se terminó una partida
	if(tateti.jugados < 9){
  //tal vez para testear en principio, en vez de que elija al azar, porque cuando queda una sola ficha, por ahí se queda ciclando mucho,
  //que las vaya recorriendo todas las celdas desde la primera y que ocupe la primera desocupada que encuentre.
	  //que podría estar en un método que devuelva una celda desocupada
	  /*
		var fila = Math.floor(Math.random() * 3);
		var columna = Math.floor(Math.random() * 3);
		console.log("fila: " + fila);
		console.log("columna: " + columna);
		console.log(tateti.estaOcupada(fila,columna));
		while(tateti.estaOcupada(fila,columna)){
		  fila = Math.floor(Math.random() * 3);
		  columna = Math.floor(Math.random() * 3);
		}
		//encontró una desocupada
	*/
	        var posicion = tateti.desocupada();
	        var fila = posicion[0];
		var columna = posicion[1];
		tateti.agregarFicha(tateti.fichaComputadora, fila, columna);
		var celda = document.getElementById(IDS[fila][columna]);
		mostrarCelda(celda, tateti.fichaComputadora);
		tateti.jugados +=1;
		tateti.cambiarTurno();
		console.log("turno: " + tateti.turno);
		
		//si hay dos fichas propias o ajenas en la misma línea, completa la fila
			// fila = la fila de la celda a completar
			//columna = la columna de la celda a completar
		//si no, 
	    	//elige al azar 2 números entre 0 y 2 para fila y columna
			// y repite mientras la celda correspondiente a fila y columna elegidos esté ocupada
			//si sale del loop es que encontró una celda vacía.
		//en cualquiera de los dos casos, finalmente
		//tateti.agregarFicha(fichaComputadora, fila, columna);
		//si no está terminado el juego
			//pasar el turno al jugador humano
		//else
			//tateti.terminado = true;
	}
}

