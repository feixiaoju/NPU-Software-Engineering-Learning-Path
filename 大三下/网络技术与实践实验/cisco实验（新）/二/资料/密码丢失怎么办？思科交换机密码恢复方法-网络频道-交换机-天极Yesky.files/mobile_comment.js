
if(typeof(channelid) == "undefined") channelid = 0;

function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1)
        endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}
function getCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg)
            return getCookieVal(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}
function setCookie(name, value) {
    var argv = setCookie.arguments;
    var argc = setCookie.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : null;
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    document.cookie = name + "=" + escape(value) +
                      ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
                      ((path == null) ? "" : ("; path=" + path)) +
                      ((domain == null) ? "" : ("; domain=" + domain)) +
                      ((secure == true) ? "; secure" : "");
}

function deleteCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = GetCookie(name);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}

function getTagId(tName) {
	tName = tName.replace(/(^[\s　]*)|([\s　]*$)/g, "");
	var tagid = 0;
	for(var ti = 0; ti < tName.length; ti++) {
		tagid += tName.charCodeAt(ti);
	}
	return tagid;
}
function UrlEncode(str){
   var i,temp,p,q;
   var result="";
   str = str.replace(/(^[\s　]*)|([\s　]*$)/g, "");
   for(i=0;i<str.length;i++){
      temp = str.charCodeAt(i);
      if(temp>=0x4e00){
         execScript("ascCode=hex(asc(\""+str.charAt(i)+"\"))", "vbscript");
         result+=ascCode.replace(/(.{2})/g, "%$1");
      }else{
         result+=escape(str.charAt(i));
      }
   }
   return result;
}



function addSmile(val) {
	with (document.frmReviewPost) {
		contents.value += "[s" + val + "]";
	}
}

function submitReviewForm(f) {
    with(f) {
        if(rfid.value.length > 0) {
			if(userName.value.length ==  0) {
				alert("请输入您的笔名！");
				userName.focus();
				return;
			}
			if(userName.value.length > 20) {
				alert("笔名太长，字数不能超过20！");
				userName.focus();
				return;
			}

			if(contents.value.length ==  0) {
				alert("请输入评论内容");
				contents.focus();
				return;
			}
			if(contents.value.length > 2000) {
				alert("内容太长，字数不能超过2000");
				contents.focus();
				return;
			}
			title.value = contents.value.substring(0,15);
			try
			{
				for(i=0;i<latest_comments_fid.length;i++)
				{ 
					if( latest_comments_fid[i]!="-1") 
					{
						break;
					}
				}				
			}
			catch (err)
			{
			}
            submit(); 
            var comments_list = document.getElementById("comments_list");
            addComments(userName.value,contents.value);
            if(comments_list)
            	comments_list.innerHTML = writeComments();         
						contents.value = "";
     }
    }
}
var afid = "-1";
try
{
  for(i=0;i<latest_comments_fid.length;i++)
  { 
    if( latest_comments_fid[i]!="-1") 
    {
      afid=latest_comments_fid[i]; 
      break;
    }
  }	
}
catch (err)
{
}
function parseDate(d){
   var s = "";
   s += d.getUTCFullYear()+"-";               
   s += fillLeftZero(d.getMonth() + 1) + "-";            
   s += fillLeftZero(d.getDate()) + " ";                  
   s += fillLeftZero(d.getHours()) + ":";
   s += fillLeftZero(d.getMinutes());        
   return(s);                          
}
function fillLeftZero(v){
	return ""+v<10?("0"+v):v;
}

