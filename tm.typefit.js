var tm = window.tm || {};

tm.typefit = (function(module, p){

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

  function fit() {

    var cs, h, b;
    var text = {}, box = {}, font = {};

    cs = window.getComputedStyle(this);

    // strip
    this.style.padding = 0;

    // defaults
    this.style.textAlign = 'center';
    this.style.whiteSpace = 'nowrap';
    this.style.overflow = 'hidden';

    // text dimensions
    this.style.display = 'inline';
    h = this.getBoundingClientRect();
    text.w = h.right - h.left;

    // box dimensions
    this.style.display = 'block';
    b = this.getBoundingClientRect();
    box.w = b.right - b.left;
    
    // font-size adjustment
    font.size = parseFloat(cs.fontSize);
    font.ratio = font.size / text.w;
    font.scaled = box.w * font.ratio;
    this.style.fontSize = font.scaled + 'px';

    // console.log(this.tagName, 'text', text, 'box', box, 'font', font);
  }

  function load() {
    var elements = document.querySelectorAll('[' + module + '], [tf]');
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
})('typefit', {});