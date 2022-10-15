String.prototype.trim = function(){return this.replace(/(^[ |　]*)|([ |　]*$)/g, "");}
function $(s){return document.getElementById(s);}
function $$(s){return document.frames?document.frames[s]:$(s).contentWindow;}
function $c(s){return document.createElement(s);}
function swap(s,a,b,c){$(s)[a]=$(s)[a]==b?c:b;}
function exist(s){return $(s)!=null;}
function dw(s){document.write(s);}
function hide(s){$(s).style.display=$(s).style.display=="none"?"":"none";}
function isNull(_sVal){return (_sVal == "" || _sVal == null || _sVal == "undefined");}
function removeNode(s){if(exist(s)){$(s).innerHTML = '';$(s).removeNode?$(s).removeNode():$(s).parentNode.removeChild($(s));}}
function rsstry(_sUrl){try {new ActiveXObject("SinaRss.RssObject");window.open(_sUrl, "_self");}catch(e){window.open("http://rss.sina.com.cn/rss_noreader.html");}}
function getStyleCss(_sId, _sCss){var oObj = document.getElementById(_sId);return oObj.currentStyle ? oObj.currentStyle[_sCss] : window.getComputedStyle(oObj, "")[_sCss];}
function setHome(){try{window.external.AddFavorite(window.document.location,window.document.title)}catch(e){};}
function hideList(_sId,_sStr,_iBegin,_iEnd,_sShow){for(var i = _iBegin; i <= _iEnd; i++)if(exist(_sId + i)){$(_sId + i).style.display = _sStr;_sStr == 'none' ? $(_sShow + i).className = 'down' : $(_sShow + i).className = 'up'}}
function getAnchor(_sStr){_sStr = _sStr ? _sStr : '#' ;var sUrl=document.location.href;return sUrl.indexOf(_sStr) != -1 ? sUrl.substr(sUrl.lastIndexOf(_sStr) + 1) : null;}
function read(_sUid,_sDate){get('/sns/service.php?m=aListByDate&uid=' + _sUid + '&date=' + _sDate,'/xsl/feeds.xsl','feeds','output','box_2');}
function commentSubmit(_sVid){$("src_title" + _sVid).value = $("commentText" + _sVid).innerHTML;$("src_uname" + _sVid).value = AUTHOR;$('form' + _sVid).submit();}
function output(_sHtml, _box){var oOutput = typeof(_box) == "object" ? _box : $(_box);oOutput.innerHTML = _sHtml;}//alert(_sHtml);}
function setCopy(_sTxt){try{clipboardData.setData('Text',_sTxt)}catch(e){}}
function isIE(){return BROWSER.indexOf('ie') > -1;}
function openWindow(_sUrl, _sWidth, _sHeight, _sTitle, _sScroll){var oEdit = new dialog();oEdit.init();oEdit.set('title', _sTitle ? _sTitle : "系统提示信息" );oEdit.set('width', _sWidth);oEdit.set('height', _sHeight);oEdit.open(_sUrl, _sScroll ? 'no' : 'yes');}
function initLoad(){if(BONLOADMARK){for(key in AONLOAD){eval(AONLOAD[key]);}}}
function vbbcode_winshow(c, p){	var i = p.style.display;c.innerHTML	= c.innerHTML == "&lt;&lt;&nbsp;" ? "&gt;&gt;&nbsp;" : "&lt;&lt;&nbsp;"; p.style.display = (i == "") ? "none" : "";}
function onfocus(s){var _sStr; if(exist(s)){_sStr=$(s).value;}else{return;}$(s).focus();if(_sStr!=""){$(s).select();}}
function dwSwf(_sName, _sSrc, _sWidth, _sHeight, _sMode, _aValue){
	var sValue = '';
	var aFlashVars = [];
	if(_aValue){
		for(key in _aValue){
			aFlashVars[aFlashVars.length] = key + "=" + _aValue[key];
		}
		sValue = aFlashVars.join('&');
	}
	_sMode = _sMode ? 'wmode="transparent"' : '';
	return '<embed id="' + _sName + '" name="' + _sName + '" src="' + _sSrc + '" ' + _sMode + ' quality="high" align="top" salign="lt" allowScriptAccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' + _sWidth + '" height="' + _sHeight + '" flashVars="' + sValue + '"></embed>';
}
function addClass(objname,classname){
	var obj = $(objname);
	var arr = obj.className.split(' ');
	if(obj.className.indexOf('A_font_change') == -1){
		arr[length] = classname;
	}else{
		for(var i=0;i<arr.length;i++){
			if(arr[i].indexOf('A_font_change') != -1){
				arr[i] = classname;
				break;
			}
		}
	}
	obj.className = arr.join(' ');
	if($(objname+"_tag")){
		$(objname+"_tag").className = obj.className;
	}
	if(classname.indexOf('big') != -1) setFontSize(16,27);	
	if(classname.indexOf('mid') != -1) setFontSize(14,24);	
	if(classname.indexOf('sml') != -1) setFontSize(12,21);	
	function setFontSize(font_size,line_height){
		$(objname).style.fontSize = font_size+'px';
		$(objname).style.lineHeight = line_height+'px';
		if($(objname+'_tag')){
			$(objname+'_tag').style.fontSize = font_size+'px';
			$(objname+'_tag').style.lineHeight = line_height+'px';
		}
		if($('labeltag')){
			$('labeltag').style.fontSize = font_size+'px';
			$('labeltag').style.lineHeight = line_height+'px';
		}
	}
}
function initSendTime(){
	SENDTIME = new Date();
}
function getSend(){
	var sCurrTime = Math.floor((new Date() - SENDTIME)/1000);
	return sCurrTime < 0 ? 60 : sCurrTime;
}
function sns_resize(_oObj){
	var tMark = true;var iWidth = 0;var sOuterHtml;var aNode = _oObj.attributes;
	for(var i = 0; i < aNode.length; i++){if(aNode[i].specified){if(aNode[i].name == "width" || aNode[i].name == "height"){tMark = false;}}}
	if(tMark){setTimeout("resize()",500);}
	this.resize = function(){if(!_oObj.attributes['RESIZEWIDTH']){return}if(_oObj.width > _oObj.attributes['RESIZEWIDTH'].value){_oObj.width = _oObj.attributes['RESIZEWIDTH'].value;}}
}
function resizeImg(_oObj, _iWidth){
	var tMark = true;var iWidth = 0;var sOuterHtml;var aNode = _oObj.attributes;
	for(var i = 0; i < aNode.length; i++){if(aNode[i].specified){if(aNode[i].name == "width" || aNode[i].name == "height"){tMark = false;}}}
	if(tMark){if(_iWidth){setTimeout("resize()",500);}}
	this.resize = function(){if(_oObj.width > _iWidth){_oObj.width = _iWidth;}}
}
function showCount(writeToDoc,n){
	writeToDoc = writeToDoc == null ? true : writeToDoc;
        try{
                show=n || count;

		show = show + "";
                if(Math.abs(show) > 0){
			var str = "";
                        for(i = show.length; i < 5; i++){show = "0" + show;}
                        for(i = 0; i < show.length; i++){
                                str+="<img id='countPic_"+(show.length-i)+"' alt='" + show.substr(i,1) + "' title='" + show.substr(i,1) + "' src='http://image2.sina.com.cn/blog/tmpl/v3/images/counter/" + COUNTTHEME + "/" + show.substr(i,1) + ".gif'/>";
                        }
			if (writeToDoc) document.write(str);
			return str;
                }
        }
        catch(e){}
}
function handleKeyDown(eEvent){
	var oParent = eEvent.target ? eEvent.target : event.srcElement;
	if(eEvent.keyCode == 9){
		if(eEvent.target){
			var oStart = oParent.selectionStart;
			var oPos = oParent.selectionEnd;
			var sStart = oParent.value.slice(0, oStart);
			var sEnd = oParent.value.slice(oPos);
			oParent.value = sStart + String.fromCharCode(9) + sEnd;
			setTimeout(function(){oParent.focus()}, 200);
			oParent.selectionEnd = oPos + 1;
		}else{
			oParent.selection = document.selection.createRange();
			oParent.selection.text = String.fromCharCode(9);
			eEvent.returnValue = false;
		}
	}
}
function browserDetect(){
	var sUA = navigator.userAgent.toLowerCase();
	var sIE = sUA.indexOf("msie");
	var sOpera = sUA.indexOf("opera");
	var sMoz = sUA.indexOf("gecko");
	if (sOpera != -1) return "opera";
	if (sIE != -1){
		nIeVer = parseFloat(sUA.substr(sIE + 5));
		if (nIeVer >= 6) return "ie6";
		else if (nIeVer >= 5.5) return "ie55";
		else if (nIeVer >= 5 ) return "ie5";
	}
	if (sMoz != -1)	return "moz";
	return "other";
}
var BROWSER = browserDetect();
document.write("<script type='text/javascript' src='/js/" + BROWSER + ".js'></script>");
var CACHE = {"outline":[]};
var CONFIG = {"readfile":""};
var AONLOAD = [];
var SENDTIME = new Date("2005","9","8","10","0","0");
var BONLOADMARK = true; 
function commentSubmit(_sVid){
	var sHomePage = $('form' + _sVid)['homepage'].value;
	var sLoginName = $('form' + _sVid)['loginname'].value;
	var sCheckWd = $('form' + _sVid)['checkwd'].value;
	var sContent = $('form' + _sVid)['content'].value;
	var sDialog = new dialog();
	sDialog.init();
	if(getSend()<60){
		sDialog.event('请不要在短时间内多次提交评论 :)<br/> 您需要耐心等待 ' + (60 - getSend()) + ' 秒后，才能再次发表评论.','');
		sDialog.button('dialogOk','void 0');
		$('dialogOk').focus();
		return false;
	}
	if(sLoginName == ''){
		sDialog.event('请输入您的昵称!','');
		sDialog.button('dialogOk','void 0');
		$('dialogOk').focus();
		return false;
	}
	
	if(sHomePage != '' && sHomePage.substr(0, 7) != 'http://' && sHomePage.length < 8){
		sDialog.event('请输入URL地址!','');
		sDialog.button('dialogOk','void 0');
		$('dialogOk').focus();
		return false;
	}
	
	if(sCheckWd == ''){
		sDialog.event('请输入验证码!','');
		sDialog.button('dialogOk','void 0');
		$('dialogOk').focus();
		return false;
	}
	
	if(sContent == ''){
		sDialog.event('请输入评论内容!','');
		sDialog.button('dialogOk','void 0');
		$('dialogOk').focus();
		return false;
	}
	initSendTime();
	$("src_title" + _sVid).value = $("commentText" + _sVid).innerHTML;
	$("src_uname" + _sVid).value = AUTHOR;$('form' + _sVid).submit();
}
function gbookSubmit(_sVid){
	var sCheckWd = $('form' + _sVid)['checkwd'].value;
	var sContent = $('form' + _sVid)['content'].value;
	var sDialog = new dialog();
	sDialog.init();
	if(getSend()<60){
		sDialog.event('请不要在短时间内多次提交留言 :)<br/> 您需要耐心等待 ' + (60 - getSend()) + ' 秒后，才能再次发表留言.','');
		sDialog.button('dialogOk','void 0');
		$('dialogOk').focus();
		return false;
	}
	if(sCheckWd == ''){
		sDialog.event('请输入验证码!','');
		sDialog.button('dialogOk','void 0');
		$('dialogOk').focus();
		return false;
	}
	
	if(sContent == ''){
		sDialog.event('请输入留言内容!','');
		sDialog.button('dialogOk','void 0');
		$('dialogOk').focus();
		return false;
	}
	initSendTime();
	return true;
}
function getFrameNode(sNode){
	return document.frames ? document.frames[sNode] : document.getElementById(sNode).contentWindow;
}
function checkwd_reload(){
		if (document.getElementById("user_login_info")) {
			ob = getFrameNode("user_login_info").document.getElementById("chk_img");
		}
		else {
       		 ob = document.getElementById("chk_img");
		 }
		SENDTIME = new Date("2005","9","8","10","0","0");
		var chk_img_time =new Date().getTime();
		ob.src = '/myblog/checkwd_image.php?' + chk_img_time;
}

