/**
 * 
 */
package cn.edu.nwpu.summer.form;

import cn.edu.nwpu.summer.entity.Department;
import cn.edu.nwpu.summer.entity.LoginUser;

/**
 * @author wben 2014年10月28日-上午11:38:03
 *
 */
public class RegistryForm {

	private LoginUser loginUser;

	private Department department;

	private String rePassword;

	/**
	 * @return the rePassword
	 */
	public String getRePassword() {
		return rePassword;
	}

	/**
	 * @param rePassword
	 *            the rePassword to set
	 */
	public void setRePassword(String rePassword) {
		this.rePassword = rePassword;
	}

	/**
	 * @return the loginUser
	 */
	public LoginUser getLoginUser() {
		return loginUser;
	}

	/**
	 * @param loginUser
	 *            the loginUser to set
	 */
	public void setLoginUser(LoginUser loginUser) {
		this.loginUser = loginUser;
	}

	/**
	 * @return the department
	 */
	public Department getDepartment() {
		return department;
	}

	/**
	 * @param department
	 *            the department to set
	 */
	public void setDepartment(Department department) {
		this.department = department;
	}

}
