/* global Image */
"use strict";

module.exports = function () {
  this.hello = function () {
    return "Hello, world";
  };
  var foo = new Image();
  foo.bar();
};
