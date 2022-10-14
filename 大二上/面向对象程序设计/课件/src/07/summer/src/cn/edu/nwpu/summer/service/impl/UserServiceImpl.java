/**
 * 
 */
package cn.edu.nwpu.summer.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.edu.nwpu.summer.dao.DepartmentDAO;
import cn.edu.nwpu.summer.dao.LoginUserDAO;
import cn.edu.nwpu.summer.entity.Department;
import cn.edu.nwpu.summer.entity.LoginUser;
import cn.edu.nwpu.summer.service.UserService;

/**
 * @author wben 2014年10月28日-下午12:04:45
 *
 */

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	LoginUserDAO loginUserDAO;

	@Autowired
	DepartmentDAO departmentDAO;

	@Override
	@Transactional(readOnly = true)
	public LoginUser validateUser(String loginName, String password) {
		List<LoginUser> list = loginUserDAO.findByProperty("loginName",
				loginName);
		if (list != null && list.size() > 0) {
			LoginUser user = list.get(0);
			if (user.getPassword().equals(password)) {
				return user;
			}
		}
		return null;
	}

	@Override
	@Transactional(readOnly = true)
	public boolean duplicateLoginName(String loginName) {
		List<LoginUser> list = loginUserDAO.findByProperty("loginName",
				loginName);
		if (list != null && list.size() > 0) {
			return true;
		}
		return false;
	}

	@Override
	@Transactional(readOnly = false)
	public long saveLoginUser(LoginUser user) {
		return loginUserDAO.save(user);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Department> findAllDepartment() {
		return departmentDAO.findAll();
	}
}
