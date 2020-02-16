package com.hospital.dao;

import java.util.List;

import com.hospital.entity.Round;
import com.hospital.entity.Visit;

public interface VisitDAO {

	
	public boolean save(Visit visit);
	
	public boolean delete(Round round);
	
	public Visit findById(int id);

	public List<Visit> findAll();

	public List<Visit> findByRound(Round round);
	
}
