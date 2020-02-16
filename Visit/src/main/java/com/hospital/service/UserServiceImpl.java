package com.hospital.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hospital.dao.UserDAO;
import com.hospital.entity.Employee;
import com.hospital.entity.UserDeatil;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	UserDAO userDAO;

	

	@Override
	@Transactional
	public UserDeatil findByUsernameAndPassword(String username, String password) {
		return userDAO.findByUsernameAndPassword(username, password);
	}

	@Override
	@Transactional
	public boolean save(UserDeatil user) {
		return userDAO.save(user);

	}

	@Override
	@Transactional
	public boolean delete(Employee emp) {
		return userDAO.delete(emp);
	}

	@Override
	@Transactional
	public boolean activeFlag(Employee emp) {
		return userDAO.activeFlag(emp);
	}
	
	@Override
	@Transactional
	public UserDeatil findByEmployee(Employee employee) {
		
		return userDAO.findByEmployee(employee);
	}

	@Override
	public UserDeatil findByUsername(String username) {
		return userDAO.findByUsername(username);
	}

	

}
