/* completar y testear */

/* TATETI */

//tengo una clase de objetos: Tateti, un tateti tiene los atributos o variables de instancia un tablero, tiene fichaComputadora, fichaHumano
//y después tiene 
// un constructor, un agregarficha,
// observadores: obtenerTablero, obtenerFichaHumano, obtenerFichaComputadora, estaOcupada?(tablero, fila, columna),
// estaTerminado?(tateti), 
//otras operaciones: diagonales, columnas, filas. Aunque filas sería el mismo tablero.

//cómo escribo una clase en javascript?

//voy a empezar con un objeto individual y después voy a ver cómo es más genérico
var Tateti = {
	"tablero" : [[{ocupada: false, ficha: ""},{ocupada: false, ficha: ""}, {ocupada: false, ficha: ""}],
	              [{ocupada: false, ficha: ""},{ocupada: false, ficha: ""}, {ocupada: false, ficha: ""}],
	              [{ocupada: false, ficha: ""},{ocupada: false, ficha: ""}, {ocupada: false, ficha: ""}]],
	"fichaHumano" : 'X',
	"fichaComputadora" : 'O',
	//tal vez me sirva, tal vez no tener el turno acá.
	"turno" : 'h', //h humano, c computadora
	"terminado" : false //tampoco sé si hace falta o me ayuda en algo
};

function resetearTateti(tateti){
	tateti.tablero = [[{ocupada: false, ficha: ""},{ocupada: false, ficha: ""}, {ocupada: false, ficha: ""}],
	              [{ocupada: false, ficha: ""},{ocupada: false, ficha: ""}, {ocupada: false, ficha: ""}],
	              [{ocupada: false, ficha: ""},{ocupada: false, ficha: ""}, {ocupada: false, ficha: ""}]];
	tateti.fichaHumano ='X';
	tateti.fichaComputadora = 'O';
	tateti.turno = 'h';
	tateti.terminado = false;
}

//modifica el tablero del tateti
// 0 <= fila y columna <= 2
// tipoFicha es 'X' o 'O', el mismo que fichaHumano y fichaComputadora
//se supone que la celda en fila, columna está vacía y es el turno correspondiente al tipo de ficha
function agregarFicha(tateti, tipoFicha, fila, columna){
	//¿sería lo mismo si yo asigno tateti.tablero[fila][columna] a una variable y después digo celda.ocupada = true?
	tateti.tablero[fila][columna].ocupada = true;
	tateti.tablero[fila][columna].ficha = tipoFicha;
}

//devuelve un booleano indicando si la celda correspondiente a la fila y columna del tablero del tateti está ocupada o no
function estaOcupada(tateti, fila, columna){
   return tateti.tablero[fila][columna].ocupada;
}

function estaTerminado(tateti){
	//si para toda fila y toda columna y toda diagonal no hay tres fichas iguales o queda alguna celda vacía entonces no está terminado
    //chequear si están todas las celdas ocupadas, en ese caso devolver true, está terminado
    //si no están todas ocupadas, chequear si hay tres en línea en filas, columnas y diagonales
    return estaLleno(tateti) || hay3EnLinea(tateti);
}

function estaLleno(tateti){
	/* completar */
	return false;
}

function hay3EnLinea(tateti){
	/* completar */

	//esto se podría chequear en el momento de la jugada después de llamar a ubicar una ficha, viendo si las de la misma fila, columna o diagonal que la que recién pusiste eran del mismo tipo. 
	//recorro las filas

	//recorro las diagonales

	//recorro las columnas
	return false;
}

/* setear eventos */
var IDS = [['ceroCero', 'ceroUno', 'ceroDos'], ['unoCero', 'unoUno', 'unoDos'], ['dosCero', 'dosUno', 'dosDos']];

