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

    var cs, s, r, h;
    var text = {}, box = {}, font = {};

    cs = window.getComputedStyle(this);

    // defaults
    this.style.padding = 0;

    // text dimensions
    s = window.getSelection();
    r = document.createRange();
    this.style.display = 'inline';
    this.style.whiteSpace = 'nowrap';
    r.selectNodeContents(this);
    s.removeAllRanges();
    s.addRange(r);
    h = r.getBoundingClientRect();
    text.w = h.right - h.left;
    text.h = h.bottom - h.top;
    s.removeAllRanges();

    // box dimensions
    this.style.display = 'block';
    box.w = this.offsetWidth - 1;
    box.h = this.offsetHeight - 1;
    
    // font-size adjustment
    font.size = parseFloat(cs.fontSize);
    font.ratio = font.size / text.w;
    font.scaled = box.w * font.ratio;
    this.style.fontSize = font.scaled + 'px';

    // cleanup
    this.style.display = null;

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