/**
 * 
 */
package cn.edu.nwpu.summer.controller;

import java.beans.PropertyEditorSupport;

import cn.edu.nwpu.summer.dao.DepartmentDAO;
import cn.edu.nwpu.summer.entity.Department;

/**
 * @author wben 2014年10月30日-下午6:59:12
 *
 */
public class DepartmentEditor extends PropertyEditorSupport {

	private final DepartmentDAO departmentDao;

	public DepartmentEditor(DepartmentDAO departmentDao) {
		this.departmentDao = departmentDao;
	}

	@Override
	public void setAsText(String text) throws IllegalArgumentException {
		setValue(departmentDao.findById(Long.parseLong(text)));
	}

	@Override
	public String getAsText() {
		Department s = (Department) getValue();
		if (s == null) {
			return null;
		} else {
			return String.valueOf(s.getId());
		}
	}
}
