package com.maxi.model;

import java.util.List;

public class Reproductor {
	
	private ListaTemas listaTemas;
	private Tema temaSonando;
	
	public Reproductor(){
		this.listaTemas = new ListaTemas();
		temaSonando = null;
	}
	
	public void setTemaSonando(Tema tema){
		this.temaSonando = tema;
	}

	public ListaTemas getListaTemas() {
		return listaTemas;
	}

	public Tema getTemaSonando() {
		return temaSonando;
	}
	
	public List<Tema>getListaDeTemas(){
		return listaTemas.getListaDeTemas();
	}

	
	
	
	

}
