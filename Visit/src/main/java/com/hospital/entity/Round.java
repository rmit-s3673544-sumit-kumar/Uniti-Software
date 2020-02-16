package com.hospital.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Round {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int roundId;
	@Temporal(TemporalType.DATE)
	private Date date;
	@Temporal(TemporalType.DATE)
	@UpdateTimestamp
	private Date updatedDate;
	private String adminName;
	@ManyToOne
	private Employee employee;
	@OneToMany(mappedBy = "round", cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<Visit> visit;

	public int getRoundId() {
		return roundId;
	}

	public void setRoundId(int roundId) {
		this.roundId = roundId;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public String getAdminName() {
		return adminName;
	}

	public void setAdminName(String adminName) {
		this.adminName = adminName;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public List<Visit> getVisit() {
		return visit;
	}

	public void setVisit(List<Visit> visit) {
		this.visit = visit;
	}

	public Round() {
	}

	public Round(int id) {
		this.roundId = id;
	}

	public Round(int roundId, Date date, Employee employee, List<Visit> visit) {
		this.roundId = roundId;
		this.date = date;
		this.employee = employee;
		this.visit = visit;
	}

	@Override
	public String toString() {
		return "Round [roundId=" + roundId + ", date=" + date + ", employee=" + employee + ", visit=" + visit + "]";
	}

}
