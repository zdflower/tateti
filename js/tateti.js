/* completar y testear */

/* TATETI */

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

/*************************
//acá celda es el objeto mismo
function jugadaHumano(celda, fila, columna){ //celda sería el objeto de la página web que se clickeó y donde voy a mostrar la ficha o celda sería el id? ¿qué conviene?
	if (!Tateti.terminado && turno == 'h') {//es el turno del humano
       if (!estaOcupada(Tateti, fila, columna)){
       	    agregarFicha(Tateti, fichaHumano, fila, columna);
       	    //ahora tenés que mostrar la ficha en la pantalla
       	    mostrarCelda(celda, Tateti.fichaHumano);
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
*************************/
function jugadaHumano(celda, fila, columna){
	mostrarCelda(celda, Tateti.fichaHumano);
}

function mostrarCelda(celda, ficha){
	celda.textContent = ficha;
}

/* Jugada computadora */

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

