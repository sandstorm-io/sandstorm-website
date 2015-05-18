function updateHeading() {
  // The hash contains any of:
  //
  // - Nothing, in which case, we do nothing.
  //
  // - The literal string "demo", in which case we know the user came
  //   from the demo, but we don't know what app they were using.
  //
  // - The name of the app they were using, in which case we also know
  //   that they are coming from the demo.

  var hash = window.location.hash.replace("#", "");
  if (hash) {
    // If there is a hash at all, it means they came from the demo. So
    // there's no point linking the user to the demo.
    var span;
    var a;

    span = document.getElementById('js-replace-check-out');
    span.textContent = "Check out";

    span = document.getElementById('js-replace-website');
    span.textContent = "the project website";

    a = document.getElementById('js-replace-homepage-url');
    a.href = 'https://sandstorm.io/';

    if (hash != "demo") {
      // Then update the app name, too.
      span = document.getElementById("js-replace-appname");
      span.textContent = "the easiest way to run " + hash;
    }

  }
}

updateHeading();
