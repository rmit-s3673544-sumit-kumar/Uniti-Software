package com.hospital.entity;

import java.time.LocalTime;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Visit {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int visitId;
	private String client;
	private LocalTime startTime;
	private LocalTime endTime;
	private double duration;
	private String address;
	private boolean status;
	private String ftareason;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JsonBackReference
	private Round round;

	public int getVisitId() {
		return visitId;
	}

	public void setVisitId(int visitId) {
		this.visitId = visitId;
	}

	public String getClient() {
		return client;
	}

	public void setClient(String client) {
		this.client = client;
	}

	
	public LocalTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalTime startTime) {
		this.startTime = startTime;
	}

	public LocalTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalTime endTime) {
		this.endTime = endTime;
	}


	public double getDuration() {
		return duration;
	}

	public void setDuration(double duration) {
		this.duration = duration;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public String getFTAreason() {
		return ftareason;
	}

	public void setFTAreason(String fTAreason) {
		ftareason = fTAreason;
	}

	public Round getRound() {
		return round;
	}

	public void setRound(Round round) {
		this.round = round;
	} 
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Visit() {
	}

	public Visit(int visitId, String client, LocalTime startTime, LocalTime endTime, double duration, String address,
			boolean status, String ftareason, Round round) {
		 
		this.visitId = visitId;
		this.client = client;
		this.startTime = startTime;
		this.endTime = endTime;
		this.duration = duration;
		this.address = address;
		this.status = status;
		this.ftareason = ftareason;
		this.round = round;
	}
 
}
