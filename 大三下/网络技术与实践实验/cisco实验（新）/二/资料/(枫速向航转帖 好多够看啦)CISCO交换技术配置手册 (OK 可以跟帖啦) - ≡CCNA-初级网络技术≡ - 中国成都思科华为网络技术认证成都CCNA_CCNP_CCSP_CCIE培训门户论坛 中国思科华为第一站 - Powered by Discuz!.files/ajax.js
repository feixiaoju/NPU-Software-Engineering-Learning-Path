/*
	[Discuz!] (C)2001-2007 Comsenz Inc.
	This is NOT a freeware, use is subject to license terms

	$RCSfile: ajax.js,v $
	$Revision: 1.17.2.25 $
	$Date: 2007/03/21 15:53:02 $
*/
var Ajaxs = new Array();
function Ajax(recvType, statusId) {
	var aj = new Object();
	aj.statusId = statusId ? document.getElementById(statusId) : null;
	aj.targetUrl = '';
	aj.sendString = '';
	aj.recvType = recvType ? recvType : 'XML';
	aj.resultHandle = null;

	aj.createXMLHttpRequest = function() {
		var request = false;
		if(window.XMLHttpRequest) {
			request = new XMLHttpRequest();
			if(request.overrideMimeType) {
				request.overrideMimeType('text/xml');
			}
		} else if(window.ActiveXObject) {
			var versions = ['Microsoft.XMLHTTP', 'MSXML.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.7.0', 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];
			for(var i=0; i<versions.length; i++) {
				try {
					request = new ActiveXObject(versions[i]);
					if(request) {
						return request;
					}
				} catch(e) {
					//alert(e.message);
				}
			}
		}
		return request;
	}

	aj.XMLHttpRequest = aj.createXMLHttpRequest();

	aj.processHandle = function() {
		if(aj.statusId) {
			aj.statusId.style.display = '';
		}
		if(aj.XMLHttpRequest.readyState == 1 && aj.statusId) {
			aj.statusId.innerHTML = xml_http_building_link;
		} else if(aj.XMLHttpRequest.readyState == 2 && aj.statusId) {
			aj.statusId.innerHTML = xml_http_sending;
		} else if(aj.XMLHttpRequest.readyState == 3 && aj.statusId) {
			aj.statusId.innerHTML = xml_http_loading;
		} else if(aj.XMLHttpRequest.readyState == 4) {
			if(aj.XMLHttpRequest.status == 200) {
				for(k in Ajaxs) {
					if(Ajaxs[k] == aj.targetUrl) {
						Ajaxs[k] = null;
					}
				}

				if(aj.statusId) {
					aj.statusId.innerHTML = xml_http_data_in_processed;
					aj.statusId.style.display = 'none';
				}
				if(aj.recvType == 'HTML') {
					aj.resultHandle(aj.XMLHttpRequest.responseText, aj);
				} else if(aj.recvType == 'XML') {
					aj.resultHandle(aj.XMLHttpRequest.responseXML.lastChild.firstChild.nodeValue, aj);
				}
			} else {
				if(aj.statusId) {
					aj.statusId.innerHTML = xml_http_load_failed;
				}
			}
		}
	}

	aj.get = function(targetUrl, resultHandle) {
		if(in_array(targetUrl, Ajaxs)) {
			return false;
		} else {
			arraypush(Ajaxs, targetUrl);
		}
		aj.targetUrl = targetUrl;
		aj.XMLHttpRequest.onreadystatechange = aj.processHandle;
		aj.resultHandle = resultHandle;
		if(window.XMLHttpRequest) {
			aj.XMLHttpRequest.open('GET', aj.targetUrl);
			aj.XMLHttpRequest.send(null);
		} else {
		        aj.XMLHttpRequest.open("GET", targetUrl, true);
		        aj.XMLHttpRequest.send();
		}
	}

	aj.post = function(targetUrl, sendString, resultHandle) {
		if(in_array(targetUrl, Ajaxs)) {
			return false;
		} else {
			arraypush(Ajaxs, targetUrl);
		}
		aj.targetUrl = targetUrl;
		aj.sendString = sendString;
		aj.XMLHttpRequest.onreadystatechange = aj.processHandle;
		aj.resultHandle = resultHandle;
		aj.XMLHttpRequest.open('POST', targetUrl);
		aj.XMLHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		aj.XMLHttpRequest.send(aj.sendString);
	}
	return aj;
}

