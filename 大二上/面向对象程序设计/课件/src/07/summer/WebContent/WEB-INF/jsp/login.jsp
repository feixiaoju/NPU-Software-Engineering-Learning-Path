<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="./includeTaglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="<c:url value="css/style.css"/>" rel="stylesheet" type="text/css"/>
<title>用户登录</title>
</head>
<body>
	<h1 align="center">用户登录</h1>
	<hr>
	<p>
		<b>用户信息:</b>
	</p>
	<form:form modelAttribute="loginForm" action="login.do">
		<table width="500" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td width="100" align="right">用户名：</td>
				<td><form:input path="loginName" />
					<form:errors path="loginName" cssClass="form-err"/></td>
			</tr>
			<tr>
				<td width="100" align="right">密码：</td>
				<td><form:password path="password" />
					<form:errors path="password" cssClass="form-err" /></td>
			</tr>
		</table>
		<hr>
		<p>
			<input type="submit" name="btn_submit" value="登录"> 
			<input type="reset" name="btn_reset" value="重置">
			<input type="button" name="btn_reregistry" value="注册新用户" onclick="location.href='registry.do';">
		</p>
	</form:form>

</body>
</html>