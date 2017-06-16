var tablaContenido = $('#listaComentarios');
var api = {
	url:'http://examen-laboratoria-sprint-5.herokuapp.com/topics'

}
// console.log(api.url);
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
	var id = tema.id;
	//crear elementos
	var tr = $('<tr />');
	var a = $("<a />",{
			href : 'verTopic.html?topic_id=' + id
	});
	var tdAutor = $('<td />');
	tdAutor.attr('data-id',id);
	var tdContenido = $('<td />');
	var tdRespuestas = $('<td />');
	//agregar contenido

	tdAutor.text(autorTema);
	tdContenido.text(contenido);
	tdRespuestas.text(respuestas);
	//agregar elementos
	a.append(tdAutor);
	tr.append(a);
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
	var inputBuscar = $('#input-buscar');
	$.getJSON(api.url, function(tema){
		// console.log(tema);
		var formatoBusqueda = $('#input-buscar').val().toLowerCase();
		var filtroContenido = tema.filter(function(contenidoT){
		return contenidoT.content.toLowerCase().indexOf(formatoBusqueda) >= 0;
		});
		tablaContenido.text('');
		//realizo un forEach porque tengo que recorrer esa funcion
		filtroContenido.forEach(imprimirTemas);
		// console.log(filtroContenido);
		inputBuscar.val('');
	});
	
}

$(document).ready(cargarPagina);