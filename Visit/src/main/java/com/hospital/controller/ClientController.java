package com.hospital.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.entity.Client;
import com.hospital.service.ClientService;

@RestController
@CrossOrigin("*")
public class ClientController {

	@Autowired
	ClientService clientService;
	
	@PostMapping("/addClient")
	public Map<String,Boolean> addClient(@RequestBody Client client) {
		Map<String,Boolean> result = new HashMap<>();
		
		client.setClientId(0);
		result.put("success", clientService.save(client));
		
		return result;
	}

	@PutMapping("/updateClient")
	public Map<String,Boolean> updateClient(@RequestBody Client client) {
		Map<String,Boolean> result = new HashMap<>();
		
		result.put("success",clientService.save(client));
		return result;
		
	}
	
	@DeleteMapping("/deleteClientById/{id}")
	public Map<String,Boolean> deleteClientById(@PathVariable("id") int id) {
		Map<String,Boolean> result = new HashMap<>();
		
		result.put("success",clientService.delete(id));
		return result;
	} 
	
	@GetMapping("/disableClientById/{id}")
	public Map<String,Boolean> disableClientById(@PathVariable("id") int id) {
		Map<String,Boolean> result = new HashMap<>();
		
		result.put("success",clientService.disableClient(id));
		return result;
	}
	
	@GetMapping("/getClientById/{id}")
	public Client getClientById(@PathVariable("id") int id) {
		
		return clientService.findById(id);
		
	}
	
	@GetMapping("/getClientList")
	public List<Client> getClientList(){
		
		return clientService.findAll();
		
	}
	
	
	
}
