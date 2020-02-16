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
//	@Temporal(TemporalType.TIMESTAMP)
	private LocalTime startTime;
//	@Temporal(TemporalType.TIMESTAMP)
	private LocalTime endTime;
	private String address;
	private double duration;
	private boolean status;
	private String FTAreason;
	private int cost;
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JsonBackReference
	private Round round;

	public int getVisitId() {
		return visitId;
	}

	public void setVisitId(int visitId) {
		this.visitId = visitId;
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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
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
		return FTAreason;
	}

	public void setFTAreason(String fTAreason) {
		FTAreason = fTAreason;
	}

	public int getCost() {
		return cost;
	}

	public void setCost(int cost) {
		this.cost = cost;
	}

	public Round getRound() {
		return round;
	}

	public void setRound(Round round) {
		this.round = round;
	}



	public Visit(int visitId, String client, LocalTime startTime, LocalTime endTime, String address, double duration,
			boolean status, String fTAreason, int cost, Round round) {
		super();
		this.visitId = visitId;
		this.client = client;
		this.startTime = startTime;
		this.endTime = endTime;
		this.address = address;
		this.duration = duration;
		this.status = status;
		FTAreason = fTAreason;
		this.cost = cost;
		this.round = round;
	}

	public Visit() {
	}

	@Override
	public String toString() {
		return "Visit [visitId=" + visitId + ", client=" + client + ", stratTime=" + startTime + ", endTime=" + endTime
				+ ", address=" + address + ", duration=" + duration + ", status=" + status + ", FTAreason=" + FTAreason
				+ ", cost=" + cost + ", round=" + round + "]";
	}

	public String getClient() {
		return client;
	}

	public void setClient(String client) {
		this.client = client;
	}
	

}
