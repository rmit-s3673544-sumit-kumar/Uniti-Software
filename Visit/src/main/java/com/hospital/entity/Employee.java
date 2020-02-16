package com.hospital.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Employee {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int empId;
	private String firstName;
	private String lastName;
	private long number;
	private String gender;
	@Column(unique=true)
	private String email;
	private boolean employeeActive=true;
	@Temporal(TemporalType.DATE)
	private Date dob;
	@ManyToOne
	private Role roles;
	private String qualification;
	@ManyToMany
	private List<Availability> availability;

	public Role getRoles() {
		return roles;
	}

	public void setRoles(Role roles) {
		this.roles = roles;
	}

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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean isEmployeeActive() {
		return employeeActive;
	}

	public void setEmployeeActive(boolean employeeActive) {
		this.employeeActive = employeeActive;
	} 
	
	public String getQualification() {
		return qualification;
	}

	public void setQualification(String qualification) {
		this.qualification = qualification;
	}

	public List<Availability> getAvailability() {
		return availability;
	}

	public void setAvailability(List<Availability> availability) {
		this.availability = availability;
	}

	// Constructors
	public Employee() {
	}

	public Employee(int empId) {
		this.empId = empId;
	}
	 
	public Employee(String email) {
		this.email = email;
	}

	public Employee(int empId, String firstName, String lastName, long number, String gender, String email,
			boolean employeeActive, Date dob, Role roles, String qualification, List<Availability> availability) {
		super();
		this.empId = empId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.number = number;
		this.gender = gender;
		this.email = email;
		this.employeeActive = employeeActive;
		this.dob = dob;
		this.roles = roles;
		this.qualification = qualification;
		this.availability = availability;
	}

 
	
 
}
