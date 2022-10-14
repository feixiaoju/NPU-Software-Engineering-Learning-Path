/**
 * 
 */
package cn.edu.nwpu.summer.dao.impl;

import org.springframework.stereotype.Repository;

import cn.edu.nwpu.summer.dao.DepartmentDAO;
import cn.edu.nwpu.summer.entity.Department;

/**
 * @author wben 2014年10月30日-下午1:24:47
 *
 */
@Repository
public class DepartmentDAOImpl extends AbstractDAOImpl<Department, Long>
		implements DepartmentDAO {

	/*
	 * (non-Javadoc)
	 * 
	 * @see cn.edu.nwpu.summer.dao.impl.AbstractDAOImpl#getEntityClass()
	 */
	@Override
	protected Class<Department> getEntityClass() {
		// TODO Auto-generated method stub
		return Department.class;
	}

}
