package com.hospital.dao;

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
	public List<Employee> findAll() {
		Session session=entityManager.unwrap(Session.class);
		Query<Employee> query=session.createQuery("from Employee",Employee.class);
 		return query.getResultList();
	}
	
	@Override
	public List<?> findAllObject() {
		Session session=entityManager.unwrap(Session.class);
		Query<?> query=session.createQuery("SELECT e.empId,e.firstName FROM User u JOIN Employee e ON e.empId=u.employee "
												+ "WHERE NOT roles='1'");
 		return query.getResultList();
	}

	@Override
	public Employee findById(int id) {
		Employee employee;
		
		try {
			Session session=entityManager.unwrap(Session.class);
			employee=session.get(Employee.class, id);
		}catch(NoResultException e) {
			employee=new Employee();
		}
		
		return employee;
	}

	@Override
	public String save(Employee employee) {
		Session session=entityManager.unwrap(Session.class);
		session.saveOrUpdate(employee);
		return "Saved successfully";
	}

	@Override
	public String delete(int id) {
		String result;
		
		try {
			Session session=entityManager.unwrap(Session.class);
			Query<?> query=session.createQuery("delete from Employee where empId=:id");
			query.setParameter("id", id);
			int i=query.executeUpdate();
			result=i+"Deleted Successfully";
		}catch(Exception e) {
			result="Failed to delete";
		}
		
		return result ;
	}

	@Override
	public Map<String, Object> dashboard() {
		Session session=entityManager.unwrap(Session.class);
		Query<?> query=session.createQuery("SELECT count(empId) FROM Employee");
		Object empCount=query.getSingleResult();
		
		query=session.createQuery("SELECT count(roundId) FROM Round");
		Object roundCount=query.getSingleResult();
		
		query=session.createQuery("SELECT count(visitId) FROM Visit");
		Object visitCount=query.getSingleResult();
		
		query=session.createQuery("SELECT count(distinct cilent) FROM Visit");
		Object clientCount=query.getSingleResult();
		
		System.out.println(empCount.toString()+""+roundCount.toString()+""+visitCount.toString()+""+clientCount);
		Map<String, Object> countMap=new HashMap<>();
		
		countMap.put("empCount", empCount);
		countMap.put("roundCount", roundCount);
		countMap.put("visitCount", visitCount);
		countMap.put("clientCount", clientCount);
		
		return countMap;
	}

}
