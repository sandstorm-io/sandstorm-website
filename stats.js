(function () {
  function getIdCookie() {
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

  function sandstormTrackView() {
    var id = getIdCookie();
    if (!id) {
      id = uidGenerator();
      setIdCookie(id);
    }

    sendData({
      uid: id,
      referrer: document.referrer,
      location: window.location + '',
    });
  }

  window.sandstormTrackView = sandstormTrackView;

  sandstormTrackView();
})();
