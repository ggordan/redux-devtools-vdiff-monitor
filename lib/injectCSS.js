'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (cssString) {
  var style = document.createElement('style');
  var head = document.getElementsByTagName('head')[0];
  head.insertBefore(style, head.firstChild);
  style.appendChild(document.createTextNode(cssString));
};