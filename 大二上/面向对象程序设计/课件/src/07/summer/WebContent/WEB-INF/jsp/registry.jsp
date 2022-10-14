<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="./includeTaglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="<c:url value="js/jquery-1.9.1.min.js"/>" type="text/javascript"></script>
<link href="<c:url value="css/style.css"/>" rel="stylesheet" type="text/css"/>
<script>

$(function($) {
	
	$("#myButton").on("click", function() {
		//alert("button click");
		$.ajax({
			url: "checkUserName.do",
			data: {
			    userName: $("#loginName").val()
			  },
			success: function( msg ) {
				alert(msg);
			  }
		});
	});
	
});

function checkInput() {
	if($("#loginName").val().trim()=="") {
		$("#loginName").val("");
		alert("请填写用户名");
		return false;
	}
	if($("#password").val()=="" || $("#password").val().length < 6) {
		alert("密码不能少于6位");
		return false;
	}
	if($("#rePassword").val() != $("#password").val()) {
		alert("两次输入的密码不一致");
		return false;
	}
	if($("#name").val().trim()=="") {
		$("#name").val("");
		alert("请填写姓名");
		return false;
	}
	
}
</script>
<title>用户注册</title>
</head>
<body>
	<h1 align="center">用户注册</h1>
	<hr>
	<p>
		<b>用户信息:</b>
	</p>
	<form:form modelAttribute="registryForm" action="registry.do">
		<table width="500" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td width="100" align="right">*用户名：</td>
				<td><form:input id="loginName" path="loginUser.loginName" maxlength="20"/>
					<form:errors path="loginUser.loginName" cssClass="form-err"/></td>
			</tr>
			<tr>
				<td width="100" align="right">*密码：</td>
				<td><form:password id="password" path="loginUser.password" maxlength="20"/>
					<form:errors path="loginUser.password" cssClass="form-err" /></td>
			</tr>
			<tr>
				<td width="100" align="right">*密码确认：</td>
				<td><form:password path="rePassword" maxlength="20"/>
					<form:errors path="rePassword" cssClass="form-err" /></td>
			</tr>
			<tr>
				<td width="100" align="right">*姓名：</td>
				<td><form:input id="name" path="loginUser.name" maxlength="20"/>
					<form:errors path="loginUser.name" cssClass="form-err"/></td>
			</tr>
			<tr>
				<td width="100" align="right">性别：</td>
				<td><form:select path="loginUser.gender">
					<form:option value="男">男</form:option>
					<form:option value="女">女</form:option>
					</form:select>
				</td>
			</tr>
			<tr>
				<td width="100" align="right">手机：</td>
				<td><form:input path="loginUser.mobile" maxlength="20"/>
					<form:errors path="loginUser.mobile" cssClass="form-err"/></td>
			</tr>
			<tr>
				<td width="100" align="right">电子邮件：</td>
				<td><form:input path="loginUser.email" maxlength="50"/>
					<form:errors path="loginUser.email" cssClass="form-err"/></td>
			</tr>
			<tr>
				<td width="100" align="right">隶属部门：</td>
				<td><form:select path="department" items="${departments }" itemLabel="departName" ></form:select>
				</td>
			</tr>
			
		</table>
		<hr>
		<p>
			<input type="button" id="myButton" value="hello"/>
			<input type="submit" name="btn_submit" value="注册" onmousedown="checkInput();"> 
			<input type="reset" name="btn_reset" value="重置">
		</p>
	</form:form>
</body>
</html>