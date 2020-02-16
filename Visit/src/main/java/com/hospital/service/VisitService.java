package com.hospital.service;

import java.util.List;

import com.hospital.entity.Round;
import com.hospital.entity.Visit;

public interface VisitService {
	
public List<Visit> findAll();
	
	public Visit findById(int id);
	
	public boolean save(Visit visit);
	
	public boolean delete(Round round);

	public List<Visit> findByRound(Round round);

}
