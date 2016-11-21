var trackOutboundLink = function(url, urlSuffix) {
  var gaClickUrl = url;
  if (urlSuffix) {
    gaClickUrl = gaClickUrl + urlSuffix;
  }
  var followTheLink = function() { document.location = url; };
  var doGaPing = window.ga && ga.create;
  if (doGaPing) {
    ga("send", "event", "outbound", "click", gaClickUrl, {"hitCallback": followTheLink});
  } else {
    followTheLink();
  }
};
