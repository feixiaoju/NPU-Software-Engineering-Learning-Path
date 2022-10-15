/*
	[Discuz!] (C)2001-2007 Comsenz Inc.
	This is NOT a freeware, use is subject to license terms

	$RCSfile: common.js,v $
	$Revision: 1.41.2.14 $
	$Date: 2007/03/23 15:31:51 $
*/

var sPop = null;
var postSubmited = false;
var smdiv = new Array();

var userAgent = navigator.userAgent.toLowerCase();
var is_webtv = userAgent.indexOf('webtv') != -1;
var is_kon = userAgent.indexOf('konqueror') != -1;
var is_mac = userAgent.indexOf('mac') != -1;
var is_saf = userAgent.indexOf('applewebkit') != -1 || navigator.vendor == 'Apple Computer, Inc.';
var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
var is_moz = (navigator.product == 'Gecko' && !is_saf) && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
var is_ns = userAgent.indexOf('compatible') == -1 && userAgent.indexOf('mozilla') != -1 && !is_opera && !is_webtv && !is_saf;
var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera && !is_saf && !is_webtv) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);

function ctlent(event, clickactive) {
	if(postSubmited == false && (event.ctrlKey && event.keyCode == 13) || (event.altKey && event.keyCode == 83) && $('postsubmit')) {
		if(in_array($('postsubmit').name, ['topicsubmit', 'replysubmit', 'editsubmit', 'pmsubmit']) && !validate($('postform'))) {
			doane(event);
			return;
		}
		postSubmited = true;
		if(!isUndefined(clickactive) && clickactive) {
			$('postsubmit').click();
			$('postsubmit').disabled = true;
		} else {
			$('postsubmit').disabled = true;
			$('postform').submit();
		}
	}
}

function storeCaret(textEl){
	if(textEl.createTextRange){
		textEl.caretPos = document.selection.createRange().duplicate();
	}
}

function checkall(form, prefix, checkall) {
	var checkall = checkall ? checkall : 'chkall';
	for(var i = 0; i < form.elements.length; i++) {
		var e = form.elements[i];
		if(e.name != checkall && (!prefix || (prefix && e.name.match(prefix)))) {
			e.checked = form.elements[checkall].checked;
		}
	}
}

function arraypop(a) {
	if(typeof a != 'object' || !a.length) {
		return null;
	} else {
		var response = a[a.length - 1];
		a.length--;
		return response;
	}
}

function arraypush(a, value) {
	a[a.length] = value;
	return a.length;
}


function findtags(parentobj, tag) {
	if(!isUndefined(parentobj.getElementsByTagName)) {
		return parentobj.getElementsByTagName(tag);
	} else if(parentobj.all && parentobj.all.tags) {
		return parentobj.all.tags(tag);
	} else {
		return null;
	}
}

function copycode(obj) {
	if(is_ie && obj.style.display != 'none') {
		var rng = document.body.createTextRange();
		rng.moveToElementText(obj);
		rng.scrollIntoView();
		rng.select();
		rng.execCommand("Copy");
		rng.collapse(false);
	}
}

function attachimg(obj, action, text) {
	if(action == 'load') {
		if(obj.width > screen.width * 0.7) {
			obj.resized = true;
			obj.width = screen.width * 0.7;
			obj.alt = text;
		}
		obj.onload = null;
	} else if(action == 'mouseover') {
		if(obj.resized) {
			obj.style.cursor = 'pointer';
		}
	} else if(action == 'click') {
		if(!obj.resized) {
			return false;
		} else {
			window.open(text);
		}
	}
}

function attachimginfo(obj, infoobj, show, event) {
	var left_offset = obj.offsetLeft;
	var top_offset = obj.offsetTop;
	var width_offset = obj.offsetWidth;
	var height_offset = obj.offsetHeight;
	while ((obj = obj.offsetParent) != null) {
		left_offset += obj.offsetLeft;
		top_offset += obj.offsetTop;
	}
	if(show) {
		$(infoobj).style.position = 'absolute';
		$(infoobj).style.left = left_offset + 3;
		$(infoobj).style.top = height_offset < 40 ? top_offset + height_offset : top_offset + 3;
		$(infoobj).style.display = '';
	} else {
		if(is_ie) {
			$(infoobj).style.display = 'none';
			return;
		} else {
			var mousex = document.body.scrollLeft + event.clientX;
			var mousey = document.body.scrollTop + event.clientY;
			if(mousex < left_offset || mousex > left_offset + width_offset || mousey < top_offset || mousey > top_offset + height_offset) {
				$(infoobj).style.display = 'none';
			}
		}
	}
}

