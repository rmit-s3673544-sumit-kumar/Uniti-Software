package com.hospital.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hospital.entity.Client;

@Repository
public class ClientDAOimpl implements ClientDAO {

	@Autowired
	EntityManager entityManager;

	@Override
	public boolean save(Client client) {
		try {
			Session session = entityManager.unwrap(Session.class);
			session.saveOrUpdate(client);
			return true;
		}catch(Exception e){
			return false;
		}
	}

	@Override
	public boolean delete(int id) {
		try {
			Session session = entityManager.unwrap(Session.class);
			Query<?> query = session.createQuery("delete from Client where clientId=:id");
			query.setParameter("id", id);
			query.executeUpdate();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

	}

	@Override
	public Client findById(int id) {
		try {
			Session session = entityManager.unwrap(Session.class);
			return session.get(Client.class, id);
		}catch(NoResultException e){
			return new Client();
		}
	}

	@Override
	public List<Client> findAll() {
		try {
			Session session = entityManager.unwrap(Session.class);
			Query<Client> query = session.createQuery("from Client where active = '1'", Client.class);
			return query.getResultList();
		}catch(NoResultException e){
			return new ArrayList<Client>();
		}
	}

	@Override
	public boolean disableClient(int id) {
		 try {
			 Session theSession =entityManager.unwrap(Session.class);
			 Query<?> query = theSession.createQuery("UPDATE Client set active = :flag where clientId=:id");
			 query.setParameter("flag", false);
				query.setParameter("id", id);
				query.executeUpdate();
			 return true;
		 }catch(Exception e) {
			 e.printStackTrace();
			return false;
		 }
	}

}
