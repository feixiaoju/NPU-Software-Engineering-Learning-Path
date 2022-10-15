/*
	[Discuz!] (C)2001-2007 Comsenz Inc.
	This is NOT a freeware, use is subject to license terms

	$RCSfile: menu.js,v $
	$Revision: 1.27.2.18 $
	$Date: 2007/03/23 23:31:12 $
*/

var jsmenu = new Array();
jsmenu['active'] = new Array();
jsmenu['timer'] = new Array();
jsmenu['iframe'] = new Array();

function initCtrl(ctrlobj, click, duration, timeout, layer) {
	if(ctrlobj && !ctrlobj.initialized) {
		ctrlobj.initialized = true;
		ctrlobj.unselectable = true;

		ctrlobj.outfunc = typeof ctrlobj.onmouseout == 'function' ? ctrlobj.onmouseout : null;
		ctrlobj.onmouseout = function() {
			if(this.outfunc) this.outfunc();
			if(duration < 3) jsmenu['timer'][ctrlobj.id] = setTimeout('hideMenu(' + layer + ')', timeout);
		}

		if(click && duration) {
			ctrlobj.clickfunc = typeof ctrlobj.onclick == 'function' ? ctrlobj.onclick : null;
			ctrlobj.onclick = function (e) {
				doane(e);
				if(jsmenu['active'][layer] == null || jsmenu['active'][layer].ctrlkey != this.id) {
					if(this.clickfunc) this.clickfunc();
					else showMenu(this.id, true);
				} else {
					hideMenu(layer);
				}
			}
		}

		ctrlobj.overfunc = typeof ctrlobj.onmouseover == 'function' ? ctrlobj.onmouseover : null;
		ctrlobj.onmouseover = function(e) {
			doane(e);
			if(this.overfunc) this.overfunc();
			if(click) {
				clearTimeout(jsmenu['timer'][this.id]);
			} else {
				for(var id in jsmenu['timer']) {
					if(jsmenu['timer'][id]) clearTimeout(jsmenu['timer'][id]);
				}
			}
		}
	}
}

function initMenu(ctrlid, menuobj, duration, timeout, layer) {
	if(menuobj && !menuobj.initialized) {
		menuobj.initialized = true;
		menuobj.ctrlkey = ctrlid;
		menuobj.onclick = ebygum;
		menuobj.style.position = 'absolute';
		if(duration < 3) {
			if(duration > 1) {
				menuobj.onmouseover = function() {
					clearTimeout(jsmenu['timer'][ctrlid]);
				}
			}
			if(duration != 1) {
				menuobj.onmouseout = function() {
					jsmenu['timer'][ctrlid] = setTimeout('hideMenu(' + layer + ')', timeout);
				}
			}
		}
		menuobj.style.zIndex = 50;
		if(is_ie && !is_mac) {
			menuobj.style.filter += "progid:DXImageTransform.Microsoft.shadow(direction=135,color=#CCCCCC,strength=2)";
		}
		initMenuContents(menuobj);
	}
}

function initMenuContents(menuobj) {
	if(menuobj.title == 'menu') {
		menuobj.style.filter += "progid:DXImageTransform.Microsoft.Alpha(opacity=85,finishOpacity=100,style=0)";
		menuobj.style.opacity = 0.85;
		menuobj.title = '';
	} else {
		var tds = findtags(menuobj, 'td');
		for(var i = 0; i < tds.length; i++) {
			if(tds[i].className == 'popupmenu_option' || tds[i].className == 'editor_colornormal') {
				if(is_ie && !is_mac) {
					tds[i].style.filter += "progid:DXImageTransform.Microsoft.Alpha(opacity=85,finishOpacity=100,style=0)";
				}
				tds[i].style.opacity = 0.85;
				if(tds[i].title && tds[i].title == 'nohighlight') {
					tds[i].title = '';
				} else {
					tds[i].ctrlkey = this.ctrlkey;
					if(tds[i].className != 'editor_colornormal') {
						tds[i].onmouseover = menuoption_onmouseover;
						tds[i].onmouseout = menuoption_onmouseout;
					}
					if(typeof tds[i].onclick == 'function') {
						tds[i].clickfunc = tds[i].onclick;
						tds[i].onclick = menuoption_onclick_function;
					} else {
						tds[i].onclick = menuoption_onclick_link;
					}
					if(!is_saf && !is_kon)	{
						try {
							links = findtags(tds[i], 'a');
							for(var j = 0; j < links.length; j++) {
								if(isUndefined(links[j].onclick)) {
									links[j].onclick = ebygum;
								}
							}
						}
						catch(e) {}
					}
				}
			}
		}
	}
}