function setEvents(){
	//¿puedo usar una clase celda y seleccionar a cada elemento por clase y después a cada uno le paso...
	//¿cómo le paso la fila y columna que corresponde... pensarlo un poco más
	//tal vez si uso el array de ids, y hago un for que recorra las filas y otro que para cada fila recorra las columnas y a cada celda le pone onclick = jugadaHumano(id/objeto, fila,columna), tal vez podría pasarle el propio objeto, ¿cómo?
/*
	//mientras tanto...
	var celda00 = document.getElementById('ceroCero');
	var celda01 = document.getElementById('ceroUno');
    var celda02 = document.getElementById('ceroDos');
    var celda10 = document.getElementById('unoCero');
    var celda11 = document.getElementById('unoUno');
    var celda12 = document.getElementById('unoDos');
    var celda20 = document.getElementById('dosCero');
    var celda21 = document.getElementById('dosUno');
    var celda22 = document.getElementById('dosDos');
*/

/* no funciona como esperaba, cuando carga la página se empiezan a mostrar los alerts sin que yo clickee nada y cuando terminan de aparecer y quiero clickear no pasa nada

    for (var f = 0; f < IDS.length; f++){
    	var fila = IDS[f];
    	for (var c = 0; c < fila.length; c++){
           var idCelda = fila[c];
           var celda = document.getElementById(idCelda);
           celda.onclick = function(){ alert("fila: " + f + ", " + "columna: " + c);};//jugadaHumano(idCelda, f, c);
  //tampoco funciona lo de asignarle el f,c que corresponda, cuando clickeo muestran todas fila 3 columna 3!!! ??
    	}
    }
*/
/*
		var celda00 = document.getElementById('ceroCero');
		celda00.onclick = function mostrarAlerta(){
			alert('soy la 00');
		}; //si le ponía mostrarAlerta('soy la 00'); y aparte escribía la función, cuando cargaba el documento sin que tuviera que clickear aparecía el alerta
		¿le voy a tener que implementar ahí mismo la función de la jugadaHumano? queda horrible, si es así, entonces el onclick se lo pongo en el html.
*/
}

/* manejar los eventos de la página */
/* agregarle eventos de click a las celdas/divs de la página*/

//función para saber quién empieza y setear el turno inicial, a partir de un click en la página
//jugador es 'c' o 'h'

function empieza(jugador){ //al clickear en computadora o humano, se envía 'c' o 'h' a la función empieza
   Tateti.turno = jugador;
   //si resulta que empieza la computadora, llama a la función de jugadaComputadora
   if (Tateti.turno == 'c'){
   	jugadaComputadora(Tateti);
   } 
}

/* Jugada humano */
/* completar la parte de mostrar la celda recién completada, podría haber una función mostrar celda */


//acá celda es idCelda
function jugadaHumano(idCelda, fila, columna){ //celda sería el objeto de la página web que se clickeó y donde voy a mostrar la ficha o celda sería el id? ¿qué conviene?
	if (!Tateti.terminado && turno == 'h') {//es el turno del humano
       if (!estaOcupada(Tateti, fila, columna)){
       	    agregarFicha(Tateti, fichaHumano, fila, columna);
       	    //ahora tenés que mostrar la ficha en la pantalla
       	    mostrarCelda(idCelda, Tateti.fichaHumano);
       	    if(!estaTerminado(Tateti, ficha, columna)){
       			turno = 'c'; //cuando termina cambia el turno a la computadora.
       			jugadaComputadora(Tateti);// llamás a la jugada de la computadora
       		} else {
       			//reiniciarJuego();//¿cómo? Tal vez tendría que haber una parte en que se inicia el juego, tengo que aprender sobre clases y objetos en javascript
       			//en un principio, podríamos no hacer nada, que sólo se pueda jugar una partida, más adelante, incorporar lo de reiniciarjuego
       			terminado = true;
       		}
       }
	}
}

//celda es 
function mostrarCelda(idCelda, ficha){
	var celda = document.getElementById(idCelda);
	celda.textContent = ficha;
}

/* Jugada computadora */
/* ¿cómo voy de fila y columna al div correspondiente para mostrar la ficha que puso la computadora? 
¿uso un mapa tipo {"ceroCero": {fila: 0, col: 0}} y me las arreglo para recorrer los values
*/
function jugadaComputadora(tateti){
	//se supone que es el turno de la computadora, no habría otra forma de llegar acá si no, del modo en que está escrito
	
	//esto de chequear la variable terminado es temporal, hasta que vea qué hacer cuando se terminó una partida
	if(!Tateti.terminado){
		var fila;
		var columna;
		//si hay dos fichas propias o ajenas en la misma línea, completa la fila
			// fila = la fila de la celda a completar
			//columna = la columna de la celda a completar
		//si no, 
	    	//elige al azar 2 números entre 0 y 2 para fila y columna
			// y repite mientras la celda correspondiente a fila y columna elegidos esté ocupada
			//si sale del loop es que encontró una celda vacía.
		//en cualquiera de los dos casos, finalmente
		//agregarFicha(tateti, fichaComputadora, fila, columna);
		//si no está terminado el juego
			//pasar el turno al jugador humano
		//else
			//Tateti.terminado = true;
	}
}

window.onload = function(){
	setEvents();
}