if (typeof(p_productid)!="undefined"){
document.write("<div class=\"conrtbox\"><div class=\"menu\">同价位产品</div><div class=\"conqlrm\">");
document.write("<ul>");
for (var i=0;i<p_productid.length && i<11; i++)
{
document.write("<li>");
document.write("<a href=\"http://www.yesky.com"+ p_url[i] + "\" ><img src=\"http://product.yesky.com"+ p_smallimage[i] +"\" alt=\""+p_productname[i]+"\"/></a><br/>");
document.write("<a href=\"http://www.yesky.com"+ p_url[i] + "\" >"+ p_productname[i] +"</a>");
document.write("</li>");
}
document.write("</ul>");
document.write("</div>");
document.write("<div class=\"clear\"></div>");
document.write("</div>");
}