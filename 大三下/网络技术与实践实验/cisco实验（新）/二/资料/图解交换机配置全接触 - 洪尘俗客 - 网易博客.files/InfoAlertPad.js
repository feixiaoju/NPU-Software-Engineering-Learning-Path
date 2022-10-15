var __MESSAGE_STRING__ = '<img src="/style/common/indicator.gif"/>'
function useLoadingMessage(message) {
  var loadingMessage;
  if (message) loadingMessage = message;
  else loadingMessage = "正在加载中...";

  DWREngine.setPreHook(function() {
    var disabledZone = $('disabledZone');
    if (!disabledZone) {
      disabledZone = document.createElement('div');
      disabledZone.setAttribute('id', 'disabledZone');
      disabledZone.style.position = "absolute";
      disabledZone.style.zIndex = "1000";
      disabledZone.style.left = "0px";
      disabledZone.style.top = "0px";
      disabledZone.style.width = "100%";
      disabledZone.style.height = "100%";
      disabledZone.style.color = "#000000";
//      var lfOffset = Position.cumulativeOffset($("pagefoot"));
 //     disabledZone.style.height = lfOffset[1] + 'px'; 

      document.body.appendChild(disabledZone);
      var messageZone = document.createElement('div');
      messageZone.setAttribute('id', 'messageZone');
      messageZone.innerHTML=__MESSAGE_STRING__+loadingMessage;
      disabledZone.appendChild(messageZone);
    }
    else {
      $('messageZone').innerHTML = __MESSAGE_STRING__+loadingMessage;
      disabledZone.style.visibility = 'visible';
    }
  });

  DWREngine.setPostHook(function() {
    $('disabledZone').style.visibility = 'hidden';
  });
}

useLoadingMessage();
