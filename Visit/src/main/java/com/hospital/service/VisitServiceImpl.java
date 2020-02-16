package com.hospital.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hospital.dao.VisitDAO;
import com.hospital.entity.Round;
import com.hospital.entity.Visit;

@Service
public class VisitServiceImpl implements VisitService {
	@Autowired
	VisitDAO visitDAO;

	@Override
	@Transactional
	public List<Visit> findAll() {
		return visitDAO.findAll();
	}

	@Override
	@Transactional
	public Visit findById(int id) {
		return visitDAO.findById(id);
	}

	@Override
	@Transactional
	public boolean save(Visit visit) {
		return visitDAO.save(visit);

	}

	@Override
	@Transactional
	public boolean delete(Round round) {
		return visitDAO.delete(round);
	}

	@Override
	@Transactional
	public List<Visit> findByRound(Round round) {
		return visitDAO.findByRound(round);
	}

}
