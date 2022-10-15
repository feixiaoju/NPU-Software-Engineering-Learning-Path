function setTrBgcolor(obj, types, bgtypes) {
    if (types == 1) {
        obj.style.background = "#999999";
    }
    else {
        if (bgtypes == 1) {
            obj.style.background = "#F6F6F6";
        }
        else {
            obj.style.background = "";
        }
    }
}


function tunePage(toPageNo, pageNo) {
    try {
        var topage = 1;
        if (typeof(toPageNo) != "number" || toPageNo < 1) topage = 1;
        else topage = toPageNo;
        var olds = window.location.search;
        if (typeof(pageNo) == "undefined" || pageNo == "") pageNo = "pageNo";
        var news = "";
        if (olds.length > 1) {
            olds = olds.substring(1, olds.length);
            var arrays = olds.split("&");
            for (var i = 0; i < arrays.length; i++)
            {
                if (arrays[i].indexOf(pageNo + "=") < 0 && arrays[i].length > 1) {
                    news += "&" + arrays[i];
                }
            }
            if (news.length > 1) {
                news = "?" + news.substring(1, news.length) + "&" + pageNo + "=" + topage;
            }
            else {
                news = "?" + pageNo + "=" + topage;
            }
        }
        else {
            news = "?" + pageNo + "=" + topage;
        }
        window.location = window.location.pathname + news;
    }
    catch(e) {
        window.location = window.location.pathname + window.location.search;
    }
}

function sAll(thisObj, dObj) {
    with (thisObj.form) {
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (!element.disabled && element.type == "checkbox" && element.name == dObj) {
                element.checked = thisObj.checked;
            }
        }
    }
}


function sReverse(thisObj, dObj) {
    with (thisObj.form) {
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (!element.disabled && element.type == "checkbox" && element.name == dObj) {
                element.checked = !element.checked;
            }
        }
    }
}

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

