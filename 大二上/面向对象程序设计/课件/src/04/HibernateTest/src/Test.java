import java.util.Date;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import test.entity.Department;
import test.entity.LoginUser;

/**
 * 
 * @author wben
 *
 */
public class Test {

	/**
	 * 添加用户
	 * 
	 * @param user
	 * @return
	 */
	public static Long addUser(LoginUser user) {
		Session session = HibernateUtil.currentSession();
		session.beginTransaction();
		Long id = (Long) session.save(user);
		session.flush();
		// 提交事务
		session.getTransaction().commit();
		return id;
	}

	/**
	 * 添加部门
	 * 
	 * @param department
	 * @return
	 */
	public static Long addDepartment(Department department) {
		Session session = HibernateUtil.currentSession();
		session.beginTransaction();
		Long id = (Long) session.save(department);
		session.flush();
		// 提交事务
		session.getTransaction().commit();
		return id;
	}

	/**
	 * 通过id查找用户
	 * 
	 * @param id
	 * @return
	 */
	public static LoginUser getUser(Long id) {
		Session session = HibernateUtil.currentSession();
		// return (LoginUser) session.get(LoginUser.class, id);
		List list = session.createQuery("from LoginUser where id=:id")
				.setLong("id", id).list();
		if (list != null && list.size() > 0) {
			return (LoginUser) list.get(0);
		} else {
			return null;
		}

	}

	/**
	 * 通过名称查找用户
	 * 
	 * @param userName
	 * @return
	 */
	public static List<LoginUser> findUsersByName(String userName) {
		Session session = HibernateUtil.currentSession();
		@SuppressWarnings("unchecked")
		List<LoginUser> list = session.createCriteria(LoginUser.class)
				.add(Restrictions.like("name", "%" + userName + "%")).list();
		return list;
	}

	public static void main(String[] args) {
		LoginUser user = new LoginUser();
		user.setLoginName("peter");
		user.setPassword("123");
		user.setCreateTime(new Date());
		user.setName("peter");
		Long userId = Test.addUser(user);

		user = new LoginUser();
		user.setLoginName("peking");
		user.setPassword("456");
		user.setCreateTime(new Date());
		user.setName("peking");
		Test.addUser(user);

		Department department = new Department();
		department.setDepartName("DP1");
		department.setManager(user);
		department.setDescription("Department for test");
		Test.addDepartment(department);

		System.out.println("-->" + userId);
		LoginUser user1 = Test.getUser(userId);
		System.out.println("==>" + user1.getLoginName());

		for (LoginUser luser : Test.findUsersByName("pe")) {
			System.out.println(luser.getName());

		}

		HibernateUtil.closeSession();
	}
}
