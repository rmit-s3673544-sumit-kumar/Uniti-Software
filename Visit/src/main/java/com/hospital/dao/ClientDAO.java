package com.hospital.dao;

import java.util.List;

import com.hospital.entity.Client;

public interface ClientDAO {

	public boolean save(Client client);
	
	public boolean delete(int id);
	
	public Client findById(int id);
	
	public List<Client> findAll();
	
	public boolean disableClient(int id);
}
