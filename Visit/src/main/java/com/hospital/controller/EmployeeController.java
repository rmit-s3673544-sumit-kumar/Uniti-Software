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
import com.hospital.entity.UserDeatil;
import com.hospital.service.EmployeeService;
import com.hospital.service.UserService;
import com.hospital.service.VisitService;

@RestController
@CrossOrigin("*")
public class EmployeeController {
	@Autowired
	EmployeeService employeeService;

	@Autowired
	UserService userService;

	@Autowired
	VisitService visitService;

	@PostMapping("/addEmployee")
	public void addEmployee(@RequestBody Employee employee) {

		employee.setEmpId(0);
		employeeService.save(employee);

		userService.save(new UserDeatil(0, employee.getEmail(), employee));

	}

	@PostMapping("/emailCheckExist")
	public Employee emailCheckExist(@RequestBody Employee emp) {
		return employeeService.findByEmail(emp.getEmail());
	}
	
	@PutMapping("/updateEmployee")
	public void updateEmployee(@RequestBody Employee employee) {

		employeeService.save(employee);

	}

	@DeleteMapping("/deleteEmployeeById/{id}")
	public void deleteEmployeeById(@PathVariable("id") int id) {

		userService.delete(new Employee(id));
		employeeService.delete(id);

	}
	
	@DeleteMapping("/disableById/{id}")
	public void disableById(@PathVariable("id") int id) {

		userService.activeFlag(new Employee(id));
		employeeService.activeFlag(id);

	}

	@GetMapping("/getEmployeeById/{id}")
	public Employee getEmployeeById(@PathVariable("id") int id) {

		return employeeService.findById(id);

	}

	@GetMapping("/getEmployeeList")
	public List<Employee> getEmployeeList() {

		return employeeService.findAll();

	}

	// Login Screen
	@PostMapping("/getUser")
	public UserDeatil getUser(@RequestBody UserDeatil user) {

		return userService.findByUsernameAndPassword(user.getUsername(), user.getPassword());

	}
	
	@PostMapping("/userCheckExist")
	public UserDeatil userCheckExist(@RequestBody UserDeatil user) {
		return userService.findByUsername(user.getUsername());
	}

	@PutMapping("/updateUser")
	public void updateUser(@RequestBody UserDeatil user) {
		userService.save(user);

	}

	// For individual Employee Login
	@PostMapping("/getUserByEmployee")
	public UserDeatil getUserByEmployee(@RequestBody Employee employee) {

		return userService.findByEmployee(employee);

	}

	@GetMapping("/dashboard")
	public Map<String, Object> dashboard() {

		employeeService.dashboard();
		return employeeService.dashboard();

	}
	
	

}
