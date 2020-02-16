package com.hospital.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.hospital.entity.Round;
import com.hospital.service.RoundService;

@Controller
public class TestController {
	
	@Autowired
	RoundService roundservice;
	
	@GetMapping("/test")
	public String test(Model model) {
		Round round=roundservice.findById(4);
		System.out.println(round.toString());
		
		model.addAttribute("round",round);
		
		return "email-template";
		
	}

}