function setcopy(text, alertmsg){
	if(is_ie) {
		clipboardData.setData('Text', text);
		alert(alertmsg);
	} else {
		prompt('Please press "Ctrl+C" to copy this text', text);
	}
}

function toggle_collapse(objname, unfolded) {
	if(isUndefined(unfolded)) {
		var unfolded = 1;
	}
	var obj = $(objname);
	var oldstatus = obj.style.display;
	var collapsed = getcookie('discuz_collapse');
	var cookie_start = collapsed ? collapsed.indexOf(objname) : -1;
	var cookie_end = cookie_start + objname.length + 1;

	obj.style.display = oldstatus == 'none' ? '' : 'none';
	collapsed = cookie_start != -1 && ((unfolded && oldstatus == 'none') || (!unfolded && oldstatus == '')) ?
			collapsed.substring(0, cookie_start) + collapsed.substring(cookie_end, collapsed.length) : (
			cookie_start == -1 && ((unfolded && oldstatus == '') || (!unfolded && oldstatus == 'none')) ?
			collapsed + objname + ' ' : collapsed);

	setcookie('discuz_collapse', collapsed, (collapsed ? 86400 * 30 : -(86400 * 30 * 1000)));

	if(img = $(objname + '_img')) {
		var img_regexp = new RegExp((oldstatus == 'none' ? '_yes' : '_no') + '\\.gif$');
		var img_re = oldstatus == 'none' ? '_no.gif' : '_yes.gif';
		img.src = img.src.replace(img_regexp, img_re);
	}
	if(symbol = $(objname + '_symbol')) {
		symbol.innerHTML = symbol.innerHTML == '+' ? '-' : '+';
	}
}

function imgzoom(o) {
	if(event.ctrlKey) {
		var zoom = parseInt(o.style.zoom, 10) || 100;
		zoom -= event.wheelDelta / 12;
		if(zoom > 0) {
			o.style.zoom = zoom + '%';
		}
		return false;
	} else {
		return true;
	}
}

function getcookie(name) {
	var cookie_start = document.cookie.indexOf(name);
	var cookie_end = document.cookie.indexOf(";", cookie_start);
	return cookie_start == -1 ? '' : unescape(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));
}

function setcookie(cookieName, cookieValue, seconds, path, domain, secure) {
	var expires = new Date();
	expires.setTime(expires.getTime() + seconds);
	document.cookie = escape(cookieName) + '=' + escape(cookieValue)
		+ (expires ? '; expires=' + expires.toGMTString() : '')
		+ (path ? '; path=' + path : '/')
		+ (domain ? '; domain=' + domain : '')
		+ (secure ? '; secure' : '');
}

function AddText(txt) {
	obj = $('postform').message;
	selection = document.selection;
	checkFocus();
	if(!isUndefined(obj.selectionStart)) {
		var opn = obj.selectionStart + 0;
		obj.value = obj.value.substr(0, obj.selectionStart) + txt + obj.value.substr(obj.selectionEnd);
	} else if(selection && selection.createRange) {
		var sel = selection.createRange();
		sel.text = txt;
		sel.moveStart('character', -strlen(txt));
	} else {
		obj.value += txt;
	}
}

function insertAtCaret(textEl, text){
	if(textEl.createTextRange && textEl.caretPos){
		var caretPos = textEl.caretPos;
		caretPos.text += caretPos.text.charAt(caretPos.text.length - 2)	== ' ' ? text +	' ' : text;
	} else if(textEl) {
		textEl.value +=	text;
	} else {
		textEl.value = text;
	}
}

