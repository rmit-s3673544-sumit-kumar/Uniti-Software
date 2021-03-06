package com.hospital.dao;

import java.util.List;

import com.hospital.entity.Round;
import com.hospital.entity.Visit;

public interface VisitDAO {

	public List<Visit> findAll();
	
	public Visit findById(int id);
	
	public String save(Visit visit);
	
	public String delete(Round round);
	
	public List<Visit> findByRound(Round round);
	
}
