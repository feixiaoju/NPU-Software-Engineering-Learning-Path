
/**************************************************************
*				163 blog JS Util							  *
*                                                             *
* Written by:  chene                                       *
* Important: to use this script don't                         *
*            remove these comments                            *
* Version 1.0 (MSIE 6.0 above,Firefox1.0,Netscape.)           *
* Created Date: 2006-11-21									  *
* Copyright��1997-2006 NetEase.com Inc. All rights reserved.  *
**************************************************************/

/** 
 * @fileoverview 
 * �ṩ���ػ�������Ϣ
 * 
 * @author  ���� (chene@corp.netease.com)
 * @version 1.0 
 * @requires NameSpace.js
 */
DomainMap = {
	cookieDomain:'.163.com',
	serverHostName:'blog.163.com',
	serverDomain:'.blog.163.com',
	getParentDomain:function(s){
		if(s.indexOf('@') != -1||s.indexOf('_') != -1||s.indexOf('..') != -1||s.charAt(s.length -1) == '.'||s.toLowerCase().substr(s.length - 4) == '.www')
			return this.serverHostName + '/' +s;
		return s + this.serverDomain;
	}	
};
/*
 * Copyright 2005 Joe Walker
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Declare a constructor function to which we can add real functions.
 */
if (DWREngine == null) var DWREngine = {};

/**
 * Set an alternative error handler from the default alert box.
 * @see http://getahead.ltd.uk/dwr/browser/engine/errors
 */
DWREngine.setErrorHandler = function(handler) {
  DWREngine._errorHandler = handler;
};

/**
 * Set an alternative warning handler from the default alert box.
 * @see http://getahead.ltd.uk/dwr/browser/engine/errors
 */
DWREngine.setWarningHandler = function(handler) {
  DWREngine._warningHandler = handler;
};

/**
 * Set a default timeout value for all calls. 0 (the default) turns timeouts off.
 * @see http://getahead.ltd.uk/dwr/browser/engine/errors
 */
DWREngine.setTimeout = function(timeout) {
  DWREngine._timeout = timeout;
};

/**
 * The Pre-Hook is called before any DWR remoting is done.
 * @see http://getahead.ltd.uk/dwr/browser/engine/hooks
 */
DWREngine.setPreHook = function(handler) {
  DWREngine._preHook = handler;
};

/**
 * The Post-Hook is called after any DWR remoting is done.
 * @see http://getahead.ltd.uk/dwr/browser/engine/hooks
 */
DWREngine.setPostHook = function(handler) {
  DWREngine._postHook = handler;
};

/** XHR remoting method constant. See DWREngine.setMethod() */
DWREngine.XMLHttpRequest = 1;

/** XHR remoting method constant. See DWREngine.setMethod() */
DWREngine.IFrame = 2;

/**
 * Set the preferred remoting method.
 * @param newMethod One of DWREngine.XMLHttpRequest or DWREngine.IFrame
 * @see http://getahead.ltd.uk/dwr/browser/engine/options
 */
DWREngine.setMethod = function(newMethod) {
  if (newMethod != DWREngine.XMLHttpRequest && newMethod != DWREngine.IFrame) {
    DWREngine._handleError("Remoting method must be one of DWREngine.XMLHttpRequest or DWREngine.IFrame");
    return;
  }
  DWREngine._method = newMethod;
};

/**
 * Which HTTP verb do we use to send results? Must be one of "GET" or "POST".
 * @see http://getahead.ltd.uk/dwr/browser/engine/options
 */
DWREngine.setVerb = function(verb) {
  if (verb != "GET" && verb != "POST") {
    DWREngine._handleError("Remoting verb must be one of GET or POST");
    return;
  }
  DWREngine._verb = verb;
};

/**
 * Ensure that remote calls happen in the order in which they were sent? (Default: false)
 * @see http://getahead.ltd.uk/dwr/browser/engine/ordering
 */
DWREngine.setOrdered = function(ordered) {
  DWREngine._ordered = ordered;
};

/**
 * Do we ask the XHR object to be asynchronous? (Default: true)
 * @see http://getahead.ltd.uk/dwr/browser/engine/options
 */
DWREngine.setAsync = function(async) {
  DWREngine._async = async;
};

/**
 * Setter for the text/html handler - what happens if a DWR request gets an HTML
 * reply rather than the expected Javascript. Often due to login timeout
 */
DWREngine.setTextHtmlHandler = function(handler) {
  DWREngine._textHtmlHandler = handler;
}

/**
 * The default message handler.
 * @see http://getahead.ltd.uk/dwr/browser/engine/errors
 */
DWREngine.defaultMessageHandler = function(message) {
  if (typeof message == "object" && message.name == "Error" && message.description) {
    //alert("Error: " + message.description);
  }
  else {
    // Ignore NS_ERROR_NOT_AVAILABLE
    if (message.toString().indexOf("0x80040111") == -1) {
      //alert(message);
    }
  }
};

/**
 * For reduced latency you can group several remote calls together using a batch.
 * @see http://getahead.ltd.uk/dwr/browser/engine/batch
 */
DWREngine.beginBatch = function() {
  if (DWREngine._batch) {
    DWREngine._handleError("Batch already started.");
    return;
  }
  // Setup a batch
  DWREngine._batch = {
    map:{ callCount:0 },
    paramCount:0,
    ids:[],
    preHooks:[],
    postHooks:[]
  };
};

/**
 * Finished grouping a set of remote calls together. Go and execute them all.
 * @see http://getahead.ltd.uk/dwr/browser/engine/batch
 */
DWREngine.endBatch = function(options) {
  var batch = DWREngine._batch;
  if (batch == null) {
    DWREngine._handleError("No batch in progress.");
    return;
  }
  // Merge the global batch level properties into the batch meta data
  if (options && options.preHook) batch.preHooks.unshift(options.preHook);
  if (options && options.postHook) batch.postHooks.push(options.postHook);
  if (DWREngine._preHook) batch.preHooks.unshift(DWREngine._preHook);
  if (DWREngine._postHook) batch.postHooks.push(DWREngine._postHook);

  if (batch.method == null) batch.method = DWREngine._method;
  if (batch.verb == null) batch.verb = DWREngine._verb;
  if (batch.async == null) batch.async = DWREngine._async;
  if (batch.timeout == null) batch.timeout = DWREngine._timeout;

  batch.completed = false;

  // We are about to send so this batch should not be globally visible
  DWREngine._batch = null;

  // If we are in ordered mode, then we don't send unless the list of sent
  // items is empty
  if (!DWREngine._ordered) {
    DWREngine._sendData(batch);
    DWREngine._batches[DWREngine._batches.length] = batch;
  }
  else {
    if (DWREngine._batches.length == 0) {
      // We aren't waiting for anything, go now.
      DWREngine._sendData(batch);
      DWREngine._batches[DWREngine._batches.length] = batch;
    }
    else {
      // Push the batch onto the waiting queue
      DWREngine._batchQueue[DWREngine._batchQueue.length] = batch;
    }
  }
};

//==============================================================================
// Only private stuff below here
//==============================================================================

/** A function to call if something fails. */
DWREngine._errorHandler = DWREngine.defaultMessageHandler;

/** For debugging when something unexplained happens. */
DWREngine._warningHandler = null;

/** A function to be called before requests are marshalled. Can be null. */
DWREngine._preHook = null;

/** A function to be called after replies are received. Can be null. */
DWREngine._postHook = null;

/** An array of the batches that we have sent and are awaiting a reply on. */
DWREngine._batches = [];

/** In ordered mode, the array of batches waiting to be sent */
DWREngine._batchQueue = [];

/** A map of known ids to their handler objects */
DWREngine._handlersMap = {};

/** What is the default remoting method */
DWREngine._method = DWREngine.XMLHttpRequest;

/** What is the default remoting verb (ie GET or POST) */
DWREngine._verb = "POST";

/** Do we attempt to ensure that calls happen in the order in which they were sent? */
DWREngine._ordered = false;

/** Do we make the calls async? */
DWREngine._async = true;

/** The current batch (if we are in batch mode) */
DWREngine._batch = null;

/** The global timeout */
DWREngine._timeout = 0;

/** ActiveX objects to use when we want to convert an xml string into a DOM object. */
DWREngine._DOMDocument = ["Msxml2.DOMDocument.6.0", "Msxml2.DOMDocument.5.0", "Msxml2.DOMDocument.4.0", "Msxml2.DOMDocument.3.0", "MSXML2.DOMDocument", "MSXML.DOMDocument", "Microsoft.XMLDOM"];

/** The ActiveX objects to use when we want to do an XMLHttpRequest call. */
DWREngine._XMLHTTP = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];


DWREngine._unload = function(){
	for (var i = 0; i < DWREngine._batches.length; i++) {		
   		var batch = DWREngine._batches[i];
   		if(!batch.completed){
   			batch.req.abort();   	   				
   		}
 	}
}

DWREngine.setUnloadHandler = function(){
	if (window.attachEvent){
		window.attachEvent('onbeforeunload',DWREngine._unload);
	}
	else{
		window.addEventListener('beforeunload',DWREngine._unload,false);
	}
}

DWREngine.setUnloadHandler();


/**
 * @private Send a request. Called by the Javascript interface stub
 * @param path part of URL after the host and before the exec bit without leading or trailing /s
 * @param scriptName The class to execute
 * @param methodName The method on said class to execute
 * @param func The callback function to which any returned data should be passed
 *       if this is null, any returned data will be ignored
 * @param vararg_params The parameters to pass to the above class
 */
DWREngine._execute = function(path, scriptName, methodName, vararg_params) {
  if(path.charAt(0) == '/')//relative path is prefered for url rewriting .  ce 2006-05-18
	path = path.substring(1);
  var singleShot = false;
  if (DWREngine._batch == null) {
    DWREngine.beginBatch();
    singleShot = true;
  }
  // To make them easy to manipulate we copy the arguments into an args array
  var args = [];
  for (var i = 0; i < arguments.length - 3; i++) {
    args[i] = arguments[i + 3];
  }
  // All the paths MUST be to the same servlet
  if (DWREngine._batch.path == null) {
    DWREngine._batch.path = path;
  }
  else {
    if (DWREngine._batch.path != path) {
      DWREngine._handleError("Can't batch requests to multiple DWR Servlets.");
      return;
    }
  }
  // From the other params, work out which is the function (or object with
  // call meta-data) and which is the call parameters
  var params;
  var callData;
  var firstArg = args[0];
  var lastArg = args[args.length - 1];

  if (typeof firstArg == "function") {
    callData = { callback:args.shift() };
    params = args;
  }
  else if (typeof lastArg == "function") {
    callData = { callback:args.pop() };
    params = args;
  }
  else if (lastArg != null && typeof lastArg == "object" && lastArg.callback != null && typeof lastArg.callback == "function") {
    callData = args.pop();
    params = args;
  }
  else if (firstArg == null) {
    // This could be a null callback function, but if the last arg is also
    // null then we can't tell which is the function unless there are only
    // 2 args, in which case we don't care!
    if (lastArg == null && args.length > 2) {
        DWREngine._handleError("Ambiguous nulls at start and end of parameter list. Which is the callback function?");
    }
    callData = { callback:args.shift() };
    params = args;
  }
  else if (lastArg == null) {
    callData = { callback:args.pop() };
    params = args;
  }
  else {
    DWREngine._handleError("Missing callback function or metadata object.");
    return;
  }

  // Get a unique ID for this call
  var random = Math.floor(Math.random() * 10001);
  var id = (random + "_" + new Date().getTime()).toString();
  var prefix = "c" + DWREngine._batch.map.callCount + "-";
  DWREngine._batch.ids.push(id);

  // batchMetaData stuff the we allow in callMetaData for convenience
  if (callData.method != null) {
    DWREngine._batch.method = callData.method;
    delete callData.method;
  }
  if (callData.verb != null) {
    DWREngine._batch.verb = callData.verb;
    delete callData.verb;
  }
  if (callData.async != null) {
    DWREngine._batch.async = callData.async;
    delete callData.async;
  }
  if (callData.timeout != null) {
    DWREngine._batch.timeout = callData.timeout;
    delete callData.timeout;
  }

  // callMetaData stuff that we handle with the rest of the batchMetaData
  if (callData.preHook != null) {
    DWREngine._batch.preHooks.unshift(callData.preHook);
    delete callData.preHook;
  }
  if (callData.postHook != null) {
    DWREngine._batch.postHooks.push(callData.postHook);
    delete callData.postHook;
  }

  // Default the error and warning handlers
  if (callData.errorHandler == null) callData.errorHandler = DWREngine._errorHandler;
  if (callData.warningHandler == null) callData.warningHandler = DWREngine._warningHandler;

  // Save the callMetaData
  DWREngine._handlersMap[id] = callData;

  DWREngine._batch.map[prefix + "scriptName"] = scriptName;
  DWREngine._batch.map[prefix + "methodName"] = methodName;
  DWREngine._batch.map[prefix + "id"] = id;

  // Serialize the parameters into batch.map
  for (i = 0; i < params.length; i++) {
    DWREngine._serializeAll(DWREngine._batch, [], params[i], prefix + "param" + i);
  }

  // Now we have finished remembering the call, we incr the call count
  DWREngine._batch.map.callCount++;
  if (singleShot) {
    DWREngine.endBatch();
  }
};

/** @private Actually send the block of data in the batch object. */
DWREngine._sendData = function(batch) {
  // If the batch is empty, don't send anything
  if (batch.map.callCount == 0) return;
  // Call any pre-hooks
  for (var i = 0; i < batch.preHooks.length; i++) {
    batch.preHooks[i]();
  }
  batch.preHooks = null;
  // Set a timeout
  if (batch.timeout && batch.timeout != 0) {
    batch.interval = setInterval(function() { DWREngine._abortRequest(batch); }, batch.timeout);
  }
  // A quick string to help people that use web log analysers
  var urlPostfix;
  if (batch.map.callCount == 1) {
    urlPostfix = batch.map["c0-scriptName"] + "." + batch.map["c0-methodName"] + ".dwr";
  }
  else {
    urlPostfix = "Multiple." + batch.map.callCount + ".dwr";
  }

  // Get setup for XMLHttpRequest if possible
  if (batch.method == DWREngine.XMLHttpRequest) {
    if (window.XMLHttpRequest) {
      batch.req = new XMLHttpRequest();
    }
    // IE5 for the mac claims to support window.ActiveXObject, but throws an error when it's used
    else if (window.ActiveXObject && !(navigator.userAgent.indexOf("Mac") >= 0 && navigator.userAgent.indexOf("MSIE") >= 0)) {
      batch.req = DWREngine._newActiveXObject(DWREngine._XMLHTTP);
    }
  }

  var query = "";
  var prop;

  // This equates to (batch.method == XHR && browser supports XHR)
  if (batch.req) {
    batch.map.xml = "true";
    // Proceed using XMLHttpRequest
    if (batch.async) {
      batch.req.onreadystatechange = function() { DWREngine._stateChange(batch); };
    }
    // Workaround for Safari 1.x POST bug
    var indexSafari = navigator.userAgent.indexOf("Safari/");
    if (indexSafari >= 0) {
      var version = navigator.userAgent.substring(indexSafari + 7);
      if (parseInt(version, 10) < 400) batch.verb == "GET";
    }
    if (batch.verb == "GET") {
      // Some browsers (Opera/Safari2) seem to fail to convert the value
      // of batch.map.callCount to a string in the loop below so we do it
      // manually here.
      batch.map.callCount = "" + batch.map.callCount;

      for (prop in batch.map) {
        var qkey = encodeURIComponent(prop);
        var qval = encodeURIComponent(batch.map[prop]);
        if (qval == "") DWREngine._handleError("Found empty qval for qkey=" + qkey);
        query += qkey + "=" + qval + "&";
      }

      try {
        batch.req.open("GET", batch.path + "/exec/" + urlPostfix + "?" + query, batch.async);
        batch.req.send(null);
        if (!batch.async) DWREngine._stateChange(batch);
      }
      catch (ex) {
        DWREngine._handleMetaDataError(null, ex);
      }
    }
    else {
      for (prop in batch.map) {
        if (typeof batch.map[prop] != "function") {
          query += prop + "=" + batch.map[prop] + "\n";
        }
      }

      try {
        batch.req.open("POST", batch.path + "/exec/" + urlPostfix, batch.async);
        batch.req.setRequestHeader('Content-Type', 'text/plain');
        batch.req.send(query);
        if (!batch.async) DWREngine._stateChange(batch);
      }
      catch (ex) {
        DWREngine._handleMetaDataError(null, ex);
      }
    }
  }
  else {
    batch.map.xml = "false";
    var idname = "dwr-if-" + batch.map["c0-id"];
    // Proceed using iframe
    batch.div = document.createElement("div");
    batch.div.innerHTML = "<iframe src='javascript:void(0)' frameborder='0' width='0' height='0' id='" + idname + "' name='" + idname + "'></iframe>";
    document.body.appendChild(batch.div);
    batch.iframe = document.getElementById(idname);
    batch.iframe.setAttribute("style", "width:0px; height:0px; border:0px;");

    if (batch.verb == "GET") {
      for (prop in batch.map) {
        if (typeof batch.map[prop] != "function") {
          query += encodeURIComponent(prop) + "=" + encodeURIComponent(batch.map[prop]) + "&";
        }
      }
      query = query.substring(0, query.length - 1);

      batch.iframe.setAttribute("src", batch.path + "/exec/" + urlPostfix + "?" + query);
      document.body.appendChild(batch.iframe);
    }
    else {
      batch.form = document.createElement("form");
      batch.form.setAttribute("id", "dwr-form");
      batch.form.setAttribute("action", batch.path + "/exec" + urlPostfix);
      batch.form.setAttribute("target", idname);
      batch.form.target = idname;
      batch.form.setAttribute("method", "POST");
      for (prop in batch.map) {
        var formInput = document.createElement("input");
        formInput.setAttribute("type", "hidden");
        formInput.setAttribute("name", prop);
        formInput.setAttribute("value", batch.map[prop]);
        batch.form.appendChild(formInput);
      }
      document.body.appendChild(batch.form);
      batch.form.submit();
    }
  }
};

/** @private Called by XMLHttpRequest to indicate that something has happened */
DWREngine._stateChange = function(batch) {
  if (!batch.completed && batch.req.readyState == 4) {
    try {
      var reply = batch.req.responseText;

      if (reply == null || reply == "") {
        DWREngine._handleMetaDataWarning(null, "No data received from server");
      }
      else {
        var contentType = batch.req.getResponseHeader("Content-Type");
        if (!contentType.match(/^text\/plain/) && !contentType.match(/^text\/javascript/)) {
          if (DWREngine._textHtmlHandler && contentType.match(/^text\/html/)) {
            DWREngine._textHtmlHandler();
          }
          else {
            DWREngine._handleMetaDataWarning(null, "Invalid content type from server: '" + contentType + "'");
          }
        }
        else {
          // Skip checking the xhr.status because the above will do for most errors
          // and because it causes Mozilla to error

          if (reply.search("DWREngine._handle") == -1) {
            DWREngine._handleMetaDataWarning(null, "Invalid reply from server");
          }
          else {
            eval(reply);
          }
        }
      }

      // We're done. Clear up
      DWREngine._clearUp(batch);
    }
    catch (ex) {
      if (ex == null) ex = "Unknown error occured";
      DWREngine._handleMetaDataWarning(null, ex);
    }
    finally {
      // If there is anything on the queue waiting to go out, then send it.
      // We don't need to check for ordered mode, here because when ordered mode
      // gets turned off, we still process *waiting* batches in an ordered way.
      if (DWREngine._batchQueue.length != 0) {
        var sendbatch = DWREngine._batchQueue.shift();
        DWREngine._sendData(sendbatch);
        DWREngine._batches[DWREngine._batches.length] = sendbatch;
      }
    }
  }
};

/**
 * @private Called by reply scripts generated as a result of remote requests
 * @param id The identifier of the call that we are handling a response for
 * @param reply The data to pass to the callback function
 */
DWREngine._handleResponse = function(id, reply) {
  // Clear this callback out of the list - we don't need it any more
  var handlers = DWREngine._handlersMap[id];
  DWREngine._handlersMap[id] = null;

  if (handlers) {
    // Error handlers inside here indicate an error that is nothing to do
    // with DWR so we handle them differently.
    try {
      if (handlers.callback) handlers.callback(reply);
    }
    catch (ex) {
      DWREngine._handleMetaDataError(handlers, ex);
    }
  }

  // Finalize the call for IFrame transport 
  if (DWREngine._method == DWREngine.IFrame) {
    var responseBatch = DWREngine._batches[DWREngine._batches.length-1];	
    // Only finalize after the last call has been handled
    if (responseBatch.map["c"+(responseBatch.map.callCount-1)+"-id"] == id) {
      DWREngine._clearUp(responseBatch);
    }
  }
};

/** @private This method is called by Javascript that is emitted by server */
DWREngine._handleServerError = function(id, error) {
  // Clear this callback out of the list - we don't need it any more
  var handlers = DWREngine._handlersMap[id];
  DWREngine._handlersMap[id] = null;

  if (error.message) DWREngine._handleMetaDataError(handlers, error.message, error);
  else DWREngine._handleMetaDataError(handlers, error);
};

/** @private This is a hack to make the context be this window */
DWREngine._eval = function(script) {
  return eval(script);
}

/** @private Called as a result of a request timeout */
DWREngine._abortRequest = function(batch) {
  if (batch && !batch.completed) {
    clearInterval(batch.interval);
    DWREngine._clearUp(batch);
    if (batch.req) batch.req.abort();
    // Call all the timeout errorHandlers
    var handlers;
    for (var i = 0; i < batch.ids.length; i++) {
      handlers = DWREngine._handlersMap[batch.ids[i]];
      DWREngine._handleMetaDataError(handlers, "Timeout");
    }
  }
};

/** @private A call has finished by whatever means and we need to shut it all down. */
DWREngine._clearUp = function(batch) {
  if (batch.completed) {
    DWREngine._handleError("Double complete");
    return;
  }

  // IFrame tidyup
  if (batch.div) batch.div.parentNode.removeChild(batch.div);
  if (batch.iframe) batch.iframe.parentNode.removeChild(batch.iframe);
  if (batch.form) batch.form.parentNode.removeChild(batch.form);

  // XHR tidyup: avoid IE handles increase
  if (batch.req) delete batch.req;

  for (var i = 0; i < batch.postHooks.length; i++) {
    batch.postHooks[i]();
  }
  batch.postHooks = null;

  // TODO: There must be a better way???
  for (var i = 0; i < DWREngine._batches.length; i++) {
    if (DWREngine._batches[i] == batch) {
      DWREngine._batches.splice(i, 1);
      break;
    }
  }

  batch.completed = true;
};

/** @private Generic error handling routing to save having null checks everywhere */
DWREngine._handleError = function(reason, ex) {
  if (DWREngine._errorHandler) DWREngine._errorHandler(reason, ex);
};

/** @private Generic warning handling routing to save having null checks everywhere */
DWREngine._handleWarning = function(reason, ex) {
  if (DWREngine._warningHandler) DWREngine._warningHandler(reason, ex);
};

/** @private Generic error handling routing to save having null checks everywhere */
DWREngine._handleMetaDataError = function(handlers, reason, ex) {
  if (handlers && typeof handlers.errorHandler == "function") handlers.errorHandler(reason, ex);
  else DWREngine._handleError(reason, ex);
};

/** @private Generic error handling routing to save having null checks everywhere */
DWREngine._handleMetaDataWarning = function(handlers, reason, ex) {
  if (handlers && typeof handlers.warningHandler == "function") handlers.warningHandler(reason, ex);
  else DWREngine._handleWarning(reason, ex);
};

/**
 * @private Marshall a data item
 * @param batch A map of variables to how they have been marshalled
 * @param referto An array of already marshalled variables to prevent recurrsion
 * @param data The data to be marshalled
 * @param name The name of the data being marshalled
 */
DWREngine._serializeAll = function(batch, referto, data, name) {
  if (data == null) {
    batch.map[name] = "null:null";
    return;
  }

  switch (typeof data) {
  case "boolean":
    batch.map[name] = "boolean:" + data;
    break;
  case "number":
    batch.map[name] = "number:" + data;
    break;
  case "string":
    batch.map[name] = "string:" + encodeURIComponent(data);
    break;
  case "object":
    if (data instanceof String) batch.map[name] = "String:" + encodeURIComponent(data);
    else if (data instanceof Boolean) batch.map[name] = "Boolean:" + data;
    else if (data instanceof Number) batch.map[name] = "Number:" + data;
    else if (data instanceof Date) batch.map[name] = "Date:" + data.getTime();
    else if (data instanceof Array) batch.map[name] = DWREngine._serializeArray(batch, referto, data, name);
    else batch.map[name] = DWREngine._serializeObject(batch, referto, data, name);
    break;
  case "function":
    // We just ignore functions.
    break;
  default:
    DWREngine._handleWarning("Unexpected type: " + typeof data + ", attempting default converter.");
    batch.map[name] = "default:" + data;
    break;
  }
};

/** @private Have we already converted this object? */
DWREngine._lookup = function(referto, data, name) {
  var lookup;
  // Can't use a map: http://getahead.ltd.uk/ajax/javascript-gotchas
  for (var i = 0; i < referto.length; i++) {
    if (referto[i].data == data) {
      lookup = referto[i];
      break;
    }
  }
  if (lookup) return "reference:" + lookup.name;
  referto.push({ data:data, name:name });
  return null;
};

/** @private Marshall an object */
DWREngine._serializeObject = function(batch, referto, data, name) {
  var ref = DWREngine._lookup(referto, data, name);
  if (ref) return ref;

  // This check for an HTML is not complete, but is there a better way?
  // Maybe we should add: data.hasChildNodes typeof "function" == true
  if (data.nodeName && data.nodeType) {
    return DWREngine._serializeXml(batch, referto, data, name);
  }

  // treat objects as an associative arrays
  var reply = "Object:{";
  var element;
  for (element in data) {
    batch.paramCount++;
    var childName = "c" + DWREngine._batch.map.callCount + "-e" + batch.paramCount;
    DWREngine._serializeAll(batch, referto, data[element], childName);

    reply += encodeURIComponent(element) + ":reference:" + childName + ", ";
  }

  if (reply.substring(reply.length - 2) == ", ") {
    reply = reply.substring(0, reply.length - 2);
  }
  reply += "}";

  return reply;
};

/** @private Marshall an object */
DWREngine._serializeXml = function(batch, referto, data, name) {
  var ref = DWREngine._lookup(referto, data, name);
  if (ref) return ref;

  var output;
  if (window.XMLSerializer) output = new XMLSerializer().serializeToString(data);
  else output = data.toXml;

  return "XML:" + encodeURIComponent(output);
};

/** @private Marshall an array */
DWREngine._serializeArray = function(batch, referto, data, name) {
  var ref = DWREngine._lookup(referto, data, name);
  if (ref) return ref;

  var reply = "Array:[";
  for (var i = 0; i < data.length; i++) {
    if (i != 0) reply += ",";
    batch.paramCount++;
    var childName = "c" + DWREngine._batch.map.callCount + "-e" + batch.paramCount;
    DWREngine._serializeAll(batch, referto, data[i], childName);
    reply += "reference:";
    reply += childName;
  }
  reply += "]";

  return reply;
};

/** @private Convert an XML string into a DOM object. */
DWREngine._unserializeDocument = function(xml) {
  var dom;
  if (window.DOMParser) {
    var parser = new DOMParser();
    dom = parser.parseFromString(xml, "text/xml");
    if (!dom.documentElement || dom.documentElement.tagName == "parsererror") {
      var message = dom.documentElement.firstChild.data;
      message += "\n" + dom.documentElement.firstChild.nextSibling.firstChild.data;
      throw message;
    }
    return dom;
  }
  else if (window.ActiveXObject) {
    dom = DWREngine._newActiveXObject(DWREngine._DOMDocument);
    dom.loadXML(xml); // What happens on parse fail with IE?
    return dom;
  }
  else {
    var div = document.createElement("div");
    div.innerHTML = xml;
    return div;
  }
};

/**
 * @private Helper to find an ActiveX object that works.
 * @param axarray An array of strings to attempt to create ActiveX objects from
 */
DWREngine._newActiveXObject = function(axarray) {
  var returnValue;  
  for (var i = 0; i < axarray.length; i++) {
    try {
      returnValue = new ActiveXObject(axarray[i]);
      break;
    }
    catch (ex) { /* ignore */ }
  }
  return returnValue;
};

/** @private To make up for the lack of encodeURIComponent() on IE5.0 */
if (typeof window.encodeURIComponent === 'undefined') {
  DWREngine._utf8 = function(wide) {
    wide = "" + wide; // Make sure it is a string
    var c;
    var s;
    var enc = "";
    var i = 0;
    while (i < wide.length) {
      c = wide.charCodeAt(i++);
      // handle UTF-16 surrogates
      if (c >= 0xDC00 && c < 0xE000) continue;
      if (c >= 0xD800 && c < 0xDC00) {
        if (i >= wide.length) continue;
        s = wide.charCodeAt(i++);
        if (s < 0xDC00 || c >= 0xDE00) continue;
        c = ((c - 0xD800) << 10) + (s - 0xDC00) + 0x10000;
      }
      // output value
      if (c < 0x80) {
        enc += String.fromCharCode(c);
      }
      else if (c < 0x800) {
        enc += String.fromCharCode(0xC0 + (c >> 6), 0x80 + (c & 0x3F));
      }
      else if (c < 0x10000) {
        enc += String.fromCharCode(0xE0 + (c >> 12), 0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
      }
      else {
        enc += String.fromCharCode(0xF0 + (c >> 18), 0x80 + (c >> 12 & 0x3F), 0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
      }
    }
    return enc;
  }

  DWREngine._hexchars = "0123456789ABCDEF";

  DWREngine._toHex = function(n) {
    return DWREngine._hexchars.charAt(n >> 4) + DWREngine._hexchars.charAt(n & 0xF);
  }

  DWREngine._okURIchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";

  window.encodeURIComponent = function(s)  {
    s = DWREngine._utf8(s);
    var c;
    var enc = "";
    for (var i= 0; i<s.length; i++) {
      if (DWREngine._okURIchars.indexOf(s.charAt(i)) == -1) {
        enc += "%" + DWREngine._toHex(s.charCodeAt(i));
      }
      else {
        enc += s.charAt(i);
      }
    }
    return enc;
  }
}

/** @private To make up for the lack of Array.splice() on IE5.0 */
if (typeof Array.prototype.splice === 'undefined') {
  Array.prototype.splice = function(ind, cnt)
  {
    if (arguments.length == 0) return ind;
    if (typeof ind != "number") ind = 0;
    if (ind < 0) ind = Math.max(0,this.length + ind);
    if (ind > this.length) {
      if (arguments.length > 2) ind = this.length;
      else return [];
    }
    if (arguments.length < 2) cnt = this.length-ind;

    cnt = (typeof cnt == "number") ? Math.max(0, cnt) : 0;
    removeArray = this.slice(ind, ind + cnt);
    endArray = this.slice(ind + cnt);
    this.length = ind;

    for (var i = 2; i < arguments.length; i++) this[this.length] = arguments[i];
    for (i = 0; i < endArray.length; i++) this[this.length] = endArray[i];

    return removeArray;
  }
}

/** @private To make up for the lack of Array.shift() on IE5.0 */
if (typeof Array.prototype.shift === 'undefined') {
  Array.prototype.shift = function(str) {
    var val = this[0];
    for (var i = 1; i < this.length; ++i) this[i - 1] = this[i];
    this.length--;
    return val;
  }
}

/** @private To make up for the lack of Array.unshift() on IE5.0 */
if (typeof Array.prototype.unshift === 'undefined') {
  Array.prototype.unshift = function() {
    var i = unshift.arguments.length;
    for (var j = this.length - 1; j >= 0; --j) this[j + i] = this[j];
    for (j = 0; j < i; ++j) this[j] = unshift.arguments[j];
  }
}

/** @private To make up for the lack of Array.push() on IE5.0 */
if (typeof Array.prototype.push === 'undefined') {
  Array.prototype.push = function() {
    var sub = this.length;
    for (var i = 0; i < push.arguments.length; ++i) {
      this[sub] = push.arguments[i];
      sub++;
    }
  }
}

/** @private To make up for the lack of Array.pop() on IE5.0 */
if (typeof Array.prototype.pop === 'undefined') {
  Array.prototype.pop = function() {
    var lastElement = this[this.length - 1];
    this.length--;
    return lastElement;
  }
}

var valids = new Object();

function validCallBack(file){
	valids[file] = true;
}
//DWREngine.setAsync(false);
/**
 * �б���ǰ������
 * @type String
 */
var jst_global_sign = "&#149;";
/**
 * �����б���ʾ
 * @type String
 */
var jst_global_comment_show = new String('\
    {if coms != null && coms.length != 0}\
    <div id="comShowHeader_${parentId}" class="g_h_20 g_c_mgin">\
	  <span class="g_p_right g_c_hand n_ n7" onclick="${containerObjName}.closeComments(\'${parentId}\');return false;" title="�ر�">&nbsp;</span>\
	  <ul class="g_menu_09 g_w_at c06">\
		  <li>\
		    {if (coms != null) && (comCount > (commentRange * pageNum))}\
		      <a id="spnNextPage_${parentId}" href="#" onclick="${containerObjName}.moveToPage(${pageNum} + 1, true);return false;">��ҳ</a>\
		    {else}��ҳ{/if}\
		  </li>\
		  <li><span>${pageNum}/${totalPageNum}</span></li>\
		  <li>\
		    {if pageNum > 1}\
		      <a id="spnPrevPage_${parentId}" href="#" onclick="${containerObjName}.moveToPage(${pageNum} - 1, true);return false;">��ҳ</a>\
		    {else}��ҳ{/if}\
		  </li>\
	  </ul>\
	</div>\
	<div class="g_p_hide g_c_mgin" id="comShowContent_${parentId}">\
	    {for com in coms}\
	    <table class="g_w_100 bd1b g_c_mvdn g_c_mvup" border="0" cellspacing="0" cellpadding="0">\
	      <tr>\
	        <td class="g_layout_04_0">\
	      	  {if com.publisherName != null && com.publisherName != ""}\
		      	<a href="http://${com.publisherName|parentDomain}${prefix}/" target="_blank">\
					{if com.publisherAvatar==null || com.publisherAvatar==0 || com.publisherAvatar==-1000}\
						<img class="g_img_04 g_c_hand bd01" id="imgPubPic_${com.id}" src="${formatImageUrl(defaultVisitorAvatarUrl)}" onerror="this.src=\'http://st.blog.163.com/style/common/stranger.gif\'"/>\
					{else}\
						<img class="g_img_04 g_c_hand bd01" id="imgPubPic_${com.id}" src="${formatImageUrl(com.publisherAvatarUrl)}" onerror="this.src=\'http://st.blog.163.com/style/common/stranger.gif\'" />\
					{/if}\
				</a>\
				<a id="aComPubName_${com.id}" {if com.publisherId == hostId}class="g_t_left g_p_left g_h_20 g_p_block g_w_100 n_ m9com c06"{else}class="g_t_left g_p_left g_t_hide g_p_block g_h_20 g_w_100 c06"{/if} href="http://${com.publisherName|parentDomain}${prefix}/" title="${com.publisherNickname|js_string}" target="_blank">\
				{if com.publisherId == hostId}<p class="g_t_hide g_c_hand g_p_left" style="width:60px">${com.publisherNickname|escape}</p>{else}<span style="margin-left:10px">${com.publisherNickname|escape}<span>{/if}</a>\
			  {else}\
			  	  <span class="g_p_block g_h_20 g_t_hide g_w_100 c06">${com.publisherNickname|escape}</span>\
			  	  <div class="c09 g_w_95" style="padding-top:8px">${com.ipName}</div>\
			  {/if}\
	        </td>\
	        <td class="g_layout_04_1">\
	          <div class="c g_t_wrap c07">${com.content}</div>\
	          <div class="g_h_20">\
	          	 {if supportDeleteComment == true && visitorId == hostId}\
	          	 <span class="g_p_right n_ n6 g_c_hand" onclick="${containerObjName}.deleteComment(\'${com.id}\');" title="ɾ��">&nbsp;</span>\
	          	 {/if}\
	             <span id="report_${com.id}" class="g_p_right n_ n8 g_c_hand" onclick="${containerObjName}.reportBad(\'${com.id}\');" title="Ͷ�ߴ�����">&nbsp;</span>\
		     <span class="g_p_right">&nbsp;&nbsp;</span>\
	             <span class="g_p_right c09">${NetEase.DateTime.formatRecentDate(com.publishTime,"yyyy-MM-dd HH:mm")}\
	             {if com.circleId>0}, ��Դ: [<a class="c08" href="${circleBaseUrl}/${com.circleUrlName}" target="_blank">${com.circleName}</a>]&nbsp;&nbsp;{/if}\
	             </span>\
	          </div>\
	        </td>\
	      </tr>\
	    </table>\
	    {/for}\
 	</div>\
	<div class="g_h_20 bd1b g_c_mgin">\
	  <ul class="g_menu_09 g_w_at c06">\
		  <li>\
		    {if (coms != null) && (comCount > (commentRange * pageNum))}\
		      <a id="spnNextPage_${parentId}" href="javascript:;" onclick="${containerObjName}.moveToPage(${pageNum} + 1, true);return false;">��ҳ</a>\
		    {else}��ҳ{/if}\
		  </li>\
		  <li><span>${pageNum}/${totalPageNum}</span></li>\
		  <li>\
		    {if pageNum > 1}\
		      <a id="spnPrevPage_${parentId}" href="javascript:;" onclick="${containerObjName}.moveToPage(${pageNum} - 1, true);return false;">��ҳ</a>\
		    {else}��ҳ{/if}\
		  </li>\
	  </ul>\
    </div>\
    {else}\
	    {if noCommentRight == false}\
	    <div id="comShowHeader_${parentId}" class="g_h_20 g_c_mgin">\
			<span class="g_p_right g_c_hand n_ n7" onclick="${containerObjName}.closeComments(\'${parentId}\');return false;" title="�ر�" >&nbsp;</span>\
		</div>\
		{/if}\
    {/if}\
');

var jst_global_comment_pub = new String('\
	 <div class="g_c_pdin">\
	 	 {if (noCommentRight == true)}\
		   <div class="loginsection">\
			{if allowComment == 0}\
				<span class="n_ n21">&nbsp;</span>��¼������Է������ۣ����ȵ�¼��&nbsp;&nbsp;&nbsp;</span><a href="#" onclick="showLoginDlg(DomainMap.serverHostName);return false;">��¼>></a>\
			{elseif allowComment == 100}\
				{if visitorRank==-100}\
					<span class="n_ n21">&nbsp;</span>��¼������Է������ۣ����ȵ�¼��&nbsp;&nbsp;&nbsp;<a href="#" onclick="showLoginDlg(DomainMap.serverHostName);return false;">��¼>></a>\
				{elseif visitorRank ==0}\
					<span class="n_ n21">&nbsp;</span>��Ӳ���Ϊ���ѿ��Է������ۣ����ȼ�Ϊ���ѡ�&nbsp;&nbsp;&nbsp;<a id="AComment${parentId}" href="#" onclick="neFocusMe.showAddFriend();return false;">��Ϊ����>></a>\
				{/if}\
			{elseif allowComment == 10000}\
				<span class="n_ n21">&nbsp;</span>�����ݽ������͡�\
			{/if}\
		   </div>\
		 {/if}\
		 <div {if (noCommentRight == true)} style="display:none;"{/if}>\
		 	 {if visitorRank <= -100}\
		 	 	<div class="g_layout_05 g_h_20 g_t_left">\
				  <input type="text" id="username${parentId}" style="width:170px;" class="bd01 g_t_disable nvb" name="username${parentId}" value="${userName}" maxlength="18"/>&nbsp;&nbsp;&nbsp;&nbsp;\
				  <a class="c06"  href="#" onclick="showLoginDlg(DomainMap.serverHostName);return false;">��Ҫ��¼&nbsp;-&gt;</a>\
			    </div>\
		 	 {else}\
		 	 	<div class="g_layout_05">\
				  <div class="l g_t_left">\
				  	{if visitorAvatarDefault == true}\
				    	<img class="g_img_04 bd01" src="${formatImageUrl(defaultVisitorAvatarUrl)}" onerror="this.src=\'http://st.blog.163.com/style/common/stranger.gif\'" width="60px" height="60px" title="��ʾͷ��">\
				    {else}\
				    	<img class="g_img_04 bd01" src="${formatImageUrl(visitorAvatar)}" onerror="this.src=\'http://st.blog.163.com/style/common/stranger.gif\'" width="60px" height="60px" title="��ʾͷ��">\
				    {/if}\
				  </div>\
				  <div class="r g_t_left"><input class="bd01 g_t_disable vb" style="width:170px;" id="username${parentId}" name="username${parentId}" value="${userName}" type="text" maxlength="18"/></div>\
			 	  <div class="g_p_clear g_t_space">&nbsp;</div>\
			 	</div>\
		 	 {/if}\
			 <div class="g_c_smvdn bd01" id="edt${parentId}"><!--�˴���ʾ���۱༭��--></div>\
			 <div id="validCode${parentId}" class="g_c_mvdn g_t_left g_h_25" style="display:none;"></div>\
			 <div class="g_h_25 g_c_mvdn g_t_left">\
			 	 <span id="$$_compubbtn${parentId}"  {if disabled == true}class="g_disable"{else}class=""{/if}>\
				 <a class="g_enable g_c_button bd01 butn"  id="$$_compubbtn${parentId}" href="#" onclick="${containerObjName}.addComment(\'${parentId}\'); return false;">��������</a>\
				 <a class="g_dsable g_c_button bd01 butn" disabled="true">��������</a>&nbsp;&nbsp;\
				 </span>\
				 <a class="g_c_button bd01 butn" id="$$_comcancelbtn${parentId}" onclick="${containerObjName}.closeComments(\'${parentId}\');return false;" {if disabled == true}disabled="true"{/if}>ȡ����</a>&nbsp;&nbsp;\
			     <span id="$$_comsubmithint${parentId}" style="display:none;"></span>\
			 </div>\
		 </div>\
	 </div>\
');
// Flash Player Version Detection - Rev 1.5
// Detect Client Browser type
// Copyright(c) 2005-2006 Adobe Macromedia Software, LLC. All rights reserved.
//var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
//var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
//var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;

function ControlVersion()
{
	var version;
	var axo;
	var e;

	// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry

	try {
		// version will be set for 7.X or greater players
		axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		version = axo.GetVariable("$version");
	} catch (e) {
	}

	if (!version)
	{
		try {
			// version will be set for 6.X players only
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
			
			// installed player is some revision of 6.0
			// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
			// so we have to be careful. 
			
			// default to the first public version
			version = "WIN 6,0,21,0";

			// throws if AllowScripAccess does not exist (introduced in 6.0r47)		
			axo.AllowScriptAccess = "always";

			// safe to call for 6.0r47 or greater
			version = axo.GetVariable("$version");

		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 4.X or 5.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 3.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = "WIN 3,0,18,0";
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 2.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			version = "WIN 2,0,0,11";
		} catch (e) {
			version = -1;
		}
	}
	
	return version;
}

// JavaScript helper required to detect Flash Player PlugIn version information
function GetSwfVer(){
	// NS/Opera version >= 3 check for Flash plugin in plugin array
	var flashVer = -1;
	
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;			
			var descArray = flashDescription.split(" ");
			var tempArrayMajor = descArray[2].split(".");
			var versionMajor = tempArrayMajor[0];
			var versionMinor = tempArrayMajor[1];
			if ( descArray[3] != "" ) {
				tempArrayMinor = descArray[3].split("r");
			} else {
				tempArrayMinor = descArray[4].split("r");
			}
			var versionRevision = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;
			var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
		}
	}
	// MSN/WebTV 2.6 supports Flash 4
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	// WebTV 2.5 supports Flash 3
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	// older WebTV supports Flash 2
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	else if ( isIE && isWin && !isOpera ) {
		flashVer = ControlVersion();
	}	
	return flashVer;
}

// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
{
	versionStr = GetSwfVer();
	if (versionStr == -1 ) {
		return false;
	} else if (versionStr != 0) {
		if(isIE && isWin && !isOpera) {
			// Given "WIN 2,0,0,11"
			tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
			tempString        = tempArray[1];			// "2,0,0,11"
			versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
		} else {
			versionArray      = versionStr.split(".");
		}
		var versionMajor      = versionArray[0];
		var versionMinor      = versionArray[1];
		var versionRevision   = versionArray[2];

        	// is the major.revision >= requested major.revision AND the minor version >= requested minor
		if (versionMajor > parseFloat(reqMajorVer)) {
			return true;
		} else if (versionMajor == parseFloat(reqMajorVer)) {
			if (versionMinor > parseFloat(reqMinorVer))
				return true;
			else if (versionMinor == parseFloat(reqMinorVer)) {
				if (versionRevision >= parseFloat(reqRevision))
					return true;
			}
		}
		return false;
	}
}

function AC_AddExtension(src, ext)
{
  if (src.indexOf('?') != -1)
    return src.replace(/\?/, ext+'?'); 
  else
    return src + ext;
}

function AC_Generateobj(objAttrs, params, embedAttrs) 
{ 
    var str = '';
    if (isIE && isWin && !isOpera)
    {
  		str += '<object ';
  		for (var i in objAttrs)
  			str += i + '="' + objAttrs[i] + '" ';
  		for (var i in params)
  			str += '><param name="' + i + '" value="' + params[i] + '" /> ';
  		str += '></object>';
    } else {
  		str += '<embed ';
  		for (var i in embedAttrs)
  			str += i + '="' + embedAttrs[i] + '" ';
  		str += '> </embed>';
    }

    document.write(str);
}

function AC_FL_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_GetArgs(args, ext, srcParamName, classid, mimeType){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();    

    switch (currArg){	
      case "classid":
        break;
      case "pluginspage":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "src":
      case "movie":	
        args[i+1] = AC_AddExtension(args[i+1], ext);
        ret.embedAttrs["src"] = args[i+1];
        ret.params[srcParamName] = args[i+1];
        break;
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblClick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
      case "type":
      case "codebase":
      case "id":
        ret.objAttrs[args[i]] = args[i+1];
        break;
      case "width":
      case "height":
      case "align":
      case "vspace": 
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  ret.objAttrs["classid"] = classid;
  if (mimeType) ret.embedAttrs["type"] = mimeType;
  return ret;
}



/******************************���������汾******************************/
var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
var isFirefox = (navigator.userAgent.indexOf("Firefox") != -1) ? true : false;
var IEVer = getIEVer();
//��ȡIE�汾��
function getIEVer(){
	var iVerNo = 0;
	var sVer = navigator.userAgent;
	if(sVer.indexOf("MSIE")>-1){
		var sVerNo = sVer.split(";")[1];
		sVerNo = sVerNo.replace("MSIE","");
		iVerNo = parseFloat(sVerNo);
	}
	return iVerNo;
}


/******************************ʱ���ʽ******************************/
//��ʾ��ʽ����:�� ʱ:��
function getShortDateTime(str) {
	var d = new Date(str);
	var monthInt = d.getMonth() + 1;
	var month = monthInt.toString();
	if (month.length < 2) {
		month = "0" + month;
	}
	var day = d.getDate().toString();
	if (day.length < 2) {
		day = "0" + day;
	}
	var hour = d.getHours().toString();
	if (hour.length < 2) {
		hour = "0" + hour;
	}
	var minute = d.getMinutes().toString();
	if (minute.length < 2) {
		minute = "0" + minute;
	}
	return month + "��" + day + "�� " + hour + ":" + minute;
}

//��ʾ��ʽ����:��:�� ʱ:��:��
function getLongDateTime(str) {
	var d = new Date(str);
	var year = d.getFullYear().toString();
	var monthInt = d.getMonth() + 1;
	var month = monthInt.toString();
	if (month.length < 2) {
		month = "0" + month;
	}
	var day = d.getDate().toString();
	if (day.length < 2) {
		day = "0" + day;
	}
	var hour = d.getHours().toString();
	if (hour.length < 2) {
		hour = "0" + hour;
	}
	var minute = d.getMinutes().toString();
	if (minute.length < 2) {
		minute = "0" + minute;
	}
	var second = d.getSeconds().toString();
	if (second.length < 2) {
		second = "0" + second;
	}
	return year + "��" + month + "��" + day + "�� " + hour + ":" + minute + ":" + second;
}


//��ʾ��ʽ����:��:��
function getLongDate(str) {
	var d = new Date(str);
	var year = d.getFullYear().toString();
	var monthInt = d.getMonth() + 1;
	var month = monthInt.toString();
	if (month.length < 2) {
		month = "0" + month;
	}
	var day = d.getDate().toString();
	if (day.length < 2) {
		day = "0" + day;
	}
	return year + "��" + month + "��" + day + "��";
}

//��ʾ��ʽ����:��:��
function getMediumDate(str) {
	var d = new Date(str);
	var year = d.getFullYear().toString();
	var monthInt = d.getMonth() + 1;
	var month = monthInt.toString();
	if (month.length < 2) {
		month = "0" + month;
	}
	var day = d.getDate().toString();
	if (day.length < 2) {
		day = "0" + day;
	}
	return year + "-" + month + "-" + day;
}

//��ʾ��ʽ����:��
function getShortDate(str) {
	var d = new Date(str);
	var monthInt = d.getMonth() + 1;
	var month = monthInt.toString();
	if (month.length < 2) {
		month = "0" + month;
	}
	var day = d.getDate().toString();
	if (day.length < 2) {
		day = "0" + day;
	}
	return month + "��" + day + "��";
}

//��ʾ��ʽ��ʱ:��
function getShortTime(str) {
	var d = new Date(str);
	var hour = d.getHours().toString();
	if (hour.length < 2) {
		hour = "0" + hour;
	}
	var minute = d.getMinutes().toString();
	if (minute.length < 2) {
		minute = "0" + minute;
	}
	return hour + ":" + minute;
}



//get date  for mysql Date format
function getDateForMysql(str) {
	var d = new Date(str);
	var year = d.getFullYear().toString();
	var monthInt = d.getMonth() + 1;
	var month = monthInt.toString();	
	if (month.length < 2) {
		month = "0" + month;
	}
	var day = d.getDate().toString();
	if (day.length < 2) {
		day = "0" + day;
	}
	var hour = d.getHours().toString();
	if (hour.length < 2) {
		hour = "0" + hour;
	}
	var minute = d.getMinutes().toString();
	if (minute.length < 2) {
		minute = "0" + minute;
	}
	var second = d.getSeconds().toString();
	if (second.length < 2) {
		second = "0" + second;
	}
	return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}


/******************************ȥ���ַ�����ͷβ�ո�******************************/
function Trim(TRIM_VALUE){
	if(TRIM_VALUE.length < 1){
		return"";
	}
	TRIM_VALUE = RTrim(TRIM_VALUE);
	TRIM_VALUE = LTrim(TRIM_VALUE);
	if(TRIM_VALUE==""){
		return "";
	}
	else{
		return TRIM_VALUE;
	}
} //End Function

function RTrim(VALUE){
	var w_space = String.fromCharCode(32);
	var v_length = VALUE.length;
	var strTemp = "";
	if(v_length < 0){
		return"";
	}
	var iTemp = v_length -1;

	while(iTemp > -1){
		if(VALUE.charAt(iTemp) == w_space){
		}
		else{
			strTemp = VALUE.substring(0,iTemp +1);
			break;
		}
		iTemp = iTemp-1;

	} //End While
	return strTemp;

} //End Function

function LTrim(VALUE){
	var w_space = String.fromCharCode(32);
	if(v_length < 1){
		return"";
	}
	var v_length = VALUE.length;
	var strTemp = "";

	var iTemp = 0;

	while(iTemp < v_length){
		if(VALUE.charAt(iTemp) == w_space){
		}
		else{
			strTemp = VALUE.substring(iTemp,v_length);
			break;
		}
		iTemp = iTemp + 1;
	} //End While
	return strTemp;
} //End Function



//�ж��Ƿ�Ϊ<DIV></DIV>��װ�µĿմ�
function isEmptyDiv(str) {
	var trim = Trim(str);
	if (trim == "")
		return true;
	var rep = /^<DIV>(&nbsp;<\/DIV><DIV>)*(&nbsp;)*<\/DIV>$/i;
	if (rep.test(trim)) {
		return true;
	}
	else
		return false;

}

/******************************DOM��������******************************/
function _ge(id){
	return document.getElementById(id);
}

function removeAllChild(el){
		var firstChild = el.firstChild;
		var curChild = firstChild;
		while(curChild != null){
			el.removeChild(curChild);	
			curChild = curChild.nextSibling;
		}
}

function insertAfter(parent, node, referenceNode) {
    parent.insertBefore(node, referenceNode.nextSibling);
}

/******************************�ַ���������ȷ�Լ��******************************/
//��������Ƿ������Ǻ�ȫ�ǵĵ�˫���š�����б�ܡ�������
function containsIllegalChar(content) {
	var regi = /^(.*)['"����\/\\<>](.*)$/;
	if (regi.test(content))
		return true;
	else
		return false;
}


function testUrl(str){
	var illegalChar = /^(.*)['"����<>](.*)$/;
	if (illegalChar.test(str))
		return false;
	else
		return true;
}

function checkUserName(str) {
	//var illegalChar = /^(.*)['"����\/\\<>](.*)$/;
	var illegalChar = /^(.*)[<>](.*)$/;
	if (illegalChar.test(str))
		return false;
	else
		return true;
}

function checkMail(str){
	var mail=/^(.+)@(.+)\.(.+)$/;
	if(!mail.test(str))
		return false;
	if(str.indexOf('@') != str.lastIndexOf('@'))	
		return false;
	var illegalChar = /^(.*)['"����\/\\<>](.*)$/;
	if (illegalChar.test(str))
		return false;
	else
		return true;
}

//������ڸ�ʽ��xxxx-xx-xx��
function checkDateFormat(str) {
	var format = /^\d{4}\-\d{2}\-\d{2}$/;
	if (format.test(str)) 
		return true;
	else 
		return false;
}

//��������Ƿ���ȷ��Ӧ��С�ڽ���
function checkBirthday(str) {
	var today = new Date();
	var barray = str.split(new RegExp("-", "g"));
	var birthday = new Date(barray[0], barray[1] - 1 , barray[2]);
	if (parseInt(barray[0]) < 1900) {
		return -1;
	}
	if (birthday.getTime() > today.getTime()) {
		return 1;
	}
	else if (birthday.getFullYear() < 1900) {
		return -1;
	}
	else {
		return 0;
	}
}

//��html��������ȡ�ı�
function extractHtmlText(content) {
	content = content//.replace(/<[^<>]*>/ig,"")
		.replace(/&nbsp;/ig," ")
		.replace(/&lt;/ig,"<")
		.replace(/&gt;/ig,">")
		.replace(/&#039;/ig,"'")
		.replace(/&quot;/ig,"\"")
		.replace(/&amp;/ig,"&");
	return content;
}

function convertStr(str){
	if(str == null)
		return '&nbsp;';
	str=Trim(str);
	if(str=='')
		str='&nbsp;';		
	return str;	
}

//�ѻس����滻��<br>���
function replaceLineBreak(str) {
	return str.replace("\n", "<br>");
}

//textarea�ͻ���������������ַ���,�÷� onkeyup="textareaLimit(this, 250)"
function textareaLimit(field, maxlen){
	if (field.value.length > maxlen) {		
		field.value = field.value.substring(0, maxlen);
		alert("���������������" + maxlen +"��! ");
	}
}
function textLimit(text, maxlen){
	if (text.length > maxlen) {		
		text = text.substring(0, maxlen);
		alert("���������������" + maxlen +"��! ");
	}
}

//���ַ����еĻ���ת����ҳ����ʾ����Ҫ��<br>����,ʹ�÷���str.nlToBr()
String.prototype.nlToBr=function(){return this.trim().nl2br();}
String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"");};
String.prototype.nl2br=function(){return this.split("\n").join("<br />\n");};
String.prototype.trimSQ= function(){return this.replace("&#39;","\\\'");};//��esacpe��ĵ�����ת��Ϊת��ĵ�����
String.prototype.escape=function(){return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g,"&#34;").replace(/'/g,"&#39;");};
String.prototype.js_escape=function(){return this.replace(/\\/g, "\\\\").replace(/'/g, "\\&#39;").replace(/"/g, "\\&#34;");};
String.prototype.escape_freemark=function(){return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g,"&quot;");};
String.prototype.unescape_freemark=function(){return this.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g,"\"");};

//��trimpath��ͻ����ע��
//String.prototype.replace=function(_7,_8){return this.split(_7).join(_8);};

//��������
function searchList(el, list){
	var i=0;
	for(i=0; i<list.length; i++){
		if(el == list[i]){
			return true;
		}
	}
	
	return false;
}
//ȥ����������ͬ��Ԫ�أ�����ȥ�غ������
function removeSameEl(list){
	var newList = new Array();
	var i;
	var el;
	
	for(i=0; i<list.length; i++){
		el = list[i];
		if(el != null){
			var data;
			if(!searchList(el, newList)){
				newList.push(el);
			}	
		}
	}
	
	return newList;
}

//������ָ��λ�ò���Ԫ�أ�position<0������ǰ�棬�������鳤�Ȳ�������档ǰ��Ԫ�ز��䣬�����Ԫ�غ���
function insertShiftAt(list, el, position){
	if(position < 0){
		position = 0;
	}else if(position > list.length){
		positon = list.length;
	}
	var prevList
	var nextList;
	for(i=list.length; i>position ; i--){
		list[i] = list[i-1];
	}
	list[position] = el;
}

//�õ��¼�������Ԫ��
var _get_event_src=function(e){
	if(e){
		return e.target;
	}
	if(window.event){
		return window.event.srcElement;
	}
	return null;
};


/*
function addToHead(str, addstr) {
	str = addstr + str;
	return str;
}

function removeFromHead(str, removestr) {
	str = str.substring(removestr.length);
	return str
}*/

//Ϊ��������µ�css������ԭ�ȵ�ĳЩֵ
function appendCss(elem, newCss) {
	$(elem).className += " " + newCss; 
}

//ɾ��class��������������css
function removeLastCss(elem, oldCss) {
	$(elem).className = $(elem).className.replace(new RegExp(" " + oldCss + "\\b"), ""); 
}

//����focus�¼���ʹinputԪ��ѡ��ʱ��ɫ
function attachFocusEvent(focusArray, focusCss) {
	focusArray.each(function(E){ 
		if($(E)){
			$(E).onfocus=function(){ 
				this.className += " " + focusCss; 
			} 
			$(E).onblur=function() { 
				this.className=this.className.replace(new RegExp(" *" + focusCss + "\\b"), ""); 
			}
		} 
	});
}

function attachOverEvent(focusArray, focusCss) {
	focusArray.each(function(E){ 
		if($(E)){
			$(E).onmouseover=function(){ 
				this.className += " " + focusCss; 
			} 
			$(E).onmouseout=function() { 
				this.className=this.className.replace(new RegExp(" *" + focusCss + "\\b"), ""); 
			}
		} 
	});
}

function applySelectCss(id){
	var _htc_select_reg = /\bselitm\b/g;
   	if(window.$$_last_select != null){
   		window.$$_last_select.className = window.$$_last_select.className.replace(_htc_select_reg,"");
    }
    if($(id)){
	    $(id).className += " selitm";
	    window.$$_last_select = $(id);
    }else{
    	window.$$_last_select = null;
    }
}

//����focus�¼���ʹinputԪ��ѡ��ʱ��ɫ��ͬʱִ��focusFunc�¼���blurFunc�¼�������thisΪ����
function attachFocusEvent2(focusArray, focusCss, focusFunc, blurFunc) {
	focusArray.each(function(E){ 
		if($(E)){
			$(E).onfocus=function(){ 
				this.className += " " + focusCss; 
				if(focusFunc != null){
					focusFunc($(E));
				}
			} 
			$(E).onblur=function() { 
				this.className=this.className.replace(new RegExp(" " + focusCss + "\\b"), ""); 
				if(blurFunc != null){
					blurFunc($(E));
				}
			}
		} 
	});
}

function focusEvent(obj,focusCss){
	obj.className+=" "+focusCss;
}

function blurEvent(obj,focusCss){
	obj.className=obj.className.replace(new RegExp(" " + focusCss + "\\b"), ""); 
}

function disable(elem) {
	$(elem).disabled = true;
}

function enable(elem) {
	$(elem).disabled = false;
}

// value Ϊ������,len����С�������ȡlenλ
function getFloat(value,len){
	  var str = value.toString();
	  var index = str.indexOf(".");  
	  if (index == -1)
	     return parseFloat(str);  
	  if (len == 0 )
	     return parseFloat(str.substr(0,index));
	  else
	     return parseFloat(str.substr(0,index + len + 1));
 }

 //�����ı����ݣ���������ͨ��ѡ�����õ�ַ
 function copyText(elemId) {
 	ie = (document.all)? true:false
    if (ie){
	 	var rng = document.body.createTextRange(); //�г������ı���������
	 	rng.moveToElementText($(elemId));//�ƶ��ı���Χ�Ա㷶Χ�Ŀ�ʼ�ͽ���λ���ܹ���ȫ��������Ԫ�ص��ı�
	 	rng.scrollIntoView();//scrollIntoView ������������ɼ���Χ�ڣ��������е����ڶ�����ײ�
	    rng.select();//ѡ��
	    rng.execCommand("Copy");//����
	    rng.collapse(false);
	    return true;
    } else {
    	alert("����������ȫ���ò������Զ�ִ�и��Ʋ�������ѡ���ı�ʹ�ü���(Ctrl+C)���ƣ�");	
    	return false;
    }
 }
 
 //����Ƿ�װ����ȷ��flash player 7
 function detectFlash(){
	// Major version of Flash required
	var reqMajorVer = 7;
	// Minor version of Flash required
	var reqMinorVer = 0;
	// Minor version of Flash required
	var reqRevision = 0;
	
 	reqVer = parseFloat(reqMajorVer + "." + reqRevision);
	if (isIE && isWin && !isOpera) {
		versionStr = VBGetSwfVer();
	} else {
		versionStr = JSGetSwfVer();		
	}
	if (versionStr == -1 ) { 
		return false;
	} else if (versionStr != 0) {
		if(isIE && isWin && !isOpera) {
			tempArray         = versionStr.split(" ");
			tempString        = tempArray[1];
			versionArray      = tempString .split(",");				
		} else {
			versionArray      = versionStr.split(".");
		}
		versionMajor      = versionArray[0];
		versionMinor      = versionArray[1];
		versionRevision   = versionArray[2];
		
		if(versionRevision <= 0 && versionArray.length > 3) 
			versionRevision = versionArray[3];
		
		versionString     = versionMajor + "." + versionRevision;   // 7.0r24 == 7.24
		versionNum        = parseFloat(versionString);
		
    	// is the major.revision >= requested major.revision AND the minor version >= requested minor
		if ( (versionMajor > reqMajorVer) && (versionNum >= reqVer) ) {
			return true;
		} else {
			return ((versionNum >= reqVer && versionMinor >= reqMinorVer) ? true : false );	
		}
	}	
}
// JavaScript helper required to detect Flash Player PlugIn version information
function JSGetSwfVer(){
	// NS/Opera version >= 3 check for Flash plugin in plugin array
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
      		var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
			descArray = flashDescription.split(" ");
			tempArrayMajor = descArray[2].split(".");
			versionMajor = tempArrayMajor[0];
			versionMinor = tempArrayMajor[1];
			if ( descArray[3] != "" ) {
				tempArrayMinor = descArray[3].split(/\D/);
			} else {
				tempArrayMinor = descArray[4].split(/\D/);
			}
      		versionRevision = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;
            flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
      	} else {
			flashVer = -1;
		}
	}
	// MSN/WebTV 2.6 supports Flash 4
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	// WebTV 2.5 supports Flash 3
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	// older WebTV supports Flash 2
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	// Can't detect in all other cases
	else {
		flashVer = -1;
	}
	return flashVer;
}

/******************************���overʱͼƬ�滻******************************/
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

/*
function showStatus(message){
	$('status').innerHTML='<img src="'+style+'/icon_confirm.gif"/>'+message;
	$('status').style.visibility='visible';
}*/

/******************************��ȡ����Ķ�λ******************************/
//��λ����
function getBrowserPositionX(obj){
	var res = obj.offsetWidth + 5;
	while (obj != null){
		res += obj.offsetLeft;
		obj = obj.offsetParent;
	}
	return res;
}

function getBrowserPositionY(obj){
	var res = 0;
	while (obj != null){
		res += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return res;
}


/******************************���ŷָ����ַ����Ĵ���******************************/
//�Ѷ��ŷָ���tag�ַ���ȥ�أ��滻Ӣ�Ķ��ź�ȥ��β�ո�ȥ���մ�
//tag�18�ַ���ȥ���Ƿ��ַ�
function processTagString(tags) {	
	//�����Ķ���ȫ�滻��Ӣ�Ķ���
	tags = tags.replace(/��/gi, ",").replace(/��/g,"\"").replace(/��/g,"\"");
	tags = tags.toLowerCase();
	//tags = tags.replace(/[&<>"'\/\\]/g, "");
	
	//ȥ��
	var tagList = tags.split(",");
	//ȥ����β�Ŀո�
	for (var i = 0; i < tagList.length; i++) {
		tagList[i] = Trim(tagList[i]);
	}
	tagList = removeSameEl(tagList);
	tags = "";
	for (var i = 0; i < tagList.length; i++) {
		if(tagList[i]!=""){
			if (tags!="")
				tags += ",";		
			tags += tagList[i].substring(0,36);
		}
	}

	return tags;
}

//�õ�tagUserStatistic����
function getTagObjByTagname(tagName, tagId, tagList){
	for(var i=0; tagId && i<tagList.length; i++){
		if(tagList[i].id == tagId){
			return tagList[i];
		}
	}

	for(var i=0; tagName && i<tagList.length; i++){
		if(tagList[i].tagName==tagName || tagList[i].tagName==tagName.toLowerCase()
			 || tagList[i].tagName==tagName.escape() || tagList[i].tagName==tagName.escape_freemark()){
			return tagList[i];
		}
	}
	
	return null;
}

//ֱ��ȥβ
function formatnumber(value,num) 
{
	var a,b,c,i
	a = value.toString();
	b = a.indexOf('.');
	c = a.length;
	if (num==0) {
		if (b!=-1) a = a.substring(0,b);
	} else {
		if (b==-1) {
			a = a + ".";
			for (i=1;i<=num;i++) a = a + "0";
		} else {
			a = a.substring(0,b+num+1);
			for (i=c;i<=b+num;i++) a = a + "0";
		}
	}
	return a;
}

function createJST(jstId, jstContent){
	var textarea = document.createElement('textarea');
	textarea.value = jstContent;
	textarea.id = jstId;
	textarea.style.display = 'none';
	document.body.appendChild(textarea);
}

function createJSTAndParse(jstId, jstContent){
	createJST(jstId, jstContent);
	return TrimPath.parseDOMTemplate(jstId);
}

 
function getInputCharsFromDisplayHTML(sHTML){
		var chars = sHTML;
		chars = chars.replace(/<br>/ig, (Browser.isFirefox() ? "\n" : "\r\n"));
		chars = chars.replace(/&lt;/g, "<");
		chars = chars.replace(/&gt;/g, ">");
		chars = chars.replace(/&quot;/g, "\"");
		chars = chars.replace(/&#039;/g, "'");
		chars = chars.replace(/&amp;/g, "&");
		chars = chars.replace(/&nbsp;/g, " ");
		return chars;
}
	
function toHtmlStr(sChars){
		var html = sChars;
		html = html.replace(/&/g, "&amp;");
		html = html.replace(/</g, "&lt;");
		html = html.replace(/>/g, "&gt;");
		html = html.replace(/"/g, "&quot;");
		html = html.replace(/'/g, "&#039;");
		html = html.replace(/ /g, "&nbsp;");
		html = html.replace(/\n/g, "<br>");
		return html;
}

function formatImageUrl(url){
	if(url !=null && url != "-1000")
		return url;
	return "/style/common/user_default.gif";
}

//��ʾ�ؼ��ֹ�����ʾ��Ϣ
function showKeywordHint(warningLevel, fields) {
	var pagehint = $("$$_pagehint");
	if (pagehint != null) {
		if (warningLevel == 1) {
			pagehint.innerHTML = "�������" + fields + "���зǷ��ַ����������������ǽ���¼���IP��ַ��ID���ϱ�����";
			pagehint.style.display = "block";
		}
		else if (warningLevel == 2) {
			pagehint.innerHTML = "�������" + fields + "���зǷ��ַ������ǽ���¼���IP��ַ��ID���ϱ������Ƿ����������";
			pagehint.style.display = "block";
		}
	}
}

//��ʾҳ����ʾ��Ϣ
function showPageHint(str) {
	var pagehint = $("$$_pagehint");
	if (pagehint != null) {
		pagehint.innerHTML = str;
		pagehint.style.display = "block";
	}
}

//��ʾ�ؼ��ֹ��˵���ʾ��Ϣ
//����ֵ������������������������������, -1:��ֹ����
function filterWarning(keywordRuntimeEx, needTip) {
	if (keywordRuntimeEx == undefined || keywordRuntimeEx == null ||
		keywordRuntimeEx.type != "KeyWordRuntimeException") {
		return 0;
	}
	if (needTip == undefined || needTip == false) {
		alert("�㷢������ݰ������йؼ��֣�����������");
		return -1;
	}
	/*
	var ret = keywordRuntimeEx.result.result;
	if (ret == 2) {//warning
		var fields = keywordRuntimeEx.result.warningFields;
		var fieldStr = "";
		for (var i = 0; i < fields.length; i++) {
			fieldStr += "[" + fields[i] + "]";
		}
		if (confirm("�㷢�����������" + fieldStr + "�������йؼ��֣����ǽ����¼��ķ����¼���Ƿ��������") == true)
			return 1;
		else 
			return 2;
	} else if (ret == 3) {//error
		alert("�㷢������ݰ������йؼ��֣�����������");
		return -1;
	}*/
	return -1;
}

//��֤����󾯸�
function captchaWarning(captchaEx, hintid) {
	if (captchaEx == undefined || captchaEx == null ||
			captchaEx.type != "CaptchaException") {
		return false;
	}
	
	showInfo(hintid, "��֤�벻��ȷ", "error");
	
	return true;
}

//�������վ���url
function checkOtherSiteUrl(content) {
	var match = false;
	var index = 0;
	while ((index = content.indexOf("http://")) != -1) {	    			
		var url = content.substring(index + 7);
		var endIndex = url.indexOf("163.com");
		if (endIndex > -1) {
			var j = index;
			while (j < endIndex) {
				var ch = url.charAt(j);
				if (!((ch >= '0' && ch <= '9') || (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch == '.')) {
					match = true;
					break;
				} 
				j++;
			}
			// ƥ������www.music163.com���������
			if (endIndex > 0 && url.charAt(endIndex - 1) != '.') {
				match = true;
				break;
			}
			
			content = url;
		} else {
			match = true;
			break;
		}
		
		if (match == true) {
			break;
		}
	}
	return match;
}

/*�����밴ť�Ա���ʾ��ʾ��Ϣ*/
function showInfo(id, msg, type) {
	var infodiv = document.getElementById(id);
	if (infodiv == null) {
		alert(msg);
		return false;
	}
	
	infodiv.style.display='inline';
	if (type == "ok")
		infodiv.innerHTML = '<img src="/style/common/ico_alert.gif"/>' + msg;
	else if (type == "info")
		infodiv.innerHTML = '<img src="/style/common/ico_alert.gif"/>' + msg;
	else if (type == "error")
		infodiv.innerHTML = '<img src="/style/common/ico_alert.gif"/>' + msg;
	else
		infodiv.innerHTML = '<img src="/style/common/ico_alert.gif"/>' + msg;
	window.setTimeout(
		function () {
			fadeInfo(id);
		}, 5000);
}
function fadeInfo(id) {
	document.getElementById(id).style.display='none';
}


/*
 *noStripTags������ʾ����Ҫ���˵ı�ǵ�����
 */ 
function stripData(content, noStripTags){
	var badContent=["head","script","style","object","applet","noscript","frameset","noframes"];
	var badTag = ["form","meta","body","html","label","select","optgroup","option",
				"textarea","title","script", "xmp", "applet","embed","head","frameset",
				"iframe","noframes","noscript","object","style",
				"input","base","basefont","isindex","link","frame","param","xml","xss","st1:chsdate"];
	var badAction = ["onabort", "onblur","onchange","onclick","ondblclick",
					"ondragdrop","onerror","onfocus","onkeydown","onkeypress",
					"onkeyup","onload","onmousedown","onmousemove","onmouseout",
					"onmouseover","onmouseup","onmove","onreset","onresize","onselect",
					"onsubmit","onunload","allowScriptAccess","allowNetworking","disabled","id","name","class"];
	var badCss = ["position","javascript","vbscript","actionscript", "xmp", "activex"];
	var isHarm=false;
	var regStr;
	var reg = new RegExp("(&#)|(&%)","ig");	
	if(reg.test(content)){
		//isHarm = true;
		content = content.replace(reg,"&");			
	}
	delete reg;
	reg = new RegExp("(\t)","ig");
	if(reg.test(content)){
		//isHarm = true;
		content = content.replace(reg," ");
	}
	delete reg;
	regStr = "(<[^<>]*)(\r|\n)([^>]*>)";	
	reg = new RegExp(regStr,"ig");
	while(reg.test(content)){
		//isHarm = true;
		content = content.replace(reg,"$1 $3");
		delete reg;	
		reg = new RegExp(regStr,"ig");
	}
	delete reg;
	regStr = "(<[^<>]*)(\\\\|/\\*.*\\*/)([^>]*>)";
	reg = new RegExp(regStr,"ig");
	while(reg.test(content)){
		//isHarm = true;
		content = content.replace(reg,"$1$3");
		delete reg;	
		reg = new RegExp(regStr,"ig");
	}
	delete reg;		
	for(var i=0;i<badContent.length;i++){
		if (findNoStripTag(badContent[i],noStripTags))
			continue;
		regStr="<\\s*"+badContent[i]+"[^>]*>[\\s\\S]*?<\\s*/\\s*"+badContent[i]+"[^>]*>";
		reg = new RegExp(regStr,"ig");
		while(reg.test(content)){
			isHarm = true;
			content = content.replace(reg,"");
			delete reg;
			reg = new RegExp(regStr,"ig");
		}
		delete reg;				
	}
	for(var i=0;i<badTag.length;i++){
		if (findNoStripTag(badTag[i],noStripTags))
			continue;
		regStr="<\\s*[/\?]?\\s*"+badTag[i]+"[^>]*>";
		reg = new RegExp(regStr,"ig");
		while(reg.test(content)){
			isHarm = true;
			content = content.replace(reg,"");
			delete reg;
			reg = new RegExp(regStr,"ig");
		}
		delete reg;				
	}
	for(var i=0;i<badAction.length;i++){
		if (findNoStripTag(badAction[i],noStripTags))
			continue;
		regStr="(<[^<]*[\\s'\"])"+badAction[i]+"\\s*=\\s*['\"]?[^\\s'\">]*[\\s'\"]?([^>]*>)";
		reg = new RegExp(regStr,"ig");
		while(reg.test(content)){
			if(badAction[i]!="allowScriptAccess"||badAction[i]!="allowNetworking")
				isHarm = true;
			content = content.replace(reg,"$1$2");
			delete reg;
			reg = new RegExp(regStr,"ig");
		}
		delete reg;		
	}	
	reg = new RegExp("(<\\s*embed)([^>]*>)","ig");
	if(reg.test(content)){
		 content = content.replace(reg,"$1 allowScriptAccess=\"never\" allowNetworking=\"internal\" $2");		
	}
	delete reg;
	for(var i=0;i<badCss.length;i++){
		if (findNoStripTag(badCss[i],noStripTags))
			continue;
		regStr="(<[^<]*)"+badCss[i]+"\\s*:\\s*[^\\s;\">]*([^>]*>)";
		reg = new RegExp(regStr,"ig");
		while(reg.test(content)){
			isHarm = true;
			content = content.replace(reg,"$1$2");
			delete reg;
			reg = new RegExp(regStr,"ig");
		}
		delete reg;		
	}
	regStr = "(<[^<]*)expression\\s*\\([^\\)]*\\)([^>]*>)";	
	reg = new RegExp(regStr,"ig");	
	while(reg.test(content)){
		isHarm = true;
		content = content.replace(reg,"$1$2");
		delete reg;
		reg = new RegExp(regStr,"ig");
	}
	delete reg;
	regStr = "(<[^<]*)url\\s*\\([^\\)]*\\.(js|do)\\s*\\)([^>]*>)";	
	reg = new RegExp(regStr,"ig");	
	while(reg.test(content)){
		isHarm = true;
		content = content.replace(reg,"$1$3");
		delete reg;
		reg = new RegExp(regStr,"ig");
	}
	delete reg;	
	regStr = "(<[^<]*[\\s'\"])src\\s*=\\s*['\"]?.*?\\.(js|do)(>)";	
	reg = new RegExp(regStr,"ig");	
	while(reg.test(content)){
		isHarm = true;
		content = content.replace(reg,"$1$3");
		delete reg;
		reg = new RegExp(regStr,"ig");
	}
	delete reg;
	regStr = "(<[^<]*[\\s'\"])src\\s*=\\s*['\"]?.*?\\.(js|do)[\\s'\"]([^>]*>)";	
	reg = new RegExp(regStr,"ig");	
	while(reg.test(content)){
		isHarm = true;
		content = content.replace(reg,"$1$3");
		delete reg;
		reg = new RegExp(regStr,"ig");
	}
	delete reg;	
	var retobj = {};
	retobj.content = content;
	retobj.isHarm = isHarm;
	return retobj;
}

function findNoStripTag(tag,tags){
	if(tags==null || tags=="")
		return false;
	for(var i=0;i<tags.length;i++){
		if(tags[i]==tag)
			return true;
	}
	return false;
}

///////////////////////////base64////////////////////
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
//�ͻ���Base64����
function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
 c1 = str.charCodeAt(i++) & 0xff;
 if(i == len)
 {
     out += base64EncodeChars.charAt(c1 >> 2);
     out += base64EncodeChars.charAt((c1 & 0x3) << 4);
     out += "==";
     break;
 }
 c2 = str.charCodeAt(i++);
 if(i == len)
 {
     out += base64EncodeChars.charAt(c1 >> 2);
     out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
     out += base64EncodeChars.charAt((c2 & 0xF) << 2);
     out += "=";
     break;
 }
 c3 = str.charCodeAt(i++);
 out += base64EncodeChars.charAt(c1 >> 2);
 out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
 out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
 out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}
//�ͻ���Base64����
function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
 /* c1 */
 do {
     c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
 } while(i < len && c1 == -1);
 if(c1 == -1)
     break;

 /* c2 */
 do {
     c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
 } while(i < len && c2 == -1);
 if(c2 == -1)
     break;

 out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

 /* c3 */
 do {
     c3 = str.charCodeAt(i++) & 0xff;
     if(c3 == 61)
  return out;
     c3 = base64DecodeChars[c3];
 } while(i < len && c3 == -1);
 if(c3 == -1)
     break;

 out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

 /* c4 */
 do {
     c4 = str.charCodeAt(i++) & 0xff;
     if(c4 == 61)
  return out;
     c4 = base64DecodeChars[c4];
 } while(i < len && c4 == -1);
 if(c4 == -1)
     break;
 out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}


function utf16to8(str) {
    var out, i, len, c;

    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
 c = str.charCodeAt(i);
 if ((c >= 0x0001) && (c <= 0x007F)) {
     out += str.charAt(i);
 } else if (c > 0x07FF) {
     out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
     out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
     out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
 } else {
     out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
     out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
 }
    }
    return out;
}

function setHomePageUtil(url){
//	UserBean.incrPageView("sethomepage", null);
	if(document.all){
		document.body.style.behavior="url(#default#homepage)";
		document.body.setHomePage(url);
	}else{
		alert("�������֧�֣����ֶ�����Ϊ��ҳ");
	}
	return false;
}

function addFavoriteUtil(url, desc, descOther){
	if(desc==null || desc=="")
		desc = descOther;
//	UserBean.incrPageView("addfavorite", null);
	if (document.all && window.external){
		window.external.AddFavorite(url, desc+"�����ײ���");
	}else if (window.sidebar){
		window.sidebar.addPanel(desc+"�����ײ���", url, "");
	}else{
		alert("�������֧�֣����ֶ������ղؼ�");
	}
}

function toDHTML(str){
	return str.replace(/&/g, '&amp;')
		.replace(/</g, 	'&lt;'	)
		.replace(/>/g, 	'&gt;'	)
		.replace(/"/g, 	'&quot;')
		.replace(/'/g, 	'&#039;')
		.replace(/ /g, 	'&nbsp;')
		.replace(/\n/g, '<br>'	);
}


/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}

/*  Prototype JavaScript framework, version 1.4.0
 *  (c) 2005 Sam Stephenson <sam@conio.net>
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://prototype.conio.net/
 *
/*--------------------------------------------------------------------------*/

var Prototype = {
  Version: '1.4.0',
  ScriptFragment: '(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)',

  emptyFunction: function() {},
  K: function(x) {return x}
}

var Class = {
  create: function() {
    return function() {
      this.initialize.apply(this, arguments);
    }
  }
}

var Abstract = new Object();

Object.extend = function(destination, source) {
  for (property in source) {
    destination[property] = source[property];
  }
  return destination;
}

Object.inspect = function(object) {
  try {
    if (object == undefined) return 'undefined';
    if (object == null) return 'null';
    return object.inspect ? object.inspect() : object.toString();
  } catch (e) {
    if (e instanceof RangeError) return '...';
    throw e;
  }
}

Function.prototype.bind = function() {
  var __method = this, args = $A(arguments), object = args.shift();
  return function() {
    return __method.apply(object, args.concat($A(arguments)));
  }
}

Function.prototype.bindAsEventListener = function(object) {
  var __method = this;
  return function(event) {
    return __method.call(object, event || window.event);
  }
}

Object.extend(Number.prototype, {
  toColorPart: function() {
    var digits = this.toString(16);
    if (this < 16) return '0' + digits;
    return digits;
  },

  succ: function() {
    return this + 1;
  },

  times: function(iterator) {
    $R(0, this, true).each(iterator);
    return this;
  }
});

var Try = {
  these: function() {
    var returnValue;

    for (var i = 0; i < arguments.length; i++) {
      var lambda = arguments[i];
      try {
        returnValue = lambda();
        break;
      } catch (e) {}
    }

    return returnValue;
  }
}

/*--------------------------------------------------------------------------*/

var PeriodicalExecuter = Class.create();
PeriodicalExecuter.prototype = {
  initialize: function(callback, frequency) {
    this.callback = callback;
    this.frequency = frequency;
    this.currentlyExecuting = false;

    this.registerCallback();
  },

  registerCallback: function() {
    setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
  },

  onTimerEvent: function() {
    if (!this.currentlyExecuting) {
      try {
        this.currentlyExecuting = true;
        this.callback();
      } finally {
        this.currentlyExecuting = false;
      }
    }
  }
}

/*--------------------------------------------------------------------------*/

function $() {
  var elements = new Array();

  for (var i = 0; i < arguments.length; i++) {
    var element = arguments[i];
    if (typeof element == 'string')
      element = document.getElementById(element);

    if (arguments.length == 1)
      return element;

    elements.push(element);
  }

  return elements;
}
Object.extend(String.prototype, {
  stripTags: function() {
    return this.replace(/<\/?[^>]+>/gi, '');
  },

  stripScripts: function() {
    return this.replace(new RegExp(Prototype.ScriptFragment, 'img'), '');
  },

  extractScripts: function() {
    var matchAll = new RegExp(Prototype.ScriptFragment, 'img');
    var matchOne = new RegExp(Prototype.ScriptFragment, 'im');
    return (this.match(matchAll) || []).map(function(scriptTag) {
      return (scriptTag.match(matchOne) || ['', ''])[1];
    });
  },

  evalScripts: function() {
    return this.extractScripts().map(eval);
  },

  escapeHTML: function() {
    var div = document.createElement('div');
    var text = document.createTextNode(this);
    div.appendChild(text);
    return div.innerHTML;
  },

  unescapeHTML: function() {
    var div = document.createElement('div');
    div.innerHTML = this.stripTags();
    return div.childNodes[0] ? div.childNodes[0].nodeValue : '';
  },

  toQueryParams: function() {
    var pairs = this.match(/^\??(.*)$/)[1].split('&');
    return pairs.inject({}, function(params, pairString) {
      var pair = pairString.split('=');
      params[pair[0]] = pair[1];
      return params;
    });
  },

  toArray: function() {
    return this.split('');
  },

  camelize: function() {
    var oStringList = this.split('-');
    if (oStringList.length == 1) return oStringList[0];

    var camelizedString = this.indexOf('-') == 0
      ? oStringList[0].charAt(0).toUpperCase() + oStringList[0].substring(1)
      : oStringList[0];

    for (var i = 1, len = oStringList.length; i < len; i++) {
      var s = oStringList[i];
      camelizedString += s.charAt(0).toUpperCase() + s.substring(1);
    }

    return camelizedString;
  },

  inspect: function() {
    return "'" + this.replace('\\', '\\\\').replace("'", '\\\'') + "'";
  }
});

String.prototype.parseQuery = String.prototype.toQueryParams;

var $break    = new Object();
var $continue = new Object();

var Enumerable = {
  each: function(iterator) {
    var index = 0;
    try {
      this._each(function(value) {
        try {
          iterator(value, index++);
        } catch (e) {
          if (e != $continue) throw e;
        }
      });
    } catch (e) {
      if (e != $break) throw e;
    }
  },

  all: function(iterator) {
    var result = true;
    this.each(function(value, index) {
      result = result && !!(iterator || Prototype.K)(value, index);
      if (!result) throw $break;
    });
    return result;
  },

  any: function(iterator) {
    var result = true;
    this.each(function(value, index) {
      if (result = !!(iterator || Prototype.K)(value, index))
        throw $break;
    });
    return result;
  },

  collect: function(iterator) {
    var results = [];
    this.each(function(value, index) {
      results.push(iterator(value, index));
    });
    return results;
  },

  detect: function (iterator) {
    var result;
    this.each(function(value, index) {
      if (iterator(value, index)) {
        result = value;
        throw $break;
      }
    });
    return result;
  },

  findAll: function(iterator) {
    var results = [];
    this.each(function(value, index) {
      if (iterator(value, index))
        results.push(value);
    });
    return results;
  },

  grep: function(pattern, iterator) {
    var results = [];
    this.each(function(value, index) {
      var stringValue = value.toString();
      if (stringValue.match(pattern))
        results.push((iterator || Prototype.K)(value, index));
    })
    return results;
  },

  include: function(object) {
    var found = false;
    this.each(function(value) {
      if (value == object) {
        found = true;
        throw $break;
      }
    });
    return found;
  },

  inject: function(memo, iterator) {
    this.each(function(value, index) {
      memo = iterator(memo, value, index);
    });
    return memo;
  },

  invoke: function(method) {
    var args = $A(arguments).slice(1);
    return this.collect(function(value) {
      return value[method].apply(value, args);
    });
  },

  max: function(iterator) {
    var result;
    this.each(function(value, index) {
      value = (iterator || Prototype.K)(value, index);
      if (value >= (result || value))
        result = value;
    });
    return result;
  },

  min: function(iterator) {
    var result;
    this.each(function(value, index) {
      value = (iterator || Prototype.K)(value, index);
      if (value <= (result || value))
        result = value;
    });
    return result;
  },

  partition: function(iterator) {
    var trues = [], falses = [];
    this.each(function(value, index) {
      ((iterator || Prototype.K)(value, index) ?
        trues : falses).push(value);
    });
    return [trues, falses];
  },

  pluck: function(property) {
    var results = [];
    this.each(function(value, index) {
      results.push(value[property]);
    });
    return results;
  },

  reject: function(iterator) {
    var results = [];
    this.each(function(value, index) {
      if (!iterator(value, index))
        results.push(value);
    });
    return results;
  },

  sortBy: function(iterator) {
    return this.collect(function(value, index) {
      return {value: value, criteria: iterator(value, index)};
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }).pluck('value');
  },

  toArray: function() {
    return this.collect(Prototype.K);
  },

  zip: function() {
    var iterator = Prototype.K, args = $A(arguments);
    if (typeof args.last() == 'function')
      iterator = args.pop();

    var collections = [this].concat(args).map($A);
    return this.map(function(value, index) {
      iterator(value = collections.pluck(index));
      return value;
    });
  },

  inspect: function() {
    return '#<Enumerable:' + this.toArray().inspect() + '>';
  }
}

Object.extend(Enumerable, {
  map:     Enumerable.collect,
  find:    Enumerable.detect,
  select:  Enumerable.findAll,
  member:  Enumerable.include,
  entries: Enumerable.toArray
});
var $A = Array.from = function(iterable) {
  if (!iterable) return [];
  if (iterable.toArray) {
    return iterable.toArray();
  } else {
    var results = [];
    for (var i = 0; i < iterable.length; i++)
      results.push(iterable[i]);
    return results;
  }
}

Object.extend(Array.prototype, Enumerable);

Array.prototype._reverse = Array.prototype.reverse;

Object.extend(Array.prototype, {
  _each: function(iterator) {
    for (var i = 0; i < this.length; i++)
      iterator(this[i]);
  },

  clear: function() {
    this.length = 0;
    return this;
  },

  first: function() {
    return this[0];
  },

  last: function() {
    return this[this.length - 1];
  },

  compact: function() {
    return this.select(function(value) {
      return value != undefined || value != null;
    });
  },

  flatten: function() {
    return this.inject([], function(array, value) {
      return array.concat(value.constructor == Array ?
        value.flatten() : [value]);
    });
  },

  without: function() {
    var values = $A(arguments);
    return this.select(function(value) {
      return !values.include(value);
    });
  },

  indexOf: function(object) {
    for (var i = 0; i < this.length; i++)
      if (this[i] == object) return i;
    return -1;
  },

  reverse: function(inline) {
    return (inline !== false ? this : this.toArray())._reverse();
  },

  shift: function() {
    var result = this[0];
    for (var i = 0; i < this.length - 1; i++)
      this[i] = this[i + 1];
    this.length--;
    return result;
  },

  inspect: function() {
    return '[' + this.map(Object.inspect).join(', ') + ']';
  }
});
var Hash = {
  _each: function(iterator) {
    for (key in this) {
      var value = this[key];
      if (typeof value == 'function') continue;

      var pair = [key, value];
      pair.key = key;
      pair.value = value;
      iterator(pair);
    }
  },

  keys: function() {
    return this.pluck('key');
  },

  values: function() {
    return this.pluck('value');
  },

  merge: function(hash) {
    return $H(hash).inject($H(this), function(mergedHash, pair) {
      mergedHash[pair.key] = pair.value;
      return mergedHash;
    });
  },

  toQueryString: function() {
    return this.map(function(pair) {
      return pair.map(encodeURIComponent).join('=');
    }).join('&');
  },

  inspect: function() {
    return '#<Hash:{' + this.map(function(pair) {
      return pair.map(Object.inspect).join(': ');
    }).join(', ') + '}>';
  }
}

function $H(object) {
  var hash = Object.extend({}, object || {});
  Object.extend(hash, Enumerable);
  Object.extend(hash, Hash);
  return hash;
}
ObjectRange = Class.create();
Object.extend(ObjectRange.prototype, Enumerable);
Object.extend(ObjectRange.prototype, {
  initialize: function(start, end, exclusive) {
    this.start = start;
    this.end = end;
    this.exclusive = exclusive;
  },

  _each: function(iterator) {
    var value = this.start;
    do {
      iterator(value);
      value = value.succ();
    } while (this.include(value));
  },

  include: function(value) {
    if (value < this.start)
      return false;
    if (this.exclusive)
      return value < this.end;
    return value <= this.end;
  }
});

var $R = function(start, end, exclusive) {
  return new ObjectRange(start, end, exclusive);
}

var Ajax = {
  getTransport: function() {
    return Try.these(
      function() {return new ActiveXObject('Msxml2.XMLHTTP')},
      function() {return new ActiveXObject('Microsoft.XMLHTTP')},
      function() {return new XMLHttpRequest()}
    ) || false;
  },

  activeRequestCount: 0
}

Ajax.Responders = {
  responders: [],

  _each: function(iterator) {
    this.responders._each(iterator);
  },

  register: function(responderToAdd) {
    if (!this.include(responderToAdd))
      this.responders.push(responderToAdd);
  },

  unregister: function(responderToRemove) {
    this.responders = this.responders.without(responderToRemove);
  },

  dispatch: function(callback, request, transport, json) {
    this.each(function(responder) {
      if (responder[callback] && typeof responder[callback] == 'function') {
        try {
          responder[callback].apply(responder, [request, transport, json]);
        } catch (e) {}
      }
    });
  }
};

Object.extend(Ajax.Responders, Enumerable);

Ajax.Responders.register({
  onCreate: function() {
    Ajax.activeRequestCount++;
  },

  onComplete: function() {
    Ajax.activeRequestCount--;
  }
});

Ajax.Base = function() {};
Ajax.Base.prototype = {
  setOptions: function(options) {
    this.options = {
      method:       'post',
      asynchronous: true,
      parameters:   ''
    }
    Object.extend(this.options, options || {});
  },

  responseIsSuccess: function() {
    return this.transport.status == undefined
        || this.transport.status == 0
        || (this.transport.status >= 200 && this.transport.status < 300);
  },

  responseIsFailure: function() {
    return !this.responseIsSuccess();
  }
}

Ajax.Request = Class.create();
Ajax.Request.Events =
  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];

Ajax.Request.prototype = Object.extend(new Ajax.Base(), {
  initialize: function(url, options) {
    this.transport = Ajax.getTransport();
    this.setOptions(options);
    this.request(url);
  },

  request: function(url) {
    var parameters = this.options.parameters || '';
    if (parameters.length > 0) parameters += '&_=';

    try {
      this.url = url;
      if (this.options.method == 'get' && parameters.length > 0)
        this.url += (this.url.match(/\?/) ? '&' : '?') + parameters;

      Ajax.Responders.dispatch('onCreate', this, this.transport);

      this.transport.open(this.options.method, this.url,
        this.options.asynchronous);

      if (this.options.asynchronous) {
        this.transport.onreadystatechange = this.onStateChange.bind(this);
        setTimeout((function() {this.respondToReadyState(1)}).bind(this), 10);
      }

      this.setRequestHeaders();

      var body = this.options.postBody ? this.options.postBody : parameters;
      this.transport.send(this.options.method == 'post' ? body : null);

    } catch (e) {
      this.dispatchException(e);
    }
  },

  setRequestHeaders: function() {
    var requestHeaders =
      ['X-Requested-With', 'XMLHttpRequest',
       'X-Prototype-Version', Prototype.Version];

    if (this.options.method == 'post') {
      requestHeaders.push('Content-type',
        'application/x-www-form-urlencoded');

      /* Force "Connection: close" for Mozilla browsers to work around
       * a bug where XMLHttpReqeuest sends an incorrect Content-length
       * header. See Mozilla Bugzilla #246651.
       */
      if (this.transport.overrideMimeType)
        requestHeaders.push('Connection', 'close');
    }

    if (this.options.requestHeaders)
      requestHeaders.push.apply(requestHeaders, this.options.requestHeaders);

    for (var i = 0; i < requestHeaders.length; i += 2)
      this.transport.setRequestHeader(requestHeaders[i], requestHeaders[i+1]);
  },

  onStateChange: function() {
    var readyState = this.transport.readyState;
    if (readyState != 1)
      this.respondToReadyState(this.transport.readyState);
  },

  header: function(name) {
    try {
      return this.transport.getResponseHeader(name);
    } catch (e) {}
  },

  evalJSON: function() {
    try {
      return eval(this.header('X-JSON'));
    } catch (e) {}
  },

  evalResponse: function() {
    try {
      return eval(this.transport.responseText);
    } catch (e) {
      this.dispatchException(e);
    }
  },

  respondToReadyState: function(readyState) {
    var event = Ajax.Request.Events[readyState];
    var transport = this.transport, json = this.evalJSON();

    if (event == 'Complete') {
      try {
        (this.options['on' + this.transport.status]
         || this.options['on' + (this.responseIsSuccess() ? 'Success' : 'Failure')]
         || Prototype.emptyFunction)(transport, json);
      } catch (e) {
        this.dispatchException(e);
      }

      if ((this.header('Content-type') || '').match(/^text\/javascript/i))
        this.evalResponse();
    }

    try {
      (this.options['on' + event] || Prototype.emptyFunction)(transport, json);
      Ajax.Responders.dispatch('on' + event, this, transport, json);
    } catch (e) {
      this.dispatchException(e);
    }

    /* Avoid memory leak in MSIE: clean up the oncomplete event handler */
    if (event == 'Complete')
      this.transport.onreadystatechange = Prototype.emptyFunction;
  },

  dispatchException: function(exception) {
    (this.options.onException || Prototype.emptyFunction)(this, exception);
    Ajax.Responders.dispatch('onException', this, exception);
  }
});

Ajax.Updater = Class.create();

Object.extend(Object.extend(Ajax.Updater.prototype, Ajax.Request.prototype), {
  initialize: function(container, url, options) {
    this.containers = {
      success: container.success ? $(container.success) : $(container),
      failure: container.failure ? $(container.failure) :
        (container.success ? null : $(container))
    }

    this.transport = Ajax.getTransport();
    this.setOptions(options);

    var onComplete = this.options.onComplete || Prototype.emptyFunction;
    this.options.onComplete = (function(transport, object) {
      this.updateContent();
      onComplete(transport, object);
    }).bind(this);

    this.request(url);
  },

  updateContent: function() {
    var receiver = this.responseIsSuccess() ?
      this.containers.success : this.containers.failure;
    var response = this.transport.responseText;

    if (!this.options.evalScripts)
      response = response.stripScripts();

    if (receiver) {
      if (this.options.insertion) {
        new this.options.insertion(receiver, response);
      } else {
        Element.update(receiver, response);
      }
    }

    if (this.responseIsSuccess()) {
      if (this.onComplete)
        setTimeout(this.onComplete.bind(this), 10);
    }
  }
});

Ajax.PeriodicalUpdater = Class.create();
Ajax.PeriodicalUpdater.prototype = Object.extend(new Ajax.Base(), {
  initialize: function(container, url, options) {
    this.setOptions(options);
    this.onComplete = this.options.onComplete;

    this.frequency = (this.options.frequency || 2);
    this.decay = (this.options.decay || 1);

    this.updater = {};
    this.container = container;
    this.url = url;

    this.start();
  },

  start: function() {
    this.options.onComplete = this.updateComplete.bind(this);
    this.onTimerEvent();
  },

  stop: function() {
    this.updater.onComplete = undefined;
    clearTimeout(this.timer);
    (this.onComplete || Prototype.emptyFunction).apply(this, arguments);
  },

  updateComplete: function(request) {
    if (this.options.decay) {
      this.decay = (request.responseText == this.lastText ?
        this.decay * this.options.decay : 1);

      this.lastText = request.responseText;
    }
    this.timer = setTimeout(this.onTimerEvent.bind(this),
      this.decay * this.frequency * 1000);
  },

  onTimerEvent: function() {
    this.updater = new Ajax.Updater(this.container, this.url, this.options);
  }
});
document.getElementsByClassName = function(className, parentElement) {
  var children = ($(parentElement) || document.body).getElementsByTagName('*');
  return $A(children).inject([], function(elements, child) {
    if (child.className.match(new RegExp("(^|\\s)" + className + "(\\s|$)")))
      elements.push(child);
    return elements;
  });
}

/*--------------------------------------------------------------------------*/

if (!window.Element) {
  var Element = new Object();
}

Object.extend(Element, {
  visible: function(element) {
    return $(element).style.display != 'none';
  },

  toggle: function() {
    for (var i = 0; i < arguments.length; i++) {
      var element = $(arguments[i]);
      Element[Element.visible(element) ? 'hide' : 'show'](element);
    }
  },

  hide: function() {
    for (var i = 0; i < arguments.length; i++) {
      var element = $(arguments[i]);
      element.style.display = 'none';
    }
  },

  show: function() {
    for (var i = 0; i < arguments.length; i++) {
      var element = $(arguments[i]);
      element.style.display = '';
    }
  },

  remove: function(element) {
    element = $(element);
    element.parentNode.removeChild(element);
  },

  update: function(element, html) {
    $(element).innerHTML = html.stripScripts();
    setTimeout(function() {html.evalScripts()}, 10);
  },

  getHeight: function(element) {
    element = $(element);
    return element.offsetHeight;
  },

  classNames: function(element) {
    return new Element.ClassNames(element);
  },

  hasClassName: function(element, className) {
    if (!(element = $(element))) return;
    return Element.classNames(element).include(className);
  },

  addClassName: function(element, className) {
    if (!(element = $(element))) return;
    return Element.classNames(element).add(className);
  },

  removeClassName: function(element, className) {
    if (!(element = $(element))) return;
    return Element.classNames(element).remove(className);
  },
  
  replaceClassName: function(element,oldClass,newClass){
    if (!(element = $(element))) return;
    this.removeClassName(element,oldClass);
    this.addClassName(element,newClass);
  },

  // removes whitespace-only text node children
  cleanWhitespace: function(element) {
    element = $(element);
    for (var i = 0; i < element.childNodes.length; i++) {
      var node = element.childNodes[i];
      if (node.nodeType == 3 && !/\S/.test(node.nodeValue))
        Element.remove(node);
    }
  },

  empty: function(element) {
    return $(element).innerHTML.match(/^\s*$/);
  },

  scrollTo: function(element) {
    element = $(element);
    var x = element.x ? element.x : element.offsetLeft,
        y = element.y ? element.y : element.offsetTop;
    window.scrollTo(x, y);
  },

  getStyle: function(element, style) {
    element = $(element);
    var value = element.style[style.camelize()];
    if (!value) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        var css = document.defaultView.getComputedStyle(element, null);
        value = css ? css.getPropertyValue(style) : null;
      } else if (element.currentStyle) {
        value = element.currentStyle[style.camelize()];
      }
    }

    if (window.opera && ['left', 'top', 'right', 'bottom'].include(style))
      if (Element.getStyle(element, 'position') == 'static') value = 'auto';

    return value == 'auto' ? null : value;
  },

  setStyle: function(element, style) {
    element = $(element);
    for (name in style)
      element.style[name.camelize()] = style[name];
  },

  getDimensions: function(element) {
    element = $(element);
    if (Element.getStyle(element, 'display') != 'none')
      return {width: element.offsetWidth, height: element.offsetHeight};

    // All *Width and *Height properties give 0 on elements with display none,
    // so enable the element temporarily
    var els = element.style;
    var originalVisibility = els.visibility;
    var originalPosition = els.position;
    els.visibility = 'hidden';
    els.position = 'absolute';
    els.display = '';
    var originalWidth = element.clientWidth;
    var originalHeight = element.clientHeight;
    els.display = 'none';
    els.position = originalPosition;
    els.visibility = originalVisibility;
    return {width: originalWidth, height: originalHeight};
  },

  makePositioned: function(element) {
    element = $(element);
    var pos = Element.getStyle(element, 'position');
    if (pos == 'static' || !pos) {
      element._madePositioned = true;
      element.style.position = 'relative';
      // Opera returns the offset relative to the positioning context, when an
      // element is position relative but top and left have not been defined
      if (window.opera) {
        element.style.top = 0;
        element.style.left = 0;
      }
    }
  },

  undoPositioned: function(element) {
    element = $(element);
    if (element._madePositioned) {
      element._madePositioned = undefined;
      element.style.position =
        element.style.top =
        element.style.left =
        element.style.bottom =
        element.style.right = '';
    }
  },

  makeClipping: function(element) {
    element = $(element);
    if (element._overflow) return;
    element._overflow = element.style.overflow;
    if ((Element.getStyle(element, 'overflow') || 'visible') != 'hidden')
      element.style.overflow = 'hidden';
  },

  undoClipping: function(element) {
    element = $(element);
    if (element._overflow) return;
    element.style.overflow = element._overflow;
    element._overflow = undefined;
  }
});

var Toggle = new Object();
Toggle.display = Element.toggle;

/*--------------------------------------------------------------------------*/

Abstract.Insertion = function(adjacency) {
  this.adjacency = adjacency;
}

Abstract.Insertion.prototype = {
  initialize: function(element, content) {
    this.element = $(element);
    this.content = content.stripScripts();

    if (this.adjacency && this.element.insertAdjacentHTML) {
      try {
        this.element.insertAdjacentHTML(this.adjacency, this.content);
      } catch (e) {
        if (this.element.tagName.toLowerCase() == 'tbody') {
          this.insertContent(this.contentFromAnonymousTable());
        } else {
          throw e;
        }
      }
    } else {
      this.range = this.element.ownerDocument.createRange();
      if (this.initializeRange) this.initializeRange();
      this.insertContent([this.range.createContextualFragment(this.content)]);
    }

    setTimeout(function() {content.evalScripts()}, 10);
  },

  contentFromAnonymousTable: function() {
    var div = document.createElement('div');
    div.innerHTML = '<table><tbody>' + this.content + '</tbody></table>';
    return $A(div.childNodes[0].childNodes[0].childNodes);
  }
}

var Insertion = new Object();

Insertion.Before = Class.create();
Insertion.Before.prototype = Object.extend(new Abstract.Insertion('beforeBegin'), {
  initializeRange: function() {
    this.range.setStartBefore(this.element);
  },

  insertContent: function(fragments) {
    fragments.each((function(fragment) {
      this.element.parentNode.insertBefore(fragment, this.element);
    }).bind(this));
  }
});

Insertion.Top = Class.create();
Insertion.Top.prototype = Object.extend(new Abstract.Insertion('afterBegin'), {
  initializeRange: function() {
    this.range.selectNodeContents(this.element);
    this.range.collapse(true);
  },

  insertContent: function(fragments) {
    fragments.reverse(false).each((function(fragment) {
      this.element.insertBefore(fragment, this.element.firstChild);
    }).bind(this));
  }
});

Insertion.Bottom = Class.create();
Insertion.Bottom.prototype = Object.extend(new Abstract.Insertion('beforeEnd'), {
  initializeRange: function() {
    this.range.selectNodeContents(this.element);
    this.range.collapse(this.element);
  },

  insertContent: function(fragments) {
    fragments.each((function(fragment) {
      this.element.appendChild(fragment);
    }).bind(this));
  }
});

Insertion.After = Class.create();
Insertion.After.prototype = Object.extend(new Abstract.Insertion('afterEnd'), {
  initializeRange: function() {
    this.range.setStartAfter(this.element);
  },

  insertContent: function(fragments) {
    fragments.each((function(fragment) {
      this.element.parentNode.insertBefore(fragment,
        this.element.nextSibling);
    }).bind(this));
  }
});

/*--------------------------------------------------------------------------*/

Element.ClassNames = Class.create();
Element.ClassNames.prototype = {
  initialize: function(element) {
    this.element = $(element);
  },

  _each: function(iterator) {
    this.element.className.split(/\s+/).select(function(name) {
      return name.length > 0;
    })._each(iterator);
  },

  set: function(className) {
    this.element.className = className;
  },

  add: function(classNameToAdd) {
    if (this.include(classNameToAdd)) return;
    this.set(this.toArray().concat(classNameToAdd).join(' '));
  },

  remove: function(classNameToRemove) {
    if (!this.include(classNameToRemove)) return;
    this.set(this.select(function(className) {
      return className != classNameToRemove;
    }).join(' '));
  },

  toString: function() {
    return this.toArray().join(' ');
  }
}

Object.extend(Element.ClassNames.prototype, Enumerable);
var Field = {
  clear: function() {
    for (var i = 0; i < arguments.length; i++)
      $(arguments[i]).value = '';
  },

  focus: function(element) {
    $(element).focus();
  },

  present: function() {
    for (var i = 0; i < arguments.length; i++)
      if ($(arguments[i]).value == '') return false;
    return true;
  },

  select: function(element) {
    $(element).select();
  },

  activate: function(element) {
    element = $(element);
    element.focus();
    if (element.select)
      element.select();
  }
}

/*--------------------------------------------------------------------------*/

var Form = {
  serialize: function(form) {
    var elements = Form.getElements($(form));
    var queryComponents = new Array();

    for (var i = 0; i < elements.length; i++) {
      var queryComponent = Form.Element.serialize(elements[i]);
      if (queryComponent)
        queryComponents.push(queryComponent);
    }

    return queryComponents.join('&');
  },

  getElements: function(form) {
    form = $(form);
    var elements = new Array();

    for (tagName in Form.Element.Serializers) {
      var tagElements = form.getElementsByTagName(tagName);
      for (var j = 0; j < tagElements.length; j++)
        elements.push(tagElements[j]);
    }
    return elements;
  },

  getInputs: function(form, typeName, name) {
    form = $(form);
    var inputs = form.getElementsByTagName('input');

    if (!typeName && !name)
      return inputs;

    var matchingInputs = new Array();
    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      if ((typeName && input.type != typeName) ||
          (name && input.name != name))
        continue;
      matchingInputs.push(input);
    }

    return matchingInputs;
  },

  disable: function(form) {
    var elements = Form.getElements(form);
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      element.blur();
      element.disabled = 'true';
    }
  },

  enable: function(form) {
    var elements = Form.getElements(form);
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      element.disabled = '';
    }
  },

  findFirstElement: function(form) {
    return Form.getElements(form).find(function(element) {
      return element.type != 'hidden' && !element.disabled &&
        ['input', 'select', 'textarea'].include(element.tagName.toLowerCase());
    });
  },

  focusFirstElement: function(form) {
    Field.activate(Form.findFirstElement(form));
  },

  reset: function(form) {
    $(form).reset();
  }
}

Form.Element = {
  serialize: function(element) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    var parameter = Form.Element.Serializers[method](element);

    if (parameter) {
      var key = encodeURIComponent(parameter[0]);
      if (key.length == 0) return;

      if (parameter[1].constructor != Array)
        parameter[1] = [parameter[1]];

      return parameter[1].map(function(value) {
        return key + '=' + encodeURIComponent(value);
      }).join('&');
    }
  },

  getValue: function(element) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    var parameter = Form.Element.Serializers[method](element);

    if (parameter)
      return parameter[1];
  }
}

Form.Element.Serializers = {
  input: function(element) {
    switch (element.type.toLowerCase()) {
      case 'submit':
      case 'hidden':
      case 'password':
      case 'text':
        return Form.Element.Serializers.textarea(element);
      case 'checkbox':
      case 'radio':
        return Form.Element.Serializers.inputSelector(element);
    }
    return false;
  },

  inputSelector: function(element) {
    if (element.checked)
      return [element.name, element.value];
  },

  textarea: function(element) {
    return [element.name, element.value];
  },

  select: function(element) {
    return Form.Element.Serializers[element.type == 'select-one' ?
      'selectOne' : 'selectMany'](element);
  },

  selectOne: function(element) {
    var value = '', opt, index = element.selectedIndex;
    if (index >= 0) {
      opt = element.options[index];
      value = opt.value;
      if (!value && !('value' in opt))
        value = opt.text;
    }
    return [element.name, value];
  },

  selectMany: function(element) {
    var value = new Array();
    for (var i = 0; i < element.length; i++) {
      var opt = element.options[i];
      if (opt.selected) {
        var optValue = opt.value;
        if (!optValue && !('value' in opt))
          optValue = opt.text;
        value.push(optValue);
      }
    }
    return [element.name, value];
  }
}

/*--------------------------------------------------------------------------*/

var $F = Form.Element.getValue;

/*--------------------------------------------------------------------------*/

Abstract.TimedObserver = function() {}
Abstract.TimedObserver.prototype = {
  initialize: function(element, frequency, callback) {
    this.frequency = frequency;
    this.element   = $(element);
    this.callback  = callback;

    this.lastValue = this.getValue();
    this.registerCallback();
  },

  registerCallback: function() {
    setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
  },

  onTimerEvent: function() {
    var value = this.getValue();
    if (this.lastValue != value) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  }
}

Form.Element.Observer = Class.create();
Form.Element.Observer.prototype = Object.extend(new Abstract.TimedObserver(), {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.Observer = Class.create();
Form.Observer.prototype = Object.extend(new Abstract.TimedObserver(), {
  getValue: function() {
    return Form.serialize(this.element);
  }
});

/*--------------------------------------------------------------------------*/

Abstract.EventObserver = function() {}
Abstract.EventObserver.prototype = {
  initialize: function(element, callback) {
    this.element  = $(element);
    this.callback = callback;

    this.lastValue = this.getValue();
    if (this.element.tagName.toLowerCase() == 'form')
      this.registerFormCallbacks();
    else
      this.registerCallback(this.element);
  },

  onElementEvent: function() {
    var value = this.getValue();
    if (this.lastValue != value) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  },

  registerFormCallbacks: function() {
    var elements = Form.getElements(this.element);
    for (var i = 0; i < elements.length; i++)
      this.registerCallback(elements[i]);
  },

  registerCallback: function(element) {
    if (element.type) {
      switch (element.type.toLowerCase()) {
        case 'checkbox':
        case 'radio':
          Event.observe(element, 'click', this.onElementEvent.bind(this));
          break;
        case 'password':
        case 'text':
        case 'textarea':
        case 'select-one':
        case 'select-multiple':
          Event.observe(element, 'change', this.onElementEvent.bind(this));
          break;
      }
    }
  }
}

Form.Element.EventObserver = Class.create();
Form.Element.EventObserver.prototype = Object.extend(new Abstract.EventObserver(), {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.EventObserver = Class.create();
Form.EventObserver.prototype = Object.extend(new Abstract.EventObserver(), {
  getValue: function() {
    return Form.serialize(this.element);
  }
});
if (!window.Event) {
  var Event = new Object();
}

Object.extend(Event, {
  KEY_BACKSPACE: 8,
  KEY_TAB:       9,
  KEY_RETURN:   13,
  KEY_ESC:      27,
  KEY_LEFT:     37,
  KEY_UP:       38,
  KEY_RIGHT:    39,
  KEY_DOWN:     40,
  KEY_DELETE:   46,

  element: function(event) {
    return event.target || event.srcElement;
  },

  isLeftClick: function(event) {
    return (((event.which) && (event.which == 1)) ||
            ((event.button) && (event.button == 1)));
  },

  pointerX: function(event) {
    return event.pageX || (event.clientX +
      (document.documentElement.scrollLeft || document.body.scrollLeft));
  },

  pointerY: function(event) {
    return event.pageY || (event.clientY +
      (document.documentElement.scrollTop || document.body.scrollTop));
  },

  stop: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.returnValue = false;
      event.cancelBubble = true;
    }
  },

  // find the first node with the given tagName, starting from the
  // node the event was triggered on; traverses the DOM upwards
  findElement: function(event, tagName) {
    var element = Event.element(event);
    while (element.parentNode && (!element.tagName ||
        (element.tagName.toUpperCase() != tagName.toUpperCase())))
      element = element.parentNode;
    return element;
  },

  observers: false,

  _observeAndCache: function(element, name, observer, useCapture) {
    if (!this.observers) this.observers = [];
    if (element.addEventListener) {
      this.observers.push([element, name, observer, useCapture]);
      element.addEventListener(name, observer, useCapture);
    } else if (element.attachEvent) {
      this.observers.push([element, name, observer, useCapture]);
      element.attachEvent('on' + name, observer);
    }
  },

  unloadCache: function() {
    if (!Event.observers) return;
    for (var i = 0; i < Event.observers.length; i++) {
      Event.stopObserving.apply(this, Event.observers[i]);
      Event.observers[i][0] = null;
    }
    Event.observers = false;
  },

  observe: function(element, name, observer, useCapture) {
    var element = $(element);
    useCapture = useCapture || false;

    if (name == 'keypress' &&
        (navigator.appVersion.match(/Konqueror|Safari|KHTML/)
        || element.attachEvent))
      name = 'keydown';

    this._observeAndCache(element, name, observer, useCapture);
  },

  stopObserving: function(element, name, observer, useCapture) {
    var element = $(element);
    useCapture = useCapture || false;

    if (name == 'keypress' &&
        (navigator.appVersion.match(/Konqueror|Safari|KHTML/)
        || element.detachEvent))
      name = 'keydown';

    if (element.removeEventListener) {
      element.removeEventListener(name, observer, useCapture);
    } else if (element.detachEvent) {
      element.detachEvent('on' + name, observer);
    }
  }
});

/* prevent memory leaks in IE */
Event.observe(window, 'unload', Event.unloadCache, false);
var Position = {
  // set to true if needed, warning: firefox performance problems
  // NOT neeeded for page scrolling, only if draggable contained in
  // scrollable elements
  includeScrollOffsets: false,

  // must be called before calling withinIncludingScrolloffset, every time the
  // page is scrolled
  prepare: function() {
    this.deltaX =  window.pageXOffset
                || document.documentElement.scrollLeft
                || document.body.scrollLeft
                || 0;
    this.deltaY =  window.pageYOffset
                || document.documentElement.scrollTop
                || document.body.scrollTop
                || 0;
  },

  realOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.scrollTop  || 0;
      valueL += element.scrollLeft || 0;
      element = element.parentNode;
    } while (element);
    return [valueL, valueT];
  },

  cumulativeOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);
    return [valueL, valueT];
  },

  positionedOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
      if (element) {
        p = Element.getStyle(element, 'position');
        if (p == 'relative' || p == 'absolute') break;
      }
    } while (element);
    return [valueL, valueT];
  },

  offsetParent: function(element) {
    if (element.offsetParent) return element.offsetParent;
    if (element == document.body) return element;

    while ((element = element.parentNode) && element != document.body)
      if (Element.getStyle(element, 'position') != 'static')
        return element;

    return document.body;
  },

  // caches x/y coordinate pair to use with overlap
  within: function(element, x, y) {
    if (this.includeScrollOffsets)
      return this.withinIncludingScrolloffsets(element, x, y);
    this.xcomp = x;
    this.ycomp = y;
    this.offset = this.cumulativeOffset(element);

    return (y >= this.offset[1] &&
            y <  this.offset[1] + element.offsetHeight &&
            x >= this.offset[0] &&
            x <  this.offset[0] + element.offsetWidth);
  },

  withinIncludingScrolloffsets: function(element, x, y) {
    var offsetcache = this.realOffset(element);

    this.xcomp = x + offsetcache[0] - this.deltaX;
    this.ycomp = y + offsetcache[1] - this.deltaY;
    this.offset = this.cumulativeOffset(element);

    return (this.ycomp >= this.offset[1] &&
            this.ycomp <  this.offset[1] + element.offsetHeight &&
            this.xcomp >= this.offset[0] &&
            this.xcomp <  this.offset[0] + element.offsetWidth);
  },

  // within must be called directly before
  overlap: function(mode, element) {
    if (!mode) return 0;
    if (mode == 'vertical')
      return ((this.offset[1] + element.offsetHeight) - this.ycomp) /
        element.offsetHeight;
    if (mode == 'horizontal')
      return ((this.offset[0] + element.offsetWidth) - this.xcomp) /
        element.offsetWidth;
  },

  clone: function(source, target) {
    source = $(source);
    target = $(target);
    target.style.position = 'absolute';
    var offsets = this.cumulativeOffset(source);
    target.style.top    = offsets[1] + 'px';
    target.style.left   = offsets[0] + 'px';
    target.style.width  = source.offsetWidth + 'px';
    target.style.height = source.offsetHeight + 'px';
  },

  page: function(forElement) {
    var valueT = 0, valueL = 0;

    var element = forElement;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;

      // Safari fix
      if (element.offsetParent==document.body)
        if (Element.getStyle(element,'position')=='absolute') break;

    } while (element = element.offsetParent);

    element = forElement;
    do {
      valueT -= element.scrollTop  || 0;
      valueL -= element.scrollLeft || 0;
    } while (element = element.parentNode);

    return [valueL, valueT];
  },

  clone: function(source, target) {
    var options = Object.extend({
      setLeft:    true,
      setTop:     true,
      setWidth:   true,
      setHeight:  true,
      offsetTop:  0,
      offsetLeft: 0
    }, arguments[2] || {})

    // find page position of source
    source = $(source);
    var p = Position.page(source);

    // find coordinate system to use
    target = $(target);
    var delta = [0, 0];
    var parent = null;
    // delta [0,0] will do fine with position: fixed elements,
    // position:absolute needs offsetParent deltas
    if (Element.getStyle(target,'position') == 'absolute') {
      parent = Position.offsetParent(target);
      delta = Position.page(parent);
    }

    // correct by body offsets (fixes Safari)
    if (parent == document.body) {
      delta[0] -= document.body.offsetLeft;
      delta[1] -= document.body.offsetTop;
    }

    // set position
    if(options.setLeft)   target.style.left  = (p[0] - delta[0] + options.offsetLeft) + 'px';
    if(options.setTop)    target.style.top   = (p[1] - delta[1] + options.offsetTop) + 'px';
    if(options.setWidth)  target.style.width = source.offsetWidth + 'px';
    if(options.setHeight) target.style.height = source.offsetHeight + 'px';
  },

  absolutize: function(element) {
    element = $(element);
    if (element.style.position == 'absolute') return;
    Position.prepare();

    var offsets = Position.positionedOffset(element);
    var top     = offsets[1];
    var left    = offsets[0];
    var width   = element.clientWidth;
    var height  = element.clientHeight;

    element._originalLeft   = left - parseFloat(element.style.left  || 0);
    element._originalTop    = top  - parseFloat(element.style.top || 0);
    element._originalWidth  = element.style.width;
    element._originalHeight = element.style.height;

    element.style.position = 'absolute';
    element.style.top    = top + 'px';;
    element.style.left   = left + 'px';;
    element.style.width  = width + 'px';;
    element.style.height = height + 'px';;
  },

  relativize: function(element) {
    element = $(element);
    if (element.style.position == 'relative') return;
    Position.prepare();

    element.style.position = 'relative';
    var top  = parseFloat(element.style.top  || 0) - (element._originalTop || 0);
    var left = parseFloat(element.style.left || 0) - (element._originalLeft || 0);

    element.style.top    = top + 'px';
    element.style.left   = left + 'px';
    element.style.height = element._originalHeight;
    element.style.width  = element._originalWidth;
  }
}

// Safari returns margins on body which is incorrect if the child is absolutely
// positioned.  For performance reasons, redefine Position.cumulativeOffset for
// KHTML/WebKit only.
if (/Konqueror|Safari|KHTML/.test(navigator.userAgent)) {
  Position.cumulativeOffset = function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      if (element.offsetParent == document.body)
        if (Element.getStyle(element, 'position') == 'absolute') break;

      element = element.offsetParent;
    } while (element);

    return [valueL, valueT];
  }
}

//extend by bezy on 2007-3-7
document.ready = function(callBack){
	var _isRead = false;
	var _c = function(){
		if(!_isRead){
			callBack();
			_isRead = true;
		}
	};
	var _b = navigator.userAgent.toLowerCase();
    if((/mozilla/.test(_b) && !/(compatible|webkit)/.test(_b))||(/opera/.test(_b))){
    	Event.observe(document,"DOMContentLoaded",_c);
    }else if(/msie/.test(_b) && !/opera/.test(_b)){
    	if(!this.__count)this.__count = 0;
		var _id = '__ie_init'+ this.__count++;
    	document.write("<scr" + "ipt id="+_id+" defer=true " + 
			"src=//:><\/script>");
		var _s = $(_id);
		if (_s){
			_s.onreadystatechange = function() {
				if (this.readyState != "complete") return;
				this.parentNode.removeChild(this);
				_c();
			};
		}
		_s = null;
    }else if(/webkit/.test(_b)){
    	var _i = setInterval(function(){
			if (document.readyState == "loaded" || 
				document.readyState == "complete") {
				clearInterval(_i);
				_i = null;
				_c();
			}
		}, 10);
    }
    Event.observe(window,"load",_c);
}


// Copyright (c) 2005 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us)
// Contributors:
//  Justin Palmer (http://encytemedia.com/)
//  Mark Pilgrim (http://diveintomark.org/)
//  Martin Bialasinki
// 
// See scriptaculous.js for full license.  

/* ------------- element ext -------------- */  
 
// converts rgb() and #xxx to #xxxxxx format,  
// returns self (or first argument) if not convertable  
Element.getOpacity = function(element){  
  var opacity;  
  if (opacity = Element.getStyle(element, "opacity"))  
    return parseFloat(opacity);  
  if (opacity = (Element.getStyle(element, "filter") || '').match(/alpha\(opacity=(.*)\)/))  
    if(opacity[1]) return parseFloat(opacity[1]) / 100;  
  return 1.0;  
}

Element.setOpacity = function(element, value){  
  element= $(element);  
  var els = element.style; 
  if (value == 1){  
    els.opacity = '0.999999';  
    if(/MSIE/.test(navigator.userAgent))  
      els.filter = Element.getStyle(element,'filter').replace(/alpha\([^\)]*\)/gi,'') +
		 "alpha(opacity=100)";  
  } else {  
    if(value < 0.00001) value = 0;  
    els.opacity = value;  
    if(/MSIE/.test(navigator.userAgent))  
      els.filter = Element.getStyle(element,'filter').replace(/alpha\([^\)]*\)/gi,'') +  
        "alpha(opacity="+value*100+")";  
  }   
}  
 
Element.getInlineOpacity = function(element){  
  element= $(element);  
  var op;  
  op = element.style.opacity;  
  if (typeof op != "undefined" && op != "") return op;  
  return "";  
}  
 
Element.setInlineOpacity = function(element, value){  
  element= $(element);  
  var els = element.style;  
  els.opacity = value;  
}  

Element.setStyle = function(element, style) {
  element = $(element);
  for(k in style) element.style[k.camelize()] = style[k];
}
 

Element.childrenWithClassName = function(element, className) {  
  return $A($(element).getElementsByTagName('*')).select(
    function(c) { return Element.hasClassName(c, className) });
}  
 
/*--------------------------------------------------------------------------*/

var Effect = {
  tagifyText: function(element) {
    var tagifyStyle = "position:relative";
    if(/MSIE/.test(navigator.userAgent)) tagifyStyle += ";zoom:1";
    element = $(element);
    $A(element.childNodes).each( function(child) {
      if(child.nodeType==3) {
        child.nodeValue.toArray().each( function(character) {
          element.insertBefore(
            Builder.node('span',{style: tagifyStyle},
              character == " " ? String.fromCharCode(160) : character), 
              child);
        });
        Element.remove(child);
      }
    });
  },
  multiple: function(element, effect) {
    var elements;
    if(((typeof element == 'object') || 
        (typeof element == 'function')) && 
       (element.length))
      elements = element;
    else
      elements = $(element).childNodes;
      
    var options = Object.extend({
      speed: 0.1,
      delay: 0.0
    }, arguments[2] || {});
    var speed = options.speed;
    var delay = options.delay;

    $A(elements).each( function(element, index) {
      new effect(element, Object.extend(options, { delay: delay + index * speed }));
    });
  }
};

var Effect2 = Effect; // deprecated

/* ------------- transitions ------------- */

Effect.Transitions = {}

Effect.Transitions.linear = function(pos) {
  return pos;
}
Effect.Transitions.sinoidal = function(pos) {
  return (-Math.cos(pos*Math.PI)/2) + 0.5;
}
Effect.Transitions.reverse  = function(pos) {
  return 1-pos;
}
Effect.Transitions.flicker = function(pos) {
  return ((-Math.cos(pos*Math.PI)/4) + 0.75) + Math.random()/4;
}
Effect.Transitions.wobble = function(pos) {
  return (-Math.cos(pos*Math.PI*(9*pos))/2) + 0.5;
}
Effect.Transitions.pulse = function(pos) {
  return (Math.floor(pos*10) % 2 == 0 ? 
    (pos*10-Math.floor(pos*10)) : 1-(pos*10-Math.floor(pos*10)));
}
Effect.Transitions.none = function(pos) {
  return 0;
}
Effect.Transitions.full = function(pos) {
  return 1;
}

/* ------------- core effects ------------- */
// Ч��������
// �ö��в�������ʱ���ǰ�������,��ɨ�����ʱ�����ĸ�����Ⱦ
Effect.Queue = {
  effects:  [],		// ע��effectsҲ�����飬��˼̳�������չ��Array�ķ���
  // ������������
  _each: function(iterator) {
    this.effects._each(iterator);
  },
  interval: null,		// ��ʱ������
  
  // ���Ч���������
  add: function(effect) {
    var timestamp = new Date().getTime();
    
	// ���ݶ��з�������ȷ��
    switch(effect.options.queue) {
      case 'front':
        // move unstarted effects after this effect  
		// ��������δ��ʼЧ�����������Ƕ��Ƴٵ���Ч����
        this.effects.findAll(function(e){ return e.state=='idle' }).each( function(e) {
            e.startOn  += effect.finishOn;
            e.finishOn += effect.finishOn;
          });
        break;
      case 'end':
        // start effect after last queued effect has finished
		// ���������е�'finishOn'ֵ����ȡ�����˼���õ�ǰЧ���������Ⱦ
        timestamp = this.effects.pluck('finishOn').max() || timestamp;
        break;
    }
    
	// ȷ��Ч����ȷ����ʼʱ��
    effect.startOn  += timestamp;
    effect.finishOn += timestamp;
    this.effects.push(effect);		// ����Ч����������
	
	// ÿ40ms��һ�ζ���Ч��ɨ��
    if(!this.interval) 
      this.interval = setInterval(this.loop.bind(this), 40);	// ��ǰ�����loop�����͵�ǰ����󶨣���window�������
  },
  
  // ��Ч���Ӷ��������
  remove: function(effect) {
    this.effects = this.effects.reject(function(e) { return e==effect });
    if(this.effects.length == 0) {
      clearInterval(this.interval);
      this.interval = null;
    }
  },
  
  // Ч����ʱloop��
  loop: function() {
    var timePos = new Date().getTime();
    this.effects.invoke('loop', timePos);	// ����effects��ÿ��effect����Ⱦ����
  }
}
Object.extend(Effect.Queue, Enumerable);

Effect.Base = function() {};
Effect.Base.prototype = {
  position: null,
  setOptions: function(options) {
    this.options = Object.extend({
      transition: Effect.Transitions.sinoidal,
      duration:   1.0,   // seconds
      fps:        25.0,  // max. 25fps due to Effect.Queue implementation
      sync:       false, // true for combining
      from:       0.0,
      to:         1.0,
      delay:      0.0,
      queue:      'parallel'
    }, options || {});
  },
  // ��ȾЧ�������㺯��
  start: function(options) {
    this.setOptions(options || {});
    this.currentFrame = 0;
    this.state        = 'idle';	
	// �趨����Ч����ʼʱ���ȣ�׼ȷ��ʱ��Ҫ����ʱ���
    this.startOn      = this.options.delay*1000;
    this.finishOn     = this.startOn + (this.options.duration*1000);
    this.event('beforeStart');
	
	// �ж�options�Ƿ���������Ҫ��״̬����
	var bAdd = true;
	if (this.options.stateId){
		bAdd = this.startState();
		if (typeof this.options.succObj == "object")
			this.options.succObj.success = bAdd;
	}
		
	// �������ͬ���Ļ�������ǰЧ������Ч���������첽����
    if(!this.options.sync && bAdd) Effect.Queue.add(this);
  },
  
  // ���к����е�setup(),update()��finish()�ɼ̳����ṩ

  // �ڶ�ʱ������С���ظ���Ⱦ���� timePosΪ��ǰִ�е���ʱ���
  loop: function(timePos) {
    if(timePos >= this.startOn) {
      if(timePos >= this.finishOn) {
		// ���ʱ����ˣ��������Ⱦģʽ
	    this.render(1.0);
        this.cancel();
		// ���finish�Ƿ���ע���¼�
        this.event('beforeFinish');
        if(this.finish) this.finish(); // finish��Ҫ���style������ȹ����������Ҫ��
        this.event('afterFinish');
        if(this.options.stateId)	this.finishState();		// ����״̬����
		if(this.options.userCallBack)	this.options.userCallBack();		// �û�����Ļص���������
        return;  
      }
	  // ȷ����ǰʱ��Ľ���
      var pos   = (timePos - this.startOn) / (this.finishOn - this.startOn);
	  var frame = Math.round(pos * this.options.fps * this.options.duration);
      if(frame > this.currentFrame) {
        this.render(pos);
        this.currentFrame = frame;
      }
    }
  },
  
  // pos��ʾÿ����Ⱦ��Ҫ������pos��С
  render: function(pos) {
    if(this.state == 'idle') {
	  // ��һ�ν�����Ⱦģʽ
      this.state = 'running';
	  // �������ǰ���ע���¼�
      this.event('beforeSetup');
      if(this.setup) this.setup();	// ����������
      this.event('afterSetup');
    }
	// ���㵱ǰpos����λ��
    if(this.options.transition) pos = this.options.transition(pos);
    pos *= (this.options.to-this.options.from);
    pos += this.options.from;
    this.position = pos;
	
	// ���µ�ǰstyle��λ��
    this.event('beforeUpdate');
    if(this.update) this.update(pos);
    this.event('afterUpdate');
  },
  
  // ��effect�Ӷ������Ƴ�
  cancel: function() {
    if(!this.options.sync) Effect.Queue.remove(this);
    this.state = 'finished';
  },
  
  // �������ָ���¼��Ƿ���ע��ص�
  event: function(eventName) {
    if(this.options[eventName + 'Internal']) this.options[eventName + 'Internal'](this);
    if(this.options[eventName]) this.options[eventName](this);
  },
  
  // ��ĳ��element�Ĳ���״̬�����Ƶĺ���
  startState: function(){
	if (!this.element._state){
		this.element._state="running";
		return true;
	}
	else if (this.element._state=="running")
		return false;
	else {
		this.element._state="running";
		return true;
	}
  },
  
  finishState: function(){
	this.element._state="finished";
  }
}

Effect.Opacity = Class.create();
Object.extend(Object.extend(Effect.Opacity.prototype, Effect.Base.prototype), {
  initialize: function(element) {
    this.element = $(element);
    // make this work on IE on elements without 'layout'
    if(/MSIE/.test(navigator.userAgent) && (!this.element.hasLayout))
      this.element.style.zoom = 1;
    var options = Object.extend({
      from: Element.getOpacity(this.element) || 0.0,
      to:   1.0
    }, arguments[1] || {});
    this.start(options);
  },
  update: function(position) {
    Element.setOpacity(this.element, position);
  }
});

Effect.Move = Class.create();
Object.extend(Object.extend(Effect.Move.prototype, Effect.Base.prototype), {
  initialize: function(element) {
    this.element = $(element);
    var options = Object.extend({
      x:    0,
      y:    0,
      mode: 'relative'
    }, arguments[1] || {});
    this.start(options);
  },
  setup: function() {
    // Bug in Opera: Opera returns the "real" position of a static element or
    // relative element that does not have top/left explicitly set.
    // ==> Always set top and left for position relative elements in your stylesheets 
    // (to 0 if you do not need them) 
    Element.makePositioned(this.element);
    this.originalLeft = parseFloat(Element.getStyle(this.element,'left') || '0');
    this.originalTop  = parseFloat(Element.getStyle(this.element,'top')  || '0');
    if(this.options.mode == 'absolute') {
      // absolute movement, so we need to calc deltaX and deltaY
      this.options.x = this.options.x - this.originalLeft;
      this.options.y = this.options.y - this.originalTop;
    }
  },
  update: function(position) {
    Element.setStyle(this.element, {
      left: this.options.x  * position + this.originalLeft + 'px',
      top:  this.options.y  * position + this.originalTop  + 'px'
    });
  }
});

Effect.MoveBy = Class.create();
Object.extend(Object.extend(Effect.MoveBy.prototype, Effect.Base.prototype), {
  initialize: function(element, toTop, toLeft) {
    this.element      = $(element);
    this.toTop        = toTop;
    this.toLeft       = toLeft;
    this.start(arguments[3]);
  },
  setup: function() {
    // Bug in Opera: Opera returns the "real" position of a static element or
    // relative element that does not have top/left explicitly set.
    // ==> Always set top and left for position relative elements in your stylesheets 
    // (to 0 if you do not need them)
    
    Element.makePositioned(this.element);
    this.originalTop  = parseFloat(Element.getStyle(this.element,'top')  || '0');
    this.originalLeft = parseFloat(Element.getStyle(this.element,'left') || '0');
  },
  update: function(position) {
    var topd  = this.toTop  * position + this.originalTop;
    var leftd = this.toLeft * position + this.originalLeft;
    this.setPosition(topd, leftd);
  },
  setPosition: function(topd, leftd) {
    this.element.style.top  = topd  + "px";
    this.element.style.left = leftd + "px";
  }
});

Effect.Scale = Class.create();
Object.extend(Object.extend(Effect.Scale.prototype, Effect.Base.prototype), {
  initialize: function(element, percent) {
    this.element = $(element)
    var options = Object.extend({
      scaleX: true,
      scaleY: true,
      scaleContent: true,
      scaleFromCenter: false,
      scaleMode: 'box',        // 'box' or 'contents' or {} with provided values
      scaleFrom: 100.0,
      scaleTo:   percent
    }, arguments[2] || {});
   this.start(options);
  },
  setup: function() {
    var effect = this;
    
	// ͨ�����û�ȡ�Ƿ���Ч������������
    this.restoreAfterFinish = this.options.restoreAfterFinish || false;
    this.elementPositioning = Element.getStyle(this.element,'position');
    
	// �ȱ���ԭ�е�style��Top, Left
    effect.originalStyle = {};
    ['top','left','width','height','fontSize'].each( function(k) {
      effect.originalStyle[k] = effect.element.style[k];
    });
      
    this.originalTop  = this.element.offsetTop;
    this.originalLeft = this.element.offsetLeft;
    
	// ��¼�����С
    var fontSize = Element.getStyle(this.element,'font-size') || "100%";
    ['em','px','%'].each( function(fontSizeType) {
      if(fontSize.indexOf(fontSizeType)>0) {
        effect.fontSize     = parseFloat(fontSize);
        effect.fontSizeType = fontSizeType;
      }
    });
    
    this.factor = (this.options.scaleTo - this.options.scaleFrom)/100;
    
	// ����dims��������
    this.dims = null;
	
    // ���ﻳ�ɿ��ܸ�������������й�ϵ
	// ie �޷����element.clientHeight��elemet.clinetWidth
    /*if(this.options.scaleMode=='box')
      this.dims = [this.element.clientHeight, this.element.clientWidth];*/
	if(this.options.scaleMode=='box'){
	  	if(/MSIE/.test(navigator.userAgent)) {		// ��������������ж�
	  		var width = (this.element.clientWidth=="") ? this.element.scrollHeight : this.element.clientWidth;
	  		var height = (this.element.clientHeight=="") ? this.element.scrollHeight : this.element.clientHeight;
    		this.dims = [height, width];
	    }
	  	else 
			this.dims = [this.element.clientHeight, this.element.clientWidth];
	} 
	if(/^content/.test(this.options.scaleMode))
		this.dims = [this.element.scrollHeight, this.element.scrollWidth];
	if(!this.dims)
		this.dims = [this.options.scaleMode.originalHeight,
                   this.options.scaleMode.originalWidth];
  },
  
  // ����style������仯
  update: function(position) {
    var currentScale = (this.options.scaleFrom/100.0) + (this.factor * position);
    if(this.options.scaleContent && this.fontSize)
      this.element.style.fontSize = this.fontSize*currentScale + this.fontSizeType;
    this.setDimensions(this.dims[0] * currentScale, this.dims[1] * currentScale);
  },
  
  // �����������Ҫ����������
  finish: function(position) {
    if (this.restoreAfterFinish) {
      var effect = this;
      ['top','left','width','height','fontSize'].each( function(k) {
        effect.element.style[k] = effect.originalStyle[k];
      });
    }
  },
  
  // ����style�ĳ���仯
  setDimensions: function(height, width) {
    var els = this.element.style;

    if(this.options.scaleX) els.width = width + 'px';
 	  if(this.options.scaleY){
			if(/MSIE/.test(navigator.userAgent))		// ��������������ж�
    			if (height < 1)	height=1;
 	  	els.height = height + 'px';
 	}
    if(this.options.scaleFromCenter) {
      var topd  = (height - this.dims[0])/2;
      var leftd = (width  - this.dims[1])/2;
	  
	  	if(this.elementPositioning == 'absolute') {
      	if(this.options.scaleY) els.top = this.originalTop-topd + "px";
        if(this.options.scaleX) els.left = this.originalLeft-leftd + "px";
      } else {
      	if(this.options.scaleY) els.top = -topd + "px";
        if(this.options.scaleX) els.left = -leftd + "px";
      }
    }
  }
});

Effect.ScrollTo = Class.create();
Object.extend(Object.extend(Effect.ScrollTo.prototype, Effect.Base.prototype), {
  initialize: function(element) {
    this.element = $(element);
    this.start(arguments[1] || {});
  },
  setup: function() {
    Position.prepare();
    var offsets = Position.cumulativeOffset(this.element);
    var max = window.innerHeight ? 
      window.height - window.innerHeight :
      document.body.scrollHeight - 
        (document.documentElement.clientHeight ? 
          document.documentElement.clientHeight : document.body.clientHeight);
    this.scrollStart = Position.deltaY;
    this.delta = (offsets[1] > max ? max : offsets[1]) - this.scrollStart;
  },
  update: function(position) {
    Position.prepare();
    window.scrollTo(Position.deltaX, 
      this.scrollStart + (position*this.delta));
  }
});

/* ------------- combination effects ------------- */

Effect.Fade = function(element) {
  var oldOpacity = Element.getInlineOpacity(element);
  var options = Object.extend({
  from: Element.getOpacity(element) || 1.0,
  to:   0.0,
  afterFinishInternal: function(effect) 
    { if (effect.options.to == 0) {
        Element.hide(effect.element);
        Element.setInlineOpacity(effect.element, oldOpacity);
      }  
    }
  }, arguments[1] || {});
  return new Effect.Opacity(element,options);
}

Effect.Appear = function(element) {
  var options = Object.extend({
  from: (Element.getStyle(element, "display") == "none" ? 0.0 : Element.getOpacity(element) || 0.0),
  to:   1.0,
  beforeSetup: function(effect)  { 
	  Element.setOpacity(effect.element, effect.options.from);
      Element.show(effect.element); }
  }, arguments[1] || {});
  return new Effect.Opacity(element,options);
}


Effect.BlindUp = function(element) {
  element = $(element);

  Element.makeClipping(element);
  return new Effect.Scale(element, 0, 
    Object.extend({ scaleContent: false, 
      scaleX: false, 
      restoreAfterFinish: true,
      afterFinishInternal: function(effect)
        { 
          Element.hide(effect.element);
          Element.undoClipping(effect.element);
        } 
    }, arguments[1] || {})
  );
}

Effect.BlindDown = function(element) {
  element = $(element);
  
  var oldHeight = element.style.height;
  var elementDimensions = Element.getDimensions(element);
  return new Effect.Scale(element, 100, 
    Object.extend({ scaleContent: false, 
      scaleX: false,
      scaleFrom: 0,
      scaleMode: {originalHeight: elementDimensions.height, originalWidth: elementDimensions.width},
      restoreAfterFinish: true,
      afterSetup: function(effect) {
        Element.makeClipping(effect.element);
        // overflowΪhidden���������Ҫע��ie��firefox��height�ϵĲ��
   		if(/MSIE/.test(navigator.userAgent))		// ��������������ж�
        	effect.element.style.height = "1px";
        else
        	effect.element.style.height = "0px";
        Element.show(effect.element); 
      },  
      afterFinishInternal: function(effect) {
        Element.undoClipping(effect.element);
        effect.element.style.height = oldHeight;
      }
    }, arguments[1] || {})
  );
}

Effect.SlideDown = function(element) {
  element = $(element);
  Element.cleanWhitespace(element);
  // SlideDown need to have the content of the element wrapped in a container element with fixed height!
  var oldInnerBottom = element.firstChild.style.bottom;
  var elementDimensions = Element.getDimensions(element);
  return new Effect.Scale(element, 100, 
   Object.extend({ scaleContent: false, 
    scaleX: false, 
    scaleFrom: 0,
    scaleMode: {originalHeight: elementDimensions.height, originalWidth: elementDimensions.width},    
    restoreAfterFinish: true,
    afterSetup: function(effect) {
      Element.makePositioned(effect.element.firstChild);
      if (window.opera) effect.element.firstChild.style.top = "";
      Element.makeClipping(effect.element);
      element.style.height = '0';
      Element.show(element); 
    },  
    afterUpdateInternal: function(effect) { 
      effect.element.firstChild.style.bottom = 
        (effect.dims[0] - effect.element.clientHeight) + 'px'; },
    afterFinishInternal: function(effect) { 
      Element.undoClipping(effect.element); 
      Element.undoPositioned(effect.element.firstChild);
      effect.element.firstChild.style.bottom = oldInnerBottom;
	  }
    }, arguments[1] || {})
  );
}
  
Effect.SlideUp = function(element) {
  element = $(element);
  Element.cleanWhitespace(element);
  var oldInnerBottom = element.firstChild.style.bottom;
  return new Effect.Scale(element, 0, 
   Object.extend({ scaleContent: false, 
    scaleX: false, 
    scaleMode: 'box',
    scaleFrom: 100,
    restoreAfterFinish: true,
    beforeStartInternal: function(effect) { 
      Element.makePositioned(effect.element.firstChild);
      if (window.opera) effect.element.firstChild.style.top = "";
      Element.makeClipping(effect.element);
      Element.show(element); 
    },  
    afterUpdateInternal: function(effect) { 
     effect.element.firstChild.style.bottom = 
       (effect.dims[0] - effect.element.clientHeight) + 'px'; },
    afterFinishInternal: function(effect) { 
        Element.hide(effect.element);
        Element.undoClipping(effect.element); 
        Element.undoPositioned(effect.element.firstChild);
        effect.element.firstChild.style.bottom = oldInnerBottom; }
   }, arguments[1] || {})
  );
}

Effect.SlideRight = function(element) {
  element = $(element);
  Element.cleanWhitespace(element);
  var oldInnerRight = element.firstChild.style.right;
  var elementDimensions = Element.getDimensions(element);
  return new Effect.Scale(element, 100, 
   Object.extend({ scaleContent: false, 
    scaleY: false, 
    scaleFrom: 0,
    scaleMode: {originalHeight: elementDimensions.height, originalWidth: elementDimensions.width},    
    restoreAfterFinish: true,
    afterSetup: function(effect) {
      Element.makePositioned(effect.element.firstChild);
      if (window.opera) effect.element.firstChild.style.top = "";
      Element.makeClipping(effect.element);
      //element.style.width = '0';
      Element.show(element); 
    },  
    afterUpdateInternal: function(effect) { 
      effect.element.firstChild.style.right = 
        (effect.dims[1] - effect.element.clientWidth) + 'px'; },
    afterFinishInternal: function(effect) { 
      Element.undoClipping(effect.element); 
      Element.undoPositioned(effect.element.firstChild);
      effect.element.firstChild.style.right = oldInnerRight;
	  }
    }, arguments[1] || {})
  );
}
  
Effect.SlideLeft = function(element) {
  element = $(element);
  Element.cleanWhitespace(element);
  var oldInnerRight = element.firstChild.style.right;
  return new Effect.Scale(element, 0, 
   Object.extend({ scaleContent: false, 
    scaleY: false, 
    scaleMode: 'box',
    scaleFrom: 100,
    restoreAfterFinish: true,
    beforeStartInternal: function(effect) { 
      Element.makePositioned(effect.element.firstChild);
      if (window.opera) effect.element.firstChild.style.top = "";
      Element.makeClipping(effect.element);
      Element.show(element); 
    },  
    afterUpdateInternal: function(effect) { 
     effect.element.firstChild.style.right = 
       (effect.dims[1] - effect.element.clientWidth) + 'px'; },
    afterFinishInternal: function(effect) { 
        Element.hide(effect.element);
        Element.undoClipping(effect.element); 
        Element.undoPositioned(effect.element.firstChild);
        effect.element.firstChild.style.right = oldInnerRight;
     	}
   }, arguments[1] || {})
  );
}

// Copyright (c) 2005 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us)
// 
// See scriptaculous.js for full license.

/*--------------------------------------------------------------------------*/

var globalz = 50;
var Droppables = {
  drops: [],

  remove: function(element) {
    this.drops = this.drops.reject(function(d) { return d.element==$(element) });
  },

  add: function(element) {
  	
    element = $(element);
    var options = Object.extend({
      greedy:     true,
      hoverclass: null  
    }, arguments[1] || {});

    // cache containers
    if(options.containment) {
      options._containers = [];
      var containment = options.containment;
      if((typeof containment == 'object') && 
        (containment.constructor == Array)) {
        containment.each( function(c) { options._containers.push($(c)) });
      } else {
        options._containers.push($(containment));
      }
    }
   
    if(options.accept) options.accept = [options.accept].flatten();
    Element.makePositioned(element); // fix IE
    options.element = element;

    this.drops.push(options);
	
  },

  isContained: function(element, drop) {
    var parentNode = element.parentNode;
    return drop._containers.detect(function(c) { return parentNode == c });
  },

  isAffected: function(point, element, drop) {
    return (
      (drop.element!=element) &&
      ((!drop._containers) ||
        this.isContained(element, drop)) &&
      ((!drop.accept) ||
        (Element.classNames(element).detect( 
          function(v) { return drop.accept.include(v) } ) )) &&
      Position.within(drop.element, point[0], point[1]) );
  },

  deactivate: function(drop) {
    if(drop.hoverclass)
      Element.removeClassName(drop.element, drop.hoverclass);
    this.last_active = null;
  },

  activate: function(drop) {
    if(drop.hoverclass)
      Element.addClassName(drop.element, drop.hoverclass);
    this.last_active = drop;
  },

  show: function(point, element) {
    if(!this.drops.length) return;
    
    if(this.last_active) this.deactivate(this.last_active);
    this.drops.each( function(drop) {
      if(Droppables.isAffected(point, element, drop)) {
        if(drop.onHover)
           drop.onHover(element, drop.element, Position.overlap(drop.overlap, drop.element));
        if(drop.greedy) { 
          Droppables.activate(drop);
          throw $break;
        }
      }
    });
  },

  fire: function(event, element) {
    if(!this.last_active) return;
    Position.prepare();

    if (this.isAffected([Event.pointerX(event), Event.pointerY(event)], element, this.last_active))
      if (this.last_active.onDrop) 
        this.last_active.onDrop(element, this.last_active.element, event);
  },

  reset: function() {
    if(this.last_active)
      this.deactivate(this.last_active);
  }
}

var Draggables = {
  drags: [],
  observers: [],
  
  register: function(draggable) {
    if(this.drags.length == 0) {
      this.eventMouseUp   = this.endDrag.bindAsEventListener(this);
      this.eventMouseMove = this.updateDrag.bindAsEventListener(this);
      this.eventKeypress  = this.keyPress.bindAsEventListener(this);
      
      Event.observe(document, "mouseup", this.eventMouseUp);
      Event.observe(document, "mousemove", this.eventMouseMove);
      Event.observe(document, "keypress", this.eventKeypress);
    }
    this.drags.push(draggable);
  },
  
  unregister: function(draggable) {
    this.drags = this.drags.reject(function(d) { return d==draggable });
    if(this.drags.length == 0) {
      Event.stopObserving(document, "mouseup", this.eventMouseUp);
      Event.stopObserving(document, "mousemove", this.eventMouseMove);
      Event.stopObserving(document, "keypress", this.eventKeypress);
    }
  },
  
  activate: function(draggable) {
    window.focus(); // allows keypress events if window isn't currently focused, fails for Safari
    this.activeDraggable = draggable;
  },
  
  deactivate: function() {
    this.activeDraggable = null;
  },
  
  updateDrag: function(event) {
    if(!this.activeDraggable) return;
    var pointer = [Event.pointerX(event), Event.pointerY(event)];
    // Mozilla-based browsers fire successive mousemove events with
    // the same coordinates, prevent needless redrawing (moz bug?)
    if(this._lastPointer && (this._lastPointer.inspect() == pointer.inspect())) return;
    this._lastPointer = pointer;
    this.activeDraggable.updateDrag(event, pointer);
  },
  
  endDrag: function(event) {
    if(!this.activeDraggable) return;
    this._lastPointer = null;
    this.activeDraggable.endDrag(event);
    this.activeDraggable = null;
  },
  
  keyPress: function(event) {
    if(this.activeDraggable)
      this.activeDraggable.keyPress(event);
  },
  
  addObserver: function(observer) {
    this.observers.push(observer);
    this._cacheObserverCallbacks();
  },
  
  removeObserver: function(element) {  // element instead of observer fixes mem leaks
    this.observers = this.observers.reject( function(o) { return o.element==element });
    this._cacheObserverCallbacks();
  },
  
  notify: function(eventName, draggable, event) {  // 'onStart', 'onEnd', 'onDrag'
    if(this[eventName+'Count'] > 0)
      this.observers.each( function(o) {
        if(o[eventName]) o[eventName](eventName, draggable, event);
      });
  },
  
  _cacheObserverCallbacks: function() {
    ['onStart','onEnd','onDrag'].each( function(eventName) {
      Draggables[eventName+'Count'] = Draggables.observers.select(
        function(o) { return o[eventName]; }
      ).length;
    });
  }
}

/*--------------------------------------------------------------------------*/

var Draggable = Class.create();
Draggable.prototype = {
  initialize: function(element) {
    var options = Object.extend({
      handle: false,
      starteffect: function(element) { 
        new Effect.Opacity(element, {duration:0.2, from:1.0, to:0.7}); 
      },
      reverteffect: function(element, top_offset, left_offset) {
        var callback = this.afterRevert.bind(this);
      	var dur = Math.sqrt(Math.abs(top_offset^2)+Math.abs(left_offset^2))*0.02;
        element._revert = new Effect.Move(element, { x: -left_offset, y: -top_offset, duration: dur,userCallBack:callback});
      },
      endeffect: function(element) {       	
        new Effect.Opacity(element, {duration:0.2, from:0.7, to:1.0}); 
      },
      zindex: 1000,
      revert: false,
      scroll: false,
      scrollSensitivity: 20,
      scrollSpeed: 15,
      snap: false   // false, or xy or [x,y] or function(x,y){ return [x,y] }
    }, arguments[1] || {});

    this.element = $(element);
    
    if(options.handle && (typeof options.handle == 'string'))
      this.handle = Element.childrenWithClassName(this.element, options.handle)[0];  
    if(!this.handle) this.handle = $(options.handle);
    if(!this.handle) this.handle = this.element;
    
    if(options.scroll) options.scroll = $(options.scroll);

    Element.makePositioned(this.element); // fix IE    

    this.delta    = this.currentDelta();
    this.options  = options;
    this.dragging = false;   

    this.eventMouseDown = this.initDrag.bindAsEventListener(this);
    Event.observe(this.handle, "mousedown", this.eventMouseDown);
    
    Draggables.register(this);
  },
  
  afterRevert:function() {  
  	if(this.options.zindex)   
      this.element.style.zIndex = this.originalZ;
  }
  ,
  
  destroy: function() {
    Event.stopObserving(this.handle, "mousedown", this.eventMouseDown);
    Draggables.unregister(this);
  },
  
  currentDelta: function() {
    return([
      parseInt(Element.getStyle(this.element,'left') || '0'),
      parseInt(Element.getStyle(this.element,'top') || '0')]);
  },
  
  initDrag: function(event) {
    if(Event.isLeftClick(event)) {    
      // abort on form elements, fixes a Firefox issue
      var src = Event.element(event);
      if(src.tagName && (
        src.tagName=='INPUT' ||
        src.tagName=='SELECT' ||
        src.tagName=='OPTION' ||
        src.tagName=='BUTTON' ||
        src.tagName=='TEXTAREA')) return;
        
      if(this.element._revert) {
        this.element._revert.cancel();
        this.element._revert = null;
      }
      
      var pointer = [Event.pointerX(event), Event.pointerY(event)];
      var pos     = Position.cumulativeOffset(this.element);
      this.offset = [0,1].map( function(i) { return (pointer[i] - pos[i]) });
      
      Draggables.activate(this);
      Event.stop(event);
    }
  },
  
  startDrag: function(event) {
    this.dragging = true;
    
    globalz++;
    this.element.parentNode.style.zIndex = globalz;
    
    if(this.options.zindex) {
      this.originalZ = parseInt(Element.getStyle(this.element,'z-index') || 0);
      this.element.style.zIndex = this.options.zindex;
    }
    
    if(this.options.ghosting) {
      this._clone = this.element.cloneNode(true);
      Position.absolutize(this.element);
      this.element.parentNode.insertBefore(this._clone, this.element);
    }
    
    if(this.options.scroll) {
      this.originalScrollLeft = this.options.scroll.scrollLeft;
      this.originalScrollTop = this.options.scroll.scrollTop;
    }
    
    Draggables.notify('onStart', this, event);
    if(this.options.starteffect) this.options.starteffect(this.element);
  },
  
  updateDrag: function(event, pointer) {
    if(!this.dragging) this.startDrag(event);
    Position.prepare();
    Droppables.show(pointer, this.element);
    Draggables.notify('onDrag', this, event);
    this.draw(pointer);
    if(this.options.change) this.options.change(this);
    
    if(this.options.scroll) {
      //if(this.scrollInterval) this.scroll();
      this.stopScrolling();
      var p = Position.page(this.options.scroll);
      p[0] += this.options.scroll.scrollLeft;
      p[1] += this.options.scroll.scrollTop;
      p.push(p[0]+this.options.scroll.offsetWidth);
      p.push(p[1]+this.options.scroll.offsetHeight);
      var speed = [0,0];
      if(pointer[0] < (p[0]+this.options.scrollSensitivity)) speed[0] = pointer[0]-(p[0]+this.options.scrollSensitivity);
      if(pointer[1] < (p[1]+this.options.scrollSensitivity)) speed[1] = pointer[1]-(p[1]+this.options.scrollSensitivity);
      if(pointer[0] > (p[2]-this.options.scrollSensitivity)) speed[0] = pointer[0]-(p[2]-this.options.scrollSensitivity);
      if(pointer[1] > (p[3]-this.options.scrollSensitivity)) speed[1] = pointer[1]-(p[3]-this.options.scrollSensitivity);
      this.startScrolling(speed);
    }
    
    // fix AppleWebKit rendering
    if(navigator.appVersion.indexOf('AppleWebKit')>0) window.scrollBy(0,0);
    
    Event.stop(event);
  },
  
  finishDrag: function(event, success) {
    this.dragging = false;

    if(this.options.ghosting) {
      Position.relativize(this.element);
      Element.remove(this._clone);
      this._clone = null;
    }

    if(success) Droppables.fire(event, this.element);
    Draggables.notify('onEnd', this, event);

    var revert = this.options.revert;
    if(revert && typeof revert == 'function') revert = revert(this.element);
    
    var d = this.currentDelta();
    if(revert && this.options.reverteffect) {
      this.options.reverteffect.apply(this,[this.element, 
        d[1]-this.delta[1], d[0]-this.delta[0]]);
    } else {
      this.delta = d;
    }

    if(this.options.zindex&&(!this.options.reverteffect))   
       this.element.style.zIndex = this.originalZ;
  

    if(this.options.endeffect) 
      this.options.endeffect(this.element);

    Draggables.deactivate(this);
    Droppables.reset();
  },
  
  keyPress: function(event) {
    if(event.keyCode!=Event.KEY_ESC) return;
    this.finishDrag(event, false);
    Event.stop(event);
  },
  
  endDrag: function(event) {
    if(!this.dragging) return;
    this.stopScrolling();
    this.finishDrag(event, true);
    Event.stop(event);
  },
  
  draw: function(point) {
    var pos = Position.cumulativeOffset(this.element);
    var d = this.currentDelta();
    pos[0] -= d[0]; pos[1] -= d[1];
    
    if(this.options.scroll) {
      pos[0] -= this.options.scroll.scrollLeft-this.originalScrollLeft;
      pos[1] -= this.options.scroll.scrollTop-this.originalScrollTop;
    }
    
    var p = [0,1].map(function(i){ 
      return (point[i]-pos[i]-this.offset[i]) 
    }.bind(this));
    
    if(this.options.snap) {
      if(typeof this.options.snap == 'function') {
        p = this.options.snap(p[0],p[1]);
      } else {
      if(this.options.snap instanceof Array) {
        p = p.map( function(v, i) {
          return Math.round(v/this.options.snap[i])*this.options.snap[i] }.bind(this))
      } else {
        p = p.map( function(v) {
          return Math.round(v/this.options.snap)*this.options.snap }.bind(this))
      }
    }}
    
    var style = this.element.style;
    if((!this.options.constraint) || (this.options.constraint=='horizontal'))
      style.left =  p[0] +"px";
    if((!this.options.constraint) || (this.options.constraint=='vertical'))
      style.top  = p[1] + "px";
    if(style.visibility=="hidden") style.visibility = ""; // fix gecko rendering
  },
  
  stopScrolling: function() {
    if(this.scrollInterval) {
      clearInterval(this.scrollInterval);
      this.scrollInterval = null;
    }
  },
  
  startScrolling: function(speed) {
    this.scrollSpeed = [speed[0]*this.options.scrollSpeed,speed[1]*this.options.scrollSpeed];
    this.lastScrolled = new Date();
    this.scrollInterval = setInterval(this.scroll.bind(this), 10);
  },
  
  scroll: function() {
    var current = new Date();
    var delta = current - this.lastScrolled;
    this.lastScrolled = current;
    this.options.scroll.scrollLeft += this.scrollSpeed[0] * delta / 1000;
    this.options.scroll.scrollTop  += this.scrollSpeed[1] * delta / 1000;
    
    Position.prepare();
    Droppables.show(Draggables._lastPointer, this.element);
    Draggables.notify('onDrag', this);
    this.draw(Draggables._lastPointer);    
    
    if(this.options.change) this.options.change(this);
  }
}

/*--------------------------------------------------------------------------*/

var SortableObserver = Class.create();
SortableObserver.prototype = {
  initialize: function(element, observer) {
    this.element   = $(element);
    this.observer  = observer;
    this.lastValue = Sortable.serialize(this.element);
  },
  
  onStart: function() {
    this.lastValue = Sortable.serialize(this.element);
  },
  
  onEnd: function() {
    Sortable.unmark();
    if(this.lastValue != Sortable.serialize(this.element))
      this.observer(this.element)
  }
}

var Sortable = {
  sortables: new Array(),
  
  options: function(element){
    element = $(element);
    return this.sortables.detect(function(s) { return s.element == element });
  },
  
  destroy: function(element){  	
    element = $(element);
    this.sortables.findAll(function(s) { return s.element == element }).each(function(s){
      Draggables.removeObserver(s.element);
      s.droppables.each(function(d){ Droppables.remove(d) });
      s.draggables.invoke('destroy');
    });
    this.sortables = this.sortables.reject(function(s) { return s.element == element });     
  },
  
  clear:function() {
  	//clear elements no longer exists
  	this.sortables = this.sortables.reject(function(s) { return $(s.element.id)==null });    
  },
  
  resize:Prototype.emptyFunction
  ,
  create: function(element) {  	
    element = $(element);
    if(element == null) return;
    var options = Object.extend({ 
      element:     element,
      tag:         'li',       // assumes li children, override with tag: 'tagname'
      dropOnEmpty: false,
      tree:        false,      // fixme: unimplemented
      overlap:     'vertical', // one of 'vertical', 'horizontal'
      constraint:  'vertical', // one of 'vertical', 'horizontal', false
      containment: element,    // also takes array of elements (or id's); or false
      handle:      false,      // or a CSS class
      only:        false,
      hoverclass:  null,
      ghosting:    false,
      scroll:      false,
      format:      /^[^_]*_(.*)$/,
      resize:	   Prototype.emptyFunction,
      onChange:    Prototype.emptyFunction,
      onUpdate:    Prototype.emptyFunction
    }, arguments[1] || {});

    // clear any old sortable with same element
    
    this.destroy(element);	 
    this.resize = options.resize;
    // build options for the draggables
    var options_for_draggable = {
      revert:      true,
      scroll:      options.scroll,
      ghosting:    options.ghosting,
      constraint:  options.constraint,
      handle:      options.handle };


    if(options.starteffect)
      options_for_draggable.starteffect = options.starteffect;

    if(options.reverteffect)
      options_for_draggable.reverteffect = options.reverteffect;
    else
      if(options.ghosting) options_for_draggable.reverteffect = function(element) {
        element.style.top  = 0;
        element.style.left = 0;
      };

    if(options.endeffect)
      options_for_draggable.endeffect = options.endeffect;

    if(options.zindex)
      options_for_draggable.zindex = options.zindex;

    // build options for the droppables  
    var options_for_droppable = {
      overlap:     options.overlap,
      containment: options.containment,
      hoverclass:  options.hoverclass,
      onHover:     Sortable.onHover,
      greedy:      !options.dropOnEmpty
    }
	
    // fix for gecko engine
    Element.cleanWhitespace(element); 

    options.draggables = [];
    options.droppables = [];

    // make it so

    // drop on empty handling
    if(options.dropOnEmpty) {
      Droppables.add(element,
        {containment: options.containment, onHover: Sortable.onEmptyHover, greedy: false});
      options.droppables.push(element);
    }
	
    (this.findElements(element, options) || []).each( function(e) {
      // handles are per-draggable
      var handle = options.handle ? 
        Element.childrenWithClassName(e, options.handle)[0] : e;    
      options.draggables.push(
        new Draggable(e, Object.extend(options_for_draggable, { handle: handle })));
      Droppables.add(e, options_for_droppable);
      options.droppables.push(e);      
    });

    // keep reference
    this.sortables.push(options);

    // for onupdate
    Draggables.addObserver(new SortableObserver(element, options.onUpdate));

  },

  // return all suitable-for-sortable elements in a guaranteed order
  findElements: function(element, options) {
    if(!element.hasChildNodes()) return null;
    var elements = [];
    $A(element.childNodes).each( function(e) {
      if(e.tagName && e.tagName.toUpperCase()==options.tag.toUpperCase() &&
        (!options.only || (Element.hasClassName(e, options.only))))
          elements.push(e);
      if(options.tree) {
        var grandchildren = this.findElements(e, options);
        if(grandchildren) elements.push(grandchildren);
      }
    });

    return (elements.length>0 ? elements.flatten() : null);
  },

  onHover: function(element, dropon, overlap) {
  	
  		
    if(overlap>0.5) {
      Sortable.mark(dropon, 'before');
      if(dropon.previousSibling != element) {
        var oldParentNode = element.parentNode;
        element.style.visibility = "hidden"; // fix gecko rendering
        globalz++;
     	dropon.parentNode.style.zIndex = globalz;     
     	dropon.parentNode.insertBefore(element, dropon);           
        Sortable.resize(element);
        if(dropon.parentNode!=oldParentNode) 
          Sortable.options(oldParentNode).onChange(element);
        Sortable.options(dropon.parentNode).onChange(element);
      }
    } else {
      Sortable.mark(dropon, 'after');
      var nextElement = dropon.nextSibling || null;
      if(nextElement != element) {
        var oldParentNode = element.parentNode;
        element.style.visibility = "hidden"; // fix gecko rendering
        globalz++;
    	dropon.parentNode.style.zIndex = globalz;        	       
        dropon.parentNode.insertBefore(element, nextElement);
        Sortable.resize(element);
        if(dropon.parentNode!=oldParentNode) 
          Sortable.options(oldParentNode).onChange(element);
        Sortable.options(dropon.parentNode).onChange(element);
      }
    }
  },

  onEmptyHover: function(element, dropon) {  	
    if(element.parentNode!=dropon) {      
      globalz++;
      dropon.style.zIndex = globalz;
      var oldParentNode = element.parentNode;       
      dropon.appendChild(element);    
      Sortable.resize(element);
      Sortable.options(oldParentNode).onChange(element);
      Sortable.options(dropon).onChange(element);
    }
  },

  unmark: function() {
    if(Sortable._marker) Element.hide(Sortable._marker);
  },

  mark: function(dropon, position) {
    // mark on ghosting only
    var sortable = Sortable.options(dropon.parentNode);
    if(sortable && !sortable.ghosting) return; 

    if(!Sortable._marker) {
      Sortable._marker = $('dropmarker') || document.createElement('DIV');
      Element.hide(Sortable._marker);
      Element.addClassName(Sortable._marker, 'dropmarker');
      Sortable._marker.style.position = 'absolute';
      document.getElementsByTagName("body").item(0).appendChild(Sortable._marker);
    }    
    var offsets = Position.cumulativeOffset(dropon);
    Sortable._marker.style.left = offsets[0] + 'px';
    Sortable._marker.style.top = offsets[1] + 'px';
    
    if(position=='after')
      if(sortable.overlap == 'horizontal') 
        Sortable._marker.style.left = (offsets[0]+dropon.clientWidth) + 'px';
      else
        Sortable._marker.style.top = (offsets[1]+dropon.clientHeight) + 'px';
    
    Element.show(Sortable._marker);
  },

  sequence: function(element) {
    element = $(element);
    var options = Object.extend(this.options(element), arguments[1] || {});
    
    return $(this.findElements(element, options) || []).map( function(item) {
      return item.id.match(options.format) ? item.id.match(options.format)[1] : item.id;
    });
  },

  setSequence: function(element, new_sequence) {
    element = $(element);
    var options = Object.extend(this.options(element), arguments[2] || {});
    
    var nodeMap = {};
    this.findElements(element, options).each( function(n) {
        if (n.id.match(options.format))
            nodeMap[n.id.match(options.format)[1]] = [n, n.parentNode];
        n.parentNode.removeChild(n);
    });
   
    new_sequence.each(function(ident) {
        var n = nodeMap[ident];
        if (n) {
            n[1].appendChild(n[0]);
            delete nodeMap[ident];
        }
    });
  },

  serialize: function(element) {
    element = $(element);
    var name = encodeURIComponent(
      (arguments[1] && arguments[1].name) ? arguments[1].name : element.id);      
    return Sortable.sequence(element, arguments[1]).map( function(item) {
      return encodeURIComponent(item);//name + "[]=" + encodeURIComponent(item);
    }).join(',');
  },

    getPosString: function(){
  	var begin=true;
	var posString = '';
	this.sortables.each(function(e){
		if(begin)
		{
			posString += (Sortable.serialize(e.element));
			begin=false;
		}
		else
			posString += (";"+Sortable.serialize(e.element));
	});
	
	return posString;
  }
}

var Logger={
    debug: function(message){
    },
    info: function(message){
    },
    warn: function(message){
    },
    error: function(message){
    }
}

/**
 * ====================================================================
 * About
 * ====================================================================
 * Sarissa is an ECMAScript library acting as a cross-browser wrapper for native XML APIs.
 * The library supports Gecko based browsers like Mozilla and Firefox,
 * Internet Explorer (5.5+ with MSXML3.0+), Konqueror, Safari and a little of Opera
 * @version 0.9.6.1
 * @author: Manos Batsis, mailto: mbatsis at users full stop sourceforge full stop net
 * ====================================================================
 * Licence
 * ====================================================================
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 2 or
 * the GNU Lesser General Public License version 2.1 as published by
 * the Free Software Foundation (your choice between the two).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License or GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * or GNU Lesser General Public License along with this program; if not,
 * write to the Free Software Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 * or visit http://www.gnu.org
 *
 */
/**
 * <p>Sarissa is a utility class. Provides "static" methods for DOMDocument and 
 * XMLHTTP objects, DOM Node serializatrion to XML strings and other goodies.</p>
 * @constructor
 */
function Sarissa(){};
/** @private */
Sarissa.PARSED_OK = "Document contains no parsing errors";
/**
 * Tells you whether transformNode and transformNodeToObject are available. This functionality
 * is contained in sarissa_ieemu_xslt.js and is deprecated. If you want to control XSLT transformations
 * use the XSLTProcessor
 * @deprecated
 * @type boolean
 */
Sarissa.IS_ENABLED_TRANSFORM_NODE = false;
/**
 * tells you whether XMLHttpRequest (or equivalent) is available
 * @type boolean
 */
Sarissa.IS_ENABLED_XMLHTTP = false;
/**
 * tells you whether selectNodes/selectSingleNode is available
 * @type boolean
 */
Sarissa.IS_ENABLED_SELECT_NODES = false;
var _sarissa_iNsCounter = 0;
var _SARISSA_IEPREFIX4XSLPARAM = "";
var _SARISSA_HAS_DOM_IMPLEMENTATION = document.implementation && true;
var _SARISSA_HAS_DOM_CREATE_DOCUMENT = _SARISSA_HAS_DOM_IMPLEMENTATION && document.implementation.createDocument;
var _SARISSA_HAS_DOM_FEATURE = _SARISSA_HAS_DOM_IMPLEMENTATION && document.implementation.hasFeature;
var _SARISSA_IS_MOZ = _SARISSA_HAS_DOM_CREATE_DOCUMENT && _SARISSA_HAS_DOM_FEATURE;
var _SARISSA_IS_SAFARI = (navigator.userAgent && navigator.vendor && (navigator.userAgent.toLowerCase().indexOf("applewebkit") != -1 || navigator.vendor.indexOf("Apple") != -1));
var _SARISSA_IS_IE = document.all && window.ActiveXObject && navigator.userAgent.toLowerCase().indexOf("msie") > -1  && navigator.userAgent.toLowerCase().indexOf("opera") == -1;
if(!window.Node || !window.Node.ELEMENT_NODE){
    var Node = {ELEMENT_NODE: 1, ATTRIBUTE_NODE: 2, TEXT_NODE: 3, CDATA_SECTION_NODE: 4, ENTITY_REFERENCE_NODE: 5,  ENTITY_NODE: 6, PROCESSING_INSTRUCTION_NODE: 7, COMMENT_NODE: 8, DOCUMENT_NODE: 9, DOCUMENT_TYPE_NODE: 10, DOCUMENT_FRAGMENT_NODE: 11, NOTATION_NODE: 12};
};

// IE initialization
if(_SARISSA_IS_IE){
    // for XSLT parameter names, prefix needed by IE
    _SARISSA_IEPREFIX4XSLPARAM = "xsl:";
    // used to store the most recent ProgID available out of the above
    var _SARISSA_DOM_PROGID = "";
    var _SARISSA_XMLHTTP_PROGID = "";
    /**
     * Called when the Sarissa_xx.js file is parsed, to pick most recent
     * ProgIDs for IE, then gets destroyed.
     * @param idList an array of MSXML PROGIDs from which the most recent will be picked for a given object
     * @param enabledList an array of arrays where each array has two items; the index of the PROGID for which a certain feature is enabled
     */
    pickRecentProgID = function (idList, enabledList){
        // found progID flag
        var bFound = false;
        for(var i=0; i < idList.length && !bFound; i++){
            try{
                var oDoc = new ActiveXObject(idList[i]);
                o2Store = idList[i];
                bFound = true;
                for(var j=0;j<enabledList.length;j++)
                    if(i <= enabledList[j][1])
                        Sarissa["IS_ENABLED_"+enabledList[j][0]] = true;
            }catch (objException){
                // trap; try next progID
            };
        };
        if (!bFound)
            throw "Could not retreive a valid progID of Class: " + idList[idList.length-1]+". (original exception: "+e+")";
        idList = null;
        return o2Store;
    };
    // pick best available MSXML progIDs
    _SARISSA_DOM_PROGID = pickRecentProgID(["Msxml2.DOMDocument.5.0", "Msxml2.DOMDocument.4.0", "Msxml2.DOMDocument.3.0", "MSXML2.DOMDocument", "MSXML.DOMDocument", "Microsoft.XMLDOM"], [["SELECT_NODES", 2],["TRANSFORM_NODE", 2]]);
    _SARISSA_XMLHTTP_PROGID = pickRecentProgID(["Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], [["XMLHTTP", 4]]);
    _SARISSA_THREADEDDOM_PROGID = pickRecentProgID(["Msxml2.FreeThreadedDOMDocument.5.0", "MSXML2.FreeThreadedDOMDocument.4.0", "MSXML2.FreeThreadedDOMDocument.3.0"]);
    _SARISSA_XSLTEMPLATE_PROGID = pickRecentProgID(["Msxml2.XSLTemplate.5.0", "Msxml2.XSLTemplate.4.0", "MSXML2.XSLTemplate.3.0"], [["XSLTPROC", 2]]);
    // we dont need this anymore
    pickRecentProgID = null;
    //============================================
    // Factory methods (IE)
    //============================================
    // see non-IE version
    Sarissa.getDomDocument = function(sUri, sName){
        var oDoc = new ActiveXObject(_SARISSA_DOM_PROGID);
        // if a root tag name was provided, we need to load it in the DOM
        // object
        if (sName){
            // if needed, create an artifical namespace prefix the way Moz
            // does
            if (sUri){
                oDoc.loadXML("<a" + _sarissa_iNsCounter + ":" + sName + " xmlns:a" + _sarissa_iNsCounter + "=\"" + sUri + "\" />");
                // don't use the same prefix again
                ++_sarissa_iNsCounter;
            }
            else
                oDoc.loadXML("<" + sName + "/>");
        };
        return oDoc;
    };
    // see non-IE version   
    Sarissa.getParseErrorText = function (oDoc) {
        var parseErrorText = Sarissa.PARSED_OK;
        if(oDoc.parseError != 0){
            parseErrorText = "XML Parsing Error: " + oDoc.parseError.reason + 
                "\nLocation: " + oDoc.parseError.url + 
                "\nLine Number " + oDoc.parseError.line + ", Column " + 
                oDoc.parseError.linepos + 
                ":\n" + oDoc.parseError.srcText +
                "\n";
            for(var i = 0;  i < oDoc.parseError.linepos;i++){
                parseErrorText += "-";
            };
            parseErrorText +=  "^\n";
        };
        return parseErrorText;
    };
    // see non-IE version
    Sarissa.setXpathNamespaces = function(oDoc, sNsSet) {
        oDoc.setProperty("SelectionLanguage", "XPath");
        oDoc.setProperty("SelectionNamespaces", sNsSet);
    };   
    /**
     * Basic implementation of Mozilla's XSLTProcessor for IE. 
     * Reuses the same XSLT stylesheet for multiple transforms
     * @constructor
     */
    XSLTProcessor = function(){
        this.template = new ActiveXObject(_SARISSA_XSLTEMPLATE_PROGID);
        this.processor = null;
    };
    /**
     * Impoprts the given XSLT DOM and compiles it to a reusable transform
     * @argument xslDoc The XSLT DOMDocument to import
     */
    XSLTProcessor.prototype.importStylesheet = function(xslDoc){
        // convert stylesheet to free threaded
        var converted = new ActiveXObject(_SARISSA_THREADEDDOM_PROGID); 
        converted.loadXML(xslDoc.xml);
        this.template.stylesheet = converted;
        this.processor = this.template.createProcessor();
        // (re)set default param values
        this.paramsSet = new Array();
    };
    /**
     * Transform the given XML DOM
     * @argument sourceDoc The XML DOMDocument to transform
     * @return The transformation result as a DOM Document
     */
    XSLTProcessor.prototype.transformToDocument = function(sourceDoc){
        this.processor.input = sourceDoc;
        var outDoc = new ActiveXObject(_SARISSA_DOM_PROGID);
        this.processor.output = outDoc; 
        this.processor.transform();
        return outDoc;
    };
    /**
     * Set global XSLT parameter of the imported stylesheet
     * @argument nsURI The parameter namespace URI
     * @argument name The parameter base name
     * @argument value The new parameter value
     */
    XSLTProcessor.prototype.setParameter = function(nsURI, name, value){
        /* nsURI is optional but cannot be null */
        if(nsURI){
            this.processor.addParameter(name, value, nsURI);
        }else{
            this.processor.addParameter(name, value);
        };
        /* update updated params for getParameter */
        if(!this.paramsSet[""+nsURI]){
            this.paramsSet[""+nsURI] = new Array();
        };
        this.paramsSet[""+nsURI][name] = value;
    };
    /**
     * Gets a parameter if previously set by setParameter. Returns null
     * otherwise
     * @argument name The parameter base name
     * @argument value The new parameter value
     * @return The parameter value if reviously set by setParameter, null otherwise
     */
    XSLTProcessor.prototype.getParameter = function(nsURI, name){
        nsURI = nsURI || "";
        if(nsURI in this.paramsSet && name in this.paramsSet[nsURI]){
            return this.paramsSet[nsURI][name];
        }else{
            return null;
        };
    };
}
else{ /* end IE initialization, try to deal with real browsers now ;-) */
    if(_SARISSA_HAS_DOM_CREATE_DOCUMENT){
        /**
         * <p>Ensures the document was loaded correctly, otherwise sets the
         * parseError to -1 to indicate something went wrong. Internal use</p>
         * @private
         */
        Sarissa.__handleLoad__ = function(oDoc){
            if (!oDoc.documentElement || oDoc.documentElement.tagName == "parsererror")
                oDoc.parseError = -1;
            Sarissa.__setReadyState__(oDoc, 4);
        };
        /**
        * <p>Attached by an event handler to the load event. Internal use.</p>
        * @private
        */
        _sarissa_XMLDocument_onload = function(){
            Sarissa.__handleLoad__(this);
        };
        /**
         * <p>Sets the readyState property of the given DOM Document object.
         * Internal use.</p>
         * @private
         * @argument oDoc the DOM Document object to fire the
         *          readystatechange event
         * @argument iReadyState the number to change the readystate property to
         */
        Sarissa.__setReadyState__ = function(oDoc, iReadyState){
            oDoc.readyState = iReadyState;
            if (oDoc.onreadystatechange != null && typeof oDoc.onreadystatechange == "function")
                oDoc.onreadystatechange();
        };
        Sarissa.getDomDocument = function(sUri, sName){
            var oDoc = document.implementation.createDocument(sUri?sUri:"", sName?sName:"", null);
            oDoc.addEventListener("load", _sarissa_XMLDocument_onload, false);
            return oDoc;
        };
        if(window.XMLDocument){
            /**
            * <p>Emulate IE's onreadystatechange attribute</p>
            */
            XMLDocument.prototype.onreadystatechange = null;
            /**
            * <p>Emulates IE's readyState property, which always gives an integer from 0 to 4:</p>
            * <ul><li>1 == LOADING,</li>
            * <li>2 == LOADED,</li>
            * <li>3 == INTERACTIVE,</li>
            * <li>4 == COMPLETED</li></ul>
            */
            XMLDocument.prototype.readyState = 0;
            /**
            * <p>Emulate IE's parseError attribute</p>
            */
            XMLDocument.prototype.parseError = 0;

            // NOTE: setting async to false will only work with documents
            // called over HTTP (meaning a server), not the local file system,
            // unless you are using Moz 1.4+.
            // BTW the try>catch block is for 1.4; I haven't found a way to check if
            // the property is implemented without
            // causing an error and I dont want to use user agent stuff for that...
            var _SARISSA_SYNC_NON_IMPLEMENTED = false;// ("async" in XMLDocument.prototype) ? false: true;
            /**
            * <p>Keeps a handle to the original load() method. Internal use and only
            * if Mozilla version is lower than 1.4</p>
            * @private
            */
            XMLDocument.prototype._sarissa_load = XMLDocument.prototype.load;

            /**
            * <p>Overrides the original load method to provide synchronous loading for
            * Mozilla versions prior to 1.4, using an XMLHttpRequest object (if
            * async is set to false)</p>
            * @returns the DOM Object as it was before the load() call (may be  empty)
            */
            XMLDocument.prototype.load = function(sURI) {
                var oDoc = document.implementation.createDocument("", "", null);
                Sarissa.copyChildNodes(this, oDoc);
                this.parseError = 0;
                Sarissa.__setReadyState__(this, 1);
                try {
                    if(this.async == false && _SARISSA_SYNC_NON_IMPLEMENTED) {
                        var tmp = new XMLHttpRequest();
                        tmp.open("GET", sURI, false);
                        tmp.send(null);
                        Sarissa.__setReadyState__(this, 2);
                        Sarissa.copyChildNodes(tmp.responseXML, this);
                        Sarissa.__setReadyState__(this, 3);
                    }
                    else {
                        this._sarissa_load(sURI);
                    };
                }
                catch (objException) {
                    this.parseError = -1;
                }
                finally {
                    if(this.async == false){
                        Sarissa.__handleLoad__(this);
                    };
                };
                return oDoc;
            };
            
            
        }//if(window.XMLDocument)
        else if(document.implementation && document.implementation.hasFeature && document.implementation.hasFeature('LS', '3.0')){
            Document.prototype.async = true;
            Document.prototype.onreadystatechange = null;
            Document.prototype.parseError = 0;
            Document.prototype.load = function(sURI) {
                var parser = document.implementation.createLSParser(this.async ? document.implementation.MODE_ASYNCHRONOUS : document.implementation.MODE_SYNCHRONOUS, null);
                if(this.async){
                    var self = this;
                    parser.addEventListener("load", 
                        function(e) { 
                            self.readyState = 4;
                            Sarissa.copyChildNodes(e.newDocument, self.documentElement, false);
                            self.onreadystatechange.call(); 
                        }, 
                        false); 
                };
                try {
                    var oDoc = parser.parseURI(sURI);
                }
                catch(e){
                    this.parseError = -1;
                };
                if(!this.async)
                   Sarissa.copyChildNodes(oDoc, this.documentElement, false);
                return oDoc;
            };
            /**
            * <p>Factory method to obtain a new DOM Document object</p>
            * @argument sUri the namespace of the root node (if any)
            * @argument sUri the local name of the root node (if any)
            * @returns a new DOM Document
            */
            Sarissa.getDomDocument = function(sUri, sName){
                return document.implementation.createDocument(sUri?sUri:"", sName?sName:"", null);
            };        
        };
    };//if(_SARISSA_HAS_DOM_CREATE_DOCUMENT)
};
//==========================================
// Common stuff
//==========================================
if(!window.DOMParser){
    /*
    * DOMParser is a utility class, used to construct DOMDocuments from XML strings
    * @constructor
    */
    DOMParser = function() {
    };
    if(_SARISSA_IS_SAFARI){
        /** 
        * Construct a new DOM Document from the given XMLstring
        * @param sXml the given XML string
        * @param contentType the content type of the document the given string represents (one of text/xml, application/xml, application/xhtml+xml). 
        * @return a new DOM Document from the given XML string
        */
        DOMParser.prototype.parseFromString = function(sXml, contentType){
            if(contentType.toLowerCase() != "application/xml"){
                throw "Cannot handle content type: \"" + contentType + "\"";
            };
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", "data:text/xml;charset=utf-8," + encodeURIComponent(str), false);
            xmlhttp.send(null);
            return xmlhttp.responseXML;
        };
    }else if(Sarissa.getDomDocument && Sarissa.getDomDocument() && "loadXML" in Sarissa.getDomDocument()){
        DOMParser.prototype.parseFromString = function(sXml, contentType){
            var doc = Sarissa.getDomDocument();
            doc.loadXML(sXml);
            return doc;
        };
    };
};

if(window.XMLHttpRequest){
    Sarissa.IS_ENABLED_XMLHTTP = true;
}
else if(_SARISSA_IS_IE){
    /**
     * Emulate XMLHttpRequest
     * @constructor
     */
    XMLHttpRequest = function() {
        return new ActiveXObject(_SARISSA_XMLHTTP_PROGID);
    };
    Sarissa.IS_ENABLED_XMLHTTP = true;
};

if(!window.document.importNode && _SARISSA_IS_IE){
    try{
        /**
        * Implements importNode for the current window document in IE using innerHTML.
        * Testing showed that DOM was multiple times slower than innerHTML for this,
        * sorry folks. If you encounter trouble (who knows what IE does behind innerHTML)
        * please gimme a call.
        * @param oNode the Node to import
        * @param bChildren whether to include the children of oNode
        * @returns the imported node for further use
        */
        window.document.importNode = function(oNode, bChildren){
            var importNode = document.createElement("div");
            if(bChildren)
                importNode.innerHTML = Sarissa.serialize(oNode);
            else
                importNode.innerHTML = Sarissa.serialize(oNode.cloneNode(false));
            return importNode.firstChild;
        };
        }catch(e){};
};
if(!Sarissa.getParseErrorText){
    /**
     * <p>Returns a human readable description of the parsing error. Usefull
     * for debugging. Tip: append the returned error string in a &lt;pre&gt;
     * element if you want to render it.</p>
     * <p>Many thanks to Christian Stocker for the initial patch.</p>
     * @argument oDoc The target DOM document
     * @returns The parsing error description of the target Document in
     *          human readable form (preformated text)
     */
    Sarissa.getParseErrorText = function (oDoc){
        var parseErrorText = Sarissa.PARSED_OK;
        if(oDoc && oDoc.parseError && oDoc.parseError != 0){
            /*moz*/
            if(oDoc.documentElement.tagName == "parsererror"){
                parseErrorText = oDoc.documentElement.firstChild.data;
                parseErrorText += "\n" +  oDoc.documentElement.firstChild.nextSibling.firstChild.data;
            }/*konq*/
            else{
                parseErrorText = Sarissa.getText(oDoc.documentElement);/*.getElementsByTagName("h1")[0], false) + "\n";
                parseErrorText += Sarissa.getText(oDoc.documentElement.getElementsByTagName("body")[0], false) + "\n";
                parseErrorText += Sarissa.getText(oDoc.documentElement.getElementsByTagName("pre")[0], false);*/
            };
        };
        return parseErrorText;
    };
};
Sarissa.getText = function(oNode, deep){
    var s = "";
    var nodes = oNode.childNodes;
    for(var i=0; i < nodes.length; i++){
        var node = nodes[i];
        var nodeType = node.nodeType;
        if(nodeType == Node.TEXT_NODE || nodeType == Node.CDATA_SECTION_NODE){
            s += node.data;
        }else if(deep == true
                    && (nodeType == Node.ELEMENT_NODE
                        || nodeType == Node.DOCUMENT_NODE
                        || nodeType == Node.DOCUMENT_FRAGMENT_NODE)){
            s += Sarissa.getText(node, true);
        };
    };
    return s;
};
if(window.XMLSerializer){
    /**
     * <p>Factory method to obtain the serialization of a DOM Node</p>
     * @returns the serialized Node as an XML string
     */
    Sarissa.serialize = function(oDoc){
        var s = null;
        if(oDoc){
            s = oDoc.innerHTML?oDoc.innerHTML:(new XMLSerializer()).serializeToString(oDoc);
        };
        return s;
    };
}else{
    if(Sarissa.getDomDocument && (Sarissa.getDomDocument("","foo", null)).xml){
        // see non-IE version
        Sarissa.serialize = function(oDoc) {
            var s = null;
            if(oDoc){
                s = oDoc.innerHTML?oDoc.innerHTML:oDoc.xml;
            };
            return s;
        };
        /**
         * Utility class to serialize DOM Node objects to XML strings
         * @constructor
         */
        XMLSerializer = function(){};
        /**
         * Serialize the given DOM Node to an XML string
         * @param oNode the DOM Node to serialize
         */
        XMLSerializer.prototype.serializeToString = function(oNode) {
            return oNode.xml;
        };
    };
};

/**
 * strips tags from a markup string
 */
Sarissa.stripTags = function (s) {
    return s.replace(/<[^>]+>/g,"");
};
/**
 * <p>Deletes all child nodes of the given node</p>
 * @argument oNode the Node to empty
 */
Sarissa.clearChildNodes = function(oNode) {
    // need to check for firstChild due to opera 8 bug with hasChildNodes
    while(oNode.firstChild){
        oNode.removeChild(oNode.firstChild);
    };
};
/**
 * <p> Copies the childNodes of nodeFrom to nodeTo</p>
 * <p> <b>Note:</b> The second object's original content is deleted before 
 * the copy operation, unless you supply a true third parameter</p>
 * @argument nodeFrom the Node to copy the childNodes from
 * @argument nodeTo the Node to copy the childNodes to
 * @argument bPreserveExisting whether to preserve the original content of nodeTo, default is false
 */
Sarissa.copyChildNodes = function(nodeFrom, nodeTo, bPreserveExisting) {
    if((!nodeFrom) || (!nodeTo)){
        throw "Both source and destination nodes must be provided";
    };
    if(!bPreserveExisting){
        Sarissa.clearChildNodes(nodeTo);
    };
    var ownerDoc = nodeTo.nodeType == Node.DOCUMENT_NODE ? nodeTo : nodeTo.ownerDocument;
    var nodes = nodeFrom.childNodes;
    if(ownerDoc.importNode && (!_SARISSA_IS_IE)) {
        for(var i=0;i < nodes.length;i++) {
            nodeTo.appendChild(ownerDoc.importNode(nodes[i], true));
        };
    }
    else{
        for(var i=0;i < nodes.length;i++) {
            nodeTo.appendChild(nodes[i].cloneNode(true));
        };
    };
};

/**
 * <p> Moves the childNodes of nodeFrom to nodeTo</p>
 * <p> <b>Note:</b> The second object's original content is deleted before 
 * the move operation, unless you supply a true third parameter</p>
 * @argument nodeFrom the Node to copy the childNodes from
 * @argument nodeTo the Node to copy the childNodes to
 * @argument bPreserveExisting whether to preserve the original content of nodeTo, default is
 */ 
Sarissa.moveChildNodes = function(nodeFrom, nodeTo, bPreserveExisting) {
    if((!nodeFrom) || (!nodeTo)){
        throw "Both source and destination nodes must be provided";
    };
    if(!bPreserveExisting){
        Sarissa.clearChildNodes(nodeTo);
    };
    var nodes = nodeFrom.childNodes;
    // if within the same doc, just move, else copy and delete
    if(nodeFrom.ownerDocument == nodeTo.ownerDocument){
        while(nodeFrom.firstChild){
            nodeTo.appendChild(nodeFrom.firstChild);
        };
    }else{
        var ownerDoc = nodeTo.nodeType == Node.DOCUMENT_NODE ? nodeTo : nodeTo.ownerDocument;
        if(ownerDoc.importNode && (!_SARISSA_IS_IE)) {
           for(var i=0;i < nodes.length;i++) {
               nodeTo.appendChild(ownerDoc.importNode(nodes[i], true));
           };
        }else{
           for(var i=0;i < nodes.length;i++) {
               nodeTo.appendChild(nodes[i].cloneNode(true));
           };
        };
        Sarissa.clearChildNodes(nodeFrom);
    };
};

/** 
 * <p>Serialize any object to an XML string. All properties are serialized using the property name
 * as the XML element name. Array elements are rendered as <code>array-item</code> elements, 
 * using their index/key as the value of the <code>key</code> attribute.</p>
 * @argument anyObject the object to serialize
 * @argument objectName a name for that object
 * @return the XML serializationj of the given object as a string
 */
Sarissa.xmlize = function(anyObject, objectName, indentSpace){
    indentSpace = indentSpace?indentSpace:'';
    var s = indentSpace  + '<' + objectName + '>';
    var isLeaf = false;
    if(!(anyObject instanceof Object) || anyObject instanceof Number || anyObject instanceof String 
        || anyObject instanceof Boolean || anyObject instanceof Date){
        s += Sarissa.escape(""+anyObject);
        isLeaf = true;
    }else{
        s += "\n";
        var itemKey = '';
        var isArrayItem = anyObject instanceof Array;
        for(var name in anyObject){
            s += Sarissa.xmlize(anyObject[name], (isArrayItem?"array-item key=\""+name+"\"":name), indentSpace + "   ");
        };
        s += indentSpace;
    };
    return s += (objectName.indexOf(' ')!=-1?"</array-item>\n":"</" + objectName + ">\n");
};

/** 
 * Escape the given string chacters that correspond to the five predefined XML entities
 * @param sXml the string to escape
 */
Sarissa.escape = function(sXml){
    return sXml.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
};

/** 
 * Unescape the given string. This turns the occurences of the predefined XML 
 * entities to become the characters they represent correspond to the five predefined XML entities
 * @param sXml the string to unescape
 */
Sarissa.unescape = function(sXml){
    return sXml.replace(/&apos;/g,"'")
        .replace(/&quot;/g,"\"")
        .replace(/&gt;/g,">")
        .replace(/&lt;/g,"<")
        .replace(/&amp;/g,"&");
};
//   EOF

/*
�����̽��
*/

var Browser = {};

Browser.isIE = function(){
	return (document.all && window.ActiveXObject) ? true : false;
};
Browser.isIE5Up = function(){
	return (Browser.isIE() && document.getElementById) ? true : false;
};

Browser.isIE7 = function(){
        var ua = navigator.userAgent;
        var msieOffset = ua.indexOf("MSIE ");
        if(msieOffset < 0)
        {
            return 0;
        }
        var num = parseFloat(ua.substring(msieOffset + 5, ua.indexOf(";", msieOffset)));
        return num==7;
}
Browser.isFirefox = function(){
	return (document.implementation && document.implementation.createDocument && !window.opera) ? true : false;
};

Browser.isFirefox1_5 = function(){
	return window.navigator.userAgent.indexOf('Firefox/1.5')!=-1;
};
Browser.isFirefox2Up = function(){
	return window.navigator.userAgent.indexOf('Firefox/2')!=-1;
};

Browser.isOpera = function(){
	return (window.opera) ? true : false;
};

/***************************************************************
 *                      Netease Blog Project                   *
 *                                                             *
 * File Name :  Module.js                                      *
 * Written by:  Genify (caijf@corp.netease.com)                *
 * Important :  to use this script don't                       *
 *              remove these comments                          *
 * Version 1.0 (MSIE 5.5 above,Firefox1.0,Netscape.)           *
 * Created Date: 2006-10-23                                    *
 * Copyright: 1997-2006 NetEase.com Inc. All rights reserved.  *
 ***************************************************************/
/**
 * ����ָ���������ռ䣬������������½�һ�������ռ�
 *
 * window.namespace("ui.package");
 * window.namespace("window.ui.package");
 *
 * �������߶������� window.ui, Ȼ�󷵻� window.ui.package
 *
 * ע�⣺�������ֿռ�ʱ��Ҫʹ������������Ĺؼ��֣������������ֿռ���Safari�л����:
 *
 * window.namespace("really.long.nested.namespace");
 *
 * ��Ϊ����� "long" ��ECMAScript�����Ĺؼ���
 *
 * @param  {String}sNameSpace
 *          ���ֿռ������
 * @return {Object}    
 *          ���ɵ����ֿռ����    
 */
window.register = function(sNameSpace) {
    if (!sNameSpace || !sNameSpace.length) {
        return null;
    }
    var _lvl = sNameSpace.split(".");
    var _rtn = window;
    for (var i=(_lvl[0]=="window")?1:0,l=_lvl.length;i<l;i++) {
        _rtn = _rtn[_lvl[i]] = _rtn[_lvl[i]] || {};
    }
    return _rtn;
};
/**
 * ģ��ʵ�ּ̳в���
 * @param {Function}fnSubclass
 *        �������
 * @param {Function}fnSuperclass
 *        �������
 * @param {String}sClassName
 *        ��������
 */
window.extend = function(fnSubclass,fnSuperclass,sClassName) {
    var _p = fnSubclass.prototype = new fnSuperclass;
    _p.subClass  = fnSubclass;
    _p.supClass  = fnSuperclass;
    _p.className = sClassName || '';
};
register("netease.ui.module");
/**
 * ҳ��������Ϣ
 */
netease.ui.module.Configuration = 
{
    HtmlTemplate : {
         Module          : '<div class="mdl mt bd00 g_h_1"></div>',
         ModuleTitleBar  : '<div class="mdl_t mt g_p_relative"><div class="mdl_t_l g_p_absolute g_p_left_top g_t_space">&nbsp;</div><div class="mdl_t_r g_p_absolute g_p_rght_top g_t_space">&nbsp;</div><div class="mdl_t_c c03 g_t_left g_t_bold g_t_hide">&nbsp;</div><div class="mdl_t_m g_p_absolute">&nbsp;</div></div>',
         ModuleMenuBar   : '<div class="mdl_n h2 mt g_p_relative"><div class="mdl_n_l h2 g_p_absolute g_p_left_top g_t_space">&nbsp;</div><div class="mdl_n_r h2 g_p_absolute g_p_rght_top g_t_space">&nbsp;</div><div class="mdl_n_c h2 c04">&nbsp;</div></div>',
         ModuleContent   : '<div class="mdl_c mt g_p_relative g_p_hide"><div class="mdl_c_l g_p_left g_p_fill g_t_space">&nbsp;</div><div class="mdl_c_r g_p_right g_p_fill g_t_space">&nbsp;</div><div class="mdl_c_c">&nbsp;</div></div>',
         ModuleBottomBar : '<div class="mdl_b mt g_p_relative"><div class="mdl_b_l g_p_absolute g_p_left_top g_t_space">&nbsp;</div><div class="mdl_b_r g_p_absolute g_p_rght_top g_t_space">&nbsp;</div><div class="mdl_b_c g_t_space">&nbsp;</div></div>',
         BlankContent    : '<div class="g_p_visible">&nbsp;</div>',
         SimpleModule        : '<div class="mdl g_c_clrbd g_c_clrbg g_h_1" style="background:transparent none;"></div>',
         SimpleModuleContent : '<div>&nbsp;</div>'
    },
    CssControl : {HideElm: 'g_p_none',widCss:'g_css_hom_k',Opacity:/\bmt\b/gi},
    HitWord    : {Loading: '���ݼ�����...'},
    getTMP     : function(){
         var _o = netease.ui.module.Configuration._TEMPLATE;
         if (!_o){
             _o = netease.ui.module.Configuration._TEMPLATE = document.createElement("div");
             _o.className = "mdl_c_c";
             _o.appendChild(document.createTextNode(" "));
         }
         return _o.cloneNode(true);
    }
};
/**
 * ���������ҽṹ��ܶ���ĸ���
 * @constructor
 * @class  �����ҽṹ��ܶ���ĸ���
 */
netease.ui.module.AbstractComponent = function(){
      this._body = this._getTemplate();
};
/** ����/�ӿڶ��� */
netease.ui.module.AbstractComponent.prototype = 
{
      /**
       * ��ܽڵ����
       * @private
       * @type HTMLElement
       */
      _body : null,
      /**
       * ������Ϣ
       * @private
       * @type netease.ui.module.Configuration
       */
      _config : netease.ui.module.Configuration,

      /**
       * ��ȡģ��ڵ����
       * @return HTMLElement
       */
      _getTemplate : function(){
              if (!this.className) return null;
              var _oM = netease.ui.module[this.className];
              if (!_oM._TEMPLATE){
                  var _oDiv = document.createElement("div");
                  _oDiv.innerHTML = this._config.HtmlTemplate[this.className];
        				      _oM._TEMPLATE = _oDiv.childNodes[0];
              }
              return _oM._TEMPLATE.cloneNode(true);
      },
      /**
       * ��ȡ��ܶ���ڵ�
       * @return {HTMLElement}
       */
      getBody : function(){
              return this._body;
      },
      /**
       * ��ȡ���ڵ����
       * @return {HTMLElement}
       */
      getLefter : function(){
              var _oBody = this.getBody();
              return _oBody ? _oBody.getElementsByTagName("div")[0] : null;
      },
      /**
       * ��ȡ�в��ڵ����
       * @return {HTMLElement}
       */
      getCenter : function(){
              var _oBody = this.getBody();
              return _oBody ? _oBody.getElementsByTagName("div")[2] : null;
      },
      /**
       * ��ȡ�Ҳ�ڵ����
       * @return {HTMLElement}
       */
      getRighter : function(){
              var _oBody = this.getBody();
              return _oBody ? _oBody.getElementsByTagName("div")[1] : null;
      },
      /**
       * �������
       * @param  {String|HTMLElement}vElem
       *         Ҫ������ݵ�����ID���������ڵ����
       * @return {Void}
       */
      clear : function(vElem){
              var _oCenter = $(vElem) || this.getCenter();
              _oCenter && (_oCenter.innerHTML=this._config.HtmlTemplate.BlankContent);
      },
      /**
       * ����ģ������
       * @param  {String|HTMLElement}vElem
       *         Ҫ������ݵ�����ID���������ڵ����
       * @return {Void}
       */
      reset : function(vElem){
              var _oBody = this.getBody();
              if (!_oBody) return;
              var _oCenter = $(vElem) || this.getCenter();
              if (_oCenter){
                  _oBody.removeChild(_oCenter);
              }
              _oBody.appendChild(this._config.getTMP());
      },
      /**
       * ��ʾ���
       * @return {Void}
       */
      show : function(){
              var _oBody = this.getBody();
              _oBody && (_oBody.style.display="block");
      },
      /**
       * ���ؿ��
       * @return {Void}
       */
      hide : function(){
              var _oBody = this.getBody();
              _oBody && (_oBody.style.display="none");
      },
      /**
       * ��ܿɼ�
       * @return {Void}
       */
      visible : function(){
              var _oBody = this.getBody();
              _oBody && (_oBody.style.visibility="visible");
      },
      /**
       * ��ܲ��ɼ�,ռ�ռ�
       * @return {Void}
       */
      hidden : function(){
              var _oBody = this.getBody();
              _oBody && (_oBody.style.visibility="hidden");
      },
      /**
       * ������ʽ
       * @param  {String}sStyle
       *         JS��ʽ����
       * @param  {String}sValue
       *         ��ʽֵ
       * @return {Void}
       */
      setStyle : function(sStyle,sValue){
              var _oBody = this.getBody();
              try{
                  _oBody && (_oBody.style[sStyle]=sValue);
              }catch(e){}
      },
      /**
       * ��Ӽ����¼�
       * @param  {String}sType
       *         �¼�����
       * @param  {Function}fnHdl
       *         �¼��������
       * @return {Void}
       */
      addEvent : function(sType,fnHdl){
              var _oBody = this.getBody();
              _oBody.attachEvent && _oBody.attachEvent("on"+sType,fnHdl)
                                 || _oBody.addEventListener(sType,fnHdl,false);
      }
};
/*****************************************************************************************
 *                                ģ�鲿������                                             *
 *****************************************************************************************/

/*****************************************************************************************
 * ����ģ�����������
 * @constructor
 * @class   ���б���������ĸ���
 * @base    netease.ui.module.AbstractComponent
 * @extends netease.ui.module.AbstractComponent
 * @param   {String}sTitle
 *          ��������,sTitleΪnull����"",�������������Ϊ�հ�
 * @param   {String|HTMLElement}vMenu
 *          ģ��������˵�,������ID/html������߽ڵ����
 */
netease.ui.module.TitleBar = function (sTitle,vMenu){
      // ���ø����ʼ������
      netease.ui.module.AbstractComponent.call(this);
      // ��ʼ������������
      this.setTitle(sTitle);
      // ��ʼ���������˵�
      this.setMenu(vMenu);
};extend(netease.ui.module.TitleBar,netease.ui.module.AbstractComponent);
/**
 * ��ȡ�������˵������Ľڵ����
 * @return {HTMLElement}
 *         ���ر������˵������Ľڵ����
 */
netease.ui.module.TitleBar.prototype._getMenuContainer = function(){
      var _bdy = this.getBody();
      if (!_bdy) return;
      return _bdy.getElementsByTagName("div")[3] || null;
};
/**
 * ������������¼���Ӧ
 * @return {Void}
 */
netease.ui.module.TitleBar.prototype._mouseOut = function(){
      var _c = this._getMenuContainer();
      if (!_c) return;
      _c.style.visibility = "hidden";
};
/**
 * ����Ƴ��������¼���Ӧ
 * @return {Void}
 */
netease.ui.module.TitleBar.prototype._mouseOver = function(){
      var _c = this._getMenuContainer();
      if (!_c) return;
      _c.style.visibility = "visible";
};
/**
 * ��ȡģ�����
 * @return  {String}
 *          ģ�����
 */
netease.ui.module.TitleBar.prototype.getTitle = function(){
      return this._title || "";
};
/**
 * ���ñ�������
 * @param  {String}sTitle
 *         ��������,sTitleΪnull����""���������ݾ�Ϊ��
 * @return {Void}
 */
netease.ui.module.TitleBar.prototype.setTitle = function(sTitle){
      var _oCenter = this.getCenter();
      if (!_oCenter) return;      
      this._title = (sTitle && typeof sTitle == "string") ? sTitle : "&nbsp;";
      _oCenter.innerHTML = '<p class="g_w_80 g_t_hide">'+this._title+'</p>'; 
};
/**
 * ���ñ������˵�
 * @param  {String|HTMLElement}vMenu
 *         ģ��������˵�,������ID/html������߽ڵ����
 * @return {Void}
 */
netease.ui.module.TitleBar.prototype.setMenu = function(vMenu){
      if (!vMenu) return;
      var _o = $(vMenu);
      var _c = this._getMenuContainer();
      this.clear(_c);
      // html/node
      if (typeof vMenu == "string" && !_o){
          this._menu = _c.innerHTML = vMenu;
      }else{
          _c.appendChild(_o);
          this._menu = _c.innerHTML;
      }
};
/*****************************************************************************************
 * ����ģ��˵�������
 * @constructor
 * @class   ���в˵�������ĸ���
 * @base    netease.ui.module.AbstractComponent
 * @extends netease.ui.module.AbstractComponent
 * @param   {String|HTMLElement}vMenu
 *          �˵����ݽڵ�������HTML����
 * @see     netease.ui.module.Menu 
 */
netease.ui.module.MenuBar = function(vMenu){
      // ���ø����ʼ������
      netease.ui.module.AbstractComponent.call(this);
      // ��ʼ���˵�������
      this.setDOMMenu(vMenu);
};extend(netease.ui.module.MenuBar,netease.ui.module.AbstractComponent);
/**
 * ��ȡģ��˵�
 * @return {String}
 *          ģ��˵�html����
 */
netease.ui.module.MenuBar.prototype.getMenu = function(){
      return this._menu || "";
};
/**
 * ���ò˵��ڵ�������html����
 * @param  {String|HTMLElement}vMenu
 *         �˵����ݽڵ�������HTML����
 * @return {Void}
 */
netease.ui.module.MenuBar.prototype.setDOMMenu = function(vMenu){
      var _oCenter = this.getCenter();
      if (!_oCenter) return;
      this.clear(_oCenter);
      // ���ÿղ˵���
      if (!vMenu){
          this.hide();
          this._menu = "";
          return;
      }
      // ���ò˵�������
      var _vMn = $(vMenu);
      if (_vMn || (typeof vMenu!="string")){
          _oCenter.appendChild(_vMn);
      }else{
          _oCenter.innerHTML = vMenu;
      }
      this._menu = _oCenter.innerHTML;
      this.show();
};
/**
 * ��Ӳ˵��ڵ�������html����
 * @param  {String|HTMLElement}vMenu
 *         �˵����ݽڵ�������HTML����
 * @return {Void}
 */
netease.ui.module.MenuBar.prototype.addDOMMenu = function(vMenu){
      var _oCenter = this.getCenter();
      if (!vMenu || !_oCenter) return;
      var _oMn = $(vMenu);
      if (_oMn || (typeof vMenu!="string")){
          _oCenter.appendChild(_oMn);
      }else{
          var _oD = document.createElement("div");
          _oD.innerHTML = vMenu;
          _oCenter.appendChild(_oD.childNodes[0]);
      }
      this._menu = _oCenter.innerHTML;
      this.show();
};
/*****************************************************************************************
 * ����ģ������������
 * @constructor
 * @class   ����������
 * @base    netease.ui.module.AbstractComponent
 * @extends netease.ui.module.AbstractComponent
 * @param   {String|HTMLElement}vContent
 *          ���ݵ�ID/HTML������߽ڵ����
 */
netease.ui.module.Content = function(vContent){
      // ���ø����ʼ������
      netease.ui.module.AbstractComponent.call(this);
      // ��ʼ���˵�������
      this.setContent(vContent);
};extend(netease.ui.module.Content,netease.ui.module.AbstractComponent);
/**
 * ��ȡģ������������
 * @return  {String}
 *          ģ������������
 */
netease.ui.module.Content.prototype.getContent = function(){
      return this._content || "";
};
/**
 * ����ģ������
 * @param  {String|HTMLElement}vContent
 *         ���ݵ�ID/HTML������߽ڵ����
 * @return {Void}
 */
netease.ui.module.Content.prototype.setContent = function(vContent){
      var _oCenter = this.getCenter();
      if (!_oCenter) return;
      this.clear(_oCenter);
      // ��������Ϊ��
      if (!vContent){
          this._content = _oCenter.innerHTML = this._config.HitWord.Loading;
          return;
      }
      // ����ģ������
      var _oCnt = $(vContent);
      if (_oCnt || (typeof vContent!="string")){
          _oCenter.appendChild(_oCnt);
      }else{
          _oCenter.innerHTML = vContent;
      }
      this._content = _oCenter.innerHTML;
};
/**
 * ȡģ���������ĺ�ģ��
 * @return  {Object}
 *          ģ���������ĺ�ģ����:
 *          {
 *              width : 700,
 *              height: 600
 *          }
 */
netease.ui.module.Content.prototype.getBox = function(){
      var _rt = {width:0,height:0};
      var _oC = this.getCenter();
      if (_oC){
          _rt.width  = parseInt(_oC.offsetWidth*0.9);
          _rt.height = parseInt(_oC.offsetHeight);
      }
      return _rt;
};
/*****************************************************************************************
 * ����ģ��ĵ�������
 * @constructor
 * @class   ��������
 * @base    netease.ui.module.AbstractComponent
 * @extends netease.ui.module.AbstractComponent
 * @param   {String}vBottom
 *          �������ݣ�vBottomΪnull��ʾ����ʾ������vBottomΪ""��ʾ��ʾ������û������.
 */
netease.ui.module.BottomBar = function(vBottom){
      // ���ø����ʼ������
      netease.ui.module.AbstractComponent.call(this);
      // ��ʼ����������
      this.setBottom(vBottom);
};extend(netease.ui.module.BottomBar,netease.ui.module.AbstractComponent);
/**
 * ��ȡ��������
 * @return  {String}
 *          ��������
 */
netease.ui.module.BottomBar.prototype.getBottom = function(){
      return this._bottom || "";
};
/**
 * ���õ�������
 * @param   {String}vBottom
 *          �������ݣ�vBottomΪ""��ʾ��ʾ������û������.
 * @return  {Void}
 */
netease.ui.module.BottomBar.prototype.setBottom = function(vBottom){
      var _oCenter = this.getCenter();
      if (!_oCenter) return;
      this._bottom = (vBottom && typeof vBottom == "string") ? vBottom : "&nbsp;";
      _oCenter.innerHTML = this._bottom;
};
/*****************************************************************************************
 *                                ģ�鲿��                                                *
 *****************************************************************************************/
/**
 * ģ�����������
 * @constructor
 * @class   ģ�����������
 * @base    netease.ui.module.Title
 * @extends netease.ui.module.Title
 * @param   {String}sTitle
 *          ģ���������,sTitleΪnull����""���������ݾ�Ϊ��
 * @param   {String|HTMLElement}vMenu
 *          ģ��������˵�,������ID/html������߽ڵ����
 */
netease.ui.module.ModuleTitleBar = function (sTitle,vMenu){
      netease.ui.module.TitleBar.call(this,sTitle,vMenu);
};extend(netease.ui.module.ModuleTitleBar,netease.ui.module.TitleBar,"ModuleTitleBar");
/**
 * ����ģ��˵�����
 * @constructor
 * @class   ���в˵�����ĸ���
 * @base    netease.ui.module.AbstractComponent
 * @extends netease.ui.module.AbstractComponent
 * @param   {String|HTMLElement}vMenu
 *          �˵����ݵ�ID/HTML������߽ڵ����,vMenuΪ""�����ز˵���
 * @see     netease.ui.module.Menu 
 */
netease.ui.module.ModuleMenuBar = function(vMenu){
      netease.ui.module.MenuBar.call(this,vMenu);
};extend(netease.ui.module.ModuleMenuBar,netease.ui.module.MenuBar,"ModuleMenuBar");
/**
 * ģ�������������
 * @constructor
 * @class   ģ�������������
 * @base    netease.ui.module.AbstractComponent
 * @extends netease.ui.module.AbstractComponent
 * @param   {String|HTMLElement}vContent
 *          ���ݵ�ID/HTML������߽ڵ����
 */
netease.ui.module.ModuleContent = function (vContent){
      netease.ui.module.Content.call(this,vContent);
};extend(netease.ui.module.ModuleContent,netease.ui.module.Content,"ModuleContent");
/**
 * ģ��ĵ�������
 * @constructor
 * @class   ģ��ĵ�������
 * @base    netease.ui.module.AbstractComponent
 * @extends netease.ui.module.AbstractComponent
 * @param   {String}vBottom
 *          �������ݣ�vBottomΪnull��ʾ����ʾ������vBottomΪ""��ʾ��ʾ������û������.
 */
netease.ui.module.ModuleBottomBar = function (vBottomBar){
      netease.ui.module.BottomBar.call(this,vBottomBar);
};extend(netease.ui.module.ModuleBottomBar,netease.ui.module.BottomBar,"ModuleBottomBar");
/**
 * ����ģ�������������
 * @constructor
 * @class   ����ģ�������������
 * @base    netease.ui.module.Content
 * @extends netease.ui.module.Content
 * @param   {String|HTMLElement}vContent
 *          ���ݵ�ID/HTML������߽ڵ����
 */
netease.ui.module.SimpleModuleContent = function (vContent){
      netease.ui.module.Content.call(this,vContent);
};extend(netease.ui.module.SimpleModuleContent,netease.ui.module.Content,"SimpleModuleContent");
/**
 * ��дȡģ���м�ڵ�Ľӿ�
 * @return {HTMLElement}
 *         ����ģ���м�ڵ����
 */
netease.ui.module.SimpleModuleContent.prototype.getCenter = function(){
      return this.getBody();
};
/**
 * ����ģ�����
 * @class ����ģ��ĸ���
 * @constructor
 * @param  {String|netease.ui.module.TitleBar}vTitleBar
 *         ģ����⣬����ʹ�ַ���,Ҳ������{@link netease.ui.module.TitleBar}����;
 *         vTitleΪnull����""�����Ĭ�Ͽհױ���.
 * @param  {String|HTMLElement|netease.ui.module.MenuBar}vTMenuBar
 *         ģ���ϲ˵�,������ID/HTML������߽ڵ����,Ҳ������{@link netease.ui.module.MenuBar}����;
 *         vTMenuBarΪnull��ʾû�в˵���
 *         vTMenuBarΪ""��ʾ���ɲ˵����������ز˵���
 * @param  {String|HTMLElement|netease.ui.module.Content}vContent
 *         ģ�����ݣ�����ʹhtml����Ҳ�����ǽڵ����;
 *         vContentΪnull����""�����Ĭ������"���ݼ�����...".
 * @param  {String|HTMLElement|netease.ui.module.MenuBar}vBMenuBar
 *         ģ���²˵�,������ID/HTML������߽ڵ����Ҳ������{@link netease.ui.module.MenuBar}����;
 *         vBMenuBarΪnull��ʾû�в˵���
 *         vBMenuBarΪ""��ʾ���ɲ˵����������ز˵���
 * @param  {String|netease.ui.module.BottomBar}vBottomBar
 *         ģ��������������ַ���Ҳ������{@link netease.ui.module.BottomBar}����;
 *         vBottomΪnull��ʾ����ʾ����;
 *         vBottomΪ""��ʾ��ʾ������û������.
 * @param  {Object}_Options
 *         Optional,������ѡ���ò���,�����б�
 *         -- parent  : ģ����õ�����ID���߶���
 *         -- id      : ģ��ID
 *         -- menu    : �������˵�
 *         -- view    : ģ����ͼ,0-խ��[Ĭ��],1-����
 *         -- opacity : ģ���Ƿ���͸��,true-��ʹ�ð�͸��[Ĭ��],false-ʹ�ð�͸��
 *         -- eidt    : ģ���Ƿ�༭ģʽ,true-�༭ģʽ,false-Ԥ��ģʽ[Ĭ��]
 */
netease.ui.module.AbstractModule = function (vTitleBar,vTMenuBar,vContent,vBMenuBar,vBottomBar,_Options){
      this._body      = this._makeBody((_Options && _Options.id) || null);
      this._menubar_t = this._makeMenuBar(vTMenuBar);
      this._content   = this._makeContent(vContent);
      this._menubar_b = this._makeMenuBar(vBMenuBar);
      this._bottombar = this._makeBottomBar(vBottomBar);
      var _tm = null;
      if (_Options){
          _tm = _Options.menu;
          this._container = $(_Options.parent);
          this._view_mode = _Options.view || 0;
          if (_Options.opacity){
              this._clearOpacity();
          }
      }
      this._titlebar  = this._makeTitleBar(vTitleBar,_tm);
      this._builde();
};
/*���Խӿڶ���*/
netease.ui.module.AbstractModule.prototype = 
{
      /**
       * ģ���ID
       * @private
       * @type String
       */
      _id : "",
      /**
       * �������
       * @private
       * @type netease.ui.module.TitleBar
       */
      _titlebar  : null,
      /**
       * �ϲ˵�����
       * @private
       * @type netease.ui.module.MenuBar
       */
      _menubar_t : null,
      /**
       * ���ݶ���
       * @private
       * @type netease.ui.module.Content
       */
      _content   : null,
      /**
       * �²˵�����
       * @private
       * @type netease.ui.module.MenuBar
       */
      _menubar_b : null,
      /**
       * ��������
       * @private
       * @type netease.ui.module.BottomBar
       */
      _bottombar : null,
      /**
       * ģ��������������
       * @private
       * @type HTMLElement
       */
      _container : null,
      /**
       * ģ�����ڵ�ʵ��
       * @private
       * @type HTMLElement
       */
      _body : null,
      /**
       * �Ƿ��Ѿ�������ģ��
       * @private
       * @type Boolean
       */
      _builded : false,
      /**
       * ҳ��������Ϣ
       * @private
       * @type netease.ui.module.Configuration
       */
      _config : netease.ui.module.Configuration,
      /**
       * ��ͼģʽ,0-խ��[Ĭ��],1-����
       * @private
       * @type Number
       */
      _view_mode : 0,
      
      // Abstract Function
      _genId                  : function(){},                       // Need Inherited
      _addToCollectionection  : function(sKey,oMd){},               // Need Inherited
      _makeTitleBar           : function(vTitleBar,vTitleMenu){},   // Need Inherited
      _makeMenuBar            : function(vMenuBar){},               // Need Inherited
      _makeContent            : function(vContent){},               // Need Inherited
      _makeBottomBar          : function(vBottom){},                // Need Inherited
      /**
       * ����ģ��������
       * @private
       * @param  {String}sId
       *         Optional��ģ��ID
       * @return {HTMLElement}
       *         ����ģ�������ܶ���
       */
      _makeBody : function (sId){
              if (!this.className) return null;
              var _oM = netease.ui.module[this.className];
              if (!_oM._TEMPLATE){
                  var _oDiv = document.createElement("div");
                  _oDiv.innerHTML = this._config.HtmlTemplate[this.className];
                  _oM._TEMPLATE = _oDiv.childNodes[0];
              }
              var _oR = _oM._TEMPLATE.cloneNode(true);
              _oR.id = this._id = sId || this._genId();
              return _oR;
      },
      /**
       * ����ģ�����
       * @private
       * @return {HTMLElement}
       *         ���ع����õ�ģ�����
       */
      _builde : function(){
              var _oBody = this.getBody();
              if (!_oBody || this._builded) return;
              // ����
              _oBody.appendChild(this._titlebar.getBody());
              this._menubar_t && _oBody.appendChild(this._menubar_t.getBody()); 
              _oBody.appendChild(this._content.getBody());
              this._menubar_b && _oBody.appendChild(this._menubar_b.getBody()); 
              this._bottombar && _oBody.appendChild(this._bottombar.getBody());
              this._container && this._container.appendChild(_oBody);
              this._builded = true;
              // ����
              this._addToCollection(this.getId(),this);
      },
      /**
       * �����͸��Ч��
       * @return {Void}
       */
      _clearOpacity : function(){
              var _a = [
                  this,this.getTitleBar(),
                  this.getMenuBar(0),this.getMenuBar(1),
                  this.getContent(),this.getBottomBar()
              ];
              for(var i=_a.length-1,_o,_b;i>=0;i--){
                  _o = _a[i];if (!_o) continue;
                  _b = _o.getBody();
                  _b.className = _b.className.replace(this._config.CssControl.Opacity,"");
              }
      },
      /**
       * ��ȡģ���ID
       * @return {String}
       *         ģ���ID
       */
      getId : function(){
              return this._id; 
      },
      /**
       * ��ȡ����������
       * @return {netease.ui.module.TitleBar}
       *         ����������
       */
      getTitleBar : function(){
              return this._titlebar;
      },
      /**
       * ��ȡ�˵�������
       * @param  {Number}iPos
       *         �˵�λ�ã�0����1,0-�ϲ˵�/1-�²˵�
       *         ��������˲������߲����Ƿ��򷵻��ϲ˵�
       * @return {netease.ui.module.MenuBar}
       */
      getMenuBar : function(iPos){
              return iPos==1 ? this._menubar_b : this._menubar_t;
      },
      /**
       * ��ȡģ������������
       * @return {netease.ui.module.Content}
       *         ģ������������
       */
      getContent : function(){
              return this._content;
      },     
      /**
       * ��ȡ��������
       * @return {netease.ui.module.BottomBar}
       *         ��������
       */
      getBottomBar : function(){
              return this._bottombar;
      },     
      /**
       * ��ȡģ�����ڵ�ʵ��
       * @return {HTMLElement}
       *         ģ�����ڵ�ʵ��
       */
      getBody : function(){
              return this._body;
      },
      /**
       * ��ȡģ�����ͼģʽ
       * @return {Number}
       *         ����ģ�����ͼģʽ,0-խ��,1-����
       */
      getView : function(){
              return this._view_mode;
      },
      /**
       * ȡ��������
       * @return {HTMLElement}
       *         ������������
       */
      getParent : function(){
              var _bdy = this.getBody();
              if (!_bdy) return;
              this._container = _bdy.parentNode;
              return this._container;
      },
      /**
       * ��ģ��׷�Ӽӵ����������
       * @param  {String|HTMLElement}vContainer
       *         ������ID���������Ľڵ����
       * @return {Void}
       */
      appendTo : function(vContainer){
              if (!this._builded){
                  this._builde();
              }
              var _oContainer = $(vContainer);
              if (_oContainer){
                  _oContainer.appendChild(this.getBody());
                  this._container = _oContainer;
              }
      },
      /**
       * ��ʾģ��
       * @return {Void}
       */
      show : function(){
              var _oBody = this.getBody();
              _oBody && (_oBody.style.display="block");
      },
      /**
       * ����ģ��
       * @return {Void}
       */
      hide : function(){
              var _oBody = this.getBody();
              _oBody && (_oBody.style.display="none");
      },
      /**
       * �л�ģ����ʾ״̬
       * @return {Void}
       */
      toggle : function(){
              var _bdy = this.getBody();
              var _dS = _bdy.style;
              _dS.display = _dS.display=="none" ? "block" : "none";
      }
};
/*****************************************************************************************
 *                                    ģ��                                                *
 *****************************************************************************************/
/**
 * ģ�����
 * @class ģ�����
 * @constructor
 * @base    netease.ui.module.AbstractModule
 * @extends netease.ui.module.AbstractModule
 * @param  {String|netease.ui.module.TitleBar}vTitleBar
 *         ģ����⣬����ʹ�ַ���,Ҳ������{@link netease.ui.module.TitleBar}����;
 *         vTitleΪnull����""�����Ĭ�Ͽհױ���.
 * @param  {String|HTMLElement|netease.ui.module.MenuBar}vTMenuBar
 *         ģ���ϲ˵�,������ID/HTML������߽ڵ����,Ҳ������{@link netease.ui.module.MenuBar}����;
 *         vTMenuBarΪnull��ʾû�в˵���
 *         vTMenuBarΪ""��ʾ���ɲ˵����������ز˵���
 * @param  {String|HTMLElement|netease.ui.module.Content}vContent
 *         ģ�����ݣ�����ʹhtml����Ҳ�����ǽڵ����;
 *         vContentΪnull����""�����Ĭ������"���ݼ�����...".
 * @param  {String|HTMLElement|netease.ui.module.MenuBar}vBMenuBar
 *         ģ���²˵�,������ID/HTML������߽ڵ����Ҳ������{@link netease.ui.module.MenuBar}����;
 *         vBMenuBarΪnull��ʾû�в˵���
 *         vBMenuBarΪ""��ʾ���ɲ˵����������ز˵���
 * @param  {String|netease.ui.module.BottomBar}vBottomBar
 *         ģ��������������ַ���Ҳ������{@link netease.ui.module.BottomBar}����;
 *         vBottomΪnull��ʾ����ʾ����;
 *         vBottomΪ""��ʾ��ʾ������û������.
 * @param  {Object}_Options
 *         Optional,������ѡ���ò���,�����б�
 *         -- parent  : ģ����õ�����ID���߶���
 *         -- id      : ģ��ID
 *         -- menu    : �������˵�
 *         -- view    : ģ����ͼ,0-խ��[Ĭ��],1-����
 *         -- opacity : ģ���Ƿ���͸��,true-��ʹ�ð�͸��[Ĭ��],false-ʹ�ð�͸��
 *         -- eidt    : ģ���Ƿ�༭ģʽ,true-�༭ģʽ,false-Ԥ��ģʽ[Ĭ��]
 */
netease.ui.module.Module  = function(vTitleBar,vTMenuBar,vContent,vBMenuBar,vBottomBar,_Options){
      netease.ui.module.AbstractModule.call(this,vTitleBar,vTMenuBar,vContent,vBMenuBar,vBottomBar,_Options);
};extend(netease.ui.module.Module,netease.ui.module.AbstractModule,"Module");
/**
 * ģ�����,��ֹģ��ID�ظ�
 * @private
 * @type Number
 */
netease.ui.module.Module._COUNT = -1;
/**
 * �������ɵ�ģ��ļ���
 * @private
 * @type Object
 */
netease.ui.module.Module._COLLECTION = {};
/**
 * ����ID��ȡģ�����
 * @param  {String}sId
 *         ģ��ID
 * @return {netease.ui.module.Module}
 *         ����ģ�����
 */
netease.ui.module.Module.getModuleById = function(sId){
      return netease.ui.module.Module._COLLECTION[sId];
};
/**
 * ����ģ��IDɾ��ģ��
 * @param  {String}sId
 *         Ҫɾ����ģ���ID
 * @return {Void}
 */
netease.ui.module.Module.deleteModule = function(sId){
      if (!sId) return;
      delete netease.ui.module.Module._COLLECTION[sId];
};
/**
 * ��ҳģ��Ĵ�С�����仯ʱ
 * @param  {String}sMid
 *         ģ��ID
 * @return {Void}
 */
netease.ui.module.Module.resized = function(sMid,toView){
      var _oM = netease.ui.module.Module.getModuleById(sMid);
      if (!_oM) return;
      _oM.switchView($(sMid+"_cCont"),toView);
};
/**
 * ��ҳģ�����ݼ�����ɺ��ʼ��ģ��
 * ����[��ʼ����խ��ʽ]/���²˵�[��ʼ��λ��]
 * @param  {String}sMid
 *         ģ��ID,���ʼ������ID��������:
 *         sKey+"_uMenu" - �ϲ˵�
 *         sKey+"_cCont" - �ڡ���
 *         sKey+"_dMenu" - �²˵�
 * @return {Void}
 */
netease.ui.module.Module.loaded = function(sMid){
      var _oM = netease.ui.module.Module.getModuleById(sMid);
      if (!_oM) return;
      var _tM = _oM.getTitleBar();
      _tM && _tM.setMenu($(sMid+"_tMenu"));
      var _uM = _oM.getMenuBar();
      _uM && _uM.setDOMMenu($(sMid+"_uMenu"));
      _oM.switchView();
      var _dM = _oM.getMenuBar(1);
      _dM && _dM.setDOMMenu($(sMid+"_dMenu"));
};
/**
 * ��IDΪsId��ģ��ע�ᴦ��ӿ�
 * @param  {String}sMid
 *         ģ��ID
 * @param  {String}sType
 *         �ӿ�����,�ѽӿ�����
 *         switch - ��ͼ[����/խ��]�л�ʱ����Ľӿ�
 * @param  {Fucntion}fnHandler
 *         ����ӿ�
 * @return {Void}
 */
netease.ui.module.Module.register = function(sMid,sType,fnHandler){
      var _oM = netease.ui.module.Module.getModuleById(sMid);
      if (!_oM) return;
      _oM.register(sType,fnHandler);
}
/**
 * ����ģ���ID
 * @private
 * @return {String}
 *         ģ���ID
 */
netease.ui.module.Module.prototype._genId = function (){
      var _c = netease.ui.module.Module._COUNT++;
      return "netease-auto-id-module-"+_c;
};
/**
 * ��¼���ɵ�ģ��
 * @private
 * @param  {String}sKey
 *         ģ��ID
 * @param  {netease.ui.module.AbstractModule}oMd
 *         ģ�����
 * @return {Void}
 */
netease.ui.module.Module.prototype._addToCollection = function (sKey,oMd){
      netease.ui.module.Module._COLLECTION[sKey] = oMd;
};
/**
 * ע�ᴦ��ӿ�
 * @param  {String}sType
 *         �ӿ�����,�ѽӿ�����
 *         switch - ��ͼ[����/խ��]�л�ʱ����Ľӿ�
 * @param  {Fucntion}fnHandler
 *         ����ӿ�
 * @return {Void}
 */
netease.ui.module.Module.prototype.register = function(sType,fnHandler){
      this["_"+sType+"_handler"] = fnHandler;
};
/**
 * ����ģ��������
 * @private
 * @param  {String|netease.ui.module.TitleBar}vTitleBar
 *         ģ����������߱�������<br/>
 *         vTitleΪnull����""���������ʾ����Ϊ��
 * @param  {String|HTMLElement}vTitleMenu
 *         �������˵�,������ID/html������߽ڵ����
 * @return {netease.ui.module.TitleBar}
 *         ����ģ��������
 * @see    netease.ui.module.ModuleTitleBar
 */
netease.ui.module.Module.prototype._makeTitleBar = function (vTitleBar,vTitleMenu){
      if (vTitleBar instanceof netease.ui.module.ModuleTitleBar){
          return vTitleBar;
      }
      return new netease.ui.module.ModuleTitleBar(vTitleBar,vTitleMenu);
};
/**
 * ����ģ��˵�����
 * @private
 * @param  {String|HTMLElement|netease.ui.module.MenuBar}vMenuBar
 *         ģ���²˵�,������ID/HTML������߽ڵ����,Ҳ������{@link netease.ui.module.MenuBar}����
 *         vBMenuBarΪnull��ʾû�в˵���
 *         vBMenuBarΪ""��ʾ���ɲ˵����������ز˵���
 * @return {netease.ui.module.MenuBar}
 *         ����ģ��˵�������
 * @see    netease.ui.module.ModuleMenuBar
 */
netease.ui.module.Module.prototype._makeMenuBar = function (vMenuBar){
      if (!vMenuBar && vMenuBar!=""){
          return null;
      }
      if (vMenuBar instanceof netease.ui.module.ModuleMenuBar){
          return vMenuBar;
      }
      return new netease.ui.module.ModuleMenuBar(vMenuBar);
};
/**
 * ����ģ�����ݶ���
 * @private
 * @param  {String|HTMLElement|netease.ui.module.Content}vContent
 *         ģ�����ݣ�������html���룬dom�ڵ㣬Ҳ������{@link netease.ui.module.Content}����<br/>
 *         vContentΪnull����""����ʾ"���ݼ�����..."
 * @return {netease.ui.module.ModuleContent}
 *         ģ�����ݶ���
 * @see    netease.ui.module.ModuleContent
 */
netease.ui.module.Module.prototype._makeContent = function (vContent){
      if (vContent instanceof netease.ui.module.ModuleContent){
          return vContent;
      }
      return new netease.ui.module.ModuleContent(vContent);
};
/**
 * ����ģ���������
 * @private
 * @param  {String|netease.ui.module.BottomBar}vBottomBar
 *         ��������/��������<br/>
 *         vBottomΪnull������ʾ����<br/>
 *         vBottomΪ""������ʾ����,��������Ϊ��
 * @return {netease.ui.module.Bottom} 
 *         ģ���������
 * @see    netease.ui.module.ModuleBottom
 */
netease.ui.module.Module.prototype._makeBottomBar = function (vBottomBar){
      if (!vBottomBar && vBottomBar!=""){
          return null;
      }
      if (vBottomBar instanceof netease.ui.module.ModuleBottomBar){
          return vBottomBar;
      }
      return new netease.ui.module.ModuleBottomBar(vBottomBar);
};
/**
 * ��ҳģ����ݿ�խ�л���ͼ
 * @param  {String|HTMLElement}vId
 *         ģʽ���õĶ����ID
 * @param  {Number}toView
 *         Optional,Ҫ�л�������ͼģʽ��
 *         0-խ��ģʽ[Ĭ��]��1-����ģʽ
 * @return {Void}
 */
netease.ui.module.Module.prototype.switchView = function(toView){
      var _sId = this.getId() + "_cCont";
      // ȡ����
      var _o = $(_sId) || this.getContent();
      if (!_o) return;
      // ����ģʽ��־λ
      var _tV = toView==null ? this.getView() : toView;
      var _c = this._config.CssControl;
      var _s = _c.widCss;
      if (_tV==1 && _o.className.indexOf(_s)<0){
          _o.className += " "+_s; // ��
      }else if (_tV==0 && _o.className.indexOf(_s)>=0){
          _o.className = _o.className.replace(_s,"");// խ
      }
      // ��������������
      if (this._resize_handler){
          this._resize_handler(this.getId());
      }
};
/**
 * ��ģ����뵽vElm�ڵ�֮ǰ
 * @param  {String|HTMLElement}vElm
 *         �ο��ڵ����
 * @return {Void}
 */
netease.ui.module.Module.prototype.insertBefore = function(vElm){
      var _oElm = $(vElm);
      if (!_oElm) return;
      var _oBdy = this.getBody();
      if (!_oBdy) return;
      var _oPrt = _oElm.parentNode;
      if (!_oPrt) return;
      _oPrt.insertBefore(_oBdy,_oElm);
}
/*****************************************************************************************
 *                                  ����ģ��    ��                                         *
 *****************************************************************************************/
/**
 * ����ģ�����,û�в˵���,û�е���,ģ��������û�з��
 * @class ����ģ�����
 * @constructor
 * @base    netease.ui.module.Module
 * @extends netease.ui.module.Module
 * @param  {String|netease.ui.module.TitleBar}vTitleBar
 *         ģ����⣬����ʹ�ַ���,Ҳ������{@link netease.ui.module.TitleBar}����;
 *         vTitleΪnull����""�����Ĭ�Ͽհױ���.
 * @param  {String|HTMLElement}vTitleMenu
 *         ģ���ϲ˵�,������ID/HTML������߽ڵ����;
 *         vTitleMenuΪnull����""��ʾû�б���˵�
 * @param  {String|HTMLElement|netease.ui.module.Content}vContent
 *         ģ�����ݣ�����ʹhtml����Ҳ�����ǽڵ����;
 *         vContentΪnull����""�����Ĭ������"���ݼ�����...".
 * @param  {Object}_Options
 *         Optional,������ѡ���ò���,�����б�
 *         -- parent  : ģ����õ�����ID���߶���
 *         -- id      : ģ��ID
 *         -- menu    : �������˵�
 *         -- view    : ģ����ͼ,0-խ��[Ĭ��],1-����
 *         -- opacity : ģ���Ƿ���͸��,true-��ʹ�ð�͸��[Ĭ��],false-ʹ�ð�͸��
 *         -- eidt    : ģ���Ƿ�༭ģʽ,true-�༭ģʽ,false-Ԥ��ģʽ[Ĭ��]
 */
netease.ui.module.SimpleModule  = function(vTitleBar,vTitleMenu,vContent,_Options){
      this._builded = false;
      _Options["menu"] = vTitleMenu;
      netease.ui.module.Module.call(this,vTitleBar,"",vContent,null,null,_Options);
      this._init(_Options&&_Options.eidt);
};extend(netease.ui.module.SimpleModule,netease.ui.module.Module,"SimpleModule");
/**
 * ��ʼ��ģ��
 * @param  {Boolean}isEdit
 *         �Ƿ�༭ģʽ,Ԥ��ģʽ��û�б�����
 * @return {Void}
 */
netease.ui.module.SimpleModule.prototype._init = function(isEdit){
      var _bdy = this.getBody();
      var _tb  = this._titlebar;
      if (!_bdy || !_tb) return;
      isEdit || _tb.hide();
};
/**
 * ��������¼���Ӧ
 * @return {Void}
 */
netease.ui.module.SimpleModule.prototype._mouseOver = function(){
      var _tb = this._titlebar;
      if (!_tb) return;
      _tb.show();
};
/**
 * ����Ƴ��¼���Ӧ
 * @return {Void}
 */
netease.ui.module.SimpleModule.prototype._mouseOut = function(){
      var _tb = this._titlebar;
      if (!_tb) return;
      _tb.hide();
};
/**
 * ����ģ�����ݶ���
 * @private
 * @param  {String|HTMLElement|netease.ui.module.SimpleModuleContent}vContent
 *         ģ�����ݣ�������html���룬dom�ڵ㣬Ҳ������{@link netease.ui.module.SimpleModuleContent}����<br/>
 *         vContentΪnull����""����ʾ"���ݼ�����..."
 * @return {netease.ui.module.SimpleModuleContent}
 *         ģ�����ݶ���
 * @see    netease.ui.module.SimpleModuleContent
 */
netease.ui.module.SimpleModule.prototype._makeContent = function (vContent){
      if (vContent instanceof netease.ui.module.SimpleModuleContent){
          return vContent;
      }
      return new netease.ui.module.SimpleModuleContent(vContent);
};

 

/**************************************************************
*				163 blog JS Common Control					  *
*                                                             *
* Written by:  wangchen                                       *
* Important: to use this script don't                         *
*            remove these comments                            *
* Version 1.0 (MSIE 6.0 above,Firefox1.0,Netscape.)           *
* Created Date: 2006-10-9									  *
* Copyright��1997-2006 NetEase.com Inc. All rights reserved.  *
**************************************************************/

/** 
 * @fileoverview 
 *  ���ļ���Ҫ���幹��Barrier���� ҳ�濪����Ա���������øö���
 *  ��ҳ�淶Χ�ڶ��û�������Ϊ���е��� ���ϵͳ�Ľ�׳��
 *
 * @author  wangchen (wangchen@corp.netease.com)
 * @version 1.0 
 * @requires  prototype.js
 */
 
if (NECtrl==undefined){
	var NECtrl={};
}

/**
 * Barrier Class
 *
 * @class �����û�������Ϊ
 */

NECtrl.Barrier = Class.create();
/********************Public Interface*********************************/ 
NECtrl.Barrier.prototype.initialize 	= fBarInitialize;			// Barrier �๹�캯�� ��ʼ��Barrier����Ԥ�������
NECtrl.Barrier.prototype.regReq 		= fBarRegisterReq;		    // ע���û�������
NECtrl.Barrier.prototype.callReq 		= fBarCallRegistedReq;		// �����Ѿ�ע����û�����
NECtrl.Barrier.prototype.mkParam 		= fBarMakeParam;			// ����callReqʱ��ʹ�õ�Param����ĸ�������
NECtrl.Barrier.prototype.reset 		= fBarStatusReset;			// ���ö���״̬,���������󷵻��쳣�����,�����޷����õ��ڲ��ص�,���ø÷��������ڲ�״̬

/********************Private Interface********************************/
NECtrl.Barrier.prototype._fInCbk 		= _fBarInternalCallback;			// Barrier���ڲ�ʹ�õĻص����� �������û��Զ���ص�����

/********************Public Interface Implement**********************/
/**
* Barrier�๹�캯��
* @param 	{void}
* @return 	{void}
*/
function fBarInitialize(){	
	/**
	 * ���ڼ�¼������������״̬
	 * @private
	 * @type Map
	 */
	this._mModuleObserve = [];
	/**
	 * ����ӳ�������������Ĺ�ϵ
	 * @private
	 * @type Map
	 */
	this._mReq2Module = [];
}


/**
* ���û�����������Ӧ�ķ������ע��
* @parma {string} sReqName 	���������,
* 							�û������Ը��ݸ����ַ�����������
* @param {string} sModuleName	�������� 
* 							����ͬһ��������Barrier��������е���Э��
* @param {function} fReqMethod	�������� Barrier������������ʱ���ø����󷽷�
* @return {void}
*/
function fBarRegisterReq(sReqName, sModuleName, fReqMethod){
	// ��ʼע��ģ���״̬��Ϣ
	this._mModuleObserve['' + sModuleName] = { bHasReq: false};
	// ע��ά��������ģ��������뷽��ֱ�ӵ�ӳ���ϵ
	this._mReq2Module['' + sReqName] = { sModuleName: sModuleName, fReq: fReqMethod};
}


/**
* �����������������Ƿ������Ӧ�����󷽷�
* @parma {string} sReqName 	���������
* @param {object} oReqParam �����������, ���Ը���mkParam������������ö���
* @return {void}
*/
function fBarCallRegistedReq(sReqName, oReqParam){
	// ��ȡ����������Ӧ��ģ��
	var _oModuleObj = this._mReq2Module['' + sReqName];
	if (!_oModuleObj) 
		return;
		
	// ���ģ�������״̬�Ƿ�����
	var	_oModuleState = this._mModuleObserve['' + _oModuleObj.sModuleName];
	if (!_oModuleState)
		return;
	
	if (_oModuleState.bHasReq){
		// ��ģ�����Ѿ����������ڴ���
		// Barrier������ֹ��������
		oReqParam.fCancelMethod(oReqParam.oCancelParam);
		return;
	}
	
	// ����ڸ�ģ���ϻ�û�������ڴ���
	// Barrier���󽫴���ʼ��������
	_oModuleState.bHasReq = true;
	_oModuleObj.fReq(oReqParam.oUserParam, oReqParam.fInternalCallBack
	);
	return;
}


/**
* ����������callReqʹ�ò������� ����ʼ��ʹ�ø÷�����������������
* @parma {string} 	sReqName 	���������
* @parma {object} 	oUserParam 	�û��Զ���������� 
* 								��ʵ�����彫���û��Զ������󷽷����
* @param {function} fExternalCallBack �û��Զ�������ص�����
* @param {object}	oCancelParam �û��Զ�����Barrier����ȡ����������ʱ��ʹ�ò���
* @param {function} fCancelMethod �û��Զ�����Barrier����ȡ����������ʱ�����õĺ���
* @return {object}	���ط���callReq���õ��������
*/
function fBarMakeParam(sReqName, oUserParam, fExternalCallBack, oCancelParam, fCancelMethod){
	var	_oReqParam = {};
	// �����û��Զ��������
	_oReqParam.oUserParam = oUserParam;
	// ��Barrier���ڲ�ʹ�õĻص�����
	_oReqParam.fInternalCallBack = this._fInCbk.bind(this, sReqName, fExternalCallBack);
	// ����Barrier����ȡ����������ʱ��ʹ�ò���
	if (!oCancelParam)
		_oReqParam.oCancelParam = {};
	else
		_oReqParam.oCancelParam = oCancelParam;
	// Barrier����ȡ����������ʱ�����õĺ���
	if (!fCancelMethod || !(typeof fCancelMethod == "function"))
		_oReqParam.fCancelMethod = Prototype.emptyFunction;
	else
		_oReqParam.fCancelMethod = fCancelMethod;
		
	return _oReqParam;
}

/********************Private Interface Implement**********************/

/**
* Barrier���ڲ�ʹ�õĻص����� ���Barrier�����ڲ���������
* @private
* @parma {string} 	sReqName 	���������
* @parma {function} fExternalCallBack 	�û��Զ���ص����� 
* @param {object} 	oCallBackParam 		�ص��������(Ӧ�����ڷ���������)
* @return {void}	
*/
function _fBarInternalCallback(sReqName, fExternalCallBack, oCallBackParam){
	// ��ȡ����������Ӧ��ģ��
	var _oModuleObj = this._mReq2Module['' + sReqName];
	if (!_oModuleObj) 
		return;
		
	// ���ģ�������״̬�Ƿ�����
	var	_oModuleState = this._mModuleObserve['' + _oModuleObj.sModuleName];
	if (!_oModuleState)
		return;
 
	try{
		// �����û��Զ��Իص�����
		fExternalCallBack(oCallBackParam);
	}catch(e){
		// ����ģ���趨Ϊ�������
		_oModuleState.bHasReq = false;	
		throw e;
	}
		
	// ����ģ���趨Ϊ�������
	_oModuleState.bHasReq = false;
}

function fBarStatusReset(sReqName){
	// ��ȡ����������Ӧ��ģ��
	var _oModuleObj = this._mReq2Module['' + sReqName];
	if (!_oModuleObj) 
		return;
		
	// ���ģ�������״̬�Ƿ�����
	var	_oModuleState = this._mModuleObserve['' + _oModuleObj.sModuleName];
	if (!_oModuleState)
		return;
	
		
	// ����ģ���趨Ϊ�������
	_oModuleState.bHasReq = false;
}
/*
* NetEase PlaceEdit
* ���ڱ༭�ؼ�ʵʱ�������༭״̬,����dwr��prototype��
* ����ڣ�new NetEase.PlaceEdit
* ������element�����༭���ݸ����id
*	   resourceId: ���༭������Ҫ�洢���ݿ�Ķ���id
*	   saveFunc: ���ڴ洢���ݵĺ��������û��ṩ�ú������ú���Ӧ���ڲ���ʹ��dwr����Ϊ����
*			saveFunc(resouceId, data, callback);
*			PlaceEdit�Ը���ʽ����saveFunc���������漰�����ĺ�̨�洢ϸ�ڡ��û�Ӧ�ڸ�
*			�ڸú�����ʵ��ajax�ĺ������ã���ע��PlaceEdit�������callback����
* ��ѡ������
* 	saveText: ���水ť����ʾ����
*	cancelText: ȡ����ť����ʾ����
*	savaButStyle: ���水ť����ʾ���,
*	cancelButStyle: ȡ����ť����ʾ���,
*	orText: ������ť��������ִ�
*	savingText: ����״̬�е���ʾ�ִ�
*	clickToEditText: �༭��ʾ�ִ�
*	emptyText: �յ��༭��ʾ�ִ�
*	editType: �༭������ �ṩinput��textarea����༭��
*   maxLength: �༭�����������������
*   btnBelow: ��ť�Ƿ���ʾ����������滹���ұ�
*	editStyle: �༭��style,
*	highLightColor: ������ʾ����ɫ,
*	dataStream: ���༭��������������,
*	itemIdx: �����ݶ����е���
*	afterFinishedFunc: �༭������Ļص�����
*	param: �༭������Ļص������Ĳ���,
*	dofirst: ǰ��׼������   
*   space: �û�ָ���Ŀ�λռλԪ�أ����ڶԿ�overflow����²���ָ��Ԫ�ص�height����
* 	userCallBack: �û�����ע��ص�����, ���ش�{success, value}��Ϊ���� ���ڱ��������Ƿ�ɹ��Լ��޸ĺ�ֵ
* 
* ��ҪBrowser.js֧��
*/
if (NetEase==undefined){
	var NetEase={};
}
NetEase.PlaceEdit = Class.create();
NetEase.PlaceEdit.prototype = {
	initialize: function(element, resourceId, saveFunc) {
		element = $(element);
		this.element = element;
		//this.text = this._getInputCharsFromDisplayHTML(element.innerHTML);
		this.resourceId = resourceId;
		this.options = Object.extend({
			saveText: '������',
			cancelText: 'ȡ����',
			savaButStyle: 'Butt',
			cancelButStyle: 'CancelButt',			
			orText: '&nbsp;',
			savingText: '<i>������...</i>&nbsp;',
			clickToEditText: '������༭',
			emptyText: '<i style="color:#999">��������������</i>',
			loadingText: 'Loading...',
			editType: 'input',
			maxLength: -1,
			btnBelow: true,
			editStyle: 'inputEdit',
			highLightColor: '#FFFFE1',
			dataStream: null,
			itemIdx:null,
			afterFinishedFunc: Prototype.emptyFunction,
			param: false,
			dofirst: Prototype.emptyFunction,
			canBeNull: true,
			space: false,
			spaceHeight: '16px',
			userCallBack: Prototype.emptyFunction
		}, arguments[3] || {} );
	
		this._convertForSpaceAndEmpty();
		
		if (this.options.maxLength <= 0) {
			if (this.options.editType == 'input')
				this.options.maxLength = 30;
			else
				this.options.maxLength = 200;
		}
		this.saveFunc = saveFunc;
		this.eventReg();
	},
	
	resetAll: function(){
		window.should_I_ignore_stuff_because_is_editing = 0;
		window.should_I_ignore_stuff_because_of_button_action = 0;
	},
	
	_getInput: function() {
		var	editString = '';
		if (this.options.editType == 'input')		
			editString = '<input type="text" id="content' + this.element.id + '" class="' + this.options.editStyle + ' input_textbox" maxlength="' + this.options.maxLength + '"/>';
		else 
			editString = '<textarea id="content'+ this.element.id + '" class="'+ this.options.editStyle + '" maxlength="' + this.options.maxLength + '" cols="20"></textarea>';
		if (this.options.btnBelow)
			editString += '<br/>';
		else
			editString += '&nbsp;';
		editString += '<input type="button" class="' + this.options.savaButStyle + ' input_button" value="' + this.options.saveText + '" id="submit' + this.element.id + '"/>'+
			this.options.orText + '<input type="button" '+ 'class="' + this.options.cancelButStyle + ' input_button" value="' + this.options.cancelText + '" id="reset'+this.element.id + '"/>';		
		return editString;
	},
	
	startEditing: function(){
		if(window.should_I_ignore_stuff_because_is_editing||window.should_I_ignore_stuff_because_of_button_action)
			return;
		window.should_I_ignore_stuff_because_is_editing=1;
		
		this.options.dofirst();
		
		this.isEditing = true;
		this.unhighLight();
		// ��ȡ���б༭���е�����
		this.text = this._getInputCharsFromDisplayHTML(this.element.innerHTML);
		// ʹ��ռλ���������
		if ((this.options.space) && (this.text==this.options.space))
			this.text='';
		// ʹ���û�������ʾ�������		
		else if (this.text == this.options.emptyText) 
			this.text='';
		// �������༭����ʾ
		this.element.innerHTML = this._getInput();
		var	content = $('content'+this.element.id);
		content.value = this.text;
		content.focus();
		content.select();
		$('submit'+this.element.id).onclick = this.savingChanges.bind(this);
		$('reset'+this.element.id).onclick = this.endEditing.bind(this);
	},
	
	savingChanges: function() {
		var editValue = '';
		// ��ȡ�û�����ֵ
		if (this.options.editType == 'input')
			editValue = $('content'+this.element.id).value;
		else
			editValue = $('content'+this.element.id).value;
			
		//û�ж��������༭
		if (editValue == this.text){
			this.endEditing();
			return;
		}
		else{
			if ((!this.options.canBeNull) && (editValue=='')){
				this.endEditing();
				return;
			}
			
			// ���浽��̨���ݿ���	
			if (this.saveFunc){
				var saveString = editValue.replace(/\r/g, '');
				if (saveString.length > this.options.maxLength){
					alert('��������ݹ������벻Ҫ����'+this.options.maxLength+'����');
					return false;
				}
				this.saveFunc(this.resourceId, saveString, this.callBackFunc.bind(this));
			}
			else {
				this.endEditing();
				return;
			}				
			// ��ʾ������ʾ�ִ�
			this.element.innerHTML = this.options.savingText;
		}
		this.editValue = editValue;
	},
	
	callBackFunc: function(success){
		if (success){
			// ����û�����Ϊ��
			if (this.editValue=='')
				this._handleForEmptyInput();
			else
				// ��ʾ�û����������
				this.element.innerHTML = this._getDisplayHTMLFromInputChars(this.editValue);
			
			// �������ݻ���
			if (typeof this.options.dataStream == Array){
				var value = this.editValue;
				if (this.options.itemIdx){
					var item = this.options.itemIdx;
					this.options.dataStream.each(function(e){e[item]=value});
				}
				else
					this.options.dataStream.each(function(e){e=value});
			}
			else if (this.options.dataStream){
				if (this.options.itemIdx)
					this.options.dataStream[this.options.itemIdx] = this.editValue;
				else
					this.options.dataStream = this.editValue;
			}
		}
		else{
			if (this.text == '')
				this._handleForEmptyInput();
			this.element.innerHTML = this.text;
		}
		window.should_I_ignore_stuff_because_is_editing= 0;
		this.isEditing = false;		
	
		this.options.afterFinishedFunc(this.options.param);
		this.options.userCallBack({success:success, value:this.editValue});
	},
		
	endEditing: function(){
		window.should_I_ignore_stuff_because_is_editing= 0;
		this.isEditing = false;
		if (this.text=='')
			this._handleForEmptyInput();
		else
			this.element.innerHTML = this._getDisplayHTMLFromInputChars(this.text);	
		
	},
	
	onMouseover: function(){
		if(window.should_I_ignore_stuff_because_is_editing||window.should_I_ignore_stuff_because_of_button_action)
			return;
		this.highLight();
	},
	
	onMouseout: function(){
		if(this.hideTimer)
			clearTimeout(this.hideTimer);
		var	bindUnhighLight = this.unhighLight.bind(this);
		this.hideTimer=setTimeout(bindUnhighLight ,1000);
	},
	
	highLight: function(){
		if(this.hideTimer)
			clearTimeout(this.hideTimer);
		this.element.style.backgroundColor = this.options.highLightColor;
	
	},
			
	unhighLight: function(){
		if(this.hideTimer)
			clearTimeout(this.hideTimer);
		this.element.style.backgroundColor="";
	},
	
	eventReg: function(){
		this.element.onclick = this.startEditing.bind(this);
		this.element.onmouseover = this.onMouseover.bind(this);
		this.element.onmouseout = this.onMouseout.bind(this);
	},
	
	_getInputCharsFromDisplayHTML: function(sHTML){
		var chars = sHTML;
		chars = chars.replace(/<br>/ig, (Browser.isFirefox() ? "\n" : "\r\n"));
		chars = chars.replace(/&lt;/g, "<");
		chars = chars.replace(/&gt;/g, ">");
		chars = chars.replace(/&quot;/g, "\"");
		chars = chars.replace(/&#039;/g, "'");
		chars = chars.replace(/&amp;/g, "&");
		chars = chars.replace(/&nbsp;/g, " ");
		return chars;
	},
	
	_getDisplayHTMLFromInputChars: function(sChars){
		var html = sChars;
		html = html.replace(/&/g, "&amp;");
		html = html.replace(/</g, "&lt;");
		html = html.replace(/>/g, "&gt;");
		html = html.replace(/"/g, "&quot;");
		html = html.replace(/'/g, "&#039;");
		html = html.replace(/ /g, "&nbsp;");
		html = html.replace((Browser.isFirefox() ? /\n/g : /\r\n/g), "<br>");		
		return html;
	},
	
	// ��������Ϊ��ʱ��ʾ����
	_handleForEmptyInput: function(){
		// ���ʹ��ռλ��������ռλ��
		// ����ʹ���û���������ʾ
		if (this.options.space)
			this.element.innerHTML = this.options.space;
		else
			this.element.innerHTML = this.options.emptyText;
	},
	
	_convertForSpaceAndEmpty: function(){
		var tempNode = $('__$$__temp__$$__');
		if (tempNode==null){
				tempNode = document.createElement('div');
				tempNode.style.display = 'none';
				document.body.appendChild(tempNode);
				tempNode.id = '__$$__temp__$$__';
		}
		if (this.options.space){
			tempNode.innerHTML = this.options.space;
			this.options.space = tempNode.innerHTML;
		}
		if (this.options.emptyText){
			tempNode.innerHTML = this.options.emptyText;
			this.options.emptyText = tempNode.innerHTML;		
		}
	}
};


/**
* NetEase DwrLogger
* ����ڣ�new NetEase.DwrLogger
* ������fade���Ƿ�������Ч��
*      style:�����·��
*	   width�� ͳһ���
*      opacity: ͸��Ч��
*      timeout: ��ʱʱ��
*      delay: �ӳ�ʱ��
* ����ӿڣ�
*   appendMsg() : ������Ϣ
*/

if (NetEase==undefined){
	var NetEase={};
}

NetEase.DwrLogger = Class.create();
NetEase.DwrLogger.prototype = {
	initialize: function(){
		this.options = Object.extend({
			fade: true,
			style: 'http://st.blog.163.com/style/common',
			relativeId: false,
			width: 200,
			opacity: 0.80,
			timeout: 3000,
			delay: 1500
		}, arguments[0] || {});
		this._init();
		this.loggerIndex=-1;
		this.cacheLogger=[];		
	},
	
	_init: function(){		
    	this.loggerZone = $('$_loggerZone');
	    if (!this.loggerZone) {
      		this.loggerZone = document.createElement('div');
      		this.loggerZone.setAttribute('id', '$_loggerZone');
      		this.loggerZone.style.position = "absolute";
      		this.loggerZone.style.zIndex="100019";
      		var offset = 0;
      		if(this.options.relativeId && $(this.options.relativeId)){ 
				offset = $(this.options.relativeId).offsetLeft;     
      		}
      		this.loggerZone.style.left = document.documentElement.scrollLeft + 
      						document.documentElement.clientWidth - this.options.width - offset - 20 + 'px';
      		this.loggerZone.style.top = document.documentElement.scrollTop + 25 + 'px';
	      	document.body.appendChild(this.loggerZone);
	      	var callback = this._onResizeOb.bind(this);
	      	if (window.attachEvent){
	      		window.attachEvent('onresize',callback);
	      		window.attachEvent('onscroll',callback)	      		
	      	}else{
	      		window.addEventListener('resize',callback,false);
	      		window.addEventListener('scroll',callback,false);
	      	}
	    }
	},
	
	_onResizeOb: function(){
		if(this.loggerZone){
      		var offset = 0;
      		if(this.options.relativeId && $(this.options.relativeId)){ 
				offset = $(this.options.relativeId).offsetLeft;      			
      		}
      		this.loggerZone.style.left = document.documentElement.scrollLeft + 
      						document.documentElement.clientWidth - this.options.width - offset - 20 + 'px';
      		this.loggerZone.style.top = document.documentElement.scrollTop + 25 + 'px';
		}		
	},
	
	appendMsg: function(msg,type){
		this.loggerIndex++;
		var logger={};
		logger.id = "$_loggerMsg"+this.loggerIndex;
		logger.msg = msg;
		logger.type = type;
		var messageZone = document.createElement('div');
	    messageZone.setAttribute('id', logger.id);
	    if(logger.type=="info"){
		    messageZone.innerHTML = '<img src="'+this.options.style+'/ico_info.gif"/>&nbsp;' + msg;	    	
	    }else
	    if(logger.type=="ok"){
		    messageZone.innerHTML = '<img src="'+this.options.style+'/ico_confirm.gif"/>&nbsp;' + msg;	    		    	
	    }	    
	    else
	    if(logger.type=="error"){
		    messageZone.innerHTML = '<img src="'+this.options.style+'/ico_error.gif"/>&nbsp;' + msg;	    		    		    	
	    }else
	    	messageZone.innerHTML = '<img src="'+this.options.style+'/ico_info.gif"/>&nbsp;' + msg;
	    messageZone.style.display="block";		    	
	    messageZone.style.backgroundColor="#ffffff";
	    messageZone.style.margin="5px";
	    messageZone.style.padding="2px";
	    messageZone.style.textAlign="left";
	    messageZone.style.MozOpacity=this.options.opacity+"";
	    messageZone.style.filter="alpha(opacity="+this.options.opacity*100+")";
	    messageZone.style.width=this.options.width + 'px';
		this.loggerZone.insertBefore(messageZone, this.loggerZone.firstChild);
		this.cacheLogger.push(logger);
		if(!this.toFadeCheck)
			this.toFadeCheck = window.setTimeout(this._clean.bind(this,logger), this.options.timeout);								
	},
	
	_clean: function(logger){
		if (this.options.fade){
			if($(logger.id)){
				Effect.Fade(logger.id,{duration:0.5,userCallBack:this._remove.bind(this,logger)});
			}
		}else {
			this._remove(logger);
		}
	},
	
	_remove: function(logger){
		if($(logger.id)){
			$(logger.id).innerHTML = '';
			$(logger.id).style.display = 'none';
			this.loggerZone.removeChild($(logger.id));
			this.cacheLogger.shift(logger);
			if(this.cacheLogger.length>0){
				logger = this.cacheLogger[0];
				this.toFadeCheck = window.setTimeout(this._clean.bind(this,logger), this.options.delay);
			}else{
				this.toFadeCheck = null;
			}
		}		
	}
}

NetEase.DwrLogger.TYPE_INFO="info";
NetEase.DwrLogger.TYPE_OK="ok";
NetEase.DwrLogger.TYPE_ERROR="error";
/**************************************************************
*				163 blog cache page     			   	      *
*                                                             *
* Written by:  bezy                                           *
* Important: to use this script don't                         *
*            remove these comments                            *
* Version 2.0 (MSIE 6.0 above,Firefox1.0,Netscape.)           *
* Created Date: 2007-01-04									  *
* Copyright��1997-2006 NetEase.com Inc. All rights reserved.  *
**************************************************************/
/*
* NetEase CachePage
* ����ajax�Ĵ����������ҳ��ҳ�ؼ�
* ����ڣ�new NetEase.CachePage
* ��ѡ������
* 	loadFunc: ���ݼ��غ���
*   loadParam: loadFunc�ļ��ز�������
*   presentFunc: �û��Զ���������ʾ���ݵĺ���
*   presentSlideFunc: slideģʽ����ʾ����
*	filterFunc: �û��Զ���Լ��غ����ݵĹ��˺���
*	pageSize: ҳ��С
*	prefetchMulti: Ԥȡ��ҳ��
* 	prefetch: �Ƿ�Ԥȡ
*	markID: 	����ҳ�������ID
*   customPageIds: �Զ�����һҳ����һҳ��id
*   totalSize: �û��Զ�����ҳ����С.Ĭ��Ϊ-1,��ʾ����ʾ��ҳ��,�ɿؼ��Լ��ж��Ƿ�ﵽ���һҳ
*	onlyLoadOnce: ��ҳ���Ƿ�ֻ����һ��
*   detSlideIterator: ����slide ģʽ�����
* 	delIterator: ɾ��ĳһ��ʱ,�û��Զ���Ĳ�ѯ�������� ��ʽdelIterator(userid, cacheitem)
* 	updateIterator: ����ĳһ��ʱ,�û��Զ���Ĳ�ѯ�������� ��ʽupdateIterator(userid, cacheitem)
* 	organizeFunc: �û��Զ���������֯����,�ڻ�ȡ��������ʱ,�Ⱦ����ú�������֯
*   RefreshAfterAdd�� �����������Ժ��Ƿ�ѡ�����ҳ��
*   initData: ��ʼ��������
* ����ӿڣ�
*   nextPage,prevPage �Ⱥ�ǰ��ҳ
*   initCacheData  ��ʼ������
*   addOne�� ���Ӽ�¼
*   removeOne�� �ƿ�һ����¼
*   removeItems: �ƿ�������¼
*   updateOne: ����һ����¼
*   reset�� ��λ
*   getSelectSlide: �õ���ǰѡ��
*   changeToSlideMode: ����slideģʽ
*   selectPage: ѡ������*ҳ,ͬʱ�˳�slideģʽ,��ҳ��>��ǰҳ����=nextPage(), 
*   refreshCurPage�� ����ˢ�±�ҳ�������˳�slideģʽ
*   getAllCachedData�� �õ���������
*   resetCachePageEvent: ���õ�ǰ�¼�ģʽ
*/

if (NetEase==undefined){
	var NetEase={};
}

NetEase.CachePage = Class.create();
NetEase.CachePage.prototype = {
	initialize: function(){
		this.options = Object.extend({
			loadFunc: Prototype.emptyFunction,
			loadParam:{},
			presentFunc: Prototype.emptyFunction,
			presentSlideFunc: Prototype.emptyFunction,
			filterFunc: Prototype.emptyFunction,
			organizeFunc: function(list) { return list},
			userPresentFuncParam: {},
			pageSize: 0,
			prefetchMulti: 1,
			prefetch: false,
			markID: '',//���markID��ð�ŷָ�
			customPageIds: false,
			totalSize: -1,
			onlyLoadOnce: false ,
			beforeID: '',//���markID��ð�ŷָ�
			beforePrev: Prototype.emptyFunction,
			beforeNext: Prototype.emptyFunction,
			detSlideIterator: Prototype.emptyFunction,
			delIterator: Prototype.emptyFunction,
			updateIterator: Prototype.emptyFunction,
			needRefreshAfterUpdate:true,
			RefreshAfterAdd: true,
			initData: false
		}, arguments[0]||{});
		this.cacheData=[];
		this.markIDArray=[];
		this._initial();
		this.bMarkFirst = true;		// ����Ƿ��ǵ�һ�β���mark
	},
	
	setUserPresetFuncParam: function(param){
		this.options.userPresentFuncParam = param;
	},
	
	reset: function(){
		this.cacheData=[];
		if (this.options.totalSize != -1)
			this.lastPage = 1;
		else
			this.lastPage = 0;		
		this.curPage = 0;
		this.canNext = false;
		this.canPrev = false;
		this.getState = 1;
		this.isEnd = true;
		this.loadCount = 0;
		this._generateMark();	
	},
	
	_loadMoreDataFunc: function(type){
		if(this.curPage < 0)
			this.curPage = 0;
		this.options.loadParam.offset = this.cacheData.length; //-((this.options.initData)?this.options.initData.length:0);
		this.options.loadParam.limit = ((this.options.prefetch)?this.options.prefetchMulti:0)*this.options.pageSize+((this.curPage + 1)*this.options.pageSize - this.cacheData.length);		
		if(type==0)
			this.options.loadFunc(this.options.loadParam, this._mergeDataFunc.bind(this));
		else
			this.options.loadFunc(this.options.loadParam, this._mergeMoreDataFunc.bind(this));
					
	},
	
	_mergeDataFunc: function(dataList){
		dataList = this.options.organizeFunc(dataList);
		if (dataList==null || dataList.length==0){
			this.canNext=false;
			this.getState = 0;
			if(this.isEnd == true){
				this._generateMark();
				return false;
			}
		}
		else if (dataList.length < ((this.curPage + 1)*this.options.pageSize - this.cacheData.length)){
			this.canNext=false;
			this.getState = 0;
		}else if(dataList.length < this.options.loadParam.limit){
			this.canNext=true;
			this.getState = 0;
		}else{		
			this.canNext=true;
			this.getState = 1;
		}
		this.curPage ++ ;
		if(this.lastPage && this.curPage > this.lastPage)
			this.lastPage = this.curPage;
		this.options.filterFunc(dataList);
		if(dataList)
			dataList.each(this._iterator.bind(this));
		this._generateMark();
		this._presentTemplate();
	},
	
	_mergeMoreDataFunc: function(dataList){
		dataList = this.options.organizeFunc(dataList);
		if (dataList==null || dataList.length <= this.curPage*this.options.pageSize - this.cacheData.length){
			this.canNext=false;
			this.getState = 0;
		}else if (dataList.length < ((this.curPage + 1)*this.options.pageSize - this.cacheData.length)){			
			this.canNext=true;
			this.getState = 0;
		}else if(dataList.length < this.options.loadParam.limit){
			this.canNext=true;
			this.getState = 0;			
		}else{
			this.canNext=true;
			this.getState = 1;
		}
		this.options.filterFunc(dataList);
		dataList.each(this._iterator.bind(this));
		this._generateMark();
		this._presentTemplate();
	},

	_iterator: function(e){
		this.cacheData.push(e);
	},

	nextPage: function(){
		if(!this.canNext)
			return false;
		this.canNext = false;
		var canGetMore = true;
		if(this.options.onlyLoadOnce && this.loadCount >= 1)
			canGetMore = false;
		if((this.curPage + 1)*this.options.pageSize > this.cacheData.length && this.getState == 1 && canGetMore){
			this.loadCount++;
			this._loadMoreDataFunc(0);
		}else{
			if(this.curPage*this.options.pageSize < this.cacheData.length ){
				this.canNext = true;
				if(this.getState == 0 && (this.curPage+1)*this.options.pageSize >= this.cacheData.length)
					this.canNext = false;
				this.curPage ++ ;
			}
			this._generateMark();
			this._presentTemplate();
		}
	},

	prevPage: function(){
		if(!this.canPrev)
			return false;
		this.canPrev = false;
		this.curPage -- ;
		if(this.curPage <= 1)
			this.curPage = 1;
		this.canNext = true;
		this._generateMark();
		this._presentTemplate();
	},
	
	refreshCurPage: function(bRefreshPage){
		this._setSlideMode(false);
		if(bRefreshPage == true){
			this.is_first_load = null;
		}
		this._generateMark();
		this._presentTemplate();
	},
	
	selectPage: function(page){
		if(page < 1)
			page = 1;
		if(page > this.curPage){
			this._setSlideMode(false);
			this.nextPage();
			return;
		}
		if(page < this.curPage){
			if(page > 1)
				this.canPrev = true;
			else
				this.canPrev = false;
			this.canNext = true;
			this.curPage = page;			
		}
		this.refreshCurPage();
	},
	
	_generateMark: function(){
		this._generateMarkData();
		this._generateMarkHTML();
		this._registerCachePageEvent();
	},
	
	_presentTemplate: function(){
		if(this.slideMode == true){
			this.options.presentSlideFunc(this.cacheData[this.curDataIndex],this.options.userPresentFuncParam);
		}else{
			this.options.presentFunc(this._prepareForPresent(), this.options.userPresentFuncParam);			
		}
	},

	_prepareForPresent: function(){
		var result = [];
		if(this.cacheData.length <= (this.curPage-1)*this.options.pageSize){
			if(this.curPage > 1){
				this.curPage -- ;
				this._generateMark();				
			}
		}
		var i = 0;
		for(i=(this.curPage-1)*this.options.pageSize;i<this.curPage*this.options.pageSize&&i<this.cacheData.length;i++)
			result.push(this.cacheData[i]);
		if(i==this.cacheData.length)
			this.isEnd = true;
		else
			this.isEnd = false;
		return result;
	},

	_clickPrev: function(sId){
		if(sId != null && this.beforeIDArray!=null){			
			for(var i=0;i<this.beforeIDArray.length;i++){
				if(this.beforeIDArray[i] == sId){
					this.options.beforePrev();
				}
			}
		}
		this.op = "prev";		// ��¼�²����Ķ���
		this.prevPage();
		return false;
	},

	_clickNext: function(sId){
		if(sId != null && this.beforeIDArray!=null){			
			for(var i=0;i<this.beforeIDArray.length;i++){
				if(this.beforeIDArray[i] == sId){
					this.options.beforeNext();
				}
			}
		}
		this.op = "next";		// ��¼�²����Ķ���
		this.nextPage();
		return false;
	},
	
	removeOne: function(item,notRefresh){
		var removed = this.cacheData.select(this._rejectIter.bind(this, item));
		this._removeItem(item);
		this._afterRemove(1,notRefresh);
		return removed;
	},

	removeItems: function(itemList,notRefresh){
		itemList.each(this._removeItem.bind(this));
		this._afterRemove(itemList.length,notRefresh);	
	},
	
	_removeItem: function(item){
		this.cacheData = this.cacheData.reject(this._rejectIter.bind(this, item));		
	},
		
	_afterRemove: function(count,notRefresh){
		if(this.curPage > 1 && this.cacheData.length%this.options.pageSize == 0){
				this.curPage --;
		}
		// ��ֹbug
		if (this.options.totalSize> (-1) * count){
			this.options.totalSize-=count;
			this.lastPage = this._getTotalSize();
		}
		if(this.canNext){
			if(this.isEnd && this.getState == 1){
				this._loadMoreDataFunc(1);			
			}else{
				if(notRefresh != true){
					this._generateMark();
					this._presentTemplate();
				}
			}
		}else{
			if(notRefresh != true){		
				this._generateMark();
				this._presentTemplate();
			}
		}		
	},
	
	_rejectIter: function(item, e){
		return this.options.delIterator(item, e);
	},
	
	getSelectSlide: function(){
		return this.cacheData[this.curDataIndex];
	},
	
	changeToSlideMode: function(item){
		var data = this.cacheData.detect(this._detectItr.bind(this,item));		
		if(data){
			this._setSlideMode(true);
			this._generateMark();
			this._presentTemplate();
		}
	},
	
	_detectItr: function(item,e,index){
		var value = this.options.detSlideIterator(item, e);
		if(value){
			this.curDataIndex = index;
			return true;
		}
		return false;
	},
	
	_slideNext: function(){
		if(!this.canNextSlide)
			return false;
		this.canNextSlide = false;
		if (this.options.totalSize > -1){
			if(this.curDataIndex >= (this.options.totalSize -1)){
				this._generateMark();
				return false;
			}
		}
		this.curDataIndex++;
		this._setSlideMode(true);
		if(this.curDataIndex % this.options.pageSize == 0){
			this.nextPage();
		}else{
			this._generateMark();
			this._presentTemplate();
		}
		return false;		
	},
	
	_slidePrev: function(){
		if(!this.canPrevSlide)
			return false;
		this.canPrevSlide = false;		
		if(this.curDataIndex <= 0){
			this._generateMark();
			return false;
		}			
		this.curDataIndex -- ;
		this._setSlideMode(true);
		if(this.curDataIndex % this.options.pageSize == ( this.options.pageSize -1 )){
			this.prevPage();
		}else{
			this._generateMark();
			this._presentTemplate();
		}
		return false;		
	},
	
	_setSlideMode: function(isSlide){
		if(isSlide == true){
			this.slideMode = true;
		}else{
			this.slideMode = false;
		}			
	},
	
	addOne: function(item, head, notRefresh){
		if (head){		// ���뻺����ͷ��
			var temp = [];
			temp.push(item);
			this.options.filterFunc(temp);
			this.cacheData.unshift(item);
		}
		else{			// ���뻺����β��
			var temp = [];
			temp.push(item);
			this.options.filterFunc(temp);
			this.cacheData.push(item);
		}
		if(this.cacheData.length > this.curPage * this.options.pageSize){
			if(!this.canNext){
				this.canNext = true;
			}
		}
		if (this.options.totalSize> -1){
			this.options.totalSize++;
			this.lastPage = this._getTotalSize();			
		}
		
		if (this.options.RefreshAfterAdd){
			if(notRefresh!=true){	
				this._generateMark();		
				this._presentTemplate();
			}
		}
	},
	
	getAllCachedData: function(){
		return this.cacheData;
	},
	
	updateOne: function(item,notRefresh){
		this.cacheData.each(this._updateIter.bind(this,item));
		if(notRefresh!=true){		
			this._generateMark();
			if (this.options.needRefreshAfterUpdate)
				this._presentTemplate();
		}
	},
	
	
	_updateIter:function(item,e,index){
		if(this.options.updateIterator(item, e)){
			Object.extend(this.cacheData[index], item);			
		}
	},

	getCurPage: function(){
		return this.curPage;
	},
	
	getPageSize: function(){
		return this.options.pageSize;	
	},
	
	getTotalSize: function(){
		return this.options.totalSize;	
	},
		
	_getTotalSize: function(){
		var d = (this.options.totalSize%this.options.pageSize==0)?0:1;
		var r = parseInt(this.options.totalSize/this.options.pageSize + d + '');
		if(r < 1)
			r = 1;
		return r;		
	},
	
	_initial: function(){
		if (this.options.totalSize > -1)
			this.lastPage = this._getTotalSize();		
		this.curPage = 0;
		this.canNext = true;
		this.canPrev = false;
		this.getState = 1;
		this.isEnd = false;
		this.loadCount = 0;
		if(this.options.markID)
			this.markIDArray = this.options.markID.split(":");
		if(this.options.beforeID)
			this.beforeIDArray = this.options.beforeID.split(":");	
		if(this.options.initData){
			this.options.initData.each(this._iterator.bind(this));
		}
	},
	
	initCacheData: function(dataList,isListEnd){		
		dataList = this.options.organizeFunc(dataList);
		if (dataList==null || dataList.length==0){
			this.canNext=false;
			this.getState = 0;
		}
		else if (dataList.length < ((this.curPage + 1)*this.options.pageSize - this.cacheData.length)){
			this.canNext=false;
			this.getState = 0;
		}else{		
			this.canNext=true;
			if(isListEnd)
				this.getState = 0;
			else
				this.getState = 1;
		}
		this.curPage ++ ;
		if(this.lastPage && this.curPage > this.lastPage)
			this.lastPage = this.curPage;
		this.options.filterFunc(dataList);
		dataList.each(this._iterator.bind(this));
		this._generateMark();
		this._presentTemplate();
	},
	
	_generateMarkData: function(){
		if(this.curPage > 1)
			this.canPrev = true;	
		else
			this.canPrev = false;
		if(this.curPage < 1)
			this.curPage = 1;
		if(this.lastPage && this.curPage > this.lastPage)
			this.curPage = this.lastPage;
		if (this.lastPage){
			if (!this.canNext)
				this.lastPage = this.curPage;
			if(this.curPage == this.lastPage)
				this.canNext = false;				
		}
		
		if(this.slideMode == true){
			if(this.canNext)
				this.canNextSlide = true;
			else{
				if(this.cacheData[this.curDataIndex+1]==null)
					this.canNextSlide = false;
				else
					this.canNextSlide = true;
			}
			if(this.canPrev)
				this.canPrevSlide = true;
			else{
				if(this.cacheData[this.curDataIndex-1]==null)
					this.canPrevSlide = false;
				else
					this.canPrevSlide = true;
			}
		}
	},
	
	_generateMarkHTML: function(){
		if(this.options.customPageIds){
			if(this.slideMode == true){
				if(this.canPrevSlide)
					$(this.options.customPageIds[0]).style.visibility = "visible";			
				else
					$(this.options.customPageIds[0]).style.visibility = "hidden";			
				if(this.canNextSlide)
					$(this.options.customPageIds[1]).style.visibility = "visible";			
				else
					$(this.options.customPageIds[1]).style.visibility = "hidden";					
			}else{				
				if(this.canPrev)
					$(this.options.customPageIds[0]).style.visibility = "visible";			
				else
					$(this.options.customPageIds[0]).style.visibility = "hidden";			
				if(this.canNext)
					$(this.options.customPageIds[1]).style.visibility = "visible";			
				else
					$(this.options.customPageIds[1]).style.visibility = "hidden";
			}
		}
		if(this.options.markID){			
			if(this.is_first_load == null){
				this.markIDArray.each((function(a){return function(markId){
					if ($(markId)) {
						var innerHTML = '<div class="c08">\
										 <span id="$$_prev_img_'+markId+'"></span>&nbsp;\
										 <span id="$$_num'+ markId+'">&nbsp;</span>&nbsp;\
										 <span id="$$_next_img_'+markId+'"></span></div>';
						$(markId).innerHTML = innerHTML;
						var	_i = a.curPage;
						if(a.lastPage){
							_i+='/'+a.lastPage;
						}
						$('$$_num' + markId).innerHTML =_i;
					}
				};})(this));
				this.is_first_load = true;
			}else{
				this.markIDArray.each((function(a){return function(markId){
					if ($(markId)) {
						var	_i = a.curPage;
						if(a.lastPage){
							_i+='/'+a.lastPage;
						}
						$('$$_num' + markId).innerHTML =_i;
					}
				};})(this));
			}
			
			this._adjustStyle();
		}		
	},
	
	_adjustStyle: function(){
		this.markIDArray.each((function(a){return function(markId){
			if ($(markId)){
				$('$$_prev_img_'+markId).innerHTML = (a.canPrev)?'<span class="a_a c06">��ҳ</span>':'��ҳ';
				$('$$_next_img_'+markId).innerHTML = (a.canNext)?'<span class="a_a c06">��ҳ</span>':'��ҳ';
			}
		};})(this));
	},

	_registerCachePageEvent: function(){
		if(this.slideMode == true){
			if(this.options.customPageIds){
				if(this.register_custom_event_is != "slideevent"){
					$(this.options.customPageIds[0]).onclick=this._slidePrev.bind(this);
					$(this.options.customPageIds[1]).onclick=this._slideNext.bind(this);
					this.register_custom_event_is = "slideevent";
				}
			}
			if(this.options.markID){
				if(this.register_mark_event_is != "slideevent"){
					this.markIDArray.each((function(a){ return function(markId){
						if ($(markId)) {
							$('$$_prev_img_'+markId).onclick=a._slidePrev.bind(a,markId);
							$('$$_next_img_'+markId).onclick=a._slideNext.bind(a,markId);
							this.register_mark_event_is = "slideevent";
						}
					};})(this));
				}
			}										
		}else{
			if(this.options.customPageIds){
				if(this.register_custom_event_is != "notslideevent"){
					$(this.options.customPageIds[0]).onclick=this._clickPrev.bind(this);
					$(this.options.customPageIds[1]).onclick=this._clickNext.bind(this);
					this.register_custom_event_is = "notslideevent";
				}
			}
			if(this.options.markID){
				if(this.register_mark_event_is != "notslideevent"){
					this.markIDArray.each((function(a){ return function(markId){
						if ($(markId)) {
							$('$$_prev_img_'+markId).onclick=a._clickPrev.bind(a,markId);
							$('$$_next_img_'+markId).onclick=a._clickNext.bind(a,markId);
							this.register_mark_event_is = "notslideevent";
						}
					};})(this));
				}				
			}							
		}
	},
	
	resetCachePageEvent:function(){
		this.register_mark_event_is = null;
		this.register_custom_event_is = null;
	}	
}

/**************************************************************
*		163 blog page select control				    	  *
*                                                             *
* Written by:  zhuyiwen   				                      *
* Important: to use this script don't                         *
*            remove these comments                            *
* Version 1.0 (MSIE 6.0 above,Firefox1.0,Netscape.)           *
* Created Date: 2007-01-04									  *
* Copyright��1997-2006 NetEase.com Inc. All rights reserved.  *
**************************************************************/

/** 
 * @fileoverview 
 * ��ҳ�ؼ�
 * 
 * @author  zhuyiwen@(zhuyiwen@corp.netease.com)
 * @version 1.0 
 * @requires  utils.js
 * @requires  prototype.js
 * @see		  
 */
if (NetEase==undefined){
	var NetEase={};
}


/**
 * NetEase.PageNumber Class
 *
 * @class ������ķ�ҳ��ҳ����ת�ؼ�
 */
NetEase.PageNumber = Class.create();
NetEase.PageNumber.prototype = {
	/**
	 * PageNumber�๹�캯�� ��ʼ��PageNumber����Ԥ�����
	 * @constructor
	 * @see 	#_init
	 */
	initialize: function(){
		this.options = Object.extend({
			loadFunc: Prototype.emptyFunction,			// �Ӻ�̨ȡ���ݵĺ���
			loadParam:{},								// ȡ���ݺ�����Ӧ�Ĳ���
			presentFunc: Prototype.emptyFunction,		// ������ʾ����
			filterFunc: Prototype.emptyFunction,		// ���ݵĹ��˺�������ʾǰ�Ĺ���
			userPresentFuncParam: {},					// �û������������ʾ����������������ʱ����
			pageSize: 0, 								// ÿҳ��ʾ����������
			prefetchMulti: 1,                           // Ԥȡ����
			markID: '',									// ���÷�ҳ��������ID�����markID��ð�ŷָ���
			totalSize: -1,								// �ܵ�������Ŀ��
			beforeID: '',								// ִ��֮ǰ��ID�����markID��ð�ŷָ���
			beforePrev: Prototype.emptyFunction,		// "��ҳ"��ť ǰ������
			beforeNext: Prototype.emptyFunction,		// "��ҳ"��ť ǰ������
			beforeChange:Prototype.emptyFunction,		// ҳ����ת��ť ǰ������
			delIterator: Prototype.emptyFunction,		// ɾ��������
			updateIterator: Prototype.emptyFunction,	// ���µ�����
			needRefreshAfterUpdate:true,				// ���º���Ҫˢ��
			RefreshAfterAdd: true,						// ��Ӻ���Ҫˢ��
			RefreshAfterDel: true,						// ɾ�����Ƿ�ˢ��
			useCache: true,								// �Ƿ�ʹ�ÿͻ��˻���
			isDiv:	false								// �Ƿ����ڲ��ϵķ�ҳ
		}, arguments[0]||{});
		//���ݷֶ���ҳ��ʾ
		this.totalPages = 0;
		
		this.curPage;  
		this.cacheData = [];
		
		this.markIDArray = [];
		this.beforeIDArray=[];
		
		this._iTextSpanWidth;

		this._init();
		
	},
	
	_init: function(){
		if (this.options.totalSize > -1)
			this.totalPages = this._getTotalPages();		
		this.curPage = 1;			// ��ʼҳΪ��һҳ(�˴���CachePage�ؼ���ͬ)

		if(this.options.markID)
			this.markIDArray = this.options.markID.split(":");
		if(this.options.beforeID)
			this.beforeIDArray = this.options.beforeID.split(":");	

	},
	
	reset: function(){
		this.cacheData=[];
		this.curPage = 1;
		this.options.totalSize = 0;
		this.totalPages = 1;
		this._generateMarks();
	},
	
	//���ó�ʼ����
	initCacheData: function(oData){
		this.options.filterFunc(oData);
		if(this.options.useCache){
			for(var i=0; i<oData.length; i++){
				this.cacheData[i] = oData[i];
			}
		}
	},
	
	// ���ڻ�ȡ��ǰҳ����������
	//fix null element bug
	getAllCachedData: function() {
		var datas=[];
		this.cacheData.each(function(e){if(e!=null){datas.push(e)}})		
		return datas;
	},
	
	getTotalPages: function(){
		return this.totalPages;
	},
	getCurPageNum: function(){
		return this.curPage; 
	},
	getCurOffset: function(){
		return this.options.pageSize * (this.curPage-1);
	},
	getTotalSize: function(){
		return this.options.totalSize;
	},
	refreshCurPage: function(){
		this.show();	
	},

	
	nextPage: function(){
		this.curPage ++;
		if(this.curPage > this.totalPages)
			this.curPage = this.totalPages;
		this.show();
		return false;
	},
	
	prevPage: function(){
		this.curPage -- ;
		if(this.curPage < 1)
			this.curPage = 1;
		this.show();
		return false;
	},
	setPageSize: function(iSize){
		this.options.pageSize = iSize;
	},
	//�Ӻ��ȡ���ݣ�����ʾ
	show: function() {
		var _iOffset = this.options.pageSize * (this.curPage-1);
		var _iLimit = this.options.pageSize;

		if(this.options.useCache){
			var _data = this._hasFullData(_iOffset,_iLimit)
			if(_data != null){ 			//�ӻ����ж�ȡ����ʾ
				this._display(_data);
			}else{ 						//���º�̨ȡ���ݲ���ʾ	
				this.options.loadParam.offset = _iOffset;
				this.options.loadParam.limit = _iLimit * (this.options.prefetchMulti?this.options.prefetchMulti:1);			
				this.options.loadFunc(this.options.loadParam, this._display.bind(this));
			}
		}else{	//��ʹ��ҳ�滺��
			this.options.loadParam.offset = _iOffset;
			this.options.loadParam.limit = _iLimit;
			this.options.loadFunc(this.options.loadParam, this._display.bind(this));
		}
		
	},
	
	//�ص�����������ʾ��������ʾoData����
	_display: function(oData){
		//�����ݴ�
		if(oData == null || oData.length == 0){
			if(this.curPage>1){
				this.curPage--;
				this.options.totalSize = this.curPage * this.options.pageSize;
				this.totalPages = this._getTotalPages();
				this.cacheData = [];
				this.show();
				return false;
			}
		}
		//��������
		this.options.filterFunc(oData);
		if(this.options.useCache){
			//���浱ǰ��ʾ������
			var _iOffset = this.options.pageSize * (this.curPage-1);
			for(var i=0; i<oData.length; i++){
				this.cacheData[_iOffset+i] = oData[i];
			}
		}
		//��ʾ����
		this.options.presentFunc(oData.slice(0,this.options.pageSize), this.options.userPresentFuncParam);	
		// ��ҳ��HTML���룬��ʾҳ��
		this._generateMarks();	
	},
	/**
	 * Ҫ��ʾ�������Ƿ񶼱�������
	 */
	_hasFullData: function(iOffset, iLimit){
		var _oDataDisplay = [];
		var _iLen = iOffset+iLimit> this.options.totalSize? this.options.totalSize-iOffset: iLimit;
		for(var i=0;i<_iLen;i++){
			var _oData = this.cacheData[iOffset+i];
			if(_oData == undefined || _oData == null)
				return null;
			_oDataDisplay[i] = _oData;
		}
		return _oDataDisplay;
	},
	
	_generateMarks: function(){
		var _iMarkLen = this.markIDArray.length;
		for(var i=0; i<_iMarkLen; i++){
			var markId = this.markIDArray[i];
			var _oMark = $(markId);
			if (_oMark) {
				_oMark.innerHTML = this._generateHTML(markId);
				//ע���¼�
				this._setUIEvent(markId);
			}
		}
		return false;
	},
	
	/**
	 * ������ҳ��
	 */
	_getTotalPages: function(){
		if(this.options.pageSize==0 ){
			return 1;
		}
		var _iLast = (this.options.totalSize%this.options.pageSize==0)?0:1;
		var _iPages = parseInt(this.options.totalSize/this.options.pageSize + _iLast + '');
		if(_iPages < 1)
			_iPages = 1;
		return _iPages;		
	},
	

	/**
	 * ��ת��ĳ�ض���ҳ
	 */
	goToPage: function(iPageIndex){
		if(iPageIndex> this.totalPages || iPageIndex < 1)
			return ;
		this.curPage = iPageIndex;
		this.show();
	},


	/**
	 * ���һ����¼
	 */
	addOne: function(item, head, notRefresh){
		//��������Ŀ����
		if (this.options.totalSize> -1){
			this.options.totalSize++;
			this.totalPages = this._getTotalPages();			
		}
		if(this.options.useCache){
			if (head){	// ���뻺����ͷ��
				this.cacheData.unshift(item);
			}else{		// ���뻺����β��
				this.cacheDate[this.options.totalSize-1] = item;
			}
		}
		if (this.options.RefreshAfterAdd && notRefresh!=true){
			this.show();
		}
	},
	/**
	 * ɾ��һ����¼
	 */
	removeOne: function(item, notRefresh){
		var removed = null;
		if(this.options.useCache){
			removed = this._removeItem(item);
		}
		this._afterRemove(1,notRefresh);
		return removed;
	},
	
	removeItems: function(items,notRefresh){
		if(this.options.useCache){
			items.each(this._removeItem.bind(this));
		}
		this._afterRemove(items.length,notRefresh);
	},
	
	_removeItem: function(item){	
		var index = -1;
		for(var i=0; i<this.options.totalSize; i++){	
			if(this.cacheData[i] == undefined || this.cacheData[i] == null)
				continue;
			if(this.options.delIterator(item, this.cacheData[i])){
				index = i;
				break;
			}
		}
		if(index ==-1){	//ɾ���Ķ����ڵ�ǰҳ��
			return null;
		}
		var removed = this.cacheData[index];
		//���ɾ�������ݿ�ȱ
		if(index+1 <this.options.totalSize){
			this.cacheData[index] = this.cacheData[index+1];
			this.cacheData[index+1] = null;
		}else{
			this.cacheData[index] = null;
		}
		//�����е�����ǰ��һλ
		for(++index; index<this.options.totalSize-1; index++){
			if(this.cacheData[index+1] != undefined && this.cacheData[index+1] != null){
				this.cacheData[index] = this.cacheData[index+1];
				this.cacheData[index+1] = null;
			}
		}
		return removed;
	},
		
	
	_afterRemove: function(len,notRefresh){
		//������ҳ�� (��ֹbug) 
		if (this.options.totalSize> -1){
			this.options.totalSize -= len;
			this.totalPages = this._getTotalPages();
		}
		//��ǰҳΪ���һҳ�����ҵ�ҳɾ����Ϻ���Ҫ���Ϸ�һҳ
		if(this.curPage == this.totalPages+1 && this.options.totalSize%this.options.pageSize == 0){
			this.curPage --;
		}	
		if (this.options.RefreshAfterDel && notRefresh!=true){
			this.show();
		}
	},
	
	/**
	 * ����һ����¼
	 */
	updateOne: function(oItem, bNotRefresh){

		if(this.options.useCache){
			var _iOffset = this.options.pageSize * (this.curPage-1);
			var index = -1;
			for(var i=0; i<this.options.pageSize; i++){	
				if(this.options.updateIterator(oItem, this.cacheData[i+_iOffset])){
					index = i+_iOffset;
					break;
				}
			}
			if(index ==-1){	//ɾ���Ķ����ڵ�ǰҳ��
				//���ݲ�ͬ��,�ͻ��˻�������
				this.cacheData=[];
				return;
			}
			Object.extend(this.cacheData[index], oItem);	
		}
		if(bNotRefresh!=true && this.options.needRefreshAfterUpdate){		
			this.show();
		}
	},
	
	/////////////////////////////////////////////////////////////////////////////
	//              ���²��ֶ��ǹ�����ʾ���ֵ��߼�                                  //
	////////////////////////////////////////////////////////////////////////////
	
_generateHTML: function(sMarkId) {

		var s = [];
		if(this.totalPages == this.curPage) {
			s.push('<div class="updownPageNolink c09"><span>��ҳ</span></div>');
		}else{
			if(this.options.isDiv == false) //��ͨmenu��
				s.push('<div style="float:right;" class="c06"><a href="#" class="updownPage" id="$$_next_'+ sMarkId +'">��ҳ</a></div>');
			else	// div�ϵķ�ҳ
				s.push('<div style="float:right;" class="divTxtColr"><a href="#" class="updownPage" id="$$_next_'+ sMarkId +'">��ҳ</a></div>');
		}
		s.push('<div class="pageSelect floatRight">');
		s.push('<div id="$$_textBorder_'+sMarkId+'" class="textBorder">');
		if(this.options.isDiv == false)	//��ͨmenu��
			s.push('<span id="$$_pageText_'+sMarkId+'" class="pageText c06">'+this.curPage+'/'+this.totalPages+'</span>');
		else		// div�ϵķ�ҳ
			s.push('<span id="$$_pageText_'+sMarkId+'" class="pageText divTxtColr">'+this.curPage+'/'+this.totalPages+'</span>');
		s.push('</div>');
		s.push('<div id="$$_opt_'+sMarkId+'" class="opt" style="display:none;">');
			
		for(var i=1;i<=this.totalPages;i++){
			s.push('<a href="#">');
			s.push(i);
			s.push('</a>');
		}
		s.push('</div></div>');

		if(this.curPage == 1){
			s.push('<div class="updownPageNolink c09"><span>��ҳ</span></div>');
		}else{
			if(this.options.isDiv == false) 	//��ͨmenu��
				s.push('<div style="float:right;" class="c06"><a href="#" class="updownPage" id="$$_prev_'+ sMarkId +'">��ҳ</a><div>');
			else		// div�ϵķ�ҳ
				s.push('<div style="float:right;" class="divTxtColr"><a href="#" class="updownPage" id="$$_prev_'+ sMarkId +'">��ҳ</a><div>');
		}
		return s.join('');
	},
	
	_setUIEvent: function(sMarkId){
		//ע��"��ҳ"������¼�
		if(this.curPage != 1){
			var _oPrev = $('$$_prev_'+sMarkId);
			_oPrev.onclick = this._clickPrev.bind(this,sMarkId);
			_oPrev.onmouseover = this.updownPageMouseOvr.bind(this,_oPrev);
			_oPrev.onmouseout = this.updownPageMouseOut.bind(this,_oPrev);
		}
		//ע��"��ҳ"������¼�
		if(this.totalPages != this.curPage){
			var _oNext = $('$$_next_'+sMarkId);
			_oNext.onclick = this._clickNext.bind(this,sMarkId);
			_oNext.onmouseover = this.updownPageMouseOvr.bind(this,_oNext);
			_oNext.onmouseout = this.updownPageMouseOut.bind(this,_oNext);
		}
		
		var _oTextBorder = $('$$_textBorder_'+sMarkId);
		var _oPageText = $('$$_pageText_'+sMarkId);
	    var _opt = $('$$_opt_'+sMarkId);
	    var _optA= _opt.getElementsByTagName("a");
	    
		//��ʼ��������Ŀ��
		this._iTextSpanWidth = _oPageText.offsetWidth;
		_oTextBorder.style.width = this._iTextSpanWidth +18 +"px";
		_opt.style.width = this._iTextSpanWidth +18 +"px";
							
		//�������е�option�¼�
		_opt.onmouseover = function(){
			var _oA = _optA[this.curPage-1];
			_oA.className="";
		}.bind(this);
		
		//�������¼�
		if (isIE){
			_oTextBorder.attachEvent("onclick",function(){
				if (_opt.style.display=="none"){
					//�ر����д򿪵������˵�
					this.closeAllPopup();
					
					var _oChildren = document.body.childNodes;
					var _iChildLen = _oChildren.length;
					var m = null;
					for(var k=_iChildLen-1; k>=0; k-- ){
						if('$$_opt_'+sMarkId == _oChildren[k].id){
							m = _oChildren[k];
							break;
						}
					}
					if(m!=null){
						document.body.removeChild(m);
					}
					document.body.appendChild(_opt); 
					
					_opt.style.display = "block";
					_opt.scrollTop = (this.curPage-1)*14;
					var _oA = _optA[this.curPage-1];
					_oA.className = "ttt";	
					
					var _oPageOffset = Position.cumulativeOffset(_oTextBorder);
					var iPageTopOffset = _oPageOffset[1] - document.documentElement.scrollTop;
					var iPageBottomOffset = document.documentElement.clientHeight - iPageTopOffset;

					if(_opt.offsetHeight > iPageBottomOffset){	
						_opt.style.left = _oPageOffset[0]  + "px";					
						_opt.style.top= _oPageOffset[1] - _opt.offsetHeight +"px";
					}else{
						_opt.style.left = _oPageOffset[0] + "px";	
						_opt.style.top= _oPageOffset[1] + 18 + "px";
					}
					window.event.cancelBubble = true;
				}else{
					_opt.style.display = "none";
				}
				return false;
			}.bind(this));
			_oTextBorder.attachEvent("onmouseover",this.textBorderMouseOvr.bind(this,_oTextBorder));
			_oTextBorder.attachEvent("onmouseout",this.textBorderMouseOut.bind(this,_oTextBorder,sMarkId));

			for (var i=0,_a;_a=_optA[i];i++){
 				_a.onclick = this.clickPageNumber.bind(this,sMarkId,_a.innerHTML,_opt,_oTextBorder);
			}
			window.document.attachEvent("onclick",function(){
				_opt.style.display = "none";
				_oTextBorder.className = "textBorder";
				_oTextBorder.style.width = this._iTextSpanWidth +18 +"px";
			}.bind(this));
			
		}else{		//firefox
			_oTextBorder.addEventListener("click",function(oEvent){		
				if (_opt.style.display=="none"){
					//�ر����д򿪵������˵�
					this.closeAllPopup();
					var _oChildren = document.body.childNodes;
					var _iChildLen = _oChildren.length;
					var m = null;
					for(var k=_iChildLen-1; k>=0; k-- ){
						if('$$_opt_'+sMarkId == _oChildren[k].id){
							m = _oChildren[k];
							break;
						}
					}
					if(m!=null){
						document.body.removeChild(m);
					}
					document.body.appendChild(_opt);  
					
					_opt.style.display = "block";
					_opt.scrollTop = (this.curPage-1)*14;
					var _oA = _optA[this.curPage-1];
					_oA.className = "ttt";		
					
					var _oPageOffset = Position.cumulativeOffset(_oTextBorder);
					var iPageTopOffset = _oPageOffset[1] - document.documentElement.scrollTop;
					var iPageBottomOffset = document.documentElement.clientHeight - iPageTopOffset;

					if(_opt.offsetHeight > iPageBottomOffset){	
						_opt.style.left = _oPageOffset[0]  + "px";					
						_opt.style.top= _oPageOffset[1] - _opt.offsetHeight +"px";
					}else{
						_opt.style.left = _oPageOffset[0]  + "px";	
						_opt.style.top= _oPageOffset[1] + 18 + "px";
					}
					oEvent.stopPropagation();
				}else{
					_opt.style.display = "none";
				}
				return false;
			}.bind(this),false);
			
			_oTextBorder.addEventListener("mouseover",this.textBorderMouseOvr.bind(this,_oTextBorder),false);
			_oTextBorder.addEventListener("mouseout",this.textBorderMouseOut.bind(this,_oTextBorder,sMarkId),false);
			
			for (var i=0,_a;_a=_optA[i];i++ ){
				_a.onclick = this.clickPageNumber.bind(this,sMarkId,_a.innerHTML,_opt,_oTextBorder);
			}
			window.document.addEventListener("click",function(){
				_opt.style.display = "none";
				_oTextBorder.className = "textBorder";
				_oTextBorder.style.width = this._iTextSpanWidth +18 +"px";
			}.bind(this),false);	
		} 
		return false;
	},
	
	_clickPrev: function(sMarkId){
		window.location.hash='pn'+(this.curPage-1);
		if(sMarkId != null && this.beforeIDArray!=null){			
			for(var i=0;i<this.beforeIDArray.length;i++){
				if(this.beforeIDArray[i] == sMarkId){
					this.options.beforePrev();
				}
			}
		}
		this.closeAllPopup();
		this.prevPage();
		return false;
	},
	
	_clickNext: function(sMarkId){
		window.location.hash='pn'+(this.curPage+1);
		if(sMarkId != null && this.beforeIDArray!=null){			
			for(var i=0;i<this.beforeIDArray.length;i++){
				if(this.beforeIDArray[i] == sMarkId){
					this.options.beforeNext();
				}
			}
		}
		this.closeAllPopup();
		this.nextPage();
		return false;
	},
	
	closeAllPopup: function(){
		var _iMarkLen = this.markIDArray.length;
		for(var i=0; i<_iMarkLen; i++){
			var markId = this.markIDArray[i];
			var _opt = $('$$_opt_'+markId);
			_opt.style.display="none";
		}
	},
	
	clickPageNumber: function(sMarkId, iIndex, oOpt, oTextBorder){
		window.location.hash='pn'+iIndex;
	 	oOpt.style.display = "none";
		oTextBorder.className="textBorder";
		if(iIndex == this.curPage){
			return false;
		}
		if(sMarkId != null && this.beforeIDArray!=null){			
			for(var i=0;i<this.beforeIDArray.length;i++){
				if(this.beforeIDArray[i] == sMarkId){
					this.options.beforeChange();
				}
			}
		}
		this.goToPage(iIndex);
		return false;
	},
	
	textBorderMouseOvr: function(oElem){
		oElem.className = "textBorderMouseOvr";
		oElem.style.width = this._iTextSpanWidth +16 +"px";
	},
	
	textBorderMouseOut: function(oElem, sMarkId){
		var _opt = $('$$_opt_'+sMarkId);
		if (_opt.style.display=="none"){
			oElem.className = "textBorder";
			oElem.style.width = this._iTextSpanWidth +18 +"px";
		}
	},
		
	updownPageMouseOvr: function(oElem){
		oElem.className = "updownPageMouseOvr";
	},
	updownPageMouseOut: function(oElem){
		oElem.className = "updownPage";
	},
	
	pirntData: function(){
		var s=[];
		s+=this.options.totalSize + "-------------\n";
		for(var i=0; i<this.options.totalSize; i++) {
			if((i+1)%9 ==0 && i!=0)
				s +="\n";
			if(undefined == this.cacheData[i]  ||  null == this.cacheData[i])
				s+= "["+i+ "]- # " ;
			else
				s += "<"+i + ">- "+this.cacheData[i].title + " "  ;
	
		}
		alert(s);
	}
}
/*
* NetEase DateTime
* ���⺯��
*   NetEase.DateTime.isDate �ж��Ƿ�Ϊʱ��
*   NetEase.DateTime.compareDates �Ƚ�����ʱ��
*   NetEase.DateTime.formatDate  ��ʽ��ʱ��
*   NetEase.DateTime.formatRecent  ��ʽ�����ʱ��
*   NetEase.DateTime.formatRecentDate  ��ʽ�����ʱ�䣬��������������ͬformatDate        
*/
// ------------------------------------------------------------------
// These functions use the same 'format' strings as the 
// java.text.SimpleDateFormat class, with minor exceptions.
// The format string consists of the following abbreviations:
// 
// Field        | Full Form          | Short Form
// -------------+--------------------+-----------------------
// Year         | yyyy (4 digits)    | yy (2 digits), y (2 or 4 digits)
// Month        | MMM (name or abbr.)| MM (2 digits), M (1 or 2 digits)
//              | NNN (abbr.)        |
// Day of Month | dd (2 digits)      | d (1 or 2 digits)
// Day of Week  | EE (name)          | E (abbr)
// Hour (1-12)  | hh (2 digits)      | h (1 or 2 digits)
// Hour (0-23)  | HH (2 digits)      | H (1 or 2 digits)
// Hour (0-11)  | KK (2 digits)      | K (1 or 2 digits)
// Hour (1-24)  | kk (2 digits)      | k (1 or 2 digits)
// Minute       | mm (2 digits)      | m (1 or 2 digits)
// Second       | ss (2 digits)      | s (1 or 2 digits)
// AM/PM        | a                  |
//
// NOTE THE DIFFERENCE BETWEEN MM and mm! Month=MM, not mm!
// Examples:
//  "MMM d, y" matches: January 01, 2000
//                      Dec 1, 1900
//                      Nov 20, 00
//  "M/d/yy"   matches: 01/20/00
//                      9/2/00
//  "MMM dd, yyyy hh:mm:ssa" matches: "January 01, 2000 12:30:45AM"
// ------------------------------------------------------------------

if (NetEase==undefined){
	var NetEase={};
}

if (NetEase.DateTime==undefined){
	NetEase.DateTime={};
}

NetEase.DateTime.MONTH_NAMES=new Array('January','February','March','April','May','June','July','August','September','October','November','December','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
NetEase.DateTime.DAY_NAMES=new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sun','Mon','Tue','Wed','Thu','Fri','Sat');
NetEase.DateTime.LZ = function(x) {return(x<0||x>9?"":"0")+x}

// ------------------------------------------------------------------
// NetEase.DateTime.isDate ( date_string, format_string )
// Returns true if date string matches format of format string and
// is a valid date. Else returns false.
// It is recommended that you trim whitespace around the value before
// passing it to this function, as whitespace is NOT ignored!
// ------------------------------------------------------------------
NetEase.DateTime.isDate = function(val,format) {
	var date=NetEase.DateTime.getDateFromFormat(val,format);
	if (date==0) { return false; }
	return true;
}

// -------------------------------------------------------------------
// NetEase.DateTime.compareDates(date1,date1format,date2,date2format)
//   Compare two date strings to see which is greater.
//   Returns:
//   1 if date1 is greater than date2
//   0 if date2 is greater than date1 of if they are the same
//  -1 if either of the dates is in an invalid format
// -------------------------------------------------------------------
NetEase.DateTime.compareDates = function(date1,dateformat1,date2,dateformat2) {
	var d1=NetEase.DateTime.getDateFromFormat(date1,dateformat1);
	var d2=NetEase.DateTime.getDateFromFormat(date2,dateformat2);
	if (d1==0 || d2==0) {
		return -1;
		}
	else if (d1 > d2) {
		return 1;
		}
	return 0;
}

// ------------------------------------------------------------------
// NetEase.DateTime.formatDate (date_mill_seconds, format)
// Returns a date string in the output format specified.
// The format string uses the same abbreviations as in NetEase.DateTime.getDateFromFormat()
// ------------------------------------------------------------------
/**
 * ע�⣺YYYY��ʾ������ݲ���ʾ��ǰ����������ʾ��ע����yyyy����
 */
NetEase.DateTime.formatDate = function(_time,format) {
	var date = new Date(_time);
	format=format+"";
	var result="";
	var i_format=0;
	var c="";
	var token="";
	var lastToken = "";
	var y=date.getYear()+"";
	var M=date.getMonth()+1;
	var d=date.getDate();
	var E=date.getDay();
	var H=date.getHours();
	var m=date.getMinutes();
	var s=date.getSeconds();
	var yyyy,yy,MMM,MM,dd,hh,h,mm,ss,ampm,HH,H,KK,K,kk,k;
	// Convert real date parts into formatted versions
	var value=new Object();
	if (y.length < 4) {y=""+(y-0+1900);}
	value["y"]=""+y;
	value["yyyy"]=y;
	value["yy"]=y.substring(2,4);
	var currDate = new Date();
	if (currDate.getFullYear() == date.getFullYear()) {
		value["Y"]="";
		value["YYYY"]="";
		value["YY"]="";
	} else {
		value["Y"]=""+y;
		value["YYYY"]=y;
		value["YY"]=y.substring(2,4);
	}
	value["M"]=M;
	value["MM"]=NetEase.DateTime.LZ(M);
	value["MMM"]=NetEase.DateTime.MONTH_NAMES[M-1];
	value["NNN"]=NetEase.DateTime.MONTH_NAMES[M+11];
	value["d"]=d;
	value["dd"]=NetEase.DateTime.LZ(d);
	value["E"]=NetEase.DateTime.DAY_NAMES[E+7];
	value["EE"]=NetEase.DateTime.DAY_NAMES[E];
	value["H"]=H;
	value["HH"]=NetEase.DateTime.LZ(H);
	if (H==0){value["h"]=12;}
	else if (H>12){value["h"]=H-12;}
	else {value["h"]=H;}
	value["hh"]=NetEase.DateTime.LZ(value["h"]);
	if (H>11){value["K"]=H-12;} else {value["K"]=H;}
	value["k"]=H+1;
	value["KK"]=NetEase.DateTime.LZ(value["K"]);
	value["kk"]=NetEase.DateTime.LZ(value["k"]);
	if (H > 11) { value["a"]="PM"; }
	else { value["a"]="AM"; }
	value["m"]=m;
	value["mm"]=NetEase.DateTime.LZ(m);
	value["s"]=s;
	value["ss"]=NetEase.DateTime.LZ(s);
	while (i_format < format.length) {
		c=format.charAt(i_format);
		token="";
		while ((format.charAt(i_format)==c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
		}
		if (value[token] != null) {
			result=result + value[token];
		}
		else { 
			if (!((lastToken == "YYYY" || lastToken == "YY" || lastToken == "Y") && value[lastToken] == ""))
				result=result + token; 
		}
		lastToken = token;
	}
	return result;
}
	
// ------------------------------------------------------------------
// Utility functions for parsing in NetEase.DateTime.getDateFromFormat()
// ------------------------------------------------------------------
NetEase.DateTime._isInteger = function(val) {
	var digits="1234567890";
	for (var i=0; i < val.length; i++) {
		if (digits.indexOf(val.charAt(i))==-1) { return false; }
		}
	return true;
}

NetEase.DateTime._getInt = function(str,i,minlength,maxlength) {
	for (var x=maxlength; x>=minlength; x--) {
		var token=str.substring(i,i+x);
		if (token.length < minlength) { return null; }
		if (NetEase.DateTime._isInteger(token)) { return token; }
		}
	return null;
}
	
// ------------------------------------------------------------------
// NetEase.DateTime.getDateFromFormat( date_string , format_string )
//
// This function takes a date string and a format string. It matches
// If the date string matches the format string, it returns the 
// getTime() of the date. If it does not match, it returns 0.
// ------------------------------------------------------------------
NetEase.DateTime.getDateFromFormat = function(val,format) {
	val=val+"";
	format=format+"";
	var i_val=0;
	var i_format=0;
	var c="";
	var token="";
	var token2="";
	var x,y;
	var now=new Date();
	var year=now.getYear();
	var month=now.getMonth()+1;
	var date=1;
	var hh=now.getHours();
	var mm=now.getMinutes();
	var ss=now.getSeconds();
	var ampm="";
	
	while (i_format < format.length) {
		// Get next token from format string
		c=format.charAt(i_format);
		token="";
		while ((format.charAt(i_format)==c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
			}
		// Extract contents of value based on format token
		if (token=="yyyy" || token=="yy" || token=="y") {
			if (token=="yyyy") { x=4;y=4; }
			if (token=="yy")   { x=2;y=2; }
			if (token=="y")    { x=2;y=4; }
			year=NetEase.DateTime._getInt(val,i_val,x,y);
			if (year==null) { return 0; }
			i_val += year.length;
			if (year.length==2) {
				if (year > 70) { year=1900+(year-0); }
				else { year=2000+(year-0); }
				}
			}
		else if (token=="MMM"||token=="NNN"){
			month=0;
			for (var i=0; i<NetEase.DateTime.MONTH_NAMES.length; i++) {
				var month_name=NetEase.DateTime.MONTH_NAMES[i];
				if (val.substring(i_val,i_val+month_name.length).toLowerCase()==month_name.toLowerCase()) {
					if (token=="MMM"||(token=="NNN"&&i>11)) {
						month=i+1;
						if (month>12) { month -= 12; }
						i_val += month_name.length;
						break;
						}
					}
				}
			if ((month < 1)||(month>12)){return 0;}
			}
		else if (token=="EE"||token=="E"){
			for (var i=0; i<NetEase.DateTime.DAY_NAMES.length; i++) {
				var day_name=NetEase.DateTime.DAY_NAMES[i];
				if (val.substring(i_val,i_val+day_name.length).toLowerCase()==day_name.toLowerCase()) {
					i_val += day_name.length;
					break;
					}
				}
			}
		else if (token=="MM"||token=="M") {
			month=NetEase.DateTime._getInt(val,i_val,token.length,2);
			if(month==null||(month<1)||(month>12)){return 0;}
			i_val+=month.length;}
		else if (token=="dd"||token=="d") {
			date=NetEase.DateTime._getInt(val,i_val,token.length,2);
			if(date==null||(date<1)||(date>31)){return 0;}
			i_val+=date.length;}
		else if (token=="hh"||token=="h") {
			hh=NetEase.DateTime._getInt(val,i_val,token.length,2);
			if(hh==null||(hh<1)||(hh>12)){return 0;}
			i_val+=hh.length;}
		else if (token=="HH"||token=="H") {
			hh=NetEase.DateTime._getInt(val,i_val,token.length,2);
			if(hh==null||(hh<0)||(hh>23)){return 0;}
			i_val+=hh.length;}
		else if (token=="KK"||token=="K") {
			hh=NetEase.DateTime._getInt(val,i_val,token.length,2);
			if(hh==null||(hh<0)||(hh>11)){return 0;}
			i_val+=hh.length;}
		else if (token=="kk"||token=="k") {
			hh=NetEase.DateTime._getInt(val,i_val,token.length,2);
			if(hh==null||(hh<1)||(hh>24)){return 0;}
			i_val+=hh.length;hh--;}
		else if (token=="mm"||token=="m") {
			mm=NetEase.DateTime._getInt(val,i_val,token.length,2);
			if(mm==null||(mm<0)||(mm>59)){return 0;}
			i_val+=mm.length;}
		else if (token=="ss"||token=="s") {
			ss=NetEase.DateTime._getInt(val,i_val,token.length,2);
			if(ss==null||(ss<0)||(ss>59)){return 0;}
			i_val+=ss.length;}
		else if (token=="a") {
			if (val.substring(i_val,i_val+2).toLowerCase()=="am") {ampm="AM";}
			else if (val.substring(i_val,i_val+2).toLowerCase()=="pm") {ampm="PM";}
			else {return 0;}
			i_val+=2;}
		else {
			if (val.substring(i_val,i_val+token.length)!=token) {return 0;}
			else {i_val+=token.length;}
			}
		}
	// If there are any trailing characters left in the value, it doesn't match
	if (i_val != val.length) { return 0; }
	// Is date valid for month?
	if (month==2) {
		// Check for leap year
		if ( ( (year%4==0)&&(year%100 != 0) ) || (year%400==0) ) { // leap year
			if (date > 29){ return 0; }
			}
		else { if (date > 28) { return 0; } }
		}
	if ((month==4)||(month==6)||(month==9)||(month==11)) {
		if (date > 30) { return 0; }
		}
	// Correct hours value
	if (hh<12 && ampm=="PM") { hh=hh-0+12; }
	else if (hh>11 && ampm=="AM") { hh-=12; }
	var newdate=new Date(year,month-1,date,hh,mm,ss);
	return newdate.getTime();
}

// ------------------------------------------------------------------
// NetEase.DateTime.parseDate( date_string [, prefer_euro_format] )
//
// This function takes a date string and tries to match it to a
// number of possible date formats to get the value. It will try to
// match against the following international formats, in this order:
// y-M-d   MMM d, y   MMM d,y   y-MMM-d   d-MMM-y  MMM d
// M/d/y   M-d-y      M.d.y     MMM-d     M/d      M-d
// d/M/y   d-M-y      d.M.y     d-MMM     d/M      d-M
// A second argument may be passed to instruct the method to search
// for formats like d/M/y (european format) before M/d/y (American).
// Returns a Date object or null if no patterns match.
// ------------------------------------------------------------------
NetEase.DateTime.parseDate = function(val) {
	var preferEuro=(arguments.length==2)?arguments[1]:false;
	generalFormats=new Array('y-M-d','MMM d, y','MMM d,y','y-MMM-d','d-MMM-y','MMM d');
	monthFirst=new Array('M/d/y','M-d-y','M.d.y','MMM-d','M/d','M-d');
	dateFirst =new Array('d/M/y','d-M-y','d.M.y','d-MMM','d/M','d-M');
	var checkList=new Array('generalFormats',preferEuro?'dateFirst':'monthFirst',preferEuro?'monthFirst':'dateFirst');
	var d=null;
	for (var i=0; i<checkList.length; i++) {
		var l=window[checkList[i]];
		for (var j=0; j<l.length; j++) {
			d=NetEase.DateTime.getDateFromFormat(val,l[j]);
			if (d!=0) { return new Date(d); }
			}
		}
	return null;
}
	

/** 
 * extend by bezy@2006-6-23
 */
NetEase.DateTime.Min1 = 1000*60;
NetEase.DateTime.Min5 = 1000*60*5;
NetEase.DateTime.Min10 = NetEase.DateTime.Min5 * 2;
NetEase.DateTime.Min15 = NetEase.DateTime.Min5 * 3;
NetEase.DateTime.Min30 = NetEase.DateTime.Min10 * 3;
NetEase.DateTime.Min45 = NetEase.DateTime.Min15 * 3;
NetEase.DateTime.Hour1 = NetEase.DateTime.Min30 * 2;
NetEase.DateTime.Hour1Min30 = NetEase.DateTime.Min45 * 2;
NetEase.DateTime.Hour2 = NetEase.DateTime.Hour1 * 2;
NetEase.DateTime.Hour2Min30 = NetEase.DateTime.Min30 * 5;
NetEase.DateTime.Hour3 = NetEase.DateTime.Hour1 *3;
NetEase.DateTime.Hour6 = NetEase.DateTime.Hour3 * 2;
NetEase.DateTime.Hour12 = NetEase.DateTime.Hour6 * 2;
NetEase.DateTime.Day1 = NetEase.DateTime.Hour12 * 2;
NetEase.DateTime.Day2 = NetEase.DateTime.Day1 * 2;
NetEase.DateTime.Day3 = NetEase.DateTime.Day1 * 3;
NetEase.DateTime.Day4 = NetEase.DateTime.Day2 * 2;

NetEase.DateTime.formatRecent = function(_time,prefix,suffix){
	var pastDate = new Date(_time);
	var pastTime = pastDate.getTime();
	var pastYear = pastDate.getFullYear();
	var pastMonth = pastDate.getMonth();
	var pastDay = pastDate.getDate();
	var pastDateZero = new Date(pastYear,pastMonth,pastDay);
	var pastTimeZero = pastDateZero.getTime(); //0���ʱ��
	var nowDate = new Date();
	var nowTime = nowDate.getTime();
	var nowYear = nowDate.getFullYear();
	var nowMonth = nowDate.getMonth();
	var nowDay = nowDate.getDate();
	var nowDateZero = new Date(nowYear,nowMonth,nowDay);
	var nowTimeZero = pastDateZero.getTime(); //0���ʱ��
	var timeDiff = nowTime-pastTime;
	var timeDiffZero = nowTimeZero - pastTimeZero;
	if(!prefix)
		prefix="";
	if(!suffix)
		suffix="";
	if(timeDiffZero >= NetEase.DateTime.Day1){
		if(timeDiffZero < NetEase.DateTime.Day2)
			return prefix+"����"+suffix;
		if (timeDiff < NetEase.DateTime.Day3)
			return prefix+"ǰ��"+suffix;
		if (timeDiff < NetEase.DateTime.Day4)
			return prefix+"3��ǰ"+suffix;
	}	
	if(timeDiff<=NetEase.DateTime.Min5)	
		return prefix+"1����ǰ"+suffix;
	if(timeDiff<=NetEase.DateTime.Min10)	
		return prefix+"5����ǰ"+suffix;
	if (timeDiff<=NetEase.DateTime.Min15)
		return prefix+"10����ǰ"+suffix;
	if (timeDiff<=NetEase.DateTime.Min30)
		return prefix+"1����ǰ"+suffix;
	if(timeDiff<=NetEase.DateTime.Min45)
		return prefix+"��Сʱǰ"+suffix;
	if(timeDiff<=NetEase.DateTime.Hour1)
		return prefix+"45����ǰ"+suffix;
	if(timeDiff<=NetEase.DateTime.Hour1Min30)
		return prefix+"1Сʱǰ"+suffix;
	if(timeDiff<=NetEase.DateTime.Hour2)
		return prefix+"1.5Сʱǰ"+suffix;
	if(timeDiff<=NetEase.DateTime.Hour2Min30)
		return prefix+"2Сʱǰ"+suffix;
	if (timeDiff<=NetEase.DateTime.Hour3)
		return prefix+"2.5Сʱǰ"+suffix;
	if (timeDiff<=NetEase.DateTime.Hour6)
		return prefix+"3Сʱǰ"+suffix;
	if (timeDiff<=NetEase.DateTime.Hour12)
		return prefix+"6Сʱǰ"+suffix;
	if (timeDiff<=NetEase.DateTime.Day1)
		return prefix+"12Сʱǰ"+suffix;
	return "";	
}

NetEase.DateTime.formatRecentDate = function(_time,format){
	var pastDate = new Date(_time);
	var pastTime = pastDate.getTime();
	var nowDate = new Date();
	var nowTime = nowDate.getTime();
	var timeDiff = nowTime-pastTime;
	if(timeDiff<=NetEase.DateTime.Min5)	
		return "1����ǰ";
	if(timeDiff<=NetEase.DateTime.Min10)	
		return "5����ǰ";
	if (timeDiff<=NetEase.DateTime.Min15)
		return "10����ǰ";
	if (timeDiff<=NetEase.DateTime.Min30)
		return "1����ǰ";
	if(timeDiff<=NetEase.DateTime.Min45)
		return "��Сʱǰ";
	if(timeDiff<=NetEase.DateTime.Hour1)
		return "45����ǰ";
	if(timeDiff<=NetEase.DateTime.Hour1Min30)
		return "1Сʱǰ";
	if(timeDiff<=NetEase.DateTime.Hour2)
		return "1.5Сʱǰ";
	if(timeDiff<=NetEase.DateTime.Hour2Min30)
		return "2Сʱǰ";
	if (timeDiff<=NetEase.DateTime.Hour3)
		return "2.5Сʱǰ";
	if (timeDiff<=NetEase.DateTime.Hour6)
		return "3Сʱǰ";
	if (timeDiff<=NetEase.DateTime.Hour12)
		return "6Сʱǰ";
	if (timeDiff<=NetEase.DateTime.Day1)
		return "12Сʱǰ";		
	return NetEase.DateTime.formatDate(_time,format);		
}
/*
* NetEase SimplePageLayer һ���򵥵Ĳ���������Ժ��û�����PageLayer
*/
NetEase.SimplePageLayer = Class.create();
NetEase.SimplePageLayer.prototype =  {
	initialize: function(observerId){
		this.observer = (observerId == null)?document:$(observerId);
		this.pageLayerArray = [];
		this.observeHandler = this._observeHandler.bind(this);
		Event.observe(this.observer,'click',this.observeHandler);		
	},
	
	destory: function(){
		Event.stopObserving(this.observer,'click',this.observeHandler);				
		this.pageLayerArray  = null;
	},
	
	addPageLayer: function(id,openId,menuId){
		var _layer = {};
		_layer.id = id;
		_layer.options = Object.extend(
			{
				openHandler: Prototype.emptyFunction,
				closeHandler: Prototype.emptyFunction,
				forceClose:false,
				isOpen: false
			}, arguments[3] || {}			
		);
		_layer.openHandler = this._openHandler.bind(this,_layer,"open");
		_layer.menuHandler = this._openHandler.bind(this,_layer,"menu");
		_layer.closeHandler = this._closeHandler.bind(this,_layer);
		_layer.blockCloseHandler = this._blockCloseHandler.bind(this,_layer);
		if(openId != null){
			_layer.opener= $(openId);
			Event.observe(_layer.opener,'click',_layer.openHandler);
		}
		if(menuId != null){
			_layer.menuer= $(menuId);
			Event.observe(_layer.menuer,'mouseover',_layer.menuHandler);
			Event.observe(_layer.menuer,'mouseout',_layer.closeHandler);
			Event.observe(_layer.id,'mouseover',_layer.blockCloseHandler);
			Event.observe(_layer.id,'mouseout',_layer.closeHandler);
		}
		this.pageLayerArray.push(_layer);
	},
	
	removePageLayer: function(id){
		this.pageLayerArray = this.pageLayerArray.reject(
				function(e){
					if(e.id == id){
						if(e.opener!=null)
							Event.stopObserving(e.opener,'click',e.openHandler);						
						if(e.menuer!=null){
							Event.stopObserving(e.menuer,'mouseover',e.menuHandler);
							Event.stopObserving(e.menuer,'mouseout',e.closeHandler);
							Event.stopObserving(e.id,'mouseover',e.blockCloseHandler);
							Event.stopObserving(e.id,'mouseout',e.closeHandler);
						}						
						return true;
					}
					return false;
				}.bind(this)
		);	
	},
	
	_openHandler: function(layer,type,event){
		event = event || window.event;		
		if(type=="menu"){
			Event.stop(event);
			layer.blockClose = true;
			this._observeHandler();
			if(!layer.options.isOpen){
				layer.options.isOpen = true;
				layer.options.openHandler(layer);
				return;		
			}
		}else{
			layer.stopEvent = true;
			if(layer.options.isOpen){
				layer.options.isOpen = false;
				layer.options.closeHandler(layer);			
			}else{
				layer.options.isOpen = true;
				layer.options.openHandler(layer);		
			}
		}
	},
	
	_blockCloseHandler:function(layer){
		layer.blockClose = true;
	},
	
	_closeHandler:function(layer){
		layer.blockClose = false;
		window.setTimeout(this._observeHandler.bind(this),100);
	},
	
	_observeHandler: function(){
		var _layer;
		for(var i=0;i<this.pageLayerArray.length;i++){
			_layer = this.pageLayerArray[i];
			if(_layer.blockClose) continue;
			if(_layer.stopEvent == true && !_layer.options.forceClose){
				_layer.stopEvent = false;
				continue;
			}
			if(_layer.options.isOpen || _layer.options.forceClose){
				_layer.options.isOpen = false;
				_layer.options.closeHandler(_layer);				
			}
		}
	}		
}
/**************************************************************
*				163 blog html editor					   	  *
*                                                             *
* Written by:  zhujingbo &&  zhuyiwen                         *
* Important: to use this script don't                         *
*            remove these comments                            *
* Version 2.0 (MSIE 6.0 above,Firefox1.0,Netscape.)           *
* Created Date: 2007-01-04									  *
* Copyright��1997-2006 NetEase.com Inc. All rights reserved.  *
**************************************************************/

/** 
 * @fileoverview 
 * ��־�༭�ĸ��ı��༭�����ṩ��������
 * ����ģʽ���������ģʽ�ʹ���ģʽ
 * 
 * @author  zhujingbo (zhujingbo@corp.netease.com) &&  zhuyiwen@(zhuyiwen@corp.netease.com)
 * @version 2.0 
 * @requires  utils.js
 * @requires  prototype.js
 * @requires  Portrait.js
 * @requires  ColorPanel.js
 * @see		  
 */
 
if (NECtrl==undefined){
	var NECtrl={};
}

/**
 * NECtrl.HtmlEditor Class
 *
 * @class ��־���ı��༭��
 */
NECtrl.HtmlEditor = Class.create();


/**
 * ��̬����, ħ������ͼ��ĵ�ַǰ׺
 * @final
 * @private
 * @type String
 */
NECtrl.HtmlEditor._sPortraitPrefix = "http://st.blog.163.com/style/common/htmlEditor/portrait/";
/**
 * ȫ�ֱ���, �༭������ʵ������, ���ڴ��ͬһҳ���ж�����ı����۱༭����ʵ��
 * @type NECtrl.HtmlEditor
 */
NECtrl.HtmlEditor.gEditorList = {};
/**
 * ȫ�ֺ���, �༭��������������һ���༭��
 * @param 	{String} sParentId
 * 			�༭��ʵ����Ӧ��id
 * @param 	{NECtrl.HtmlEditor} oEditor
 * 			�༭��ʵ������
 * @return 	{void}
 */
NECtrl.HtmlEditor.addEditor = function (sParentId, oEditor) {
	NECtrl.HtmlEditor.gEditorList[sParentId] = oEditor;
}
/**
 * ȫ�ֺ���, ����id��ȡ�༭��ʵ��
 * @param 	{String} sParentId
 * 			�༭��ʵ����Ӧ��id
 * @return	{NECtrl.HtmlEditor} oEditor
 * 			�༭��ʵ������
 */
NECtrl.HtmlEditor.getEditor = function (sParentId) {
	return NECtrl.HtmlEditor.gEditorList[sParentId];
}






 
NECtrl.HtmlEditor.prototype = {
	/**
	 * HtmlEditor�๹�캯�� ��ʼ��HtmlEditor����Ԥ�����
	 * @constructor
	 * @param 	{String}	sParentId  		HtmlEditor�����Ӧ��id
	 * @param	{String} 	sEditorDivId	��HtmlEditor���������ҳ��Ԫ�ص�id
	 * @return 	{NECtrl.HtmlEditor} 		HtmlEditor����
	 * @see 	#_load
	 */
	initialize: function(sParentId, sDivEditorId){
		/**
		 * ��ʼ������ѡ��
		 * @private
		 * @type	Object
		 */
		this._oOptions = Object.extend({	
			sEditorSrc		: "blank.html",	      	// iframe�༭����Դ�ļ���Ĭ����ʾ�հ�ҳ��
			sCurrMode		: "Design",				// ���ֱ༭ģʽ��Design,Html
			sStyle			: "http://st.blog.163.com/style/1/", 	// �༭��Ӧ�õķ��
			bSimpleEditor	: false,		      	// �Ƿ��Ǽ򵥱༭����ʽ�����������۱༭��
			bNoCutCopyPaste	: false,				// �Ƿ���Ҫ����ճ���͸��ƹ���
			bDisabled		: false,				// �Ƿ���ñ༭��
			iWidth			: 0,					// �༭����ȣ�0��ʾ��ȸ���������Ĵ�С�Զ���ȡ��
													// ������iframe�����⣬�е�ʱ���޷��Զ��õ����ֵ�����Ա�Ҫ��ʱ����Դ���ָ���Ŀ��	
			iHeight			: 280,					// �༭���߶ȣ���λ����
			iMaxLen			: 65535,				// �༭������������������
			sObjName		: null,					// �༭��ʵ��������,��ʵ��ָ���js���������
			bFriend         : true,       			// �Ƿ��ǲ����ĺ���
			oToolbarArray	: null,					// �༭��Toolbar���Զ���,�μ�����this._oToolbarArray��ע��
													// ������1��ʾʹ�øÿؼ�, 0��ʾ��ʹ�øÿؼ�	
			fnAfterLoad		: null,					// ������ɺ���Ҫ�ص����û��Զ��庯��
			oAfterLoadParams: null,					// ������ɺ���Ҫ�ص����û��Զ��庯���Ĳ���
			fnPreview		: null,					// Ԥ������
			fnHideDiv		: null,					// ����༭��iframeʱ, ��Ҫ���ص�Div��Ӧ�ĺ���
			oHideDivParmas	: null					// ��Div�����Ĳ���
		}, arguments[2] || {});	
		/**
		 * HtmlEditor�����Ӧ��id
		 * @private
		 * @type	String
		 */	
		this._sParentId = sParentId;
		/**
		 * ��HtmlEditor���������ҳ��Ԫ�ص�id
		 * @private
		 * @type 	String
		 */
		this._sDivEditorId = sDivEditorId;
		/**
		 * �༭�����ֵ�ҳ������trimpathģ�����
		 * @private
		 * @type 	Object
		 */
		this._oTemplate;
		/**
		 * �����Ƿ�����к�����
		 * @private
		 * @type	Boolean
		 */
		this._bHarm = false;
		/**
		 * �����Ƿ񳬹������������
		 * @private
		 * @type 	Boolean
		 */
		this._bExceedMaxLen = false;
		/**
		 * ���ģʽ�ı༭����Ӧ��iframe����
		 * @private
		 * @type	Object
		 */
		this._oFrameElem = null;
		/**
		 * ����ѡ��˵�
		 * @private
		 * @type 	Object
		 */
		this._oMenuFontFace = null;
		/**
		 * �ֺ���ѡ��˵�
		 * @private
		 * @type 	Object
		 */
		this._oMenuFontSize = null;
		/**
		 * ǰ������ɫѡ��˵�
		 * @private
		 * @type 	Object
		 */
		this._oMenuForeColor = null;
		/**
		 * ����ɫѡ��˵�
		 * @private
		 * @type 	Object
		 */
		this._oMenuPortrait = null;
		/**
		 * ���ֶ��뷽ʽѡ��˵�
		 * @private
		 * @type 	Object
		 */
		this._oMenuAlign = null;
		/**
		 * �����б�����ѡ��˵�
		 * @private
		 * @type 	Object
		 */
		this._oMenuList = null;
		/**
		 * ��ǰ�������б����µİ�ť
		 * @private
		 * @type 	Object
		 */
		this._oCurrentToolbarClk = null;
		/**
		 * ���Ʊ༭��toolbar����ʾ��ť
		 * @private
		 * @type	Array
		 * [0] : ����
		 * [1] : ����
		 * [2] : ����
		 * [3] : ����
		 * [4] : ճ��
		 * [5] : �ָ���1
		 * [6] : ����
		 * [7] : �ֺ�
		 * [8] : �Ӵ�
		 * [9] : б��
		 * [10]: �»���
		 * [11]: ����
		 * [12]: ��� 
		 * [13]: ��������
		 * [14]: ��������
		 * [15]: ���仯
		 * [16]: �ָ���2
		 * [17]: ������ɫ
		 * [18]: ������ɫ
		 * [19]: ����
		 * [20]: ������
		 * [21]: �ָ���3
		 * [22]: ������
		 * [23]: ����ͼƬ
		 * [24]: �����ý��
		 * [25]: ħ������
		 * [26]: �ָ���4
		 * [27]: �����ʽ
		 */
		this._oToolbarArray = this._oOptions.oToolbarArray;

		/**
		 * �༭��ʵ��������,��ʵ��ָ���js���������
		 * @type	String
		 */
		this.objectName = this._oOptions.sObjName;
		/**
		 * ħ�����������
		 * @type	NECtrl.Portrait
		 */
		this.portrait = null;
		/**
		 * ��ɫѡ����������
		 * @type	NECtrl.ColorPanel
		 */
		this.colorpanel = null;
		/**
		 * iframe�༭�����󣬶�ӦDesign�༭ģʽ,Ϊһ��iframe����
		 * @type	Object
		 */
		this.designEditor			= null;
		/**
		 * textarea�༭�����󣬶�ӦHtml�༭ģʽ,Ϊһ��textarea����
		 * @type 	Object
		 */
		this.sourceEditor			= null;
		
		// ���ر༭��
		this._load();

		return this;
	},
	/**
	 * ���ر༭��
	 * @private
	 * @return 	{Void}
	 * @see 	#_load
	 */
	_load: function(){
		// ����jstģ��
		if (this._oTemplate == null)
			this._oTemplate = createJSTAndParse("htmleditor_jst", NECtrl.HtmlEditor._sHETemplateJst);
		// ����Toolbar������ʾ�Ĳ���
		if(this._oToolbarArray == null){
			// ��ʼ��Toolbar��ʾ����
			this._oToolbarArray = [];
			for(var i=0; i<28; i++)
				this._oToolbarArray[i] = 0;
			if(this._oOptions.bNoCutCopyPaste == false) {
				if(this._oOptions.bFriend == true) {
					this._oToolbarArray[0] = 1;
					this._oToolbarArray[1] = 1;
				}
				this._oToolbarArray[2] = 1;
				this._oToolbarArray[3] = 1;
				this._oToolbarArray[4] = 1;
				this._oToolbarArray[5] = 1;
			}
			if(this._oOptions.bFriend == true) {
				this._oToolbarArray[6] = 1;
				this._oToolbarArray[7] = 1;
				this._oToolbarArray[16] = 1;
				this._oToolbarArray[17] = 1;
				this._oToolbarArray[22] = 1;
			}
			if(this._oOptions.bSimpleEditor == false) {
				this._oToolbarArray[11] = 1;
				this._oToolbarArray[12] = 1;
				this._oToolbarArray[13] = 1;
				this._oToolbarArray[14] = 1;
				this._oToolbarArray[15] = 1;
				this._oToolbarArray[18] = 1;
				this._oToolbarArray[19] = 1;
				this._oToolbarArray[20] = 1;
				this._oToolbarArray[21] = 1;
				this._oToolbarArray[23] = 1;
				this._oToolbarArray[24] = 1;
				this._oToolbarArray[26] = 1;
				this._oToolbarArray[27] = 1;
			}
			//���еı༭���������Ŀؼ�
			this._oToolbarArray[8] = 1;
			this._oToolbarArray[9] = 1;
			this._oToolbarArray[10] = 1;
			this._oToolbarArray[25] = 1;
		}

		// ���ñ༭������	
		var _oData = {editorId: this._sParentId, editorSrc: this._oOptions.sEditorSrc,
					simpleEditor: this._oOptions.bSimpleEditor,  
					containerObjName: this._oOptions.sObjName, style: this._oOptions.sStyle, 
					width: this._oOptions.iWidth, height: this._oOptions.iHeight, 
					editorToolbar: this._oToolbarArray}; 
		var _sResult = this._oTemplate.process(_oData);
		$(this._sDivEditorId).innerHTML = _sResult;	
		
		// ��ʼ���༭��
		this._init();
	},
	
	/**
	 * ��ʼ���༭��, ����iframe�༭��,��ɫѡ�����,ħ�������
	 * @private
	 * @return	{Void}
	 * @see		#_checkIfHTMLTxt
	 * @see		#_clearAllFormat
	 * @see		#_clearWordFormat
	 * 
	 */
	_init: function() {
		// iframe�༭�������div
		var _oHtmlDiv = $("HEHtmlDiv" + this._sParentId);
		if(_oHtmlDiv==null) 
			return;
		
		// ��ʼ������iframe, ����ȡ��ճ������HTML��Դ����
		var _oSubEditor = document.createElement("iframe");
		_oSubEditor.setAttribute("src", this._oOptions.sEditorSrc);
		//����display:none�ᵼ�±༭����Ч��ʹ��visibility
		_oSubEditor.style.cssText  = "height:1px;width:1px;overflow:hidden;visibility:hidden";
		document.body.appendChild(_oSubEditor);		
			
		// �����༭��iframe����
		//var _sIFrame = isIE?"<iframe></iframe>":"iframe";
		var _oIframeObj = document.createElement("iframe");
		
		// ������
		var _iHtmlEditorWidth = this._oOptions.iWidth;
		if (_iHtmlEditorWidth == 0) {//����û�û�����ñ༭����ȣ����Զ���ȡ���
			if (_oHtmlDiv.offsetWidth > 2)
				_iHtmlEditorWidth = _oHtmlDiv.offsetWidth - 2;
		}
		// ��������
		_oIframeObj.setAttribute("id", "HEHtmlEditor" + this._sParentId);
		_oIframeObj.className = "htmlEditor";
		_oIframeObj.setAttribute("width", _iHtmlEditorWidth);
		_oIframeObj.setAttribute("height", this._oOptions.iHeight); 
		_oIframeObj.setAttribute("name", "HEHtmlEditor" + this._sParentId);
		_oIframeObj.frameBorder = 0;
		_oIframeObj.setAttribute("src", this._oOptions.sEditorSrc);
		_oIframeObj.setAttribute("designMode", "on");
		// ��ʾiframe
		_oHtmlDiv.appendChild(_oIframeObj);
			
		// ���ö������ԣ�iframe�༭��
		this.designEditor = window.frames["HEHtmlEditor" + this._sParentId];
		
		// ���ö������ԣ�textarea�༭��
		this.sourceEditor = $("HESourceEditor" + this._sParentId);
		
		// ���ö������ԣ�iframe����
		this._oFrameElem = $("HEHtmlEditor" + this._sParentId);
		
		// ���ô���ģʽ�༭���Ŀ��
		this.sourceEditor.style.width = _iHtmlEditorWidth + "px";
				
		
		// ���¼����������ÿ���iframe�ı༭ģʽ
		if (!this._oOptions.bDisabled) {
			if(isIE){
				_oIframeObj.attachEvent("onload", function(){
					event.srcElement.contentWindow.document.body.contentEditable = true;				
					//IE�±���ȴ�iframe������ɺ��������������¼�
					if (!this._oOptions.bDisabled) {	
						// ������������ñ༭��������¼��������༭���ſ�����������ʹ��
						this._setFrmClick(true);
					} else {
						// ��������½��ù�����,�����ñ༭��������¼������������༭���ǽ��õ�
						this._setDisableToolbar(true);			
					}
					
					// �����û��Զ���ı༭��������ɺ�Ļص�����
					if (this._oOptions.fnAfterLoad != null) {
						this._oOptions.fnAfterLoad(this._oOptions.oAfterLoadParams);
					}
					
					//ճ�������ݸ�ʽ��
					if(!this._oOptions.bSimpleEditor) {	
						event.srcElement.contentWindow.document.body.attachEvent("onpaste", function(){				     
							var _oSubDoc = _oSubEditor.contentWindow.document.body;
							_oSubDoc.innerHTML = "";
							_oSubDoc.createTextRange().execCommand("Paste");
							var _htmlData = _oSubDoc.innerHTML;
							//_oSubDoc.innerHTML = "";
	
							//�ж��Ƿ���Ҫ��ʾ:"ȥ����ʽ"
							if(this._checkIfHTMLTxt(_htmlData)) { 
								var _source;
								if(confirm('��ճ���������к�html���������������Ķ�  \r\n\r\n�ͱ༭�ĸ�ʽ���Ƿ����ԭ���ĸ�ʽ�� ')) {
									_source = this._clearAllFormat(_htmlData);									
								}else{
									_source = this._clearWordFormat(_htmlData);	
								}
								this._insertHTML(_source); // ���뵽�༭����
								return false;		//ʹ��return�Ͳ������ϵͳ����							
							}
						}.bind(this));
					}
				}.bind(this));	
			}else{//��IE�����
				var _oThis = this;
				_oIframeObj.addEventListener("load", function(){
					// �����this�Ǳ�ʾiframe����_oIframeObj
					this.contentWindow.onfocus = function(){
						this.document.designMode = "on";	
					}
					
					if (!_oThis._oOptions.bDisabled) {	
						// ������������ñ༭��������¼��������༭���ſ�����������ʹ��
						_oThis._setFrmClick(true);
					} else {
						// ��������½��ù�����,�����ñ༭��������¼������������༭���ǽ��õ�
						_oThis._setDisableToolbar(true);			
					}
					// �����û��Զ���ı༭��������ɺ�Ļص�����
					if (_oThis._oOptions.fnAfterLoad != null) {
						_oThis._oOptions.fnAfterLoad(_oThis._oOptions.oAfterLoadParams);
					}
				},false);
			}
		}			

		
		// ��ʼ����ɫѡ�����
		this.colorpanel = new NECtrl.ColorPanel(this._sParentId, this);
		// ��ʼ��ħ���������
		this.portrait = new NECtrl.Portrait(this._sParentId, this, {bFriend: this._oOptions.bFriend});
		

	},
	/**
	 * ���ñ༭����ص�����¼�
	 * @private
	 * @param 	{Boolean}	bNeedSet	�Ƿ�����
	 * @return 	{Void}		
	 */
	_setFrmClick: function(bNeedSet){
	
	
		if (bNeedSet) {		
			if(isIE) {
				// Ϊiframe�༭��ע��onclick�¼��������iframe������ڲ��κ�һ����ر����д򿪵Ĺ������˵�	
				this.designEditor.document.body.attachEvent("onclick", function(){
					this._hideMenu();
					this.tlBtnUnClk();	
					if(this._oOptions.fnHideDiv != null)
						this._oOptions.fnHideDiv(this._oOptions.oHideDivParmas);
				}.bind(this));
				
				// Ϊ�༭������window����onclick�¼�,����ر����в˵�
				window.document.body.attachEvent("onclick", function(){	
					var el = event.srcElement;
					// ���������ǳ���������ť������������رմ򿪵Ĳ˵�
					if (el.id == "HEImgFontFace" + this._sParentId || el.id == "HEImgFontSize" + this._sParentId ||
						el.id == "HEImgFontColor" + this._sParentId || el.id == "HEImgBackColor" + this._sParentId ||
						el.id == "HEImgPortrait" + this._sParentId || el.id == "HEImgAlign" + this._sParentId ||
						el.id == "HEImgList" + this._sParentId)	{
						return;
					} else {
						this._hideMenu();
						this.tlBtnUnClk();
					}
				}.bind(this));
			}else{ //firefox
				if(this.designEditor!= undefined && this.designEditor.document != undefined && this.designEditor!= null && this.designEditor.document != null){
					// Ϊiframe�༭��ע��onclick�¼��������iframe������ڲ��κ�һ����ر����д򿪵Ĺ������˵�
					this.designEditor.document.addEventListener("click", function(){
						this._hideMenu();
						this.tlBtnUnClk();	
						if(this._oOptions.fnHideDiv != null)
							this._oOptions.fnHideDiv(this._oOptions.oHideDivParmas);
					}.bind(this), false);
				}
				// Ϊ�༭������window����onclick�¼�,����ر����в˵�
				window.document.body.addEventListener("click", function(e){
					
					var el = e.target;
					if (el.id == "HEImgFontFace" + this._sParentId || el.id == "HEImgFontSize" + this._sParentId ||
						el.id == "HEImgFontColor" + this._sParentId || el.id == "HEImgBackColor" + this._sParentId ||
						el.id == "HEImgPortrait" + this._sParentId || el.id == "HEImgAlign" + this._sParentId ||
						el.id == "HEImgList" + this._sParentId)	{
						return;
					} else {
						this._hideMenu();
						this.tlBtnUnClk();
					}
				}.bind(this), false);
			}
			
		} else {
			var _oFrame = this.designEditor;	
			_oFrame.document.onclick = function(e){};
			window.document.onclick = function(e){};
		}
	},
	setEditorWidth: function(_iWidth) {
		 $("HEHtmlEditor" + this._sParentId).width = _iWidth + "px";
	},
	/**
	 * ���ù������Ľ���״̬
	 * @private
	 * @param 	{Boolean}	bDisable	�Ƿ����
	 * @return 	{Void}
	 */
	_setDisableToolbar: function(bDisable) {
		var _sDisabled;
		if (bDisable) {
			_sDisabled = "disabled";			
		} else {
			_sDisabled = "";
		}
		
		// ���ù��������а�ť
		var _aImgs = $("HEToolbar" + this._sParentId).getElementsByTagName("IMG");
		for (var i = 0, l = _aImgs.length; i < l; i++) {
			_aImgs[i].disabled = _sDisabled;
		}
		//������������µ�Ч��
		this.tlBtnUnClk();
		// ����༭����disable״̬
		this._oOptions.bDisabled = bDisable;
	},
	/**
	 * �������д򿪵Ĳ˵�
	 * @private
	 * @return 	{Void}
	 */
	 _hideMenu: function(){
	 	var oTemp = null;
	 	if((oTemp=this._getMenu("FontFace"))!=null)
			oTemp.style.display = "none";
		if((oTemp=this._getMenu("FontSize"))!=null)
			oTemp.style.display = "none";
		if((oTemp=this._getMenu("ForeColor"))!=null)
			oTemp.style.display = "none";
		if((oTemp=this._getMenu("Portrait"))!=null)
			oTemp.style.display = "none";
		if(!this._oOptions.bSimpleEditor) {
			if((oTemp=this._getMenu("Align"))!=null)
				oTemp.style.display = "none";
			if((oTemp=this._getMenu("List"))!=null)
				oTemp.style.display = "none";
		}
	},
	/**
	 * ��ȡ�˵�����
	 * @private
	 * @param	{String} 	sType	�˵�����
	 * @return	{Object}	��Ӧ�Ĳ˵�����
	 */
	_getMenu: function(sType) {
		switch (sType) {
			case "FontFace":
				if (this._oMenuFontFace == null)
					this._oMenuFontFace = $("HEFontFace" + this._sParentId);
				return this._oMenuFontFace;
			case "FontSize":
				if (this._oMenuFontSize == null)
					this._oMenuFontSize = $("HEFontSize" + this._sParentId);
				return this._oMenuFontSize;
			case "ForeColor":
				if (this._oMenuForeColor == null)
					this._oMenuForeColor = $("HEForeColor" + this._sParentId);
				return this._oMenuForeColor;
			case "Portrait":
				if (this._oMenuPortrait == null)
					this._oMenuPortrait = $("HEPortrait" + this._sParentId);
				return this._oMenuPortrait;
			case "Align":
				if (this._oMenuAlign == null)
					this._oMenuAlign = $("HEAlign" + this._sParentId);
				return this._oMenuAlign;
			case "List":
				if (this._oMenuList == null)
					this._oMenuList = $("HEList" + this._sParentId);
				return this._oMenuList;
		}
		return null;
	},		
	/**
	 * ���ñ༭ģʽ�����ģʽ�ʹ���ģʽ��ѡһ��
	 * @private
	 * @param	{String} 	sMode	�༭ģʽ��"Design", "Html"
	 * @return	{Void}
	 */
	_setMode: function(sMode){
		var _oSourceEditor = this.sourceEditor;
		var _oSourceDiv = $("HESourceDiv" + this._sParentId);
		var _oHtmlEditor = this._oFrameElem;
		var _oHtmlDiv = $("HEHtmlDiv" + this._sParentId);
		var _oIframeBody = this.designEditor.document.getElementsByTagName("BODY")[0];
		if(sMode == 'Html'){// �л�������ģʽ		
			_oHtmlDiv.style.display = "none";
			_oSourceDiv.style.display = "block";
			_oSourceEditor.value = _oIframeBody.innerHTML;
			_oSourceEditor.focus();
			this._oOptions.sCurrMode = "Html";
			this._setDisableToolbar(true);
		}else{// �л������ģʽ
			_oSourceDiv.style.display = "none";
			_oHtmlDiv.style.display = "block";
			_oIframeBody.innerHTML = _oSourceEditor.value;		
			//_oHtmlEditor.focus(); // �������firefox�»ᵼ�³�����ɾ֮
			this._oOptions.sCurrMode = "Design";
			this._setDisableToolbar(false);
		}
	},
	/**
	 * �жϱ༭���Ƿ����
	 * @private
	 * @return 	{Boolean}	�Ƿ����
	 */
	 _isDisabled: function(){
		return this._oOptions.bDisabled;
	},
	
	/**
	 * ���ñ༭������Ŀɱ༭״̬
	 * @ignore
	 * @private
	 * @param 	{Boolean} 	bEditable 	�Ƿ�ɱ༭
	 * @return 	{Void}
	 */
	 _setEditable: function(bEditable){
		var _oEditor = this._oFrameElem;
		var _oEditorWindow = _oEditor.contentWindow;
		if (bEditable) {
		   	try{
		   		_oEditorWindow.document.body.contentEditable = true;
				_oEditorWindow.document.designMode = "On";
		   	}catch(e){
		   		alert("���ñ༭���ɱ༭ʧ�ܣ���ˢ������������ԡ�");
		   	}	   	
		} else {
			try{
				_oEditorWindow.document.body.contentEditable = false;
				_oEditorWindow.document.designMode = "Off";
			}catch(e){
				alert("���ñ༭���ɱ༭ʧ�ܣ���ˢ������������ԡ�");
			}
		}
	},
	
	/**
	 * ���������༭���Ľ���״̬
	 * @ignore
	 * @private
	 * @param	{Boolean}	bDisable 	�Ƿ����
	 * @return	{Void}
	 */
	_setDisable: function(bDisable) {
		if (bDisable) {// ����
			// ���ù�����
			this._setDisableToolbar(true);
			// �༭�����򲻿ɱ༭
			this._setEditable(false);
			// �����ñ༭����ص�����¼�
			this._setFrmClick(false);
		} else {// ����
			// ���ù�����
			this._setDisableToolbar(false);
			// �༭������ɱ༭
			this._setEditable(true);
			// ���ñ༭����ص�����¼�
			this._setFrmClick(true);
		}	
	},
	
	/** 
	 * ��������������iframe��document������ִ�в���
	 * @private
	 * @param	{String} 	sType	��������
	 * @param	{Var}		vPara	�����������ѡ
	 * @return 	{Void}
	 */
	_format: function(sType, vPara){
		var _oFrame = this.designEditor;
		var _sAlert = "";
		if(!isIE){
			switch(sType){
				case "Cut":
					_sAlert = "����������ȫ���ò�����༭���Զ�ִ�м��в���,��ʹ�ü��̿�ݼ�(Ctrl+X)�����";
					break;
				case "Copy":
					_sAlert = "����������ȫ���ò�����༭���Զ�ִ�п�������,��ʹ�ü��̿�ݼ�(Ctrl+C)�����";
					break;
				case "Paste":
					_sAlert = "����������ȫ���ò�����༭���Զ�ִ��ճ������,��ʹ�ü��̿�ݼ�(Ctrl+V)�����";
					break;
			}
		}
		if(_sAlert != ""){
			alert(_sAlert);
			return;
		}
		
		_oFrame.focus();
			
		if(!vPara) {
			if(isIE) {
				_oFrame.document.execCommand(sType);
			} else {
				_oFrame.document.execCommand(sType,false,false);
			}
		} else {
			_oFrame.document.execCommand(sType,false,vPara);
		}
		_oFrame.focus();
	},
	/** 
	 * ���нӿ�, ��NECtrl.ColorPanel��NECtrl.Portrait����
	 * ��������������iframe��document������ִ�в���
	 * @private
	 * @param	{String} 	sType	��������
	 * @param	{Var}		vPara	�����������ѡ
	 * @return 	{Void}
	 */
	format: function (sType, vPara) {
		this._format(sType, vPara);
	},
	/**
	 * ���ı��༭���в���htmlԴ����
	 * @private
	 * @param	{String}	htmlԴ����
	 * @return 	{Void}
	 */
	_insertHTML: function (sHtml) {
		var _oFrame = this.designEditor;
		_oFrame.focus(); //�����ý��㣬�������뵽����
		if(isIE) {
			_oFrame.document.selection.createRange().pasteHTML(sHtml); 
		}else{
			_oFrame.document.execCommand("inserthtml",null,sHtml);
		}
		_oFrame.focus();
	},
	
	/**
	 * ��ȡ�༭�����ı�����,�ȶ����ݽ��д���������к�����
	 * @return 	{String}	�������ı༭���ı�����
	 */
	getContent: function (){
		// ��ȡ�༭������ԭʼ�ı�
	    var _sContent = this._getPrimitiveData();
	    // �����к����룬�����Ƿ��к����λ
	    var _sContent = this._stripData(_sContent);
	    // �ж��Ƿ񳬹�����������ƣ������Ƿ񳬹����λ   
	    this._bExceedMaxLen = this._exceedMaxLen(_sContent);
	    if (this.bIsHarm) {
	    	// ��Ϊ�к����룬�ѹ��˺�İ�ȫ�����������õ��༭����
	    	this.setData(_sContent);
	    }
	    // ��������׼���ύ
	    this._saveDataForSubmit(_sContent);
	    return _sContent;
	},
	/**
	 * ��ȡ�ɶԱ༭����������ݽ���Ԥ�����ı����ݣ�
	 * Ԥ���Ĵ�����ҪԤ�ȹ����к����룬�����޸ı༭����ԭʼ����
	 * @return 	{String}	��������Ԥ���İ�ȫ����
	 */
	getPrevContent: function() {
		// ��ȡ�༭����ԭʼ�ı�����
		var _sContent = this._getPrimitiveData();
		// ���ı������������к����봦��
	    var _sContent = this._stripData(_sContent);
	    return _sContent;
	},
	/**
	 * ��ȡ�༭����ԭʼ�ı�����
	 * @private
	 * @return	{String}	�༭����ԭʼ�ı�����
	 */
	_getPrimitiveData: function()	{
	    if(this._oOptions.sCurrMode == "Design") {
	        var _oHE = this._oFrameElem;
	        var _sValue = (_oHE.contentDocument || _oHE.contentWindow.document).getElementsByTagName("BODY")[0].innerHTML; 	
	      	return _sValue;
	    }
	    else {
	        var _sValue = this.sourceEditor.value;
	        return _sValue;
	    }
	},
	/**
	 * �жϱ༭�������Ƿ񳬹������������
	 * @private
	 * @param	{String}	sContent	�ı�����
	 * @return	{Boolean}	�Ƿ񳬳���������
	 */
	_exceedMaxLen: function(sContent) {
		if (sContent.length > this._oOptions.iMaxLen) {
			return true;
		} else
			return false;
	},
	
	/**
	 * ����༭�����ݵ��к�����
	 * @private
	 * @param	{String}	sContent	�ı�����
	 * @return	{String}	����к������İ�ȫ����
	 */
	_stripData: function(sContent){
		var _oResult;
		if(this._oOptions.bSimpleEditor) {
			// �򵥱༭���������۱༭�������չ��˺�����������к�����
			_oResult = stripData(sContent, "");
		} else {
			// �Ǽ򵥱༭��������־�༭����ָ��������˵ı�ǩ����embed
			_oResult = stripData(sContent, ["embed"]);
		}
		/*
		if (!this._oOptions.bFriend)
			_oResult.content = this._fnCommentFilter(_oResult.content);
		*/
		this.bIsHarm = _oResult.isHarm;
		var _sContent = _oResult.content;
		//���ع��˺�Ĵ���		
		return _sContent;
	},
	/**
	 * ��ձ༭��
	 * @return	{Void}
	 */
	emptyContent: function() {
		if (isIE) {
			// ��գ�������div��ǩ
			this.designEditor.document.getElementsByTagName("BODY")[0].innerHTML = "";
		}
		else {
			var _oHE = this._oFrameElem;
		    (_oHE.contentDocument || _oHE.contentWindow.document).getElementsByTagName("BODY")[0].innerHTML = "";	
	  	}
	},
	/**
	 * �ж��ı������Ƿ񱻷��ְ����к�����
	 * @return	{Boolean} 	�Ƿ�����к�����
	 */
	hasHarmCode: function(){
		return this._bIsHarm;
	},
	/**
	 * �ж��ı������Ƿ񳬹��˹涨�������������
	 * @return	{Boolean} 	�Ƿ񳬹���������
	 */
	IsExceedMaxLen: function() {
		return this._bExceedMaxLen;
	},
	/**
	 * �л��༭���ı༭ģʽ
	 * @return 	{Void}
	 */
	swtMode: function() {
		var _e = $("HEMode" + this._sParentId);
		if (this._oOptions.sCurrMode == "Design") {
			// ���ģʽ�л�������ģʽ
			_e.title = "����HTML����";
			_e.className  = "editorToolbarButtonDown";
			this._setMode("Html");
			appendCss("HEToolbar" + this._sParentId, "lightopacity");
		} else {
			// ����ģʽ�л������ģʽ
			_e.className  = "statusbarButton";
			this._setMode("Design");
			removeLastCss("HEToolbar" + this._sParentId, "lightopacity");
			_e.title = "��ʾHTML����";
		}
	},
	/**
	 * ��ʾԤ������
	 * @return 	{Void}
	 */
	goPreview: function(){
		var _htmlData = this.getPrevContent();
		//editBlog.js�е�ȫ�ֺ���
		if(this._oOptions.fnPreview != null)
			this._oOptions.fnPreview(_htmlData);
	},
	/**
	 * ��������ť��갴���¼��������ı�css
	 * @param	{Object}	oElem		��ť����
	 * @param   {Var}		vPreview 	�Ƿ�preview��ť, ��ѡ����
	 * @return	{Void}
	 */
	tlBtnDwn: function(oElem, vPreview) {
		if(vPreview == undefined)
			vPreview = false;
		if(this._isDisabled() && !vPreview) {
			return false;
		};
		this.tlBtnUnClk();
		oElem.className = "editorToolbarButtonDown";
	},
	
	/**
	 * ��������ť����Ƶ������¼��������ı�css
	 * @param	{Object}	oElem		��ť����
	 * @param   {Var}		vPreview 	�Ƿ�preview��ť, ��ѡ����
	 * @return	{Void}
	 */
	tlBtnOvr: function(oElem, vPreview) {

		if(vPreview == undefined)
			vPreview = false;
		if(this._isDisabled() && !vPreview) {
			return false;
		};
		if(oElem != this._oCurrentToolbarClk)
			oElem.className = "editorToolbarButtonOver";
	},
	
	/**
	 * ��������ť����Ƴ��¼��������ı�css
	 * @param	{Object}	oElem	��ť����
	 * @param   {Var}		vPreview 	�Ƿ�preview��ť, ��ѡ����
	 * @return	{Void}
	 */
	tlBtnOut: function(oElem, vPreview) {
		if(vPreview == undefined)
			vPreview = false;
		if(this._isDisabled() && !vPreview) {
			return false;
		};
		if(oElem != this._oCurrentToolbarClk)
			oElem.className = "editorToolbarButton";
	},
	/**
	 * ��������ť������¼��������ı�css
	 * @param	{Object}	oElem	��ť����
	 * @return	{Void}
	 */
	tlBtnClk: function(oElem) {
		if(this._isDisabled()) {
			return false;
		};
		this.tlBtnUnClk();
		oElem.className = "editorToolbarButtonDown";
		this._oCurrentToolbarClk = oElem;
	
	},
	/**
	 * ȡ���������������ʾЧ�����ı�css
	 * @param	{Object}	oElem	��ť����
	 * @return	{Void}
	 */
	tlBtnUnClk: function() {
		if(this._oCurrentToolbarClk != null) {
			this._oCurrentToolbarClk.className = "editorToolbarButton";
			this._oCurrentToolbarClk = null;
		}
		return false;
	},
	/**
	 * ���ӱ༭���߶�
	 * @param	{Number}	iStep 	���ӵĲ���
	 * @return 	{Void}
	 */
	addHeight: function(iStep) {
		var _oHE = this._oFrameElem;
		var _oSE = this.sourceEditor;
		if (iStep == undefined)
			iStep = 100;
		_oHE.height = parseInt(_oHE.height) + iStep;
		_oSE.style.height = parseInt(_oSE.style.height.substr(0, _oSE.style.height.length - 2)) + iStep + "px";
	},
	/**
	 * ���ٱ༭���߶�
	 * @param	{Number}	iStep 	���ٵĲ���
	 * @return 	{Void}
	 */
	delHeight: function(iStep) {
		var _oHE = this._oFrameElem;
		var _oSE = this.sourceEditor;
		if (iStep == undefined)
			iStep = 100;
		var _iHEHeight = parseInt(_oHE.height) - iStep;
		if (_iHEHeight > 100)
			_oHE.height = _iHEHeight;
		var _iSEHeight = parseInt(_oSE.style.height.substr(0, _oSE.style.height.length - 2)) - iStep;
		if (_iSEHeight > 100)
			_oSE.style.height = _iSEHeight + "px";
	},
	/**
	 * ִ�й���������
	 * @param	{String}	sType	��������
	 * @return	{Void}
	 */
	cmd: function(sType) {
		if(this._isDisabled()) {
			return false;
		}
		this._hideMenu();
		switch(sType){
			case "Undo":
				this._format("Undo");
				break;
			case "Redo":
				this._format("Redo");
				break;
			case "Cut":			
				this._format("Cut");
				break;
			case "Copy":
				this._format("Copy");
				break;
			case "Paste":
				this._format("Paste");
				break;
				
			case "FontFace":
				this._displayElement("FontFace", "HEFontFace", "HEImgFontFace");
				break;
			case "FontSize":
				this._displayElement("FontSize", "HEFontSize", "HEImgFontSize");
				break;
			case "Bold":
				this._format("Bold");
				break;
			case "Italic":
				this._format("Italic");
				break;
			case "Underline":
				this._format("Underline");
				break;
			case "Align":
				this._displayElement("Align", "HEAlign", "HEImgAlign");
				break;
			case "List":
				this._displayElement("List", "HEList", "HEImgList");
				break;	
			case "Indent":
				this._format("Indent");
				break;
			case "Outdent":
				this._format("Outdent");
				break;
			case "ParaFormatting":
				this._paraFormating();
				break;
				
			case "ForeColor":
				this._foreColor();
				break;	
			case "BackColor":
				this._backColor();
				break;	
			case "Line":
				this._insertHTML("<HR>");
				break;	
			case "Table":
				this._createTable();
				break;
				
			case "Link":
				this._createLink();
				break;	
			case "Image":
				this._addImg();
				break;	
			case "Media":
				this._createMedia();
				break;
			case "Portrait":
				this._addPortrait("HEPortrait", "HEImgPortrait");
				break;	
			case "ClearFormat":
				this._clearHTMLFormat();
				break;
				
		}	
	},
	/**
	 * ��ʾ�¼����������Ӧ�Ĳ˵�
	 * @private
	 * @param	{String} 	sMenuElemId		�˵�����id
	 * @param	{String}	sEventElemId	�¼�����id
	 * @param	{Boolean}	bDisplay		�Ƿ���ʾ�˵�
	 * @return	{Void}
	 */
	_displayElement: function(sType, sMenuElemId, sEventElemId) {	
		// �����������򿪵Ĳ˵�
		this._hideMenu();
		// �ҵ��˵���
		var _oMemuElem = null;
		if (typeof sMenuElemId == "string" )
			_oMemuElem = $(sMenuElemId + this._sParentId);
		if (_oMemuElem == null) 
			return;
		// �ҵ������¼��Ķ���
		var _oEventElem = $(sEventElemId + this._sParentId);
	
		if (_oEventElem != null) {
			// �����˵�����
			switch(sType) {
				case "FontFace":
					_oMemuElem.innerHTML = 
						'<a href="#" onclick="' + this._oOptions.sObjName + '._fontName(\'����\');return false;" class="n" style="font:normal 12px \'����\';">����</a> '+
						'<a href="#" onclick="' + this._oOptions.sObjName + '._fontName(\'����\');return false;" class="n" style="font:normal 12px \'����\';">����</a> '+
						'<a href="#" onclick="' + this._oOptions.sObjName + '._fontName(\'����_GB2312\');return false;" class="n" style="font:normal 12px \'����_GB2312\';">����</a> '+
						'<a href="#" onclick="' + this._oOptions.sObjName + '._fontName(\'����\');return false;" class="n" style="font:normal 12px \'����\';">����</a> '+
						'<a href="#" onclick="' + this._oOptions.sObjName + '._fontName(\'��Բ\');return false;" class="n" style="font:normal 12px \'��Բ\';">��Բ</a> '+
						'<a href="#" onclick="' + this._oOptions.sObjName + '._fontName(\'Arial\');return false;" class="n" style="font:normal 12px Arial;">Arial</a> '+
						'<a href="#" onclick="' + this._oOptions.sObjName + '._fontName(\'Arial Narrow\');return false;" class="n" style="font:normal 12px \'Arial Narrow\';">Arial Narrow</a> '+
						'<a href="#" onclick="' + this._oOptions.sObjName + '._fontName(\'Arial Black\');return false;" class="n" style="font:normal 12px \'Arial Black\';">Arial Black</a> '+
						'<a href="#" onclick="' + this._oOptions.sObjName + '._fontName(\'Comic Sans MS\');return false;" class="n" style="font:normal 12px \'Comic Sans MS\';">Comic Sans MS</a> '+
						'<a href="#" onclick="' + this._oOptions.sObjName + '._fontName(\'Courier\');return false;" class="n" style="font:normal 12px Courier;">Courier</a> '+
						'<a href="#" onclick="' + this._oOptions.sObjName + '._fontName(\'System\');return false;" class="n" style="font:normal 12px System;">System</a> '+
						'<a href="#" onclick="' + this._oOptions.sObjName + '._fontName(\'Times New Roman\');return false;" class="n" style="font:normal 12px \'Times New Roman\';">Times New Roman</a> '+
						'<a href="#" onclick="' + this._oOptions.sObjName + '._fontName(\'Verdana\');return false;" class="n" style="font:normal 12px Verdana;">Verdana</a> ';
					break;
				case "FontSize":
					_oMemuElem.innerHTML = 
						'<a href="#" onclick="' + this._oOptions.sObjName + '._fontSize(1);return false;" class="n" style="font-size:xx-small;line-height:130%;">��С</a> '+
						'<a href="#" onclick="' + this._oOptions.sObjName + '._fontSize(2);return false;" class="n" style="font-size:x-small;line-height:130%;">��С</a> '+
						'<a href="#" onclick="' + this._oOptions.sObjName + '._fontSize(3);return false;" class="n" style="font-size:small;line-height:130%;">С</a> '+
						'<a href="#" onclick="' + this._oOptions.sObjName + '._fontSize(4);return false;" class="n" style="font-size:medium;line-height:130%;">��</a> '+
						'<a href="#" onclick="' + this._oOptions.sObjName + '._fontSize(5);return false;" class="n" style="font-size:large;line-height:130%;">��</a> '+
						'<a href="#" onclick="' + this._oOptions.sObjName + '._fontSize(6);return false;" class="n" style="font-size:x-large;line-height:130%;">�ش�</a> '+
						'<a href="#" onclick="' + this._oOptions.sObjName + '._fontSize(7);return false;" class="n" style="font-size:xx-large;line-height:140%;">����</a> ';
					break;
				case "List":
					_oMemuElem.innerHTML = 
						'<a href="#" onclick="' + this._oOptions.sObjName + '._textList(\'Insertorderedlist\');return false;" class="n">�����б�</a> '+
						'<a href="#" onclick="' + this._oOptions.sObjName + '._textList(\'Insertunorderedlist\');return false;" class="n">�����б�</a> ';
					break;
				case "Align":
					_oMemuElem.innerHTML = 
						'<a href="#" onclick="' + this._oOptions.sObjName + '._textAlign(\'Justifyleft\');return false;" class="n">�����</a> '+
						'<a href="#" onclick="' + this._oOptions.sObjName + '._textAlign(\'Justifycenter\');return false;" class="n">���ж���</a> '+
						'<a href="#" onclick="' + this._oOptions.sObjName + '._textAlign(\'Justifyright\');return false;" class="n">�Ҷ���</a> ';
					break;
			}	
			// ��ʾ�¼������İ�ť�����Ӧ�Ĳ˵�			
			this._showMenu(_oMemuElem, _oEventElem);
		}
	},
	
	/**
	 * ��ʾ�˵�,Ĭ����ʾ�ڴ����¼��Ķ�������·���Ҳ���Դ������������ʾλ��
	 * @private
	 * @param	{String}	sMenuItem	�˵�����
	 * @param	{String}	sEventItem	��������
	 * @param	{Number}	iAdjustLeft	����x�����������0��δ�����ʾ�봥�����������
	 * @param	{Number}	iAdjustTop	����y�����������0��δ�����ʾ�봥�������²�����
	 * @return 	{Void}
	 */
	_showMenu: function(sMenuElem, sEventElem, iAdjustLeft, iAdjustTop) {	
		document.body.appendChild(sMenuElem); 
		if (iAdjustTop == undefined) {
			sMenuElem.style.top = getBrowserPositionY(sEventElem) + 25 + "px";
		}
		else {
			sMenuElem.style.top = getBrowserPositionY(sEventElem) + 25 + iAdjustTop + "px";
		}
		if (iAdjustLeft == undefined) {
			sMenuElem.style.left = getBrowserPositionX(sEventElem) - 25 + "px";
		}
		else {
			sMenuElem.style.left = getBrowserPositionX(sEventElem) - 25 + iAdjustLeft + "px";
		}
		
		sMenuElem.style.display = "block";		
		
	},
	/**
	 * ���нӿ�, ��NECtrl.ColorPanel��NECtrl.Portrait����
	 * ��ʾ�˵�, Ĭ����ʾ�ڴ����¼��Ķ�������·���Ҳ���Դ������������ʾλ��
	 * @param	{String}	sMenuItem	�˵�����
	 * @param	{String}	sEventItem	��������
	 * @param	{Number}	iAdjustLeft	����x�����������0��δ�����ʾ�봥�����������
	 * @param	{Number}	iAdjustTop	����y�����������0��δ�����ʾ�봥�������²�����
	 * @return 	{Void}
	 */
	showMenu: function(sMenuElem, sEventElem, iAdjustLeft, iAdjustTop) {
		this._showMenu(sMenuElem, sEventElem, iAdjustLeft, iAdjustTop);
	},
	/**
	 * ����ǰ��ɫ
	 * @private
	 * @return 	{Void}
	 */
	_foreColor: function() {
		this._displayColorBoard("foreColor");
	},
	/**
	 * ���ñ���ɫ
	 * @private
	 * @return 	{Void}
	 */
	_backColor: function(){
		this._displayColorBoard("backColor");
	},
	/**
	 * ������������
	 * @private
	 * @param	{String}	sFontName	��������
	 * @return	{Void}
	 */
	_fontName: function (sFontName){
		this._format('fontname',sFontName);
		// ������������ѡ��˵�
		this._getMenu("FontFace").style.display='none';
	},
	/**
	 * ���������С
	 * @private
	 * @param	{Number}	iSize		�����С����1,2,3...�ǣ�����������
	 * @return	{Void}
	 */
	_fontSize: function (iSize){
		this._format('fontsize', iSize);
		// ���������Сѡ��˵�
		this._getMenu("FontSize").style.display='none';
	},
	/**
	 * �����б���ʽ
	 * @private
	 * @param	{String}	sListType	�б���ʽ����ѡ��"Insertorderedlist", "Insertunorderedlist".
	 * @return	{Void}
	 */
	_textList: function (sListType) {
		this._format(sListType);
		// �����б���ʽѡ��˵�
		this._getMenu("List").style.display='none';
	},
	/**
	 * ���ö��뷽ʽ
	 * @private
	 * @param	{String}	sAlignType	�б���ʽ����ѡ��"Justifyleft", "Justifycenter", "Justifyright".
	 * @return	{Void}
	 */
	_textAlign: function (sAlignType) {
		this._format(sAlignType);
		// ���ض��뷽ʽѡ��˵�
		this._getMenu("Align").style.display='none';
	},
	/**
	 * ����ͼƬ,���´���
	 * @private
	 * @return	{Void}
	 */
	_addImg: function (){
		// �򿪲���ͼƬ����
		window.open("uploadBlogPhoto.do", "addPicWin", "resizable=no,scrollbars=no,status=yes, width=785px, height=470px"); 
	},
	/**
	 * ��ħ���������
	 * @private
	 * @param	{String}	sMenuElemId		����ѡ��˵�
	 * @param	{String}	sEventElemId	�¼������Ķ����id
	 * @return 	{Void}
	 * @see		NECtrl.Portrait#display
	 */
	_addPortrait: function (sMenuElemId, sEventElemId){
		var _oPortrait = $(sMenuElemId + this._sParentId);
		var _oElem = $(sEventElemId + this._sParentId);
		if (_oElem != null) {			
			this._showMenu(_oPortrait, _oElem, -152, 0);
		}		
		this.portrait.display(_oPortrait);
	},
	/**
	 * ��ʾ��ɫѡ�����
	 * @param	{String} sColorType	��ɫѡ���������: ǰ��ɫ���߱���ɫ
	 * @return 	{Void}
	 * @see		NECtrl.ColorPanel#display
	 */
	_displayColorBoard: function(sColorType){
		var _oColorDiv = $("HEForeColor" + this._sParentId);
		this.colorpanel.display(_oColorDiv,sColorType);
	},
	
	/**
	 * �ж��Ƿ�����ɫѡ������
	 * @ignore
	 * @private
	 * @param	{Object}	oTbleColor	��ɫѡ���
	 * @return	{Boolean}	�Ƿ��
	 */
	_checkIfColorBoard: function (oTblColor){
		if(oTblColor.parentNode){
			if(oTblColor.parentNode.id == "HEForeColor" + this._sParentId) return true;
			else return this._checkIfColorBoard(oTblColor.parentNode);
		}else{
			return false;
		}
	},	
	/**
	 * �ж��Ƿ��б���ѡ������
	 * @ignore
	 * @private
	 * @param	{Object}	oTblPortrait	����ѡ���
	 * @return	{Boolean}	�Ƿ��
	 */
	_checkIfPortraitBoard: function (oTblPortrait){
		if(oTblPortrait.parentNode){
			if(oTblPortrait.parentNode.id == "HEPortrait" + this._sParentId) return true;
			else return this._checkIfPortraitBoard(oTblPortrait.parentNode, this._sParentId);
		}else{
			return false;
		}
	},
	/**
	 * �ж��Ƿ�������ѡ������
	 * @ignore
	 * @private
	 * @param	{Object}	oTblFontFace	����ѡ���
	 * @return	{Boolean}	�Ƿ��
	 */
	_checkIfFontFace: function(oTblFontFace){
		if(oTblFontFace.parentNode){
			if(oTblFontFace.parentNode.id == "HEFontFace" + this._sParentId) return true;
			else return this._checkIfFontFace(oTblFontFace.parentNode);
		}else{
			return false;
		}
	},
	/**
	 * �ж��Ƿ����ֺ�ѡ������
	 * @ignore
	 * @private
	 * @param	{Object}	oTblFontSize	�ֺ�ѡ���
	 * @return	{Boolean}	�Ƿ��
	 */
	_checkIfFontSize: function (oTblFontSize){
		if(oTblFontSize.parentNode){
			if(oTblFontSize.parentNode.id == "HEFontSize" + this._sParentId) return true;
			else return this._checkIfFontSize(oTblFontSize.parentNode);
		}else{
			return false;
		}
	},
	/**
	 * �ı����ݱ��浽ҳ���ϵ�htmlԪ���У�����ύǰ��׼��
	 * ע�⣺iframe�༭���������޷���form��ʽ���ύ���ʱȽϰ����ݱ��浽�ⲿ��htmlԪ���У�
	 * @private
	 * @param	{String}	sContent	׼���ύ�ı༭������
	 * @return	{Void}
	 */
	_saveDataForSubmit: function (sContent) {
		$("HEContent" + this._sParentId).value = sContent;
	},
	/**
	 * ���ñ༭�������ݣ�ͬʱ����iframe�༭����textarea�༭��
	 * @param	{String}	sContent	�µ��ı�����
	 * @return 	{Void}
	 */
	setData: function (sContent) {
		this.sourceEditor.value = sContent;
		var _oHE = this._oFrameElem;
	    (_oHE.contentDocument || _oHE.contentWindow.document).getElementsByTagName("BODY")[0].innerHTML = sContent;
	},
	
	
	/**
	 * �Ǻ��ѵ����۹���
	 * @ignore �Ѹ�Ϊ����˹���
	 * @param	{String}	sData	�ı�����
	 * @return	{Void}
	 */
	_commentFilter: function(sData) {
		var _sResult = sData;
		//ȥ��ħ������������κ�IMG��ǩ
		var _sPorStr = '<IMG src="'+ NECtrl.HtmlEditor._sPortraitPrefix + '.*?">';
		var _porReg = new RegExp(_sPorStr,"ig");
		var _imgReg = /<\/?IMG.*?>/ig;
		_sResult = _sResult.replace(_imgReg, function($1){
			if(_porReg.test($1)) 
				return $1;		
			else
				return "";
		});
		//ȥ�����塢�ֺš�������ɫ������ɫ������
		var _fontReg = /<\/?(font|a).*?>/ig;
		_sResult = _sResult.replace(_fontReg,"");
	
		return _sResult;
	},
	/**
	 * ���������񴰿�
	 * @return	{Void}
	 */
	_createTable: function() {
		var left = (window.screen.availWidth-330)/2;
		var top = (window.screen.availHeight-170)/2;
		if(isIE)
			window.open("blog/addtablepopup.html","","resizable=no,scrollbars=no,status=no, width=320px, height=165px,top="+top+",left=" + left);
		else
			window.open("blog/addtablepopup.html","","resizable=no,scrollbars=no,status=no, width=305px, height=165px,top="+top+",left=" + left);
	},
	/**
	 * �༭���в�����
	 * @param	(Number}	iRows			�������
	 * @param	{Number}	iCols			�������
	 * @param 	{Number}	iWidth			�����
	 * @param	{Number}	iWidthType		������� 1==%, 2==px
	 * @param	{Number}	iBorder			���߿�
	 * @param 	{Number}	iCellpadding	���cellpadding
	 * @param	{Number}	iCellspacing	���cellspacing
	 * @return	{Void}
	 */
	addTable: function(iRows, iCols, iWidth, iWidthType, iBorder, iCellpadding, iCellspacing) {
		//������ʽ:�����ж�
		var _reg = /^\d+$/;
		//�����Ƿ�Ƿ�
		if(!_reg.test(iRows) || (iRows ==0)) 
			return;
		//�����Ƿ�Ƿ�
		if(!_reg.test(iCols) || (iCols ==0))
			return;
		//���ñ����
		var _sWidth = "";
		if(!_reg.test(iWidth)){ // ��ȷǷ�,����Ϊ100%
			_sWidth = "100%";
		}else{
			if(iWidthType == 1){
				if(iWidth<=100 && iWidth>=0)
					_sWidth = iWidth + "%";
				else
					_sWidth = "100%";
			}else if(iWidthType == 2) {
				_sWidth = iWidth + "px";
			}else {
				_sWidth = "100%";
			}
		}
		var _sBorder = iBorder;
		if(!_reg.test(iBorder)) 
			_sBorder = 0;
		var _sCellpadding = iCellpadding;
		if(!_reg.test(iCellpadding)) 
			_sCellpadding = 0;
		var _sCellspacing = iCellspacing;
		if(!_reg.test(iCellspacing)) 
			_sCellspacing = 0;
		
		//����HTMLԴ����
		var _s = [];
		if(_sBorder == 0) {
			_s.push('<table class=dashTable width="');
		}else{
			_s.push('<table style="border:'+_sBorder+'px solid" width="');
		}
		_s.push(_sWidth);
		_s.push('" border="');
		_s.push(_sBorder);
		_s.push('" cellPadding="');
		_s.push(_sCellpadding);
		_s.push('" cellSpacing="');
		_s.push(_sCellspacing);
		_s.push('">');
		for(var i=0; i<iRows; ++i) {
			_s.push('<tr>');
			for(var j=0; j<iCols; ++j) {
				_s.push('<td>&nbsp;</td>');
			}
			_s.push('</tr>');
		}
		_s.push('</table>');
		var _sHTML = _s.join("");
		this._insertHTML(_sHTML);
	
	},
	/**
	 * ��������ý�崰��
	 * @return	{Void}
	 */
	_createMedia: function() {
		var left = (window.screen.availWidth-580)/2;
		var top = (window.screen.availHeight-170)/2;
		window.open("blog/addmediapopup.html","","resizable=no,scrollbars=no,status=no, width=554px, height=145px,top="+top+",left=" + left);
	},
	/**
	 * �༭���в���ý���ļ�
	 * @param	{String}	sUrl		ý���ļ����ӵ�ַ
	 * @param	{Boolean}	bAuto		�Ƿ��Զ�����
	 * @param	{Boolean}	bLoop		�Ƿ��ظ�����
	 * @param	{Number}	iWidth		���
	 * @param	{Number}	iHeight		�߶�
	 * @param	(String}	sPos		�ڱ༭���ж���ķ�ʽ: left, center, right
	 * @return	{Void}
	 */
	addMedia: function(sUrl,bAuto,bLoop,width,height,sPos) {
		var _real = /^http:\/\/(.+)\.(rm|rmvb|rt|ra|rp|rv|mov|qt|aac|m4a|m4p|ssm|sdp|3gp|amr|awb|3g2|divx)$/ig;
		var _wm = /^http:\/\/(.+)\.(mp3|avi|asf|wmv|wma|mpg|mpeg|wax|asx|wm|wmx|wvx|wav|mpv|mps|m2v|m1v|mpe|mpa|mp4|m4e|mp2|mp1|au|aif|aiff|mid|midi|rmi)$/ig;
		var _flash = /^http:\/\/(.+)\.swf$/ig;
		
		var _sPos = sPos;
		var _sAuto = bAuto;
		var _sLoop = bLoop;
		var _sWidHigh;
		if(width != "") {
			_sWidHigh = " width=" + width;
		}else {
			_sWidHigh = "";
		}
		if(height != "") {
			_sWidHigh = _sWidHigh + " height=" + height;
		}
		var _sMediaHTML = '';
	
		var _sStyle = "";
		//��������blog�еķ���λ��
		switch(_sPos) { 
			case "left":
				_sStyle="FLOAT: left; MARGIN: 0px 10px 10px 0px";
				break;
			case "center":
				_sStyle="DISPLAY: block; MARGIN: 0px auto 10px; TEXT-ALIGN: center";
				break;
			case "right":
				_sStyle="FLOAT: right; MARGIN: 0px 0px 10px 10px";
				break;
			default:
				_sStyle="DISPLAY: block";
		}
		var _bIsReal = false;
		if(_real.test(sUrl)){
			_bIsReal = true;
			if(width =="" || height==""){
				_sWidHigh = "width=300 height=200";
			}
			_sMediaHTML = '<embed src='+ sUrl +' style="'+_sStyle+'" type="audio/x-pn-realaudio-plugin" controls="ImageWindow,ControlPanel,StatusBar" ' +
				_sWidHigh + ' autostart="'+ _sAuto + '" loop="' + _sLoop + '"></embed>';
		}else if(_wm.test(sUrl)){
			_sMediaHTML = '<embed src='+ sUrl +' style="'+_sStyle+'" pluginspage="http://www.microsoft.com/isapi/redir.dll?prd=windows&amp;sbp=mediaplayer&amp;ar=media&amp;sba=plugin&amp;" type="application/x-mplayer2" showcontrols="1" showaudiocontrols="1" showstatusbar="1" enablecontextmenu="1" ' +
				_sWidHigh + ' autostart="'+ _sAuto + '" loop="' + _sLoop + '"></embed>';
		}else if(_flash.test(sUrl)){
			_sMediaHTML = '<embed src='+sUrl+' style="'+_sStyle+'" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" ' +
			    'wmode="transparent" quality="high" ' + _sWidHigh + '></embed>';
		}else {
			_sMediaHTML = '<embed src='+sUrl +' style="'+_sStyle +'"' + _sWidHigh + ' autostart="'+ _sAuto + '" loop="' + _sLoop + '"></embed>';
			
		}
		this._insertHTML(_sMediaHTML);
		if(isIE && _bIsReal)
			this.designEditor.document.body.contentEditable = true;
	},
	/**
	 * �����������Ӵ���
	 * @return	{Void}
	 */
	_createLink: function() {	
		var _bSelTxt,_oSelText;
		if(isIE) {
			_oSelTxt = this.designEditor.document.selection.createRange().text;
	
		}else{
			_oSelTxt = this.designEditor.getSelection();
		}
		if(_oSelTxt == ""){
			_bSelTxt = false;
		}else{
			_bSelTxt = true;
		}
		var left = (window.screen.availWidth-600)/2;
		var top = (window.screen.availHeight-170)/2;
		window.open("blog/addlinkpopup.html?parentId="+this._sParentId+"&isSel="+_bSelTxt,"","resizable=no,scrollbars=no,status=no, width=590x, height=140px,top="+top+",left=" + left);
		
	},
	/**
	 * �༭���в�������
	 * @param	{String}	sURL	���ӵ�ַ
	 * @param	{String}	sDesc	��������
	 * @return	{Void}
	 */
	addLink: function(sURL, sDesc) {
		if (sURL == null)
			sURL = "";
		else
			sURL = Trim(sURL);
		if ((sURL!="") && (sURL!="http://")){
			if (sURL.indexOf("http://") != 0) {
				sURL = "http://" + sURL;
			}
			if(sDesc == "") {
				var _oSelText;
				if(isIE) {
					_oSelTxt = this.designEditor.document.selection.createRange().text;
				}else{
					_oSelTxt = this.designEditor.getSelection();
				}
				if(_oSelTxt == undefined)
					return;
				sDesc = _oSelTxt;
			}
			var _sHTML = '<a href="'+ sURL+'" target="_blank">'+ sDesc+'</a>';
			this._insertHTML(_sHTML);		
			
		}
	},
	/**
	 * ��ʽ��, �������ĸ�ʽ
	 * @param	{String}	sTxt	ԭʼ�ı�
	 * @return	{String}	�����ʽ����ı�
	 */
	_clearAllFormat: function(sTxt) {
		try{
			var c = sTxt.replace(/\n/ig, "");
		  	//ɱ��js
			c = c.replace(/<script.*?>.*?<\/scrip[^>]*>/ig,"");
			c = c.replace(/<[^>]*?javascript:[^>]*>/ig,"");
			//ɱ��style
			c = c.replace(/<style.*?>.*?<\/styl[^>]*>/ig,"");
			//�������html
			c = c.replace(/<\/?(font|span|center|sohu|form|input|select|textarea|iframe|strong|b|EM|U|SUB|SUP)(\s[^>]*)?>/ig,"");
			c = c.replace(/<\/?(div|code|h\d)[^>]*>/ig,'<br>');

			c = c.replace(/<\?xml[^>]*>/ig,'');
			c = c.replace(/<\!--.*?-->/ig,'');
			
			//����table�еĸ߶�,��ȥ��<td>�е�<p>
			/*c = c.replace(/<TD.*?>[\s\S]*?<\/TD>/gi,function($1){
				var s = $1;
				s = s.replace(/<\/?P[^>]*>/ig,'');
				return s;
			});*/
			//ȥ����ǩ�е�class, style, lang����
			c = c.replace(/<(\w[^>]*) class=([^ |>]*)([^>]*)/ig, "<$1$3");
			c = c.replace(/<(\w[^>]*) style="([^"]*)"([^>]*)/ig, "<$1$3");
			c = c.replace(/<(\w[^>]*) lang=([^ |>]*)([^>]*)/ig, "<$1$3");
			//ȥ��wordճ���е������ǩ
			c = c.replace(/<\\?\?xml[^>]*>/ig, "");
			c = c.replace(/<\/?\w+:[^>]*>/ig, "");
			//����ͼƬ
			c = c.replace(/<img.*?src=([^ |>]*)[^>]*>/ig,"<img src=$1 border=0>");
			//ȥ�������е����ò���
			c = c.replace(/<a.*?href="([^"]*)"[^>]*>/ig,"<a href=\"$1\">");
			//��ʽ�ı�
			c = "MM163brMM" + c;
			c = c.replace(/<br>\s*<br>/ig, 'MM163brMM');
			c = c.replace(/<center>\s*<center>/ig, '<center>');
			c = c.replace(/<\/center>\s*<\/center>/ig, '</center>');
			c = c.replace(/<center>/ig, 'MM163brMM<center>');
			c = c.replace(/<\/center>/ig, '</center>MM163brMM');
			c = c.replace(/<br>/ig, 'MM163brMM');
			c = c.replace(/<p[^>]*>/ig, 'MM163brMM');
			c = c.replace(/<\/p[^>]*>/ig, '');
			c = c.replace(/(\r|\n)/ig, '');
			c = c.replace(/MM163brMM\s*MM163brMM/ig,'MM163brMM');
			c = c.replace(/MM163brMM/ig,'</P><P style="TEXT-INDENT: 2em">');
			c = c.replace("</P>","");	
	  		return c;
	  	}catch(e){}
	},
	/**
	 * ���HTML����ĸ�ʽ
	 * @return	{void}
	 */
	_clearHTMLFormat: function() {
		if(confirm('"�����ʽ"���޸����µĸ�ʽ,ȷ�����? ')) { 
	  		var _oHE = this._oFrameElem;
			var _oDoc = (_oHE.contentDocument || _oHE.contentWindow.document).getElementsByTagName("BODY")[0];
	   		var _sValue = _oDoc.innerHTML; 	
	   		_oDoc.innerHTML = this._clearAllFormat(_sValue);
		}
		return;
	},
	/**
	 * ���仯�ı�, ���ı��е�P��ǩ���϶�ǰ�ո�TEXT-INDENT: 2em
	 * @return	{void}
	 */
	_paraFormating: function() {
		var _oHE = this._oFrameElem;
		var _oDoc = (_oHE.contentDocument || _oHE.contentWindow.document).getElementsByTagName("BODY")[0];
	    var _sValue = _oDoc.innerHTML; 	
	    var _reg = /<P>(.*)<\/P>/g;
	  	var _sResult = _sValue.replace(_reg,'<P style="TEXT-INDENT: 2em">$1</P>');
	  	_oDoc.innerHTML = _sResult;
	    return;
	},
	
	/**
	 * �ж��ı��Ƿ���MS Word�е��ı�
	 * @ignore
	 * @param	{String}	sTxt	ԭʼ�ı�
	 * @return	{Boolean}	�Ƿ���word�е��ı�
	 */
	_checkWordTxt: function(sTxt){
		//��ͨ����
		var _regTxt;
		//���
		var _regTable = /<table class="?MsoTableGrid"?/ig;
		if(isIE) {
			if(IEVer == 6)
				_regTxt = /<\w[^>]* class="?MsoNormal"?/ig;
			else(IEVer == 7)
				_regTxt = /<SPAN\sstyle=".*?(mso-.*?-font-family|mso-.*?-font-weight|mso-.*?-font-size)/ig
		}else if(isFirefox){
			_regTxt = /<\w[^>]* class="?MsoNormal"?/ig;
		}
	
		var _bResult = _regTxt.test(sTxt) || _regTable.test(sTxt);
		return _bResult;
	},
	/**
	 * ���MS Word�ı��еĶ����ʽ
	 * @param	{String}	sTxt	word�ı�
	 * @return	{String}	�����ʽ����ı�
	 */
	_clearWordFormat: function(sTxt) {
		var _sResult = sTxt;
		
		//ȥ��xml��ǩ
		_sResult = _sResult.replace(/<\\?\?xml[^>]*>/ig, "");
		_sResult = _sResult.replace(/<\/?\w+:[^>]*>/ig, "");
		
		//ȥ������<span>֮��ı�ǩ����,���б�ǩֻ������������class,lang,style(��font�е�face���Բ�������)
		var _rTag = /<\w+[^>]*>/ig;
		var _rSpan = /<SPAN[^>]*>/i;
		_sResult = _sResult.replace(_rTag, function($1){
			var _tag = $1;
			if(_rSpan.test(_tag)){
				var t = _tag;
				t = t.replace(/<(\w[^>]*) class=([^ |>]*)([^>]*)/i, "<$1$3");
				t = t.replace(/<(\w[^>]*) lang=([^ |>]*)([^>]*)/i, "<$1$3");
				return t;
			}else{
				//ȥ��������ǩ������
				var t = _tag;
				t = t.replace(/<(\w[^>]*) class=([^ |>]*)([^>]*)/ig, "<$1$3");
				t = t.replace(/<(\w[^>]*) style="([^"]*)"([^>]*)/ig, "<$1$3");
				t = t.replace(/<(\w[^>]*) lang=([^ |>]*)([^>]*)/ig, "<$1$3");
				return t;
			}
		});
		
		//����table�еĸ߶�,��ȥ��<td>�е�<p>
		/*_sResult = _sResult.replace(/<TD.*?>[\s\S]*?<\/TD>/gi,function($1){
			var s = $1;
			s = s.replace(/<\/?P[^>]*>/ig,'');
			return s;
		});*/
		
		
		//����span��ǩ
		var _r0 = /<span\s+.*?(style=".*?").*?>/ig;
		var _sResult = _sResult.replace(_r0,'<SPAN $1>');
		//ǰ�ӿո�
	    var _sResult = _sResult.replace('style="','style=" ');
	    //��ӷֺ�
		_sResult =  _sResult.replace(/(<span.*?)">/ig, '$1;">');
		//ȥ�����ڵķֺ�
		var _sResult = _sResult.replace(';;',';');
		
		
		//ȡĳ������ �Կո�ͷֺ���Ϊ�ָ���
		var _r1 = /\s+[^;"=]+:[^;"=]+[;]/ig; 
		var _r2 = /[^-](font-size|background|font-family|color).*/i
		
		_sResult = _sResult.replace(_r1, function($1){
			return _r2.test($1) ? $1 : "" ;
		});   		
		return _sResult;
	},
	/**
	 * �ж��Ƿ���HTML����
	 * @param	{String}	sTxt	ԭʼ�ı�
	 * @return	{Boolean}	�Ƿ�HTML����
	 */
	_checkIfHTMLTxt: function(sTxt){
		var r = /<\/?(span|div|h2|h3|code|center|form|input|select|textarea|iframe|img|a).*?>/ig;
		if(r.test(sTxt))
			return true;
		else
			return false;
	}
}
/**
 * ��̬����, Trimpath���ı��༭��ģ��
 * @final
 * @type String
 */
NECtrl.HtmlEditor._sHETemplateJst = 
	'<input type="hidden" name="HEContent" id="HEContent${editorId}">'+ // ����༭�����Ϣ
	'<div id="editor${editorId}"> '+
		'<div id="HEToolbar${editorId}" class="editorToolbar">'+
			'{if editorToolbar[0] == 1} '+
			'<div class="icons icoUndo" ><img class="editorToolbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" id="HEImgCut${editorId}"  '+
					'onclick="${containerObjName}.cmd(\'Undo\');" title="����" '+
					'onmousedown="${containerObjName}.tlBtnDwn(this);"  '+
					'onmouseover="${containerObjName}.tlBtnOvr(this);"  '+
					'onmouseout="${containerObjName}.tlBtnOut(this);"> '+
		  	'</div> '+
		  	'{/if} '+
		  	'{if editorToolbar[1] == 1} '+
		  	'<div class="icons icoRedo" ><img class="editorToolbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" id="HEImgCut${editorId}"  '+
					'onclick="${containerObjName}.cmd(\'Redo\');" title="����" '+
					'onmousedown="${containerObjName}.tlBtnDwn(this);"  '+
					'onmouseover="${containerObjName}.tlBtnOvr(this);"  '+
					'onmouseout="${containerObjName}.tlBtnOut(this);"> '+
		  	'</div> '+
		  	'{/if} '+
		  	'{if editorToolbar[2] == 1} '+
			'<div class="icons icoCut" ><img class="editorToolbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" id="HEImgCut${editorId}"  '+
					'onclick="${containerObjName}.cmd(\'Cut\');" title="����" '+
					'onmousedown="${containerObjName}.tlBtnDwn(this);"  '+
					'onmouseover="${containerObjName}.tlBtnOvr(this);"  '+
					'onmouseout="${containerObjName}.tlBtnOut(this);"> '+
		  	'</div> '+
		  	'{/if} '+
		  	'{if editorToolbar[3] == 1} '+
		  	'<div class="icons icoCpy" ><img class="editorToolbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" id="HEImgCopy${editorId}"  '+
		  			'onclick="${containerObjName}.cmd(\'Copy\');" title="����" '+
					'onmousedown="${containerObjName}.tlBtnDwn(this);"  '+
					'onmouseover="${containerObjName}.tlBtnOvr(this);"  '+
					'onmouseout="${containerObjName}.tlBtnOut(this);"> '+
		  	'</div> '+
		  	'{/if} '+
		  	'{if editorToolbar[4] == 1} '+
		  	'<div class="icons icoPse" ><img class="editorToolbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" id="HEImgPaste${editorId}"  '+
		  			'onclick="${containerObjName}.cmd(\'Paste\');" title="ճ��" '+
					'onmousedown="${containerObjName}.tlBtnDwn(this);"  '+
					'onmouseover="${containerObjName}.tlBtnOvr(this);"  '+
					'onmouseout="${containerObjName}.tlBtnOut(this);"> '+
		  	'</div> '+
		  	'{/if} '+
		  	'{if editorToolbar[5] == 1} '+
		  	'<div class="icoline" ><img class="editorToolbarLine" src="http://st.blog.163.com/style/common/htmlEditor/line.gif"/></div>'+
		  	'{/if} '+
		  	'{if editorToolbar[6] == 1} '+
		  	'<div class="icons icoFfm" ><img class="editorToolbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" id="HEImgFontFace${editorId}"  '+
		  			'onclick="${containerObjName}.cmd(\'FontFace\');${containerObjName}.tlBtnClk(this);return false;" title="����" '+
					'onmouseover="${containerObjName}.tlBtnOvr(this);"  '+
					'onmouseout="${containerObjName}.tlBtnOut(this);"> '+
		  	'</div> '+
		  	'{/if} '+
		  	'{if editorToolbar[7] == 1} '+
		  	'<div class="icons icoFsz" ><img class="editorToolbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" id="HEImgFontSize${editorId}"  '+
		  			'onclick="${containerObjName}.cmd(\'FontSize\');${containerObjName}.tlBtnClk(this);return false;" title="�ֺ�" '+
					'onmouseover="${containerObjName}.tlBtnOvr(this);"  '+
					'onmouseout="${containerObjName}.tlBtnOut(this);"> '+
		  	'</div> '+
		  	'{/if} '+
		  	'{if editorToolbar[8] == 1} '+
		  	'<div class="icons icoWgt" ><img class="editorToolbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" id="HEImgBold${editorId}"  '+
		  			'onclick="${containerObjName}.cmd(\'Bold\');" title="�Ӵ�" '+
					'onmousedown="${containerObjName}.tlBtnDwn(this);"  '+
					'onmouseover="${containerObjName}.tlBtnOvr(this);"  '+
					'onmouseout="${containerObjName}.tlBtnOut(this);"> '+
		  	'</div> '+
		  	'{/if} '+
		  	'{if editorToolbar[9] == 1} '+
		  	'<div class="icons icoIta" ><img class="editorToolbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" id="HEImgItalic${editorId}"  '+
		  			'onclick="${containerObjName}.cmd(\'Italic\');" title="б��" '+
					'onmousedown="${containerObjName}.tlBtnDwn(this);"  '+
					'onmouseover="${containerObjName}.tlBtnOvr(this);"  '+
					'onmouseout="${containerObjName}.tlBtnOut(this);"> '+
		  	'</div> '+
		  	'{/if} '+
		  	'{if editorToolbar[10] == 1} '+
		  	'<div class="icons icoUln" ><img class="editorToolbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" id="HEImgUnderline${editorId}"  '+
		  			'onclick="${containerObjName}.cmd(\'Underline\');" title="�»���" '+
					'onmousedown="${containerObjName}.tlBtnDwn(this);"  '+
					'onmouseover="${containerObjName}.tlBtnOvr(this);"  '+
					'onmouseout="${containerObjName}.tlBtnOut(this);"> '+
		  	'</div> '+	
		  	'{/if} '+
		  	'{if editorToolbar[11] == 1} '+	  	
		  	'<div class="icons icoAgn" ><img class="editorToolbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" id="HEImgAlign${editorId}"  '+
		  			'onclick="${containerObjName}.cmd(\'Align\');${containerObjName}.tlBtnClk(this);return false;" title="����" '+
					'onmouseover="${containerObjName}.tlBtnOvr(this);"  '+
					'onmouseout="${containerObjName}.tlBtnOut(this);"> '+
		  	'</div> '+
		  	'{/if} '+
		  	'{if editorToolbar[12] == 1} '+
		  	'<div class="icons icoLst" ><img class="editorToolbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" id="HEImgList${editorId}"  '+
		  			'onclick="${containerObjName}.cmd(\'List\');${containerObjName}.tlBtnClk(this);return false;" title="���" '+
					'onmouseover="${containerObjName}.tlBtnOvr(this);"  '+
					'onmouseout="${containerObjName}.tlBtnOut(this);"> '+
		  	'</div> '+
		  	'{/if} '+
		  	'{if editorToolbar[13] == 1} '+
		  	'<div class="icons icoIdt" ><img class="editorToolbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" id="HEImgIndent${editorId}"  '+
		  			'onclick="${containerObjName}.cmd(\'Indent\');" title="��������" '+
					'onmousedown="${containerObjName}.tlBtnDwn(this);"  '+
					'onmouseover="${containerObjName}.tlBtnOvr(this);"  '+
					'onmouseout="${containerObjName}.tlBtnOut(this);"> '+
		  	'</div> '+
		  	'{/if} '+
		  	'{if editorToolbar[14] == 1} '+
		  	'<div class="icons icoOdt" ><img class="editorToolbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" id="HEImgOutdent${editorId}"  '+
		  			'onclick="${containerObjName}.cmd(\'Outdent\');" title="��������" '+
					'onmousedown="${containerObjName}.tlBtnDwn(this);"  '+
					'onmouseover="${containerObjName}.tlBtnOvr(this);"  '+
					'onmouseout="${containerObjName}.tlBtnOut(this);"> '+
		  	'</div>'+
		  	'{/if} '+
		  	'{if editorToolbar[15] == 1} '+
		  	'<div class="icons icoPara" ><img class="editorToolbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" id="HEImgOutdent${editorId}"  '+
		  			'onclick="${containerObjName}.cmd(\'ParaFormatting\');" title="���仯" '+
					'onmousedown="${containerObjName}.tlBtnDwn(this);"  '+
					'onmouseover="${containerObjName}.tlBtnOvr(this);"  '+
					'onmouseout="${containerObjName}.tlBtnOut(this);"> '+
		  	'</div>'+
		  	'{/if} '+
		  	'{if editorToolbar[16] == 1} '+
		  	'<div class="icoline" ><img class="editorToolbarLine" src="http://st.blog.163.com/style/common/htmlEditor/line.gif"/></div> '+
		  	'{/if} '+
		  	'{if editorToolbar[17] == 1} '+
		  	'<div class="icons icoFcl"><img class="editorToolbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" id="HEImgFontColor${editorId}"  '+
		  			'onclick="${containerObjName}.cmd(\'ForeColor\');${containerObjName}.tlBtnClk(this);return false;" title="������ɫ" '+
					'onmouseover="${containerObjName}.tlBtnOvr(this);"  '+
					'onmouseout="${containerObjName}.tlBtnOut(this);"> '+
		  	'</div> '+
		  	'{/if} '+
		  	'{if editorToolbar[18] == 1} '+
		  	'<div class="icons icoBcl" ><img class="editorToolbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" id="HEImgBackColor${editorId}"  '+
		  			'onclick="${containerObjName}.cmd(\'BackColor\');${containerObjName}.tlBtnClk(this);return false;" title="������ɫ" '+
					'onmouseover="${containerObjName}.tlBtnOvr(this);"  '+
					'onmouseout="${containerObjName}.tlBtnOut(this);"> '+
		  	'</div> '+
		  	'{/if} '+
		  	'{if editorToolbar[19] == 1} '+
		  	'<div class="icons icoLn" ><img class="editorToolbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" id="HEImgBackColor${editorId}"  '+
		  			'onclick="${containerObjName}.cmd(\'Line\');" title="����" '+
					'onmousedown="${containerObjName}.tlBtnDwn(this);"  '+
					'onmouseover="${containerObjName}.tlBtnOvr(this);"  '+
					'onmouseout="${containerObjName}.tlBtnOut(this);"> '+
		  	'</div> '+
		  	'{/if} '+
		  	'{if editorToolbar[20] == 1} '+
		  	'<div class="icons icoTbl" ><img class="editorToolbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" id="HEImgBackColor${editorId}"  '+
		  			'onclick="${containerObjName}.cmd(\'Table\');" title="������" '+
					'onmousedown="${containerObjName}.tlBtnDwn(this);"  '+
					'onmouseover="${containerObjName}.tlBtnOvr(this);"  '+
					'onmouseout="${containerObjName}.tlBtnOut(this);"> '+
		  	'</div> '+
		  	'{/if} '+
		  	'{if editorToolbar[21] == 1} '+
		  	'<div class="icoline" ><img class="editorToolbarLine" src="http://st.blog.163.com/style/common/htmlEditor/line.gif"/></div> '+
		  	'{/if} '+
		  	'{if editorToolbar[22] == 1} '+
		  	'<div class="icons icoUrl" ><img class="editorToolbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" id="HEImgHyperlink${editorId}"  '+
		  			'onclick="${containerObjName}.cmd(\'Link\');" title="������" '+
					'onmousedown="${containerObjName}.tlBtnDwn(this);"  '+
					'onmouseover="${containerObjName}.tlBtnOvr(this);"  '+
					'onmouseout="${containerObjName}.tlBtnOut(this);"> '+
		  	'</div> '+
		  	'{/if} '+
		  	'{if editorToolbar[23] == 1} '+
		  	'<div class="icons icoImg" ><img class="editorToolbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" id="HEImgPicture${editorId}"  '+
		  			'onclick="${containerObjName}.cmd(\'Image\');return false;" title="���ͼƬ" '+
					'onmousedown="${containerObjName}.tlBtnDwn(this);return false;"  '+
					'onmouseover="${containerObjName}.tlBtnOvr(this);return false;"  '+
					'onmouseout="${containerObjName}.tlBtnOut(this);return false;"> '+
		  	'</div> '+
		  	'{/if} '+
		  	'{if editorToolbar[24] == 1} '+
		  	'<div class="icons icoMdi" ><img class="editorToolbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" id="HEImgPicture${editorId}"  '+
		  			'onclick="${containerObjName}.cmd(\'Media\');" title="��Ӷ�ý��" '+
					'onmousedown="${containerObjName}.tlBtnDwn(this);"  '+
					'onmouseover="${containerObjName}.tlBtnOvr(this);"  '+
					'onmouseout="${containerObjName}.tlBtnOut(this);"> '+
		  	'</div> '+
		  	'{/if} '+
		  	'{if editorToolbar[25] == 1} '+
		  	'<div class="icons icoMfc" ><img class="editorToolbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" id="HEImgPortrait${editorId}"  '+
		  			'onclick="${containerObjName}.cmd(\'Portrait\');${containerObjName}.tlBtnClk(this);return false;" title="ħ������" '+
					'onmouseover="${containerObjName}.tlBtnOvr(this);"  '+
					'onmouseout="${containerObjName}.tlBtnOut(this);"> '+
		  	'</div> '+	
		  	'{/if} '+
		  	'{if editorToolbar[26] == 1} '+	
		  	'<div class="icoline" ><img class="editorToolbarLine" src="http://st.blog.163.com/style/common/htmlEditor/line.gif"/></div> '+
		  	'{/if} '+
		  	'{if editorToolbar[27] == 1} '+
		  	'<div class="icons icoFmt" ><img class="editorToolbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" id="HEImgPortrait${editorId}"  '+
		  			'onclick="${containerObjName}.cmd(\'ClearFormat\');" title="�����ʽ" '+
					'onmousedown="${containerObjName}.tlBtnDwn(this);"  '+
					'onmouseover="${containerObjName}.tlBtnOvr(this);"  '+
					'onmouseout="${containerObjName}.tlBtnOut(this);"> '+
		  	'</div> '+	
		  	'{/if} '+
		  	
		  	  	
		'</div>	 '+
		// <!--�����ǲ˵�ѡ��-->
		'<div id="HEFontFace${editorId}" class="editorFontFace" style="display:none;"></div> '+
		'<div id="HEFontSize${editorId}" class="editorFontSize" style="display:none;"></div> '+
		'{if simpleEditor == false} '+
		'<div id="HEList${editorId}" class="editorList" style="display:none;"></div> '+
		'<div id="HEAlign${editorId}" class="editorAlign" style="display:none;"></div> '+
		'{/if} '+
		'<div id="HEForeColor${editorId}" class="editorForeColor" style="display:none;"></div> '+
		// <!--����ѡ��ģ��-->
		'<div id="HEPortrait${editorId}" class="editorPortrait" style="display:none;">' +
		'</div> '+
		// <!--�����Ǳ༭��-->
		'<div id="HEHtmlDiv${editorId}" class="htmlEditorFrameWrap"> '+
			//'<iframe id="HEHtmlEditor${editorId}" class="htmlEditor" style="visibility:hidden;" width="${width}px" height="${height}px" name="htmlEditor${editorId}" frameborder="0" src="${editorSrc}"></iframe> '+
		'</div> '+
		'<div id="HESourceDiv${editorId}" style="display:none"> '+
			'<textarea id="HESourceEditor${editorId}" class="sourceEditor" style="height:${height}px;"></textarea> '+
		'</div> '+	
		'{if simpleEditor == false} '+
		'<div id="HEStatusbar${editorId}">'+
			'<div class="statusbar">'+
				'<div class="floatleft">&nbsp;&nbsp;</div>'+
				'<div class="floatleft icons icoSource"><img class="statusbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" '+
					'title="��ʾHTML����" id="HEMode${editorId}" '+
					'onclick="${containerObjName}.swtMode();" '+
					'onmouseover="${containerObjName}.tlBtnOvr(this);" '+
					'onmouseout="${containerObjName}.tlBtnOut(this);"/>'+
				'</div>'+
				'<div class="floatleft">&nbsp;</div>'+	
				'<div class="icoline" ><img class="editorToolbarLine" src="http://st.blog.163.com/style/common/htmlEditor/line.gif"/></div>'+
				'<div class="floatleft">&nbsp;</div>'+	
				'<div class="floatleft icons icoPreview"><img class="statusbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" '+
					'title="Ԥ��" '+
					'onclick="${containerObjName}.goPreview();return false;" '+
					'onmousedown="${containerObjName}.tlBtnDwn(this, true);" '+
					'onmouseover="${containerObjName}.tlBtnOvr(this ,true);" '+
					'onmouseout="${containerObjName}.tlBtnOut(this, true);"/>'+
				'</div>'+
				'<div style="float:right">' +
					'<div class="icons icoMinus"><img class="statusbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif" title="��С�༭���߶�" '+
						'onclick="${containerObjName}.delHeight();return false;" ' +
						'onmousedown="${containerObjName}.tlBtnDwn(this);" '+
						'onmouseover="${containerObjName}.tlBtnOvr(this);" '+
						'onmouseout="${containerObjName}.tlBtnOut(this);"/>'+
					'</div>' +
					'<div class="icons icoAdd" ><img class="statusbarButton" src="http://st.blog.163.com/style/common/htmlEditor/place.gif"  title="���ӱ༭���߶�" ' +
						'onclick="${containerObjName}.addHeight();return false;" ' +
						'onmousedown="${containerObjName}.tlBtnDwn(this);" '+
						'onmouseover="${containerObjName}.tlBtnOvr(this);" '+
						'onmouseout="${containerObjName}.tlBtnOut(this);"/>'+
					'</div>' +
				'</div>'+
			'</div>'+
		'</div>'+
		'{/if} '+
	'</div> ';

/**************************************************************
*				163 blog portrait panel  				   	  *
*                                                             *
* Written by:  zhuyiwen                                       *
* Important: to use this script don't                         *
*            remove these comments                            *
* Version 2.0 (MSIE 6.0 above,Firefox1.0,Netscape.)           *
* Created Date: 2006-10-25									  *
* Copyright��1997-2006 NetEase.com Inc. All rights reserved.  *
**************************************************************/

/** 
 * @fileoverview 
 * ħ���������
 * 
 * @author  	zhuyiwen@(zhuyiwen@corp.netease.com)
 * @version 	2.0 
 * @requires  	utils.js
 * @requires  	prototype.js
 * @requires 	HtmlEditor.js
 * @see		    
 */

if (NECtrl==undefined){
	var NECtrl={};
}

/**
 * NECtrl.Portrait class
 * @class	ħ������ѡ�����
 */
NECtrl.Portrait = Class.create();



/**
 * ��̬����, "����"����ʾ����
 * @final
 * @type	Array
 */
NECtrl.Portrait._faceTips = 
[	'΢Ц',		'����Ц',		'����',		'ʧ��',		'����',
 	'�ú�Ц',		'�',		'�絽��',		'��', 		'����ˮ��',
  	'������', 	'����', 		'գ��', 		'������', 	'��',
  	'������', 	'��˵', 		'��', 		'ɫ����', 	'��ѵ',
 	'�ɰ�', 		'YEAH', 	'����', 		'����', 		'����',
 	'����', 		'��Ľ��', 	'��', 		'�ڱǿ�', 	'����', 
 	'����', 		'����', 		'�ϴ�', 		'Ƿ��', 		'����Ц��', 
 	'����', 		'����æ', 	'���', 		'͵͵Ц', 	'�ͻ�����', 
 	'������һ��', '������', 	'�ݰ�', 		'�����Ц', 	'����', 
 	'����', 		'����', 		'�ѹ�', 		'̾��', 	    '����Ů��', 
 	'õ��', 		'�ð���', 	'������', 	'����', 		'NO', 
 	'YES', 		'�ո���', 	'������', 	'����', 		'��������', 
 	'��Ѫ�ĵ�', 	'ը��', 		'����', 		'������', 	'��Ѫ����', 
 	'���', 		'��һ��', 	'����', 		'��绰', 	'��', 
 	'����', 		'����', 		'��Ǯ', 		'̫��', 		'����', 
 	'����', 		'Сè', 		'С��', 		'��ͷ', 		'��ˮ', 
 	'����', 		'����', 		'����', 		'Լ��',      'CALL��'
];	
/**
 * ��̬����, "������"����ʾ����
 * @final
 * @type	Array
 */
NECtrl.Portrait._westTips =
[  '΢Ц','����','����','����','���˰�','����','ţ��','С��','������','����',
   '����','����','ʱ��','����','��ˬ','ʹ��','ţͷ','����','���հ�','�ټ�',
   '˧��','��һ��','�绰','�׻�','���ǰ�','����ͷ','yes','no','ˬ��','С��',
   '����','����','����','����','��','����','����','yeah','���','�ȷ�',
   '����','����','����','����','��ף','��̾','�к�','��ο','���а�','����',
   'ʤ����','�к�','�ҿ�','�ɰ�','��ˬ','����','��Ц','call��','����Ŷ','��Ϣ',
   '��','����','��Ц','����','����','Ż��','����','�ұ���','����','����',
   '��ҽ','����','ϲ����','������','��','����','����','����','��ù','�Ҷ�',
   '����ˮ','�ٶ�','������','��ӭ','��ϲ','�ʼ�','���ҵ�','����','ɫ����','�װ���',
   '��ϡ��','ǿ','�Ⱦ�','�군','��ͷ','�ݰ�','ˬ��','�׻�','������','�',
   '������','���','С����','����'
];
/**
 * ��̬����, "������"����ʾ����
 * @final
 * @type	Array
 */	
NECtrl.Portrait._popoTips =
[  '������','������','֩����','΢Ц','ץ��','����Ѫ','˭��p','������','���','Ѫ����',
   '���ǰ�','���Ƿ','��˥','��Һ�','Ͷ��','��Ц','����ˮ','�ϴ�','�۰�','������',
   '����','ʹ��','����','����','����','����','����','����','��','����',
   'ŭ��','ɵЦ','����','��ù','����','��Ľ','͵��','����','��ש','������',
   '��ɫ','����','����','����','����','����','������','����','ǿ','��',
   'ˬ��','����','yoyo','̫�в�','����','����','ˣ��','ȱ��','�ִ���','�Ѻ�',
   '����','�ҿ�','����','����','������','����','��ҲҪ','��ζ','��Ц','����',
   '����','����','����','�κ�','����','�ߺ�','�۾�','����','��С��','������',
   '�׳���','���','��ӭ','����'
];
/**
 * ��̬����, "С��"����ʾ����
 * @final
 * @type	Array
 */
NECtrl.Portrait._bearTips = 
[  '����','������','����ʳ','д��','����','����','��Ƥ��','����Ŷ','�Է���','�Ա���',
   '��Ц','����','����','����','����','գ�۾�','������','����','������','������',
   '��в','�����','����','����','�߸�','ħ����','���','�ټ�','����'
];
/**
 * ��̬����, ��ʾ���ֹ�������
 * @final
 * @type	Array
 */
NECtrl.Portrait._tips = 
{	"face": NECtrl.Portrait._faceTips,
	"popo": NECtrl.Portrait._popoTips,
	"west": NECtrl.Portrait._westTips,
	"bear": NECtrl.Portrait._bearTips
};
/**
 * ��̬����, ħ������ͼ���Ӧ�ķ�������ַǰ׺
 * @final
 * @type	String
 */
NECtrl.Portrait._filePath = "http://st.blog.163.com/style/common/htmlEditor/portrait/";
/**
 * ��̬����, ħ������ͼ�깲�ж�����(һ��page��)
 * @final
 * @type	Number
 */
NECtrl.Portrait._row = 6;
/**
 * ��̬����, ÿ����ʾħ������ĸ���,�����ж�����(һ��page��)
 * @final
 * @type	Number
 */
NECtrl.Portrait._col = 10;

/**
 * @class	NECtrl.Portrait._portraitPage
 * 			�����, ��ʾһ��ħ������
 * @private
 * @constructor
 * @param	{Number}	iCount		����ħ������ͼ��ĸ���
 * @param	{String}	sName		����ħ����������
 * @param	{String}	sPath		�����·��ǰ׺
 * @param	{Number}	iPageCount	���������ʾʱ���ж���ҳ
 * 
 */
NECtrl.Portrait._portraitPage = function(iSize, sName, sPath, iPageCount, iGrid){
	this.size = iSize;
	this.name = sName;
	this.path = sPath;
	this.pageCount = iPageCount;
	this.grid = iGrid
};
/**
 * ħ�����������ӳ��
 * @type	Map
 * @see 	NECtrl.Portrait._portraitPage
 */
NECtrl.Portrait._allCat = {
	"face": new NECtrl.Portrait._portraitPage(85,  "����",  "face",  Math.ceil(85/(NECtrl.Portrait._row * NECtrl.Portrait._col))-1, 1),
	"popo": new NECtrl.Portrait._portraitPage(84,  "������",  "popo", Math.ceil(84/(NECtrl.Portrait._row * NECtrl.Portrait._col))-1, 1),
	"west": new NECtrl.Portrait._portraitPage(104,  "�λ�����",  "west",  Math.ceil(104/(NECtrl.Portrait._row * NECtrl.Portrait._col))-1 ,1),
	"bear": new NECtrl.Portrait._portraitPage(29,  "������",  "bear", Math.ceil(29/(NECtrl.Portrait._row * NECtrl.Portrait._col/4))-1, 2)
};
/**
 * ħ���������������
 * @type	Array
 */
NECtrl.Portrait._allTypes = ["face","popo","west","bear"];



NECtrl.Portrait.prototype = {
	/**
	 * Portrait�๹�캯��, ��ʼ��Portrait����Ԥ�����
	 * @constructor
	 * @param	{String}	sParentId		�༭������(HtmlEditor)�����Ӧ��id
	 * @param	{Object}	oHtmlEditor		����ѡ������Ӧ�ı༭������	
	 * @return 	{NECtrl.Portrait} 			Portrait����
	 */
	initialize: function(sParentId, oHtmlEditor){
		/**
		 * ��ʼ������ѡ��
		 * @private
		 * @type	Object
		 */
		this._oOptions = Object.extend({
			bFriend   : false        // �Ƿ����
		}, arguments[2] || {});	
		/**
		 * �༭������(HtmlEditor)�����Ӧ��id
		 * @private
		 * @type String
		 */	
		this._sParentId = sParentId;
		/**
		 * ����ѡ������Ӧ�ı༭������(һһ��Ӧ)
		 * @private
		 * @type Object
		 */
		this._oHtmlEditor = oHtmlEditor;
		/**
		 * ����ѡ������ʼҳ��
		 * @private
		 * @type Object
		 */
		this._sStart = "face";
		/**
		 * ��ǰ��ʾ��ҳ�����,����ҳ���������,��ǰҳ��
		 * @private
		 * @type Object
		 */
		this._current = new Object();
		/**
		 * portrait��������, ����html�е���
		 * @private
		 * @type String 
		 */
		this._sObjectName = this._oHtmlEditor.objectName +".portrait";
		/**
		 * html Dom�е�portrait����
		 * @private
		 * @type Object
		 */
		this._oPortraitDiv = null;
		
		//trimpath parse
		var _data = {editorId:this._sParentId, isFriend: this._oOptions.bFriend};
		/**
		 * trimpath�������html����, ��������Div��
		 * @private
		 * @type String
		 */
		this._sPortraitHTML = NECtrl.Portrait._sPorJst.processUseCache(_data);
		
		return this;
	},
	/**
	 * ��ʾ����
	 * @param	{Object}	oPortraitDiv	html Dom�е�portrait��ʾdiv
	 * @return	{Void}
	 */
	display: function(oPortraitDiv) {
		oPortraitDiv.innerHTML = this._sPortraitHTML;
		this._oPortraitDiv = oPortraitDiv;
		
		// ��ֹwindow��iframe��Ĭ���¼���ʹ�õ��divʱ���ᱻ����
		this._oPortraitDiv.onclick = function(oEvent){
			if(isIE) {
				window.event.cancelBubble = true;
			}else {
				oEvent.stopPropagation();
			}
		};
		
		//������ʾȫ�����͵ı���, �Ǻ���ֻ����ʾ"����"����
		if(this._oOptions.bFriend == true) {
			this._setNav();
		}
		this._current.type = this._sStart;
		this._current.page = 0;
		this._change(this._sStart);
	},
	/**
	 * ��ת����ҳ��
	 * @param	{String}	sType	ħ����������
	 * @return	{Void}
	 */
	go:	function(sType){
		this._current.type = sType;
		this._current.page = 0;
		this._change(sType);
	},
	/**
	 * ����Ƶ�����ͼ���ϵ�Ч��, ��ʾԤ��ͼƬ
	 * @param	{Object}	oPorPic		ħ������ͼ��
	 * @param	{Number}	iNum		��ҳ�еĵڼ���ͼ��
	 * @param	{String}	sType	��������
	 * @return	{Void}
	 */
	portraitMouseOvr: function(oPorPic,iNum, iGrid){
		oPorPic.style.border='1px solid #000000';
		var _oPreview = $("portraitPreview" + this._sParentId);
		
		var row,col;
		if(iGrid ==1){
			row = NECtrl.Portrait._row;
			col = NECtrl.Portrait._col;
		}else {
			row = NECtrl.Portrait._row/2;
			col = NECtrl.Portrait._col/2;
		}
		
		var _iCountStart = this._current.page * row * col;
		//��<table>��Ϊ�˱�֤ͼƬ�Ĵ�ֱ����Ч��
		_oPreview.innerHTML = '<table class="g_c_clrpd" style="table-layout:auto;width:60px;height:60px;border:solid #777777 1px;background-color:#ffffff"><tr valign=middle align=center><td><img src='+ NECtrl.Portrait._filePath + this._current.type + "/preview/" + this._current.type + (_iCountStart + iNum) +'.gif></td></tr></table>';
		
		
		
		var _pos = oPorPic.parentNode.cellIndex;
	
		if(Math.round(_pos/col)){
			_oPreview.style.left = '4px';
			_oPreview.style.right = '';
		}else{
			if(this._oOptions.bFriend == true) {
				_oPreview.style.right = '62px';
			}else{
				_oPreview.style.right = '7px';
			}
			_oPreview.style.left = '';
		}
		_oPreview.style.top =   "5px";
		_oPreview.style.display = "block";
	},
	/**
	 * ����Ƴ�����ͼ���ϵ�Ч��
	 * @param	{Object}	oPorPic		ħ������ͼ��
	 * @param	{Number}	iNum		��ҳ�еĵڼ���ͼ��
	 * @return	{Void}
	 */
	portraitMouseOut: function(oPorPic){
		oPorPic.style.border='';
		var _oPreview = $("portraitPreview" + this._sParentId);
		_oPreview.style.display = "none";
	},
	/**
	 * ������¼�, ��Ԥ��ͼ����༭����
	 * @param	{String}	sSrc	�����ͼƬԴ�ļ�src·��
	 * @return	{Void}
	 * @see		NECtrl.HtmlEditor#format
	 */
	portraitClick: function(sSrc) {
		if (sSrc != null){
			var index = sSrc.lastIndexOf("/");
			var file = sSrc.substring(index);
			sSrc = sSrc.replace(file, "/preview" + file);
			this._oHtmlEditor.format("InsertImage", sSrc);
			this._oPortraitDiv.style.display = "none";
			this._oHtmlEditor.tlBtnUnClk();
		}
	},
	/**
	 * ��һҳ�¼�
	 * @return	{Void}
	 */
	portraitNextPage: function(){
		var _obj = this._getTypeObj(this._current.type);
		if(this._current.page != _obj.pageCount){
			this._current.page ++;
		}
		this._change(this._current.type);
	},
	/**
	 * ��һҳ�¼�
	 * @return	{Void}
	 */
	portraitPrePage: function(){
		if(this._current.page != 0){
			this._current.page --;
		}
		this._change(this._current.type);
	},
	/**
	 * ��ʼ���Ҳർ����������ÿ����Ŀ��id
	 * @return	{Void}
	 */
	_setNav: function() {
		var _oNav = $("portraitNav" + this._sParentId);
		var _iSize = NECtrl.Portrait._allTypes.length;
		for(var i=0;i<_iSize;i++){
			var _oTr = _oNav.insertRow(_oNav.rows.length-1);
			var _oTd = _oTr.insertCell(-1);
			var _sType = NECtrl.Portrait._allTypes[i];
			_oTd.id = _sType;
			_oTd.style.height = "32px";
		}
	},
	
	/**
	 * �ı��Ҳർ������ʾ (��ǰħ���������ͺ�����������ʾ����)
	 * ÿ�ε��ʱ����
	 * @param	{String}	sType	��������
	 * @return	{Void}
	 */
	_changeTag: function(sType){
		var _iSize = NECtrl.Portrait._allTypes.length;
		for(var i=0;i<_iSize;i++){
			var _type = NECtrl.Portrait._allTypes[i];
			var _oTd = $(_type);
			if(_type == sType){
				_oTd.className = "mf_nowchose";
				_oTd.innerHTML = "&nbsp;"+NECtrl.Portrait._allCat[_type].name;
			}else{
				_oTd.className = "mf_other";
				_oTd.innerHTML = '<a  href="#" onclick="'+this._sObjectName+'.go(\''+_type  +'\'); return false;">&nbsp;'+NECtrl.Portrait._allCat[_type].name+'</a>';
			}
		}
	},
	
	/**
	 * �ı�ħ���������
	 * @param	{String}	sType	��������
	 * @return	{Void}
	 */
	_change: function(sType) {
		if(this._oOptions.bFriend == true) {
			this._changeTag(sType);
		}
		this._fillPic(sType);
		this._getPage(sType);
	},
	/**
	 * ���뵼����(��ҳ/��ҳ)��ʾ
	 * @param	{String}	sType	��������
	 * @return	{Void}
	 */
	_getPage: function(sType){
		var _oPage = $("portraitPage" + this._sParentId);
		var obj = this._getTypeObj(sType);
		
		_oPage.innerHTML = ((this._current.page != 0)?'<a href="#" id="portraitPrePage'+this._sParentId+'" class="mf_link" onclick="'+this._sObjectName+'.portraitPrePage();return false;">��һҳ</a>':'<span style="color:#777777">��һҳ</span>') +
			'&nbsp;<span style="color:#777777;">|</span>&nbsp;' + 
			((this._current.page != obj.pageCount)?'<a href="#" class="mf_link" onclick="'+this._sObjectName+'.portraitNextPage();return false;">��һҳ</a>':'<span style="color:#777777">��һҳ</span>');
	},

	/**
	 * �������ͼ��
	 * @param	{String}	sType	��������
	 * @return	{Void}
	 */
	_fillPic: function(sType){
		// ��ǰҳ�ı������
		var _iCount = this._getCurrentPageCount(sType,this._current.page);
		// �˱�����ռ���к���
		var row,col,borderLen;
		if(NECtrl.Portrait._allCat[sType].grid ==1){
			row = NECtrl.Portrait._row;
			col = NECtrl.Portrait._col;
			borderLen = 29;
		}else {
			row = NECtrl.Portrait._row/2;
			col = NECtrl.Portrait._col/2;
			borderLen = 59;
		}
		var _iCountStart = this._current.page * row * col;
		var _oContent = $("portraitContent" + this._sParentId);
		var n = 0;
		for(var i=_oContent.rows.length-1;i>-1;i--){
			_oContent.deleteRow(i);
		}
		for(var i=0;i<row;i++){
			if(n == _iCount) break;
			var tr = _oContent.insertRow(-1);
			for(var j=0;j<col;j++){
				if(n == _iCount){
					if(_iCount<col){		
						for(var k=0; k<(col-_iCount);k++) {
							var emptyTd = tr.insertCell(-1);
							emptyTd.cssText = "height:"+borderLen+"px; width:"+borderLen+"px;";
						}
					}				
					break;
				}
				var _oTd = tr.insertCell(-1);
				_oTd.style.cssText = "height:"+borderLen+"px; width:"+borderLen+"px; background-color:#FFFFFF; text-align:center;";	
				_oTd.innerHTML = '<div style=" width:'+(borderLen-2)+'px; height:'+(borderLen-2)+'px;text-align:center;" onmouseover="'+this._sObjectName+'.portraitMouseOvr(this,'+ n +','+NECtrl.Portrait._allCat[sType].grid+')" onmouseout="'+this._sObjectName+'.portraitMouseOut(this)"><a href="#"><img src="'+ NECtrl.Portrait._filePath + sType + "/" + sType + (_iCountStart + n) +'.gif" width="'+(borderLen-4)+'" height="'+(borderLen-4)+'" title="'+ NECtrl.Portrait._tips[sType][_iCountStart+n] +'" border="0" onclick="'+this._sObjectName+'.portraitClick(this.src);return false;"></a></div>';
				n ++;
			}
		}
	},
	/**
	 * ��ǰҳ�ı������ (�����������ҳ,������������row * col)
	 * @param	{String}	sType	��������
	 * @param	{Number}	iPage	��ǰ��ʾ�ڵڼ�ҳ
	 * @return	{Number}	��ǰҳ��ħ������ͼ�����
	 */
	_getCurrentPageCount: function(sType,iPage){
		var size = NECtrl.Portrait._allCat[sType].size;
		var pageCount = NECtrl.Portrait._allCat[sType].pageCount;
		var row,col;
		if(NECtrl.Portrait._allCat[sType].grid ==1){
			row = NECtrl.Portrait._row;
			col = NECtrl.Portrait._col;
		}else {
			row = NECtrl.Portrait._row/2;
			col = NECtrl.Portrait._col/2;
		}
		if(iPage == pageCount){
			return size%(row * col);
		}else{
			return row * col;
		}
	},
	/**
	 * ���ݱ�������ȡ�õ�ǰ�������Ͷ���
	 * @param	{String}	sType	��������
	 * @return	{NECtrl.Portrait._portraitPage}	�������Ͷ���
	 * @see 	NECtrl.Portrait._portraitPage
	 */
	_getTypeObj: function(sType){
		return NECtrl.Portrait._allCat[sType];
	}
}



/**
 * ��̬����, Trimpathħ������ģ��
 * @final
 * @type	String
 */
NECtrl.Portrait._sPorJst = new String(
	'{if isFriend == true}'+
		'<table class="g_c_clrpd" style="width:360px;height:200px" border="0" cellpadding="0" cellspacing="0">' +
	'{else}' +
		'<table class="g_c_clrpd" style="width:317px;height:200px" border="0" cellpadding="0" cellspacing="0">' +
	'{/if}' +
	'<tr>' +
	'<td valign="top" bgcolor="#e5e5e1" id="magicface${editorId}" style="width:308px;height:200px;border:1px solid #aaaaaa; border-right:none; padding:3px;">' +
		'<div style="height:182px;">' +
			'<table class="g_c_clrpd" style="width:308px" border="0" cellspacing="1" cellpadding="0" id="portraitContent${editorId}"></table>' +
		'</div>' +
		'<div id="portraitPage${editorId}" class="mf_page"></div>' +
	'</td>' +
	'{if isFriend == true}' +
		'<td style="width:58px" valign="top">' +
		'<table width="100%" style="height:200px" border="0" cellpadding="0" cellspacing="0" id="portraitNav${editorId}">' +
		'<tr>' +
		'<td class="mf_leftBorder" style="height:93px;line-height:83px;">&nbsp;</td>' +
		'</tr>' +
		'</table>' +
		'</td>' +
	'{else}'+
		'<td class="mf_leftBorder" style="height:200px;width:2px">&nbsp;</td>' +
	'{/if}'+
	'</tr>' +
	'</table>' +
	'<div id="portraitPreview${editorId}" style="position:absolute;z-index:200000;display:none"></div>') ;
/**************************************************************
*				163 blog color panel				   	  	  *
*                                                             *
* Written by:  zhuyiwen(zhuyiwen@corp.netease.com)            *
* Important: to use this script don't                         *
*            remove these comments                            *
* Version 2.0 (MSIE 6.0 above,Firefox1.0,Netscape.)           *
* Created Date: 2006-10-25									  *
* Copyright��1997-2006 NetEase.com Inc. All rights reserved.  *
**************************************************************/

/** 
 * @fileoverview 
 * ��ɫѡȡ���
 * 
 * @author  	zhuyiwen@(zhuyiwen@corp.netease.com)
 * @version 	2.0 
 * @requires  	utils.js
 * @requires  	prototype.js
 * @requires 	HtmlEditor.js
 * @see		  
 */

if (NECtrl==undefined){
	var NECtrl={};
}

/**
 * NECtrl.ColorPanel class
 * @class	��ɫѡ�����
 */
NECtrl.ColorPanel = Class.create();


/**
 * ��̬����, 16������ɫ�������
 * @final
 * @type	Array
 */
NECtrl.ColorPanel._ColorHex=['00','33','66','99','CC','FF'];
/**
 * ��̬����, �ڶ�����ɫ��ʾ�б�
 * @final
 * @type	Array
 */
NECtrl.ColorPanel._SpColorHex=['FF0000','00FF00','0000FF','FFFF00','00FFFF','FF00FF'];
/**
 * ��̬����, �հ׵�1pxͼƬ
 */
NECtrl.ColorPanel._picSrc = "http://st.blog.163.com/style/common/htmlEditor/place.gif";




NECtrl.ColorPanel.prototype = {
	/**
	 * ColorPanel�๹�캯��, ��ʼ��ColorPanel����Ԥ�����
	 * @constructor
	 * @param	{String}	sParentId		�༭������(HtmlEditor)�����Ӧ��id
	 * @param	{Object}	oHtmlEditor		��ɫѡ������Ӧ�ı༭������	
	 * @return 	{NECtrl.Portrait} 			Portrait����
	 */
	initialize: function(sParentId, oHtmlEditor) {
		/**
		 * ���ö����Ӧ��id
		 * @private
		 * @type 	String
		 */	
		this._sParentId = sParentId;
		/**
		 * ��ɫѡ�����Ķ���
		 * @private
		 * @type 	Object
		 */	
		this._oHtmlEditor = oHtmlEditor;
		/**
		 * ColorPanel���󱻵��õ�ʵ������
		 * @private
		 * @type 	String
		 */	
		this._sObjName = this._oHtmlEditor.objectName +".colorpanel";
		/**
		 * ��ǰѡ�е���ɫ����
		 * @private
		 * @type 	Object
		 */	
		this._oCurrentColor = null;
	},
	/**
	 * ��ʾ��ɫѡ�����, Ĭ����ʾ����ɫ���. 
	 * ��NECtrl.HtmlEditor�������
	 * @param	{Ojbect}	oColorDiv	�༭����������ʾ��ɫ����Div����
	 * @param	{String}	sColorType	��ɫ��������, ǰ��ɫ�򱳾�ɫ
	 * @return	{Void}
	 * @see		#_displaySimpleColorBoard
	 */
	display: function(oColorDiv, sColorType){
		this._displaySimpleColorBoard(oColorDiv, sColorType);
		//this._displayFullColorBoard(oColorDiv, sColorType);
	},
	/**
	 * ����������ֵ�Ч�� (���ְ���:�����ɫ,������ɫ)
	 * @param	{Object}	oElem	��ɫ�����
	 * @return	{Void}
	 */
	 colorTxtOvr: function(oElem) {
		oElem.style.border = "1px #000080 solid";
		oElem.style.backgroundColor = "#FFEEC2";
	},
	/**
	 * ����Ƴ����ֵ�Ч�� (���ְ���:�����ɫ,������ɫ)
	 * @param	{Object}	oElem	��ɫ�����
	 * @return	{Void}
	 */
	colorTxtOut: function(oElem){
		oElem.style.border = "1px white solid";
		oElem.style.backgroundColor = "white";
	},
	/**
	 * ���ɼ��װ���ɫѡ����html����
	 * @return	{String}	���װ���ɫѡ����html����
	 */
	_drawSimpleColorPanel: function() {
		var a = [];
		a.push('<div style="border:1px #9FAC87 solid; width:158px;background-color:white;">');
		
		a.push('<div style="position:relative;margin-left:2px; margin-top:3px; margin-bottom:0px;height:19px">');
		a.push('<img id="colorClear' + this._sParentId + '" src="http://st.blog.163.com/style/common/htmlEditor/simple_colr_remove.gif" style="width:150px;height:17px;background-color:white;border:1px solid #FFFFFF;cursor:pointer;" onmouseover="'+this._sObjName+'.colorTxtOvr(this);" onmouseout="'+this._sObjName+'.colorTxtOut(this);"/>');
		a.push('<div id="colorPrez' + this._sParentId + '" style="position:absolute;top:3px;left:4px;border:1px solid #ACA899;font-size:1px;width:28px;height:11px;"> </div>');
		
		a.push('</div>');
		
		a.push('<div>');
		a.push('<table class="g_c_clrpd" id="colorSelectPanel' + this._sParentId + '" cellspacing="6" cellpadding="0" style="border-collapse:separate;">');
		a.push('<tr>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#000000; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="��ɫ"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#993300; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="��ɫ"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#333300; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="���ɫ"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#003300; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="����"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#003366; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="����"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#000080; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="����"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#333399; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="����"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#333333; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="��ɫ-80%"></img></td>');
		a.push('</tr><tr>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#800000; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="���"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#FF6600; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="��ɫ"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#808000; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="���"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#008000; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="��ɫ"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#008080; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="��ɫ"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#0000FF; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="��ɫ"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#666699; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="��-��"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#808080; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="��ɫ-50%"></img></td>');
		a.push('</tr><tr>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#FF0000; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="��ɫ"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#FF9900; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="ǳ��ɫ"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#99CC00; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="���ɫ"></img></td>');	
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#339966; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="����"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#33CCCC; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="ˮ��ɫ"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#3366FF; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="ǳ��"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#800080; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="������"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#999999; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="��ɫ-40%"></img></td>');
		a.push('</tr><tr>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#FF00FF; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="�ۺ�"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#FFCC00; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="��ɫ"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#FFFF00; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="��ɫ"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#00FF00; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="����"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#00FFFF; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="����"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#00CCFF; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="����"></img></td>');	
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#993366; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="÷��"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#C0C0C0; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="��ɫ-25%"></img></td>');
		a.push('</tr><tr>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#FF99CC; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="õ���"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#FFCC99; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="��ɫ"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#FFFF99; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="ǳ��"></img></td>');	
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#CCFFCC; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="ǳ��"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#CCFFFF; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="ǳ����"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#99CCFF; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="����"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#CC99FF; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="����"></img></td>');
		a.push('<td><img src="'+ NECtrl.ColorPanel._picSrc +'" style="background-color:#FFFFFF; border:1px solid #ACA899;font-size:1px;width:11px;height:11px; cursor:pointer" title="��ɫ"></img></td>');
		a.push('</tr>');
		a.push('</table>');
		a.push('</div>');
		a.push('<img id="moreColor' + this._sParentId + '" src="http://st.blog.163.com/style/common/htmlEditor/more_colr.gif" style="border:1px solid white; margin-left:3px; margin-top:0px; margin-bottom:3px; height:16px; width:150px; cursor:pointer;" onmouseover="'+this._sObjName+'.colorTxtOvr(this);" onmouseout="'+this._sObjName+'.colorTxtOut(this);"/>');
		
		a.push('</div>');
		return a.join("");
	},
	/**
	 * ������ȫ����ɫѡ����html����
	 * @return	{String}	��ȫ����ɫѡ����html����
	 */
	_drawFullColorPanel: function() {
		var a = [];
		a.push('<div style="width:203px; border:1px #4e6e89 solid;background-color:#FFFFFF">');
		
		a.push('<div style="position:relative;margin:1px 1px 1px 1px;height:19px">');
		a.push('<img id="colorClear' + this._sParentId + '" src="http://st.blog.163.com/style/common/htmlEditor/full_colr_remove.gif" style="width:199px;height:17px;background-color:white;border:1px solid white;cursor:pointer;" onmouseover="'+this._sObjName+'.colorTxtOvr(this);" onmouseout="'+this._sObjName+'.colorTxtOut(this);"/>');
		a.push('<div id="colorPrez' + this._sParentId + '" style="position:absolute;top:3px;left:3px;border:1px solid #ACA899;font-size:1px;width:28px;height:11px;"> </div>');
		a.push('</div>');
		
		a.push('<div style="margin-left:2px!important;margin-left:1px;margin-top:2px!important;margin-top:1px; margin-bottom:1px;width:201px;">');
		a.push('<table id="fullColorSelect' + this._sParentId + '" border="1" cellspacing="0" cellpadding="0" style="border-collapse: collapse;cursor:pointer; border:1px solid #000000" bordercolor="#000000" >');
	
		for (i=0;i<2;i++) {
			for (j=0;j<6;j++) {
				a.push('<tr height=10>');
				if (i==0){
					a.push('<td style="padding:0px;font-size:0px;border:1px #000000 solid"><img '+ ((isIE)?"":"src="+NECtrl.ColorPanel._picSrc) +' width=9 style="font-size:1px;background-color:#'+NECtrl.ColorPanel._ColorHex[j]+NECtrl.ColorPanel._ColorHex[j]+NECtrl.ColorPanel._ColorHex[j]+'"></img></td>');
				} else{
					a.push('<td style="padding:0px;font-size:0px;border:1px #000000 solid"><img '+ ((isIE)?"":"src="+NECtrl.ColorPanel._picSrc) +' width=9 style="font-size:1px;background-color:#'+NECtrl.ColorPanel._SpColorHex[j]+'"></img></td>');
				} 
				a.push('<td style="padding:0px;font-size:0px;border:1px #000000 solid"><img '+ ((isIE)?"":"src="+NECtrl.ColorPanel._picSrc) +' width=9 style="font-size:1px;background-color:#000000"></img></td>');
				for (k=0;k<3;k++) {
					for (l=0;l<6;l++) {
						a.push('<td style="padding:0px;font-size:0px;border:1px #000000 solid"><img '+ ((isIE)?"":"src="+NECtrl.ColorPanel._picSrc) +' width=9 style="font-size:1px;background-color:#'+NECtrl.ColorPanel._ColorHex[k+i*3]+NECtrl.ColorPanel._ColorHex[l]+NECtrl.ColorPanel._ColorHex[j]+'"></img></td>');
					}
				}
			a.push('</tr>');
			}
		}
	
		a.push('</table>');
		a.push('</div>');
		a.push('</div>');
		return a.join("");
	},
	/**
	 * "������ɫ"��ť����¼�
	 * @param	{Ojbect}	oColorDiv	�༭����������ʾ��ɫ����Div����
	 * @param	{String}	sColorType	��ɫ��������, ǰ��ɫ�򱳾�ɫ
	 * @return	{Void}
	 * @see		#_displayFullColorBoard
	 */
	_onMoreColor: function(oColorDiv,sColorType) {
		this._displayFullColorBoard(oColorDiv,sColorType);
	},
	/**
	 * "ȥ����ɫ"��ť����¼�
	 * @param	{String}	sColorType	��ɫ��������, ǰ��ɫ�򱳾�ɫ
	 * @return	{Void}
	 * @see		NECtrl.HtmlEditor#format
	 * @see		NECtrl.HtmlEditor#tlBtnUnClk
	 */
	_onColorClear: function(sColorType) {
		var color;
		if (sColorType == "foreColor") {
			color = "black";
		} else if (sColorType == "backColor") {
			color = "white";
		}
		try{	
			if(this._oCurrentColor != null) {
				this._oCurrentColor_savedColor = color;
				this._oHtmlEditor.format(sColorType,color);	
			}
			this._oHtmlEditor.tlBtnUnClk();
			return;
		}catch(e){}
	},
	/**
	 * ����ƶ���ȥ�¼�
	 * @param	{Object}	oEvent	�¼�����
	 * @return	{Void}
	 */
	_onColorOvr: function(oEvent) {
		var _oNode;
		if(isIE) 
			_oNode = event.srcElement;
		else
			_oNode = oEvent.target;
		if (_oNode.tagName=="IMG") {
			if (this._oCurrentColor!=null){
				this._oCurrentColor.style.backgroundColor = this._oCurrentColor._background;
			} 
			_oNode._background = _oNode.style.backgroundColor;
			$("colorPrez"+this._sParentId).style.backgroundColor = _oNode.style.backgroundColor;
			this._oCurrentColor = _oNode;
		}
	},
	/**
	 * ����Ƴ���Ч��
	 * @param	{String}	sColorType	��ɫ��������, ǰ��ɫ�򱳾�ɫ
	 * @return	{Void}
	 */
	_onColorOut: function(sColorType) {
		if (this._oCurrentColor!=null) { 
			if(this._oCurrentColor_savedColor != null){
				$("colorPrez"+this._sParentId).style.backgroundColor = this._oCurrentColor_savedColor;
			}else{
				if (sColorType == "foreColor") {
					$("colorPrez"+this._sParentId).style.backgroundColor = "black";
				} else if (sColorType == "backColor") {
					$("colorPrez"+this._sParentId).style.backgroundColor = "white";
				}
			}
		}
	},
	/**
	 * �����Ч��, ѡ����ɫ
	 * @param	{String}	sColorType	��ɫ��������, ǰ��ɫ�򱳾�ɫ
	 * @param	{Object}	oEvent	�¼�����
	 * @return	{Boolean}	����false��Ϊ���ñ༭����ʧȥ����
	 * @see		NECtrl.HtmlEditor#format
	 * @see		NECtrl.HtmlEditor#tlBtnUnClk
	 */
	_onColorClick: function(sColorType,oEvent) {	
		var _oNode;
		if(isIE) 
			_oNode = event.srcElement;
		else
			_oNode = oEvent.target;
		if (_oNode.tagName=="IMG") {
			try{	
				if(this._oCurrentColor != null) {
					this._oCurrentColor_savedColor = _oNode.style.backgroundColor;
					this._oHtmlEditor.format(sColorType, _oNode.style.backgroundColor);	
				}	
				this._oHtmlEditor.tlBtnUnClk();
			}catch(e){}
		}
		return false;
	},
	/**
	 * ��ʾ�򵥰���ɫѡ�����
	 * @param	{Object}	oColorDiv	��ʾ��ɫѡ������div����
	 * @param	{String}	sColorType	��ɫ��������, ǰ��ɫ�򱳾�ɫ
	 * @return	{Boolean}	
	 * @see		#_drawSimpleColorPanel
	 * @see		#_onColorOvr
	 * @see		#_onColorOut
	 * @see		#_onColorClick
	 * @see		#_onColorClear
	 * @see		#_onMoreColor
	 * @see 	NECtrl.HtmlEditor#showMenu
	 */
	_displaySimpleColorBoard: function(oColorDiv, sColorType) {
		//Ƕ�����
		oColorDiv.innerHTML = this._drawSimpleColorPanel();
		
		//��ʼ����ʾɫ,Ӧ���ϴ�ѡ�����ɫ
		if(this._oCurrentColor != null) {
			$("colorPrez"+this._sParentId).style.backgroundColor = this._oCurrentColor_savedColor;
		}else {
			if (sColorType == "foreColor") {
				$("colorPrez"+this._sParentId).style.backgroundColor = "black";
			} else if (sColorType == "backColor") {
				$("colorPrez"+this._sParentId).style.backgroundColor ="white";
			}
		}
		
		//�������ѡ��ɫ�鶯̬�ı���ʾɫ
		var _oColorSelect = $("colorSelectPanel" + this._sParentId);
		_oColorSelect.onmouseover = this._onColorOvr.bind(this);
		_oColorSelect.onmouseout = this._onColorOut.bind(this, sColorType);
		_oColorSelect.onclick = this._onColorClick.bind(this, sColorType);
		
	
		//�����ɫ�¼�
		var _oColorClear = $("colorClear" + this._sParentId);
		_oColorClear.onclick = this._onColorClear.bind(this, sColorType);
		
		//������ɫ��ť�¼�
		var _oMoreClear = $("moreColor" + this._sParentId);
		_oMoreClear.onclick = this._onMoreColor.bind(this, oColorDiv, sColorType);
		
		var _oImg;
		if (sColorType == "foreColor") {
			_oImg = $("HEImgFontColor" + this._sParentId);
		} else if (sColorType == "backColor") {
			_oImg = $("HEImgBackColor" + this._sParentId);
		}
		
		if (_oImg != null) {
			this._oHtmlEditor.showMenu(oColorDiv, _oImg);
		}
		return true;
	},
	
	/**
	 * ��ʾ���Ӱ���ɫѡ�����
	 * @param	{Object}	oColorDiv	��ʾ��ɫѡ������div����
	 * @param	{String}	sColorType	��ɫ��������, ǰ��ɫ�򱳾�ɫ
	 * @return	{Boolean}	
	 * @see		#_drawFullColorPanel
	 * @see		#_onColorOvr
	 * @see		#_onColorOut
	 * @see		#_onColorClick
	 * @see		#_onColorClear
	 * @see 	NECtrl.HtmlEditor#showMenu
	 */
	_displayFullColorBoard: function(oColorDiv, sColorType) {
	
		oColorDiv.innerHTML = this._drawFullColorPanel();
		
		var _oColorSelectPanel = $("fullColorSelect" + this._sParentId);
		
		//��ʼ����ʾɫ,Ӧ���ϴ�ѡ�����ɫ
		if(this._oCurrentColor != null) {
			$("colorPrez"+this._sParentId).style.backgroundColor = this._oCurrentColor_savedColor;
		}else {
			if (sColorType == "foreColor") {
				$("colorPrez"+this._sParentId).style.backgroundColor = "black";
			} else if (sColorType == "backColor") {
				$("colorPrez"+this._sParentId).style.backgroundColor ="white";
			}
		}
		
		_oColorSelectPanel.onclick = this._onColorClick.bind(this, sColorType);
		_oColorSelectPanel.onmouseover = this._onColorOvr.bind(this);
		_oColorSelectPanel.onmouseout = this._onColorOut.bind(this, sColorType);
		
		var _oColorClear = $("colorClear" + this._sParentId);
		_oColorClear.onclick = this._onColorClear.bind(this, sColorType);
		
		var _oImg;
		if (sColorType == "foreColor") {
			_oImg = $("HEImgFontColor" + this._sParentId);
		} else if (sColorType == "backColor") {
			_oImg = $("HEImgBackColor" + this._sParentId);
		}
		
		if (_oImg != null) {			
			this._oHtmlEditor.showMenu(oColorDiv, _oImg);
		}
		return true;
	}
}

if (NetEase==undefined){
	var NetEase={};
}


NetEase.PlainEditor = Class.create();
NetEase.PlainEditor.prototype = {
	initialize: function(parentId, editorElemId) {
		this.options = Object.extend({
			disabled: false,
			escapeHtml: true,//�Ƿ�����������eacape��������<ת��&lt;�ȡ�
			width: 0,//���룰��ʾ�Զ���ȡ��ȣ��ǣ���ֵ��ʾ���õĿ��	
			height: 280,//Ĭ�ϸ߶ȣ�px
			maxlen: 65535//�����������
		}, arguments[2] || {});			
		this.parentId = parentId;
		this.editorElemId = editorElemId;
		this.isExceedMaxLen = false;
		this.editor = null;
		this._load();
		return this;
	},
	
	_load: function(){
		var editorElem;
		if ((editorElem = $(this.editorElemId)) != null) {
			var widthStr = "width:100%;";
			if (this.options.width > 0)
				widthStr = "width:" + this.options.width + "px;";
			var disabledStr = "";
			if (this.options.disabled)
				disabledStr = ' disabled=\'disabled\' '; 
			editorElem.innerHTML = '<div id="plainDiv' + this.parentId + '" style="padding-right:1px"><textarea id="plainEditor' + this.parentId + '" style="border-color:#000;overflow-y:auto;' + widthStr + 'height:' + this.options.height + 'px;" ' + disabledStr + '></textarea><div>';

			this.editor = $("plainEditor" + this.parentId);
			
		}
	},
	
	_exceedMaxLen: function(content) {
		if (content.length > this.options.maxlen) {
			return true;
		} else
			return false;
	},
	
	getContent: function(){
	    var sourceEditor = $("plainEditor" + this.parentId);
	    if (sourceEditor != null) {
	   		var content = sourceEditor.value;
	   		this.isExceedMaxLen = this._exceedMaxLen(content);
	   		if (this.options.escapeHtml == true) {
	   			content = toDHTML(content);
	   			//content = content.escapeHTML();	   			
	   		}	    	
	    	return content;
	    } else
	    	return '';
	},
	
	IsExceedMaxLen: function() {
		return this.isExceedMaxLen;
	},
	
	emptyContent: function() {
		var sourceEditor = $("plainEditor" + this.parentId);
	    if (sourceEditor != null) {
	    	sourceEditor.value = '';
	    }
	}
}

if (NetEase==undefined){
	var NetEase={};
}

NetEase.NewEventRemind = Class.create();

NetEase.NewEventRemind.EVENT_USER = 0;
NetEase.NewEventRemind.EVENT_CARD = 1;
NetEase.NewEventRemind.EVENT_SYSTEM = 2;
NetEase.NewEventRemind.EVENT_CIRCLE_INVITATION = 3;
NetEase.NewEventRemind.EVENT_CIRCLE_MESSAGE = 4;
NetEase.NewEventRemind.EVENT_BLOG_MESSAGE = 5;

NetEase.NewEventRemind.MAIL_CODE_OK = 1;
NetEase.NewEventRemind.MAIL_CODE_UNAUTHORIZED = 0;
NetEase.NewEventRemind.MAIL_CODE_FAIL = -1;
NetEase.NewEventRemind.MAIL_CODE_UNOPEN = -2;

NetEase.NewEventRemind.prototype = {
	initialize: function(){
		this.options = Object.extend({
			jsWindowManager: false,
			eventShowButtonZoneId: 'eventShowButtonZoneId',
			dwrAlert: false,
			zoneId: 'eventRemindZone',
			objName:'newEventReminder',
			mailType: 0,
			lazyInit: false,
			getEventRemindCountFunc: Prototype.emptyFunction,
			getRemindListByCategoryFunc: Prototype.emptyFunction,
			getRemindListFunc: Prototype.emptyFunction,
			getMailListFunc: Prototype.emptyFunction,
			readRemindAllFunc: Prototype.emptyFunction,
			deleteRemindFunc: Prototype.emptyFunction,
			sendMsgFunc: Prototype.emptyFunction
		}, arguments[0] || {});
		this.newCount = 0;
		this.allCount = 0;
		if(this.options.mailType == 1){
			this.mailStat = NetEase.NewEventRemind.MAIL_CODE_FAIL;
		}
		this.mailNewCount = 0;
		this.mailAllCount = 0;
		this.isReading = false;
		this.has_read_all = false;
		this.all_stat_read = false;
		this.can_select = true;
		this.select_type = -1;
	 	if(!this.options.jsWindowManager){
		 	this.jsWindowManager = new NetEase.JSWindowManager();
	 	}else{
	 		this.jsWindowManager = this.options.jsWindowManager;
	 	}
	 	this.barrier = new NECtrl.Barrier();
	 	if(!this.options.lazyInit)this._init();
	},
	
	_init: function(){
		this.barrier.regReq("getRemindList","RemindList",this.options.getRemindListFunc);
		this.barrier.regReq("getRemindListByCategory","RemindList",this.options.getRemindListByCategoryFunc);		
		this.barrier.regReq("getMailList","RemindList",this.options.getMailListFunc);
		this.barrier.regReq("readRemindAll","Remind",this.options.readRemindAllFunc);
		this.barrier.regReq("deleteRemind","Remind",this.options.deleteRemindFunc);
		
		this.options.getEventRemindCountFunc({mailType:this.options.mailType},this._afterGetRemindCount.bind(this));
	},
	
	_afterGetRemindCount: function(wrap){
		if(wrap){
			this.newCount = parseInt(wrap.newCount);
			if(this.newCount < 0 )
				this.newCount = 0;				
			this.allCount = parseInt(wrap.allCount);
			if(this.allCount < 0 )
				this.allCount = 0;
			if(this.options.mailType == 1){
				if(wrap.mail163Count){
					this.mailStat = wrap.mail163Count.stat;
					if(this.mailStat == NetEase.NewEventRemind.MAIL_CODE_OK){
						this.mailNewCount = parseInt(wrap.mail163Count.newCount);
						if(this.mailNewCount < 0) this.mailNewCount = 0;
						this.mailAllCount = parseInt(wrap.mail163Count.allCount);
						if(this.mailAllCount < 0) this.mailAllCount = 0;
					}
				}
			}
			this.eventShowButtonZone = $(this.options.eventShowButtonZoneId);
			this._showAlertButton();
		}
	},
	
	_showAlertButton: function(){		
		if(this.isReading == true){
			this.eventShowButtonZone.innerHTML = '<span class="n_ n14" onclick="'+this.options.objName+'._closeEventRemindZone();">&nbsp;</span>';
			return;
		}		
		if(this.newCount > 0){
			this.eventShowButtonZone.innerHTML = '<div class="g_msg_new" onclick="'+this.options.objName+'._showEventRemindZone();"><span>&nbsp;</span><div class="p_ p50">���� '+this.newCount+' ������Ϣ</div></div>';
		}else{
			this.eventShowButtonZone.innerHTML = '<span class="n_ n14" onclick="'+this.options.objName+'._showEventRemindZone();">&nbsp;</span>';
		}		
	},
	
	_showEventRemindZone: function(){
		this.isReading = true;
		this._showAlertButton();
		this._initEventRemindZone();
		this.eventRemindZone.showWindow();
		this._selectCategory('category_0',0,-1);
	},
	
	_closeEventRemindZone: function(){
		this._beforeCloseEventRemindZone();
		if(this.eventRemindZone)
			this.eventRemindZone.hiddenWindow();		
	},
	
	_beforeCloseEventRemindZone: function(){
		this.isReading = false;
		this.all_stat_read = this.has_read_all;
		if(this.has_read_all == true){
			this.newCount = 0;
			var tempCache = this._getDataSource(this.select_type);
			if(tempCache != null){
				tempCache.refreshCurPage(true);				
			}
		}
		this._closeCategoryZone();
		this._showAlertButton();
	},
	
	_initEventRemindZone: function(){
		if(this.eventRemindZone == null){
			this.eventRemindZone = this.jsWindowManager.createWindow(this.options.zoneId,{
				className:'g_win_11',width: 600, height:330,title:'��Ϣ����',beforeHiddenFunc:this._beforeCloseEventRemindZone.bind(this)
			});
			this.pageLayer = new NetEase.SimplePageLayer(this.eventRemindZone.windowHtml.id);			
			this.eventRemindZone.panel.innerHTML = 
				'<div>\
					 <div class="g_p_left g_select" id="category_select">\
					 </div>\
					 <div class="g_p_left g_h_20 g_c_hmgin">���� <span id="$_event_new_count"></span> ������Ϣ<span id="$_mail_new_count_zone"></span></div>\
					 <div class="g_p_right g_h_20 g_c_hpdin g_t_right g_w_25" id="$_event_remind_page"></div>\
					 <div class="g_p_right g_h_20 g_c_hpdin g_t_right g_w_25" id="$_event_mail_page" style="display:none"><span class="a_a d_d" href="http://fm163.163.com/coremail/fcg/ntesdoor2?fromBlog" target="_blank">�鿴�������ʼ�...</span></div>\
					 <div class="g_p_clear g_t_space">&nbsp;</div>\
				 </div>\
				 <div class="list" id="$_event_remind_content">\
				 </div>';

			this.categorySelect = $("category_select");
			this._buildSelect();
			this.categorySelectTitle = $('select_title');		
			this.categorySelectValue = $('select_value');
			this.categoryOptions = $('select_options');		

			this.markPageZone = $("$_event_remind_page");

			this.markMailZone = $("$_event_mail_page");
			this.pageLayer.addPageLayer('select_options','select_title',null,{openHandler:this._showCategoryZone.bind(this),closeHandler:this._closeCategoryZone.bind(this)});
			this.eventNewCount = $("$_event_new_count");
			this.mailNewCountZone = $("$_mail_new_count_zone");
			this.eventRemindContent = $("$_event_remind_content");
		}
		this._buildCategory();		
		this._showEventCount();
		if(this.has_read_all != true && this.newCount > 0){
			this._readAll();			
		}
	},
	
	_showEventCount: function(){
		this.eventNewCount.innerHTML = this.newCount+'';
		if(this.options.mailType == 1){
			if(this.mailStat == NetEase.NewEventRemind.MAIL_CODE_OK){
				this.mailNewCountZone.innerHTML = '��  <span class="a_a d_d" href="http://fm163.163.com/coremail/fcg/ntesdoor2?fromBlog" onclick="'+this.options.objName+'._selectCategory(\'category_6\',1)" target="_blank">'+this.mailNewCount + ' ��δ���ʼ�</span>';
			}else
			if(this.mailStat == NetEase.NewEventRemind.MAIL_CODE_UNAUTHORIZED){
				this.mailNewCountZone.innerHTML = '��  <span class="a_a d_d" href="http://mscan1.163.com/QuickCreateMail.jsp?fromBlog" target="_blank">������ͨ����3G�������&gt;&gt;</span>';			
			}else{
				this.mailNewCountZone.innerHTML = '��  ���书����ʱ������';			
			}
		}		
	},
	
	_buildSelect: function(){
		this.categorySelect.innerHTML = '<div class="text g_c_hand" id="select_title">\
						<p id="select_value"></p>\
						<span class="i_ i20">&nbsp;</span>\
						<div class="g_p_clear g_t_space">&nbsp;</div>\
					</div>\
					<div class="options" id="select_options">\
					</div>\
					';
	},
	
	_buildCategory: function(){
		var _html= 
				'<p class="g_c_hand t" onclick="'+this.options.objName+'._selectCategory(\'category_0\',0,-1)" id="category_0">�� Ϣ��'+this.newCount+'/'+this.allCount+ '��</p>' +
				'<p class="g_c_hand" onclick="'+this.options.objName+'._selectCategory(\'category_1\',0,2)" id="category_1"><span class="i_ i160">&nbsp;</span>ϵͳ</p>' +
				'<p class="g_c_hand" onclick="'+this.options.objName+'._selectCategory(\'category_2\',0,5)" id="category_2"><span class="i_ i162">&nbsp;</span>ֽ��</p>' +
				'<p class="g_c_hand" onclick="'+this.options.objName+'._selectCategory(\'category_3\',0,0)" id="category_3"><span class="i_ i158">&nbsp;</span>����</p>' +
				'<p class="g_c_hand" onclick="'+this.options.objName+'._selectCategory(\'category_4\',0,1)" id="category_4"><span class="i_ i164">&nbsp;</span>�ؿ�</p>' +
				'<p class="g_c_hand" onclick="'+this.options.objName+'._selectCategory(\'category_5\',0,4)" id="category_5"><span class="i_ i162">&nbsp;</span>Ȧ��</p>';
		if(this.options.mailType == 1){
				_html += '<p class="g_c_hand b" onclick="'+this.options.objName+'._selectCategory(\'category_6\',1)" id="category_6">�ʼ���'+this.mailNewCount+'/'+this.mailAllCount+ '��</p>';
		}
		this.categoryOptions.innerHTML  = _html;				
	},
	
	_showCategoryZone: function(){
		this.categoryOptions.style.display = 'block';
	},
	
	_closeCategoryZone: function(){
		this.categoryOptions.style.display = 'none';		
	},
		
	_selectCategory: function(categoryId,group,item){
		if(this.can_select != true){
			return this._cancel();
		}
		this.can_select = false;
		this.select_type = item;
		this.select_obj_id = categoryId;
		this.categorySelectValue.innerHTML = $(categoryId).innerHTML;
		if(group == 0){
			this.eventRemindContent.innerHTML = '������Ϣ��...';
			this.markPageZone.style.display = 'block';
			this.markMailZone.style.display = 'none';
			if(item == -1){
				this._initEventRemindContent();
			}else{
				this._initEventRemindContentByCategory(item);
			}
		}else if(this.options.mailType == 1){
			this.eventRemindContent.innerHTML = '�����ʼ���...';
			this.markPageZone.style.display = 'none';
			this.markMailZone.style.display = 'block';
			if(this.mailStat == NetEase.NewEventRemind.MAIL_CODE_OK){
				if(this.is_first_load_mail == null){
					var mkParam = this.barrier.mkParam("getMailList",{mailType:this.options.mailType},this._presetMailContentFunc.bind(this),
						null,this._cancel.bind(this));
					this.barrier.callReq("getMailList",mkParam);		
					this.is_first_load_mail = true;
				}else{
					this._presetMailContentFunc(this.mailWrap);
				}
			}else{
				this._presetMailContentFunc({stat:this.mailStat});
			}
		}
	},
	
	_refreshCategory: function(){
		this._buildCategory();
		if(this.select_obj_id && $(this.select_obj_id))
			this.categorySelectValue.innerHTML = $(this.select_obj_id).innerHTML;		
	},
	
	_initEventRemindContent: function(){
		if(this.eventRemindCachePage == null){
			this.eventRemindCachePage = new NetEase.PageNumber({loadFunc:this._getRemindList.bind(this),
					presentFunc:this._presentContentFunc.bind(this),pageSize:10,prefetch:true,isDiv:true,
					prefetchMulti:2,totalSize:this.allCount,markID:'$_event_remind_page',delIterator:this._detectItr.bind(this)
				});			
		}
		this.eventRemindCachePage.show();	
	},
	
	_getRemindList: function(params,callback){
		this.can_select = false;				
		var mkParam = this.barrier.mkParam("getRemindList",params,callback);		
		this.barrier.callReq("getRemindList",mkParam);		
	},
	
	_initEventRemindContentByCategory: function(item){
		var key = "c_p_"+item;
		if(this.eventCategoryMap == null){
			this.eventCategoryMap = {};
		}
		if(this.eventCategoryMap[key] == null){
			this.eventCategoryMap[key] = new NetEase.CachePage({loadFunc:this._getRemindListByCategory.bind(this),
					loadParam:{category:item},presentFunc:this._presentContentFunc.bind(this),pageSize:10,prefetch:true,
					prefetchMulti:2,markID:'$_event_remind_page',delIterator:this._detectItr.bind(this)
			});
			this.eventCategoryMap[key].nextPage();			
		}else{
			this.eventCategoryMap[key].refreshCurPage(true);			
		}
	},
	
	_getRemindListByCategory: function(params,callback){
		this.can_select = false;		
		var mkParam = this.barrier.mkParam("getRemindListByCategory",params,callback);	
		this.barrier.callReq("getRemindListByCategory",mkParam);		
	},
	
	_presetMailContentFunc: function(mailWrap){
		this.can_select = true;		
		this.mailWrap = mailWrap;
		if(mailWrap == null || mailWrap.stat == NetEase.NewEventRemind.MAIL_CODE_FAIL || mailWrap.stat == NetEase.NewEventRemind.MAIL_CODE_UNOPEN){
			this.eventRemindContent.innerHTML = '���书����ʱ������';
		}else if(mailWrap.stat == NetEase.NewEventRemind.MAIL_CODE_UNAUTHORIZED){
			this.eventRemindContent.innerHTML = '�����δ��ͨ����3G���䣬<span class="a_a d_d" href="http://mscan1.163.com/QuickCreateMail.jsp?fromBlog" target="_blank">������ͨ����3G�������&gt;&gt;</span>';
		}else{
			this._presentMailListFunc(mailWrap.mailList);
		}		
	},
	
	_presentMailListFunc: function(mailList){
		if(mailList == null || mailList.length == 0){
			this.eventRemindContent.innerHTML = '��Ϣ�������������Ϣ';
			return;			
		}
		var mail;
		var html ='<table class="g_c_clrpd" border="0" cellspacing="0" cellpadding="0">';
		var isNew;
		for(var i=0;i<mailList.length;i++){
			mail = mailList[i];
			isNew = mail.read?'':'new';
			mail.from = (mail.from == null)?"δ֪":mail.from;
			var reg = /^"(.+?)"\s*<.+?>$/;
			if(reg.test(mail.from)){
				mail.from = mail.from.replace(reg,"$1");
			}else{
				reg = /^(.+?)@.+$/;
				if(reg.test(mail.from)){
					mail.from = mail.from.replace(reg,"$1");
				}
			}
			mail.subject = (mail.subject == null)?" ":mail.subject;
			html+='<tr class="g_f_hov '+isNew+'"><td class="l0"><span class="i_ i163 o">&nbsp;</span><span class="i_ i170 n">&nbsp;</span></td>\
				   <td class="l1"><span class="a_a" href="http://fm163.163.com/coremail/fcg/ntesdoor2?fromBlog" target="_blank">'+mail.subject.escape()+'</span></td>\
				   <td class="l4">'+mail.from.escape()+'</td><td class="l2">'+NetEase.DateTime.formatRecentDate(mail.sentTime,'MM-dd kk:mm')+'</td>\
				   <td class="l3">&nbsp;</td></tr>';
		}
		html+='</table>';
		this.eventRemindContent.innerHTML = html;
	},
		
	_presentContentFunc: function(dataList){
		this.can_select = true;		
		if(dataList == null || dataList.length == 0){
			this.eventRemindContent.innerHTML = '��Ϣ�������������Ϣ';
			return;
		}
		var remind;
		var reg;
		var url;
		var content;
		var html ='<table class="g_c_clrpd" border="0" cellspacing="0" cellpadding="0">';
		var isNew;
		for(var i=0;i<dataList.length;i++){
			remind = dataList[i];
			isNew = (remind.stat != 1 && this.all_stat_read != true)?'new':'';
			if(remind.content==null)
				remind.content=" ";
			if(remind.url==null || remind.url.trim()==""){
				content = remind.content;
			}else{
				reg=/^(.+):\/\/(.*)$/;
				if(!reg.test(remind.url))
					remind.url = "http://"+remind.url;
				content = '<span class="a_a" href="'+remind.url+'" target="_blank">'+remind.content+'</span>';
			}
			if(remind.param == null)
				remind.param = this._getParams(remind.params);
			html+='<tr class="g_f_hov '+isNew+'"><td class="l0">';
			if(remind.type == NetEase.NewEventRemind.EVENT_SYSTEM){
				html+='<span class="i_ i160 o">&nbsp;</span><span class="i_ i161 n">&nbsp;</span></td>\
					   <td class="l1"><span class="g_t_bold">[����]</span>'+content+'</td><td class="l4">&nbsp;</td>';
			}else
			if(remind.type == NetEase.NewEventRemind.EVENT_CARD){
				if(remind.param && remind.param.srId){
					html+='<span class="i_ i164 o">&nbsp;</span><span class="i_ i165 n">&nbsp;</span></td>'+
						  '<td class="l1"><span class="a_a g_t_bold" href="http://'+DomainMap.getParentDomain(remind.param.userName.escape()) +'" target="_blank">'+remind.param.nickName.escape()+'</span> <span>'+
					       '���㷢�ͺؿ�</span></td>'+
					       '<td class="l4"><span class="i_ i199" title="�鿴" onclick="doEventRemind({type:'+remind.type+',srId:\''+remind.param.srId+'\',isSys:'+remind.param.isSys+'});">&nbsp;</span></td>';
				}else{
					html+='<span class="i_ i164 o">&nbsp;</span><span class="i_ i165 n">&nbsp;</span></td><td class="l1">'+content+'</td><td class="l4">&nbsp;</td>';
				}
			}else
			if(remind.type == NetEase.NewEventRemind.EVENT_USER){
				if(remind.param && remind.param.userId){
					html+='<span class="i_ i158 o">&nbsp;</span><span class="i_ i159 n">&nbsp;</span></td><td class="l1">';
					if(remind.param.inviteStat == "accept"){
						html+='���Ѿ������� <span class="a_a g_t_bold" href="http://'+DomainMap.getParentDomain(remind.param.userName.escape()) +'" target="_blank">'+remind.param.nickName.escape()+'</span> ������</td><td class="l4">&nbsp;</td>';
					}else
					if(remind.param.inviteStat == "reject"){
						html+='���Ѿ��ܾ��� <span class="a_a g_t_bold" href="http://'+DomainMap.getParentDomain(remind.param.userName.escape()) +'" target="_blank">'+remind.param.nickName.escape()+'</span> ������</td><td class="l4">&nbsp;</td>';						
					}else{
			            html+='<span class="a_a g_t_bold" href="http://'+DomainMap.getParentDomain(remind.param.userName.escape()) +'" target="_blank">'+remind.param.nickName.escape()+'</span><span>';					   
						if(remind.param.isInvite=="true"){
							html+='������Ϊ����,���� '+content.escape()+'</span></td>'+
							'<td class="l4"><span class="i_ i168" title="����" onclick="'+this.options.objName+'.acceptFriendInvitation(\''+remind.id+'\',this);">&nbsp;</span><span class="i_ i167" title="�ܾ�" onclick="'+this.options.objName+'.rejectFriendInvitation(\''+remind.id+'\');">&nbsp;</span></td>';
						}else{
							html+='�Ѿ�ͨ���������</td><td class="l4">&nbsp;</td>';
						}
					}
				}else{
					html+='<span class="i_ i158 o">&nbsp;</span><span class="i_ i159 n">&nbsp;</span></td><td class="l1">'+content+'</td><td class="l4">&nbsp;</td>';					
				}
			}else
			if(remind.type == NetEase.NewEventRemind.EVENT_CIRCLE_INVITATION){
				if(remind.param && remind.param.invitationId){
					html+='<span class="i_ i162 o">&nbsp;</span><span class="i_ i166 n">&nbsp;</span></td><td class="l1">';
					if(remind.param.inviteStat == "accept"){
						html+='���Ѿ�������Ȧ�� <span class="a_a g_t_bold" href="http://q.163.com/'+remind.param.circleUrl+'/" target="_blank">'+remind.param.circleName.escape()+'</span> ������</td><td class="l4">&nbsp;</td>';
					}else
					if(remind.param.inviteStat == "reject"){
						html+='���Ѿ��ܾ���Ȧ�� <span class="a_a g_t_bold" href="http://q.163.com/'+remind.param.circleUrl+'/" target="_blank">'+remind.param.circleName.escape()+'</span> ������</td><td class="l4">&nbsp;</td>';						
					}else{
					    html+='<span class="a_a g_t_bold" href="http://q.163.com/'+remind.param.circleUrl+'/" target="_blank">'+remind.param.circleName.escape()+'</span> <span>'+
						'���������Ȧ��</span></td>'+
						'<td class="l4"><span class="i_ i168" title="����" onclick="'+this.options.objName+'.acceptCircleInvitation(\''+remind.id+'\');">&nbsp;</span><span class="i_ i167" title="�ܾ�" onclick="'+
						this.options.objName+'.rejectCircleInvitation(\''+remind.id+'\');">&nbsp;</span></td>';
					}
				}else{
					html+='<span class="i_ i162 o">&nbsp;</span><span class="i_ i166 n">&nbsp;</span></td><td class="l1">'+content+'</td><td class="l4">&nbsp;</td>';				
				}
			}else
			if(remind.type == NetEase.NewEventRemind.EVENT_CIRCLE_MESSAGE){
				html+='<span class="i_ i162 o">&nbsp;</span><span class="i_ i166 n">&nbsp;</span></td><td class="l1">'+content+'</td><td class="l4">&nbsp;</td>';
			}else
			if(remind.type == NetEase.NewEventRemind.EVENT_BLOG_MESSAGE){
				if(remind.param&&remind.param.userId){
					html+='<span class="i_ i158 o">&nbsp;</span><span class="i_ i140 n">&nbsp;</span></td><td class="l1">'+
						  '<span class="a_a g_t_bold" href="http://'+DomainMap.getParentDomain(remind.param.userName.escape()) +'" target="_blank">'+remind.param.nickName.escape()+'</span>�� <span>'+
						  content+'</span></td><td class="l4"><span class="i_ i169" title="�ظ�" onclick="'+this.options.objName+'.msgTo('+remind.param.userId+',\''+remind.param.nickName.js_escape()+'\');">&nbsp;</span></td>';
				}else{
					html+='<span class="i_ i172 o">&nbsp;</span><span class="i_ i171 n">&nbsp;</span></td><td class="l1">'+content+'</td><td class="l4">&nbsp;</td>';
				}
			}
			html+='<td class="l2">'+NetEase.DateTime.formatRecentDate(remind.publishTime,'MM-dd kk:mm')+
				  '</td><td class="l3"><span class="g_c_hand i_ i154" onclick="'+this.options.objName+
				  '._deleteEventRemind(\''+remind.id+'\')">&nbsp;</span></td></tr>';
		}
		html+='</table>';
		this.eventRemindContent.innerHTML = html;
	},
	
	updateEventRemind: function(id,content,url,params){
		var type = this.select_type;
		var tempCache = this._getDataSource(type);
		if(tempCache != null){
			var element = tempCache.getAllCachedData().detect(this._detectItr.bind(this,id));
			element.content = content;
			element.url = url;
			element.params = params;
			tempCache.refreshCurPage();	
		}
		if(type == -1){
			tempCache = this._getDataSource(element.type);
		}else{
			tempCache = this._getDataSource(-1);					
		}
		if(tempCache!=null){
			var element = tempCache.getAllCachedData().detect(this._detectItr.bind(this,id));
			element.content = content;
			element.url = url;
			element.params = params;
		}
	},
	
	_deleteEventRemind: function(id){
		var type = this.select_type;
		var tempCache = this._getDataSource(type);
		if(tempCache == null) return;
		var element = tempCache.getAllCachedData().detect(this._detectItr.bind(this,id));
		if(element == null){
			this.options.dwrAlert("ɾ��ʧ��!","error");
			return;
		}
		var mkParam = this.barrier.mkParam("deleteRemind",{id:id},this._afterDeleteEventRemind.bind(this,id,type,element.type),
			null,this._cancel.bind(this));		
		this.barrier.callReq("deleteRemind",mkParam);
	},
	
	_afterDeleteEventRemind: function(id,type,eType,stat){
		if(stat){
			var tempCache = this._getDataSource(type);
			if(tempCache != null){
				var removed = tempCache.removeOne(id);
				var isNew = true;
				if(removed != null && removed.length > 0){
					this.allCount --;
					if(this.allCount < 0) this.allCount = 0;
					if(removed[0].stat == 0){
						this.newCount --;
						if(this.newCount < 0) this.newCount = 0;
						isNew = false;
					}
					this._refreshCategory();
					this._showEventCount();
				}
				if(type == -1){
					tempCache = this._getDataSource(eType);
				}else{
					tempCache = this._getDataSource(-1);					
				}
				if(tempCache!=null){ 
					removed = tempCache.removeOne(id,true);
					if(removed != null && removed.length > 0 && isNew == true && removed[0].stat == 0){
						this.newCount --;
						if(this.newCount < 0) this.newCount = 0;
						this._refreshCategory();
						this._showEventCount();						
					}
				}			
			}
			this.options.dwrAlert("ɾ���ɹ�!","ok");
		}else{
			this.options.dwrAlert("ɾ��ʧ��!","error");
		}
	},
	
	_getDataSource: function(type){
		var _source;
		if(type == -1){
			_source = this.eventRemindCachePage;
		}else if(type!=null){
			var key = "c_p_"+type;
			if(this.eventCategoryMap != null)
				_source = this.eventCategoryMap[key];
		}
		return _source;
	},
	
	_detectItr: function(id,element){
		if(id == element.id){
			return true;
		}
		return false;
	},
		
	_cancel: function(){
		this.options.dwrAlert("�ϴβ���δ������Ժ�!","error");
	},
	
	_readAll: function(){
		var mkParam = this.barrier.mkParam("readRemindAll",null,this._afterReadAll.bind(this),null,this._cancel.bind(this));
		this.barrier.callReq("readRemindAll",mkParam);
	},
	
	_afterReadAll: function(stat){
		this.has_read_all = stat;
	},
	
	_getParams: function(s){
		try{
			if(s!=null){
				return eval(s);
			}			
		}catch(ex){
		}
		return null;
	},
	
	msgTo: function(toId,toName){
		if(!this.messageWindow){
			this.messageWindow = this.jsWindowManager.createWindow('remind_message',{
					className:"g_win_6",width: 400, height:230,onTop:true,notKeepPos: true,title:"������ֽ��"
				}
			);
		}
		this.messageWindow.panel.innerHTML=
			   '<div>'+toName.escape()+'</div>\
				<div><textarea id="remind_msg" class="g_h_105 g_w_95" onpropertychange="textareaLimit(this, 250)"></textarea></div>\
				<div class="g_h_30 g_t_center">\
					<div id="ne_frame_submit"><input type="button" class="btncm btnok" value="ȷ����" onclick="'+this.options.objName+'.submitMsg('+toId+');" />\
					<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>\
					<input type="button" class="btncm btncc" value="ȡ����" onclick="'+this.options.objName+'.closeMsg();" />\
					</div><div id="ne_frame_info" style="display:none;">������...</div>\
				</div>';
		this.messageWindow.showWindow();		
	},
	
	submitMsg: function(toId){
		var _msg = $F("remind_msg").trim(); 
		if(_msg.length==0){this.options.dwrAlert("ֽ�����ݲ���Ϊ��!","info");return;};					
		if(_msg.length>250){this.options.dwrAlert("ֽ�����Ȳ��ܳ���250!","info");return;};
		$("ne_frame_submit").style.display='none';
		$("ne_frame_info").style.display='';		
		this.options.sendMsgFunc({toId:toId,msg:_msg},{
			callback:this._afterSubmit.bind(this),
			errorHandler: function(ex) {
				this._afterSubmit(false);
				filterWarning(ex, false);;
			}.bind(this)
		});
	},
	
	_afterSubmit: function(s){
		if(s){
			this.options.dwrAlert("����ֽ���ɹ�!","ok");
			this.closeMsg();
		}else{
			this.options.dwrAlert("����ֽ��ʧ��!","error");
			$("ne_frame_submit").style.display='';
			$("ne_frame_info").style.display='none';				
		}
	},
	
	closeMsg: function(){
		this.messageWindow.hiddenWindow();		
	},
	
	/*----------for invite--------------*/
	_getEventRemindById: function(id){
		var type = this.select_type;
		var tempCache = this._getDataSource(type);		
		if(tempCache != null){
			return tempCache.getAllCachedData().detect(this._detectItr.bind(this,id));
		}
		return null;
	},
	
	acceptFriendInvitation: function(remindId,obj){
		var _r = this._getEventRemindById(remindId);
		if(_r == null || _r.param == null ) return;
		_r.param.inviteStat = 'accept'; // ����
		var _c = function(s){
			if(s!=null){
				this.updateEventRemind(remindId,'',null,_r.param);
			}else{
				_r.param.inviteStat = null;
			}
		}.bind(this);
		showAcceptInMessage(_r.param.userId,_r.param.groupId,obj,remindId,_r.param,_c);
	},
	
	rejectFriendInvitation: function(remindId){
		var _r = this._getEventRemindById(remindId);
		if(_r == null || _r.param == null ) return;
		_r.param.inviteStat = 'reject'; // �ܾ�
		var _c = function(s){
			if(s){
				this.updateEventRemind(remindId,'',null,_r.param);
			}else{
				_r.param.inviteStat = null;			
			}
		}.bind(this);		
		rejectInvite(_r.param.userId, remindId, _r.param,_c);
	},
	
	acceptCircleInvitation: function(remindId){
		var _r = this._getEventRemindById(remindId);
		if(_r == null || _r.param == null ) return;
		_r.param.inviteStat = 'accept'; // ����
		var callback = function(stat){
			if(stat){
				this.options.dwrAlert("����Ȧ�ӳɹ�!","ok");
				this.updateEventRemind(remindId,'',null,_r.param);
			}else{
				_r.param.inviteStat = null;
				this.options.dwrAlert("����Ȧ��ʧ��!","error");				
			}
		}.bind(this);
		SpaceCircleBean.acceptInvitation(_r.param.invitationId,remindId,_r.param,
			{callback:callback,
			 errorHandler:function(ex){if(ex!=null && ex.indexOf("CircleOverflowException")>=0){_r.param.inviteStat = null;this.options.dwrAlert("���������Ȧ���Ѿ��ﵽ���ޣ����˳�����Ȧ��֮���ٽ�������!","info");}}.bind(this)
			});
	},
	
	rejectCircleInvitation: function(remindId){
		var _r = this._getEventRemindById(remindId);
		if(_r == null || _r.param == null) return;
		_r.param.inviteStat = 'reject'; // �ܾ�
		var callback = function(stat){
			if(stat){
				this.options.dwrAlert("�ܾ�Ȧ�ӳɹ�!","ok");
				this.updateEventRemind(remindId,'',null,_r.param);
			}else{
				_r.param.inviteStat = null;
				this.options.dwrAlert("�ܾ�Ȧ��ʧ��!","error");							
			}
		}.bind(this);
		SpaceCircleBean.rejectInvitation(_r.param.invitationId,remindId,_r.param,callback);		
	}
		
}

/**************************************************************
*				163 blog tool bar  			   	              *
*                                                             *
* Written by:  bezy                                           *
* Important: to use this script don't                         *
*            remove these comments                            *
* Version 2.0 (MSIE 6.0 above,Firefox1.0,Netscape.)           *
* Created Date: 2007-01-04									  *
* Copyright��1997-2006 NetEase.com Inc. All rights reserved.  *
**************************************************************/
if (NetEase==undefined){
	var NetEase={};
}

NetEase.ToolBar = Class.create();

NetEase.ToolBar.prototype = {
	initialize: function(openObj,menuObj){
		this.openObj = openObj;
		this.menuObj = menuObj;
		this.options = Object.extend(
			{
				cookieName: 'neToolBar',
				objName:'neToolBar',
				visitorName: null,
				hostName: null,
				mailType: 0,
				simplePageLayer: null,
				jsWindowManager: false				
			}, arguments[2]||{}
		);		
		if(this.options.mailType == 5)
			this.mailType = 3;
		else
		if(this.options.mailType == 3)
			this.mailType = 2;
		else
		if(this.options.mailType == 2)
			this.mailType = 1;
		else
			this.mailType = 0;
		this.target=' target="_blank"';
		if(this.options.visitorName == this.options.hostName){
			this.target='';
		}
		this.toolBar = null;
		this.simplePageLayer = this.options.simplePageLayer;
		if(this.simplePageLayer == null){
			this.simplePageLayer = new NetEase.SimplePageLayer();
		}
	 	if(!this.options.jsWindowManager){
		 	this.jsWindowManager = new NetEase.JSWindowManager();
	 	}else{
	 		this.jsWindowManager = this.options.jsWindowManager;
	 	}	 	
	 	this._initPageLayer();
	},
	
	_initPageLayer: function(){
		this._initToolBar();
		this._addPageLayer();
	},
	
	_addPageLayer: function(){
		 this.simplePageLayer.addPageLayer(this.toolBar.windowHtml.id,this.openObj,this.menuObj,{
		 	openHandler:this._showToolBar.bind(this),
		 	closeHandler:this._closeToolBar.bind(this)
		 });		
	},
	
	_removePageLayer: function(){
		 this.simplePageLayer.removePageLayer(this.toolBar.windowHtml.id);	
	},
	
	_showToolBar: function(){
		this._parseCookieValue();
		this._initToolBarHtml();
		var pos = Position.cumulativeOffset(this.openObj);
		this.toolBar.setPos({left:pos[0]-100,top:pos[1]+15});		
		this.toolBar.showWindow();
	},
	
	_closeToolBar: function(){
		this.toolBar.hiddenWindow();
	},
	
	_initToolBar: function(){
		if(this.toolBar == null){
			var pos = Position.cumulativeOffset(this.openObj);
			this.toolBar = this.jsWindowManager.createWindow('$_ne_toolbar',{
						className:"g_crd_0",left:pos[0]-100,top:pos[1]+15, width: 115, height:10,hasSystemBar:false,panelClassName:false,useShadow:false
					}
			);
		}		
	},
	
	_initToolBarHtml: function(){
		var _blog='';
		if(this._getTargetValue(0,0))
			_blog+='<div class="item g_f_hov n_ e0"><span class="a_a c_c" href="http://'+DomainMap.getParentDomain(this.options.visitorName)+'/blog/getBlog.do"'+this.target+'>д��־</span></div>';
		if(this._getTargetValue(0,1))
			_blog+='<div class="item g_f_hov n_ f2"><span class="a_a c_c" href="http://'+DomainMap.getParentDomain(this.options.visitorName)+'/album/edit/editPhotoUpload.do"'+this.target+'>�ϴ���Ƭ</span></div>';
		if(this._getTargetValue(0,2))
			_blog+='<div class="item g_f_hov n_ k4"><span class="a_a c_c" href="http://'+DomainMap.getParentDomain(this.options.visitorName)+'/collection/edit/"'+this.target+'>�������</span></div>';
		if(this._getTargetValue(0,3))
			_blog+='<div class="item g_f_hov"><span class="a_a c_c" href="http://blog.163.com/search/" target="_blank">��������</span></div>';
		var _mail='';
		if(this._getTargetValue(1,0))
			_mail+='<div class="item g_f_hov"><span class="a_a c_c" href="http://mail.163.com?fromBlog" target="_blank">163�����</span></div>';
		if(this._getTargetValue(1,1))
			_mail+='<div class="item g_f_hov"><span class="a_a c_c" href="http://mail.126.com?fromBlog" target="_blank">126�����</span></div>';
		if(this._getTargetValue(1,2))
			_mail+='<div class="item g_f_hov"><span class="a_a c_c" href="http://mail.188.com?fromBlog" target="_blank">188�Ƹ���</span></div>';
		if(this._getTargetValue(1,3))
			_mail+='<div class="item g_f_hov"><span class="a_a c_c" href="http://vip.163.com?fromBlog" target="_blank">vip�����</span></div>';
		var _other='';
		if(this._getTargetValue(2,0))
			_other+='<div class="item g_f_hov"><span class="a_a c_c" href="http://alumni.163.com?fromBlog" target="_blank">ͬѧ¼</span></div>';
		var _style='';
		_style = '<div class="item g_f_hov g_p_relative">\
					<div onclick="Event.stop(event||window.event);return false;"><span class="r n_ n33">&nbsp;</span>�Ű�����</div>\
					<div class="sub menu">\
						<div class="item g_f_hov" onclick="'+this.options.objName+'._showThemeSetting(0)">������</div>\
						<div class="item g_f_hov"><span class="a_a c_c" href="http://'+DomainMap.getParentDomain(this.options.visitorName)+'/setStyle.do" target="_blank">�߼����</span></div>\
						<div class="sprt">&nbsp;</div>\
						<div class="item g_f_hov" onclick="'+this.options.objName+'._showThemeSetting(2)">����ģ��</div>\
						<div class="item g_f_hov" onclick="'+this.options.objName+'._showThemeSetting(1)">ҳ���ʽ</div>\
					</div>\
				</div>';		
		var _html='<div class="menu">';
		if(_blog != ''){
			_html+= _blog + '<div class="sprt">&nbsp;</div>';
		}
		if(_style != ''){
			_html+= _style + '<div class="sprt">&nbsp;</div>';
		}
		_html+='<div class="item g_f_hov"><span class="a_a c_c" href="http://'+DomainMap.getParentDomain(this.options.visitorName)+'/setAuthority.do" target="_blank">ϵͳ����</span></div><div class="sprt">&nbsp;</div>';		
		if(_mail != ''){
			_html+=  _mail + '<div class="sprt">&nbsp;</div>';
		}
		if(_other != ''){
			_html+= _other + '<div class="sprt">&nbsp;</div>';
		}
		_html+='<div class="item g_f_hov" onclick="'+this.options.objName+'._showToolBarSetting();return false;">�����ҵĹ���</div></div>';		
		this.toolBar.panel.innerHTML = _html;
	},
	
	_showThemeSetting: function(index){
		 if (UD.pageName!="editHome"){
		 	window.location='http://'+DomainMap.getParentDomain(this.options.visitorName) + '/edit/#'+index;
		 	return;	
		 }
		 HomeManager.showSetWin(index);
	},
	
	_showToolBarSetting: function(){
		this._initToolBarSet();
		this._initToolBarSetHtml();
		this.toolBarSet.showWindow();
		this._removePageLayer();
		this._closeToolBar();
	},
		
	_initToolBarSet: function(){
		if(this.toolBarSet == null){
			this.toolBarSet = this.jsWindowManager.createWindow('$_ne_toolbar_set',{
							className:"g_win_5",width:465,height:250,
							title:'�����ҵĹ���',afterHiddenFunc:this._addPageLayer.bind(this)
						}
			);		
		}
	},
	
	_initToolBarSetHtml: function(){
		var _h = '<table border="0" cellspacing="0" cellpadding="0">\
					 <tr><td class="g_w_15 g_t_right"><div class="g_p_right p_ p22">&nbsp;</div></td><td>\
						   <div>\
					       <div onclick="'+this.options.objName+'._select(this,0,0)" class="item '+this._getIcon(0,0)+'"><span class="n_ n23">&nbsp;</span><span class="n_ n24">&nbsp;</span>��־</div>\
					       <div onclick="'+this.options.objName+'._select(this,0,1)" class="item '+this._getIcon(0,1)+'"><span class="n_ n23">&nbsp;</span><span class="n_ n24">&nbsp;</span>�ϴ���Ƭ</div>\
					       <div onclick="'+this.options.objName+'._select(this,0,2)" class="item '+this._getIcon(0,2)+'"><span class="n_ n23">&nbsp;</span><span class="n_ n24">&nbsp;</span>�������</div>\
					       <div onclick="'+this.options.objName+'._select(this,0,3)" class="item '+this._getIcon(0,3)+'"><span class="n_ n23">&nbsp;</span><span class="n_ n24">&nbsp;</span>��������</div>\
						   <br class="clear" />\
						   </div>\
					  </td></tr>\
					  <tr><td class="g_w_15 g_t_right"><div class="g_p_right p_ p23">&nbsp;</div></td><td>\
						   <div>\
					       <div onclick="'+this.options.objName+'._select(this,1,0)" class="item '+this._getIcon(1,0)+'"><span class="n_ n23">&nbsp;</span><span class="n_ n24">&nbsp;</span>163�����</div>\
					       <div onclick="'+this.options.objName+'._select(this,1,1)" class="item '+this._getIcon(1,1)+'"><span class="n_ n23">&nbsp;</span><span class="n_ n24">&nbsp;</span>126�����</div>\
					       <div onclick="'+this.options.objName+'._select(this,1,2)" class="item '+this._getIcon(1,2)+'"><span class="n_ n23">&nbsp;</span><span class="n_ n24">&nbsp;</span>188�Ƹ���</div>\
					       <div onclick="'+this.options.objName+'._select(this,1,3)" class="item '+this._getIcon(1,3)+'"><span class="n_ n23">&nbsp;</span><span class="n_ n24">&nbsp;</span>vip�����</div>\
						   <br class="clear" />\
						   </div>\
					   </td></tr>\
					   <tr><td class="g_w_15 g_t_right"><div class="g_p_right p_ p24">&nbsp;</div></td><td>\
						   <div>\
					       <div onclick="'+this.options.objName+'._select(this,2,0)" class="item '+this._getIcon(2,0)+'"><span class="n_ n23">&nbsp;</span><span class="n_ n24">&nbsp;</span>ͬѧ¼</div>\
						   <br class="clear" />\
						   </div>\
					   </td></tr>\
					   <tr><td colspan="2" class="g_t_center">\
							 <input type="button" class="btncm btnok" value="������" onclick="'+this.options.objName+'._saveToolBarSet()" />\
							 <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>\
							 <input type="button" class="btncm btncc" value="ȡ����" onclick="'+this.options.objName+'._closeToolBarSet()" />\
					   </td></tr>\
					 </table>\
		          ';
		this.toolBarSet.panel.innerHTML= _h;
	},
	
	_select: function(obj,gid,item){
		Element.removeClassName(obj,this._getIcon(gid,item));
		this._setTargetValue(gid,item,!this._getTargetValue(gid,item));
		Element.addClassName(obj,this._getIcon(gid,item));
	},
	
	_getIcon: function(gid,item){
		if(this._getTargetValue(gid,item)){
			return 'selected';
		}
		return '';
	},
	
	_saveToolBarSet: function(){
		var value='';
		for(var i=0;i<3;i++){
			var innerValue='';
			for(var j=0;j<4;j++){
				if(this.setData[i][j])
					innerValue+=j+',';
			}
			value+=innerValue.substring(0,innerValue.length-1)+';';
		}
		value = value.substring(0,value.length-1);
		CookieUtils.set(this.options.cookieName,value,365,"/",DomainMap.serverDomain);
		this.toolBarSet.hiddenWindow();		
	},
	
	_closeToolBarSet: function(){
		this.toolBarSet.hiddenWindow();
	},
		
	_parseCookieValue: function(){
		var cookieValue = CookieUtils.get(this.options.cookieName);	 	
		if(cookieValue == null || cookieValue == "") cookieValue = '0,1,2,3;'+this.mailType+';0';
		var groups = cookieValue.split(";");
		if(groups.length!=3){ 
			cookieValue = '0,1,2,3;'+this.mailType+';0';
			groups = cookieValue.split(";");
		}
		this.setData = {};
		var items;
		for(var i=0;i<3;i++){
			this.setData[i] = {};
			items = groups[i].split(",");
			for(var j=0;j<items.length;j++){
				this.setData[i][items[j]] = true;
			}
		}
	},
	
	_setTargetValue: function(gid,item,value){
		if(this.setData[gid])
			this.setData[gid][item] = value;
	},
	
	_getTargetValue: function(gid,item){
		if(this.setData[gid]) return this.setData[gid][item];
		return false;
	}
}

var CookieUtils = {
	set : function(name, value, expirationInDays, path, domain) {
		var cookie = escape(name) + "=" + escape(value);
		if (expirationInDays) {
			var date = new Date();
			date.setDate(date.getDate() + expirationInDays);
			cookie += "; expires=" + date.toGMTString();
		} 
		if (path) {
			cookie += ";path=" + path;
		}
		if (domain) {
			cookie += ";domain=" + domain;
		}				
		document.cookie = cookie;
	},

	clear : function(name, path) {
		this.set(name, "", -1, path, domain);
	},
	
	get : function(name) {
		var pattern = "(^|;)\\s*" + escape(name) + "=([^;]+)";
		var m = document.cookie.match(pattern);
		if (m && m[2]) {			
			return unescape(m[2]);
		}else{ 
			return null;
		}
	}
}   

/**************************************************************
*				163 blog focus me  			   	              *
*                                                             *
* Written by:  bezy                                           *
* Important: to use this script don't                         *
*            remove these comments                            *
* Version 2.0 (MSIE 6.0 above,Firefox1.0,Netscape.)           *
* Created Date: 2007-01-04									  *
* Copyright��1997-2006 NetEase.com Inc. All rights reserved.  *
**************************************************************/
if (NetEase==undefined){
	var NetEase={};
}

NetEase.FocusMe = Class.create();
NetEase.FocusMe.prototype = {
	initialize: function(openObj){
		this.openObj = openObj;
		this.options = Object.extend(
			{
				invitedRank: 2,
				serverName: 'blog.163.com',
				objName:'neFocusMe',
				simplePageLayer: null,
				jsWindowManager: false								
			}, arguments[1] || {}
		)
		this.simplePageLayer = this.options.simplePageLayer;
		if(this.simplePageLayer == null){
			this.simplePageLayer = new NetEase.SimplePageLayer();
		}
	 	if(!this.options.jsWindowManager){
		 	this.jsWindowManager = new NetEase.JSWindowManager();
	 	}else{
	 		this.jsWindowManager = this.options.jsWindowManager;
	 	}
	 	this.focusData={};
		this._initPageLayer();
		this._initFocusFrame();
	},

	_initPageLayer: function(){
		this._initFocusMenu();
		this._addPageLayer();
	},
	
	_addPageLayer: function(){
		 this.simplePageLayer.addPageLayer(this.focusMenu.windowHtml.id,this.openObj,this.openObj,{
		 	openHandler:this._showMenu.bind(this),
		 	closeHandler:this._closeMenu.bind(this)
		 });		
	},
	
	_removePageLayer: function(){
		 this.simplePageLayer.removePageLayer(this.focusMenu.windowHtml.id);	
	},
	
	_initFocusMenu: function(){
		if(this.focusMenu == null){
			var pos = Position.cumulativeOffset(this.openObj);
			this.focusMenu = this.jsWindowManager.createWindow('$_ne_focus_menu',{className:"g_crd_0",
					panelClassName:false,left:pos[0]-4,top:pos[1]+16, width: 110, height:20,hasSystemBar:false
				}
			);
		}
		this._initFocusMenuHtml();
	},
	
	_showMenu: function(){
		var pos = Position.cumulativeOffset(this.openObj);
		this.focusMenu.setPos({left:pos[0]-4,top:pos[1]+16});		
		this.focusMenu.showWindow();
	},
	
	_closeMenu: function(){
		this.focusMenu.hiddenWindow();
	},
	
	_initFocusMenuHtml: function(){
		var _s =  '<div class="menu">';
		_s+= '<div class="item g_f_hov n_ e5b" onclick="'+this.options.objName+'.sendMsg('+UD.hostId+',\''+UD.hostNickname.js_escape()+'\');return false;">����ֽ��</div>';
		if(UD.visitorRank!=100){
			_s+= '<div class="item g_f_hov i_ i8" onclick="'+this.options.objName+'.showAddFriend();return false;">��Ϊ����</div>';
		}
		if(UD.hasAdminCircles=='true'){
			_s+= '<div class="item g_f_hov i_ i92" onclick="'+this.options.objName+'.showInviteCircle();return false;">������Ȧ��</div>';
		}
		_s+='<div class="sprt">&nbsp;</div>\
			<div class="item g_f_hov i_ i43" onclick="'+this.options.objName+'.showFocusFrame(\'web\');return false;">�ղز�����ַ</div>\
			<div class="item g_f_hov i_ i31" onclick="'+this.options.objName+'.showFocusFrame(\'rss\');return false;">����������</div>\
			<div class="item g_f_hov i_ i121" onclick="'+this.options.objName+'.showAddMail();return false;">����������</div>\
			<div class="sprt">&nbsp;</div>\
			<div class="item g_f_hov i_ i94" onclick="'+this.options.objName+'.showAddFavorite();return false;">�����ղؼ�</div>\
			</div>';
		this.focusMenu.panel.innerHTML = _s;
	},
	
	_initFocusFrame: function(){
		if(this.focusFrame == null){
			this.focusFrame = this.jsWindowManager.createWindow('$_ne_focus_frame',{
					className:"g_win_6", width: 470, height:100, notKeepPos: true
				}
			);
		}
	},

	sendMsg: function(hostId,nickName){
		if(UD.visitorRank<0){
			showLoginDlg(this.options.serverName);
			return;
		}
		newEventReminder.msgTo(hostId,nickName);
	},

	showAddFriend: function(){
		if(UD.visitorRank<0){
			showLoginDlg(this.options.serverName);
			return;
		}
		if(this.options.invitedRank == 2){
			dwrlog("�Է��ܾ��κ���Ӻ�������","error");
			return;
		}
		if(this.focusData['friend'] == null){
			UserBean.getVisitorGroups(this._initAddFriendHtml.bind(this));
		}else{
			this._initAddFriendHtml(this.focusData['friend']);
		}
	},
	
	_initAddFriendHtml: function(dataList){
		if(dataList == null){
			dwrlog("�Է����������Ϊ����","error");
			return;
		}
		this.focusData['friend'] = dataList;
		this.focusFrame.updateTitle('��Ϊ����');
		this.focusFrame.panel.innerHTML=
           		'<table class="g_c_mvdn" border="0" cellspacing="0" cellpadding="0">\
					   <tr><td class="g_w_20 g_t_right g_t_top">ѡ����飺</td><td><select nohide="true" class="g_w_50" id="ne_friend_groupid">'+this._getSelectOptionForFriend(this.focusData['friend'])+'</select></td></tr>\
					   <tr><td class="g_t_right g_t_top">�������ԣ�</td><td><textarea class="g_h_105 g_w_90" id="ne_friend_msg" onpropertychange="textareaLimit(this, 50)"></textarea></td></tr>\
						 <tr><td colspan="2" class="g_t_center">\
								<div id="ne_frame_submit">\
								<input type="button" class="btncm btnok" value="������" onclick="'+this.options.objName+'.submitAddFriend();return false;"/>\
								<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>\
								<input type="button" class="btncm btncc" value="ȡ����" onclick="'+this.options.objName+'.closeFocusFrame();return false;"/>\
								</div><div id="ne_frame_info" style="display:none;">������...</div>\
						 </td></tr>\
				</table>';
		this.focusFrame.showWindow();		
	},
	
	submitAddFriend: function(){
	    $('ne_frame_submit').style.display='none';
	    $('ne_frame_info').style.display='';
		var msg = $F('ne_friend_msg').trim();
		var groupid = $F('ne_friend_groupid');
		UserBean.inviteHost(msg, groupid,{
			  callback:function(returnData) {
			  	var message;
				var type;
				if(returnData >= 0){
					message = '�Ѿ���������';
					type = "ok";
				}else if(returnData <= -10){
					message="��Ӻ��ѳɹ�";
					type = "ok";
				}else switch(returnData){
					case -1:
						message="���ʧ��";
						type = "error";
						break;
					case -2:
						message="�Ѿ�����ĺ���";
						type = "error";
						break;
					case -3:
						message="��������Լ�";
						type = "error";
						break;
					case -4:
						message="�����û�����ִ�д˲���";
						type = "error";
						break;	
					case -5:
						message="�Է��ܾ��κ���Ӻ�������";
						type = "error";
						break;			
					default:
						message="���ʧ��";
						type = "error";
				}
				this.focusFrame.hiddenWindow();
				dwrlog(message, type);
			  }.bind(this),
			  errorHandler:function(ex) {
				if(ex=="ExceedFriendsLimit")
			  		dwrlog('��������������������','error');
				this.focusFrame.hiddenWindow();
			  	filterWarning(ex, false);			  	
			  }.bind(this)
		});
	},
	
	showInviteCircle: function(){
		if(this.focusData['circle'] == null){
			SpaceCircleBean.getUserAdminCircles(this._initInviteCircleHtml.bind(this));
		}else{
			this._initInviteCircleHtml(this.focusData['circle']);
		}
	},
	
	_initInviteCircleHtml: function(dataList){
		if(dataList == null || dataList.length==0){
			dwrlog("�㲻��Ȧ�ӹ���Ա","error");
			return;
		}
		this.focusData['circle'] = dataList;
		this.focusFrame.updateTitle('������Ȧ��');
		this.focusFrame.panel.innerHTML=
           		'<table class="g_c_mvdn" border="0" cellspacing="0" cellpadding="0">\
					   <tr><td class="g_w_20 g_t_right g_t_top">ѡ��Ȧ�ӣ�</td><td><select nohide="true" class="g_w_50" id="ne_circle_id">'+this._getSelectOptionForCircle(this.focusData['circle'])+'</select></td></tr>\
					   <tr><td colspan="2" class="g_t_center">\
								<div id="ne_frame_submit">\
									<input type="button" class="btncm btnok" value="������" onclick="'+this.options.objName+'.submitInviteCircle();return false;"/>\
									<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>\
									<input type="button" class="btncm btncc" value="ȡ����" onclick="'+this.options.objName+'.closeFocusFrame();return false;"/>\
								</div><div id="ne_frame_info" style="display:none;">������...</div>\
						 </td></tr>\
				</table>';
		this.focusFrame.showWindow();	
	},
	
	submitInviteCircle: function(){
	    $('ne_frame_submit').style.display='none';
	    $('ne_frame_info').style.display='';
		var circleId = $F('ne_circle_id');
		SpaceCircleBean.sendInvitation(circleId,{
			  callback:function(returnData) {
			  	if(returnData){
					dwrlog("���뷢�ͳɹ�", "ok");				  		
					this.focusFrame.hiddenWindow();
			  	}else{
					dwrlog("���뷢��ʧ��", "error");			  		
				    $('ne_frame_submit').style.display='';
				    $('ne_frame_info').style.display='none';
			  	}
			  }.bind(this),
			  errorHandler:function(ex) {
				dwrlog("���뷢��ʧ��",  "error");			  		
				this.focusFrame.hiddenWindow();
			  }.bind(this)
		});
	},
	
	showFocusFrame: function(type){
		if(UD.visitorRank<0){
			showLoginDlg(this.options.serverName);
			return;
		}
		if(this.focusData[type] == null){
			FocusMeBean.getList(type,this._initFocusFrameHtml.bind(this,type));			
		}else{
			this._initFocusFrameHtml(type,this.focusData[type]);
		}
	},
		
	_initFocusFrameHtml: function(type,dataList){
		var name,title;
		if(type == 'web'){
			name='�ҵ��ղ�';
			title='�ղز�����ַ';
		}else
		if(type == 'rss'){
			name='�ҵĶ���';
			title='����������';
		}
		if(dataList == null || dataList.length == 0){ dataList = [{id:-1,name:name}];}
		this.focusData[type] = dataList;	
		this.focusFrame.updateTitle(title);
		this.focusFrame.panel.innerHTML='<table class="g_c_mvdn" border="0" cellspacing="0" cellpadding="0">\
					<tr><td class="g_w_20 g_t_right">Ŀ��¼��</td><td><select nohide="true" class="g_w_90" id="ne_frame_listid">'+this._getSelectOption(this.focusData[type])+'</select></td></tr>\
					<tr><td class="g_w_20 g_t_right">�����ƣ�</td><td><input class="g_w_90 g_h_ipt" id="ne_frame_name" type="text" maxlength="40" value="'+UD.hostNickname+' �����ײ���"/></td></tr>\
					<tr><td class="g_t_right g_t_top">�衡����</td><td><textarea class="g_h_105 g_w_90" id="ne_frame_desc" onpropertychange="textareaLimit(this, 200)">'+UD.hostNickname+' �����ײ���</textarea></td></tr>\
					<tr><td colspan="2" class="g_t_center">\
							<div id="ne_frame_submit">\
							<input type="button" class="btncm btnok" value="������" onclick="'+this.options.objName+'.submitFocusFrame(\''+type+'\');return false;"/>\
							<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>\
							<input type="button" class="btncm btncc" value="ȡ����" onclick="'+this.options.objName+'.closeFocusFrame();return false;"/>\
							</div><div id="ne_frame_info" style="display:none;">������...</div>\
					</td></tr>\
				</table>';
		this.focusFrame.showWindow();		
	},

	submitFocusFrame: function(type){
		if(type == 'web' || type=='rss'){
			var resourceItem= {};
		    resourceItem.name = $F('ne_frame_name').trim();
		    if(resourceItem.name == ''){dwrlog("���Ʋ�����Ϊ��!","error");return;}		
		    resourceItem.description = $F('ne_frame_desc').trim();
		    var rss = (type=='rss')?'/rss/':'';
		    resourceItem.url = 'http://' + DomainMap.getParentDomain(UD.hostName) + rss;
		    var listId = $F('ne_frame_listid');
		    if(listId == -1){
		    	this.focusData[type] = null;
		    	resourceItem.listId = null;
		    }else{
		    	resourceItem.listId = listId;
		    }
		    $('ne_frame_submit').style.display='none';
		    $('ne_frame_info').style.display='';
		    FocusMeBean.collectBlog(resourceItem,type,{
		    	callback:this._afterSubmit.bind(this,type),
		    	errorHandler:function(ex) {
		    					this.focusFrame.hiddenWindow();
							  	filterWarning(ex, false);
			  				 }.bind(this)
		    });
		}
	},
	
	_afterSubmit: function(type,stat){
		if(stat){
			if(type =='web'){
				dwrlog('�ղز��ͳɹ�!','ok');
			}else
			if(type =='rss'){
				dwrlog('���������ͳɹ�!','ok');
			}
			this.closeFocusFrame();
		}else{
		    $('ne_frame_submit').style.display='';
		    $('ne_frame_info').style.display='none';
			dwrlog('����ʧ��!','error');
		}				
	},
	
	showAddMail: function(){
		this.focusFrame.updateTitle('����������');
		this.focusFrame.panel.innerHTML=
            '<table class="g_c_mvdn" border="0" cellspacing="0" cellpadding="0">\
			   <tr><td class="g_w_20 g_t_right">�ʼ���ַ��</td><td><input class="g_w_50 g_h_ipt" type="text" name="emailAddr" id="emailAddr"/>&nbsp;<select nohide="true" class="g_w_30" name="emailPostfix" id="emailPostfix"><option value="@163.com">@163.com</option><option value="@126.com">@126.com</option><option value="@188.com">@188.com</option><option value="@vip.163.com">@vip.163.com</option></select></td></tr>\
				 <tr><td class="g_w_20 g_t_right">�ܡ����룺</td><td><input class="g_w_50 g_h_ipt" type="password" name="emailPasswd" id="emailPasswd"/></td></tr>\
				 <tr><td colspan="2">\
					 <p class="t g_h_20 g_t_left">����Ƶ��</p>\
					 <p class="t">\
						  <input name="subFrqc" id="FrqcDayly" type="radio" value="" checked="checked"/>&nbsp;<label for="FrqcDayly">ÿ�����һ��</label>&nbsp;\
						  <input name="subFrqc" id="FrqcWeekly" type="radio" value="" />&nbsp;<label for="FrqcWeekly">ÿ�ܸ���һ��</label>&nbsp;\
						  <input name="subFrqc" id="FrqcMonthly" type="radio" value="" />&nbsp;<label for="FrqcMonthly">ÿ�¸���һ��</label>&nbsp;\
						  <input name="subFrqc" id="FrqcImdt" type="radio" value="" />&nbsp;<label for="FrqcImdt">��ʱ����</label>\
					 </p>\
				 </td></tr>\
				 <tr><td colspan="2" class="g_t_center">\
				 		<div id="ne_frame_submit">\
						<input type="button" class="btncm btnok" value="������" onclick="'+this.options.objName+'.submitAddMail();return false;"/>\
						<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>\
						<input type="button" class="btncm btncc" value="ȡ����" onclick="'+this.options.objName+'.closeFocusFrame();return false;"/>\
						</div><div id="ne_frame_info" style="display:none;">������...</div>\
				 </td></tr>\
			</table>';
		this.focusFrame.showWindow();			
	},
	
	submitAddMail: function(){
		var emailAddr = Trim($F('emailAddr')) + $F('emailPostfix');
		if(!checkMail(emailAddr)){
			dwrlog('�ʼ���ʽ����ȷ!','error');
			return;	
		}
		var emailPasswd = $F('emailPasswd');
		emailPasswd = hex_md5(emailPasswd);
		var subFrqc = 0;
		if($('FrqcDayly').checked)
			subFrqc = 1;
		else if($('FrqcWeekly').checked)
			subFrqc = 2;	
		else if($('FrqcMonthly').checked)
			subFrqc = 3;	
		else if($('FrqcImdt').checked)
			subFrqc = 0;	
	    $('ne_frame_submit').style.display='none';
	    $('ne_frame_info').style.display='';
		SubscriptionBean.subscribByEmail(emailAddr, emailPasswd, subFrqc, {
		callback:function(returnData) {
			if(returnData){
				dwrlog('�����ĵĲ������ݽ��ʼ��� '+emailAddr,'ok');
				this.closeFocusFrame();				
			}else{
				dwrlog('���ĳ���','error');
		        $('ne_frame_submit').style.display='';
		        $('ne_frame_info').style.display='none';
			}	
		}.bind(this),
	  	errorHandler:function(ex) {
			if(ex == 'EmailFailed' ){
				dwrlog("��֤�����������",'error');
			}else if(ex == "AlreaySub"){
				dwrlog("�������Ѿ����Ĺ��ò���",'error');
			}else if(ex == "SubExceed"){
				dwrlog("�����䶩�Ĳ������Ѿ���������",'error');
			}	
		    $('ne_frame_submit').style.display='';
		    $('ne_frame_info').style.display='none';
			}.bind(this)
		});		
	},
		
	closeFocusFrame: function(){
		this.focusFrame.hiddenWindow();
	},
	
	showAddFavorite: function(){
		addFavoriteUtil('http://'+DomainMap.getParentDomain(UD.hostName),UD.hostNickname,UD.hostName);
	},
	
	_getSelectOptionForFriend: function(dataList){
		var html='';
		for(var i=0;i<dataList.length;i++){
			html+='<option value="'+dataList[i].id+'">'+dataList[i].groupName.escape()+'</option>';	
		}
		return html;
	},

	_getSelectOptionForCircle: function(dataList){
		var html='';
		for(var i=0;i<dataList.length;i++){
			html+='<option value="'+dataList[i].circleId+'">'+dataList[i].circle.name.escape()+'</option>';	
		}
		return html;
	},
	
	_getSelectOption: function(dataList){
		var html='';
		for(var i=0;i<dataList.length;i++){
			html+='<option value="'+dataList[i].id+'">'+dataList[i].name.escape()+'</option>';	
		}
		return html;
	}
	
}

/*
* NetEase PageLayer ���ڿ�����������л�ҳ���ϵĲ��չ��
* method:
* addLayer: �����������ʾ�� 
* 	options��Ч�������£�
* 		layerID: ��id,Ψһ��ʾ�ò�
* 		oneLayer: ֻ�Ǹò��ٱ�����ʱ�Ƿ���Ψһ��ʾ
* 		openFunc: ��ʾ�²�ʱ�û��ص�����
* 		openParam: ��ʾ�²�ʱ�û��ص�������������
* 		closeFunc: �رղ�ʱ�û��ص�����
* 		closeParam: �رղ�ʱ�û��ص�������������
*  		zIndex: ����ҳ���ϵ��߼���ι�ϵ,���Խ�߸�ֵԽ��
* removeLayer��ȥ��ĳһ��ʾ��
* 	layerID�� ��id,Ψһ��ʾ�ò� OR Ϊ0ʱ��ʾȥ�����е���ʾ��
* unControlLayer: �Ƴ���ĳһ��ʾ��Ŀ���, ���Ǹ���ʾ�����ʾ������������
* controlLayer: ���¶�ĳһ��ʾ����п���, ���Ǹ���ʾ�����ʾ������������
*/

if (NetEase==undefined){
	var NetEase={};
}

NetEase.PageLayer = Class.create();
NetEase.PageLayer.prototype = {
	initialize: function(){
		this.register();
		this.layers = [];
		this.freezeLayer=[];
	},
	
	addLayer: function(options){
		var	options = Object.extend({
				layerID: false,
				oneLayer: false,
				openFunc: Prototype.emptyFunction,
				openParam: null,
			 	closeFunc: Prototype.emptyFunction,
			 	closeParam: null,
			 	zIndex: 0}, options);
		// ȥ���ظ��Ĳ�
		this.removeLayer(options.layerID);
		if (options.oneLayer)
			this._hiddenAllLayers();
		options.stopEvent = true;	// �����²�ʱҪ������document�ϵ�click�¼�
		this.layers.push(options);
		this._showOneLayer(options);
	},
	
	removeLayer: function(layerID){
		if (layerID!=0){
			var iteraotr = this._hiddenOneLayer.bind(this);
			this.layers = this.layers.reject(function(e){
				if (e.layerID==layerID)
					iteraotr(e);
				return e.layerID==layerID});
			// ��ֹdocument�ϵ�click�¼��ر���������ʾ��
			this.layers.each(function(e){e.stopEvent=true});
		}
		else
			this._hiddenAllLayers();
	},
	
	controlLayer: function(layerID){
		var layers = this.layers;
		// ��ǿ��ƶ����м��뵽���ƶ�����
		this.freezeLayer = this.freezeLayer.reject(function(e){
			if (e.layerID==layerID)
				layers.push(e);
			return e.layerID==layerID;});
		// ��ֹdocument�ϵ�click�¼��ر���������ʾ��
		this.layers.each(function(e){e.stopEvent=true});
	},
	
	unControlLayer: function(layerID){
		var	freezeLayer = this.freezeLayer;
		this.layers = this.layers.reject(function(e){
				if (e.layerID==layerID)
					freezeLayer.push(e);	// ���뵽�ǿ��ƶ�����ȥ
				return e.layerID==layerID});
		// ��ֹdocument�ϵ�click�¼��ر���������ʾ��				
		this.layers.each(function(e){e.stopEvent=true});				
	},
	
	removeAllLayer: function(){
		this.removeLayer(0);
	},
	
	register: function(){
		this._register4Doc();
	},
	
	_register4Doc: function(){
		Event.observe(document, "click", this._clickOnDoc.bind(this));
	},
	
	_clickOnDoc: function(event){
		// �������²�ʱ���ô���document�ϵ�click
		var temp = this.layers.select(function(e){
				return e.stopEvent});
		if (temp.length!=0){
			this.layers.each(function(e){e.stopEvent=false});
			Event.stop(event);
			return false;
		}
		
		// ����¼���src�Ƿ������Ե�ǰ�����в�
		var element = Event.element(event);
		var	onLayer = false;

		while(element!=document.body){
			temp = this.layers.select(function(e){ 
					if (element.id==undefined)
						return false;
					return e.layerID == element.id});
			if (temp.length!=0){
				onLayer = true;
				break;
			}					
			element = element.parentNode;
			if(element == null||element == undefined)
				break;
		}
		
		// �����������в㣬�������Щ��
		if (!onLayer)
			this._hiddenAllLayers();
		else{ // ����ֻ������ʾ�¼�Դͷ�Ĳ�
			var iteraotr = this._hiddenOneLayer.bind(this);
			this.layers.each(function(e){
				if (e.zIndex>temp[0].zIndex)	// �ر���zIndex�ϴ�������Ĳ�
					iteraotr(e);
			});
		}
	},
	
	_hiddenAllLayers: function(){
		try{
			this.layers.each(function(e){
					Element.setStyle(e.layerID, {display: 'none'});
				e.closeFunc(e.closeParam);
			});
		}catch(e){}
		this.layers.clear();		
	},
	
	_hiddenOneLayer: function(e){
		try{
			if($(e.layerID)){
				Element.setStyle(e.layerID, {display: 'none'});
			}
		}catch(e){};
		e.closeFunc(e.closeParam);
	},
	
	_showOneLayer: function(e){
		Element.setStyle(e.layerID, {display: ''});
		e.openFunc(e.openParam);
	}
}

//Class-------------ResizeObserver -------------------
NetEase.ResizeObserver = Class.create();
NetEase.ResizeObserver.prototype = {
	initialize: function(){		
	 },
	layerList:new Array(),
	addListener: function(srcId,referId,xoff){
		var lsn = new Object();
		lsn.element = srcId;
  		lsn.refer = referId;  	
  		if(xoff!=null&&xoff!=undefined)	
  			lsn.xoff = xoff;  	
  		else
  			lsn.xoff =0;	  		
  		this.removeListener(srcId);  		
		this.layerList.push(lsn);
	},
	onResize: function() {
		for(var i = 0 ;i< this.layerList.length; i++)
		{
			var src = $(this.layerList[i].element);
			var ref = $(this.layerList[i].refer);
			
			if(src!=undefined && src!=null && ref!=undefined && ref!=null)	{
				src.style.left = (Position.cumulativeOffset(ref)[0] + this.layerList[i].xoff) + 'px';			
			}
		}
	},
	removeListener:function(src){
		this.layerList = this.layerList.reject(function(e){ 
  			return e.element.id == src.id;
  		});
	}
}

/**************************************************************
*				163 blog jswindow manager			   	      *
*                                                             *
* Written by:  bezy                                           *
* Important: to use this script don't                         *
*            remove these comments                            *
* Version 2.0 (MSIE 6.0 above,Firefox1.0,Netscape.)           *
* Created Date: 2007-01-04									  *
* Copyright��1997-2006 NetEase.com Inc. All rights reserved.  *
**************************************************************/

if (NetEase==undefined){
	var NetEase={};
}
NetEase.JSWindowManager = Class.create();
NetEase.JSWindowManager.prototype ={
	initialize: function(){
		this.options = Object.extend(
		{
			prefix: "$_",
			systemBarPostfix: "_system_bar",
			panelPostfix: "_panel",
			titlePostfix: "_title",
			closePostfix: "_close",
			useDragOpacity: true,  //�϶�����ʱ�Ƿ�ʹ��͸��Ч��	add by mml
			simpleDrag: false
		}, arguments[0]||{});
		this.jsWindowList = [];
		this.baseIndex = 10000;
		this.indexAdd = 0;
		this.topIndex = 99999;
		this.simpleDragDrop = new NetEase.SimpleDragDrop({useDragOpacity:this.options.useDragOpacity,simpleDrag:this.options.simpleDrag});
	},
	
	existWindow: function(id){
		var jsWindow = this.jsWindowList.detect(this._detectIter.bind(this,id));
		return jsWindow?true:false;
	},
	
	getWindow: function(id){
		return this.jsWindowList.detect(this._detectIter.bind(this,id));		
	},
	
	createWindow: function(id,params){
		if($(id)!=null){
			alert("�ô����Ѿ�����!");
			return;
		}
		var options = Object.extend(
		{
			className: false,
			left: false,
			top: false,			
			width: 600,
			height: 400,
			allowDrag: true,
			notKeepPos: false,
			onTop: false,
			hasSystemBar: true,
			systemBarClassName: 'titlebar',
			handleClass: '$$_handle_class',
			titleId: false,
			title:'JSWindow',
			hasCloseId: true,
			closeId: false,
			hiddenOnClose: true,
			panelClassName: 'content',
			useShadow: true,
			beforShowFunc: Prototype.emptyFunction,
			afterShowFunc: Prototype.emptyFunction,
			beforeHiddenFunc: Prototype.emptyFunction,
			afterHiddenFunc: Prototype.emptyFunction,
			beforeCloseFunc: Prototype.emptyFunction,
			afterCloseFunc: Prototype.emptyFunction
		},params||{});
		
		this._buildPos(options);
		
		if(options.onTop){
			options.zIndex = this.topIndex;
		}else{
			options.zIndex = this.baseIndex + (this.indexAdd ++);
		}
		if(options.titleId == false)
			options.titleId = this.options.prefix + id + this.options.systemBarPostfix + this.options.titlePostfix;		
		if(options.hasSystemBar && options.hasCloseId && options.closeId == false)
			options.closeId = this.options.prefix + id + this.options.systemBarPostfix + this.options.closePostfix;						
		var jsWindow = this._createJSWindow(id,options);
		jsWindow.windowHtml = this._createWindowHtml(id,options);
		if(options.hasSystemBar)
			jsWindow.systemBar = this._createSystemBar(jsWindow.windowHtml,id,options);
		jsWindow.panel = this._createPanel(jsWindow.windowHtml,id,options);
		this.jsWindowList.push(jsWindow);
		return jsWindow;			
	},
	
	_getLeft: function(width){
		var left = (document.documentElement.clientWidth - width)/2;
		if(left < 10) left = 10;
		return left;
	},
	
	_getTop: function(height){
		var top = document.documentElement.scrollTop + 
							(document.documentElement.clientHeight - height)/2;
		if(top < 10) top = 10;
		return top;
	},
	
	_buildPos: function(options){
		if(!options.left){
			options.left = this._getLeft(options.width);
			options._caluLeft = true;
		}		
		if(!options.top){
			options.top = this._getTop(options.height);
			options._caluTop = true;
		}
	},
	
	setPos: function(id,pos){
		var jsWindow = this.jsWindowList.detect(this._detectIter.bind(this,id));
		this._setPos(jsWindow,pos);
		return jsWindow;	
	},
	
	_setPos: function(jsWindow,pos){
		if(jsWindow){
			this._buildPos(pos);
			Object.extend(jsWindow.options,pos);
			jsWindow.options.notKeepPos = true;
		}
	},
	
	showWindow: function(id){
		var jsWindow = this.jsWindowList.detect(this._detectIter.bind(this,id));
		this._showWindow(jsWindow);
		return jsWindow;	
	},
	
	_showWindow: function(jsWindow){
		if(jsWindow){
			jsWindow.options.beforShowFunc(jsWindow);
			if(jsWindow.options.notKeepPos){
				if(jsWindow.options._caluLeft){
					jsWindow.options.left =  this._getLeft(jsWindow.options.width);;					
				}
				jsWindow.windowHtml.style.left = jsWindow.options.left +"px";
				if(jsWindow.options._caluTop){
					jsWindow.options.top = this._getTop(jsWindow.options.height);				
				}
				jsWindow.windowHtml.style.top = jsWindow.options.top +"px";
			}
			jsWindow.windowHtml.style.display = "";
			this._hideSelect(true);
			jsWindow.options.afterShowFunc(jsWindow);
		}
	},
	
	updateTitle: function(id,title){
		var jsWindow = this.jsWindowList.detect(this._detectIter.bind(this,id));
		this._updateTitle(jsWindow,title);
		return jsWindow;
	},
	
	_updateTitle: function(jsWindow,title){
		if(jsWindow){
			jsWindow.options.title = title;
			$(jsWindow.options.titleId).innerHTML = title;
		}
	},
	
	hiddenWindow: function(id){
		var jsWindow = this.jsWindowList.detect(this._detectIter.bind(this,id));
		this._hiddenWindow(jsWindow);
		return jsWindow
	},
	
	_hiddenWindow: function(jsWindow){
		if(jsWindow){
			jsWindow.options.beforeHiddenFunc(jsWindow);
			jsWindow.windowHtml.style.display = "none";
			this._hideSelect(false);
			jsWindow.options.afterHiddenFunc(jsWindow);
		}
	},
	
	closeWindow: function(id){
		var jsWindow = this.jsWindowList.detect(this._detectIter.bind(this,id));
		return this._closeWindow(jsWindow);
	},
	
	_closeWindow: function(jsWindow){
		if(jsWindow){
			jsWindow.options.beforeCloseFunc(jsWindow);
			jsWindow.windowHtml.style.display = "none";
			this._hideSelect(false);
			if(jsWindow.options.allowDrag)
				this.simpleDragDrop.removeDraggable(jsWindow.windowHtml.id);	
			document.body.removeChild(jsWindow.windowHtml);
			this.jsWindowList = this.jsWindowList.reject(this._detectIter.bind(this,jsWindow.id));
			jsWindow.options.afterCloseFunc();			
		}
	},
	
	_focusWindow: function(id){
		var pos = -1;
		this.indexAdd = 0;
		for(var i=0;i<this.jsWindowList.length;i++){
			if(this.jsWindowList[i].id != id){
				if(!this.jsWindowList[i].options.onTop){
					this.jsWindowList[i].options.zIndex = this.baseIndex + (this.indexAdd ++);
					this.jsWindowList[i].windowHtml.style.zIndex = this.jsWindowList[i].options.zIndex;			
				}
			}else{
				pos = i;
			}
		}
		if(pos > -1){
			this.jsWindowList[pos].options.zIndex = this.baseIndex + (this.indexAdd ++);								
			this.jsWindowList[pos].windowHtml.style.zIndex = this.jsWindowList[pos].options.zIndex;			
		}
	},
	
	_detectIter: function(id,element){
		if(id == element.id){
			return true;
		}
		return false;
	},
	
	_createWindowHtml: function(id,options){
		var windowHtml = document.createElement('div');
		windowHtml.id = this.options.prefix + id;
		windowHtml.className = 'g_lay_com ' + (options.className?options.className:'') + (options.useShadow?' g_f_shw':'');
		windowHtml.style.display = "none";
		windowHtml.style.position = "absolute"; 
		windowHtml.style.left = options.left +"px";
		windowHtml.style.top = options.top +"px";
		windowHtml.style.width = options.width +"px";
		if(options.height != "auto"){
			if(isIE){
				if(IEVer == 7){
					windowHtml.style.minHeight = options.height + "px";
					windowHtml.style.height = "auto";
				}else{
					windowHtml.style.height = options.height + "px";				
				}
			}else{
				windowHtml.style.minHeight = options.height + "px";
				windowHtml.style.height = "auto";
			}			
		}
		windowHtml.style.zIndex = options.zIndex;
		document.body.appendChild(windowHtml);
		Event.observe(windowHtml.id, 'click', this._focusWindow.bind(this,id));
		return windowHtml;
	},
	
	_createSystemBar: function(windowHtml,id,options){
		var systemBar = document.createElement('div');
		systemBar.id = this.options.prefix + id +this.options.systemBarPostfix;
		if(options.systemBarClassName)
			systemBar.className = options.systemBarClassName;
		var g_c_move= options.allowDrag?'g_c_move':'';
		var html='<div>';
		if(options.hasCloseId){
			html += '<span id ="'+options.closeId+'" class="r i_ i124" title="�ر�">&nbsp;</span>';
		}
		html+='<span style="display:block;" class="$$_handle_class '+g_c_move+'" id="'+options.titleId+'">'+options.title+'</span></div>';
		systemBar.innerHTML=html;		
		windowHtml.appendChild(systemBar);
		if(options.hasCloseId){
			if(options.hiddenOnClose){
				Event.observe(options.closeId, 'click', this.hiddenWindow.bind(this,id));
			}else{
				Event.observe(options.closeId, 'click', this.closeWindow.bind(this,id));				
			}
		}
		if(options.allowDrag){
			this.simpleDragDrop.removeDraggable(windowHtml.id);				
			this.simpleDragDrop.addDraggable(windowHtml.id,{handle:'$$_handle_class',zindex:this.topIndex - 1});
		}
		return systemBar;
	},
	
	_createPanel: function(windowHtml,id,options){
		var panel = document.createElement('div');
		panel.id = this.options.prefix + id +this.options.panelPostfix;
		if(options.panelClassName)
			panel.className = options.panelClassName;
		windowHtml.appendChild(panel);
		return panel;
	},
				
	_hideSelect:function(hide){
		if(isIE && IEVer < 7){
			var selectArray = document.getElementsByTagName("select");
			if(selectArray){
				for(var i=0;i<selectArray.length;i++){
					if(selectArray[i].getAttribute("nohide") != "true"){
						selectArray[i].style.visibility=(hide==true)?'hidden':'inherit';
					}	
				}
			}
		}
	},
	
	_createJSWindow: function(id,options){
		var jsWindow = {};
		jsWindow.id = id;
		jsWindow.options = options;
		jsWindow.setPos = function(pos){this._setPos(jsWindow,pos);}.bind(this);
		jsWindow.showWindow = function(){this._showWindow(jsWindow);}.bind(this);
		jsWindow.updateTitle = function(title){this._updateTitle(jsWindow,title);}.bind(this);
		jsWindow.hiddenWindow = function(){this._hiddenWindow(jsWindow);}.bind(this);
		jsWindow.closeWindow = function(){this._closeWindow(jsWindow);}.bind(this);
		return jsWindow;
	}	
}
/**
 * TrimPath Template. Release 1.0.38.
 * Copyright (C) 2004, 2005 Metaha.
 * 
 * TrimPath Template is licensed under the GNU General Public License
 * and the Apache License, Version 2.0, as follows:
 *
 * This program is free software; you can redistribute it and/or 
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * This program is distributed WITHOUT ANY WARRANTY; without even the 
 * implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  
 * See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var TrimPath;



// TODO: Debugging mode vs stop-on-error mode - runtime flag.

// TODO: Handle || (or) characters and backslashes.
// TODO: Add more modifiers.


(function() {               // Using a closure to keep global namespace clean.

    if (TrimPath == null)

        TrimPath = new Object();

    if (TrimPath.evalEx == null)

        TrimPath.evalEx = function(src) { return eval(src); };


    var UNDEFINED;
    if (Array.prototype.pop == null)  // IE 5.x fix from Igor Poteryaev.
        Array.prototype.pop = function() {
            if (this.length === 0) {return UNDEFINED;}
            return this[--this.length];
        };
    if (Array.prototype.push == null) // IE 5.x fix from Igor Poteryaev.
        Array.prototype.push = function() {
            for (var i = 0; i < arguments.length; ++i) {this[this.length] = arguments[i];}
            return this.length;
        };

    TrimPath.parseTemplate = function(tmplContent, optTmplName, optEtc) {

        if (optEtc == null)

            optEtc = TrimPath.parseTemplate_etc;

        var funcSrc = parse(tmplContent, optTmplName, optEtc);
        var func = TrimPath.evalEx(funcSrc, optTmplName, 1);
        if (func != null)
            return new optEtc.Template(optTmplName, tmplContent, funcSrc, func, optEtc);
        return null;
    }

    

    try {

        String.prototype.process = function(context, optFlags) {

            var template = TrimPath.parseTemplate(this, null);
            if (template != null)
                return template.process(context, optFlags);
            return this;

        }

    } catch (e) { // Swallow exception, such as when String.prototype is sealed.

    }

    

    TrimPath.parseTemplate_etc = {};            // Exposed for extensibility.

    TrimPath.parseTemplate_etc.statementTag = "forelse|for|if|elseif|else|var|macro";

    TrimPath.parseTemplate_etc.statementDef = { // Lookup table for statement tags.
        "if"     : { delta:  1, prefix: "if (", suffix: ") {", paramMin: 1 },
        "else"   : { delta:  0, prefix: "} else {" },
        "elseif" : { delta:  0, prefix: "} else if (", suffix: ") {", paramDefault: "true" },
        "/if"    : { delta: -1, prefix: "}" },
        "for"    : { delta:  1, paramMin: 3, 
                     prefixFunc : function(stmtParts, state, tmplName, etc) {
                        if (stmtParts[2] != "in")
                            throw new etc.ParseError(tmplName, state.line, "bad for loop statement: " + stmtParts.join(' '));
                        var iterVar = stmtParts[1];
                        var listVar = "__LIST__" + iterVar;
                        return [ "var ", listVar, " = ", stmtParts[3], ";",
                             // Fix from Ross Shaull for hash looping, make sure that we have an array of loop lengths to treat like a stack.
                             "var __LENGTH_STACK__;",
                             "if (typeof(__LENGTH_STACK__) == 'undefined' || !__LENGTH_STACK__.length) __LENGTH_STACK__ = new Array();", 
                             "__LENGTH_STACK__[__LENGTH_STACK__.length] = 0;", // Push a new for-loop onto the stack of loop lengths.
                             "if ((", listVar, ") != null) { ",
                             "var ", iterVar, "_ct = 0;",       // iterVar_ct variable, added by B. Bittman     
                             "for (var ", iterVar, "_index in ", listVar, ") { ",
                             iterVar, "_ct++;",
                             "if (typeof(", listVar, "[", iterVar, "_index]) == 'function') {continue;}", // IE 5.x fix from Igor Poteryaev.
                             "__LENGTH_STACK__[__LENGTH_STACK__.length - 1]++;",
                             "var ", iterVar, " = ", listVar, "[", iterVar, "_index];" ].join("");
                     } },
        "forelse" : { delta:  0, prefix: "} } if (__LENGTH_STACK__[__LENGTH_STACK__.length - 1] == 0) { if (", suffix: ") {", paramDefault: "true" },
        "/for"    : { delta: -1, prefix: "} }; delete __LENGTH_STACK__[__LENGTH_STACK__.length - 1];" }, // Remove the just-finished for-loop from the stack of loop lengths.
        "var"     : { delta:  0, prefix: "var ", suffix: ";" },
        "macro"   : { delta:  1, 
                      prefixFunc : function(stmtParts, state, tmplName, etc) {
                          var macroName = stmtParts[1].split('(')[0];
                          return [ "var ", macroName, " = function", 
                                   stmtParts.slice(1).join(' ').substring(macroName.length),
                                   "{ var _OUT_arr = []; var _OUT = { write: function(m) { if (m) _OUT_arr.push(m); } }; " ].join('');
                     } }, 
        "/macro"  : { delta: -1, prefix: " return _OUT_arr.join(''); };" }
    }

    TrimPath.parseTemplate_etc.modifierDef = {

        "eat"        : function(v)    { return ""; },

        "escape"     : function(s)    { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); },

        "capitalize" : function(s)    { return String(s).toUpperCase(); },

        "default"    : function(s, d) { return s != null ? s : d; }

    }
    TrimPath.parseTemplate_etc.modifierDef.h = TrimPath.parseTemplate_etc.modifierDef.escape;


    TrimPath.parseTemplate_etc.Template = function(tmplName, tmplContent, funcSrc, func, etc) {
        this.process = function(context, flags) {

            if (context == null)

                context = {};

            if (context._MODIFIERS == null)

                context._MODIFIERS = {};
            if (context.defined == null)
                context.defined = function(str) { return (context[str] != undefined); };

            for (var k in etc.modifierDef) {

                if (context._MODIFIERS[k] == null)

                    context._MODIFIERS[k] = etc.modifierDef[k];

            }

            if (flags == null)

                flags = {};

            var resultArr = [];
            var resultOut = { write: function(m) { resultArr.push(m); } };

            try {
                func(resultOut, context, flags);

            } catch (e) {

                if (flags.throwExceptions == true)

                    throw e;

                var result = new String(resultArr.join("") + "[ERROR: " + e.toString() + (e.message ? '; ' + e.message : '') + "]");
                result["exception"] = e;
                return result;

            }
            return resultArr.join("");
        }

        this.name       = tmplName;

        this.source     = tmplContent; 

        this.sourceFunc = funcSrc;

        this.toString   = function() { return "TrimPath.Template [" + tmplName + "]"; }
    }
    TrimPath.parseTemplate_etc.ParseError = function(name, line, message) {

        this.name    = name;
        this.line    = line;
        this.message = message;
    }
    TrimPath.parseTemplate_etc.ParseError.prototype.toString = function() { 
        return ("TrimPath template ParseError in " + this.name + ": line " + this.line + ", " + this.message);
    }

    
    var parse = function(body, tmplName, etc) {
        body = cleanWhiteSpace(body);
        var funcText = [ "var TrimPath_Template_TEMP = function(_OUT, _CONTEXT, _FLAGS) { with (_CONTEXT) {" ];
        var state    = { stack: [], line: 1 };                              // TODO: Fix line number counting.
        var endStmtPrev = -1;
        while (endStmtPrev + 1 < body.length) {
            var begStmt = endStmtPrev;
            // Scan until we find some statement markup.
            begStmt = body.indexOf("{", begStmt + 1);
            while (begStmt >= 0) {
                var endStmt = body.indexOf('}', begStmt + 1);
                var stmt = body.substring(begStmt, endStmt);
                var blockrx = stmt.match(/^\{(cdata|minify|eval)/); // From B. Bittman, minify/eval/cdata implementation.
                if (blockrx) {
                    var blockType = blockrx[1]; 
                    var blockMarkerBeg = begStmt + blockType.length + 1;
                    var blockMarkerEnd = body.indexOf('}', blockMarkerBeg);
                    if (blockMarkerEnd >= 0) {
                        var blockMarker;
                        if( blockMarkerEnd - blockMarkerBeg <= 0 ) {
                            blockMarker = "{/" + blockType + "}";
                        } else {
                            blockMarker = body.substring(blockMarkerBeg + 1, blockMarkerEnd);
                        }                        
                        
                        var blockEnd = body.indexOf(blockMarker, blockMarkerEnd + 1);
                        if (blockEnd >= 0) {                            
                            emitSectionText(body.substring(endStmtPrev + 1, begStmt), funcText);
                            
                            var blockText = body.substring(blockMarkerEnd + 1, blockEnd);
                            if (blockType == 'cdata') {
                                emitText(blockText, funcText);
                            } else if (blockType == 'minify') {
                                emitText(scrubWhiteSpace(blockText), funcText);
                            } else if (blockType == 'eval') {
                                if (blockText != null && blockText.length > 0) // From B. Bittman, eval should not execute until process().
                                    funcText.push('_OUT.write( (function() { ' + blockText + ' })() );');
                            }
                            begStmt = endStmtPrev = blockEnd + blockMarker.length - 1;
                        }
                    }                        
                } else if (body.charAt(begStmt - 1) != '$' &&               // Not an expression or backslashed,
                           body.charAt(begStmt - 1) != '\\') {              // so check if it is a statement tag.
                    var offset = (body.charAt(begStmt + 1) == '/' ? 2 : 1); // Close tags offset of 2 skips '/'.
                                                                            // 10 is larger than maximum statement tag length.
                    if (body.substring(begStmt + offset, begStmt + 10 + offset).search(TrimPath.parseTemplate_etc.statementTag) == 0) 
                        break;                                              // Found a match.
                }
                begStmt = body.indexOf("{", begStmt + 1);
            }
            if (begStmt < 0)                              // In "a{for}c", begStmt will be 1.
                break;
            var endStmt = body.indexOf("}", begStmt + 1); // In "a{for}c", endStmt will be 5.
            if (endStmt < 0)
                break;
            emitSectionText(body.substring(endStmtPrev + 1, begStmt), funcText);
            emitStatement(body.substring(begStmt, endStmt + 1), state, funcText, tmplName, etc);
            endStmtPrev = endStmt;
        }
        emitSectionText(body.substring(endStmtPrev + 1), funcText);
        if (state.stack.length != 0)
            throw new etc.ParseError(tmplName, state.line, "unclosed, unmatched statement(s): " + state.stack.join(","));
        funcText.push("}}; TrimPath_Template_TEMP");
        return funcText.join("");
    }
    
    var emitStatement = function(stmtStr, state, funcText, tmplName, etc) {
        var parts = stmtStr.slice(1, -1).split(' ');
        var stmt = etc.statementDef[parts[0]]; // Here, parts[0] == for/if/else/...
        if (stmt == null) {                    // Not a real statement.
            emitSectionText(stmtStr, funcText);
            return;
        }
        if (stmt.delta < 0) {
            if (state.stack.length <= 0)
                throw new etc.ParseError(tmplName, state.line, "close tag does not match any previous statement: " + stmtStr);
            state.stack.pop();
        } 
        if (stmt.delta > 0)
            state.stack.push(stmtStr);

        if (stmt.paramMin != null &&
            stmt.paramMin >= parts.length)
            throw new etc.ParseError(tmplName, state.line, "statement needs more parameters: " + stmtStr);
        if (stmt.prefixFunc != null)
            funcText.push(stmt.prefixFunc(parts, state, tmplName, etc));
        else 
            funcText.push(stmt.prefix);
        if (stmt.suffix != null) {
            if (parts.length <= 1) {
                if (stmt.paramDefault != null)
                    funcText.push(stmt.paramDefault);
            } else {
                for (var i = 1; i < parts.length; i++) {
                    if (i > 1)
                        funcText.push(' ');
                    funcText.push(parts[i]);
                }
            }
            funcText.push(stmt.suffix);
        }
    }


    var emitSectionText = function(text, funcText) {
        if (text.length <= 0)
            return;
        var nlPrefix = 0;               // Index to first non-newline in prefix.
        var nlSuffix = text.length - 1; // Index to first non-space/tab in suffix.

        while (nlPrefix < text.length && (text.charAt(nlPrefix) == '\n'))
            nlPrefix++;
        while (nlSuffix >= 0 && (text.charAt(nlSuffix) == ' ' || text.charAt(nlSuffix) == '\t'))
            nlSuffix--;
        if (nlSuffix < nlPrefix)
            nlSuffix = nlPrefix;
        if (nlPrefix > 0) {
            funcText.push('if (_FLAGS.keepWhitespace == true) _OUT.write("');

            var s = text.substring(0, nlPrefix).replace('\n', '\\n'); // A macro IE fix from BJessen.
            if (s.charAt(s.length - 1) == '\n')
            	s = s.substring(0, s.length - 1);
            funcText.push(s);
            funcText.push('");');
        }
        var lines = text.substring(nlPrefix, nlSuffix + 1).split('\n');
        for (var i = 0; i < lines.length; i++) {
            emitSectionTextLine(lines[i], funcText);
            if (i < lines.length - 1)
                funcText.push('_OUT.write("\\n");\n');
        }

        if (nlSuffix + 1 < text.length) {
            funcText.push('if (_FLAGS.keepWhitespace == true) _OUT.write("');
            var s = text.substring(nlSuffix + 1).replace('\n', '\\n');
            if (s.charAt(s.length - 1) == '\n')
            	s = s.substring(0, s.length - 1);
            funcText.push(s);
            funcText.push('");');
        }
    }
    
    var emitSectionTextLine = function(line, funcText) {
        var endMarkPrev = '}';
        var endExprPrev = -1;
        while (endExprPrev + endMarkPrev.length < line.length) {
            var begMark = "${", endMark = "}";
            var begExpr = line.indexOf(begMark, endExprPrev + endMarkPrev.length); // In "a${b}c", begExpr == 1
            if (begExpr < 0)
                break;
            if (line.charAt(begExpr + 2) == '%') {
                begMark = "${%";
                endMark = "%}";
            }
            var endExpr = line.indexOf(endMark, begExpr + begMark.length);         // In "a${b}c", endExpr == 4;
            if (endExpr < 0)
                break;
            emitText(line.substring(endExprPrev + endMarkPrev.length, begExpr), funcText);                
            // Example: exprs == 'firstName|default:"John Doe"|capitalize'.split('|')
            var exprArr = line.substring(begExpr + begMark.length, endExpr).replace(/\|\|/g, "#@@#").split('|');
            for (var k in exprArr) {
                if (exprArr[k].replace) // IE 5.x fix from Igor Poteryaev.
                    exprArr[k] = exprArr[k].replace(/#@@#/g, '||');
            }
            funcText.push('_OUT.write(');
            emitExpression(exprArr, exprArr.length - 1, funcText); 
            funcText.push(');');
            endExprPrev = endExpr;
            endMarkPrev = endMark;
        }
        emitText(line.substring(endExprPrev + endMarkPrev.length), funcText); 
    }
    
    var emitText = function(text, funcText) {
        if (text == null ||
            text.length <= 0)
            return;
        text = text.replace(/\\/g, '\\\\');
        text = text.replace(/\n/g, '\\n');
        text = text.replace(/"/g,  '\\"');
        funcText.push('_OUT.write("');
        funcText.push(text);
        funcText.push('");');
    }
    
    var emitExpression = function(exprArr, index, funcText) {
        // Ex: foo|a:x|b:y1,y2|c:z1,z2 is emitted as c(b(a(foo,x),y1,y2),z1,z2)
        var expr = exprArr[index]; // Ex: exprArr == [firstName,capitalize,default:"John Doe"]
        if (index <= 0) {          // Ex: expr    == 'default:"John Doe"'

            funcText.push(expr);
            return;
        }
        var parts = expr.split(':');
        funcText.push('_MODIFIERS["');
        funcText.push(parts[0]); // The parts[0] is a modifier function name, like capitalize.
        funcText.push('"](');
        emitExpression(exprArr, index - 1, funcText);
        if (parts.length > 1) {
            funcText.push(',');
            funcText.push(parts[1]);
        }
        funcText.push(')');
    }


    var cleanWhiteSpace = function(result) {
        result = result.replace(/\t/g,   "    ");
        result = result.replace(/\r\n/g, "\n");
        result = result.replace(/\r/g,   "\n");
        result = result.replace(/^(\s*\S*(\s+\S+)*)\s*$/, '$1'); // Right trim by Igor Poteryaev.
        return result;
    }

    var scrubWhiteSpace = function(result) {
        result = result.replace(/^\s+/g,   "");
        result = result.replace(/\s+$/g,   "");
        result = result.replace(/\s+/g,   " ");
        result = result.replace(/^(\s*\S*(\s+\S+)*)\s*$/, '$1'); // Right trim by Igor Poteryaev.
        return result;
    }

    // The DOM helper functions depend on DOM/DHTML, so they only work in a browser.
    // However, these are not considered core to the engine.
    //
    TrimPath.parseDOMTemplate = function(elementId, optDocument, optEtc) {
        if (optDocument == null)
            optDocument = document;
		//Logger.debug("trimpath parse elementId is "+elementId);
        var element = optDocument.getElementById(elementId);
        var content = element.value;     // Like textarea.value.
        if (content == null)
            content = element.innerHTML; // Like textarea.innerHTML.
        content = content.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        return TrimPath.parseTemplate(content, elementId, optEtc);
    }

    TrimPath.processDOMTemplate = function(elementId, context, optFlags, optDocument, optEtc) {
        return TrimPath.parseDOMTemplate(elementId, optDocument, optEtc).process(context, optFlags);
    }
}) ();

/** 
 * extend by bezy@2006-6-23
 */

TrimPath.parseTemplate_etc.modifierDef.escape = function(s){
	return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

TrimPath.parseTemplate_etc.modifierDef.js_string = function(s){
	return String(s).replace(/\\/g, "\\\\").replace(/'/g, "\\&#39;").replace(/"/g, "\\&#34;");
}

TrimPath.parseTemplate_etc.modifierDef.substring = function(s,s1,s2){
	return String(s).substr(s1, s2);
}

TrimPath.parseTemplate_etc.modifierDef.replace = function(s,s1,s2){
	return String(s).replace(s1,s2)
}

TrimPath.parseTemplate_etc.modifierDef.parentDomain = function(s){	
	return DomainMap.getParentDomain(s);
}

TrimPath.parseTemplate_etc.modifierDef.to_url = function(s){
	if(s==null)
		return "#";
	var url=/^(.+):\/\/(.*)$/;
	if(!url.test(s))
		s = "http://"+s;
	return s;
}

TrimPath.parseTemplate_etc.modifierDef.showBr = function(s){
	return  String(s).replace(/\n/g, "<br>");		
}

TrimPath.parseTemplate_etc.modifierDef.erase = function(s,i){
	s = s+'';
	if(s.length <=i)
		return s;
	return s.substr(0,i)+'...';
}

TrimPath.parseTemplate_etc.modifierDef.getIPNames = function(s,ip){
	if(s!=null && s!="")
		return s; 
	if(ip != null && ip != "" && ip != undefined){
		var i = ip.lastIndexOf(".");
		return "IP: " + ip.substring(0, i) + ".*";
	}else{
		return "δ֪�����û�";
	}
}

TrimPath.parseTemplate_etc.modifierDef.toTimeLength = function(str){
	var t = parseInt(str);
	var s = t%60+''; if(s.length==1) s='0'+s;
	var m = Math.floor(t/60)+''; if(m.length==1) m='0'+m;
	return m+':'+s;
}

/*
 * �÷�   var s = new String('...');
 * 		 s.processUseCache(...);
**/
String.prototype.processUseCache= function(context, optFlags){
	if(this.__template__ == null)
		this.__template__ = TrimPath.parseTemplate(this, null);
	if(this.__template__ != null)	
		return this.__template__.process(context, optFlags);
	return this;
}

if (NetEase==undefined){
	var NetEase={};
}
NetEase.CardSystem = Class.create();
NetEase.CardSystem.prototype ={
	initialize: function(hostId,hostName,hostNickName){
		this.options = Object.extend(
			{
				jsWindowManager: false,
				dwrAlert: false,
				dialogId: "cardDialog",
				style: '/style/common',
				objName: 'cardSystem'
			}, arguments[3]||{});
		this.sendUserId = hostId;
		this.sendUserName = hostName.unescape_freemark();
		this.sendUserNickName = hostNickName.unescape_freemark();
		this.cardpageHash = {};
		this.lastCategoryId = null;
		this.card_stat_slide = false;
		this.COM_ID = "$_commend"; //�Ƽ���hash id
		this.initTemplate();
	 	if(!this.options.jsWindowManager){
		 	this.jsWindowManager = new NetEase.JSWindowManager();
	 	}else{
	 		this.jsWindowManager = this.options.jsWindowManager;
	 	}
	},	
	
	showSendCardDialog: function(receiveUserId,receiveUserName,receiveUserNickName){
		if(receiveUserId == this.sendUserId){
			if(this.options.dwrAlert){
				this.options.dwrAlert("�Բ��𣬲��ܷ����Լ�!","error");
			}else{
				alert("�Բ��𣬲��ܷ����Լ�!");
			}
			return;
		}		
		this.receiveUserId = receiveUserId;
		this.receiveUserName = receiveUserName.unescape_freemark();
		this.receiveUserNickName = receiveUserNickName.unescape_freemark();
		this._initSendCardDialog(this.options.dialogId);		
	},
	
	showReceiveCardDialog: function(srId,isSys){
		if(isSys == null)
			isSys = false;
		CardBean.receiveCard(srId,isSys,this._afterReceiveCard.bind(this));			
	},
	
	_afterReceiveCard: function(cardSRMap){
		if(cardSRMap){
			var dialogId = "receiveDialog_"+cardSRMap.id;
			var receiveCardDialog = this.jsWindowManager.getWindow(dialogId);
			if(receiveCardDialog == null){
				receiveCardDialog = this.jsWindowManager.createWindow(dialogId,{
					className:"g_win_9",width: 780, height:440,hiddenOnClose:false
				});
			}
			var title = '<span class="a_a d_d" href="http://'+DomainMap.getParentDomain(cardSRMap.sendUserName.escape())+'" target="_blank">'+cardSRMap.sendUserNickName.escape()+
						'</span> �͸���ġ�'+cardSRMap.cardInfo.name.escape()+'���ؿ� [<span class="a_a d_d" onclick="'+
						this.options.objName+'._replyCard(\''+dialogId+'\',\''+cardSRMap.sendUserId+'\',\''+cardSRMap.sendUserName.escape().trimSQ()+
						'\',\''+cardSRMap.sendUserNickName.escape().trimSQ()+'\');">����</span>]';
			receiveCardDialog.updateTitle(title);	
			var data = {src:this._constructSrc(cardSRMap.cardInfo.srcId,true),
					    receiver:cardSRMap.receiveUserNickName,content:cardSRMap.content,
					    senderUrl:'http://'+DomainMap.getParentDomain(cardSRMap.sendUserName.escape()),
					    sender:cardSRMap.sendUserNickName,sendTime:cardSRMap.sendTime};
			receiveCardDialog.panel.innerHTML = this.jst_cardreceive_template.processUseCache(data);
			receiveCardDialog.showWindow();
		}else{
			if(this.options.dwrAlert){
				this.options.dwrAlert("��ȡ�ؿ�ʧ��!","error");
			}else{
				alert("��ȡʧ��");
			}
		}	
	},
	
	_replyCard: function(dialogId,userId,userName,userNickName){
		this.jsWindowManager.closeWindow(dialogId);
		this.showSendCardDialog(userId,userName,userNickName);	
	},
		
	_initSendCardDialog: function(id){
		if(this.sendCardDialog == null){
			this.sendCardDialog = this.jsWindowManager.createWindow(id,{title:'���ͺؿ�',
				width: 580, height: 480,className:'g_win_10',beforeHiddenFunc: this._cancelCardSend.bind(this)
			});
		}
		this._loadSendCategorys();
		this.sendCardDialog.showWindow();				
	},
	
	_loadSendCategorys: function(){
		if(this.notFirstShow == null){
			this.notFirstShow = true;				
			var callback = function(cardCategoryList){
				var data ={cardCategoryList:cardCategoryList};
				this.sendCardDialog.panel.innerHTML = this.jst_cardsend_template.processUseCache(data);
				this.cardInfo = $("$$_card_info");
				this.cardContent = $("$$_card_content");
				this.cardTip = $("$$_card_tip");
				this.cardTip.style.display = "";
				this.cardSend = $("$$_card_send");
				this.cardSend.style.display = "none";
				this.cardReceive = $("$$_card_receive");
				this.cardReceive.innerHTML = '�͸� <span class="a_a d_d" href="http://'+DomainMap.getParentDomain(this.receiveUserName.escape()) +'" target="_blank">'+this.receiveUserNickName.escape()+'</span> ��ף��';			
				this.cardBlessContent = $("$$_bless_content");
				this.cardInputZone = $("$$_card_input_zone");
				this.cardInputTip = $("$$_card_input_tip");
				this.commendCategory = $("$$_commend_category");
				if(this.commendCategory)
					this._selectSendCategory(this.commendCategory,this.COM_ID);	
			}.bind(this);
			CardBean.getCardCategoryList(callback);			
		}else{
			this.cardReceive.innerHTML = '�͸� <span class="a_a d_d" href="http://'+DomainMap.getParentDomain(this.receiveUserName.escape()) +'" target="_blank">'+this.receiveUserNickName.escape()+'</span> ��ף��';			
		}
	},
	
	_selectSendCategory: function(obj,id){
		if(this.lastObj != null){
			Element.removeClassName(this.lastObj,'selected');
		}
		Element.addClassName(obj,'selected');
		this.lastObj = obj;
		if(this.cardpageHash[id]==null){
			var loadFunc;
			if(id == this.COM_ID){
				loadFunc = this._loadCommendFunc.bind(this);
			}else{
				loadFunc = this._loadCommonFunc.bind(this);
			}
			this.cardpageHash[id] = new NetEase.CachePage({
				loadFunc:loadFunc,loadParam:{cateId:id},presentFunc:this._presentCardsFunc.bind(this),presentSlideFunc:this._presentCardFunc.bind(this),
				organizeFunc:this._organizeFunc.bind(this),detSlideIterator:this._detSlideIterator.bind(this),
				pageSize:9,prefetch:true,prefetchMulti:1,markID:false,customPageIds:['$$_card_prev','$$_card_next'],
				styleDir:this.options.style
			});
			this.cardpageHash[id].nextPage();
			if(this.lastCategoryId!=null)
				this.cardpageHash[this.lastCategoryId].resetCachePageEvent();
		}else{
			if(this.lastCategoryId != id || this.card_stat_slide == true){
				if(this.lastCategoryId != id)
					this.cardpageHash[this.lastCategoryId].resetCachePageEvent();
				this.cardpageHash[id].refreshCurPage();
			}	
		}
		if(id == this.COM_ID){
			this._showCardCommendInfo(true);
		}else{
			this._showCardCommendInfo(false);			
		}
		this.lastCategoryId = id;
		this.card_stat_slide = false;
	},
		
	_organizeFunc: function(dataList){
		for(var i=0;i<dataList.length;i++){
			dataList[i].smallSrc=this._constructSrc(dataList[i].srcId,false);
			dataList[i].bigSrc=this._constructSrc(dataList[i].srcId,true);
		}
		return dataList;
	},
	
	_constructSrc: function(srcId,isBig){
		var aId = srcId % 10;
		if(isBig)
			return "http://cardimg.163.com/mcards/"+aId+"/big/"+srcId+".swf";
		return "http://cardimg.163.com/mcards/"+aId+"/small/s"+srcId+".swf";
	},
		
	_loadCommendFunc: function(param,callback){
		CardBean.getCommendCardInfoList(param.offset,param.limit,callback);
	},
	
	_loadCommonFunc: function(param,callback){
		CardBean.getCardInfoList(param.cateId,param.offset,param.limit,callback);
	},
	
	_presentCardsFunc: function(dataList){
		var data={cardInfoList: dataList};
		this.cardContent.innerHTML = this.jst_cards_template.processUseCache(data);
		this.cardContent.style.borderWidth="1px";
		this.cardTip.style.display = "";
		this.cardSend.style.display = "none";
	},
		
	_presentCardFunc: function(cardInfo){
		if(cardInfo){
			var data={cardInfo: cardInfo};
			this.cardContent.innerHTML = this.jst_card_template.processUseCache(data);
			this.cardContent.style.borderWidth="0px";
			this.cardTip.style.display = "none";
			this.cardSend.style.display = "";
			this.cardBlessContent.focus();
		}
	},
	
	_selectCardInfo: function(id){
		if(this.cardpageHash[this.lastCategoryId]){
			this.cardpageHash[this.lastCategoryId].changeToSlideMode(id);
			this.card_stat_slide = true;
			this._showCardCommendInfo(false);
		}
	},
	
	_showCardCommendInfo: function(show){
		if(show == true){
			this.cardInfo.style.display = "";
		}else{
			this.cardInfo.style.display = "none";			
		}
	},
	
	_detSlideIterator: function(id,e){
		if(id == e.id)
			return true;
		return false;
	},

	_cancelCardSend: function(){
		if(this.cardpageHash[this.lastCategoryId]){
			this.cardpageHash[this.lastCategoryId].refreshCurPage();
			this.card_stat_slide = false;
			if(this.lastCategoryId== this.COM_ID){
				this._showCardCommendInfo(true);
			}else{
				this._showCardCommendInfo(false);			
			}
		}		
	},
	
	_submitCardSend: function(){
		if(this.cardpageHash[this.lastCategoryId]){
			var content = this.cardBlessContent.value.trim();
			if(content==""){
				alert("����������ף��!");
				this.cardBlessContent.focus();
				return;
			}
			var obj = this.cardpageHash[this.lastCategoryId].getSelectSlide();
			if(obj){
				this.cardInputZone.style.display='none';
				this.cardInputTip.style.display='block';
				var cardSRMap = {cardId:obj.id,sendUserId:this.sendUserId,
				sendUserName:this.sendUserName,sendUserNickName:this.sendUserNickName,
				receiveUserId:this.receiveUserId,receiveUserName:this.receiveUserName,
				receiveUserNickName:this.receiveUserNickName,content:content};
				CardBean.sendCard(cardSRMap,this._afterCardSent.bind(this));				
			}
		}	
	},
	
	_afterCardSent: function(stat){
		if(stat){
			if(this.options.dwrAlert){
				this.options.dwrAlert("���ͺؿ��ɹ�!","ok");
			}
			this._cancelCardSend();
		}else{
			if(this.options.dwrAlert){
				this.options.dwrAlert("���ͺؿ�ʧ��!","error");
			}else{
				alert("���ͺؿ�ʧ��!");
			}
		}
		this.cardInputZone.style.display='block';
		this.cardInputTip.style.display='none';
	},
	
	initTemplate: function(){		
		this.jst_cardsend_template = 
		new String('{var commentInfo = ""}\
		 <div>\
			<div class="g_tab_btn03">\
			{for category in cardCategoryList}\
				{if category.commend == true}\
					{var commentInfo = category.info}\
					<div id="$$_commend_category" class="selected" onclick="'+this.options.objName+'._selectSendCategory(this,\''+this.COM_ID+'\');">${category.name|default:""|escape}</div>\
				{else}\
					<div onclick="'+this.options.objName+'._selectSendCategory(this,\'${category.id}\');">${category.name|default:""|escape}</div>\
				{/if}\
			{/for}\
			</div>\
			<table class="case" border="0" cellspacing="0" cellpadding="0">\
				 <tr id="$$_card_info"><td width="40">&nbsp;</td><td class="g_t_left"><p class="g_h_20 clr00">${commentInfo|default:""|escape}</p></td><td width="40">&nbsp;</td></tr>\
				 <tr><td width="40" class="g_t_left"><div class="g_img_14 g_c_hand p_ p27" onmouseover="Element.replaceClassName(this,\'p27\',\'p25\');" onmouseout="Element.replaceClassName(this,\'p25\',\'p27\');" title="��ҳ" id="$$_card_prev">&nbsp;</div></td>\
				 <td><div class="cnt" id="$$_card_content"></div></td>\
				 <td width="40" class="g_t_right"><div class="g_img_14 g_c_hand p_ p28" onmouseover="Element.replaceClassName(this,\'p28\',\'p26\');" onmouseout="Element.replaceClassName(this,\'p26\',\'p28\');" title="��ҳ" id="$$_card_next">&nbsp;</div></td></tr>\
				 <tr id="$$_card_tip"><td>&nbsp;</td><td class="g_t_left g_h_25 clr02"><span class="i_ i74">&nbsp;</span>����ؿ����ߺؿ������鿴�ؿ������͡�</td><td class="g_w_5">&nbsp;</td></tr>\
			</table>\
			<table class="case" border="0" cellspacing="0" cellpadding="0" id="$$_card_send">\
				<tr><td width="40">&nbsp;</td><td class="g_t_left g_h_25" id="$$_card_receive">&nbsp;</td><td width="40">&nbsp;</td></tr>\
				<tr><td>&nbsp;</td><td><textarea class="g_h_105" id="$$_bless_content"></textarea></td><td>&nbsp;</td></tr>\
				<tr><td>&nbsp;</td><td class="g_t_center g_h_30" >\
					<div id="$$_card_input_zone">\
					<input type="button" class="btncm btnok" value="������" onclick="'+this.options.objName+'._submitCardSend();"/>\
					<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>\
					<input type="button" class="btncm btncc" value="ȡ����" onclick="'+this.options.objName+'._cancelCardSend();"/>\
					</div><div id="$$_card_input_tip" style="display:none;">�ؿ�������...</div>\
				</td><td>&nbsp;</td></tr>\
			</table>\
		</div>');		
		
		this.jst_cards_template = 
			new String('{for cardInfo in cardInfoList}\
			 <div class="item">\
			 	<span class="a_a" onclick="'+this.options.objName+'._selectCardInfo(\'${cardInfo.id}\');">\
			 	<img src="${cardInfo.smallSrc|default:"#"}" /></span>\
				<p><span class="a_a d_d" onclick="'+this.options.objName+'._selectCardInfo(\'${cardInfo.id}\');">${cardInfo.name|default:""|escape}</span></p>\
			</div>\
			{/for}\
			<br class="g_p_clear" />');
		
		this.jst_card_template = new String('<div><p class="g_h_20 g_t_14 g_t_bold clr00">${cardInfo.name|default:""|escape}</p></div>\
								  <div><embed width="500px" height="400px" src="${cardInfo.bigSrc|default:"#"}" quality="high" \
								 	  pluginspage="http://www.macromedia.com/go/getflashplayer" \
									  type="application/x-shockwave-flash" wmode="transparent"></embed>\
								  </div>');
		this.jst_cardreceive_template =
				new String('<div class="left">\
	            	<embed width="500px" height="400px" src="${src}" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent">\
	            	</embed>\
            	</div>\
            	<div class="right clr00">\
            		 <p class="g_h_30">${receiver|default:""|escape}</p>\
            		 <p class="g_t_indent g_c_vmgin" style="line-height:120%;">${content|default:""|escape|showBr}</p>\
            		 <p class="g_h_20 g_t_right"><span class="a_a d_d" href="${senderUrl|default:"#"}" target="_blank">${sender|default:""|escape}</span></p>\
            		 <p class="g_h_20 g_t_right">${NetEase.DateTime.formatDate(sendTime,"yyyy-MM-dd")}</p>\
            	</div>');			
	}
	
}

/*
 * NetEase SimpleDragDrop ��קЧ���򻯰�
 * ʵ��ҳ��Ԫ���ܹ���ҳ��Ŀ��Ʒ�Χ���Ϸţ����Ҳ��߱���Ԫ�ص�ǿ�ƹ�λ����
 * method:
 * ����SimpleDragDrop����
 * 		top: ����ק��Χ����ʼ��	  ��top��height��false��÷����Ϸ�ΧʧЧ
 * 		left: ����ק��Χ����ʼ�� ��left��width��false��÷����Ϸ�ΧʧЧ
 * 		width: ����ק��Χ���
 * 		height: ����ק��Χ����	
 *		useDragOpacity: true     // �϶�ʱ�Ƿ�������ӰЧ�� add by mml
 * 		simpleDrag: false         // �϶�ʱ�Ƿ�������ģʽ add by bezy
 * 		constraint: ����ק����Ŀ��� all||horizontal||vertical
 * 		handle: ���ڶ������ק��handle.����Ϊcss����,�������ڸ�ccs��Ԫ��ʱ,��ʹ������Ԫ��
 * 		starteffect����ק��ʼ��Ч������
 * 		endeffect��	 ��ק������Ч������
 * addDraggable��	���һ������ק�Ķ���
 * 		element: ����קԪ��,����������������߶���id
 * removeDraggable�� �Ƴ�һ������ק�Ķ���
 * 		element: ����קԪ��,����������������߶���id
 */
if (NetEase==undefined){
	var NetEase={};
}

NetEase.SimpleDragDrop = Class.create();
NetEase.SimpleDragDrop.prototype = {
	initialize: function(){
		this.drags = [];
		// ������ק���������
		this.options = Object.extend({
			top: -1,
			left: 0,
			width: 0,
			height: 0,        //0 ��ʾû������,ͬʱ��left Ϊ0ʱ,width ��û�������;top �� height ͬ��
			constraint: 'all',	//horizontal || vertical
			useDragOpacity: true,     // �϶�ʱ�Ƿ�������ӰЧ��
			simpleDrag: false          //�Ƿ����ü��϶�ģʽ
		}, arguments[0] || {});
		this.options.top = parseInt(this.options.top || '0');
		this.options.left = parseInt(this.options.left || '0');
		this.options.width = parseInt(this.options.width || '0');
		this.options.height = parseInt(this.options.height || '0');
	},
	
	addDraggable: function(element){
		new NetEase.Draggable(element, this,
			Object.extend(this.options, arguments[1]||{}));
	},
	
	removeDraggable: function(element){
		element = $(element);
		this.drags.select(function(e){ return e.getElement()==element;}).each(function(e){e.destroy()});
	},
	
  	register: function(draggable) {
    	if(this.drags.length == 0) {
      		this.eventMouseUp   = this.endDrag.bindAsEventListener(this);
      		this.eventMouseMove = this.updateDrag.bindAsEventListener(this);
      		this.eventKeypress  = this.keyPress.bindAsEventListener(this);
      
      		Event.observe(document, "mouseup", this.eventMouseUp);
      		Event.observe(document, "mousemove", this.eventMouseMove);
      		Event.observe(document, "keypress", this.eventKeypress);
    	}
    	this.drags.push(draggable);
  	},
  
  	unregister: function(draggable) {
    	this.drags = this.drags.reject(function(d) { return d==draggable });
    	if(this.drags.length == 0) {
      		Event.stopObserving(document, "mouseup", this.eventMouseUp);
      		Event.stopObserving(document, "mousemove", this.eventMouseMove);
      		Event.stopObserving(document, "keypress", this.eventKeypress);
    	}
  	},
  
  	activate: function(draggable) {
    	window.focus(); // allows keypress events if window isn't currently focused, fails for Safari
    	this.activeDraggable = draggable;
  	},
  
  	deactivate: function() {
    	this.activeDraggable = null;
  	},
  
  	updateDrag: function(event) {
    	if(!this.activeDraggable) return;
    	var pointer = [Event.pointerX(event), Event.pointerY(event)];
    	// Mozilla-based browsers fire successive mousemove events with
    	// the same coordinates, prevent needless redrawing (moz bug?)
    	if(this._lastPointer && (this._lastPointer.inspect() == pointer.inspect())) return;
    	this._lastPointer = pointer;
    	this.activeDraggable.updateDrag(event, pointer);
  	},
  
  	endDrag: function(event) {
    	if(!this.activeDraggable) return;
    	this._lastPointer = null;
    	this.activeDraggable.endDrag(event);
    	this.activeDraggable = null;
  	},
  
  	keyPress: function(event) {
    	if(this.activeDraggable)
      	this.activeDraggable.keyPress(event);
  	}
};


NetEase.Draggable = Class.create();
NetEase.Draggable.prototype = {
 	initialize: function(element, draggables) {
    	var options = Object.extend({
      		handle: false,
      		starteffect: function(element) { 
        		new Effect.Opacity(element, {duration:0.2, from:1.0, to:0.7}); 
      		},
      		endeffect: function(element) { 
       	 		new Effect.Opacity(element, {duration:0.2, from:0.7, to:1.0}); 
      		},
      		zindex: 1000,
      		onDrag: Prototype.emptyFunction,
      		useDragOpacity: true,
      		simpleDrag: false
    	}, arguments[2] || {});

    	this.element = $(element);
    
    	if(options.handle && (typeof options.handle == 'string'))
      		this.handle = this._childrenWithClassName(this.element, options.handle)[0];  
    	if(!this.handle) this.handle = $(options.handle);
    	if(!this.handle) this.handle = this.element;
    
    	Element.makePositioned(this.element); // fix IE    

   		this.delta    = this.currentDelta();
    	this.options  = options;
    	this.dragging = false;   

    	this.eventMouseDown = this.initDrag.bindAsEventListener(this);
    	Event.observe(this.handle, "mousedown", this.eventMouseDown);
    	
    	this.draggables = draggables;
    
    	this.draggables.register(this);
    	
    	if(this.options.useDragOpacity == false || this.options.simpleDrag){
    		this.options.starteffect = null;
    		this.options.endeffect = null;	
    	}
  	},
  	
  	getElement: function(){
  		return this.element;
  	},
  
  	destroy: function() {
    	Event.stopObserving(this.handle, "mousedown", this.eventMouseDown);
    	this.draggables.unregister(this);
  	},
  
  	currentDelta: function() {
  		if(this._simpleNode) _e = this._simpleNode;
  		else _e = this.element;
   	 	return([
      		parseInt(Element.getStyle(_e,'left') || '0'),
      		parseInt(Element.getStyle(_e,'top') || '0')]);
  	},
  
  	initDrag: function(event) {
    	if(Event.isLeftClick(event)) {    
      		// abort on form elements, fixes a Firefox issue
      		var src = Event.element(event);
      		if(src.tagName && (
        		src.tagName=='INPUT' ||
        		src.tagName=='SELECT' ||
        		src.tagName=='OPTION' ||
        		src.tagName=='BUTTON' ||
        		src.tagName=='TEXTAREA')) return;
        
      		var pointer = [Event.pointerX(event), Event.pointerY(event)];
      		var pos     = Position.cumulativeOffset(this.element);
      		this.offset = [0,1].map( function(i) { return (pointer[i] - pos[i]) });
      
      		this.draggables.activate(this);
     	 	Event.stop(event);
    	}
 	},
  
  	startDrag: function(event) {
    	this.dragging = true;
    
    	if(this.options.zindex) {
     		this.originalZ = parseInt(Element.getStyle(this.element,'z-index') || 0);
      		this.element.style.zIndex = this.options.zindex;
    	}
    	
    	if(this.options.simpleDrag) {
	        this._simpleNode = this.element.cloneNode(false);
	        this._simpleNode.innerHTML='';
	        this._simpleNode.className='';
	        Element.setStyle(this._simpleNode,{zIndex:this.element.style.zIndex,border:'2px dotted red',cursor:'move',width:this.element.offsetWidth+'px',height:this.element.offsetHeight+'px'});
	        Element.setStyle(this.element,{display:'none'});
    	    document.body.appendChild(this._simpleNode);
    	    Element.makePositioned(this._simpleNode); // fix IE
      		var pointer = [Event.pointerX(event), Event.pointerY(event)];
      		var pos     = Position.cumulativeOffset(this._simpleNode);
      		this.offset = [0,1].map( function(i) { return (pointer[i] - pos[i]) });
    	}
    
    	if(this.options.starteffect) this.options.starteffect(this.element);
  	},
  
  	updateDrag: function(event, pointer) {
    	if(!this.dragging) this.startDrag(event);
    	Position.prepare();
    	this.draw(pointer);
    	if(navigator.appVersion.indexOf('AppleWebKit')>0) window.scrollBy(0,0);
    	this.options.onDrag();
    	Event.stop(event);
  	},
  
  	finishDrag: function(event, success) {
    	this.dragging = false;
    	this.delta = this.currentDelta();
        this.element.style.zIndex = this.originalZ;
		
		if(this._simpleNode){
			document.body.removeChild(this._simpleNode);
			Element.setStyle(this.element, {left: this.delta[0]+'px',top: this.delta[1]+'px',display:'block'});	
		}
		
    	if(this.options.endeffect) 
      		this.options.endeffect(this.element);

    	this.draggables.deactivate(this);
  	},
  
  	keyPress: function(event) {
    	if(event.keyCode!=Event.KEY_ESC) return;
    	this.finishDrag(event, false);
    	Event.stop(event);
  	},
  
  	endDrag: function(event) {
   		if(!this.dragging) return;
    	this.finishDrag(event, true);
    	Event.stop(event);
  	},
  
  	draw: function(point) {
  		var _e;
  		if(this._simpleNode) _e = this._simpleNode;
  		else _e = this.element;

    	var pos = Position.cumulativeOffset(_e);
    	var d = this.currentDelta();
    	pos[0] -= d[0]; pos[1] -= d[1];
    
        var p = [0,1].map(function(i){ 
      		return (point[i]-pos[i]-this.offset[i]) 
    		}.bind(this));
    		
    	if (this.options.left!=0){
    		if ((this.options.width!=0) && (p[0]>this.options.left+this.options.width))
    			p[0] = this.options.left+this.options.width;
    		else if (p[0]<this.options.left)
    			p[0] = this.options.left;
    	}
    	
    	if (this.options.top!=0){
	    	if ((this.options.height!=0) && (p[1]>this.options.top+this.options.height))
    			p[1] = this.options.top+this.options.height;
    		else if (p[1]<this.options.top)
    			p[1] = this.options.top;
    	}
    
    	if(this.options.constraint=='horizontal')
      		Element.setStyle(_e, {left: p[0]+'px'});
   		else if(this.options.constraint=='vertical')
      		Element.setStyle(_e, {top: p[1]+'px'});
      	else
    		Element.setStyle(_e, {
    			left: p[0] + 'px', top: p[1] + 'px'});
    	if (Element.getStyle(_e, 'visibility') == 'hidden')
    		Element.setStyle(_e, {visibility: ''}); // fix gecko rendering
  	},
  
  	_childrenWithClassName: function(element, className) {  
  		return $A($(element).getElementsByTagName('*')).select(
	    	function(c) { return Element.hasClassName(c, className) });
	}  
}
/**************************************************************
*				163 blog comment publish component		      *
*                                                             *
* Written by:  zhujingbo &&  zhuyiwen                         *
* Important: to use this script don't                         *
*            remove these comments                            *
* Version 2.0 (MSIE 6.0 above,Firefox1.0,Netscape.)           *
* Created Date: 2007-01-04									  *
* Copyright��1997-2006 NetEase.com Inc. All rights reserved.  *
**************************************************************/

/** 
 * @fileoverview 
 * ���ۿؼ����������۷�����������ʾ
 * 
 * @author  zhujingbo (zhujingbo@corp.netease.com) &&  zhuyiwen@(zhuyiwen@corp.netease.com)
 * @version 2.0 
 * @requires  utils.js
 * @requires  prototype.js
 * @see		  
 */

if (NetEase==undefined){
	var NetEase={};
}

/**
 * NetEase.CommentPublish Class
 *
 * @class ���ۿؼ�
 */
NetEase.CommentPublish = Class.create();


/**
 * ȫ�ֱ�����������TrimPathģ��parse��Ķ���
 * ������ʾ��־�������б�
 * @type	Object
 */
NetEase.CommentPublish.commentShowTemplate = null;
/**
 * ȫ�ֱ�����������TrimPathģ��parse��Ķ���
 * ������ʾ���۱༭��ģ��
 * @type	Object
 */
NetEase.CommentPublish.commentPubTemplate = null;






NetEase.CommentPublish.prototype = {
	/**
	 * CommentPublish�๹�캯�� ��ʼ��CommentPublish����Ԥ�����
	 * @constructor
	 * @param 	{Array}		oCommentArray		����������ҳ��ʾ�����۶�������	
	 * @param	{String}	sParentId			���������Ķ���id����blog������Ƭ��
	 * @param	{Number}	iTotalCommentCount	���۵�������
	 * @param	{String}	sComShowElemId		������ʾ����div��id
	 * @param	{String}	sComPubElemId		���۷�������div��id
	 * @return 	{NetEase.CommentPublish} 		CommentPublish����
	 * @see 	#_load
	 */
	initialize: function(oCommentArray, sParentId, iTotalCommentCount, sComShowElemId, sComPubElemId) {
		/**
		 * ��ʼ������ѡ��
		 * @private
		 * @type	Object
		 */
		this._oOptions = Object.extend({	
			sStyle					: "http://st.blog.163.com/style/1/",	// ���ۿؼ�Ӧ�õķ��
			bCanClose				: true,		// �Ƿ������Ͻǰ����ر���������İ�ť
			bHasCancelBtn			: false,	// �Ƿ���ȡ����ť
			bNeedCheckLogin			: false,	// �Ƿ�Ҫ��鷢���������Ƿ��½
			bNeedCheckRight			: false,	// �Ƿ���Ҫ��鷢���������Ƿ���з���Ȩ��
			bDefaultPubClose		: false,  	// (�˱���������) �Ƿ���Ҫ��鷢���������Ƿ���з���Ȩ��
			iAllowComment			: 0,		// �Ƿ�ö����������ۣ��û����õ����۷���Ȩ�ޣ���
												// -100��ʾ�κ��˿����ۣ�0��ʾ��¼�û������ۣ�
												// 100��ʾ�������ۣ�10000��ʾ���ѿ�����
			bSupportDeleteComment	: false,	// �Ƿ�֧��ɾ�����۵Ĺ��ܣ�Ĭ�ϲ�֧��
			iPageSize				: 10,		// ÿҳ��ʾ��������
			iHostId					: null,		// ���ڿռ����˵�id
			sHostName				: '����',	// ���ڿռ����˵�����(����ͨ��֤ID)
			iVisitorId				: null,		// ���۷����˵�id
			sVisitorName			: '����',	// ���۷����˵�����(����ͨ��֤ID)
			sVisitorNickname		: '����',	// ���۷����˵�����
			sVisitorAvatar			: '', 		// ���۷����˵�Ĭ����ʾͷ��
			iVisitorRank			: -100,		// ���۷����˵ĵȼ���-100:������0:��½�û���100:���ѣ�10000:����
			sVisitorIP				: '',		// ���۷����˵�IP
			iEditorWidth			: 0,		// ���۱༭����ȣ���λ���ء�
												// һ������¿�ȿ��ɸ���offsetParent�Զ������ȡ������0ֵ���ɣ�
												// ������iframe�����⣬�е�ʱ������offsetWidth�޷���ȡ�����ֻ��ͨ�������ȵķ������	
			iEditorHeight			: 286,		// ���۱༭���߶ȣ���λ����	
			iEditorMaxLen			: 65535,	// �༭��������󳤶�
			sLoginRedirect			: '',		// ��ʾ�û���½����ض���ҳ��
			fnOpenCommentEffect	 	: null,		// ��ʼ��ʾ���۵���Ч����
			fnAddComment			: null,		// ������۵ĺ���
			oAddCommentParams		: null,		// fnAddComment�Ĳ�������ʽΪ{key:value...}
			fnAfterAddComment		: null,		// ����������Ժ���ִ�е����������ĺ���
			oAfterAddCommentParams	: null,		// fnAfterAddComment�Ĳ�������ʽΪ{key:value...}
			fnDelComment			: null,		// ɾ�����۵ĺ���
			oDelCommentParams		: null,		// fnDelComment�Ĳ�������ʽΪ{key:value...}
			fnAfterDelComment		: null,		// ɾ���������Ժ���ִ�е����������ĺ���
			oAfterDelCommentParams	: null,		// fnAfterDelComment�Ĳ�������ʽΪ{key:value...}
			fnMoreData				: null,		// ��ҳʱ��ȡ�������۵ĺ���
			fnCloseComments			: null,		// �ر����ۿؼ��ĺ���
			fnReportBad				: null,		// �ٱ���������
			sObjName				: null,		// ��������ʵ������
			sUrlPrefix				: '',		// urlǰ׺�������������ۿ�
			sCircleBaseUrl			: 'http://q.163.com',
			fnCloseCommentDiv       : null		// �ر�������ʾ�������Ҫ���õĺ���, �����޸Ľ����css
		}, arguments[5] || {});		
		/**
		 * ���������Ķ���id
		 * @private
		 * @type	String
		 */	
		this._sParentId = sParentId;
		/**
		 * ��¼������õ�sParentId, ����reload�Ժ��ס���۷�������sParentId,��Ϊ��id�ǲ����
		 * @private
		 * @type	String
		 */
		this._sOrigParentId = sParentId;
		/**
		 * ���۶�������
		 * @private
		 * @type	Array
		 */
		this._oCommentArray = oCommentArray;	
		/**
		 * ���۵�������
		 * @private
		 * @type	Number
		 */
		this._iTotalCommentCount = iTotalCommentCount;		
		/**
		 * ������ʾ����div��id
		 * @private
		 * @type	String
		 */
		this._sComShowElemId = sComShowElemId;
		/**
		 * ���۷�������div��id
		 * @private
		 * @type	String
		 */
		this._sCmPubElemId = sComPubElemId;
		
		if (this._oOptions.iPageSize <= 0)
			this._oOptions.iPageSize = 10;		
		/**
		 * �Ƿ���δ��¼״̬
		 * @private
		 * @type	Boolean
		 */
		this._bStatusNotLogin = false;
		/**
		 * �Ƿ�û������Ȩ��
		 * @private
		 * @type	Boolean
		 */
		this._bStatusNoRight = false;
		/**
		 * �����˵�Ĭ��ͷ���ַ
		 * @private
		 * @type	String
		 */		
		this._sDefaultVisitorAvatarUrl = 'http://st.blog.163.com/style/common/stranger.gif';
		/**
		 * ��ǰ����ҳ�����
		 * @private
		 * @type	Number
		 */
		this._iCurrPageIndex = 1;		
		/**
		 * ���۵���ʾ����ҳ����
		 * @private
		 * @type	Number
		 */
		this._iTotalPageNumber = 0;
		/**
		 * html�༭������ʵ��
		 * @private
		 * @type	Object
		 */
		this.htmleditor;
		this._load();

		return this;
	}, 
	
	/**
	 * ����trimpathģ�岢��ʾ������������
	 * @private
	 * @return		{Void}
	 * @see		#_computePageNumber
	 * @see		#displayCommentArea
	 * @see		#createJSTAndParse
	 */
	_load: function() {	
		this._computePageNumber();
		if (this._oOptions.bNeedCheckLogin) {
			if (this._oOptions.iVisitorRank <= -100) {
				this._bStatusNotLogin = true;
			} else {
				this._bStatusNotLogin = false;
			}
		}
		if (this._oOptions.bNeedCheckRight) {
			if (this._oOptions.iVisitorRank >= this._oOptions.iAllowComment) {
				this._bStatusNoRight = false;
			} else {
				this._bStatusNoRight = true;
			}
		}
		if (NetEase.CommentPublish.commentShowTemplate == null) 
			NetEase.CommentPublish.commentShowTemplate = createJSTAndParse("jst_global_comment_show", jst_global_comment_show);
		if (NetEase.CommentPublish.commentPubTemplate == null) 
			NetEase.CommentPublish.commentPubTemplate = createJSTAndParse("jst_global_comment_pub", jst_global_comment_pub);
			
		this.displayCommentArea();	
//		if (this._oOptions.iVisitorId != this._oOptions.iHostId)
//			this.refreshCaptchaImg(this._sParentId);

		
		
	},
	
	/**
	 * �������������б����ݣ�������ˢ�����۷�������
	 * һ���������۸��º�ˢ��
	 * @param	{Array}		oCommentArray		���۶�������
	 * @param	{String}	sParentId			���������Ķ���id
	 * @param	{Number}	iTotalCommentCount	�ܵ�������
	 * @param	{Number}	iAllowComment		�û����õ�����Ȩ�ޣ� 
	 * 											-100��ʾ�κ��˿����ۣ�0��ʾ��¼�û������ۣ�
	 * 											100��ʾ�������ۣ�10000��ʾ���ѿ�����
	 * @return	{Void}
	 * @see		#_computePageNumber
	 * @see		#_setCommentShowArea
	 * 
	 */
	reload: function(oCommentArray, sParentId, iTotalCommentCount, iAllowComment) {
		this._oCommentArray = oCommentArray;	
		this.hideValidCodeImg(this._sOrigParentId);
		this.htmleditor.emptyContent();
		this._sParentId = sParentId;
		this._oOptions.iAllowComment = iAllowComment;
		this._iTotalCommentCount = iTotalCommentCount;	
		this._iCurrPageIndex = 1;	
		this._computePageNumber();
		this._setCommentShowArea();
			
	},
	

	/**
	 * ��ʾ�����������򣬰���������ʾ�����۷�������
	 * @private
	 * @return		{Void}
	 * @see		#_setCommentShowArea
	 * @see		#_setCommentPubArea
	 * @see		#_setHtmlEditor
	 * @see		#_blindDownComments
	 */
	displayCommentArea: function() {
		
		//��������
		this._setCommentShowArea();	
		this._setCommentPubArea();

		//���ɱ༭��			
		var disable = false;		
		if (this._bStatusNotLogin || this._bStatusNoRight)
			disable = true;
		
		this._setHtmlEditor(disable);	
		
//		$(this._sCmPubElemId).style.display = "";

		//��ʾ����
		if (this._oOptions.fnOpenCommentEffect != null) {//����ʾЧ��
			this._oOptions.fnOpenCommentEffect(this._sParentId, this._initEditor.bind(this));		
		} else {//����ʾЧ��
			if (this._oOptions.bDefaultPubClose == false) {
				
				//$(this._sCmPubElemId).style.display = "block";
				//this._initEditor();
				
				this._blindDownComments(this._sCmPubElemId, this._initEditor.bind(this));
			}
		}
		
	}, 

	/**
	 * ȱʡ��ʾЧ����blinddown, ����ʾ����ʱ������Ϊ������ʵ������Ч����
	 * Ŀ����Ϊ���ڻص���ִ��_initEditor(),��ֹfirefox�����۷����༭���޷��༭������
	 * @private
	 * @param	{String}	sElemId		��������id
	 * @param	{Object}	fnInit		��ʼ���༭���ص�����
	 * @return	{Void}
	 * @see		Effect#BlindDown
	 */
	_blindDownComments: function(sElemId, fnInit) {	
		var _oSucc = {success: false};
		
		new Effect.BlindDown(sElemId, {stateId: sElemId + "_$$S$$", succObj: _oSucc, duration:0.1, 
				userCallBack: function(){
					if (fnInit != null) {						
						fnInit();
						//�������ƶ�����ҳ���
						//top.document.documentElement.scrollTop = 0;
					} 
				} 
			} );
		
	},
	/**
	 * �۵�������ʾ����
	 * @private
	 * @param	{String}	sElemId		��������id
	 * @return	{Void}
	 * @see		Effect#BlindDown
	 */
	_blindUpComments: function(sElemId) {	
		var _oSucc = {success: false};
		new Effect.BlindUp(sElemId, {stateId: sElemId + "_$$S$$", succObj: _oSucc, duration:0.1} );
	},
	
	/**
	 * ���������б���������, ������ʾ�û�������
	 * @private
	 * @return	{Void}
	 * @see		#process
	 */
	_setCommentShowArea: function() {
		var _oData = {coms: this._oCommentArray, parentId: this._sParentId, pageNum: this._iCurrPageIndex, totalPageNum: this._iTotalPageNumber, 
					comCount: this._iTotalCommentCount, canClose: this._oOptions.bCanClose, 
					containerObjName: this._oOptions.sObjName, noCommentRight: this._bStatusNoRight,
					commentRange: this._oOptions.iPageSize, visitorAvatar: this._oOptions.sVisitorAvatar, defaultVisitorAvatarUrl: this._sDefaultVisitorAvatarUrl,
					hostId: this._oOptions.iHostId, style: this._oOptions.sStyle,
					visitorId: this._oOptions.iVisitorId, visitorName: this._oOptions.sVisitorName, hostName: this._oOptions.sHostName,
					supportDeleteComment: this._oOptions.bSupportDeleteComment, prefix: this._oOptions.sUrlPrefix, 
					circleBaseUrl: this._oOptions.sCircleBaseUrl};
		var _sShowResult = NetEase.CommentPublish.commentShowTemplate.process(_oData);
		var _oComShow = $(this._sComShowElemId);
		if (Trim(_sShowResult) != "") {	
			_oComShow.innerHTML = _sShowResult;
			_oComShow.style.display = "";
		}
		else {
			_oComShow.style.display = "none";
		}
	},
	
	/**
	 * �������۷����������� (���������û���Ϣ�����۱༭��)
	 * @private
	 * @return	{Void}
	 * @see		#process
	 */
	_setCommentPubArea: function() {
		var _bVisitorAvatarDefault = false;
		if (this._oOptions.sVisitorAvatar.length < 7 || this._oOptions.sVisitorAvatar.substr(0, 7) == "/style/" || this._oOptions.sVisitorAvatar == "-1000")
			_bVisitorAvatarDefault = true;
		var _sUserName;		
		if (this._oOptions.iVisitorId != 0)
			_sUserName = this._oOptions.sVisitorNickname;
		else //����
			_sUserName = "���ײ���" + this._getLastIPPart(this._oOptions.sVisitorIP);
		var _oData = {parentId: this._sParentId, editorId: this._sParentId, hostId: this._oOptions.iHostId, 
				allowComment: this._oOptions.iAllowComment, needCheckLogin: this._oOptions.bNeedCheckLogin, needCheckRight: this._oOptions.bNeedCheckRight,
				disabled: this._bStatusNotLogin || this._bStatusNoRight, notLogin: this._bStatusNotLogin, noCommentRight: this._bStatusNoRight, 
				canClose: this._oOptions.bCanClose, userName: _sUserName,
				hasCancelBtn: this._oOptions.bHasCancelBtn, 
				containerObjName: this._oOptions.sObjName, fnOpenCommentEffect: this._oOptions.sLoginRedirect,
				visitorAvatar: this._oOptions.sVisitorAvatar, hostName: this._oOptions.sHostName, visitorRank: this._oOptions.iVisitorRank,
				visitorId: this._oOptions.iVisitorId, visitorName: this._oOptions.sVisitorName, visitorNickname: this._oOptions.sVisitorNickname, 
				editorMaxLen: this._oOptions.iEditorMaxLen,
				defaultVisitorAvatarUrl: this._sDefaultVisitorAvatarUrl, visitorAvatarDefault: _bVisitorAvatarDefault};
		var _sPubresult = NetEase.CommentPublish.commentPubTemplate.process(_oData);
		
		$(this._sCmPubElemId).innerHTML = _sPubresult;		

	},
	/**
	 * �����û�����:��½�û��ͷǵ�½�û�, ���������۱༭��
	 * ��½�û�:   ���ı��༭��HTMLEditor
	 * �ǵ�½�û�: ��ͨ�༭��PlainEitor
	 * @private
	 * @param	{Boolean}	bDisable	�Ƿ���ñ༭��
	 * @return	{Void}
	 * @see		NECtrl.HtmlEditor
	 * @see		NetEase.PlainEditor
	 * @see		#_showValidCodeImg
	 * 
	 */
	_setHtmlEditor: function(bDisable) {
		if (this._oOptions.iVisitorRank >= 0) {//��½�û�
			var _bFriend = false;
			if (this._oOptions.iVisitorRank >= Const.Rank.Friend)
				_bFriend = true;
			this.htmleditor = new NECtrl.HtmlEditor(this._sParentId, "edt" + this._sParentId, {sStyle: this._oOptions.sStyle, bDisabled: bDisable, iWidth: this._oOptions.iEditorWidth, iHeight: this._oOptions.iEditorHeight, iMaxLen: this._oOptions.iEditorMaxLen, bSimpleEditor: true, bFriend: _bFriend, sObjName: this._oOptions.sObjName + ".htmleditor"});
			NECtrl.HtmlEditor.addEditor(this._sParentId, this.htmleditor);
		} else {//�ǵ�½�û�
			this.htmleditor = new NetEase.PlainEditor(this._sParentId, "edt" + this._sParentId,
							{disabled: bDisable, width: this._oOptions.iEditorWidth, height:this._oOptions.iEditorHeight, maxlen:this._oOptions.iEditorMaxLen});
			/*var plaineditor = this.htmleditor.editor;
			if (plaineditor != null && bDisable == false) {
				plaineditor.attachEvent("onfocus", function(){
					var codeDiv = $("validCode" + this._sParentId);
					if (codeDiv != null && codeDiv.innerHTML == "") {
						codeDiv.innerHTML = 
							'��֤��:<input type="text" id="valcode' + this._sParentId + '" value="" size="18" maxlength="4"  class="input_textbox" />' +
							'<img border="0" id="captchaimg${parentId}" alt="��֤��" src="' + this.getCaptchaImgSrc(this._sParentId) + '" />';
					}
				}.bind(this));
			}*/
			if (!bDisable)
				this._showValidCodeImg(this._sParentId);
		}
	},
	
	/**
	 * ����������ʾ����ҳ��
	 * @private	
	 * @return	{Void}
	 */
	_computePageNumber: function() {
		this._iTotalPageNumber = parseInt(this._iTotalCommentCount / this._oOptions.iPageSize) + 
							((this._iTotalCommentCount % this._oOptions.iPageSize != 0) ? 1 : 0);	
	},

	/**
	 * ��ת��ĳһ��ҳ
	 * @param	{Number}	iPageIndex	��ת����ҳ��
	 * @return	{Void}
	 */
	moveToPage: function(iPageIndex, noScroll) {
		if (this._oOptions.fnMoreData != null) {
			if (iPageIndex <= 0)
				alert("ҳ�벻��С�ڵ���0");
			this._iCurrPageIndex = iPageIndex;
			this._oOptions.fnMoreData(this._sParentId, this._oOptions.iPageSize, (iPageIndex - 1) * this._oOptions.iPageSize, 
										this._postPageComment.bind(this));
			if (noScroll == true)
				new Effect.ScrollTo("comShowHeader_" + this._sParentId, {duration:0.0});// ��������һ������λ�ô�
		}
	},
	
	/**
	 * �Ӻ�̨��ȡ��ҳ�����ݺ�Ļص�����
	 * @private
	 * @param	{Array}		oCommentArray	��̨ȡ�õ����۶�������
	 * @return	{Void}		
	 * @see		#_setCommentShowArea
	 */
	_postPageComment: function(oCommentArray) {
		this._oCommentArray = oCommentArray;
		//��ʾ��������
		this._setCommentShowArea();
	},

	/**
	 * �ر����۷����ؼ�	
	 * @param	{String}	sParentId	���������Ķ���id	
	 * @return	{Void}
	 */
	closeComments: function(sParentId) {
		if (this._oOptions.fnCloseComments != null) {
			this._oOptions.fnCloseComments(sParentId);
		}
		//�޸Ľ����css
		if(this._oOptions.fnCloseCommentDiv != null){
			this._oOptions.fnCloseCommentDiv(sParentId);
		}
	},
	/**
	 * enbale���۷�����ť
	 * @private
	 * @param	{String}	sParentId	���������Ķ���id	
	 * @return	{Void}
	 */
	_enablePubBtn: function(sParentId) {
		var _oPubbtn = $("$$_compubbtn" + sParentId);
		_oPubbtn.className = "";
	},
	
	/**
	 * �ύ�������
	 * @param	{String}	sParentId	�������������Ķ���id	
	 * @return	{Boolean}	�Ƿ�������۳ɹ�
	 * @see		#showInfo
	 * @see		#Trim
	 * @see		#checkMail
	 * @see		#testUrl
	 * @see		#isEmptyDiv
	 * @see		NECtrl.HtmlEditor#IsExceedMaxLen
	 * @see		NECtrl.HtmlEditor#getContent
	 */
	addComment: function(sParentId) {
		var _oPubbtn = $("$$_compubbtn" + sParentId);
		_oPubbtn.className = "g_disable";
		
		var _oUserName = $("username"+sParentId);
		var _sUsrname = Trim(_oUserName.value);
		if (_sUsrname == '') {
			showInfo("$$_comsubmithint" + this._sParentId, "�������ǳ�", "info");
			_oPubbtn.className = "";
			return false;
		}
		
		//�������û�, ������֤���Ƿ�����
		if (this._oOptions.iVisitorRank <= -100) {
			var _sValCode = $("valcode"+sParentId);
			if (_sValCode == null) {
				showInfo("$$_comsubmithint" + this._sParentId, "����������", "info");
				_oPubbtn.className = "";
				return false;
			} else {
				if ($("valcode"+sParentId).value == ""){
					showInfo("$$_comsubmithint" + this._sParentId, "��������֤��", "info");
					_oPubbtn.className = "";
					return false;
				} else if ($("valcode"+sParentId).value.length != 4){
					showInfo("$$_comsubmithint" + this._sParentId, "��֤��Ϊ4λ", "info");
					_oPubbtn.className = "";
					return false;
				}
			}
		}
		
		var _sContent = this.htmleditor.getContent(sParentId);
		//�����Ƿ�Ϊ��
		if (isEmptyDiv(_sContent)) {
			showInfo("$$_comsubmithint" + this._sParentId, "����������", "info");
			_oPubbtn.className = "";
			return false;
		}
		//�����Ƿ񳬹�����
		if (this.htmleditor.IsExceedMaxLen()) {
			showInfo("$$_comsubmithint" + this._sParentId, "�������ݳ����������" + this._oOptions.iEditorMaxLen + "�������±༭���ύ", "info");
			_oPubbtn.className = "";
			return false;
		}
		
		//��װ���۶���
		var _oNewComment = new Object();
		//ע�⣬������this._sParentId, ������sParentId
		_oNewComment.parentId = this._sParentId;
		_oNewComment.publisherId = this._oOptions.iVisitorId;
		_oNewComment.publisherName = this._oOptions.sVisitorName;
		_oNewComment.content = _sContent;
		_oNewComment.publishTime = new Date();	
		_oNewComment.publisherNickname = _oUserName.value;
		_oNewComment.ip = this._oOptions.sVisitorIP;
		_oNewComment.publisherEmail = "";
		_oNewComment.publisherUrl = "";
		
		_oNewComment.publisherAvatarUrl = this._oOptions.sVisitorAvatar;
		
		
		//����̨������۲��ص�
		if (this._oOptions.fnAddComment != null) {
				if (this._oOptions.oAddCommentParams != null) {
					this._oOptions.oAddCommentParams.valcodeid = sParentId;
				}
			//�����ĵ�һ���������û���������������Ϣ��ɵĶ��󣬸ö�����������ֶΣ�
			//parentId, publisherId, publishEmail,publisherUrl,content,publisherName,publisherAvatar
			this._oOptions.fnAddComment(_oNewComment, this._oOptions.oAddCommentParams, this._postAddComment.bind(this, sParentId));
		} else {
			_oPubbtn.className = "";
		}
		
	},
	

	/**
	 * ����̨������ۺ�Ļص�����
	 * @param	{String}	sParentId	���������Ķ���id	
	 * @param	{Object}	oNewComment	���۶���
	 * @return	{Void}
	 * @see		#hideValidCodeImg
	 * @see		#_genValidCodeImg
	 * @see		NECtrl.HtmlEditor#emptyContent
	 * @see		#_computePageNumber
	 */
	_postAddComment: function(sParentId, oNewComment) {
		var _oPubbtn = $("$$_compubbtn" + sParentId);
		if (this._oOptions.iVisitorRank < 0) {	//�����û�
			if (oNewComment != null) {
				//�������۳ɹ�, ��֤����ʾ����Html�����ÿ�"", Ϊ��������֤����׼��
				this.hideValidCodeImg(sParentId);
			}else{
				//��������ʧ��, ǿ�������µ���֤��ͼƬ
				this._genValidCodeImg(sParentId, false);
			}
		}
		if (oNewComment == null) {
			dwrlog('�������ʧ��', 'error');
			_oPubbtn.className = "";
			return;        
		}
		// ��ֹ�ظ����۵�spamֵ
		// 0: ����spam
		// 1: ͬһƪ��־�µ��ظ�����
		// 2: ����������־�з��������ظ����۵���ֵ
		if(oNewComment.spam > 0){
			if(oNewComment.spam == 1)
				alert("�����ڸ������·�������ͬ���ۣ��������ޡ�");
			else if(oNewComment.spam == 2)			
				alert("���ڶ�ʱ���ڷ����˹�����ͬ���ۣ��������ޡ�");
			dwrlog('�������ʧ��', 'error');
			_oPubbtn.className = "";
			this.htmleditor.emptyContent();
			return;
		}
		
		//������������
		this.htmleditor.emptyContent();
		
		//ά��������������ҳ��
		this._iTotalCommentCount += 1;
		this._computePageNumber();

		if (this._iCurrPageIndex != 1) {
			//���ǵ�һҳ���л�����ʾ��һҳ
			this.moveToPage(1, false);
		}
		else {
			//�������ڵ�һҳ
			var _oNewArray = [];
			//�����۷���ͷ��
			_oNewArray.push(oNewComment);

			for (var i = 0; i < this._oCommentArray.length; i++) {
				_oNewArray.push(this._oCommentArray[i]);
			}
			//���������������ҳ��ʾ����������
			while (_oNewArray.length > this._oOptions.iPageSize) {
				_oNewArray.pop();
			}
			this._oCommentArray = _oNewArray;
			//��ʾ����
			this._setCommentShowArea();
		}		
		
		dwrlog('������ӳɹ�', 'ok');
		_oPubbtn.className = "";
		
		if (this._oOptions.fnAfterAddComment != null) {
			this._oOptions.fnAfterAddComment(oNewComment, this._oOptions.oAfterAddCommentParams);
		}
	},
	/**
	 * ɾ�������¼�
	 * @param	{String}	sCommentId	��ɾ��������id
	 * @return	{Void}
	 */
	deleteComment: function(sCommentId) {
		//����̨������۲��ص�		
		if (this._oOptions.fnDelComment != null) {
			this._oOptions.fnDelComment(sCommentId, this._oOptions.oDelCommentParams, this._postDelComment.bind(this));
		}		
	},
	/**
	 * ɾ�����ۺ�Ļص�����
	 * @param	{Boolean}	bSucc	ɾ���ɹ���
	 * @return	{Void}
	 */
	_postDelComment: function(bSucc) {
		if (!bSucc)
			return;
		//ά��������������ҳ��
		this._iTotalCommentCount -= 1;
		this._computePageNumber();
		//�����ҳû��������������ǰҳ
		if (this._iCurrPageIndex > 1 && this._oCommentArray.length <= 1)
			this._iCurrPageIndex--;

		this.moveToPage(this._iCurrPageIndex, false);
		
		if (this._oOptions.fnAfterDelComment != null) {
			this._oOptions.fnAfterDelComment(this._oOptions.oAfterDelCommentParams);
			
		}
		
	},
	
	/**
	 * ��ʼ��html�༭��,ʹ��ɱ༭
	 * @private
	 * @return	{Void}
	 * @see		#attachFocusEvent
	 */
	_initEditor: function() {

		//attachFocusEvent(focusArray, "input_textbox_bright");
		
		//var focusArray2 = ['username' + this._sParentId]; 
		//attachFocusEvent(focusArray2, "input_text_username_bright");
		//���ñ༭�����
		if (this._oOptions.iVisitorRank >= 0) {//��½�û�
			var _oHtmlEditor = $("HEHtmlEditor" + this._sParentId);
			if (_oHtmlEditor != null) {
				var _iWidth = $("HEHtmlDiv" + this._sParentId).offsetWidth;
				if (_iWidth > 2)
					_oHtmlEditor.width = (_iWidth - 2);
			}
		} else {//�ǵ�½�û�
			var _oPlainEditor = $("plainEditor" + this._sParentId);		
						
			if (_oPlainEditor != null) {
				var _iWidth = $("plainDiv" + this._sParentId).offsetWidth;
				
				//����IE6�����ַ���Ŵ�༭�������	
				if (_iWidth > 4 && IEVer==6) 
					_oPlainEditor.style.width = (_iWidth - 2) + "px";
			}
		}
	},
	
	/**
	 * �Ƿ�disable/enable�û��ǳ������¼�
	 * Ĭ��ʹ�÷����û����û�����Ϊ�����˵�����
	 * @param	{Object}	oCheckbox		checkbox����
	 * @param	{String}	sInputId		��ʾ�û��ǳƵ������id
	 * @param	{String}	sDisabledCss	���������ʱʹ�õ�css
	 * @return
	 * @see		#appendCss
	 * @see		#removeLastCss
	 * @see		#disable
	 */
	switchDefaultName: function(oCheckbox, sInputId, sDisabledCss) {
		if (oCheckbox.checked) {
			appendCss(sInputId, sDisabledCss);
			disable(sInputId);
			
			if (this._oOptions.iVisitorId != 0)
				$(sInputId).value = this._oOptions.sVisitorNickname;
			else //����
				$(sInputId).value = "���ײ���" + this._getLastIPPart(this._oOptions.sVisitorIP);
				
		} else {
			removeLastCss(sInputId, sDisabledCss);
			enable(sInputId);
		}
	},
	/**
	 * ȡ��IP�����һλ
	 * @private
	 * @param	{String}	IP
	 * @return	{String}	ip���һλ������""
	 */
	_getLastIPPart: function(sIP) {		
		var _iIndex = sIP.lastIndexOf('.');
		if (_iIndex > 0)
			return sIP.substr(_iIndex + 1);
		else 
			return "";
	},
	
	switchCommentPub: function(sParentId) {
		var comPubMain = $("comPubMain_" + sParentId);
		if (comPubMain.style.display == 'none') {
			this._blindDownComments(comPubMain, this._initEditor.bind(this));
		} else {
			this._blindUpComments(comPubMain);
		}
	},
	/**
	 * ��ʾ��֤�� (�Էǵ�½�û�)
	 * @private
	 * @param	{String}	sParentId	���������Ķ���id
	 * @return	{Void}
	 */
	_showValidCodeImg: function(sParentId) {
		//�༭����Ӧ��Dom����
		var _oPlaineditor = this.htmleditor.editor;
		if (_oPlaineditor != null) {
			// �༭����ʱ����ʾ��֤��ͼƬ
			// ��֤ͼƬ�����ٶȽ���, ����onfocusʱ����
			if(isIE){
				_oPlaineditor.attachEvent("onfocus", function(){
					this._genValidCodeImg(sParentId, true);
				}.bind(this));
			} else {
				_oPlaineditor.addEventListener("focus", function(){
					this._genValidCodeImg(sParentId, true);
				}.bind(this), false);
			}
		}
	},
	/**
	 * ��ҳ������ʾ��֤��ģ�����֤ͼƬ
	 * @private
	 * @param	{String}	sParentId	���������Ķ���id
	 * @param	{Boolean}	bForce		�Ƿ��һ�μ���
	 * 			true:  ҳ���л�û���س���֤��ģ��, һ�����ڵ�һ�μ���
	 * 			false: ҳ�����Ѿ����ع���֤��, ��Ҫ��������һ��, �����ύ���ۺ��ٴ�����			
	 * @return	{Void}
	 */
	_genValidCodeImg: function(sParentId, bForce) {
		var _oCodeDiv = $("validCode" + sParentId);
		if (bForce) {
			//���ҳ�����Ѿ����ɹ���֤��, ��������
			if (_oCodeDiv != null && _oCodeDiv.innerHTML == "") {
				_oCodeDiv.innerHTML = 
					'<label for="txtVC">��֤��:&nbsp;</label><input type="text" class="bd01 g_f_focus" value="" maxlength="4" id="valcode' + sParentId + '" />' +
					'<img class="g_t_middle" id="captchaimg${parentId}" alt="��֤��" src="' + this._getCaptchaImgSrc(sParentId) + '" />';
				_oCodeDiv.style.display = "block";
			}
		} else {
			//����ҳ�����Ƿ��Ѿ����ɹ���֤��, ����������һ��
			if (_oCodeDiv != null) {
				_oCodeDiv.innerHTML = 
					'<label for="txtVC">��֤��:&nbsp;</label><input type="text" class="bd01 g_f_focus" value="" maxlength="4" id="valcode' + sParentId + '" />' +
					'<img class="g_t_middle" id="captchaimg${parentId}" alt="��֤��" src="' + this._getCaptchaImgSrc(sParentId) + '" />';
				_oCodeDiv.style.display = "block";
			}
		}
	},
	/**
	 * ������֤ģ�����֤ͼƬ
	 * @private
	 * @param	{String}	sParentId	���������Ķ���id
	 * @return	{Void}
	 */
	hideValidCodeImg: function(sParentId) {
		var _oCodeDiv = $("validCode" + sParentId);
		if (_oCodeDiv != null && _oCodeDiv.innerHTML != "") {
			_oCodeDiv.innerHTML = "";
			_oCodeDiv.style.display = "none";
		}
	},
	/**
	 * ��ȡ��֤ͼƬ��ַ
	 * @private
	 * @param	{String}	sParentId	���������Ķ���id
	 * @return	{String}	ͼƬ��ַ
	 */
	_getCaptchaImgSrc: function(sParentId) {
		var _iRandom = Math.floor(Math.random()*10001);
		var _sId = (_iRandom+"_"+new Date().getTime()).toString();
		return "/cap/captcha.jpgx?parentId=" + encodeURIComponent(sParentId) + "&" + _sId;
	},
		
	/*refreshCaptchaImg: function(sParentId){
		var random=Math.floor(Math.random()*10001);
		var id=(random+"_"+new Date().getTime()).toString();
		//������֤��
		if ( $("valcode"+sParentId))	
			$("valcode"+sParentId).value="";
		if ( $("captchaimg"+sParentId))
			$("captchaimg"+sParentId).src = "/cap/captcha.jpgx?parentId="+encodeURIComponent(parentId)+"&"+id;
	},*/
	
	/**
	 * ��ʾ��ʾ����, ������ʾ�����û���IP���ߵ�¼�û���ȫ��
	 * @param	{String}	sShowDiv	��ʾ�����Dom�����id
	 * @param	{String}	sMsg		��ʾ����Ϣ,����Ipname
	 * @param	{Var}		vIsIP		��ʾ�������Ƿ���IP
	 * @return	{Void}
	 * @see		Position#cumulativeOffset
	 */
	showPromptArea: function(sShowDiv, sMsg, vIsIP, ipValue) {
		
		var _oPromptDiv = $(sShowDiv);
		var _sMessage;
		if("ip" == vIsIP) {
			if(sMsg == null || sMsg == "" || sMsg == undefined) {
				if(ipValue== null || ipValue == "" || ipValue == undefined)
					_sMessage = "δ֪����";
				else
					_sMessage = ipValue;
			}else{
				_sMessage = sMsg;
			}
		}else{
			_sMessage = sMsg;
		}
		_oPromptDiv.innerHTML = _sMessage;

		_oPromptDiv.style.display = "block";

	},
	/**
	 * ������ʾ����
	 * @param	{String}	sShowDiv	��ʾ�����Dom�����id
	 * @return	{Void}
	 */
	hiddenPromptArea: function(sShowDiv) {
		var _oPromptDiv = $(sShowDiv);
		_oPromptDiv.style.display = "none";
	},

	
	/**
	 * Ͷ�����۲�������
	 * ���۶�Ӧ��id
	 * @param	{String}	sCommentId	����id
	 * @return	{Void}
	 */
	reportBad:	function(sCommentId) {
		if (this._oOptions.fnReportBad == null)
			return false;
		
		var repDetail = "";
		for (var i = 0; i < this._oCommentArray.length; i++) {
			if (this._oCommentArray[i].id == sCommentId) {
				var com = this._oCommentArray[i];
				repDetail ="�û���/IP��" +com.publisherName+","+com.ip + "<br>����ʱ�䣺" + NetEase.DateTime.formatDate(com.publishTime,"yyyy-MM-dd HH:mm")+ "<br>���ݣ�" + com.content.substr(0, 500);
				break;
			}
		}
		var _oReport = {
			"reportID":this._oOptions.iVisitorId,
			"reportName":this._oOptions.sVisitorNickname,
			"reportNameEmail":"",
			"publisherName":com.publisherName,
			"reportUrl":"",
			"reportType":8,
			"reportDetail":repDetail,
			"innerType":11,
			"innerIDStr":sCommentId
		};	
		gFeedback.openPopcommentReport(_oReport); 
		return;
	}
	
}

/**
* NetEase QuickLogin���ٵ�½��Ҳ��������ҳ��½ģ��
* @param {Boolean}bFromIndex
*		  �Ƿ�����ҳ����
*/

if (NetEase==undefined){
	var NetEase={};
}
NetEase.quickLoginTemplate = null;
NetEase.indexLoginTemplate = null;
var type163 = 0;
var typePopo = 1;
var type126 = 2;
var type188 = 3;
var typeVip =4;
//blog�Զ���¼cookie����ʽtype;
var ckLoginInfoKey = "NEBLOG_LOGIN";
//�Զ���¼cookie��Ϣ
var ckLoginInfo = {type:null, name:null, pass:null};
//var ckKeyFromType = "NEBLOG_LOGTP";
var ckPath = "/";
var ckDomain=DomainMap.cookieDomain;
var errInfo = ["�û��������벻��ȷ������������", "�����ײ����û���������", "��ʱ�˳�����Ȩ�޷��ʣ������µ�¼"];

NetEase.QuickLogin = Class.create();
NetEase.QuickLogin.prototype = {
	initialize: function(presentShowId, serverName, bFromIndex){
		this.options = Object.extend({
			err:false,
			jsWindowManager:null
		}, arguments[3] || {});
		//ȫ�ֱ���
		this.presentShowId = presentShowId;
		this.serverName = serverName;
		this.bFromIndex = bFromIndex;		
		this.err = false;
		this.jsWindowManager = this.options.jsWindowManager;
		this.objUsername;
		this.objPassword;
		this.objSetCkCheck;
		this.frmLogin;
		this.divNotice;
		this.btn_login;
		this.btn_reg;
		this.curUserType = 0;
		this.noticeInit = "�������û����������¼";
		this.noticeAccount = "����������ͨ��֤�û���";
		this.noticePassword = "��������д��¼��Ϣ�����벻��Ϊ��";
		this.isPwdFromCk = false;
		this.pwdFromCk;
		this.pwdFromCkTrim;	
		this.strUsername;
		this.strPassword;
		this.qLoginZone = null;
		this._load();			
	},
	
	_load: function(){	
		//��cookie�õ��û���������ȡ�get Login info  from last login .
		getLoginCookie();
		
		this.curUserType = ckLoginInfo.type;
		//this.curUserType = Cookie.get(ckKeyFromType);
		if(this.curUserType==null){
			this.curUserType = type163;
		}else{
			this.curUserType = parseInt(this.curUserType);
		}
		if(!this.bFromIndex || this.presentShowId=="qIndexLoginDiv"){
			//���ٵ�¼
			if (NetEase.quickLoginTemplate == null) 
				NetEase.quickLoginTemplate = quicklogin_jst;//createJSTAndParse("quicklogin_jst", quicklogin_jst);
			
			var data={err:false};
			var result = NetEase.quickLoginTemplate;//.process(data);
			if(this.presentShowId){
				this.qLoginZone = this.jsWindowManager.createWindow(this.presentShowId, {
					className:'g_win_4',width: 500, height:265,
					title:'��¼���ײ���', onTop:true
				});			
				this.qLoginZone.panel.innerHTML = result;	
				this.qLoginZone.showWindow();
			}
		}else{
			//��ҳ��¼
			if (NetEase.indexLoginTemplate == null) 
				NetEase.indexLoginTemplate = indexlogin_jst;//createJSTAndParse("indexlogin_jst", indexlogin_jst);
			
			var data={err:false};
			var result = NetEase.indexLoginTemplate;//.process(data);
			$("outLoginDiv").innerHTML = result;	
		}
		
		this.frmLogin = $("frmLogin");
		this.divNotice = $("notice_bar");
		this.objUsername = $("in_username");
		this.objPassword = $("in_password");
		this.objSetCkCheck = $("setCookieCheck");
		
		if(document.all) {
			//this.objUsername.attachEvent("onfocus", this.checkUsername.bind(this));
			this.objUsername.attachEvent("onblur", this.checkUsername.bind(this));
			//this.objUsername.attachEvent("onkeyup", this.checkUsername.bind(this));
			this.objPassword.attachEvent("onfocus", this.fnPassOnFocus.bind(this));
			this.objPassword.attachEvent("onblur", this.checkPassword.bind(this));
			//this.objPassword.attachEvent("onkeyup", this.checkPassword.bind(this));
			for(var i=0; i<5; i++){
				if ($("tab_a_"+i))
					$("tab_a_"+i).attachEvent("onclick", this.selectUserType.bind(this, i));
				else
				    $("tab_"+i).attachEvent("onclick", this.selectUserType.bind(this, i));
			}
			$("qLoginButt").attachEvent("onclick", this.dologin.bind(this));
			this.frmLogin.attachEvent("onkeypress", this.frmDologinIE.bind(this));
			this.objSetCkCheck.attachEvent("onclick", this.changeCookieCheck.bind(this));
		}
		else {
			//this.objUsername.addEventListener("focus", this.checkUsername.bind(this), true);
			this.objUsername.addEventListener("blur", this.checkUsername.bind(this), true);
			//this.objUsername.addEventListener("keyup", this.checkUsername.bind(this), true);
			this.objPassword.addEventListener("focus", this.fnPassOnFocus.bind(this), true);
			this.objPassword.addEventListener("blur", this.checkPassword.bind(this), true);
			//this.objPassword.addEventListener("keyup", this.checkPassword.bind(this), true);
//			this.btn_reg.addEventListener("onmouseout", this.regBtnOut.bind(this), true);	
				
			for(var i=0; i<5; i++){
				if ($("tab_a_"+i))
					$("tab_a_"+i).onclick = this.selectUserType.bind(this, i);
				else
					$("tab_"+i).onclick = this.selectUserType.bind(this, i);
			}
			$("qLoginButt").onclick = this.dologin.bind(this);
			this.frmLogin.onkeypress = this.frmDologin.bind(this);	
			this.objSetCkCheck.onclick = this.changeCookieCheck.bind(this);			
		}
		
		this.selectUserType(this.curUserType);
		
	},
	
	showWindow: function(){
		this.qLoginZone.showWindow();
	},
	
	frmDologinIE: function(){
		if(event.keyCode==13) 
			this.dologin();
	},
	frmDologin: function(event){
		if(event.keyCode==13) 
			this.dologin();
	},
	
	changeCookieCheck:function(){
		if(!this.objSetCkCheck.checked){
			var promt=window.confirm("ȷ��ȡ���Զ���¼��");
			if(promt){
				//get Login type from last login 
				//var userNameInit = getUserNameInit(this.curUserType);			
				clearLoginCookie();
			}else{
				this.objSetCkCheck.checked = true;
			}
		}
	},
	
	checkUsername: function(){	
		//divNotice.innerHTML = noticeAccount;
		//return true;	
		var strUsername = this.objUsername.value;
		//var reUsername = /^[A-Za-z0-9-][A-Za-z0-9\._-]{1,17}$/g;
		if (strUsername.length>0){		
			this.divNotice.innerHTML = this.noticeAccount;
			//this.objUsername.style.backgroundColor = "#fff";	
		} else {
			this.divNotice.innerHTML = this.noticeInit;
			//this.objUsername.style.backgroundColor = "#fff";	
		}	
		return true;
	},
	
	//����Ӧonfocus�¼���ֻ����cookie�������
	checkPasswordFocus: function(){
		var strPassword = this.objPassword.value;
		if(strPassword==""){
			var strUsername = this.objUsername.value + getNameSuffix(this.curUserType);
			
			//strPassword = Cookie.get(strUsername);	
			strPassword = ckLoginInfo.pass;
			if(null != strPassword){
				this.pwdFromCk = strPassword;
				this.pwdFromCkTrim = strPassword.substring(0,11);			
				this.isPwdFromCk = true;
				this.objPassword.value = strPassword.substring(0,11);
			}
		}
		this.checkPassword();
	},
	
	//��Ӧ����������onfocus�¼�
	fnPassOnFocus: function(){
		this.objPassword.select();
		this.checkPassword();
	},
	
	checkPassword: function(){
		var strPassword = this.objPassword.value;
		if(null==strPassword || strPassword==""){
			this.isPwdFromCk = false;
		}
		
		var rePassword = /^[\s]*$/g;
		if (strPassword.match(rePassword) != null){
			this.divNotice.innerHTML = this.noticePassword;
			//this.objPassword.style.backgroundColor = "#fff";
			return false;
		} else {
			this.divNotice.innerHTML = this.noticeInit;
			//this.objPassword.style.backgroundColor = "#fff";
			return true;
		}
	},
	
	dologin: function(){
		if(this.checkUsername() && this.checkPassword()) { //˳����¼
			this.divNotice.innerHTML = "���ڵ�¼�����Ժ�...";
			this.objUsername.disabled=true;
			this.objPassword.disabled=true;
			
			if(document.all){
				//this.objUsername.detachEvent("onfocus", this.checkUsername);
				this.objUsername.detachEvent("onblur", this.checkUsername);
				//this.objUsername.detachEvent("onkeyup", this.checkUsername);
				this.objPassword.detachEvent("onfocus", this.checkPassword);
				this.objPassword.detachEvent("onblur", this.checkPassword);
				//this.objPassword.detachEvent("onkeyup", this.checkPassword);
		
				$("frmLogin").detachEvent("onkeypress", this.frmDologinIE);	
				$("qLoginButt").detachEvent("onclick", this.dologin);
				this.objSetCkCheck.detachEvent("onclick", this.changeCookieCheck);				
			}else {
				//this.objUsername.removeEventListener("focus", this.checkUsername, true);
				this.objUsername.removeEventListener("blur", this.checkUsername, true);
				//this.objUsername.removeEventListener("keyup", this.checkUsername, true);
				this.objPassword.removeEventListener("focus", this.checkPassword, true);
				this.objPassword.removeEventListener("blur", this.checkPassword, true);
				//this.objPassword.removeEventListener("keyup", this.checkPassword, true);		
			}
			
			var strPassword = this.objPassword.value;
			var strPwdOld;
			if(!this.isPwdFromCk || strPassword != this.pwdFromCkTrim){
				if(this.curUserType==type163 || this.curUserType==typeVip)
					strPassword = this.pwd_js_string(strPassword);
				if(this.curUserType==type163  || this.curUserType==typeVip){
					strPassword = strPassword.substring(0,16);
				}else if(this.curUserType==typePopo){
					strPassword = strPassword.substring(0,21);
				}			
				strPwdOld = strPassword;
				strPassword = hex_md5(strPassword);		
			}else{
				//get from cookie
				strPassword = this.pwdFromCk;
				strPwdOld = strPassword;
			}
			
			var strUsername = this.objUsername.value;	
			var strUsernameOld = strUsername;
			strUsername += getNameSuffix(this.curUserType);
			
			if(this.curUserType == type126 || this.curUserType == type188){				
				strPassword = strPwdOld;//.replace(/#/g,"%23");			
			}
			
			if(this.objSetCkCheck.checked){
				//username
				clearLoginCookie();
				//setUserNameInit(this.curUserType, strUsernameOld, 30);
				//password
				//Cookie.clear(strUsername, ckPath);
				//Cookie.set(strUsername, strPassword, 30, ckPath, ckDomain);
				
				setLoginCookie(1, strUsernameOld);
				setLoginCookie(2, strPassword);
			}else{
				clearLoginCookie();
				//Cookie.clear(strUsername, ckPath);			
			}			
			
			//save cookie for login type
			//Cookie.clear(ckKeyFromType, ckPath);
			//Cookie.set(ckKeyFromType, this.curUserType, 30, ckPath, ckDomain);
			setLoginCookie(0, this.curUserType);
			
			this.strUsername = strUsername;
			this.strPassword = strPassword;

			if(this.bFromIndex || this.presentShowId=="qIndexLoginDiv"){
				$("frmLogin").action = "/passportIn.do?in_username="+this.strUsername+"&in_password="+this.strPassword;		
				UserBean.clearSession({
				  callback:function() {
				  	 //$("frmLogin").submit();
				  	  $("submitIndexLoginBtn").click();
				  }
				});
			}else{
				UserBean.check(strUsername, strPassword, this.dologinCb.bind(this));	
			}		
		}
		return false;
	},
	
	dologinCb: function(b){
		if(b!=null){
			if (b=="not reg!!") {
					location.href="/passportIn.do?in_username="+this.strUsername+"&in_password="+this.strPassword;
			} else {
				//modified by xcc, �û�����ָ��loginTarget
				if (this.loginTarget==null){
					this.loginTarget=window.location;
				} 
				//location.href = spaceStaticData.hostPath + "/loginGate.do?username="+this.strUsername+"&target=http://"+DomainMap.getParentDomain(this.strUsername)+this.loginTarget;
		
				location.href = spaceStaticData.hostPath + "/loginGate.do?username="+this.strUsername+"&target="+encodeURIComponent(this.loginTarget);
			}
		}else{
			this.objUsername.value = "";
			this.objPassword.value = "";
			this.objUsername.disabled=false;
			this.objPassword.disabled=false;
			this.divNotice.innerHTML = "�û��������벻��ȷ�����������롣";
			//$("in_username").focus();
		}
		
		return false;
	},
	
	pwd_js_string: function(s){
		return String(s).replace(/\\/g, "\\\\").replace(/'/g, "\\\'").replace(/"/g, "\\\"");
	},
	
	updateSuffix: function(suffix){
		var e = $("account_suffix");
		e.innerHTML = suffix;
	},
		
	selectUserType: function(type){
		for(var i=0; i<5; i++){
			if($("tab_"+i)){
				if(type == i){
					//$("tab_"+i).style.fontWeight="bold";
					$("tab_"+i).style.color="#3366cc";
					if (!this.bFromIndex)
						$("tab_"+i).className="g_f_hov selected";
				}else{
					$("tab_"+i).style.fontWeight="";
					$("tab_"+i).style.color="#999";
					if (!this.bFromIndex)
						$("tab_"+i).className="g_f_hov";
				}
			}
		}
		     
		     
		var regAdd = $("reg_add");
		var getPassAdd = $("getPass_add");
		
		var innerLoginDiv = $("innerLoginDiv");
		var sbStr = "bg_taglog";
		if(!this.bFromIndex){
			sbStr = "bg_menu";
		}
		if (innerLoginDiv)
		   innerLoginDiv.style.backgroundImage = "url(http://st.blog.163.com/style/common/index/"+ sbStr + type +".gif)";
	
		this.noticeInit = "������"+getShowLogName(type)+"�û����������¼";
		this.noticeAccount = "������"+getShowLogName(type)+"�û���";	
			
		if(type == type163){
			this.updateSuffix("@163.com");
			regAdd.href="http://reg.163.com/Service.jsp?url=http://blog.163.com/ntesRegBlank.html";
			getPassAdd.href="http://reg.163.com/RecoverPasswd1.shtml";
		}else if(type ==  type126){
			this.updateSuffix("@126.com");	
			regAdd.href="http://reg.126.com/reg1.jsp?from=";
			getPassAdd.href="http://reg.126.com/recoverpass/";
		}else if(type ==  typePopo){
			this.updateSuffix(".popo&nbsp;&nbsp;&nbsp;");	
			regAdd.href="http://reg.popo.163.com/";
			getPassAdd.href="http://popo.163.com/prtpass/getpass.sp";
		}else if(type ==  type188){
			this.updateSuffix("@188.com");
			regAdd.href="http://reg.mail.188.com/index.jsp?from=";
			getPassAdd.href="http://reg.mail.188.com/rstpsw/rpsel.htm";
		}else if(type == typeVip){
			this.updateSuffix("@vip.163.com");
			regAdd.href="http://vip.163.com/register.m";
			getPassAdd.href="http://vip.163.com/PWDRepair.m";
		}
		
//		$("btn_reg").src="http://st.blog.163.com/style/common/index/btn_reg"+getButtImgStr(type)+".gif";
		$("reg_add").innerHTML="ע��"+getShowRegName(type)+" -->";
		
		this.curUserType = type;
		//����û���������
		this.objUsername.value ="";
		this.objPassword.value ="";
		var userNameInit = ckLoginInfo.name;
		
		if(userNameInit && ckLoginInfo.type==type){
			this.objUsername.value = userNameInit;
			this.checkPasswordFocus();
			this.objSetCkCheck.checked = true;
			this.noticeAccount = "������¼��ť";
			this.noticeInit = "������¼��ť";
//			$("qLoginButt").focus();
		}else{
			this.objSetCkCheck.checked = false;
			//$("in_username").focus();
		}		
		
		//���������Ϣ
		var urlStr = window.location.href;
		var i = urlStr.indexOf("err=");
		if(i != -1){
			var errStr = urlStr.charAt(i+4);
			if(errStr=="1" || errStr=="2" || errStr=="3"){
				var n = parseInt(errStr);
				this.noticeInit = this.noticeAccount = errInfo[n-1];
			}
		}
		this.checkUsername();	
		return false;
	},
	
	
	regBtnOver: function(){
//		$("btn_reg").src="http://st.blog.163.com/style/common/index/btn_reg"+getButtImgStr(this.curUserType)+"_a.gif";
	},
	regBtnOut: function(){
//		$("btn_reg").src="http://st.blog.163.com/style/common/index/btn_reg"+getButtImgStr(this.curUserType)+".gif";
	}
}

function closeLogin(){
	$("loginNewDiv").style.display="none";
}
	

function getLogStr(type){
	if(type==type163)
		return  "163";
	else if(type==typePopo)
		return  "POPO";
	else if(type==type126)
		return  "126";
	else if(type==type188)
		return  "188";		
	else if(type==typeVip)
		return  "VIP";	
}

function getNameSuffix(type){
	if(type==type163)
		return  "";
	else if(type==typePopo)
		return  ".popo";
	else if(type==type126)
		return  "@126";
	else if(type==type188)
		return  "@188";		
	else if(type==typeVip)
		return  ".vip";	
}

function getShowLogName(type){
	if(type==type163)
		return  "����ͨ��֤";
	else if(type==typePopo)
		return  "POPO";
	else if(type==type126)
		return  "126����";
	else if(type==type188)
		return  "188����";		
	else if(type==typeVip)
		return  "VIP����";		
}

function getShowRegName(type){
	if(type==type163)
		return  "ͨ��֤";
	else if(type==typePopo)
		return  "POPO";
	else if(type==type126)
		return  "126����";
	else if(type==type188)
		return  "188����";		
	else if(type==typeVip)
		return  "VIP����";		
}

function getButtImgStr(type){
	if(type==type163)
		return  "";
	else if(type==typePopo)
		return "_po";
	else if(type==type126)
		return "_126";
	else if(type==type188)
		return"_188";
	else if(type==typeVip)
		return "_vip";
}


//��cookie�õ���¼���͡��û���������
function getLoginCookie(){
	var a;
	var v = Cookie.get(ckLoginInfoKey);
	if(v){
		a = v.split("|");
		var type = null;
		if(a[0])
			ckLoginInfo.type = parseInt(a[0]);
		if(ckLoginInfo.type == null || ckLoginInfo.type == undefined || ckLoginInfo.type<0 || ckLoginInfo.type>4){
			ckLoginInfo.type = null;
			//����ȡ�������û���������Ϊ��
			return;
		}
		
		if(a[1] != null && a[1] != undefined && a[1] != "null" && a[2] != null && a[2] != undefined){
			ckLoginInfo.name = a[1]; 
			//ȡ���룬�ӵڶ���|��ʼ
			var pos = v.indexOf('|',2);
			ckLoginInfo.pass = v.substring(pos+1);
		}
	}
}

//����cookie��¼����(which=0)���û���(which=1)������(which=2)
function setLoginCookie(which, value){
	getLoginCookie();
	if(which==0)
		ckLoginInfo.type = value;
	else if(which==1)
		ckLoginInfo.name = value;
	else if(which==2)
		ckLoginInfo.pass = value;
		
	Cookie.clear(ckLoginInfoKey, ckPath);
	//cookie value����ascii���봫�䣬����url encoding,����������Ҫdecode
	Cookie.set(ckLoginInfoKey, ckLoginInfo.type + "|" + ckLoginInfo.name + "|" + ckLoginInfo.pass, 30, ckPath, ckDomain);			
}

//���ckLoginInfoKey��cookie��ͬʱҲ���ckLoginInfo��name��pass��������type
function clearLoginCookie(){
	ckLoginInfo.name = null;
	ckLoginInfo.pass = null;
	Cookie.clear(ckLoginInfoKey, ckPath);
	if(ckLoginInfo.type != null && ckLoginInfo.type != undefined && ckLoginInfo.type != "null")
		Cookie.set(ckLoginInfoKey, ckLoginInfo.type, 30, ckPath, ckDomain);			
}

var Cookie = {
	set : function(name, value, expirationInDays, path, domain) {
		var cookie = escape(name) + "=" + escape(value);
		if (expirationInDays) {
			var date = new Date();
			date.setDate(date.getDate() + expirationInDays);
			cookie += "; expires=" + date.toGMTString();
		} 

		if (path) {
			cookie += ";path=" + path;
		}
		if (domain) {
			cookie += ";domain=" + domain;
		}
		
		document.cookie = cookie;

		if (value && (expirationInDays == undefined || expirationInDays > 0) && !this.get(name)) {
			return false;
		}
	},

	clear : function(name, path) {
		this.set(name, "", -1, path, ckDomain);
	},
	
	get : function(name) {
		var pattern = "(^|;)\\s*" + escape(name) + "=([^;]+)";
		var m = document.cookie.match(pattern);
		if (m && m[2]) {			
			return unescape(m[2]);
		}else{ 
			return null;
		}
	}
}   

//���ٵ�¼
var quicklogin_jst = 
'<div>'+
'   <form name="frmLogin"  id="frmLogin"  method="post">'+
'						<div class="g_tab_btn03">'+
'						  <div class="g_f_hov"  id="tab_0">����ͨ��֤</div>'+
'							<div class="g_f_hov" id="tab_2">126����</div>'+
'							<div class="g_f_hov" id="tab_1">POPO</div>'+
'							<div class="g_f_hov" id="tab_3">188����</div>'+
'							<div class="g_f_hov" id="tab_4">VIP����</div>'+
'						</div>'+
'						<!-- ͨ��֤ -->'+
'						<div class="case">'+
'						  <div class="g_h_25"><label for="text0">�û�����</label><input class="g_w_60 g_h_ipt" type="text" name="in_username" id="in_username"/>&nbsp;<span id="account_suffix">@163.com</span></div>'+
'							<div class="g_h_25"><label for="text1">�ܡ��룺</label><input class="g_w_60 g_h_ipt" type="password" name="in_password" id="in_password"/></div>'+
'							<div class="mgntxt clr02" id="notice_bar" style="display-left:0px;"></div>'+
'							<div class="mgntxt"><input name="setCookieCheck" id="setCookieCheck" type="checkbox" value="" /><label for="ck0">�Զ���¼</label></div>'+
'							<div class="g_h_30 mgn">'+
'							  <div class="btn g_f_hov" id="qLoginButt">&nbsp;</div>&nbsp;&nbsp;'+
'								<span class="a_a d_d" id="reg_add"  href="http://reg.163.com/Service.jsp?url=http://blog.163.com/ntesRegBlank.html" target="_blank">ע��ͨ��֤ --&gt;</span>'+
'							</div>'+
'						</div>'+
'						<div class="g_h_30 g_c_vmgin">'+
'						  <span id="getPass_add" class="a_a d_d" href="http://reg.163.com/RecoverPasswd1.shtml" target="_blank">��������?</span>'+
'							<span class="g_c_mvlft">�ͷ����䣺</span>'+
'						  <span class="a_a d_d" href="mailto:kfblog@188.com" target="_blank">kfblog@188.com</span>'+
'						</div>'+
'   </form>'+
'</div>';

//��ҳ��¼  
var indexlogin_jst = 
	          '<div id="innerLoginDiv" class="lInnerLoginDiv">'+
	            '<form name="frmLogin" id="frmLogin"  method="post" style="margin:0px;padding:0px;">'+
	            '<table style="width:100%;" id="Table1">'+
	              '<tr>'+
	                '<td colspan=2 style="padding:4px 5px 6px 0px;"><div style="padding-left:23px;">'+
	                	'<a  id="tab_a_0" href="#"><span id="tab_0" style="color:#bebebe;">����ͨ��֤</span></a>'+
	                	'<span style="margin-left:20px;"></span><a id="tab_a_2" href="#"><span id="tab_2" style="color:#999;">126����</span></a>'+
	                	'<span style="margin-left:28px;"></span><a id="tab_a_1" href="#"><span id="tab_1" style="color:#999;">POPO</span></a>'+
	                	'<span style="margin-left:25px;"></span><a id="tab_a_3" href="#"><span id="tab_3" style="color:#999;">188����</span></a>'+
	                	'<span style="margin-left:18px;"></span><a id="tab_a_4" href="#"><span id="tab_4" style="color:#bebebe;">VIP����</span></a>'+               
					'</div></td>'+
	              '</tr>'+	            
	              '<tr>'+
	                '<td class="lNamePwdTd">�û���:</td>'+
	                '<td style="padding:0px;"><ul>'+
	                    '<li>'+
	                      '<input name="in_username" id="in_username" class="lpInputLogin" />'+
	                    '</li>'+
	                    '<li style="padding:5px 0px 0px 5px;"><span id="account_suffix">@163.com</span></li>'+
	                  '</ul></td>'+
	              '</tr>'+
	              '<tr>'+
	                '<td class="lNamePwdTd">��&nbsp;&nbsp;&nbsp;��:</td>'+
	                '<td style="padding:0px;"><input name="in_password" id="in_password" type="password" class="lpInputLogin" /></td>'+
	              '</tr>'+
	              '<tr>'+
	                '<td colspan=2 style="padding:2px 5px 2px 5px;">'+
	                	'<div id="notice_bar" class="lNotice_bar"></div></td>'+
	              '</tr>'+
	              '<tr>'+
	                '<td colspan=2 id="savePwdTd" class="lSavePwdTd"><input type="checkbox" id="setCookieCheck" NAME="setCookieCheck" class="lSetCookieCheck" />'+
	                 '<label for="setCookieCheck">�Զ���¼</label></td>'+
	              '</tr>'+
	              '<tr>'+
	                '<td colspan=2 id="logAndReg" style="padding:6px 0px 0px 77px;"><div style="float:left;"><a href="#" id="qLoginButt"><img id="btn_login" src="http://st.blog.163.com/style/common/index/btn_login.gif" /></a></div>'+
	                '	<div style="float:left;padding:10px 0px 0px 18px;width:100px;"><a id="reg_add" href="http://reg.163.com/Service.jsp?url=http://blog.163.com/ntesRegBlank.html"  target="_blank">ע��ͨ��֤ -></a></div></td>'+
	              '</tr>'+
	              '<tr>'+
	                '<td height="6px" colspan=2></td>'+
	              '</tr>'+
	              '<tr>'+
	                '<td colspan=2 id="regLinkTd"><a id="getPass_add" href="http://reg.163.com/RecoverPasswd1.shtml" target="_blank">����������?</a>'+
	                	'<span style="margin-left:15px; color:#555;">�ͷ����䣺</span><a href="mailto:kfblog@188.com">kfblog@188.com</a></td>'+
	              '</tr>'+
	            '</table>'+
	            '<input type=submit id="submitIndexLoginBtn" value="�ύ" style="display:none;">'+
	            '</form>'+
	          '</div>';
	          
function IndexBean() { }
IndexBean.getShow = function(p0, p1, callback) {  DWREngine._execute('/dwr', 'IndexBean', 'getShow', p0, p1, callback);}
IndexBean.getUpdater = function(p0, callback) {  DWREngine._execute('/dwr', 'IndexBean', 'getUpdater', p0, callback);}

function UserBean() { }
UserBean.clearSession = function(callback){    DWREngine._execute('/dwr', 'UserBean', 'clearSession', false, callback);}
UserBean.check = function(callback){    DWREngine._execute('/dwr', 'UserBean', 'check', false, callback);}
  	          

/** predefined variables
movie_name	swf�ļ�������������·����.swf
target_div_id	Ŀ��div��id
majorv	���汾��
minorv	���汾��
rev	�޶���
*/

function getContent(params) {
	var movie_name = params["movie_name"];
	var movie_id = params["movie_id"];
	var majorv = params["majorv"].valueOf();
	var minorv = params["minorv"].valueOf();
	var rev = params["rev"].valueOf();
	
	// Version check for the Flash Player that has the ability to start Player Product Install (6.0r65)
	var hasProductInstall = DetectFlashVer(6, 0, 65);
	
	// Version check based upon the values defined in globals
	var hasRequestedVersion = DetectFlashVer(majorv, minorv, rev);
	
	// for debug
	//hasProductInstall = true;
	//hasRequestedVersion = false;
	
	var content = "";
	
	if(hasRequestedVersion) {
		content = "<embed wmode=\"transparent\" src=\"" + movie_name + "\" ";
		if(movie_id != undefined)
			content += "id=\"" + movie_id + "\" ";
		content += "quality=\"high\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" type=\"application/x-shockwave-flash\" width=\"100%\"></embed>";
	} else {
	
		content = "Flash�������汾̫�ͣ�����<br>" +
			"<a href=\"http://www.macromedia.com/go/getflashplayer\" target=_blank>��������adobe��ҳ����Flash������</a><br>";			
	
		if(hasProductInstall) {
			content += "����<br>" +
				"<a href=\"\" target=_blank>������ﳢ���Զ�����</a>";	
		}
	}
	return content;
}

function getParams(typeid) {
	var params = initParas[typeid][0];
	// for debug
	/* var paramtext = "";
	for(var key in params) {
		paramtext += key + " = " + params[key] + "\n";
	}
	alert(paramtext); */
	return params;
}

function writeDiv(typeid) {
	var params = getParams(typeid);
	$(params["target_div_id"]).innerHTML = getContent(params);
}

/**************************************************************
*				163 blog JS Common Control					  *
*                                                             *
* Written by:  zhujingbo                                      *
* Important: to use this script don't                         *
*            remove these comments                            *
* Version 1.0 (MSIE 6.0 above,Firefox1.0,Netscape.)           *
* Created Date: 2006-11-17									  *
* Copyright��1997-2006 NetEase.com Inc. All rights reserved.  *
**************************************************************/
/** 
 * @fileoverview 
 *  ����Selenium����ʱ�ԣ���ҳ����Ҫ����dom������Ϣ���ṩ�����Գ���ʹ��
 *  ���ļ��ṩͳһ�ĵ��ýӿ�������ҳ���϶�dom������Ϣ����䡣
 *
 * @author  zhujingbo (zhujingbo@corp.netease.com)
 * @version 1.0 
 * @requires 
 */
 
// ע�����ֿռ� 
//gNameSpace.register('NECtrl.SeleniumTester');

/**
 * SeleniumTester class
 * @class	�������ڰ���Selenium���Ե�dom������Ϣ���ơ�
 */
NECtrl.SeleniumTester = Class.create();
NECtrl.SeleniumTester.prototype	= {
	/**
	 * SeleniumTester�����캯��
	 * 
	 */
	initialize	:	function(){
		this._sPrefix = "suf";
		this._oHash = [];
	},
		
	/**
	 * ����һ����ֵ����Ӧ���
	 * ��ʽΪ<div>xxx</div>
	 * @param	{String}	sElement	Ԫ�����
	 * @param	{String}	sValue		Ԫ�ض�Ӧ��ֵ��Ϊ��ֵ
	 * @return	{Void}
	 */
	setSingle	:	function(sElement, sValue) {
		this._oHash[this._sPrefix + sElement] = sValue;
		$(this._sPrefix + sElement).innerHTML = sValue;
	}, 
	
	/**
	 * ����һ��һά�����͵�ֵ����Ӧ�б�
	 * ��ʽΪ<div>xxx,xxx,xxx</div>
	 * @param	{String}	sElement	Ԫ�����
	 * @param	{Array}		aValue		Ԫ�ض�Ӧ��ֵ��Ϊһά����
	 * @return	{Void}
	 */
	setArray	: 	function(sElement, aValue) {
		this._oHash[this._sPrefix + sElement] = aValue;
		if (aValue != "null")
			$(this._sPrefix + sElement).innerHTML = aValue.toString();
		else
			$(this._sPrefix + sElement).innerHTML = "null";
	},
	
	/**
	 * ����һ����ά�����͵�ֵ����Ӧ�б�
	 * ��ʽΪ<div>[xxx],[xxx,xxx,xxx],[]</div>
	 * @param	{String}	sElement	Ԫ�����
	 * @param	{Array}		aValue		Ԫ�ض�Ӧ��ֵ��Ϊ��ά����
	 * @param	{String}	sRelElem	��ظ�Ԫ�ص����
	 * @param	{String}	sRelValue	��ظ�Ԫ�ص�ֵ
	 * @return	{Void}
	 */
	set2DArray	:	function(sElement, aValue, sRelElem, sRelValue) {
		if (!this._oHash[this._sPrefix + sElement]) { 
			var _oElem = this._oHash[this._sPrefix + sElement] = [];
			var _oRelElem = this._oHash[this._sPrefix + sRelElem];
			for (var i = 0, l = this._oHash[this._sPrefix + sRelElem].length; i < l; i++) {
				_oElem[_oRelElem[i]] = [];
			}
		}
		this._oHash[this._sPrefix + sElement][sRelValue] = aValue;
		if (aValue != "null")
			$(this._sPrefix + sElement).innerHTML = this._get2DString(this._oHash[this._sPrefix + sElement]);
		else
			$(this._sPrefix + sElement).innerHTML = "null";
	},
	
	/**
	 * ��ȡ��ά������ַ��������ʽ���������õ�dom������ȥ
	 * @private
	 * @param	{Array}		oElement	��ά����
	 * @return	{String}
	 */
	_get2DString	:	function(oElement) {
		var s = "";
		var _oElem = $H(oElement);
		var _aElemValues = _oElem.values();
		for (var i = 0, l = _aElemValues.length; i < l; i++) {
			s += "[" + _aElemValues[i].toString() + "]";
		}
		return s;
	}

};

/**************************************************************
*				163 blog JS Util							  *
*                                                             *
* Written by:  wangchen                                       *
* Important: to use this script don't                         *
*            remove these comments                            *
* Version 1.0 (MSIE 6.0 above,Firefox1.0,Netscape.)           *
* Created Date: 2006-10-19									  *
* Copyright��1997-2006 NetEase.com Inc. All rights reserved.  *
**************************************************************/

/** 
 * @fileoverview 
 * �ṩJS�ļ������ֿռ����
 * ͨ��ע�����ֿռ� ������������ͺ������ĳ�ͻ
 * 
 * JS���ع��� 
 * ͨ�����ع���������JS�ļ���˳�� 
 * ��֤JS����ȷִ��
 * 
 * @author  wangchen (wangchen@corp.netease.com)
 * @version 1.0 
 */

/**
 * ȫ�����ֿռ�������
 * Ӧ�ñ�����window�ռ������κζ����gNameSpace�����ֳ�ͻ
 */ 
var gNameSpace	= {
	/**
	 * ע�����ֿռ� 
	 * ��ע�����ֿռ�� �ſ����ڸÿռ��¶������ͷ���
	 * @param	{string}	sNameSpace		���ֿռ�����
	 * 										���� NEUtil.Effect ��
	 * 										��֮��Ҫ��.���ż��
	 */
	register	:	function(sNameSpace){
		var	_aDomains =	sNameSpace.split('.');
		var	_oParent  = window;
		
		for (var i=0,l=_aDomains.length; i<l; i++){
			_oParent = (_oParent[_aDomains[i]] = _oParent[_aDomains[i]] || {});
		}
	}	
};

/**
 * ȫ��JS������
 * �������JS�ļ��� ����˳����غͷ�˳�����
 * 
 * ������ֻ����JS Code�ļ��� �����ڼ�����ɺ�
 * ͨ������ͳһ����ɽӿ� ����JS Codeִ�н׶�
 */
var	gCodeLoad	=	{
	
	/**
	 * ���ݲ�����ʼ���������JSCode
	 * ����ָ����˳����ػ���ͬʱ����
	 * ��˳����ص������Ҳ����������
	 * ����
	 * @param	{array}		aCode		ָ����Ҫ���ص�JS Code
	 * 									������ʽ���£�
	 * 									[['%{guid}', '%{src}], 
	 * 									 ['%{guid}', '%{src}], 
	 * 									 ['%{guid}', '%{src}]]
	 * 									����%{guid}��ʾÿһ��JS Code��Ӧ��GUID
	 * 									    %{src}��ʾÿһ��JS Code��·��
	 * 									��˳����ص������ �����߱�����aCode��������ȷ��
	 * 									���ض��� aCodeǰ����Code�����ȱ�����
	 * @param	{boolean}	bSeq		��ʾ�Ƿ���Ҫ˳�����
	 * 									true��ʾ��Ҫ˳�����
	 * 									1. ��˳����ص������,�ɼ�����ά��JS Code�ļ���˳��
	 * 									   ���������ܽ����ڷ�˳�����
	 * 									2. �ڷ�˳����������,��JS Code��֤��˳��ķ�������
	 * @param	{function}	fnOnLoad	��Code��������Ϻ���Ҫ���õĻص�����
	 */
	load	:	function(aCode, bSeq, fnOnLoad){
		// װ����ض���
		for (var i=0, l=aCode.length; i < l; i ++){
			this._aCodeSrc.push(aCode[i]);
		}
		
		this._bSequence		=	bSeq;
		this._fnOnLoad		=	fnOnLoad || function(){};
		this._oLoadParam	=	arguments[3] || {};
		
		if (bSeq){
			this._fnLoadOne();	// ˳�����
		} else {
			this._fnLoadAll();	// ȫ������
		}
		
		if (!this._oInterval)
			this._oInterval	= setInterval(this._fnCheck, 50);
	},
	
	/**
	 * ÿ��JS Code�ڼ������Ӧ�õ���
	 * �ú����������Լ��Ѿ���������
	 * @param	{string}	sGUID		Ϊÿ��JS Code�����GUID
	 */
	regLoaded	:	function(sGUID){
		// ����sGUID�Ƿ�������Ҫȷ�ϵ�
		for (var i=0, l=this._aCodeSrc.length; i<l; i++){
			if (this._aCodeSrc[i][0] == sGUID){
				this._aCodeLoad.push(sGUID);
				return;
			}
		}
	},
	
	/**
	 * �������м��������
	 * ����һ���Լ������е�JS Code
	 * ����JS Code��֤��˳��ķ�������
	 * @private
	 */
	_fnLoadAll	: 	function(){
		var	_oScript	=	null;
		
		for (var i=0, l=this._aCodeSrc.length; i<l; i++){
			_oScript	  = document.createElement('script');
			_oScript.type = 'text/javascript';
			_oScript.src  = this._aCodeSrc[i][1];
			document.body.appendChild(_oScript);
		}
		
	},
	
	/**
	 * ���ݼ��ض�ջ���μ���JS Code
	 * Ҳ��������������
	 * @private
	 */
	_fnLoadOne	:	function(){
		this._iCurLoad ++ ;
		
		var	_oScript  =	document.createElement('script');
		_oScript.type = 'text/javascript';
		_oScript.src  = this._aCodeSrc[this._iCurLoad][1];
		document.body.appendChild(_oScript);		
	},
	
	/**
	 * �����ص�״̬
	 * @private
	 */
	_fnCheck	:	function(){
		var	_oThis	=	gCodeLoad;
		
		if (!_oThis._bSequence){
			// ��˳�����
			if (_oThis._aCodeSrc.length != _oThis._aCodeLoad.length)
				return;
		} else {
			// ��ǰ�Լ��ص�Code����
			var	_iLoadedLen	=	_oThis._aCodeLoad.length;
			
			// �����û�м��� ������ȴ�����
			if (_oThis._aCodeSrc[_oThis._iCurLoad][0] != _oThis._aCodeLoad[_iLoadedLen-1]){
				return;
			}
			
			// ��ǰ�������Ѿ����
			// ����Ƿ��м�����
			if (_oThis._iCurLoad != _oThis._aCodeSrc.length - 1){
				// �������м�����һ��������
				_oThis._fnLoadOne();
				return;
			}
		}
		
		// ���ȫ����������������ڻص�����
		clearInterval(_oThis._oInterval);
		try{
			_oThis._fnOnLoad(_oThis._oLoadParam);
		} catch(e){
			if (/MSIE/.test(navigator.userAgent))
				alert(e.message);
			else if (navigator.userAgent.indexOf("Firefox") != -1){
				var	_sMessage	= e.fileName + '\nLine: ' + e.lineNumber + '\n' + e.message + '\n' + e.stack;
				alert(_sMessage);
			}
		}
	},
		/**
	 * JS Code�Ƿ���Ҫ˳�����
	 * true��ʾJS��Ҫ˳�����
	 * @type	{boolean}
	 * @private
	 */
	_bSequence	:	false,
	
	/**
	 * ��¼��ǰ���ڼ��ص�Code
	 * ��˳����
	 * @type	{number}
	 * @private
	 */
	_iCurLoad	:	-1,
	
	/**
	 * ��Code��������Ϻ�
	 * ��Ҫ���õĻص�����
	 * @type	{function}
	 * @private
	 */
	_fnOnLoad	:	function(){},
	
	/**
	 * _fnOnLoad����ʱ�Ĳ�������
	 * @type	{object}
	 * @private
	 */
	_oLoadParam	:	{},
	
	/**
	 * ��������鶨ʱ��
	 * @type	{object}
	 * @private
	 */
	_oInterval	:	null,
	
	/**
	 * ��¼�Ѿ���ɼ��ص�Code
	 * ÿ��Code�ļ�������һ��
	 * GUID���Ӧ
	 * @type	{array}
	 * @private
	 */
	_aCodeLoad	:	[],
	/**
	 * �洢��Ҫ���ص�JS Code��ַ
	 * @type	{array}
	 * @private
	 */
	_aCodeSrc	:	[]
};

/**************************************************************
*				163 blog JS Util							  *
*                                                             *
* Written by:  wangchen                                       *
* Important: to use this script don't                         *
*            remove these comments                            *
* Version 1.0 (MSIE 6.0 above,Firefox1.0,Netscape.)           *
* Created Date: 2006-11-21									  *
* Copyright��1997-2006 NetEase.com Inc. All rights reserved.  *
**************************************************************/

/** 
 * @fileoverview 
 * �ṩ���ػ��ı�����Ϣ
 * 
 * @author  wangchen (wangchen@corp.netease.com)
 * @version 1.0 
 * @requires NameSpace.js
 */
 
gNameSpace.register('Local');
gNameSpace.register('Local.Message');
 
/**
 * ���ػ��ı�����Ϣ����
 * 
 */
 
 
/**
 * blog�����ʾ��Ϣ�ı���
 */
Local.Message.Blog = [	
	"��������������а�����163.com���������ӣ��������ɹ���"			// #0

];


if (Friend==undefined){
	var Friend={};
}

var g_accept_div = null;

Friend.AcceptFriend = Class.create();
Friend.AcceptFriend.prototype = {
	initialize: function() {
		this.options = Object.extend({	
			parentId:"",
			groupIdInInviter:"",
			ele:{},
			groupLists:[],
			remindId:null,
			paramMap:null,
			getGroupsFunc:Prototype.emptyFunction,		
			afterSuccFunc:Prototype.emptyFunction,
			updateRemind:null
		}, arguments[0] || {});	
		this.showAcceptFriend();	
	}, 

	showAcceptFriend:function(){
		if(this.options.groupLists.length == 0){
			this.options.groupLists = this.options.getGroupsFunc();
		}
		if(g_accept_div == null){
			g_accept_div = document.createElement("div");
			g_accept_div.id = 'accept_group_select';
			g_accept_div.className = 'g_lay_com g_crd_7';			
			g_accept_div.style.zIndex = 20001;
		}		
		var result = this.jst_group_select.processUseCache({groupLists:this.options.groupLists, friendId:this.options.parentId, groupIdInInviter:this.options.groupIdInInviter});
		g_accept_div.style.display='none';
		g_accept_div.innerHTML = result;
		document.body.appendChild(g_accept_div);

		if(document.all){		
			if($('acceptA'))
				$('acceptA').attachEvent("onclick", this.acceptFriend.bind(this));
			if($('rejectA'))
				$('rejectA').attachEvent("onclick", this.closeAcceptFriend.bind(this, 0));
			if($('acceptcloseIcon'))
				$('acceptcloseIcon').attachEvent("onclick", this.closeAcceptFriend.bind(this, 0));													
		}else{		
			if($('acceptA'))
				$('acceptA').onclick = this.acceptFriend.bind(this);	
			if($('rejectA'))
				$('rejectA').onclick = this.closeAcceptFriend.bind(this, 0);
			if($('acceptcloseIcon'))
				$('acceptcloseIcon').onclick = this.closeAcceptFriend.bind(this, 0);
		}		
		
		var lfoffset = Position.cumulativeOffset(this.options.ele);
		g_accept_div.style.left=(lfoffset[0] - 210)+'px';
		g_accept_div.style.top=(lfoffset[1])+'px';
		if(g_accept_div.style.display == 'none')	
			g_accept_div.style.display = '';			
		else
			g_accept_div.style.display = 'none';
	},
	
	acceptFriend:function (){
		var button = $('acceptA');
		if(button)
			button.disabled = true;
		this.closeAcceptFriend();	
		var groupToBeadd_Accept = $('groupToBeadd_Accept');
		var groupId = groupToBeadd_Accept[groupToBeadd_Accept.selectedIndex].value;
		UserBean.acceptFriend(this.options.parentId, this.options.groupIdInInviter, groupId, 
			this.options.remindId,this.options.paramMap, {
			callback:function(returnData){
				 	this.closeAcceptFriend();
					if(button)
						button.disabled = false;
					this.logFunc(returnData);
					this.options.afterSuccFunc(returnData, this.options.parentId, groupId);
					if(this.options.updateRemind)
						this.options.updateRemind(returnData);
			}.bind(this),
		  errorHandler:function(ex) {
		 	this.closeAcceptFriend();
		  	if(ex=="ExceedFriendsLimit")
		  		dwrlog('��������������������','error');
		  	if(button)
				button.disabled = false;
		  }.bind(this)		
		});	
	},

	closeAcceptFriend:function (){		
		if(g_accept_div.style.display!="none")
			g_accept_div.style.display='none';
	},
	
	logFunc:function (basicInfo){
		if(basicInfo != null){
			dwrlog('��������ɹ����Ѽ�Ϊ��ĺ���', "ok");
		}
	},

	jst_group_select : new String(' \
	  <span class="close n_ n7" title="�ر�" id="acceptcloseIcon" >&nbsp;</span> \
		<div class="title">ѡ�����</div> \
		<div class="g_h_30"> \
		<select id="groupToBeadd_Accept" class="g_w_95"> \
			{for group in groupLists} \
			{if true == group.isDefault} \
			<option value="${group.id}" selected>${group.groupName|escape}</option> \
			{else} \
			<option value="${group.id}">${group.groupName|escape}</option> \
			{/if} \
			{/for} \
			</select>\
		</div> \
		<div class="g_t_center"> \
			<input type="button" class="btncm btnok" value="ȷ����" id="acceptA" /> \
			<span>&nbsp;&nbsp;</span> \
			<input type="button" class="btncm btncc" value="ȡ����" id="rejectA" /> \
		</div>')
		
}	




/**************************************************************
*				163 blog JS Util							  *
*                                                             *
* Written by:  zhujingbo                                      *
* Important: to use this script don't                         *
*            remove these comments                            *
* Version 1.0 (MSIE 6.0 above,Firefox1.0,Netscape.)           *
* Created Date: 2006-11-21									  *
* Copyright��1997-2006 NetEase.com Inc. All rights reserved.  *
**************************************************************/

/** 
 * @fileoverview 
 * �ṩ��������
 * 
 * @author  zhujingbo (zhujingbo@corp.netease.com)
 * @version 1.0 
 * @requires NameSpace.js
 */
 
gNameSpace.register('Const');
 
/**
 * Ȩ�޵ȼ�
 */
Const.Rank = {	
	Anonymous	:	-100,
	Guest		:	0,
	Friend		:	100,
	Owner		:	10000
};

/**
 * Ĭ������
 */
Const.Domain = "163.org";

if (NetEase==undefined){
	var NetEase={};
}

NetEase.StatusBar = Class.create();
NetEase.StatusBar.prototype = {
	initialize: function(msg){
		this.options = Object.extend({
			barId: "status_bar",
			fade: false,
			imgsrc: 'style/images/icon_confirm.gif',
			timeout: 5000
		}, arguments[1] || {});
		$(this.options.barId).style.display = 'block';
		$(this.options.barId).innerHTML = '<img src="'+this.options.imgsrc+'"/>&nbsp;' + msg;
		window.setTimeout(this._clean.bind(this), this.options.timeout);
	},
	
	_clean: function(){
		if (this.options.fade)
			Effect.Fade(this.options.barId);
		else {
			$(this.options.barId).innerHTML = '';
			$(this.options.barId).style.display = 'none';
		}
	}
}
/**
*/

if (NetEase==undefined){
	var NetEase={};
}

var g_shareDiv = null;

NetEase.ShareByEmail = Class.create();
NetEase.ShareByEmail.prototype = {
	initialize: function() {
		this.options = Object.extend({	
			aId:"",
			jsWindowManager:null,
			visitorName:"",
			type:"blog",
			content:"",
			url:"",
			title:"",
			left:100,
			top:100
		}, arguments[0] || {});	
		email_index=0;
		subZone=null;
		this._loadInfo();	
	}, 
	
	_loadInfo:function(){
		SubscriptionBean.getEmailLimit(this._load.bind(this));
	},
	
	_load: function(emailLimit) {
		this.email_index=0;	
		if(this.options.type=="photo"){
			this.options.left =  300;
			this.options.top =  600;	
		}else if(this.options.aId != ""){
			var aDiv = $(this.options.aId);
			if(aDiv != undefined){
				var lfoffset = Position.cumulativeOffset(aDiv);
				this.options.left =  (lfoffset[0] - 500);
				this.options.top =  (lfoffset[1] + 20);				
			}
		}
		if(this.options.jsWindowManager == null)
			this.options.jsWindowManager = new NetEase.JSWindowManager();
		if(this.options.jsWindowManager.existWindow('shareByEmailDiv')){
			this.subZone.windowHtml.style.top = this.options.top+'px';			
			this.subZone = this.options.jsWindowManager.getWindow('shareByEmailDiv');
		}
		else
			this.subZone = this.options.jsWindowManager.createWindow('shareByEmailDiv', 
					{top:this.options.top,
					height:'200',
					className:'g_win_8',
					title:'���������',
					onTop:true,
					systemBarClassName: 'titlebar'
					});		
				
		this.subZone.panel.innerHTML = this._share_jst.processUseCache({visitorName:this.options.visitorName,type:this.options.type,emailLimit:emailLimit});
		this.options.jsWindowManager.showWindow('shareByEmailDiv');
	
		if(this.options.visitorName != null && this.options.visitorName != ""){
			$('email_0_wrap').innerHTML = this._email_jst.processUseCache({index:this.email_index});
			this.email_index++;
		
			if(document.all){		
				if($('moreEamil'))
					$('moreEamil').attachEvent("onclick", this._moreEmail.bind(this));
				if($('deleteEmailBut_0'))
					$('deleteEmailBut_0').attachEvent("onclick", this._deleteEmail.bind(this, 0));					
				if($('cancleShareButn'))
					$('cancleShareButn').attachEvent("onclick", this._close.bind(this));	
				if($('shareButn'))
					$('shareButn').attachEvent("onclick", this._share.bind(this));								
			}else{		
				if($('moreEamil'))
					$('moreEamil').onclick = this._moreEmail.bind(this);	
				if($('deleteEmailBut_0'))
					$('deleteEmailBut_0').onclick = this._deleteEmail.bind(this, 0);
				if($('cancleShareButn'))
					$('cancleShareButn').onclick = this._close.bind(this);
				if($('shareButn'))
					$('shareButn').onclick = this._share.bind(this);
			}
		}


	},
	
	refreshNew:function(params){
		this.options = Object.extend(
		{
			aId:this.options.aId,
			jsWindowManager:this.options.jsWindowManager,
			visitorName:this.options.visitorName,			
			type:this.options.type,
			content:this.options.content,
			url:this.options.url,
			title:this.options.title,
			top:this.options.top
		},params||{}
		);
		email_index=0;
		this._loadInfo();	
	},
	
	_close:function(){
		this.options.jsWindowManager.hiddenWindow('shareByEmailDiv');
	},
	
	_moreEmail:function(){
		var emailDivWrap = document.createElement('div');
		emailDivWrap.id='email_'+this.email_index+'_wrap'
		emailDivWrap.innerHTML = this._email_jst.processUseCache({index:this.email_index});
		$('shareInfo').insertBefore(emailDivWrap, $('fakeDiv'));		
		if(document.all){		
			$('deleteEmailBut_'+this.email_index).attachEvent("onclick", this._deleteEmail.bind(this, this.email_index));					
		}else{		
			$('deleteEmailBut_'+this.email_index).onclick = this._deleteEmail.bind(this, this.email_index);
		}		
		this.email_index++;
		return false;
	},
	
	_deleteEmail:function(index){
		$('shareInfo').removeChild($('email_'+index+'_wrap'));
		return false;
	},
	
	_share:function(){
		var emailDivs = document.getElementsByName("emailClass");
		var emailAddrs = "";
		for(var i = 0; i < emailDivs.length; i++){
			var index = emailDivs[i].id.substr(6,7);
			var emailPre = $F('emailAddr_'+index);
			emailPre = Trim(emailPre);
			if(emailPre == null || emailPre == '')
				continue;
			var emailPostDiv = $('emailPostfix_'+index);
			var emailPost = emailPostDiv[emailPostDiv.selectedIndex].value;
			var email = Trim(emailPre)+Trim(emailPost);
			if(!checkMail(email)){
				new NetEase.StatusBar("�ʼ���ʽ"+email+"����ȷ", {
					barId:'shareErrorHint',imgsrc: 'http://st.blog.163.com/style/common/ico_alert.gif'});
				return;	
			}
			if(i == 0)
				emailAddrs = email;
			else
				emailAddrs += "," + email;
		}
		if(emailAddrs == ""){
			new NetEase.StatusBar("����������ʼ�", {
				barId:'shareErrorHint',imgsrc: 'http://st.blog.163.com/style/common/ico_alert.gif'});
			return;				
		}
		var msg = {};
		msg.type = this.options.type;
		if(this.options.type=='blog'){
			if(this.options.aId.substr(0,'permaShare'.length) == 'permaShare'){
				var blogId = this.options.aId.substr("permaShare_".length, this.options.aId.length);
				this.options.content = $('blogtext_'+blogId).innerHTML;		
			}else{
				var blogId = this.options.aId.substr("share".length, this.options.aId.length);
				var blogTmp = NEBlog.gPrevBlog;					
				if(blogTmp != null){
					var _oCachedBlogs = blogTmp._oBlogPager.getAllCachedData();
					var _oBlog = null;
					if (_oCachedBlogs != null) {
						for (var i = 0; i < _oCachedBlogs.length; i++) {
							if (_oCachedBlogs[i].id == blogId) {
								_oBlog = _oCachedBlogs[i];
								break;
							}
						}
					}					
					this.options.content = _oBlog.content;	
					this.options.title = _oBlog.title;					
				}			
			}				
		}
		msg.content = this.options.content;
		msg.url = this.options.url;
		msg.title = this.options.title;
		msg.emailTitle = $F('title');
		msg.contentHead = $F('content');
		SubscriptionBean.ShareByEmail(emailAddrs, msg, {
			callback:(function(returndata){
				this._shareCB(returndata, emailAddrs);
			}).bind(this),
			errorHandler:(function(ex) {
				if(ex.type == 'NoEmailException' ){
					new NetEase.StatusBar("����ÿ�췢���ʼ�����", {
						barId:'shareErrorHint',
						imgsrc: 'http://st.blog.163.com/style/common/ico_alert.gif'});
			}			
		}).bind(this)
		});
	},
	
	_shareCB:function(returndata, emailAddrs){
		if(returndata>=0){
			this.subZone.panel.innerHTML = this._share_succ_jst.processUseCache({title:this.options.title, emailAddrs:emailAddrs,emailLimit:returndata, type:this.options.type});			
			if(document.all){	
				if($('cancleShareButn'))
					$('cancleShareButn').attachEvent("onclick", this._close.bind(this));	
				if($('newShareButn'))
					$('newShareButn').attachEvent("onclick", this._load.bind(this, returndata));								
			}else{
				if($('cancleShareButn'))
					$('cancleShareButn').onclick = this._close.bind(this);
				if($('newShareButn'))
					$('newShareButn').onclick = this._load.bind(this, returndata);
			}
		}else{
			new NetEase.StatusBar("���ų���", {
				barId:'shareErrorHint',imgsrc: 'http://st.blog.163.com/style/common/ico_alert.gif'});
		}
	},
	
	divTemplate:null,
	_emailTemplate:null,
	_shareSuccTemplate:null,
	
	
	_share_jst : ' \
		{if visitorName == null || visitorName == ""} \
		<div style="padding:20px 0px 0px 41px">������<a onclick="showLoginDlg(\'blog.163.com\');return false;">��½</a>�����ٷ��͸�����</div> \
		{else} \
       <div class="content"> \
	       <div class="case" id="shareInfo" > \
				<div id="email_0_wrap"> \
				</div> \
				<div style="display:none" id="fakeDiv"></div> \
			</div> \
			<div id="moreEamilWrap" class="addbtn"><span class="clr02">����컹���Է�${emailLimit}���ʼ�</span><span id="moreEamil" class="a_a d_d"  >�������</span></div> \
			<div class="send"> \
		        <div class="g_t_left g_h_20"><label>�ʼ�����:</label>&nbsp;&nbsp; \
		          			<input id="title" class="g_w_80" size=52 maxLength=60 value="��ĺ���${visitorName}�Ƽ�����{if type=="blog"}��־{else}��Ƭ{/if}����"/> \
				</div> \
		        <div class="g_t_left g_c_vmgin"><label class="g_t_top">��������:</label>&nbsp;&nbsp; \
		          			<textarea id="content" class="g_h_105 g_w_80"  rows="5" cols="50" onpropertychange="textareaLimit(this, 1000)" \
		          			>�����������һ{if type=="blog"}ƪ��־{else}����Ƭ{/if}�������ʵģ���Ҳ�����ɡ�</textarea> \
		        </div> \
		        <div class="g_h_30 g_t_center"> \
		        	<div style="padding-left:41px" id="shareErrorHint"></div> \
			        <input type="button" class="btncm btnok" value="�ᡡ��" id="shareButn" />\
			        <span>&nbsp;&nbsp;</span> \
			        <input type="button" class="btncm btncc" value="ȡ����" id="cancleShareButn" /> \
	       		</div> \
	       	</div> \
		</div> \
		{/if} \
	',	
		
		_email_jst:	' \
			<div class="item"> \
			<input type="hidden" name="emailClass" id="email_${index}"> \
	          <label>��������:</label>&nbsp;&nbsp; \
      		  <input id="emailAddr_${index}" class="g_w_25 bd01"/> \
      		  &nbsp;&nbsp; \
  			<select id="emailPostfix_${index}" class="g_w_25"> \
  			<option value="@163.com">@163.com</option> \
  			<option value="@126.com">@126.com</option> \
  			<option value="@188.com">@188.com</option> \
  			<option value="@vip.163.com">@vip.163.com</option> \
  			</select> \
	         &nbsp;&nbsp; \
	          	<span class="a_a d_d"  id="deleteEmailBut_${index}">ɾ��</span> \
	        </div>',					
		
		_share_succ_jst:' \
	      <div id="shareInfo" class="succ"> \
			<p>{if type=="blog"}��־{else}��Ƭ{/if}"${title}"�ѳɹ����͸�:</p> \
			<p class="g_w_100 g_t_wrap">${emailAddrs}</p> \
	        <div class="g_h_30 g_t_center g_c_mvdn"> \
		        <input type="button" class="btncm btnok" value="������������" id="newShareButn" />\
		        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>\
		        <input type="button" class="btncm btncc" value="�ء���"id="cancleShareButn" /> \
	        </div> \
	      </div>'
}
	         	

 /**
  * �û������Լ��û��ٱ�����
  * @ignore
  */
var gFeedback = {}; 
gFeedback.sVersion = "1.2";

/*****************************Public Interface********************/
gFeedback.openPopcommentReport = fOpenPopcommentReport;	//�û����۵ĵ�������
/************************Public Interface Implement***************/

/**
 * �û������ĵ�������
 */
var advicePublishTypes={1:"����",2:"����",3:"����",4:"����"};
var adviceModuleTypes= {1:"��־",2:"����",3:"������",4:"��Ƭ",5:"����",6:"����",7:"����",
				        8:"�Զ���HTML",9:"����",10:"���ֲ�����",11:"���",12:"��ʽ",0:"����"}; 

var popAdviceContent =
'<!-- �û����� -->'+
' <table class="g_c_mvdn" border="0" cellspacing="0" cellpadding="0">'+
'					   <tr><td class="g_w_20 g_t_right">�ǡ����ƣ�</td><td><input class="g_w_90 g_h_ipt" type="text" name="advicePublisherNickName" id="advicePublisherNickName"/></td></tr>'+
'						 <tr><td class="g_w_20 g_t_right">�������</td><td><select class="g_w_40"  nohide="true" id="advicePublishType"></select>&nbsp;&nbsp;<label>�������</label><select class="g_w_40" nohide="true" id="adviceModuleType"></select></td></tr>'+
'						 <tr><td class="g_w_20 g_t_right g_t_top">�������ݣ�</td><td><textarea class="g_h_105 g_w_90"  id="advicePublishContent"></textarea></td></tr>'+
'						 <tr><td colspan="2" class="g_t_center">'+
'						   <input type="button" class="btncm btnok" value="�ᡡ��" id="submitPopAdviceBtn" onclick="submitPopAdvice();" />'+
'						   <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>'+
'						   <input type="button" class="btncm btncc" value="ȡ����" onclick="popAdviceWin.hiddenWindow();" />'+
'						 </td></tr>'+
'					 </table>';


var popAdviceWin=null;
function initPopAdvice(){
	var visitorNickname = spaceStaticData.visitorNickname;
	if (visitorNickname == "") visitorNickname="���ײ���";
	$("advicePublisherNickName").value = visitorNickname;
	$("advicePublishContent").value="";
	$("submitPopAdviceBtn").value="�� ��";
	var focusArray = ['advicePublisherNickName','advicePublishContent'];
	attachFocusEvent(focusArray, "input_textbox_bright");
    $("advicePublishContent").focus();
}
function openPopAdvice(){
	if (popAdviceWin !=null){
		popAdviceWin.showWindow();
		initPopAdvice();
		return;
	}
	if(jsWindowManager == null)
		jsWindowManager = new NetEase.JSWindowManager();
	popAdviceWin = jsWindowManager.createWindow("$_popAdviceWinId",{
					className:'g_win_7',width: 450, height:245, 
					notKeepPos:true,title:'�û�����', onTop:false
				});			
	popAdviceWin.panel.innerHTML = popAdviceContent;	
	popAdviceWin.showWindow();
	fillSelectMap("advicePublishType",advicePublishTypes);
	fillSelectMap("adviceModuleType",adviceModuleTypes);
	initPopAdvice();
}
function submitPopAdvice(){	
	 var advice={
     "publisherName":spaceStaticData.visitorName,
     "publisherNickName":Trim($("advicePublisherNickName").value),
     "publishContent":Trim($("advicePublishContent").value),
     "publishType":Trim($("advicePublishType").value),
     "moduleType":Trim($("adviceModuleType").value)
  	};
	if (advice["publishContent"].length == 0){
		alert("�������ݲ���Ϊ��");
		return ;
	}
	if (advice["publishContent"].length > 1000){
		alert("���ó���1000���ַ�");
		return;
	}  
	if (advice["publisherNickName"]=="")
	     publisherNickName="��������";
	if (advice["publisherNickName"].length>18){
	     alert("�ǳ�Ӧ�ò��ܶ���18���ַ�");
	     return;
	}  
	$("submitPopAdviceBtn").value ="�ύ��.....";
	AdviceBean.addAdvice(advice,postSubmitPopAdvice);
}
function postSubmitPopAdvice(advice){
   if (advice.id != -1){
      alert("�������ύ�����ǻᾡ�촦��лл��");  
      popAdviceWin.hiddenWindow();
   }
}
/**
 * �û��ٱ�ҳ��ĵ�������
 */
var reportTypeNames ={"-1":"��ѡ��",1:"Σ�����Ұ�ȫ/й¶���һ���",2:"Σ��������ȫ",3:"Ű����ͯ��ͼƬ������",4:"ɧ��/����",
                        5:"�ַ���Ȩ",6:"�������",7:"����"};
var innerTypeNames={"-1":"��ѡ��",0:"������־",1:"��־����",2:"��Ƭ",3:"��Ƭ����",4:"�б���Դ",5:"����Ȧ",6:"��ǩ",7:"���԰�"}
var popreportContent =
' <table class="g_c_mvdn g_w_95 g_p_center" border="0" cellspacing="0" cellpadding="0">'+
'					   <tr class="g_p_visible"><td class="g_w_25"></td><td class="g_w_75"></td></tr>'+
'						 <tr><td colspan="2"><p class="g_t_left">��л������ײ��͵Ĺ�ע��֧�֣��������������־����ᡢ�������з�����ɫ�顢�������������������ݣ�����д����ı����������ǡ����ǽ����촦�������ύ�����ݡ�</p></td></tr>'+
'					   <tr><td class="g_t_right">��������ַ��</td><td><input class="g_w_90 g_h_ipt" type="text" name="popReportEmail" id="popReportEmail"/></td></tr>'+
'						 <tr><td class="g_t_right">�ٱ�����ַ��</td><td><input class="g_w_90 g_h_ipt" type="text" name="popReportUrl" id="popReportUrl"/></td></tr>'+
'						 <tr><td class="g_t_right">������Ϣλ�ã�</td><td><select nohide="true" class="g_w_35" id="popReportInnerType"></select>&nbsp;&nbsp;<label>������Ϣ���ͣ�</label><select nohide="true" class="g_w_35" id="popReportType"></select></td></tr>'+
'						 <tr><td class="g_t_right g_t_top">�������ݣ�</td><td><textarea class="g_h_105 g_w_90" id="popReportDetail"></textarea></td></tr>'+
'						 <tr><td colspan="2" class="g_t_center">'+
'						   <input type="button" class="btncm btnok" value="�ᡡ��" id="submitPopreportBtn" onclick="submitPopreport();" />'+
'						   <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>'+
'						   <input type="button" class="btncm btncc" value="ȡ����" onclick="popReportWin.hiddenWindow();" />'+
'						   <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>'+
'						 </td></tr>'+
'					 </table>';



var popReportWin=null;
function initPopReport(){
	$("popReportUrl").value=window.location.href;
	$("popReportDetail").value="";
	$("popReportEmail").value="";
	$("submitPopreportBtn").value="��  ��";
	var focusArray = ['popReportEmail', 'popReportUrl', 'popReportDetail'];
	attachFocusEvent(focusArray, "input_textbox_bright");
	$("popReportDetail").focus();
}
function openPopreport(){
	if (popReportWin !=null){
		popReportWin.showWindow();
		initPopReport();
		return;
	}
	if(jsWindowManager == null)
		jsWindowManager = new NetEase.JSWindowManager();
	popReportWin = jsWindowManager.createWindow("$_popReportWinId",{
					className:'g_win_7',width: 450, height:320, 
					notKeepPos:true,title:'������Ϣ�ٱ�', onTop:false
				});			
	popReportWin.panel.innerHTML = popreportContent;	
	popReportWin.showWindow();
	fillSelectMap("popReportType",reportTypeNames);
	fillSelectMap("popReportInnerType",innerTypeNames);
	initPopReport();
}
function submitPopreport(){	
	var reportName = spaceStaticData.visitorName;
	if (reportName =="")
		reportName="����";
	var userReport = {
	      "reportName":reportName, 
	      "reportID":0, 
	      "reportNameEmail":Trim($("popReportEmail").value), 
	      "reportUrl":Trim($("popReportUrl").value), 
	      "reportType":Trim($("popReportType").value), 
	      "reportDetail":Trim($("popReportDetail").value),
	      "innerType":Trim($("popReportInnerType").value)
	  };	  
	var check=userReport["reportNameEmail"];
	if (userReport["innerType"] == "-1"){
		alert("��ѡ������Ϣλ�� ");
  		return false;
	}
	if (userReport["reportType"] == "-1"){
		alert("��ѡ������Ϣ���� ");
  		return false;
	}
  	if((check !="")&& !checkMail(check))
  	{
  		alert("��������ȷ�ĵ����ʼ���ʽ ");
  		return false;
  	}
    check=userReport["reportUrl"];
  	if(check==null||Trim(check)=="")
  	{
  		alert("������ٱ�����ַ");
  		return false;
  	}
  	check=userReport["reportDetail"];
  	if(Trim(check).length>1000)
  	{
  		alert("������������ݹ������������һǧ�����ڣ�лл ");
  		return false;
  	}
	$("submitPopreportBtn").value ="�ύ��.....";
	 PreUserReportBean.addUserReport(userReport,postSubmitPopreport); 
}
function postSubmitPopreport(report){
   if (report.id != -1){
      alert("�û��ٱ����ύ�����ǻᾡ�촦��лл��");  
      popReportWin.hiddenWindow();
   }
}

/**
 * �û����۾ٱ�ҳ��ĵ�������
 */
var commentReportTypeNames ={0:"��ѡ��",11:"ɫ��",12:"����",13:"���۹��",14:"��թ",
                        15:"Σ�����ڰ�ȫ",16:"Ƶ������",17:"����"};


var popcommentReportContent =
' <table class="g_c_mvdn g_w_95 g_p_center" border="0" cellspacing="0" cellpadding="0">'+
'					   <tr class="g_p_visible"><td class="g_w_25"></td><td class="g_w_75"></td></tr>'+
'						 <tr><td colspan="2">'+
'							 <p class="g_t_left g_c_vmgin">��л����뵽�����ʹ��԰����ά���������Ĳ��������У����ǽ�����ش������ύ�����ݡ�����������ǵĲ��������з�����ɫ�顢���������۹�桢��������Υ�����ݣ�����д����ı��������ǡ�</p>'+
'							 <p class="g_t_left g_c_vmgin">�ٴθ�л������ǹ�ͬ�����԰��ά����</p>'+
'						 </td></tr>'+
'						 <tr><td class="g_t_right">������Ϣ���ͣ�</td><td><select class="g_w_35" nohide="true" id="popCommentReportType"></select>&nbsp;&nbsp;<label>���鴦��ʽ��</label><select class="g_w_35" nohide="true" id="popCommentReportOpType"></select></td></tr>'+
'						 <tr><td class="g_t_right g_t_top">������Ϣ������</td><td><textarea class="g_h_105 g_w_90" id="popCommentReportDetail"></textarea></td></tr>'+
'						 <tr><td colspan="2" class="g_t_center">'+
'						   <input type="button" class="btncm btnok" value="�ᡡ��" id="submitPopcommentReportBtn" onclick="submitPopcommentReport(\'${innerIDStr}\');"/>'+
'						   <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>'+
'						   <input type="button" class="btncm btncc" value="ȡ����" onclick="popCommentReportWin.hiddenWindow();" />'+
'						 </td></tr>'+
'					 </table>';


var popCommentReportWin=null;
var commentReports={};
function initPopCommentReport(){
	$("popCommentReportDetail").value="";
	$("submitPopcommentReportBtn").value="��  ��";
	$("popCommentReportType").value= 0;
	$("popCommentReportOpType").value= 0;
}
function fOpenPopcommentReport(oReport){
	if (popCommentReportWin !=null){
		popCommentReportWin.showWindow();
		initPopCommentReport();
		fillpopCommentReportType(oReport);
		return;
	}
	if(jsWindowManager == null)
		jsWindowManager = new NetEase.JSWindowManager();
	commentReports[oReport.innerIDStr]=oReport;
	popCommentReportWin = jsWindowManager.createWindow("$_popCommentReportWinId",{
					className:'g_win_7',width: 450, height:300,
					notKeepPos:true,title:'&nbsp;&nbsp;������Ϣ����', onTop:false
				});			
	popCommentReportWin.panel.innerHTML = popcommentReportContent.replace("${innerIDStr}",oReport.innerIDStr);	
	popCommentReportWin.showWindow();
	fillpopCommentReportType(oReport);
	initPopCommentReport();
}
function fillpopCommentReportType(oReport){
	fillSelectMap("popCommentReportType",commentReportTypeNames);
	var popCommentReportOpType ={0:"��ѡ��","ɾ��":"ɾ��"};
	if ( oReport.publisherName != null && oReport.publisherName != "" ){
		popCommentReportOpType["������Ϣ�����߲���"] ="������Ϣ�����߲���";
	}
	fillSelectMap("popCommentReportOpType",popCommentReportOpType);
}
function submitPopcommentReport(innerIDStr){	
	if($("popCommentReportType").value==0){
		alert("��ѡ������Ϣ����");
		return 
	}	
	if($("popCommentReportOpType").value==0){
		alert("��ѡ���鴦��ʽ");
		return 
	}	
	var userCommentReport = commentReports[innerIDStr];
	userCommentReport["reportDetail"] = "���鴦��ʽ:" +Trim($("popCommentReportOpType").value)+"<br>"
	                             +"������Ϣ����:"+Trim($("popCommentReportDetail").value)+"<br>"+commentReports[innerIDStr]["reportDetail"];
	userCommentReport["reportType"] = Trim($("popCommentReportType").value);	
 	var check=$("popCommentReportDetail").value;
  	if(Trim(check).length>300)
  	{
  		alert("������������ݹ���������������������ڣ�лл ");
  		return false;
  	}
	$("submitPopcommentReportBtn").value ="�ύ��.....";
	 PreUserReportBean.addUserReport(userCommentReport,postSubmitPopcommentReport); 
}
function postSubmitPopcommentReport(commentReport){
   if (commentReport.id != -1){
      alert("�û��ٱ����ύ�����ǻᾡ�촦��лл��");  
      popCommentReportWin.hiddenWindow();
   }
}
/**
 * ���к���
 */
 //��ʼ��option list
function fillSelectMap(nodeString,obj) {
	var node = $(nodeString);
	clearSelectOptions(node);
	var hashMap = $H(obj);	
	var nodelen = node.length;
	hashMap.each(
		function(pair){
			node.options[nodelen++] = new Option(pair.value,pair.key);	
		}
	);
}
function clearSelectOptions(node){
    var len = node.options.length;
    for(var i=0; i<len; i++){
    	node.remove(0);
    }
}


function newPlaceEdit(hostId) {
	var hostId = hostId;
	if (g_urlPrefix==null || g_urlPrefix!="/photos"){
		new NetEase.PlaceEdit('spacename', hostId, saveSpaceNameFunc, {
			editStyle: 'g_w_20 bd01',savaButStyle:'g_c_smvdn g_c_button bd01 butn c05',cancelButStyle:'g_c_smvdn g_c_button bd01 butn c05',
			emptyText:'<p class="g_t_italic">���������Ӳ�������</p>', maxLength: 20, btnBelow: false});
		new NetEase.PlaceEdit('spacedesc', hostId, saveSpaceDescFunc, {
			editStyle: 'g_w_20 bd01',savaButStyle:'g_c_smvdn g_c_button bd01 butn c05',cancelButStyle:'g_c_smvdn g_c_button bd01 butn c05',
			emptyText:'<p class="g_t_italic">���������Ӳ�������</p>', maxLength: 40, btnBelow: false});
	}
	else if (g_urlPrefix=="/photos"){
		new NetEase.PlaceEdit('spacename', hostId, saveSpaceNameFunc, {
			editStyle: 'g_w_20 bd01',savaButStyle:'g_c_smvdn g_c_button bd01 butn c05',cancelButStyle:'g_c_smvdn g_c_button bd01 butn c05',
			emptyText:'<p class="g_t_italic">�����������������</p>', maxLength: 20, btnBelow: false});
		new NetEase.PlaceEdit('spacedesc', hostId, saveSpaceDescFunc, {
			editStyle: 'g_w_20 bd01',savaButStyle:'g_c_smvdn g_c_button bd01 butn c05',cancelButStyle:'g_c_smvdn g_c_button bd01 butn c05',
			emptyText:'<p class="g_t_italic">�����������������</p>', maxLength: 40, btnBelow: false});
	}
}

function saveSpaceNameFunc(resourceId, spaceName, callBackFunc){
	UserBean.updateSpaceName(resourceId, spaceName, {
		  callback:callBackFunc,
		  errorHandler:function(ex) {
		  	callBackFunc(false);
		  	filterWarning(ex, false);;		  	
		  }
	});
}

function saveSpaceDescFunc(resourceId, spaceDesc, callBackFunc){
	UserBean.updateSpaceDesc(resourceId, spaceDesc, {
		  callback:callBackFunc,
		  errorHandler:function(ex) {
		  	callBackFunc(false);
		  	filterWarning(ex, false);;		  	
		  }
	});
}


var visitorGroupListsForHost = null;
var inviteHost_Template;
var g_quickLoginCon;
var showImgDiv;

var $_dwrLogger;
function dwrlog(msg,type){
	try{
		if(!$_dwrLogger)
			$_dwrLogger = new NetEase.DwrLogger({relativeId:"pagehead"});
		$_dwrLogger.appendMsg(msg,type);
	}catch(ex){alert("�����˻����쳣!");}
}

function showInviteHost(visitorRank, visitorId, hostId, showDiv){
	if(visitorRank == -100 || visitorId == 0){
//		dwrlog("�����û�����ִ�д˲���", "error");
		return;
	}
	if(visitorId == hostId){
		dwrlog("��������Լ�", "error");
		return;
	}
	showImgDiv = showDiv;
	inviteHost_Template = createJSTAndParse("inviteHost_jst",inviteHost_jst);
	if(visitorGroupListsForHost == null)
		UserBean.getVisitorGroups(setVisitorGroupsForHost);
	else
		_showDiv();	
}

function inviteHost(){
	var button = $('addHostButton');
	button.disabled = true;
	var message = $('message').value;
	closeInviteHost();
	var groupToBeadd_Host = $('groupToBeadd_Host');
	var groupid = groupToBeadd_Host[groupToBeadd_Host.selectedIndex].value;
	UserBean.inviteHost(message, groupid,
	{
	  callback:function(returnData) {
	  	button.disabled = false;
	    afterInviteHost(returnData);
	  },
	  errorHandler:function(ex) {
	  	//�ؼ��ֹ�����ʾ
		button.disabled = false;
	  	var filterType = filterWarning(ex, false);
	  }
	});
}

function afterInviteHost(returnData){
	var message;
	var type;
	if(returnData >= 0){
		message = '�Ѿ���������';
		type = "ok";
	}else if(returnData <= -10){
		message="��Ӻ��ѳɹ�";
		type = "ok";
	}else switch(returnData){
		case -1:
			message="���ʧ��";
			type = "error";
			break;
		case -2:
			message="�Ѿ�����ĺ���";
			type = "error";
			break;
		case -3:
			message="��������Լ�";
			type = "error";
			break;
		case -4:
			message="�����û�����ִ�д˲���";
			type = "error";
			break;	
		case -5:
			message="�Է��ܾ��κ���Ӻ�������";
			type = "error";
			break;			
		default:
			message="���ʧ��";
			type = "error";
	}
	dwrlog(message, type);
}

function setVisitorGroupsForHost(returndata){
	if(returndata == null){
		dwrlog("�����û�����ִ�д˲���", "error");
		return;		
	}
	visitorGroupListsForHost = returndata;	
	_showDiv();
}

function _showDiv(){
//	Logger.debug("shwo invite host");
	var invite_div = $("invite_Host");
	if(invite_div.style.display != "none"){
		Effect.SlideUp('invite_Host',{duration:0.2});
		return;
	}
	var data = {visitorGroupLists:visitorGroupListsForHost};
	var result = inviteHost_Template.process(data);
	invite_div.innerHTML=result; 
	
	var img = "inviteHostImg";
	if(showImgDiv != undefined)
		img = showImgDiv;	
	var imgDiv = $(img);
	var lfoffset = Position.cumulativeOffset(imgDiv);
	var aheight = 10;
	if(showImgDiv != undefined) {
		invite_div.style.left =  (lfoffset[0]+75) + "px";
	}else{
		invite_div.style.left =  (lfoffset[0]-170) + "px";
	}
	invite_div.style.top =  (lfoffset[1] + aheight) + "px";

	Effect.SlideDown('invite_Host',{duration:0.2, userCallBack: function(){} });			
}

function closeInviteHost(){
	var change_group = $("invite_Host");
	if(change_group.style.display!="none")
		Effect.SlideUp('invite_Host',{duration:0.2});	
}

var jsWindowManager = new NetEase.JSWindowManager({simpleDrag:true,useDragOpacity:true});
function showLoginDlg(serverName, loginTarget){
	if(g_quickLoginCon == null){
		g_quickLoginCon = new NetEase.QuickLogin("qLoginDiv", serverName, false, {err:false, jsWindowManager:jsWindowManager, loginTarget:loginTarget});
    }
	g_quickLoginCon.showWindow();
}

var newEventReminder;

function getMailType(userName){
	var mailType = 0;
	if(userName){
		if(userName.match(/(.+)(@vip)$/i)){
			mailType = 5;
		}else if(userName.match(/(.+)(\.popo)$/i)){
			mailType = 4;
		}else if(userName.match(/(.+)(@188)$/i)){
			mailType = 3;
		}else if(userName.match(/(.+)(@126)$/i)){
			mailType = 2;
		}else{
			mailType = 1;
		}
	}
	return mailType;	
}

function loadEventRemind(lazyInit){
	newEventReminder = new NetEase.NewEventRemind({lazyInit:lazyInit,getEventRemindCountFunc:getEventRemindCountFunc,getRemindListByCategoryFunc:getEventRemindListUserByCategory,
		getRemindListFunc:getRemindListFunc,getMailListFunc:getMailListFunc,readRemindAllFunc:readRemindAllFunc,
		deleteRemindFunc:deleteRemindFunc,sendMsgFunc:sendMsgFunc,dwrAlert:dwrlog,jsWindowManager:jsWindowManager,mailType:getMailType(UD.hostName)});
}

function getEventRemindCountFunc(params,callback){
	RemindBean.getEventRemindCount(params.mailType,callback);
}

function getRemindListFunc(params,callback){
	RemindBean.getEventRemindListUser(params.offset,params.limit,callback);
}

function getEventRemindListUserByCategory(params,callback){
	RemindBean.getEventRemindListUserByCategory(params.category,params.offset,params.limit,callback);
}

function getMailListFunc(params,callback){
	RemindBean.getMailList(params.mailType,callback);
}

function readRemindAllFunc(params,callback){
	RemindBean.readEventRemindsAll(callback);
}

function deleteRemindFunc(params,callback){
	RemindBean.deleteEventRemindUser(params.id,false,callback);
}

function sendMsgFunc(params,callback){
	RemindBean.sendMsg(params.toId,params.msg,callback);
}

var cardSystem;
function initCardSystem(){
	if(cardSystem == null){
		var hostId = UD.hostId;
		var hostName = UD.hostName;
		var hostNickname = UD.hostNickname;
		if(hostNickname.trim()==""){
			hostNickname = hostName;
		}
		cardSystem = new NetEase.CardSystem(hostId,hostName,hostNickname,{dwrAlert:dwrlog,jsWindowManager:jsWindowManager,
			dialogId:'car_system_dialog',style: UD.style});
	}	
}

function showSendCardDialog(userId,userName,userNickName){
	initCardSystem();
	cardSystem.showSendCardDialog(userId,userName,userNickName);
}

function doEventRemind(obj){
	if(obj.type == 1){
		initCardSystem();
		cardSystem.showReceiveCardDialog(obj.srId,obj.isSys);
	}
}
	
var neToolBar;
var simplePageLayer = new NetEase.SimplePageLayer();
function showNetEaseToolBar(){
	neToolBar = new NetEase.ToolBar($('ne_toolbar_open'),$('ne_toolbar_open_menu'),{visitorName:UD.visitorName,hostName:UD.hostName,mailType:getMailType(UD.visitorName),simplePageLayer:simplePageLayer,jsWindowManager:jsWindowManager,objName:'neToolBar'});
	return false;
}

var neFocusMe;
function showNetEaseFocusMe(invitedRank,serverName){
	neFocusMe = new NetEase.FocusMe($('ne_focusme_open'),{invitedRank:invitedRank,serverName:serverName,simplePageLayer:simplePageLayer,jsWindowManager:jsWindowManager,objName:'neFocusMe'});	
}

var remindTopId = false;
function getRemindTop(id,content){
	var cookieValue = CookieUtils.get("neRemindTop");
	if(cookieValue == id) return;
	remindTopId = id;
	if($('remind_top_zone')){
		$('remind_top_zone').style.display='block';
		$('remind_top_content').innerHTML=content;
	}
}

function closeRemindTop(){
	if(remindTopId){
		CookieUtils.set("neRemindTop",remindTopId,30,"/",DomainMap.serverDomain);
	}
	if($('remind_top_zone')){
		$('remind_top_zone').style.display='none';
	}
}

var acceptRefresh;
showAcceptInMessage.groups = [];
function showAcceptInMessage(parentId, groupIdInInviter,ele, remindId, paramMap,callBack){
	var	groupListsTmp = [];
	if( window.friendsGroupCache && friendsGroupCache.length > 0){ //��ҳ
		groupListsTmp = friendsGroupCache.slice(0, friendsGroupCache.length - 1);
		var tmp = new Friend.AcceptFriend({parentId:parentId,groupIdInInviter:groupIdInInviter,
			groupLists:groupListsTmp,ele:ele, remindId:remindId, paramMap:paramMap, updateRemind:callBack});		
	}else if(showAcceptInMessage.groups && showAcceptInMessage.groups.length > 0){ //����ҳ�Ǻ���ҳ��
		groupListsTmp = showAcceptInMessage.groups;
		var tmp = new Friend.AcceptFriend({parentId:parentId,groupIdInInviter:groupIdInInviter,
			groupLists:groupListsTmp,ele:ele, remindId:remindId, paramMap:paramMap, updateRemind:callBack});			
	}else if(window.groupLists && groupLists.length > 0){ //����ҳ��
		groupListsTmp = groupLists;
		var tmp = new Friend.AcceptFriend({parentId:parentId,groupIdInInviter:groupIdInInviter,
			groupLists:groupListsTmp,ele:ele, afterSuccFunc:acceptRefresh, remindId:remindId, paramMap:paramMap, updateRemind:callBack});			
	}	
	else{ ////����ҳ�Ǻ���ҳ��,��һ��
		UserBean.getGroups((UD.status=='edit')?true:false,{callback:function(groups){
			showAcceptInMessage2(groups, parentId, groupIdInInviter, ele, remindId, paramMap,callBack);
		}});	
	}	
}

function showAcceptInMessage2(groups, parentId, groupIdInInviter, ele, remindId, paramMap){
	for(var i = 0 ; i < groups.length; i++){
		var tmp = {id:groups[i].id, groupName:groups[i].groupName, count:groups[i].count, cachePage:null};
		showAcceptInMessage.groups.push(tmp);
	}
	var tmp = new Friend.AcceptFriend({parentId:parentId,groupIdInInviter:groupIdInInviter,
		groupLists:showAcceptInMessage.groups,ele:ele,remindId:remindId, paramMap:paramMap, updateRemind:callBack});				
}

rejectInvite.onWho = -1;
function rejectInvite(parentId, remindId, paramMap, callBack){
	if(rejectInvite.onWho == parentId)
		return;
	rejectInvite.onWho = parentId;
	if(window.confirm("�Ƿ�ܾ�������?"))	
		UserBean.rejectInvite(parentId,remindId,paramMap, {
			callback:function(returnData){
				if(returnData){
					dwrlog('�Ѿܾ�����','ok');	
					if(callBack)
						callBack(returnData);				
				}
				if(window.rejectRefresh)	
					rejectRefresh(returnData, parentId);
			}
		});	
}


var inviteHost_jst=
'	<div style="width:160px">'+
' '+
'			<div style="text-align:left;padding:7px;30px"><b>���ԣ�</b>'+
'			</div>	'+
'			<div style="text-align:left;padding:7px;30px">'+
'				<textarea id="message" rows="3" cols="20" class="textbox" maxlength="50" onpropertychange="textareaLimit(this, 50)" ></textarea>'+
'			</div>'+
'					'+
'			<div style="text-align:left;padding:7px;30px">'+
'			<b>ѡ����飺</b>	'+
'			<select id="groupToBeadd_Host" style="width:125px">'+
'				{for group in visitorGroupLists}'+
'				{if true == group.isDefault}'+
'				<option value=${group.id} selected>${group.groupName}</option>'+
'				{else}'+
'				<option value=${group.id}>${group.groupName|escape}</option>'+
'				{/if}'+
'				{/for}'+
'				</select>'+
'			</div>		'+
'			<div style="text-align:left;padding:7px;30px"><input id="addHostButton" class="input_button" style="width:60px" type="button" value="ȷ��" onclick="inviteHost(); return false;">'+
'			<input class="input_button" type="button" style="width:60px" value="ȡ��" onclick="closeInviteHost();">	'+
'			</div>	'+
'	</div>';










