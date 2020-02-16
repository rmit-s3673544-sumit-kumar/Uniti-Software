package com.hospital.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hospital.dao.UserDAO;
import com.hospital.entity.Employee;
import com.hospital.entity.User;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	UserDAO userDAO;

	

	@Override
	@Transactional
	public User findByUsernameAndPassword(String username, String password) {
		return userDAO.findByUsernameAndPassword(username, password);
	}

	@Override
	@Transactional
	public String save(User user) {
		return userDAO.save(user);

	}

	@Override
	@Transactional
	public String delete(int id) {
		return userDAO.delete(id);
	}

	@Override
	public User findByEmployee(Employee employee) {
		
		return userDAO.findByEmployee(employee);
	}

	@Override
	public List<User> findAllUser() {
		return userDAO.findAllUser();
	}
	
	

}
