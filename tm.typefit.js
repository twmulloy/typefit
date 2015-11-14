"use strict";

var tm = window.tm || {};

tm.typefit = (function(module, p) {

  var els = [];

  var options = {
    resize: true, // Update on window resize
    refresh: 0, // Refresh rate on resize
    scale: 1.0, // Font size scaling, eg. 0.5 => 50% of element width
    restore: false // Restore the element display to original, eg. display: inline-block;
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

  function add() {
    if(!(this instanceof HTMLElement)){
      return;
    }
    els.push(this);
  }

  function fit() {



    var cs, h, b;
    var text = {},
      box = {},
      font = {};

    cs = window.getComputedStyle(this);

    // strip
    this.style.padding = 0;

    // defaults
    this.style.whiteSpace = 'nowrap';

    // options
    this.style.overflow = options.overflow;

    // text dimensions
    this.style.display = 'inline';
    h = this.getBoundingClientRect();
    text.w = h.width;
    text.h = h.height;

    // box dimensions
    this.style.display = 'block';
    b = this.getBoundingClientRect();
    box.w = b.width;

    // font-size adjustment
    font.size = parseFloat(cs.fontSize);
    font.ratio_w = font.size / text.w;
    font.scale_w = box.w * font.ratio_w * options.scale;

    this.style.fontSize = font.scale_w + 'px';

    if (options.restore) {
      this.style.display = null;
    }
  }

  function load() {
    var length = els.length;
    while (length--) {
      fit.call(els[length]);
    }
  }

  Object.prototype[module] = Object.prototype.tf = function() {
    if (this.length) {
      var length = this.length;
      while (length--) {
        add.call(this[length]);
      }
    } else {
      add.call(this);
    }
    load();
  }

  function construct(e) {
    document.querySelectorAll('[' + module + '], [tf]')[module]();
    if (options.resize) {
      window.addEventListener('resize', resize);
    }
  }

  document.addEventListener('DOMContentLoaded', construct);

  p = load;

  return p;
})('typefit', {});