function ajaxmenu(e, ctrlid, timeout, func, cache) {
	if(jsmenu['active'][0] && jsmenu['active'][0].ctrlkey == ctrlid) {
		doane(e);
		return;
	} else if(is_ie && is_ie < 7 && document.readyState.toLowerCase() != 'complete') {
		return;
	}
	if(isUndefined(timeout)) timeout = 3000;
	if(isUndefined(func)) func = '';
	if(isUndefined(cache)) cache = 1;

	var div = $(ctrlid + '_menu');
	if(cache && div) {
		showMenu(ctrlid, true, 0, 0, timeout);
		if(func) setTimeout(func + '(' + ctrlid + ')', timeout);
		doane(e);
	} else {
		if(!div) {
			div = document.createElement('div');
			div.id = ctrlid + '_menu';
			div.style.display = 'none';
			div.className = 'popupmenu_popup';
			div.title = 'menu';
			document.body.appendChild(div);
		}
		var x = new Ajax();
		x.get($(ctrlid).href + '&inajax=1', function(s) {
			if(s.substr(0, 25) == '<div id="attackevasive_1"') {
				alert(String.fromCharCode(39057,32321,21047,26032,38480,21046) + '\n' + String.fromCharCode(24744,35775,38382,26412,31449,36895,24230,36807,24555,25110,32773,21047,26032,38388,38548,26102,38388,23567,20110,20004,31186,65281));
				return;
			}
			div.innerHTML = '<div class="popupmenu_option">' + s + '</div>';
			showMenu(ctrlid, true, 0, 0, timeout);
			if(func) setTimeout(func + '(' + ctrlid + ')', timeout);
			if(!cache) setTimeout('document.body.removeChild(' + div.id + ')', timeout);
		});
		doane(e);
	}
}

function updatesecqaa() {
	var x = new Ajax();
	x.get('ajax.php?action=updatesecqaa&inajax=1', function(s) {
		$('secquestion').innerHTML = s;
	});
}

function ignorepm(e) {
	var x = new Ajax();
	x.get('pm.php?action=noprompt&inajax=1', function(s) {
		$('pmprompt').style.display = 'none';
	});
	doane(e);
}

var presmtbl = 'smtbl_1';
function getSmilies(event) {
	if(!isUndefined(event)) {
		var obj = is_ie ? event.srcElement : event.target;
		var page = obj.href.replace(/.*\?page=(\d+)/ig, function($1, $2) {return $2;});
	} else {
		var page = getcookie('smpage');
	}
	setcookie('smpage', page, 86400 * 3);
	var currsmtbl = 'smtbl_' + page;
	if(!$(currsmtbl)) {
		var div = document.createElement('div');
		div.id = currsmtbl;
		$('smiliestable').appendChild(div);
		var x = new Ajax();
		x.get('post.php?action=smilies&inajax=1&page=' + page, function(s) {
			if(s.substr(0, 25) == '<div id="attackevasive_1"') {
				$('smiliestable').removeChild(div);
				alert(String.fromCharCode(39057,32321,21047,26032,38480,21046) + '\n' + String.fromCharCode(24744,35775,38382,26412,31449,36895,24230,36807,24555,25110,32773,21047,26032,38388,38548,26102,38388,23567,20110,20004,31186,65281));
				return;
			}
			if(presmtbl) $(presmtbl).style.display = 'none';
			div.innerHTML = s;
			presmtbl = currsmtbl;
		});
	} else {
		$(currsmtbl).style.display = '';
		if(presmtbl && presmtbl != currsmtbl) $(presmtbl).style.display = 'none';
		presmtbl = currsmtbl;
	}
}