package com.hospital.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int userId;
	@Column(unique= true)
	private String username;
	private String password;
	
	@OneToOne
	private Employee employee;
	
	@ManyToOne
	private Role roles;
	
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

	public Role getRoles() {
		return roles;
	}

	public void setRoles(Role roles) {
		this.roles = roles;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", username=" + username + ", password=" + password + ", employee=" + employee
				+ ", roles=" + roles + "]";
	}

	public User(int userId, String username, String password, Employee employee, Role roles) {
		this.userId = userId;
		this.username = username;
		this.password = password;
		this.employee = employee;
		this.roles = roles;
	}

	public User() {
	}

	public User(int id, Employee employee) {
		this.userId=id;
		this.employee=employee;
		
	}

	
	

}
