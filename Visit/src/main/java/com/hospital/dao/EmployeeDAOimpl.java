package com.hospital.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hospital.entity.Employee;

@Repository
public class EmployeeDAOimpl implements EmployeeDAO {

	@Autowired
	EntityManager entityManager;

	@Override
	public boolean save(Employee employee) {
		try {
			Session session = entityManager.unwrap(Session.class);
			session.saveOrUpdate(employee);
			return true;
		}catch(Exception e) {
			return false;
		}
	}

	@Override
	public boolean delete(int id) {

		try {
			Session session = entityManager.unwrap(Session.class);
			Query<?> query = session.createQuery("delete from Employee where empId=:id");
			query.setParameter("id", id);
			query.executeUpdate();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

	}

	@Override
	public Employee findById(int id) {

		try {
			Session session = entityManager.unwrap(Session.class);
			return session.get(Employee.class, id);
		} catch (NoResultException e) {
			return  new Employee();
		}

	}

	@Override
	public List<Employee> findAll() {
		
		try {
			Session session = entityManager.unwrap(Session.class);
			Query<Employee> query = session.createQuery("from Employee where employeeActive='1'", Employee.class);
			return query.getResultList();
		} catch (NoResultException e) {
			return  new ArrayList<Employee>();
		}
		
	}
	
	@Override
	public boolean activeFlag(int id) {
		try {
			Session session = entityManager.unwrap(Session.class);
			Query<?> query = session.createQuery("UPDATE Employee set employeeActive = :flag "  + 
		             							"WHERE empId = :employee_id");
			query.setParameter("flag", false);
			query.setParameter("employee_id", id);
			query.executeUpdate();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

	}

	@Override
	public Employee findByEmail(String email) {
		
		Session session = entityManager.unwrap(Session.class);
		Query<Employee> query = session.createQuery("from Employee where email=:email1", Employee.class);
		query.setParameter("email1", email);
		
		try {
			return query.getSingleResult();
		}catch(NoResultException e) {
			return new Employee();
		}
		
	}

	@Override
	public List<Employee> findEmployeeListOnly() {
		
		try {
		Session session = entityManager.unwrap(Session.class);
		Query<Employee> query = session.createQuery("FROM Employee " + "WHERE roles!='1' AND employeeActive!='0'", Employee.class);
		return query.getResultList();
		} catch (NoResultException e) {
			return  new ArrayList<Employee>();
		}
		
	}

	@Override
	public Map<String, Object> dashboard() {
		Session session = entityManager.unwrap(Session.class);
		Query<?> query = session.createQuery("SELECT count(empId) FROM Employee where employeeActive='1' ");
		Object empCount = query.getSingleResult();

		query = session.createQuery("SELECT count(roundId) FROM Round");
		Object roundCount = query.getSingleResult();

		query = session.createQuery("SELECT count(visitId) FROM Visit");
		Object visitCount = query.getSingleResult();

		query = session.createQuery("SELECT count(distinct clientId) FROM Client where active='1' ");
		Object clientCount = query.getSingleResult();

		System.out.println(
				empCount.toString() + "" + roundCount.toString() + "" + visitCount.toString() + "" + clientCount);
		Map<String, Object> countMap = new HashMap<>();

		countMap.put("empCount", empCount);
		countMap.put("roundCount", roundCount);
		countMap.put("visitCount", visitCount);
		countMap.put("clientCount", clientCount);

		return countMap;
	}

	

}
