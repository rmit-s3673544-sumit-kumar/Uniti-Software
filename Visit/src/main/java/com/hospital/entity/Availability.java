package com.hospital.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Availability {
	
	@Id
	private int id;
	
	private String day;

	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDay() {
		return day;
	}

	public void setDay(String day) {
		this.day = day;
	}
	
	public Availability() { 
		 
	}
	

	public Availability(int id, String day) {
		 
		this.id = id;
		this.day = day;
	}
	
	

}
