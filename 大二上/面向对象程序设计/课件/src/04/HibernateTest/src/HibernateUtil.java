import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

/**
 * 
 * @author wben
 *
 */

public class HibernateUtil {

	private static final SessionFactory sessionFactory;
	public static final ThreadLocal<Session> session = new ThreadLocal<Session>();

	static {
		try {
			sessionFactory = new Configuration().configure()
					.buildSessionFactory();
		} catch (Throwable ex) {
			throw new ExceptionInInitializerError(ex);
		}
	}

	public static Session getSession() throws HibernateException {
		return sessionFactory.openSession();
	}

	public static Session currentSession() throws HibernateException {
		Session s = session.get();

		if (s == null) {
			s = sessionFactory.openSession();
			session.set(s);
		}

		return s;
	}

	public static void closeSession() throws HibernateException {
		Session s = session.get();
		if (s != null) {
			s.close();
		}
		session.set(null);
	}
}
