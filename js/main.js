var tablaContenido = $('#listaComentarios');
var api = {
	url:'http://examen-laboratoria-sprint-5.herokuapp.com/topics'

}
console.log(api.url);
var cargarPagina = function() {
	$('#mostrar-formulario').submit(crearTemas);
	$('#buscar-temas').submit(filtrarTemas);
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
var crearTemas = function(e){
	e.preventDefault();
	var nombreTema = $('#nombre-tema').val();
	var contenidoTema = $('#contenido-tema').val();
	// console.log(nombreTema + " " + contenidoTema);
	$.post(api.url,{
		author_name: nombreTema,
		content: contenidoTema,
	},function(data){
		imprimirTemas(data);
		//ocultamos el modal
		$('#myModal').modal('hide');
	})
}
var filtrarTemas = function(e){
	e.preventDefault();
	$.getJSON(api.url, function(tema){
		// console.log(tema);
		var formatoBusqueda = $('#input-buscar').val().toLowerCase();
		var filtroContenido = tema.filter(function(contenidoT){
		// console.log(contenidoT.content);
		return contenidoT.content.toLowerCase().indexOf(formatoBusqueda) >= 0;
		});
		//recorrer el arreglo
		imprimirTemas(filtroContenido);
	});
}

$(document).ready(cargarPagina);