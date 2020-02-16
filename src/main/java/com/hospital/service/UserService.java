package com.hospital.service;

import java.util.List;

import com.hospital.entity.Employee;
import com.hospital.entity.User;

public interface UserService {
	
	public User findByEmployee(Employee employee);
	
	public User findByUsernameAndPassword(String username, String password);
	
	public String save(User user);
	
	public String delete(int id);

	public List<User> findAllUser();
}
