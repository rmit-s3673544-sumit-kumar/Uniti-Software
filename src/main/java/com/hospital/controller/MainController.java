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
@CrossOrigin(origins= "http://localhost:4200")
public class MainController {
	@Autowired
	EmployeeService employeeService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	VisitService visitService;
	
	
	@GetMapping("/getEmployeeList")
	public List<Employee> getEmployeeList(){
		
		return employeeService.findAll();
		
	}
	
	@GetMapping("/getEmployeeById/{id}")
	public Employee getEmployeeById(@PathVariable("id") int id) {
		
		return employeeService.findById(id);
		
	}
	
	@PostMapping("/addEmployee")
	public void addEmployee(@RequestBody Employee employee) {
		
		employee.setEmpId(0);
		employeeService.save(employee);
		
		userService.save(new User(0,employee));
		
	}
	
	@PutMapping("/updateEmployee")
	public void updateEmployee(@RequestBody Employee employee) {
		
		employeeService.save(employee);
		
	}
	
	
	@DeleteMapping("/deleteEmployeeById/{id}")
	public void deleteEmployeeById(@PathVariable("id") int id) {
		
		userService.delete(id);
		employeeService.delete(id);
		
	}
	
	
	@PostMapping("/getUser")
	public User getUser(@RequestBody User user) {
		
		return userService.findByUsernameAndPassword(user.getUsername(), user.getPassword());
		
	}
	
	
	@PostMapping("/getUserByEmployee")
	public User getUserByEmployee(@RequestBody Employee employee) {
		
		return userService.findByEmployee(employee);
		
	}
	
	
	@PostMapping("/updateUser")
	public String addUser(@RequestBody User user) {
		
		user.setUserId(0);
		return userService.save(user);
		
	}
	
	
	@PutMapping("/updateUser")
	public String updateUser(@RequestBody User user) {
		
		return userService.save(user);
		
	}
	
	
	@GetMapping("/dashboard")
	public Map<String,Object> dashboard(){
		
		employeeService.dashboard();
		return employeeService.dashboard();
		
	}
	

}
