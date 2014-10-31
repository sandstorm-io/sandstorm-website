var toArray = Array.prototype.slice.call.bind(Array.prototype.slice);

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

  toArray(document.querySelectorAll("#team>section>h3")).forEach(function (elem) {
    elem.addEventListener("click", function (event) {
      event.preventDefault();
      toArray(elem.parentNode.parentNode.children).forEach(function (sibling) {
        sibling.removeAttribute("data-selected");
      });
      elem.parentNode.setAttribute("data-selected", "");
    }, false);
  });
}
