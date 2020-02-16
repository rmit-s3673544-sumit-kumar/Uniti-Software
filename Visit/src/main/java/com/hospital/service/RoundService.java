package com.hospital.service;

import java.util.Date;
import java.util.List;

import com.hospital.entity.Employee;
import com.hospital.entity.Round;

public interface RoundService {
	
public List<Round> findAll();
	
	public Round findById(int id);
	
	public boolean save(Round round);
	
	public boolean delete(int id);
	
	public List<Round> findRoundsByDate(Date date);
	
	public Round findRoundByEmployeeAndDate(Employee employee,Date date);
	
	public List<Round> findRoundsByEmpId(Employee employee);
	
}
