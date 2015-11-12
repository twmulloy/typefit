var tm = window.tm || {};

tm.fittext = (function(module){

  var options = {
    resize: true,
    refresh: 10,
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

  function fit() {
    var width;
    var text_width; 
    var style;
    var computed_style;
    var font_size;
    var ratio;
    var adjusted_font_size;
    style = JSON.parse(JSON.stringify(this.style));
    this.style.fontSize = null;
    computed_style = window.getComputedStyle(this);
    width = this.offsetWidth;
    this.style.display = 'inline';
    this.style.whiteSpace = 'nowrap';
    text_width = this.offsetWidth;
    this.style.display = style.display;
    this.style.whiteSpace = style.whiteSpace;
    font_size = parseInt(computed_style.fontSize, 10);
    ratio = font_size / text_width;
    adjusted_font_size = width * ratio * options.scale;
    this.style.fontSize = adjusted_font_size + 'px';
  }

  function load(e) {
    var elements = document.querySelectorAll('[' + module + ']');
    var length = elements.length;
    while(length--) {
      fit.call(elements[length]);  
    }

    if(options.resize){
      window.addEventListener('resize', resize);
    }
  }

  document.addEventListener('DOMContentLoaded', load);

  return {};
})('fittext');