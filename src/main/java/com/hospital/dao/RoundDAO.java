package com.hospital.dao;

import java.util.Date;
import java.util.List;

import com.hospital.entity.Employee;
import com.hospital.entity.Round;

public interface RoundDAO {

	public List<Round> findAll();
	
	public Round findById(int id);
	
	public String save(Round round);
	
	public String delete(int id);
	
	public List<Round> findRoundsByDate(Date date);
	
	public Round findRoundByEmployeeAndDate(Employee employee,Date date);
	
	public List<Round> findRoundsByEmpId(Employee employee);
}
