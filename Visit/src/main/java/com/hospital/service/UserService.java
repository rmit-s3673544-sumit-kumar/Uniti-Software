
package com.hospital.service;

import com.hospital.entity.Employee;
import com.hospital.entity.UserDeatil;

public interface UserService {
	
	public UserDeatil findByEmployee(Employee employee);
	
	public UserDeatil findByUsernameAndPassword(String username, String password);
	
	public boolean save(UserDeatil user);
	
	public boolean delete(Employee emp);

	public boolean activeFlag(Employee emp);

	public UserDeatil findByUsername(String username);
}