function showMenu(ctrlid, click, offset, duration, timeout, layer, showid, maxh) {
	var ctrlobj = $(ctrlid);
	if(!ctrlobj) return;
	if(isUndefined(click)) click = false;
	if(isUndefined(offset)) offset = 0;
	if(isUndefined(duration)) duration = 2;
	if(isUndefined(timeout)) timeout = 500;
	if(isUndefined(layer)) layer = 0;
	if(isUndefined(showid)) showid = ctrlid;
	var showobj = $(showid);
	var menuobj = $(showid + '_menu');
	if(!showobj|| !menuobj) return;
	if(isUndefined(maxh)) maxh = 400;

	hideMenu(layer);

	for(var id in jsmenu['timer']) {
		if(jsmenu['timer'][id]) clearTimeout(jsmenu['timer'][id]);
	}

	initCtrl(ctrlobj, click, duration, timeout, layer);
	initMenu(ctrlid, menuobj, duration, timeout, layer);

	menuobj.style.display = '';
	if(!is_opera) {
		menuobj.style.clip = 'rect(auto, auto, auto, auto)';
	}

	var showobj_pos = fetchOffset(showobj);
	var showobj_x = showobj_pos['left'];
	var showobj_y = showobj_pos['top'];
	var showobj_w = showobj.offsetWidth;
	var showobj_h = showobj.offsetHeight;
	var menuobj_w = menuobj.offsetWidth;
	var menuobj_h = menuobj.offsetHeight;

	menuobj.style.left = (showobj_x + menuobj_w > document.body.clientWidth) && (showobj_x + showobj_w - menuobj_w >= 0) ? showobj_x + showobj_w - menuobj_w + 'px' : showobj_x + 'px';
	menuobj.style.top = offset == 1 ? showobj_y + 'px' : (offset == 2 || ((showobj_y + showobj_h + menuobj_h > document.body.scrollTop + document.body.clientHeight) && (showobj_y - menuobj_h >= 0)) ? (showobj_y - menuobj_h) + 'px' : showobj_y + showobj_h + 'px');

	if(menuobj.style.clip && !is_opera) {
		menuobj.style.clip = 'rect(auto, auto, auto, auto)';
	}

	if(is_ie && is_ie < 7) {
		if(!jsmenu['iframe'][layer]) {
			var iframe = document.createElement('iframe');
			iframe.style.display = 'none';
			iframe.style.position = 'absolute';
			iframe.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)';
			$('jsmenu_parent') ? $('jsmenu_parent').appendChild(iframe) : menuobj.parentNode.appendChild(iframe);
			jsmenu['iframe'][layer] = iframe;
		}
		jsmenu['iframe'][layer].style.top = menuobj.style.top;
		jsmenu['iframe'][layer].style.left = menuobj.style.left;
		jsmenu['iframe'][layer].style.width = menuobj_w;
		jsmenu['iframe'][layer].style.height = menuobj_h;
		jsmenu['iframe'][layer].style.display = 'block';
	}

	if(maxh && menuobj.scrollHeight > maxh) {
		menuobj.style.height = maxh + 'px';
		if(is_opera) {
			menuobj.style.overflow = 'auto';
		} else {
			menuobj.style.overflowY = 'auto';
		}
	}

	if(!duration) {
		setTimeout('hideMenu(' + layer + ')', timeout);
	}

	jsmenu['active'][layer] = menuobj;
}

function hideMenu(layer) {
	if(isUndefined(layer)) layer = 0;
	if(jsmenu['active'][layer]) {
		clearTimeout(jsmenu['timer'][jsmenu['active'][layer].ctrlkey]);
		jsmenu['active'][layer].style.display = 'none';
		if(is_ie && is_ie < 7 && jsmenu['iframe'][layer]) {
			jsmenu['iframe'][layer].style.display = 'none';
		}
		jsmenu['active'][layer] = null;
	}
}

function fetchOffset(obj) {
	var left_offset = obj.offsetLeft;
	var top_offset = obj.offsetTop;
	while((obj = obj.offsetParent) != null) {
		left_offset += obj.offsetLeft;
		top_offset += obj.offsetTop;
	}
	return { 'left' : left_offset, 'top' : top_offset };
}

function ebygum(eventobj) {
	if(!eventobj || is_ie) {
		window.event.cancelBubble = true;
		return window.event;
	} else {
		if(eventobj.target.type == 'submit') {
			eventobj.target.form.submit();
		}
		eventobj.stopPropagation();
		return eventobj;
	}
}

function menuoption_onclick_function(e) {
	this.clickfunc();
	hideMenu();
}

function menuoption_onclick_link(e) {
	choose(e, this);
}

function menuoption_onmouseover(e) {
	this.className = 'popupmenu_highlight';
}

function menuoption_onmouseout(e) {
	this.className = 'popupmenu_option';
}

function choose(e, obj) {
	var links = findtags(obj, 'a');
	if(links[0]) {
		if(is_ie) {
			links[0].click();
			window.event.cancelBubble = true;
		} else {
			if(e.shiftKey) {
				window.open(links[0].href);
				e.stopPropagation();
				e.preventDefault();
			} else {
				window.location = links[0].href;
				e.stopPropagation();
				e.preventDefault();
			}
		}
		hideMenu();
	}
}