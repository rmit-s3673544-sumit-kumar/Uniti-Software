package com.hospital.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.entity.Employee;
import com.hospital.entity.Round;
import com.hospital.entity.Visit;
import com.hospital.service.EmailService;
import com.hospital.service.EmployeeService;
import com.hospital.service.RoundService;
import com.hospital.service.VisitService;

@RestController
@CrossOrigin("*")
public class RoundController {
	@Autowired
	RoundService roundService;

	@Autowired
	EmployeeService employeeService;

	@Autowired
	VisitService visitService;

	@Autowired
	EmailService emailService;

	@PostMapping("/addRound")
	public void addRound(@RequestBody Round round) {

		round.setRoundId(0);
		for (Visit temp : round.getVisit())
			temp.setVisitId(0);

		roundService.save(round);
		
		Employee emp=employeeService.findById(round.getEmployee().getEmpId());
		round.setEmployee(emp);
		emailService.sendMail(round,"New Round has been created ");
	
	}
	

	@PutMapping("/updateRound")
	public void updateRound(@RequestBody Round round) {

		visitService.delete(round);
		
		for (Visit temp : round.getVisit())
			temp.setVisitId(0);

		roundService.save(round);
		
		Employee emp=employeeService.findById(round.getEmployee().getEmpId());
		round.setEmployee(emp);
		emailService.sendMail(round,"Your Round has been updated ");

	}

	@DeleteMapping("/deleteRound/{id}")
	public void deleteRound(@PathVariable("id") int id) {

		visitService.delete(new Round(id));
		roundService.delete(id);

	}

	@GetMapping("/getRoundById/{id}")
	public Round getRoundById(@PathVariable("id") int id) {

		return roundService.findById(id);

	}

	@GetMapping("/getRoundList")
	public List<Round> getRoundList() {

		return roundService.findAll();

	}

	// Sending EmployeeList and List of Busy Employee by Date
	@PostMapping("/getEmployeeListByDate")
	public Map<String, List<Employee>> getListByDate(@RequestBody Date date) {

		List<Employee> selectedEmployee = new ArrayList<>();
		for (Round round : roundService.findRoundsByDate(date))
			selectedEmployee.add(round.getEmployee());

		Map<String, List<Employee>> EmployeeMap = new HashMap<>();
		EmployeeMap.put("allEmployee", employeeService.findEmployeeListOnly());
		EmployeeMap.put("busyEmployee", selectedEmployee);

		return EmployeeMap;

	}

	// Sending RoundList for Selected Date
	@PostMapping("/getRoundsByDate")
	public List<Round> getRoundsByDate(@RequestBody Date date) {

		return roundService.findRoundsByDate(date);

	}

	// Employee Screen: Sending RoundList for individual Employee
	@GetMapping("/getRoundsByEmpId/{id}")
	public List<Round> getRoundsByEmpId(@PathVariable("id") int id) {

		return roundService.findRoundsByEmpId(new Employee(id));

	}

	// Employee Screen: Sending Round for selected Date and Employee
	@PostMapping("/findRoundByEmployeeAndDate")
	public Round findRoundByEmployeeAndDate(@RequestBody Round round) {

		return roundService.findRoundByEmployeeAndDate(round.getEmployee(), round.getDate());

	}

}
