/* global Image */
"use strict";

module.exports = function (path) {
  var image = new Image(path);

  this.width = image.width;
  this.height = image.height;

  this.regions = [];

  this.buildRegion = function () {
    this.regions.push({});
  };
};