function addComments(username,content){
	if(!(typeof(latest_comments_poster) == "object" && latest_comments_poster.length && latest_comments_poster.length > 0)){
			latest_comments_num = 1;
			latest_comments_tagid = -1 ;
			latest_comments_url  ="http://comments.yesky.com/a/6/3125682.shtml" ;
			latest_comments_poster = new Array();
			latest_comments_ip = new Array();
			latest_comments_level = new Array();
			latest_comments_id = new Array();
			latest_comments_rfid = new Array();
			latest_comments_type = new Array();
			latest_comments_visits = new Array();
			latest_comments_replies = new Array();
			latest_comments_contents  = new Array();
			latest_comments_postdate = new Array();
			latest_comments_fid = new Array();
			latest_comments_userid = new Array();
			latest_comments_floorno = new Array();
			
			latest_comments_poster[latest_comments_poster.length]=username;
			latest_comments_ip[latest_comments_ip.length]="219.238.133.*";
			latest_comments_id[latest_comments_id.length]="-1";
			latest_comments_rfid[latest_comments_rfid.length]=aid;
			latest_comments_type[latest_comments_type.length]="6";
			latest_comments_contents[latest_comments_contents.length]=content;
			latest_comments_level[latest_comments_level.length]="43";
			latest_comments_visits[latest_comments_visits.length]="1";
			latest_comments_replies[latest_comments_replies.length]="1";
			latest_comments_postdate[latest_comments_postdate.length]= parseDate(new Date());
			latest_comments_fid[latest_comments_fid.length]="-1";
			latest_comments_userid[latest_comments_userid.length]="-1";
			latest_comments_floorno[latest_comments_floorno.length]="1";
	}else{
			latest_comments_num = parseInt(latest_comments_num)+1;
			latest_comments_poster.unshift(username);
			latest_comments_ip.unshift("219.238.133.*");
			latest_comments_id.unshift("-1");
			latest_comments_rfid.unshift(latest_comments_rfid[0]);
			latest_comments_type.unshift(latest_comments_type[0]);
			latest_comments_contents.unshift(content);
			latest_comments_level.unshift(latest_comments_level[0]);
			latest_comments_visits.unshift(latest_comments_visits[0]);
			latest_comments_replies.unshift("0");
			latest_comments_postdate.unshift(parseDate(new Date()));
			latest_comments_fid.unshift(latest_comments_fid[0]);
			latest_comments_userid.unshift("-1");
			latest_comments_floorno.unshift(parseInt(latest_comments_floorno[0])+1);
	}
}
function writeComments(){
	var comm_lists = "";
	for (i = 0; i < latest_comments_poster.length && i < 15; i++) {
			var poster = latest_comments_poster[i];
			var t_content = latest_comments_contents[i];
			var content_link = "";
			//[nquote=2007-03-16 19:36,小飞]<img src=/images/smile/face129.gif border=0 align=middle>我没有钱，我选择神舟电脑[/nquote]
			var re = new RegExp("\\[refer=(\\d+),(.*)\\]","i");
			var quot = new RegExp("\\[nquote=(.*),(.*)\\](.*)\\[/nquote\\]","i");
			var quot_match = quot.exec(t_content);
			if(quot_match){
					var re = /\[nquote=(.*),(.*)\](.*)\[\/nquote\]/i;
   				t_content = t_content.replace(re, "[引用自$2于$1：$3]--");
			}
			var rep_match = re.exec(t_content);
			if(rep_match){
					var start_index = t_content.indexOf("[refer=");
					t_content = t_content.substring(0,start_index);
					var t_head = "回复 <a href=\"#reply_"+RegExp.$1+"\">"+RegExp.$1+" 楼("+RegExp.$2+")</a>：";
					content_link = t_head + 
						"<a href=\"http://comments.yesky.com/l/"+afid+"/-1/6," + channelid + "/" + aid + ".shtml#floor_"+latest_comments_floorno[i]+"\">"+t_content+"</a>"
			}else{
					content_link = "<a href=\"http://comments.yesky.com/l/"+afid+"/-1/6," + channelid + "/" + aid + ".shtml#floor_"+latest_comments_floorno[i]+"\">"+t_content+"</a>";
			}			

			if(parseInt(latest_comments_userid[i]) > 0){
					poster = "<a href=\"http://q.yesky.com/user/index.do?userId="+latest_comments_userid[i]+"\" target=\"_blank\">"+poster+"</a>";
			}
			if(mainGroupID != 0){
					content_link = "<a href=\"http://q.yesky.com/group/dsc/view.do?rvId="+latest_comments_fid[i]+"&grpId="+mainGroupID+"\" target=\"_blank\">"+t_content+"</a>";
			}
			var post_date = latest_comments_postdate[i];
			post_date = post_date.substring(5,11);
			comm_lists += "<li><div class=\"hf\"><a name=\"reply_"+latest_comments_floorno[i]+"\"/><font color=\"red\">["+latest_comments_floorno[i]+"楼]</font></div><div class=\"wy\">" + poster + "</div><div class=\"ny\">"+content_link+"</div><div class=\"sj\">" + post_date + "</div></li>";
		}
	return comm_lists;	
}
var mainGroupURL = document.getElementById("mainGroupURL");
var mainGroupID = 0;
if(mainGroupURL && mainGroupURL != null){
	var s_tmp = mainGroupURL.href;
	var p1 = s_tmp.lastIndexOf("/");
	if(p1 != -1)
		mainGroupID = s_tmp.substr(p1+1);
}
document.write("<a name=\"pls\" href=\"#\"></a><div id=\"concomt\"><p>发表评论：</p><span>");
if(typeof(latest_comments_num)!='undefined'){
	var all_comments = "网友评论"+latest_comments_num+"条";
	var view_all = "<a href=\"http://comments.yesky.com/l/"+afid+"/-1/6," + channelid + "/" + aid + ".shtml\" class=\"white\">查看全部</a>";
	
	if(mainGroupID != 0){
		if(latest_comments_fid[0] && latest_comments_fid[0] != null)
			all_comments = "<a href=\"http://q.yesky.com/group/dsc/view.do?rvId="+latest_comments_fid[0]+"&grpId="+mainGroupID+"\" target=\"_blank\" class=\"white\">网友评论"+latest_comments_num+"条</a>";
		view_all = "<a href=\"http://q.yesky.com/group/dsc/view.do?rvId="+latest_comments_fid[0]+"&grpId="+mainGroupID+"\" target=\"_blank\" class=\"white\">查看全部</a>";
	}
	document.write(all_comments+"  "+view_all);
}
document.write("</span></div><div id=\"concomc\"><ul>");
document.write("<span id=\"comments_list\">");
if(typeof(latest_comments_poster) == "object" && latest_comments_poster.length && latest_comments_poster.length > 0){	
		document.write(writeComments());
}
document.write("</span>");
	document.write("</ul>");
    document.write("<div id=\"concomname\"><div class=\"plleft\"><form name=\"frmReviewPost\" method=\"post\" action=\"http://comments.yesky.com/review.post.do\" target=\"#\"><input type=\"hidden\" name=\"tagName\" /><input type=\"hidden\" name=\"article\" value=\"1\"><input type=\"hidden\" name=\"title\" /><input type=\"hidden\" name=\"rfid\" value=\"\"/><input type=\"hidden\" name=\"type\" value=\"6\"/><input type=\"hidden\" name=\"cid\" value=\"\"/><input type=\"hidden\" name=\"mainGrpId\" value=\"-1\"><input type=\"hidden\" name=\"tagId\" value=\"-1\"><input type=\"hidden\" name=\"fid\" value=\"-1\"><input type=\"hidden\" name=\"attachmentRid\" value=\"0\"><div class=\"list\"><textarea name=\"contents\" wrap=\"VIRTUAL\" cols=\"44\" rows=\"7\"  class=\"inputna\" style=\"width:300px;\"></textarea></div><div class=\"list\">用户昵称：<input size=\"22\" name=\"userName\" onmouseover=\"this.focus()\" onfocus=\"this.select()\" type=\"text\" class=\"inputna\"/> <input type=\"button\" value=\"发表评论\" onClick=\"JavaScript:submitReviewForm(this.form)\"/></div></form></div><div class=\"plright\"><div id=\"concomhotmu\"><a href=\"http://comments.yesky.com/review.hot.do\" target=\"#\">热点评论</a></div><dt>");

	 if(typeof(hot_comments_rfid) == "object" && hot_comments_rfid.length > 0) {
		 if (hot_comments_rfid.length>6){
			 for (i = 0; i < 6;i++) {
				document.write("<dd>["+hot_comments_num[i]+"楼] <a href=\""+ hot_comments_url[i] + "\">"+hot_comments_title[i]+"</a></dd>");
			 }
	 }else{
	 		for (i = 0; i < hot_comments_rfid.length;i++) {
				document.write("<dd>["+hot_comments_num[i]+"楼] <a href=\""+ hot_comments_url[i] + "\">"+hot_comments_title[i]+"</a></dd>");
			}
	 }
	}

	document.write("</dt></div></div></div>");

with(document.frmReviewPost) {
    if(typeof(comments_nickname) == "string" && comments_nickname.length > 0) {
        userName.value = comments_nickname;
    } else {
        userName.value = "天极网友";
    }
    if(mainGroupID != 0)
    	mainGrpId.value = mainGroupID;
	if(typeof(aid) != "undefined") rfid.value = aid;
	if(typeof(channelid) != "undefined") cid.value = channelid;
	if(typeof(tagname) == "string" && tagname.length > 0) {
		tagName.value = tagname;
	}
}

