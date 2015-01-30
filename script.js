function toArray(arr) {
  // On newer browsers this can also be defined as:
  //   var toArray = Array.prototype.slice.call.bind(Array.prototype.slice);

  return Array.prototype.slice.call(arr);
}

function closeSubsection(elem) {
  var details = elem.getElementsByTagName("details")[0];
  var div = details.getElementsByTagName("div")[0];
  if (details.getAttribute("open") !== null) {
    details.style.height = details.clientHeight - div.clientHeight + "px";
    details.setAttribute("open", "closing");
    div.style.height = "0px";
    setTimeout(function () {
      details.removeAttribute("open");
      div.removeAttribute("style");
    }, 200);
  }
}

function openSection(elem) {
  var section = elem.parentNode;
  if (!section.sandstormOriginalHeight) {
    section.sandstormOriginalHeight = section.clientHeight;
  }

  var details = elem.getElementsByTagName("details")[0];
  if (details.getAttribute("open") === null) {
    toArray(elem.parentNode.children).forEach(function (other) {
      if (other.tagName === "SECTION" && other !== elem) {
        closeSubsection(other);
      }
    });

    var div = details.getElementsByTagName("div")[0];
    var inner = div.children[0];

    details.setAttribute("open", "");
    div.style.display = "block";
    var height = inner.clientHeight;
    setTimeout(function () {
      div.style.height = height + "px";
      section.style.height = height + section.sandstormOriginalHeight + "px";
    }, 0);

    window.history.replaceState({}, document.title, "#" + elem.id);
  } else {
    closeSubsection(elem);
    window.history.replaceState({}, document.title, (document.location + "").split("#")[0]);
    section.removeAttribute("style");
  }
}

function closeUserTab(elem) {
  var details = elem.getElementsByTagName("details")[0];
  if (details.getAttribute("open") !== null) {
    details.removeAttribute("open");
  }
}

function openUserTab(elem) {
  var details = elem.getElementsByTagName("details")[0];
  if (details.getAttribute("open") === null) {
    toArray(elem.parentNode.children).forEach(function (other) {
      if (other.tagName === "SECTION" && other !== elem) {
        closeUserTab(other);
      }
    });

    details.setAttribute("open", "");
    window.history.replaceState({}, document.title, "#" + elem.id);
  }
}

var pressed_keys = new Array(10);
var konami_keys = [38,38,40,40,37,39,37,39,66,65];

function registerHandlers() {
  toArray(document.querySelectorAll("#principles>section")).forEach(function (elem) {
    elem.addEventListener("click", function (event) {
      event.preventDefault();
      openSection(elem);
    }, false);
  });

  toArray(document.querySelectorAll("#users>section")).forEach(function (elem) {
    elem.addEventListener("click", function (event) {
      event.preventDefault();
      openUserTab(elem);
    }, false);
  });

  toArray(document.querySelectorAll("section.tabs>section>details>div")).forEach(function (elem) {
    elem.addEventListener("click", function (event) {
      event.stopPropagation();
    }, false);
  });

  var hash = (document.location + "").split("#")[1];
  if (hash) {
    setTimeout(function () {
      var tab = document.getElementById(hash);
      if (tab.parentNode.id === "principles") {
        openSection(document.getElementById(hash));
      } else {
        openUserTab(document.getElementById(hash));
      }
    }, 100);
  }

  document.addEventListener("keydown", function(e) {
    pressed_keys.push(e.keyCode);
    pressed_keys.shift();
    if (pressed_keys.toString() == konami_keys.toString()) {
      var iframe = document.createElement("IFRAME");
      iframe.hidden = true;
      iframe.src = "https://www.youtube.com/embed/y6120QOlsfU?autoplay=1";
      document.body.appendChild(iframe);
    }
  });

  toArray(document.querySelectorAll("#team>section>h3")).forEach(function (elem) {
    elem.addEventListener("click", function (event) {
      event.preventDefault();
      toArray(elem.parentNode.parentNode.children).forEach(function (sibling) {
        sibling.removeAttribute("data-selected");
      });
      elem.parentNode.setAttribute("data-selected", "");
    }, false);
  });

  window.addEventListener("scroll", function (event) {
    var section = document.querySelector("#team-bg");

    var y = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

    var f = (y + window.innerHeight / 2 - team.offsetTop) / section.clientHeight;
    if (f < 0) f = 0;
    if (f > 1) f = 1;

    var bg = "#e89c9a url(images/team-bg.svg) repeat-x 0px -" + (f*11500) + "px / 10px 11500px";
    section.style.background = bg;
  }, false);
}
