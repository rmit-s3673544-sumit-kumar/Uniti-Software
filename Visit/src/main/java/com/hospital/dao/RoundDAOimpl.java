package com.hospital.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hospital.entity.Employee;
import com.hospital.entity.Round;

@Repository
public class RoundDAOimpl implements RoundDAO {

	@Autowired
	EntityManager entityManager;

	@Override
	public boolean save(Round round) {
		try {
			Session session = entityManager.unwrap(Session.class);
			session.saveOrUpdate(round);
			return true;
		}catch(Exception e) {
			return false;
		}
	}

	@Override
	public boolean delete(int id) {
		try {
			Session session = entityManager.unwrap(Session.class);
			Query<?> query = session.createQuery("DELETE from Round where roundId=:roundId1");
			query.setParameter("roundId1",id);
			query.executeUpdate();
			return true;
		}catch(Exception e) {
			return false;
		}

	}

	
	@Override
	public Round findById(int id) {

		try {
			Session session = entityManager.unwrap(Session.class);
			return session.get(Round.class, id);
		} catch (NoResultException e) {
			return new Round();
		}

	}

	
	@Override
	public List<Round> findAll() {
		try {
			Session session = entityManager.unwrap(Session.class);
			Query<Round> query = session.createQuery("from Round  ORDER BY date DESC ", Round.class);
			return query.getResultList();
		}catch(NoResultException e) {
			return new ArrayList<Round>();
		}
	}

	
	
	@Override
	public List<Round> findRoundsByDate(Date date) {

		try {
			Session session = entityManager.unwrap(Session.class);
			Query<Round> query = session.createQuery("from Round where date=:date1 ORDER BY date DESC ", Round.class);
			query.setParameter("date1", date);
			return query.getResultList();
		} catch (NoResultException e) {
			return  new ArrayList<>();
		}
	}

	@Override
	public List<Round> findRoundsByEmpId(Employee employee) {

		try {
			Session session = entityManager.unwrap(Session.class);
			Query<Round> query = session.createQuery("from Round where employee=:object", Round.class);
			query.setParameter("object", employee);
			return query.getResultList();
		} catch (NoResultException e) {
			return new ArrayList<>();
		}

	}
	
	@Override
	public Round findRoundByEmployeeAndDate(Employee employee, Date date) {

		try {
			Session session = entityManager.unwrap(Session.class);
			Query<Round> query = session.createQuery("from Round where employee=:empId1 AND date=:date1", Round.class);
			query.setParameter("empId1", employee);
			query.setParameter("date1", date);
			return query.getSingleResult();
		} catch (NoResultException e) {
			return new Round();
		}

	}

}
