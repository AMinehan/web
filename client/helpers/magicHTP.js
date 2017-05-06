var traffic = {};

traffic.send = function (type, url, func, text) {
  if (arguments.length <= 3) {
    text = null;
  }
  var request;
  var isBadBrowser = window.XDomainRequest ? true : false;

  if (isBadBrowser) {
    request = new window.XDomainRequest();
  } else {
    request = new XMLHttpRequest();
  }
  request.open(type, url, true);
  request.addEventListener('load', function(){
    func(request.responseText);
  });
  request.send(text)
}