package com.hospital.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class UserDeatil {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int userId;
	
	@Column(unique= true)
	private String username;
	private String password="pass";
	private boolean userActive=true;
	@OneToOne
	private Employee employee;
	
	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isUserActive() {
		return userActive;
	}

	public void setUserActive(boolean userActive) {
		this.userActive = userActive;
	}

	public UserDeatil() {
	}

	public UserDeatil(int id,String username,Employee employee) {
		this.userId=id;
		this.employee=employee;
		this.username=username;
	}

	public UserDeatil(int userId, String username, String password, Employee employee) {
		this.userId = userId;
		this.username = username;
		this.password = password;
		this.employee = employee;
	}
	

}