function login_button_reload(){
		if (document.getElementById("user_login_info")) {
			if (getFrameNode("user_login_info").document.getElementById("login_button"))
			{
				lb = getFrameNode("user_login_info").document.getElementById("login_button");
				lb.disabled = false;
			}
		}
		else if(document.getElementById("login_button")){
       		 lb = document.getElementById("login_button");
			 lb.disabled = false;
		 }
}

function load_chk_img(s) { 
	var chk_img_time =new Date().getTime();
	$(s).src='/myblog/checkwd_image.php?'+chk_img_time;
	}

function ResizeSWF(nWidth, nHeight) {
	var swf = $("music");
	var obj = $("musicFlash");
	swf.style.width = nWidth;
	swf.style.height = nHeight;
	obj.width = nWidth;
	obj.height = nHeight;
}
function ResizeFlash(flashId, layerId, nWidth, nHeight) {
	var swf = $(layerId);
	var obj = $(flashId);
	swf.style.width = nWidth;
	swf.style.height = nHeight;
	obj.width = nWidth;
	obj.height = nHeight;
}
function SearchIASK(sString) {
	var _form = document.createElement("form");
	_form.style.display = "none";
	_form.action = "http://m.iask.com/g";
	_form.target = "_blank";
	var _input = document.createElement("input");
	_input.value = "yes";
	_input.name = "utf";
	_form.appendChild(_input);
	var _input = document.createElement("input");
	_input.value = sString;
	_input.name = "k";
	_form.appendChild(_input);
	document.body.appendChild(_form);
	_form.submit();
	_form.parentNode.removeChild(_form);
}
function LocalPlay(sString) {
	window.open(sString);
}
function openPic(sString) {
	window.open(sString);
}
if (top.location != self.location) {
	document.write("<img src='" + "http://counter.blog.sina.com.cn/i.php?url=" + escape(self.location) + "' style='display:none;'/>");
}
var SwfView = {
swfList: new Array(),
Add: function (sURL, sID, sPID, nWidth, nHeight, nVersion, sBGColor, oVar, oParam) {
	if(sURL && sPID) {
		this.swfList[this.swfList.length] = {
			sURL: sURL,
			sID: sID,
			sPID: sPID,
			nWidth: nWidth,
			nHeight: nHeight,
			nVersion: nVersion,
			sBGColor: sBGColor,
			oVar: oVar,
			oParam: oParam
		}
	}
},
Init: function () {
	var so;
	var list = this.swfList;
	for(var i = 0; i < list.length; i ++) {
		so = new SWFObject(list[i]["sURL"], list[i]["sID"], list[i]["nWidth"], list[i]["nHeight"], list[i]["nVersion"], list[i]["sBGColor"]);
		if(list[i]["oVar"]) {
			for(var key in list[i]["oVar"]) {
				so.addVariable(key, list[i]["oVar"][key]);
			}
		}
		if(list[i]["oParam"]) {
			for(var key in list[i]["oParam"]) {
				so.addParam(key, list[i]["oParam"][key]);
			}
		}
		so.write(list[i]["sPID"]);
	}
	list = new Array();
}
};
function callFlash(){$('play_img').src='http://image2.sina.com.cn/blog/tmpl/v3/images/play_img.gif';  window.document.mp3_player.SetVariable("isPlay", "1");$('checkwd').value='';$('checkwd').focus();}
function iframeResize(pid,ph)
{
	var dyniframe   = null;
	if (document.getElementById)
	{
		dyniframe       = document.getElementById(pid);
		if (dyniframe)
		{
			if (dyniframe.contentDocument){
				dyniframe.height = dyniframe.contentDocument.body.scrollHeight;
			}
			else if (dyniframe.document && dyniframe.document.body.scrollHeight)
			{
				iframeheight = ph;
				if(iframeheight==0)
					addLoadEvent(function(){iframeResize(pid,dyniframe.Document.body.scrollHeight)});
				dyniframe.height = iframeheight;
			}
		}
	}
}
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {    
    window.onload = function() {
      oldonload();
      func();
    }
  }
}
if (window.outputOnlyHTML && window.outputWithScript){} else {
var outputOnlyHTML = output;
function outputWithScript(_html, _box){
 _html = _html.replace(/<script([^\>]*?)\/>/img,"<script$1><\/script>");
 var sr = /(<script[^>]*?>)((1|[^1])*?)(<\/script>)/gmi;
 var scripts = "", t=0;
 _html = _html.replace(sr, function (rs, s1, s2, s3){
  scripts += s2+";";
  if (s2 == "" && s1.indexOf("src") != -1){
	var src = s1.match(/src\s*\=\"([^\"]*)\"/)[1];
	var s = document.createElement("script");
	s.src = src.replace(/\&amp\;/gi,"&");
	document.getElementsByTagName("head")[0].appendChild(s);
  }
  return "";
 });
 outputOnlyHTML(_html, _box);
 setTimeout(function(){eval(scripts);},10);
}
output = outputWithScript
}
function $SetPV(obj){
	window.pvData = obj;
	var params = [obj.totalPV].concat(obj.articlesV.split(","));
	for (var i=0;i<params.length;i++){
		params[i] = parseInt(params[i]);
		if (isNaN(params[i])) params[i] = 0;
	}
	setpv.apply(window,params);
	sendLog();
	each($n("script"), 
		function (e){
			if (e.src.match(/hits/)) {
				e.parentNode.removeChild(e);
			}
		})
}

function $n(name){
	return document.getElementsByTagName(name || "*");
}
function getNum(str){
	return parseInt(str.match(/\d+/)[0]);
}

function getByClass(tn, cls){
	var r = [];
	var ar = document.getElementsByTagName(tn);
	for (var i=0; i<ar.length;i++){
		if (ar[i].className == cls) r.push(ar[i]);
	}
	return r;
}
function each (ar,insp){
	var r = [];
	for(var i=0;i<ar.length;i++){
		var x = insp(ar[i],i);
		if (x != null) r.push(x);
	}
	return r;
}
function sendLog(){
	var url = "http://hits.blog.sina.com.cn/i.html?act=2&its=$num$&uid=$uid$&$items$";
	var data = {
		uid:parseInt(UID).toString(16)
	}
	var nids = each($n("script"), 
			function (e){
				return e.src.match(/hits/) ? e.src : null;
			})[0].match(/[an]id\=(.*)/)[1].split(",");
	nids = each(nids, function (i){ return i.length > 6 ? i.substr(10) : i;});
	var oriv = window.pvData.oriAV;
	var newv = window.pvData.articlesV.split(",");
	newv = each(newv, function (i){return parseInt(i);});
	data.items = each(nids,function (nid,i){
		return oriv[i] > newv[i] ? [nid,oriv[i],newv[i]].join(",") : null;
	});
	data.num = data.items.length;
	data.items = data.items.join(";");
	if (data.num == 0) return;
	url = url.replace(/\$(.*?)\$/g,
			function (a,b){ return data[b]; });
	
	
	var img = $c("img");
	img.style.cssText = "display:none;";
	setTimeout(function(){
		img.src = url;
		document.body.appendChild(img);
	},5000);


}




function setpv(n){
	updateCount(n);
	args = [];
	for (var i=0;i<arguments.length;i++) args[i] = arguments[i+1];
	var fls = each(getByClass("table","function"),function(a){return a.getElementsByTagName("td")[0]});
	window.pvData.oriAV = [];
	for (i=0;i < fls.length;i++){
		var idx = 3;
		var o = null;
		while (!o && idx>=0){
			o = fls[i].getElementsByTagName("a")[idx];
			if (o){
				var ih = o.innerHTML;
				if (ih.match(/\(/) == null) o = null;
			}
			idx--;
		}
		if (!o) continue;
		var str = o.innerHTML, num = getNum(str);
		window.pvData.oriAV[i]=num;
		if (args[i] > num)
			o.innerHTML = o.innerHTML.replace(/\(.*\)/,"("+args[i]+")");
	}                                                               
}

function updateCount(n){
	if (n<count) return;
	var n1 = document.getElementById("countPic_"+1);
	if (n1 == null) return;
	var p = n1.parentNode;
	var str = showCount(false,n);
	p.innerHTML = "<br/>"+str;


}
function parseParam(url){
	var match = url.trim().match(/([^?#]*)(#.*)?$/);
	if (!match) return {};

	var query = match[1];
	var o = {};
	query.replace(/([^&=]*)(?:\=([^&]*))?/gim,function (w,n,v){
        	var value = v;
        	o[n] = value;
	});
	return o;
	
}
function Url(url){
	this.url = url;
	this.parse();
	
}
(function (){
	var proto = {
		parse : function (){
			this.parseAnchor();
			this.parseParam();
		},
		parseAnchor : function (){
			var anchor = this.url.match(/\#(.*)/);
			anchor = anchor ? anchor[1] : null;
			if (anchor != null){
				this.anchor = anchor;
				this.url = this.url.replace(/\#.*/,"");
			}
		},
		parseParam : function (){
			query = this.url.match(/\?(.*)/);
			query = query ? query[1] : null;
			if (query != null){
				this.url = this.url.replace(/\?.*/,"");
				this.query = parseParam(query);
			}
		},
		clearParam : function (){
			this.query = null;
		},
		setParam : function (name,value){
			this.query = this.query || {};
			this.query[name]=value;
		},
		setParams : function (o){
			this.query = o;
		},
		serialize : function (o){
			var ar = [];
			for (var i in o){
				if (i != null && i !="") ar.push(i+"="+o[i]);
			}
			return ar.join("&");
		},
		toStr : function (){
			return this.url	+ (this.query ? "?" + this.serialize(this.query) : "") + (this.anchor ? "#" + this.anchor : "");
		}

	};
	for (var i in proto) Url.prototype[i] = proto[i];
})();

function watchForceRefresh(){
	var callee = arguments.callee;
	var watcher = function (){
		var uo = new Url(location.href);
		var reg = /_forceRefreshAtOnce_/g;
		if (reg.test(uo.anchor)){
			uo.anchor = uo.anchor.split("_");
			each(uo.anchor, function(e,i){
				if (e == "forceRefreshAtOnce" || e == "" || e =="stamp") uo.anchor.splice(i,1);
			});
			uo.anchor = uo.anchor.join("_");
			uo.setParam("stamp", Math.round(Math.random()*100000));
			
			location.href = uo.toStr();
			if (callee.handler) window.clearInterval(callee.handler);
		}
	}
	callee.handler = window.setInterval(watcher,500);
}
/* get url for adding a page view account to hits.
 * used for subcontent included in pv calculate but without articles
 * @param option : instruct how to ping pv
 * 	{
 * 		once	:	only ping once for this time & cancel subsequeence pingPV invoking
 *		slave	:	ping only when 
 *	}
 */
function pingPV(option){
	option = option || {};
	if (option.once){
		top.$Pinged = true;
	} else if (option.slave) {
		if (top.$Pinged == null) {
			setTimeout(function (){
				pingPV.apply(this,[option]);
				},500);
			return;
		} else if (top.$Pinged == true){
			top.$Pinged = false;
			return;
		}
	}
	var id = parseInt(UID);
	id = id.toString(16);
	var src = "http://hits.blog.sina.com.cn/hits?act=2&its=0&uid=" + id + "&nid=pic";
	var e = document.createElement("script");
	e.src=src;
	document.body.appendChild(e);
}

/**
*/
function $SetCommentsNum(ar){
	return;
	var functionTags = document.getElementsByTagName("table");
	functionTags = each(functionTags, function (e, i){
			return e.className == "function" ? e : null;
	});		
	var commentTags = each(functionTags, function (e, i){
			var tags = e.getElementsByTagName("a");
			var a = each(tags, function (e){
				if (e.id == "comment") return e
			});
			return a[0];
	});

	each(commentTags, function (e,i){
		var txt = e.innerHTML;
		e.innerHTML = txt.replace(/\(.*\)/, "(" + ar[i] + ")");
	});
}

function loadCommentAccount(ar){
	
	ar = ar || "";
	//var uo = "http: //util.blog.sina.com.cn/cms?" + ar.join(",");
	var uo = "http://util.blog.sina.com.cn/cms?" + ar;
	uo += "&" + Math.random();
	var selm = document.createElement("script");
	selm.src = uo;
	document.body.appendChild(selm);
}

function appendToBody(el){
	try{
		document.body.appendChild(el);
	} catch (e){
		setTimeout(function (){
			appendToBody(el);
		},500);
	}
}
function dwScript(src){
	document.write("<script src='" + src + "'><\/script>");
}
function createScriptLoadTag(url){
	var s = document.createElement("script");
	s.id = "loader_"+Math.random();
	s.src=url;
	appendToBody(s);
	return s.id;
}
function loadProfileConfig(uid){
	if (uid == null) throw new Error("not a valid uid");
 	uid = uid + "";			//convert to string
	if (uid.length != 10) {		//hex uid,convert to dec
		uid = parseInt(uid,16) + "";
	}
	var url = "http://util.blog.sina.com.cn/blgcss?" + uid;
 	dwScript(url); 
}


//for fl
function setFlLoc(uid,ltype){
	this.href='#'+ltype;
	get('/sns/service.php?m='+ltype+'&uid='+uid, '/xsl/friend.xsl', ltype+'070522_1', 'output', 'box_2');
}
function sendmessage(uid){
	bcDialog.show("http://blog.sina.com.cn/myblog/message/send_message.php?toid=" + uid, 274, 100);
	bc.hidden();
}
//for log
function addHTML(oParentNode, sHTML) {
	if(window.addEventListener) {// for MOZ
		var oRange = oParentNode.ownerDocument.createRange();
		oRange.setStartBefore(oParentNode);
		var oFrag = oRange.createContextualFragment(sHTML);
		oParentNode.appendChild(oFrag);
	}
	else {// for IE5+
		oParentNode.insertAdjacentHTML("BeforeEnd", sHTML);
	}
}
function friendListSendLog(_type) {
	addHTML(document.body, "<img style='display: none;' src='http://stat.blog.sina.com.cn/i.html?fl&" + _type + "&nick&" + new Date().valueOf() + "'>");
	return false; 
}
var IframeView = {
         iframeList: new Array(),
         Add: function (sURL, sPID) {
                   if(sURL && sPID) {
                            this.iframeList[this.iframeList.length] = {
                                     sURL: sURL,
                                     sPID: sPID
                            }
                   }
         },
         Init: function () {
                   var list = this.iframeList;
                   for(var i = 0; i < list.length; i ++) {
                            document.getElementById(list[i].sPID).src = list[i].sURL;
                   }
                   list = new Array();
         }
};
