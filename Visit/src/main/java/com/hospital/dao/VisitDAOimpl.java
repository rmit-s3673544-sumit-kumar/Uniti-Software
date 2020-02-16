package com.hospital.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hospital.entity.Round;
import com.hospital.entity.Visit;
@Repository
public class VisitDAOimpl implements VisitDAO {
	
	@Autowired
	EntityManager entityManager;


	@Override
	public boolean save(Visit visit) {
		try {
			Session session=entityManager.unwrap(Session.class);
			session.saveOrUpdate(visit);
			return true;
		}catch(Exception e) {
			return false;
		}
	}

	@Override
	public boolean delete(Round round) {
		
		try {
			Session session=entityManager.unwrap(Session.class);
			Query<?> query=session.createQuery("delete from Visit where round=:object");
			query.setParameter("object", round);
			query.executeUpdate();
			return true;
		}catch(Exception e) {
			return false;
		}
		
	}

	@Override
	public Visit findById(int id) {
		
		try {
			Session session=entityManager.unwrap(Session.class);
			return session.get(Visit.class, id);
		}catch(NoResultException e) {
			return new Visit();
		}
	}

	@Override
	public List<Visit> findAll() {
		
		try {
			Session session=entityManager.unwrap(Session.class);
			Query<Visit> query=session.createQuery("from Visit",Visit.class);
	 		return query.getResultList();
		}catch(NoResultException e) {
			return new ArrayList<>();
		}
	}

	@Override
	public List<Visit> findByRound(Round round) {
		
		Session session=entityManager.unwrap(Session.class);
		Query<Visit> query=session.createQuery("from Visit where round=:round1",Visit.class);
		query.setParameter("round1", round);
		
		try {
			return query.getResultList();
		}catch(NoResultException e) {
			return new ArrayList<>();
		}
	}

}
