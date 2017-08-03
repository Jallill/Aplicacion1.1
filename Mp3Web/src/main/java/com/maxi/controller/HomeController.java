package com.maxi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.maxi.model.Reproductor;

@Controller
@RequestMapping("/mp3")
public class HomeController {
	
	
	@RequestMapping("/")
	public ModelAndView home(){
		
		Reproductor reproductor = new Reproductor();
		
		ModelMap modelo = new ModelMap();
		
		
		
		modelo.put("cancion", reproductor.getListaTemas());
		modelo.put("sonando", reproductor.getTemaSonando());
		
		return new ModelAndView("index",modelo);

	}
	
	@RequestMapping("/getTema")
	@ResponseBody
	public String getTema(@RequestParam("tema") String tema){
	
		
		return tema;
	}
	
	@RequestMapping("/get")
	@ResponseBody
	public String getTema(){

		
		return "asd";
	}
		
	

		      
}


