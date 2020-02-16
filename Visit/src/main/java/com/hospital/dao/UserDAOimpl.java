package com.hospital.dao;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hospital.entity.Employee;
import com.hospital.entity.UserDeatil;

@Repository
public class UserDAOimpl implements UserDAO {
	
	@Autowired
	EntityManager entityManager;
	
	@Override
	public boolean save(UserDeatil user) {
		try {
			Session session=entityManager.unwrap(Session.class);
			session.saveOrUpdate(user);
			return true;
		}catch(Exception e) {
			return false;
		}
	}
	
	@Override
	public UserDeatil findByUsername(String username) {
		UserDeatil user;
		
		Session session = entityManager.unwrap(Session.class);
		Query<UserDeatil> query = session.createQuery("from UserDeatil where username=:uname", UserDeatil.class);
		query.setParameter("uname", username);
		
		try {
			user=query.getSingleResult();
		}catch(NoResultException e) {
			user=new UserDeatil();
		}
		
		return user;
	}

	@Override
	public boolean delete(Employee emp) {
		
		try {
			Session session=entityManager.unwrap(Session.class);
			Query<?> query=session.createQuery("delete from UserDeatil where employee=:emp");
			query.setParameter("emp", emp);
			query.executeUpdate();
			return true;
		}catch(Exception e) {
			return false;
		}
	}

	@Override
	public UserDeatil findByUsernameAndPassword(String username,String password) {
		UserDeatil result;
		
		Session session=entityManager.unwrap(Session.class);
		Query<UserDeatil> query=session.createQuery("from UserDeatil where username=:username1 AND password=:password1 AND userActive!=0 ",UserDeatil.class);
		query.setParameter("username1", username);
		query.setParameter("password1", password);
		
		try {
			result=query.getSingleResult();
		}catch(NoResultException e) {
			result=new UserDeatil();
		}
		
		return result;
	}



	@Override
	public UserDeatil findByEmployee(Employee employee) {
		UserDeatil result;
		
		Session session=entityManager.unwrap(Session.class);
		Query<UserDeatil> query=session.createQuery("from UserDeatil where employee=:employee1",UserDeatil.class);
		query.setParameter("employee1", employee);
		
		try {
			result=query.getSingleResult();
		}catch(NoResultException e) {
			result=new UserDeatil();
		}
		
		return result;
	}

	@Override
	public boolean activeFlag(Employee emp) {
		try {
			Session session = entityManager.unwrap(Session.class);
			Query<?> query = session.createQuery("UPDATE UserDeatil set userActive = :flag "  + 
		             							"WHERE employee = :emp");
			query.setParameter("flag", false);
			query.setParameter("emp", emp);
			query.executeUpdate();
			return true;
		}catch(NoResultException e) {
			return false;
		}
	}

	
}
