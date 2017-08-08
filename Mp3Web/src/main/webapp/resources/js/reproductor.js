var audio;
var path;
var temas;
var playlist;
var progress;
var duracion;
var holding;
var track;
var player;
var botonPlay;
var botonPause;
var botonStop;
var botonNext;
var botonPrevious;
var pathIconos;
var len;
var canciones = [];
var temaSonando;
var numeroTemaSonando;
var temaAReproducir;

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

function next(){
	
	
	botonPresionado(botonNext);
	
	setTimeout(function () {
		 botonPresionado(botonPlay);
		
    }, 0400);
	 cambiaTema("siguiente");
};

function back(){
		
	botonPresionado(botonPrevious);
	
	setTimeout(function () {
		 botonPresionado(botonPlay);
		
    }, 0400);
	 cambiaTema("anterior");
};

function time(){
	return audio.currentTime;
};


$(document).ready(function() {

audio 		= document.getElementById('reproductor');
progress	= document.getElementById('progress');
track		= document.getElementById('track');
player		= document.getElementById('player');
path 		= $('#path').attr('value');
temas 		= $('#playList a');
playlist 	= $.makeArray(temas);
len			= playlist.length;
holding		= false;

botonPlay		= $('#play img');
botonPause		= $('#pause img');
botonStop		= $('#stop img');
botonPrevious	= $('#previous img');
botonNext		= $('#next img');	

pathIconos =   "\/Mp3Web\/resources\/img\/iconos";

initPlaylist();

function initPlaylist(){

	
//	llamadaAjax("GET",playlist[0].name);
	

	
	audio.addEventListener('ended',function(e){
		cambiaTema("siguiente");
	});
	
	audio.addEventListener('loadedmetadata', function () {
	    duracion = this.duration;
	}, false);
	
	
	
	audio.addEventListener('play',function(e){
		$('#tituloReproductor').html(audio.value);
		
		
			botonPresionado(botonPlay);
	  
		
		
	});
	
	audio.addEventListener('pause',function(e){
		$('#tituloReproductor').html(audio.value);
		
		
			botonPresionado(botonPause);
	 
		
		
	});
	

	audio.ontimeupdate = function(){
		progresarBarra()
		};
	
	function progresarBarra(){
		
		var curtime;
		var percent;
		
		curtime = time();
		
	    percent = Math.round((curtime * 100) / duracion);
	    progress.style.width = percent + '%';
	    
	    $('#tiempo').html(pasarATiempo(curtime) + " / " +pasarATiempo(duracion));
	    
	   // handler.style.left = percent + '%';
	};
	
//	$('#play').onClick(alert('asd'));
	
	


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
	
	if(duracion){
		
		
		
		event = e || window.event;
	    var x = e.pageX - player.offsetLeft - track.offsetLeft;
	    
	   
	    
	    percent = Math.round((x * 100) / track.offsetWidth);
	    if (percent > 100) percent = 100;
	    if (percent < 0) percent = 0;
	    progress.style.width = percent + '%';
	    //handler.style.left = percent + '%';
	    
	    audio.currentTime = 1;
	    
	    //audio.play();
	    audio.currentTime = (percent * duracion) / 100
	}
    
}


});

function seleccionar(nombre){		
	$('#playList a').attr("class","list-group-item list-group-item-action");
	$('[name="' + nombre+ '"]').attr("class","list-group-item list-group-item-action active");	
	
};


function botonPresionado(boton){
	
	var widthDefault = 48;
	
	botonPlay.attr('src',pathIconos+"\/play.png");
	botonPause.attr('src',pathIconos+"\/pause.png");
	botonStop.attr('src',pathIconos+"\/stop.png");
	botonPrevious.attr('src',pathIconos+"\/previous.png");
	botonNext.attr('src',pathIconos+"\/next.png");

	botonPlay.width(48);
	botonPause.width(48);
	botonStop.width(48);
	botonPrevious.width(48);
	botonNext.width(48);


	
	boton.attr('src',pathIconos+"\/"+boton.attr('value')+"-presionado.png");
	boton.width(widthDefault-4);
	//botonPause.attr('src',pathIconos+"\/pause-presionado.png");
	
}


function cambiaTema(modo){


	$.each(playlist, function(i) {
	    
		canciones[canciones.length] = playlist[i].name;
	
	});
	
	temaSonando = audio.value;
	numeroTemaSonando = canciones.indexOf(temaSonando);
	temaAReproducir;
	
	

	if(holding == false){

		if(numeroTemaSonando == len-1 && modo == "siguiente"){
			temaAReproducir = 0;

		} else if(numeroTemaSonando == 0 && modo == "anterior") {
			temaAReproducir = len-1;

		}else{
			if(modo == "anterior"){
				temaAReproducir = numeroTemaSonando -1;
			}else{
				temaAReproducir = numeroTemaSonando +1;
			}
			
		}
		
	

		llamadaAjax("GET",playlist[temaAReproducir].name);
	}
}

function pasarATiempo(time){
	
	var hours = Math.floor( time / 3600 );  
	var minutes = Math.floor( (time % 3600) / 60 );
	var seconds = time % 60;
	seconds = Math.trunc(seconds); 
	
	//Anteponiendo un 0 a los minutos si son menos de 10 
	minutes = minutes < 10 ? '0' + minutes : minutes;
	 
	//Anteponiendo un 0 a los segundos si son menos de 10 
	seconds = seconds < 10 ? '0' + seconds : seconds;
	

	
	var result = hours + ":" + minutes + ":" + seconds;  // 2:41:30
	
	return result;
}

