package com.hospital.service;

import java.util.List;
import java.util.Map;

import com.hospital.entity.Employee;

public interface EmployeeService {
	
public List<Employee> findAll();
	
	public Employee findById(int id);
	
	public String save(Employee employee);
	
	public String delete(int id);

	public Map<String,Object> dashboard();
	
	public List<?> findAllObject();
}
