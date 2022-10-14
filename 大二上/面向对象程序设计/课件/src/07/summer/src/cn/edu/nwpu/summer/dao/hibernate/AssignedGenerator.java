package cn.edu.nwpu.summer.dao.hibernate;

import java.io.Serializable;
import java.util.UUID;

import org.hibernate.HibernateException;
import org.hibernate.engine.SessionImplementor;
import org.hibernate.id.IdentifierGenerator;

/**
 * 主键生成策略
 * 
 * @author wben
 * 
 */
public class AssignedGenerator implements IdentifierGenerator {

	@Override
	public Serializable generate(SessionImplementor arg0, Object arg1)
			throws HibernateException {

		UUID uuid = UUID.randomUUID();
		return Math.abs(uuid.getLeastSignificantBits())
				+ Math.round(Math.random() * 100000);
	}

}
