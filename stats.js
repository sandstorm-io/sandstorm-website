---
# empty front matter to convince jekyll this file should be rendered like a template
# and receive inclusions and liquid blocks.
---
{% if false %}
// Intended for inclusion by sites that are not this one, like the SfW dashboard
// Hangs an object `sandstormTracker` off the window object, with hooks to:
//  - submit a pageview event
//  - expose the tracker ID
//  - see what experiments the viewer is opted into
{% endif %}
(function () {
  {% include stats-support.js %}

  window.sandstormTrackView = trackView; // TODO: remove once feature key vendor uses window.sandstormTracker.trackView
  window.sandstormTracker = {
    trackView: trackView,
    trackClick: trackClick,
    experiments: experiments,
    getId: getId
  };

  trackView();
})();
