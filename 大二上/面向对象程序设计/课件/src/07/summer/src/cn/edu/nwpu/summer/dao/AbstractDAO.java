package cn.edu.nwpu.summer.dao;

import java.io.Serializable;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;

import cn.edu.nwpu.summer.dao.hibernate.PaginationSupport;

public interface AbstractDAO<T, ID extends Serializable> {

	/**
	 * 获得该DAO对应的POJO类型。
	 * 
	 * @return POJO类型。
	 */
	public abstract Class<T> getPojoClass();

	/**
	 * 获得该DAO对应的POJO类型名。
	 * 
	 * @return POJO类型名。
	 */
	public abstract String getPojoClassName();

	/**
	 * 加载所有的对象列表。
	 * 
	 * @return 所有的对象列表。
	 */
	public abstract List<T> findAll();

	/**
	 * 根据hql查询数据，支持可变参数，参数按顺序排列。
	 * 
	 * @param hql
	 *            HQL查询语句。
	 * @param values
	 *            可变参数，参数按顺序排列。
	 * @return 查询结果集。
	 */
	@SuppressWarnings("unchecked")
	public abstract List find(String hql, Object... values);

	/**
	 * 根据Criteria条件加载对象。
	 * 
	 * @param criteria
	 *            Criteria条件。
	 * @return 满足条件的结果集。
	 * @see org.hibernate.Criteria
	 */
	public abstract List<T> findByCriteria(final Criteria criteria);

	/**
	 * 根据条件加载对象
	 * 
	 * @param detachedCriteria
	 *            DetachedCriteria实例。
	 * @return 满足条件的结果集。
	 * @see org.hibernate.criterion.DetachedCriteria
	 */
	public abstract List<T> findByCriteria(
			final DetachedCriteria detachedCriteria);

	/**
	 * 根据给定的对象实例查找对象。
	 * 
	 * @param instance
	 *            对象实例。
	 * @return 满足条件的结果集。
	 */
	public abstract List<T> findByExample(T instance);

	/**
	 * 根据ID查找对象。
	 * 
	 * @param id
	 *            对象的ID
	 * @return 对象，没有返回NULL。
	 */
	public abstract T findById(ID id);

	/**
	 * 根据某个具体属性进行查找。
	 * 
	 * @param propertyName
	 *            属性逻辑名称。
	 * @param value
	 *            属性值。
	 * @return 满足条件的结果集。
	 */
	public abstract List<T> findByProperty(String propertyName, Object value);

	/**
	 * 保存新建对象。
	 * 
	 * @param transientInstance
	 *            实例化对象。
	 * @return 实例的ID。
	 */
	public abstract ID save(T transientInstance);

	/**
	 * 新建或更新对象，当ID是NULL时新建，否则更新。
	 * 
	 * @param transientInstance
	 *            实例化对象。
	 */
	public abstract void saveOrUpdate(T transientInstance);

	/**
	 * 新建或更新对象集合，当ID是NULL时新建，否则更新。
	 * 
	 * @param transientInstance
	 *            实例化对象列表
	 */
	public abstract void saveOrUpdateAll(List<T> transientInstance);

	/**
	 * 更新已存在的对象，ID不为空。
	 * 
	 * @param transientInstance
	 *            更新对象。
	 */
	public abstract void update(T transientInstance);

	/**
	 * 合并托管的对象，对于有级联关系实体可采用。 如果session中存在相同持久化标识(identifier)的实例，
	 * 用用户给出的对象的状态覆盖旧有的持久实例, 如果session没有相应的持久实例，则尝试从数据库中加载，或创建新的持久化实例,最后返回该持久实例。
	 * 用户给出的这个对象没有被关联到session上，它依旧是脱管的。
	 * 
	 * @param transientInstance
	 *            合并对象。
	 */
	public abstract void merge(T transientInstance);

	/**
	 * 删除指定ID的对象。
	 * 
	 * @param id
	 *            对象ID。
	 */
	public abstract void deleteById(ID id);

	/**
	 * 删除指定实例的对象。
	 * 
	 * @param persistentInstance
	 *            删除对象实例。
	 */
	public abstract void delete(T persistentInstance);

	/**
	 * 根据指定页大小、起始位置和Criteria加载对象，分页时使用。。
	 * 
	 * 
	 * @param criteria
	 *            查询条件。
	 * @param pageSize
	 *            页面大小。
	 * @param startIndex
	 *            起始位置。
	 * @return 满足条件的结果集。
	 * @see cn.yuma.trl.dao.hibernate.PaginationSupport
	 */
	public abstract PaginationSupport findPageByCriteria(
			final Criteria criteria, final int pageSize, final int startIndex);

	/**
	 * 根据Criteria加载分页，默认页大小，从第0条开始，分页时使用。
	 * 
	 * 
	 * @param criteria
	 *            查询条件。
	 * @return 满足条件的结果集。
	 * @see cn.yuma.trl.dao.hibernate.PaginationSupport
	 */
	public abstract PaginationSupport findPageByCriteria(final Criteria criteria);

	/**
	 * 根据Criteria加载分页，默认页大小，从第startIndex条开始，分页时使用。
	 * 
	 * 
	 * @param criteria
	 *            查询条件。
	 * @param startIndex
	 *            起始位置。
	 * @return 满足条件的结果集。
	 * @see cn.yuma.trl.dao.hibernate.PaginationSupport
	 */
	public abstract PaginationSupport findPageByCriteria(
			final Criteria criteria, final int startIndex);

