package com.maxi.model;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class ListaTemas {
	
	private List<Tema>listaDeTemas = new ArrayList<Tema>();
	public String pathMusica = "/Mp3Web/mp3/";
	
	public ListaTemas(){
	
		String directorio = "C:\\Users\\mpadulao\\Documents\\GitHub\\Aplicacion\\Mp3Web\\src\\main\\webapp\\mp3";

		/*File file = new File(System.getProperty("user.dir")+System.getProperty("file.separator")+"src"+
							 System.getProperty("file.separator")+"main"+System.getProperty("file.separator")+"webapp"+System.getProperty("file.separator")+"mp3");
		*/
		File file = new File(directorio);
		File[] temas = file.listFiles();
		
		
		for(int i=0;i<temas.length;i++){
			
			Tema tema = new Tema(i,temas[i].getName());
			listaDeTemas.add(tema);
		}
	}

	public List<Tema> getListaDeTemas() {
		return listaDeTemas;
	}

	public String getPathMusica() {
		return pathMusica;
	}

	public void setPathMusica(String pathMusica) {
		this.pathMusica = pathMusica;
	}
	
	

}
