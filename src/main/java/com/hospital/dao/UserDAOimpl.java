package com.hospital.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hospital.entity.Employee;
import com.hospital.entity.User;
@Repository
public class UserDAOimpl implements UserDAO {
	
	@Autowired
	EntityManager entityManager;

	@Override
	public User findByUsernameAndPassword(String username,String password) {
		User result;
		
		Session session=entityManager.unwrap(Session.class);
		Query<User> query=session.createQuery("from User where username=:username1 AND password=:password1",User.class);
		query.setParameter("username1", username);
		query.setParameter("password1", password);
		
		try {
			result=query.getSingleResult();
		}catch(NoResultException e) {
			result=new User();
		}
		
		return result;
	}

	@Override
	public String save(User user) {
		Session session=entityManager.unwrap(Session.class);
		session.saveOrUpdate(user);
		return "Saved successfully";
	}

	@Override
	public String delete(int id) {
		String result;
		
		try {
			Session session=entityManager.unwrap(Session.class);
			Query<?> query=session.createQuery("delete from User where userId=:id");
			query.setParameter("id", id);
			int i=query.executeUpdate();
			result=i+"Deleted Successfully";
		}catch(Exception e) {
			result="Failed to delete";
		}
		return result;
	}

	@Override
	public User findByEmployee(Employee employee) {
		User result;
		
		Session session=entityManager.unwrap(Session.class);
		Query<User> query=session.createQuery("from User where employee=:employee1",User.class);
		query.setParameter("employee1", employee);
		
		try {
			result=query.getSingleResult();
		}catch(NoResultException e) {
			result=new User();
		}
		
		return result;
	}

	@Override
	public List<User> findAllUser() {
		Session session=entityManager.unwrap(Session.class);
		Query<User> query=session.createQuery("SELECT FROM User u JOIN Employee e ON e.empId=u.employee "
												+ "WHERE NOT roles='1'",User.class);
 		return query.getResultList();
	}
}
