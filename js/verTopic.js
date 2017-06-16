var topicId = getParameterByName('topic_id');

var api = {
	url:'http://examen-laboratoria-sprint-5.herokuapp.com/topics/' + topicId
}
console.log(api.url);
var cargarPagina = function() {
	// alert('index cargado');
	mostrarTemaIndividual();
}
var mostrarTemaIndividual = function(data){
	// $.getJSON(api.url, function(titulo){
	// 	// console.log(titulo);
	// 	// titulo.forEach(imprimirTitulo);
	// 	//no va un forEach porque no es arreglo es un objeto
	// 	imprimirTitulo(titulo);
	// });
	$.getJSON(api.url, imprimirTitulo);
}
/*
 "id": 1,
  "author_name": "Emmanuel",
  "content": "Miren esta URL",
  "created_at": "2017-06-05T21:19:00.801Z",
  "updated_at": "2017-06-05T21:19:00.801Z"

*/


var imprimirTitulo = function(titulo){
	// console.log(titulo.id);
	var temaIndividual = $('#temaIndividual');
	var idContenido = $('#contenido');
	var idCreado = $('#diaCreado');
	var idActualizacion = $('#diaActualizacion');

	var autor = titulo.author_name;
	var contenido = titulo.content;
	var diaCreado = titulo.created_at;
	var actualizacion = titulo.updated_at;
	//agregar 
	temaIndividual.text(autor);
	idContenido.text(contenido);
	idCreado.text(diaCreado);
	idActualizacion.text(actualizacion);
}

$(document).ready(cargarPagina);