function checkFocus() {
	var obj = typeof wysiwyg == 'undefined' || !wysiwyg ? $('postform').message : editwin;
	if(!obj.hasfocus) {
		obj.focus();
	}
}

function setCaretAtEnd() {
	var obj = typeof wysiwyg == 'undefined' || !wysiwyg ? $('postform').message : editwin;
	if(typeof wysiwyg != 'undefined' && wysiwyg) {
		if(is_moz || is_opera) {

		} else {
			var sel = editdoc.selection.createRange();
			sel.moveStart('character', strlen(getEditorContents()));
			sel.select();
		}
	} else {
		if(obj.createTextRange)  {
			var sel = obj.createTextRange();
			sel.moveStart('character', strlen(obj.value));
			sel.collapse();
			sel.select();
		}
	}
}

function strlen(str) {
	return (is_ie && str.indexOf('\n') != -1) ? str.replace(/\r?\n/g, '_').length : str.length;
}

function mb_strlen(str) {
	var len = 0;
	for(var i = 0; i < str.length; i++) {
		len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? (charset == 'utf-8' ? 3 : 2) : 1;
	}
	return len;
}

function insertSmiley(smilieid) {
	checkFocus();
	var src = $('smilie_' + smilieid).src;
	var code = $('smilie_' + smilieid).pop;
	if(typeof wysiwyg != 'undefined' && wysiwyg && allowsmilies && (!$('smileyoff') || $('smileyoff').checked == false)) {
		if(is_moz) {
			applyFormat('InsertImage', false, src);
			var smilies = findtags(editdoc.body, 'img');
			for(var i = 0; i < smilies.length; i++) {
				if(smilies[i].src == src && smilies[i].getAttribute('smilieid') < 1) {
					smilies[i].setAttribute('smilieid', smilieid);
					smilies[i].setAttribute('border', "0");
				}
			}
		} else {
			insertText('<img src="' + src + '" border="0" smilieid="' + smilieid + '" alt="" /> ', false);
		}
	} else {
		code += ' ';
		AddText(code);
	}
}

function smileyMenu(ctrl) {
	ctrl.style.cursor = 'pointer';
	if(ctrl.alt) {
		ctrl.pop = ctrl.alt;
		ctrl.alt = '';
	}
	if(ctrl.title) {
		ctrl.lw = ctrl.title;
		ctrl.title = '';
	}
	if(!smdiv[ctrl.id]) {
		smdiv[ctrl.id] = document.createElement('div');
		smdiv[ctrl.id].id = ctrl.id + '_menu';
		smdiv[ctrl.id].style.display = 'none';
		smdiv[ctrl.id].className = 'popupmenu_popup';
		ctrl.parentNode.appendChild(smdiv[ctrl.id]);
	}
	smdiv[ctrl.id].innerHTML = '<table style="width: 60px;height: 60px;text-align: center;vertical-align: middle;" class="altbg2"><tr><td><img src="' + ctrl.src + '" border="0" width="' + ctrl.lw + '" /></td></tr></table>';
	showMenu(ctrl.id, 0, 0, 1, 0);
}

function announcement() {
	$('announcement').innerHTML = '<marquee style="margin: 0px 8px" direction="left" scrollamount="2" scrolldelay="1" onMouseOver="this.stop();" onMouseOut="this.start();">' +
		$('announcement').innerHTML + '</marquee>';
	$('announcement').style.display = 'block';
}

function $(id) {
	return document.getElementById(id);
}

function in_array(needle, haystack) {
	if(typeof needle == 'string') {
		for(var i in haystack) {
			if(haystack[i] == needle) {
					return true;
			}
		}
	}
	return false;
}

