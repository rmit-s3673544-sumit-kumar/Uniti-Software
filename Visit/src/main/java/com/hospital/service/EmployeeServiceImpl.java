package com.hospital.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hospital.dao.EmployeeDAO;
import com.hospital.entity.Employee;

@Service
public class EmployeeServiceImpl implements EmployeeService {
	@Autowired
	EmployeeDAO employeeDAO;

	@Override
	@Transactional
	public List<Employee> findAll() {
		return employeeDAO.findAll();
	}

	@Override
	@Transactional
	public Employee findById(int id) {
		return employeeDAO.findById(id);
	}

	@Override
	@Transactional
	public boolean save(Employee employee) {
		return employeeDAO.save(employee);

	}

	@Override
	@Transactional
	public boolean delete(int id) {
		return employeeDAO.delete(id);
	}

	@Override
	@Transactional
	public Map<String, Object> dashboard() {
		return employeeDAO.dashboard();
	}

	@Override
	@Transactional
	public List<Employee> findEmployeeListOnly() {
		return employeeDAO.findEmployeeListOnly();
	}

	@Override
	@Transactional
	public boolean activeFlag(int id) {
		return employeeDAO.activeFlag(id);
	}

	@Override
	@Transactional
	public Employee findByEmail(String email) {
		return employeeDAO.findByEmail(email);
	}

}
