
(function () {
  
function getIdFromCookie() {
  var match = document.cookie.match(new RegExp("(^| )sandstormStatsId=([^;]+)"));
  if (match) return match[2];
}

function setIdCookie(val) {
  var d = new Date();
  d.setMonth(d.getMonth() + 120);
  document.cookie = "sandstormStatsId=" + val + ";expires=" + d + ";domain=.sandstorm.io;";
}

function uidGenerator() {
  if (window.crypto && window.crypto.getRandomValues) {
    var array = new Uint32Array(4);
    window.crypto.getRandomValues(array);
    return array[0] + "-" + array[1] + "-" + array[2] + "-" + array[3];
  } else {
    var genInt = function() {
      return Math.floor(Math.random() * 0x100000000);
    }
    return genInt() + "-" + genInt() + "-" + genInt() + "-" + genInt();
  }
}

function getId() {
  var id = getIdFromCookie();
  if (!id) {
    id = uidGenerator();
    setIdCookie(id);
  }
  return id;
}

function sendData(data, path) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        // do nothing
      } else {
        console.error("analytics send failed:", xhr.statusText, xhr.responseText);
      }
    }
  };

  xhr.open("POST", "https://api-5d23e9c497f90642a85ba1fb909fa9d8.oasis.sandstorm.io/" + path, true);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.setRequestHeader("Authorization", "Bearer hVU87Vp2UzNnRmMepiXpjKUk6n6MZc7YMgAJ6YrVe-6");

  xhr.send(JSON.stringify(data));
}


function isInExperiment(userId, exp) {
  var idBlocks = userId.split("-");
  var id = parseInt(idBlocks[0], 10);
  return exp.exp_range_start <= id && id < exp.exp_range_end;
}

function addCssOverride(inExperiment, id, activeDisplayValue) {
  var s = document.createElement('style');
  s.type = 'text/css';
  var r = "";
  if (inExperiment) {
    r = r + ".exp-" + id + "-baseline { display: none !important; }\n";
    r = r + ".exp-" + id + "-test { display: " + activeDisplayValue + " !important; }\n";
  }
  s.innerHTML = r;
  document.getElementsByTagName('head')[0].appendChild(s);
}

var experiments = [
  {
    id: "install-screencast-autoplay",
    exp_range_start: 0,
    exp_range_end: 0x7fffffff, // 50% of users
    hook: function (userId, exp, inExperiment) {
      // Creates a stylesheet with a pair of classes that change the display: property,
      // allowing hiding of baseline content and showing of experimental content.
      addCssOverride(inExperiment, exp.id, "block");
    }
  },
  {
    id: "donations-bar",
    exp_range_start: 0,  // disable
    exp_range_end: 0,
    hook: function (userId, exp, inExperiment) {
      addCssOverride(inExperiment, exp.id, "flex");
    }
  }
];

var experimentMembership = {};
var userId = getId();
for (var i=0; i<experiments.length; i++) {
  var exp = experiments[i];
  var a = isInExperiment(userId, exp);
  exp.inExperiment = a;
  experimentMembership[exp.id] = a;
}

function runExperimentHooks() {
  for (var i=0; i<experiments.length; i++) {
    var exp = experiments[i];
    if (exp.hook) {
      exp.hook(userId, exp, exp.inExperiment);
    }
  }
}

function trackView() {
  var id = getId();
  sendData({
    uid: id,
    referrer: document.referrer,
    location: window.location + '',
    experiments: experimentMembership
  }, "pageEvent");
}

function trackClick(elementId) {
  var id = getId();
  sendData({
    uid: id,
    elementId: elementId,
    location: window.location + '',
    experiments: experimentMembership
  }, "clickEvent");
}


  window.sandstormTrackView = trackView; // TODO: remove once feature key vendor uses window.sandstormTracker.trackView
  window.sandstormTracker = {
    trackView: trackView,
    trackClick: trackClick,
    experiments: experiments,
    getId: getId
  };

  trackView();
})();
