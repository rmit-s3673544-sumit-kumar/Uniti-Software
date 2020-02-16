package com.hospital.dao;

import java.util.List;
import java.util.Map;

import com.hospital.entity.Employee;

public interface EmployeeDAO {
	
	public boolean save(Employee employee);
	
	public boolean delete(int id);
	
	public boolean activeFlag(int id);

	public Employee findById(int id);
	
	public List<Employee> findAll();
	
	public List<Employee> findEmployeeListOnly();
	
	public Map<String,Object> dashboard();
	
	public Employee findByEmail(String email);
	
}
