package cn.edu.nwpu.summer.dao.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.edu.nwpu.summer.dao.AbstractDAO;
import cn.edu.nwpu.summer.dao.hibernate.GenericsUtils;
import cn.edu.nwpu.summer.dao.hibernate.PaginationSupport;

@Service
@SuppressWarnings("unchecked")
public abstract class AbstractDAOImpl<T, ID extends Serializable> extends
		HibernateDaoSupport implements AbstractDAO<T, ID> {

	// sessionFactory 资源自动注入
	@Autowired
	public void setSF(final SessionFactory sessionFactory) {
		super.setSessionFactory(sessionFactory);
	}

	private Class<T> pojoClass;

	protected final Log logger = LogFactory.getLog(getClass());

	protected abstract Class<T> getEntityClass();

	/**
	 * 构造方法， 初始化DAO，获取POJO类型。
	 */
	public AbstractDAOImpl() {
		this.pojoClass = GenericsUtils.getSuperClassGenricType(getClass());
	}

	@Override
	public Class<T> getPojoClass() {
		return this.pojoClass;
	}

	@Override
	public String getPojoClassName() {
		return getPojoClass().getName();
	}

	// 加载对象
	@Override
	public List<T> findAll() {
		return getHibernateTemplate().loadAll(getPojoClass());
	}

	@Override
	public List find(String hql, Object... values) {
		return getHibernateTemplate().find(hql, values);
	}

	@Override
	public List<T> findByCriteria(final Criteria criteria) {
		List list = criteria.list();
		return transformResults(list);
	}

	@Override
	public List<T> findByCriteria(final DetachedCriteria detachedCriteria) {
		return (List<T>) getHibernateTemplate().execute(
				new HibernateCallback() {
					@Override
					public Object doInHibernate(Session session)
							throws HibernateException {
						Criteria criteria = detachedCriteria
								.getExecutableCriteria(session);
						List list = criteria.list();
						return transformResults(list);
					}
				});
	}

	@Override
	public List<T> findByExample(T instance) {
		List<T> results = getHibernateTemplate().findByExample(instance);
		return results;
	}
	
	@Override
	public T findById(ID id) {
		return (T) getHibernateTemplate().get(getPojoClassName(), id);
	}

	@Override
	public List<T> findByProperty(String propertyName, Object value) {
		String queryString = "from " + getPojoClassName()
				+ " as model where model." + propertyName + "= ?";
		return getHibernateTemplate().find(queryString, value);
	}

	/**
	 * 新建对象实例化
	 */
	@Override
	public ID save(T transientInstance) {

		logger.debug("新建一个 " + pojoClass.getName() + " 实例...");
		ID id;
		id = (ID) getHibernateTemplate().save(transientInstance);
		return id;
	}

	@Override
	public void saveOrUpdate(T transientInstance) {
		logger.debug("新建或保存一个 " + pojoClass.getName() + " 实例...");
		getHibernateTemplate().saveOrUpdate(transientInstance);

	}

	@Override
	public void saveOrUpdateAll(List<T> transientInstance) {
		logger.debug("新建或保存一个 " + pojoClass.getName() + " 实例集合...");
		getHibernateTemplate().saveOrUpdateAll(transientInstance);

	}

	@Override
	public void update(T transientInstance) {

		logger.debug("更新一个 " + pojoClass.getName() + " 实例...");
		getHibernateTemplate().update(transientInstance);

	}

	@Override
	public void merge(T transientInstance) {
		logger.debug("合并一个 " + pojoClass.getName() + " 实例...");
		getHibernateTemplate().merge(transientInstance);

	}

	@Override
	public void deleteById(ID id) {

		logger.debug("依据ID删除一个 id= " + id + " 的 " + pojoClass.getName()
				+ " 实例, 查找该实例...  ");
		T instance = findById(id);
		if (instance != null) {

			logger.debug("删除一个 " + pojoClass.getName() + " 实例...");
			getHibernateTemplate().delete(instance);
		} else {
			logger.debug(" 没有找到该实例!");
		}

	}

	@Override
	public void delete(T persistentInstance) {

		logger.debug("删除一个 " + pojoClass.getName() + " 实例...");
		getHibernateTemplate().delete(persistentInstance);

	}

	// 分页
	@Override
	public PaginationSupport findPageByCriteria(final Criteria criteria,
			final int pageSize, final int startIndex) {
		int totalCount = getCountByCriteria(criteria);
		criteria.setProjection(null);
		List items = criteria.setFirstResult(startIndex)
				.setMaxResults(pageSize).list();
		items = transformResults(items);
		PaginationSupport ps = new PaginationSupport(items, totalCount,
				pageSize, startIndex);
		return ps;
	}

	@Override
	public PaginationSupport findPageByCriteria(final Criteria criteria) {
		return findPageByCriteria(criteria, PaginationSupport.PAGESIZE, 0);
	}

	@Override
	public PaginationSupport findPageByCriteria(final Criteria criteria,
			final int startIndex) {
		return findPageByCriteria(criteria, PaginationSupport.PAGESIZE,
				startIndex);
	}

	@Override
	public int getCountByCriteria(final Criteria criteria) {
		Integer count = criteria.setProjection(Projections.rowCount())
				.uniqueResult().hashCode();
		return count.intValue();
	}

	@Override
	public PaginationSupport findPageByCriteria(
			final DetachedCriteria detachedCriteria, final int pageSize,
			final int startIndex) {
		return (PaginationSupport) getHibernateTemplate().execute(
				new HibernateCallback() {
					@Override
					public Object doInHibernate(Session session)
							throws HibernateException {
						Criteria criteria = detachedCriteria
								.getExecutableCriteria(session);
						int totalCount = ((Integer) criteria.setProjection(
								Projections.rowCount()).uniqueResult())
								.intValue();
						criteria.setProjection(null);
						List items = criteria.setFirstResult(startIndex)
								.setMaxResults(pageSize).list();
						items = transformResults(items);
						PaginationSupport ps = new PaginationSupport(items,
								totalCount, pageSize, startIndex);
						return ps;
					}
				});
	}

	@Override
	public PaginationSupport findPageByCriteria(
			final DetachedCriteria detachedCriteria) {
		return findPageByCriteria(detachedCriteria, PaginationSupport.PAGESIZE,
				0);
	}

	@Override
	public PaginationSupport findPageByCriteria(
			final DetachedCriteria detachedCriteria, final int startIndex) {
		return findPageByCriteria(detachedCriteria, PaginationSupport.PAGESIZE,
				startIndex);
	}

	@Override
	public int getCountByCriteria(final DetachedCriteria detachedCriteria) {
		Integer count = (Integer) getHibernateTemplate().execute(
				new HibernateCallback() {
					@Override
					public Object doInHibernate(Session session)
							throws HibernateException {
						Criteria criteria = detachedCriteria
								.getExecutableCriteria(session);
						return criteria.setProjection(Projections.rowCount())
								.uniqueResult().hashCode();
					}
				});
		return count.intValue();
	}

	@Override
	public PaginationSupport findPageByQuery(final String hql,
			final int pageSize, final int startIndex, Object... values) {
		int totalCount = getCountByQuery(hql, values);

		if (totalCount < 1)
			return new PaginationSupport(new ArrayList(0), 0);

		Query query = createQuery(hql, values);
		List items = query.setFirstResult(startIndex).setMaxResults(pageSize)
				.list();
		PaginationSupport ps = new PaginationSupport(items, totalCount,
				pageSize, startIndex);
		return ps;
	}

	@Override
	public PaginationSupport findPageByQuery(final String hql, Object... values) {
		return findPageByQuery(hql, PaginationSupport.PAGESIZE, 0, values);
	}

	@Override
	public PaginationSupport findPageByQuery(final String hql,
			final int startIndex, Object... values) {
		return findPageByQuery(hql, PaginationSupport.PAGESIZE, startIndex,
				values);
	}

	@Override
	public int getCountByQuery(final String hql, Object... values) {
		String countQueryString = " select count (*) "
				+ removeSelect(removeOrders(hql));
		List countlist = getHibernateTemplate().find(countQueryString, values);
		return Integer.parseInt(countlist.get(0).toString());
	}

	// 创建Criteria和Query
	@Override
	public Criteria createCriteria(Criterion... criterions) {
		Criteria criteria = getSession().createCriteria(getPojoClass());
		for (Criterion c : criterions)
			criteria.add(c);
		return criteria;
	}

	/**
	 * 创建Criteria对象，带排序字段与升降序字段
	 */
	@Override
	public Criteria createCriteria(String orderBy, boolean isAsc,
			Criterion... criterions) {
		Criteria criteria = createCriteria(criterions);
		if (isAsc)
			criteria.addOrder(Order.asc(orderBy));
		else
			criteria.addOrder(Order.desc(orderBy));
		return criteria;
	}

	@Override
	public Query createQuery(String hql, Object... values) {
		Query query = getSession().createQuery(hql);
		for (int i = 0; i < values.length; i++) {
			query.setParameter(i, values[i]);
		}
		return query;
	}

	/**
	 * 方法取自SpringSide，去除hql的select子句，未考虑union的情况
	 * 
	 * @param hql
	 *            查询语句
	 * @return 去除hql的select子句
	 */
	private static String removeSelect(String hql) {
		int beginPos = hql.toLowerCase().indexOf("from");
		return hql.substring(beginPos);
	}

	/**
	 * 方法取自SpringSide， 去除hql的orderby子句
	 * 
	 * @param hql
	 *            查询语句
	 * @return 去除hql的orderby子句
	 */
	private static String removeOrders(String hql) {
		Pattern p = Pattern.compile("order\\s*by[\\w|\\W|\\s|\\S]*",
				Pattern.CASE_INSENSITIVE);
		Matcher m = p.matcher(hql);
		StringBuffer sb = new StringBuffer();
		while (m.find()) {
			m.appendReplacement(sb, "");
		}
		m.appendTail(sb);
		return sb.toString();
	}

	/**
	 * 将联合查询的结果内容从Map或者Object[]转换为实体类型，如果没有转换必要则直接返回
	 */
	private List transformResults(List items) {
		if (items.size() > 0) {
			if (items.get(0) instanceof Map) {
				ArrayList list = new ArrayList(items.size());
				for (int i = 0; i < items.size(); i++) {
					Map map = (Map) items.get(i);
					list.add(map.get(CriteriaSpecification.ROOT_ALIAS));
				}
				return list;
			} else if (items.get(0) instanceof Object[]) {
				ArrayList list = new ArrayList(items.size());
				int pos = 0;
				for (int i = 0; i < ((Object[]) items.get(0)).length; i++) {
					if (((Object[]) items.get(0))[i].getClass() == getPojoClass()) {
						pos = i;
						break;
					}
				}
				for (int i = 0; i < items.size(); i++) {
					list.add(((Object[]) items.get(i))[pos]);
				}
				return list;
			} else
				return items;
		}
		return items;
	}

}
