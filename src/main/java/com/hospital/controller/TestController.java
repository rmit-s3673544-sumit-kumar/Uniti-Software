package com.hospital.controller;

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
import com.hospital.entity.User;
import com.hospital.service.EmployeeService;
import com.hospital.service.UserService;
import com.hospital.service.VisitService;

@RestController
public class TestController {
	@Autowired
	EmployeeService employeeService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	VisitService visitService;
	
	
	@GetMapping("/test")
	public List<User> getEmployeeList(){
		
		return userService.findAllUser();
		
	}
	
		

}
