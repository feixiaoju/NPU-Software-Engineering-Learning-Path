/**
 * 
 */
package cn.edu.nwpu.summer.service;

import java.util.List;

import cn.edu.nwpu.summer.entity.Department;
import cn.edu.nwpu.summer.entity.LoginUser;

/**
 * @author wben 2014年10月28日-下午12:04:29
 * 
 *         系统中与用户管理相关的业务
 *
 */

public interface UserService {

	/**
	 * 校验用户名和密码
	 * 
	 * @param loginName
	 *            用户登录名
	 * @param password
	 *            用户密码
	 * @return 用户密码正确则返回该用户实例，否则返回null
	 */
	LoginUser validateUser(String loginName, String password);

	/**
	 * 校验是否已存在某用户名
	 * 
	 * @param loginName
	 *            待校验用户名
	 * @return
	 */
	boolean duplicateLoginName(String loginName);

	/**
	 * 创建用户
	 * 
	 * @param user
	 * @return
	 */
	long saveLoginUser(LoginUser user);

	/**
	 * 返回所有部门列表
	 * 
	 * @return
	 */
	List<Department> findAllDepartment();

}