	/**
	 * 根据Criteria条件统计满足条件的对象总数。
	 * 
	 * @param criteria
	 *            查询条件。
	 * @return 满足条件的对象总数。
	 */
	public abstract int getCountByCriteria(final Criteria criteria);

	/**
	 * 根据指定页大小、起始位置和DetachedCriteria条件加载对象，分页时使用。
	 * 
	 * 
	 * @param detachedCriteria
	 *            查询条件。
	 * @param pageSize
	 *            页大小。
	 * @param startIndex
	 *            起始位置。
	 * @return 满足条件的结果集。
	 * @see cn.yuma.trl.dao.hibernate.PaginationSupport
	 */
	public abstract PaginationSupport findPageByCriteria(
			final DetachedCriteria detachedCriteria, final int pageSize,
			final int startIndex);

	/**
	 * 根据DetachedCriteria加载分页，默认页大小，从第0条开始，分页时使用。
	 * 
	 * @param detachedCriteria
	 *            查询条件。
	 * @return 满足条件的结果集。
	 * @see cn.yuma.trl.dao.hibernate.PaginationSupport
	 */
	public abstract PaginationSupport findPageByCriteria(
			final DetachedCriteria detachedCriteria);

	/**
	 * 根据DetachedCriteria加载分页，默认页大小，从第startIndex条开始，分页时使用。
	 * 
	 * 
	 * @param detachedCriteria
	 *            查询条件。
	 * @param startIndex
	 *            起始位置。
	 * @return 满足条件的结果集。
	 * @see cn.yuma.trl.dao.hibernate.PaginationSupport
	 */
	public abstract PaginationSupport findPageByCriteria(
			final DetachedCriteria detachedCriteria, final int startIndex);

	/**
	 * 根据DetachedCriteria条件统计满足条件的对象总数。
	 * 
	 * @param detachedCriteria
	 *            查询条件。
	 * @return 满足条件的对象总数。
	 */
	public abstract int getCountByCriteria(
			final DetachedCriteria detachedCriteria);

	/**
	 * 根据指定页大小、起始位置和hql加载加载对象，分页时使用。
	 * 
	 * 
	 * @param hql
	 *            查询语句。
	 * @param pageSize
	 *            页大小。
	 * @param startIndex
	 *            起始位置。
	 * @param values
	 *            可变参数，参数按顺序排列。
	 * @return 满足条件的结果集。
	 * @see cn.yuma.trl.dao.hibernate.PaginationSupport
	 */
	public abstract PaginationSupport findPageByQuery(final String hql,
			final int pageSize, final int startIndex, Object... values);

	/**
	 * 根据hql加载分页，默认页大小，从第0条开始，分页时使用。
	 * 
	 * @see cn.yuma.trl.dao.hibernate.PaginationSupport
	 * @param hql
	 *            查询语句。
	 * @param values
	 *            可变参数，参数按顺序排列。
	 * 
	 * @return 满足条件的结果集。
	 */
	public abstract PaginationSupport findPageByQuery(final String hql,
			Object... values);

	/**
	 * 根据hql加载分页，默认页大小，从第startIndex条开始，分页时使用。
	 * 
	 * @see cn.yuma.trl.dao.hibernate.PaginationSupport
	 * @param hql
	 *            查询语句。
	 * @param startIndex
	 *            起始位置。
	 * @param values
	 *            可变参数，参数按顺序排列。
	 * @return 满足条件的结果集。
	 */
	public abstract PaginationSupport findPageByQuery(final String hql,
			final int startIndex, Object... values);

	/**
	 * 根据hql统计满足条件的对象总数。
	 * 
	 * @param hql
	 *            查询语句。
	 * @param values
	 *            可变参数，参数按顺序排列。
	 * @return 满足条件的对象总数。
	 * @see cn.yuma.trl.dao.hibernate.PaginationSupport
	 */
	public abstract int getCountByQuery(final String hql, Object... values);

	/**
	 * 创建Criteria查询对象。
	 * 
	 * @param criterions
	 *            可变的Restrictions条件列表。
	 * @return Criteria对象。
	 */
	public abstract Criteria createCriteria(Criterion... criterions);

	/**
	 * 创建Criteria对象，带排序字段与升降序字段。
	 * 
	 * @param orderBy
	 *            排序字段。
	 * @param isAsc
	 *            true升序，false降序。
	 * @param criterions
	 *            可变的Restrictions条件列表。
	 * @return Criteria对象
	 */
	public abstract Criteria createCriteria(String orderBy, boolean isAsc,
			Criterion... criterions);

	/**
	 * 方法取自SpringSide，根据制定HQL语句和查询参数 创建Query对象。
	 * 对于需要first、max、fetchsize、cache、cacheRegion等诸多设置的函数，可以在返回Query后自行设置。
	 * 留意可以连续设置，示例如下：
	 * 
	 * <pre>
	 * dao.getQuery(hql).setMaxResult(100).setCacheable(true).list();
	 * </pre>
	 * 
	 * 调用方式如下：
	 * 
	 * <pre>
	 *        dao.createQuery(hql)
	 *        dao.createQuery(hql,arg0);
	 *        dao.createQuery(hql,arg0,arg1);
	 *        dao.createQuery(hql,new Object[arg0,arg1,arg2])
	 * </pre>
	 * 
	 * @param hql
	 *            查询语句。
	 * @param values
	 *            可变参数
	 * @return Query对象。
	 */
	public abstract Query createQuery(String hql, Object... values);

}
