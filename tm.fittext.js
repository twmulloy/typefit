var tm = window.tm || {};

tm.fittext = (function(module, p){

  var options = {
    resize: true,
    refresh: 200,
    scale: 1.0
  };

  var throttle = (function() {
    var timer = 0;
    return function(callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    }
  })();

  function resize(e) {
    throttle(load, options.refresh);
  }

  function adjust() {
    if(this.scrollWidth > this.offsetWidth){
      this.style.fontSize = (parseFloat(this.style.fontSize).toFixed(3) - 0.01) + 'px';
      adjust.call(this);
    }
  }

  function fit() {
    var width;
    var text_width; 
    var computed_style;
    var font_size;
    var ratio;
    var adjusted_font_size;

    this.style.fontSize = null;
    this.style.padding = 0;
    computed_style = window.getComputedStyle(this);
    width = this.offsetWidth;

    this.style.display = 'inline';
    this.style.whiteSpace = 'nowrap';
    this.style.overflow = 'hidden';
    this.style.textAlign = 'center';
    text_width = this.offsetWidth;

    this.style.display = 'block';
    font_size = parseFloat(computed_style.fontSize).toFixed(3);
    ratio = font_size / text_width;
    adjusted_font_size = (width * ratio * options.scale);
    this.style.fontSize = adjusted_font_size + 'px';

    adjust.call(this);
  }

  function load() {
    var elements = document.querySelectorAll('[' + module + ']');
    var length = elements.length;
    while(length--) {
      fit.call(elements[length]);
    }
  }

  function construct(e) {
    if(options.resize){
      window.addEventListener('resize', resize);
    }
    load.call();
  }

  document.addEventListener('DOMContentLoaded', construct);

  p = load;

  return p;
})('fittext', {});