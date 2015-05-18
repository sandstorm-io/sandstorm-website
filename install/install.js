function updatePageTitle() {
  var hash = window.location.hash.replace("#", "");
  if (hash) {
    var span = document.getElementById("js-replace-appname");
    span.textContent = "the easiest way to run " + hash;
  }
}

updatePageTitle();