function saveData(data, del) {
	if(!data && isUndefined(del)) {
		return;
	}
	if(typeof wysiwyg != 'undefined' && typeof editorid != 'undefined' && typeof bbinsert != 'undefined' && bbinsert && $(editorid + '_mode') && $(editorid + '_mode').value == 1) {
		data = html2bbcode(data);
	}
	if(is_ie) {
		try {
			var oXMLDoc = textobj.XMLDocument;
			var root = oXMLDoc.firstChild;
			if(root.childNodes.length > 0) {
				root.removeChild(root.firstChild);
			}
			var node = oXMLDoc.createNode(1, 'POST', '');
			var oTimeNow = new Date();
			oTimeNow.setHours(oTimeNow.getHours() + 24);
			textobj.expires = oTimeNow.toUTCString();
			node.setAttribute('message', data);
			oXMLDoc.documentElement.appendChild(node);
			textobj.save('Discuz!');
		} catch(e) {}
	} else if(window.sessionStorage) {
		try {
			sessionStorage.setItem('Discuz!', data);
		} catch(e) {}
	}
}

function loadData() {
	var message = '';
	if(is_ie) {
		try {
			textobj.load('Discuz!');
			var oXMLDoc = textobj.XMLDocument;
			var nodes = oXMLDoc.documentElement.childNodes;
			message = nodes.item(nodes.length - 1).getAttribute('message');
		} catch(e) {}
	} else if(window.sessionStorage) {
		try {
			message = sessionStorage.getItem('Discuz!');
		} catch(e) {}
	}

	if(in_array((message = trim(message)), ['', 'null', 'false', null, false])) {
		alert(lang['post_autosave_none']);
		return;
	}
	if((typeof wysiwyg == 'undefined' || !wysiwyg ? textobj.value : editdoc.body.innerHTML) == '' || confirm(lang['post_autosave_confirm'])) {
		if(typeof wysiwyg == 'undefined' || !wysiwyg) {
			textobj.value = message;
		} else {
			editdoc.body.innerHTML = bbcode2html(message);
		}
	}
}

function deleteData() {
	if(is_ie) {
		saveData('', 'delete');
	} else if(window.sessionStorage) {
		try {
			sessionStorage.removeItem('Discuz!');
		} catch(e) {}
	}
}

function updateseccode(width, height) {
	$('seccodeimage').innerHTML = '<img id="seccode" onclick="updateseccode(' + width + ', '+ height + ')" width="' + width + '" height="' + height + '" src="seccode.php?update=' + Math.random() + '" class="absmiddle" alt="" />';
}

function signature(obj) {
	if(obj.style.maxHeightIE != '') {
		var height = (obj.scrollHeight > parseInt(obj.style.maxHeightIE)) ? obj.style.maxHeightIE : obj.scrollHeight;
		if(obj.innerHTML.indexOf('<IMG ') == -1) {
			obj.style.maxHeightIE = '';
		}
		return height;
	}
}

function trim(str) {
	return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '');
}

function fetchCheckbox(cbn) {
	return $(cbn) && $(cbn).checked == true ? 1 : 0;
}

function parseurl(str, mode) {
	str = str.replace(/([^>=\]"'\/]|^)((((https?|ftp):\/\/)|www\.)([\w\-]+\.)*[\w\-\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&~`@':+!]*)+\.(jpg|gif|png|bmp))/ig, mode == 'html' ? '$1<img src="$2" border="0">' : '$1[img]$2[/img]');
	str = str.replace(/([^>=\]"'\/@]|^)((((https?|ftp|gopher|news|telnet|rtsp|mms|callto|bctp|ed2k):\/\/)|www\.)([\w\-]+\.)*[:\.@\-\w\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&~`@':+!#]*)*)/ig, mode == 'html' ? '$1<a href="$2" target="_blank">$2</a>' : '$1[url]$2[/url]');
	str = str.replace(/([^\w>=\]:"'\.\/]|^)(([\-\.\w]+@[\.\-\w]+(\.\w+)+))/ig, mode == 'html' ? '$1<a href="mailto:$2">$2</a>' : '$1[email]$2[/email]');
	return str;
}

function isUndefined(variable) {
	return typeof variable == 'undefined' ? true : false;
}

function addbookmark(url, site){
	if(is_ie) {
		window.external.addFavorite(url, site);
	} else {
		alert('Please press "Ctrl+D" to add bookmark');
	}
}

function doane(event) {
	e = event ? event : window.event ;
	if(is_ie) {
		e.returnValue = false;
		e.cancelBubble = true;
	} else {
		e.stopPropagation();
		e.preventDefault();
	}
}
