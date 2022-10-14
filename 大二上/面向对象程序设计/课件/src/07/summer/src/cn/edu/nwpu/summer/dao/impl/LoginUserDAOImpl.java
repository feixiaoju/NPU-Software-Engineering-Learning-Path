/**
 * 
 */
package cn.edu.nwpu.summer.dao.impl;

import org.springframework.stereotype.Repository;

import cn.edu.nwpu.summer.dao.LoginUserDAO;
import cn.edu.nwpu.summer.entity.LoginUser;

/**
 * @author wben 2014年10月28日-下午12:01:56
 *
 */
@Repository
public class LoginUserDAOImpl extends AbstractDAOImpl<LoginUser, Long>
		implements LoginUserDAO {

	/*
	 * (non-Javadoc)
	 * 
	 * @see cn.edu.nwpu.summer.dao.impl.AbstractDAOImpl#getEntityClass()
	 */
	@Override
	protected Class<LoginUser> getEntityClass() {
		// TODO Auto-generated method stub
		return LoginUser.class;
	}

}
