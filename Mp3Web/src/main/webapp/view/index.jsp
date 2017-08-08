<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
	
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/bootstrap.min.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/main.css" />
	


<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/jquery-3.2.1.min.js"></script>  
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/reproductor.js"></script>  


<html>

<body>


<div id="about" class="container">
	<div class="row">
		 <div class="col-sm-7 col-sm-offset-2 text-center">
		 
			<h2>Rockola!</h2>
			
			<ul class="list-group" id="playList">
				<c:forEach items="${cancion.getListaDeTemas()}" var="item">
			  		<a id="cancion" name="${item.nombre}" class="list-group-item"  onClick="llamadaAjax('GET','${item.nombre}','${cancion.getPathMusica()}');" role="button">${item.nombre}</a>
				</c:forEach>
			</ul>
	
	
	
			<div class="panel-group">
				<div class="panel panel-primary">
				  	<div class="panel-heading">
					  	<h4 class="panel-title" id="tituloReproductor"></h4>
				  	</div>
				  
				  
				  	<div class="panel-body" id="panelReproductor">
				  		<audio  id="reproductor"> </audio>
				  		
				  		<div>
				  			<div id="tiempo" class="text-left"></div>
							<div class="progress progress-striped active"  id="track">
			  					<div class="progress-bar" role="progressbar" id="progress"
			      				 aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
			       				 style="width: 0%">
			    					<span class="sr-only"></span>
			  					</div>
							</div>
						</div>
						<div id="botones">
							<a id="previous"	onClick="back()"><img src="/Mp3Web/resources/img/iconos/previous.png" value="previous" style="width: 48px"/></a>
							<a id="play"		onClick="play()"><img src="/Mp3Web/resources/img/iconos/play.png" value="play" style="width: 48px"/></a>
							<a id="pause"		onClick="stop()"><img src="/Mp3Web/resources/img/iconos/pause.png" value="pause" style="width: 48px"/></a>
							<a id="next"		onClick="next()"><img src="/Mp3Web/resources/img/iconos/next.png" value="next" style="width: 48px"/></a>
						
						</div>											
			
				  	</div>
			  
			 	</div>
			  						  
			</div>
			
			
		</div>
	</div>
	
	<div id="path" value="/Mp3Web/mp3/"></div>
		
</div>


</body>
</html>
