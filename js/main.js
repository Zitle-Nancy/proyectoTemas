var tablaContenido = $('#listaComentarios');
var api = {
	url:'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
}

var cargarPagina = function() {
	mostrarTemas();
}

var mostrarTemas = function(data){
	$.getJSON(api.url, function(tema){
		tema.forEach(imprimirTemas);
	});
}
var imprimirTemas = function(tema){
	var autorTema = tema.author_name;
	var contenido = tema.content;
	var respuestas = tema.responses_count;
	//crear elementos
	var tr = $('<tr />');
	var tdAutor = $('<td />');
	var tdContenido = $('<td />');
	var tdRespuestas = $('<td />');
	//agregar contenido
	tdAutor.text(autorTema);
	tdContenido.text(contenido);
	tdRespuestas.text(respuestas);
	//agregar elementos
	tr.append(tdAutor);
	tr.append(tdContenido);
	tr.append(tdRespuestas);
	//agregar a la tabla
	tablaContenido.append(tr);



}


$(document).ready(cargarPagina);