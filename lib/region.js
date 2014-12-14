"use strict";

var _     = require("underscore");
var toHex = require("hex-rgb-converter").toHex;

module.exports = function (options) {
  var self = this;
  var cells;

  var initialize = function () {
    cells = options.cells;

    self.size          = cells.length;
    self.originalColor = setOriginalColor();
    self.color         = self.originalColor;
    self.boundaryColor = self.originalColor;
  };

  self.contains = function (coordinates) {
    var cell = [coordinates.x, coordinates.y];
    return _.some(cells, function (c) {
      return _.isEqual(c, cell);
    });
  };

  var setOriginalColor = function () {
    var rawImage      = options.rawImage;
    var x             = cells[0][0];
    var y             = cells[0][1];
    var color         = rawImage.get(x, y);
    var hex           = toHex(color.red, color.green, color.blue);

    return "#" + hex.toUpperCase();
  };

  initialize();
};
