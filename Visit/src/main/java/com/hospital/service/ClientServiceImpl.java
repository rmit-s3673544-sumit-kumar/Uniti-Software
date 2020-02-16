package com.hospital.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hospital.dao.ClientDAO;
import com.hospital.entity.Client;

@Service
public class ClientServiceImpl implements ClientService {
	@Autowired
	ClientDAO clientDAO;

	@Override
	@Transactional
	public List<Client> findAll() {
		return clientDAO.findAll();
	}

	@Override
	@Transactional
	public Client findById(int id) {
		return clientDAO.findById(id);
	}

	@Override
	@Transactional
	public boolean save(Client client) {
		return clientDAO.save(client);

	}

	@Override
	@Transactional
	public boolean delete(int id) {
		return clientDAO.delete(id);
	}

	@Override
	@Transactional
	public boolean disableClient(int id) { 
		return clientDAO.disableClient(id);
	}

}
