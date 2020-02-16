package com.hospital.dao;

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
	public List<Visit> findAll() {
		Session session=entityManager.unwrap(Session.class);
		Query<Visit> query=session.createQuery("from Visit",Visit.class);
 		return query.getResultList();
	}

	@Override
	public Visit findById(int id) {
		Session session=entityManager.unwrap(Session.class);
		return session.get(Visit.class, id);
	}

	@Override
	public String save(Visit visit) {
		Session session=entityManager.unwrap(Session.class);
		session.saveOrUpdate(visit);
		return "Saved Successfully";
	}

	@Override
	public String delete(Round round) {
		String result;
		
		try {
			Session session=entityManager.unwrap(Session.class);
			Query<?> query=session.createQuery("delete from Visit where round=:id");
			query.setParameter("id", round);
			int i=query.executeUpdate();
			result=i+"Deleted Successfully";
		}catch(Exception e) {
			result="Failed to delete";
		}
		
		return result;
	}

	@Override
	public List<Visit> findByRound(Round round) {
		List<Visit> result;
		
		Session session=entityManager.unwrap(Session.class);
		Query<Visit> query=session.createQuery("from Visit where round=:round1",Visit.class);
		query.setParameter("round1", round);
		
		try {
			result=query.getResultList();
		}catch(NoResultException e) {
			result=null;
		}
		session.clear();
		return result;
	}

}
