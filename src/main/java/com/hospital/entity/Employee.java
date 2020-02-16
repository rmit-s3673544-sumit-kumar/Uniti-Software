package com.hospital.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Employee {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="emp_id")
	private int empId;
	
	private String firstName;
	
	private String lastName;

	private long number;
	
	private String gender;
	
	@Temporal(TemporalType.DATE)
	private Date dob;

	public int getEmpId() {
		return empId;
	}

	public void setEmpId(int empId) {
		this.empId = empId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public long getNumber() {
		return number;
	}

	public void setNumber(long number) {
		this.number = number;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public Employee(int empId, String firstName, String lastName, long number, String gender, Date dob) {
		this.empId = empId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.number = number;
		this.gender = gender;
		this.dob = dob;
	}

	public Employee() {
	}

	public Employee(int empId) {
		this.empId = empId;
	}
	
	

	

}
