/**
 * 
 */
package cn.edu.nwpu.summer.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Version;

import org.hibernate.annotations.GenericGenerator;

/**
 * @author wben 2014年10月30日-下午12:54:46
 *
 */
@Entity
@Table(name = "YM_DEPARTMENT")
public class Department implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 主键
	 */
	@Id
	@Column(name = "ID")
	@GeneratedValue(generator = "AssignedGenerator")
	@GenericGenerator(name = "AssignedGenerator", strategy = "cn.edu.nwpu.summer.dao.hibernate.AssignedGenerator")
	private Long id;

	/**
	 * 版本锁
	 */
	@Column(name = "OBJ_VERSION")
	@Version
	private int version;

	/**
	 * 记录创建时间
	 */
	@Column(name = "CREATE_TIME", updatable = false, nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date createTime = new Date();

	/**
	 * 
	 */
	@Column(name = "DEPARTMENT_NAME", length = 50, nullable = false)
	private String departName;

	/**
	 * 
	 */
	@Column(length = 100)
	private String description;

	@OneToOne
	@JoinColumn
	private LoginUser manager;

	@OneToMany(mappedBy = "department", fetch = FetchType.LAZY)
	private List<LoginUser> userList = new ArrayList<LoginUser>();

	/**
	 * @return the id
	 */
	public long getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(long id) {
		this.id = id;
	}

	/**
	 * @return the departName
	 */
	public String getDepartName() {
		return departName;
	}

	/**
	 * @param departName
	 *            the departName to set
	 */
	public void setDepartName(String departName) {
		this.departName = departName;
	}

	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description
	 *            the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @return the manager
	 */
	public LoginUser getManager() {
		return manager;
	}

	/**
	 * @param manager
	 *            the manager to set
	 */
	public void setManager(LoginUser manager) {
		this.manager = manager;
	}

	/**
	 * @return the userList
	 */
	public List<LoginUser> getUserList() {
		return userList;
	}

	/**
	 * @param userList
	 *            the userList to set
	 */
	public void setUserList(List<LoginUser> userList) {
		this.userList = userList;
	}

}
