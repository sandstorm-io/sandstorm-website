{% if false %}
// (This is a block comment that won't actually get rendered into pages served.)
// N.B.: Be careful to avoid trailing commas in objects and lists for IE compatibility.
{% endif %}
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

function sendData(data) {
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

  xhr.open("POST", "https://api-5d23e9c497f90642a85ba1fb909fa9d8.oasis.sandstorm.io/pageEvent", true);

  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.setRequestHeader("Authorization", "Bearer hVU87Vp2UzNnRmMepiXpjKUk6n6MZc7YMgAJ6YrVe-6");

  xhr.send(JSON.stringify(data));
}

{% if false %}
// Experiment support.
// `experiments` is a list of experiment descriptors, each with the following shape:
{
  id: String,          // A short, CSS-class-safe unique identifier for this experiment.  We should
                       // never reuse an experiment id from a previously-used experiment.

  exp_range_start: Number, // Lower (inclusive) and upper (exclusive) bound of tracker IDs (which are
  exp_range_end: Number,   // unsigned 32-bit integers) that are placed into this experimental condition.

  hook: Function,      // (optional) A function which will be called with three arguments:
                       // - a String containing the viewer's unique ID
                       // - the Object from the experiments array that this hook is a member of.
                       // - a Boolean with value true if the current viewer should be considered
                       //   to be in the experimental group and false if the viewer is in the
                       //   baseline group.
}

// An example experiment descriptor is given below:
{
  id: "1",
  exp_range_start: 0,
  exp_range_end: 0x19999999,
  hook: function (userId, exp, inExperiment) {
    // Creates a stylesheet with a pair of classes that change the display: property,
    // allowing hiding of baseline content and showing of experimental content.
    addCssOverride(inExperiment, exp.id, "block");
  }
}
{% endif %}
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
  });
}
