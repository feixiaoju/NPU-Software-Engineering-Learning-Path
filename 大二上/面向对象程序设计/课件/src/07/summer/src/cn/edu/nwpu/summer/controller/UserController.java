/**
 * 
 */
package cn.edu.nwpu.summer.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ValidationUtils;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import cn.edu.nwpu.summer.dao.DepartmentDAO;
import cn.edu.nwpu.summer.entity.LoginUser;
import cn.edu.nwpu.summer.form.LoginForm;
import cn.edu.nwpu.summer.form.RegistryForm;
import cn.edu.nwpu.summer.service.UserService;

/**
 * @author wben 2014年10月28日-上午10:59:57
 *
 */
@Controller
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private DepartmentDAO departmentDAO;

	/**
	 * 登录表单校验
	 * 
	 * @param result
	 */
	private void validateLoginForm(BindingResult result) {
		String formName = result.getObjectName();
		String[] fields = new String[] { "loginName", "password" };
		for (String field : fields) {
			ValidationUtils.rejectIfEmptyOrWhitespace(result, field,
					"required", new Object[] { formName + "." + field, field },
					"请填写该字段");
		}
	}

	/**
	 * 用户登录页面GET
	 * 
	 * @param request
	 * @param model
	 */
	@RequestMapping(value = "login.do", method = RequestMethod.GET)
	public void login(HttpServletRequest request, Model model) {

		LoginForm loginForm = new LoginForm();
		model.addAttribute("loginForm", loginForm);
	}

	/**
	 * 用户登录POST
	 * 
	 * @param request
	 * @param response
	 * @param form
	 * @param result
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "login.do", method = RequestMethod.POST)
	public String loginPost(HttpServletRequest request,
			HttpServletResponse response,
			@ModelAttribute("loginForm") LoginForm form, BindingResult result,
			Model model) {

		validateLoginForm(result);
		if (result.hasErrors()) {
			return "login";
		}
		LoginUser user = userService.validateUser(form.getLoginName(),
				form.getPassword());
		if (user != null) { // 用户校验成功
			request.getSession().setAttribute("CURRENT_USER", user);
			return "redirect:main.do";
		} else { // 用户校验失败
			result.rejectValue("password", "passwordError", "用户名或密码错误");
			return "login";
		}

	}

	/**
	 * 用户主页
	 * 
	 * @param request
	 * @param model
	 */
	@RequestMapping(value = "main.do", method = RequestMethod.GET)
	public void main(HttpServletRequest request, Model model) {
		LoginUser user = (LoginUser) request.getSession().getAttribute(
				"CURRENT_USER");
		if (user != null) {
			model.addAttribute("user", user);
		}
	}

	/**
	 * 用户注册页面GET
	 * 
	 * @param request
	 * @param model
	 */
	@RequestMapping(value = "registry.do", method = RequestMethod.GET)
	public void registry(HttpServletRequest request, Model model) {
		RegistryForm registryForm = new RegistryForm();
		model.addAttribute("registryForm", registryForm);
		model.addAttribute("departments", userService.findAllDepartment());
	}

	/**
	 * 用户注册表单POST
	 * 
	 * @param request
	 * @param response
	 * @param form
	 * @param result
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "registry.do", method = RequestMethod.POST)
	public String registryPost(HttpServletRequest request,
			HttpServletResponse response,
			@ModelAttribute("registryForm") RegistryForm form,
			BindingResult result, Model model) {
		LoginUser user = form.getLoginUser();
		if (userService.duplicateLoginName(user.getLoginName())) {
			result.rejectValue("loginUser.loginName", "duplicateLoginName",
					"用户名已存在");
			model.addAttribute("departments", userService.findAllDepartment());
			return "registry";
		} else {
			System.out.println("-->" + form.getDepartment().getId());
			System.out.println("--->" + form.getDepartment().getDepartName());
			user.setDepartment(form.getDepartment());
			userService.saveLoginUser(user);
			System.out.println(user.getId());
			request.getSession().setAttribute("CURRENT_USER", user);
			return "redirect:main.do";
		}
	}

	@RequestMapping(value = "checkUserName.do", method = RequestMethod.GET)
	public void checkUserName(HttpServletRequest request,
			HttpServletResponse response) {
		String userName = request.getParameter("userName");
		System.out.println("====>" + userName);
		if (userService.duplicateLoginName(userName)) {
			try {
				response.getOutputStream().print("user name duplicate");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else {
			try {
				response.getOutputStream().print("OK");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	@InitBinder
	public void initBinder(WebDataBinder dataBinder) {
		dataBinder.registerCustomEditor(
				cn.edu.nwpu.summer.entity.Department.class,
				new DepartmentEditor(departmentDAO));
	}
}
