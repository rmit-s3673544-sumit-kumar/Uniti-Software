package com.hospital.service;

import java.util.List;
import java.util.Map;

import com.hospital.entity.Employee;

public interface EmployeeService {
	
public List<Employee> findAll();
	
	public Employee findById(int id);
	
	public boolean save(Employee employee);
	
	public boolean delete(int id);
	
	public boolean activeFlag(int id);
	
	public List<Employee> findEmployeeListOnly();

	public Map<String,Object> dashboard();
	
	public Employee findByEmail(String email);
}
