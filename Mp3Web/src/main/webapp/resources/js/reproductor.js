var audio;
var path;
var temas;
var playlist;
var progress;
var duracion;
var holding;
var track;
var player;

function llamadaAjax(metodo,param) {
    $.ajax({
        url: 'getTema?tema='+param,
        type: metodo,
        dataType: "text",
        success: function (data)
        {
        	
        	audio.src = $('#path').attr('value')+"\/"+data+"";
        	audio.value = data;
        	
        	seleccionar(data);
        	alert(data);
        	audio.play();
  	
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
    });
}


function stop(){
	audio.pause();
	$('#progress').attr("class","progress-bar progress-bar-danger");
};

function play(){
	audio.play();
	$('#progress').attr("class","progress-bar");
};

function time(){
	return audio.currentTime;
};


$(document).ready(function() {

audio 		= document.getElementById('reproductor');
progress	= document.getElementById('progress');
track		= document.getElementById('track');
player		= document.getElementById('panelReproductor');
path 		= $('#path');
temas 		= $('#playList a');
playlist 	= $.makeArray(temas);
holding		= false;

initPlaylist();

function initPlaylist(){

	
	llamadaAjax("GET",playlist[0].name);
	
	
	audio.addEventListener('ended',function(e){
		
		var len = playlist.length;
		var canciones = [];
		var temaSonando;
		var numeroTemaSonando;
		var temaAReproducir;
		
		$.each(playlist, function(i) {
		    
			canciones[canciones.length] = playlist[i].name;
		
		});
		
		temaSonando = audio.value;
		numeroTemaSonando = canciones.indexOf(temaSonando);
		temaAReproducir;

		if(holding == false){

			if(numeroTemaSonando == len-1){
				temaAReproducir = 0;

			} else {
				temaAReproducir = numeroTemaSonando +1;

			}
			
		
	
			llamadaAjax("GET",playlist[temaAReproducir].name);
		}
		
	});
	
	audio.addEventListener('loadedmetadata', function () {
	    duracion = this.duration;
	}, false);
	
	
	
	audio.addEventListener('play',function(e){
		$('#tituloReproductor').html(audio.value);
	});
	

	/*
	$('#reproductor').change(function(){
		$('#tituloReproductor').html(audio.value);
	});
	
	*/
	audio.ontimeupdate = function(){progresarBarra()};
	
	function progresarBarra(){
		
		var curtime;
		var percent;
		
		curtime = time();
		
	    percent = Math.round((curtime * 100) / duracion);
	    progress.style.width = percent + '%';
	   // handler.style.left = percent + '%';
	};
	


}


window.onmousemove = function (e) {
    e.preventDefault();
    if (holding)seekTrack(e);
}

track.onmousedown = function (e) {
    holding = true;
 
    console.log(holding);
  
}

track.onmouseup = function (e) {
 //   holding = false;
    seekTrack(e);
    console.log(holding);
}


window.onmouseup = function (e) {
    holding = false;
//    seekTrack(e);
    console.log(holding);
}

function seekTrack(e) {
		
    event = e || window.event;
    var x = e.pageX - player.offsetLeft /*- track.offsetLeft*/;
    
   
    
    percent = Math.round((x * 100) / track.offsetWidth);
    if (percent > 100) percent = 100;
    if (percent < 0) percent = 0;
    progress.style.width = percent + '%';
    //handler.style.left = percent + '%';
    
    audio.currentTime = 1;
    
    //audio.play();
    audio.currentTime = (percent * duracion) / 100
}


});


function seleccionar(nombre){		
	$('#playList a').attr("class","list-group-item list-group-item-action");
	$('[name="' + nombre+ '"]').attr("class","list-group-item list-group-item-action active");	
	
};


