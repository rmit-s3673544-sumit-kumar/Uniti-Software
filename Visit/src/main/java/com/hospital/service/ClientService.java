package com.hospital.service;

import java.util.List;

import com.hospital.entity.Client;

public interface ClientService {
	
	public List<Client> findAll();
	
	public Client findById(int id);
	
	public boolean save(Client client);
	
	public boolean delete(int id);
	
	public boolean disableClient(int id);
}
