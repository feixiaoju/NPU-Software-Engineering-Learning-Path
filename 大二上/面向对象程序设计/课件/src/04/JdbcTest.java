/**
 * 
 */
package cn.edu.nwpu.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * @author wben 2014年10月26日-下午1:13:20
 *
 */
public class JdbcTest {
	public static void main(String[] args) {
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;

		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			String url = "jdbc:mysql://localhost:3306/dishui?user=root&password=&useUnicode=true&characterEncoding=UTF-8";
			conn = DriverManager.getConnection(url);
			stmt = conn.createStatement();

			String insert = "insert into YM_USER(name,login_name,password) values('王犇','wben','wben')";
			stmt.executeUpdate(insert);

			String query = "select * from YM_USER";
			rs = stmt.executeQuery(query);
			while (rs.next()) {
				System.out.print(rs.getInt("id") + "-");
				System.out.print(rs.getString(2) + "-");
				System.out.print(rs.getString(3) + "-");
				System.out.println(rs.getString(4));
			}

			PreparedStatement ps = conn
					.prepareStatement("select * from YM_USER where id=?");
			ps.setInt(1, 2);
			rs = ps.executeQuery();

			while (rs.next()) {
				System.out.print(rs.getInt("id") + "-");
				System.out.print(rs.getString(2) + "-");
				System.out.print(rs.getString(3) + "-");
				System.out.println(rs.getString(4));
			}

		} catch (ClassNotFoundException | InstantiationException
				| IllegalAccessException | SQLException e) {
			e.printStackTrace();

		} finally {

			try {
				if (rs != null) {
					rs.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			} finally {
				try {
					if (stmt != null) {
						stmt.close();
					}
				} catch (SQLException e) {
					e.printStackTrace();
				} finally {
					try {
						if (conn != null) {
							conn.close();
						}
					} catch (SQLException e) {
						e.printStackTrace();
					}
				}
			}
		}
	}
}
