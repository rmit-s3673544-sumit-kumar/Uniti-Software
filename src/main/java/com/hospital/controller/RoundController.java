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
import com.hospital.service.EmployeeService;
import com.hospital.service.RoundService;
import com.hospital.service.VisitService;

@RestController
@CrossOrigin(origins= "http://localhost:4200")
public class RoundController {
	@Autowired
	RoundService roundService;

	@Autowired
	EmployeeService employeeService;
	
	@Autowired
	VisitService visitService;
	

	@GetMapping("/getRoundById/{id}")
	public Round getRound(@PathVariable("id") int id) {
		
		return roundService.findById(id);
		
	}
	

	@GetMapping("/getRoundList")
	public List<Round> getRounds() {
		
		return roundService.findAll();
		
	}

	
	@PostMapping("/addRound")
	public void addRound(@RequestBody Round round) {
		
		round.setRoundId(0);
		for (Visit temp : round.getVisit())
			temp.setVisitId(0);

		roundService.save(round);
		
	}

	@PutMapping("/updateRound")
	public void updateRound(@RequestBody Round round) {
		
//		List<Visit> visitList=visitService.findByRound(round);
//		for (Visit visit : round.getVisit()) {
//			if(!visitList.contains(visit)) {
//				visit.setVisitId(0);
//				System.out.println("*************"+visit);
//			}
//		}
		
		visitService.delete(round);
		for (Visit temp : round.getVisit())
				temp.setVisitId(0);
		 
		 roundService.save(round);
		
	}

	
	@DeleteMapping("/deleteRound/{id}")
	public void deleteRound(@PathVariable("id") int id) {
		
		visitService.delete(roundService.findById(id));
		roundService.delete(id);
		
	}

	
	@PostMapping("/getEmployeeListByDate")
	public Map<String,List<Employee>> getListByDate(@RequestBody Date date) {
		
		Map<String,List<Employee>> EmployeeMap=new HashMap<>(); 
		
		List<Employee> allEmployee = employeeService.findAll();
			
		List<Employee> selectedEmployee = new ArrayList<>();
		for (Round round : roundService.findRoundsByDate(date)) 
			selectedEmployee.add(round.getEmployee());
	
		EmployeeMap.put("allEmployee", allEmployee);
		EmployeeMap.put("busyEmployee", selectedEmployee);

		return EmployeeMap;
		
	}

	
	@PostMapping("/findRoundByEmployeeAndDate")
	public Round findRoundByEmployeeAndDate(@RequestBody Round round) {
		
		return roundService.findRoundByEmployeeAndDate(round.getEmployee(), round.getDate());
		
	}
	
	@PostMapping("/getRoundsByDate")
	public List<Round> getRoundsByDate(@RequestBody Date date) {
		
		return roundService.findRoundsByDate(date);
		
	}
	
	@GetMapping("/getRoundsByEmpId/{id}")
	public List<Round> getRoundsByEmpId(@PathVariable("id") int id){
		
		return roundService.findRoundsByEmpId(new Employee(id));
		
	}
} 
