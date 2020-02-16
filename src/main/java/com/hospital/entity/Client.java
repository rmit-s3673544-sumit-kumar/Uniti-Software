package com.hospital.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Client {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="client_id")
	private int client_id;
	
	@Column(name="client_name")
	private String clientName;
	
	@Column(name="client_address")
	private String clientAddress;
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JsonBackReference
	private Visit visitList;

	public int getClient_id() {
		return client_id;
	}

	public void setClient_id(int client_id) {
		this.client_id = client_id;
	}

	public String getClientName() {
		return clientName;
	}

	public void setClientName(String clientName) {
		this.clientName = clientName;
	}

	public String getClientAddress() {
		return clientAddress;
	}

	public void setClientAddress(String clientAddress) {
		this.clientAddress = clientAddress;
	}

	public Visit getVisitList() {
		return visitList;
	}

	public void setVisitList(Visit visitList) {
		this.visitList = visitList;
	}

	public Client(int client_id, String clientName, String clientAddress, Visit visitList) {
		
		this.client_id = client_id;
		this.clientName = clientName;
		this.clientAddress = clientAddress;
		this.visitList = visitList;
	}

	public Client() {
		
	}
	

}
