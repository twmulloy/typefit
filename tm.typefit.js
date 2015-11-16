"use strict";

var tm = window.tm || {};

tm.typefit = (function(module) {

  var els = [];

  var p = {
    die: function() {
      var length = els.length;
      while (length--) {
        unfit.call(els[length]);
      }
      window.removeEventListener('resize', resize);
    }
  };

  var global_defaults = {
    resize: true, // Update on window resize
    refresh: 0, // Refresh rate on resize
  }

  var defaults = {
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
    throttle(load, global_defaults.refresh);
  }

  function add() {
    if (!(this instanceof HTMLElement)) {
      return;
    }
    els.push(this);
  }

  function unfit() {
    this.style.padding = null;
    this.style.whiteSpace = null;
    this.style.display = null;
    this.style.fontSize = null;
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
    font.scale_w = box.w * font.ratio_w * this.tm.options.scale;

    this.style.fontSize = font.scale_w + 'px';

    if (this.tm.options.restore) {
      this.style.display = null;
    }
  }

  function goon() {
    var obj = {},
      i = 0,
      l = arguments.length,
      key;
    for (; i < l; i++) {
      for (key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          obj[key] = arguments[i][key];
        }
      }
    }
    return obj;
  }

  function bind(data) {
    this.tm = goon(this.tm, data);
  }

  function load(arg) {
    if (!arg) {
      var length = els.length;
      while (length--) {
        fit.call(els[length]);
      }
    } else {
      switch (typeof arg) {
        case 'object':
          global_defaults = goon(global_defaults, arg);
          break;
        case 'string':
          if (typeof p[arg] === 'function') {
            p[arg]();
          }
          break;
        default:
          break;
      }
    }
  }

  Object.prototype[module] = Object.prototype.tf = function(options) {
    if (this.length) {
      var length = this.length;
      while (length--) {
        bind.call(this[length], {
          "options": goon(defaults, options)
        });
        add.call(this[length]);
      }
    } else {
      bind.call(this, {
        "options": goon(defaults, options)
      });
      add.call(this);
    }
    load();
  }

  function construct(e) {
    if (global_defaults.resize) {
      window.addEventListener('resize', resize);
    }
    var element = document.querySelectorAll('[' + module + '], [tf]');
    if (element.length > 0) {
      element[module]();
    }
  }

  document.addEventListener('DOMContentLoaded', construct);

  return load;
})('typefit');