/**
 * 
 */
package cn.edu.nwpu.jdbc;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * @author wben 2014年10月26日-上午10:34:28
 *
 */
public class JdbcTestWithSingle {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

		Connection conn = null;
		Statement stm = null;
		ResultSet rs = null;

		try {
			// build connection
			// conn = JdbcUtilSingle.getConnection();
			conn = JdbcUtilSingle.getInstance().getConnection(); // call

			// create statement
			stm = conn.createStatement();

			// execute SQL
			rs = stm.executeQuery("Select * from YM_USER;");

			// while get
			while (rs.next()) {
				System.out.println(rs.getObject(1) + "," + rs.getObject(2));
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			JdbcUtilSingle.closeConnection(conn, stm, rs);
		}
	}
}
