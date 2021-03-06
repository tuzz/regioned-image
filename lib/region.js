"use strict";

var _     = require("underscore");
var toHex = require("hex-rgb-converter").toHex;

var Region = function (options) {
  var self = this;

  var initialize = function () {
    self.cells         = options.cells;
    self.boundaryCells = options.boundaryCells;
    self.size          = self.cells.length;

    if (options.originalColor) {
      self.originalColor = options.originalColor;
      self.color         = options.color;
      self.boundaryColor = options.boundaryColor;
    }
    else {
      self.originalColor = setOriginalColor();
      self.color         = self.originalColor;
      self.boundaryColor = self.originalColor;
    }
  };

  self.contains = function (coordinates) {
    var cell = [coordinates.x, coordinates.y];
    return _.some(self.cells, function (c) {
      return _.isEqual(c, cell);
    });
  };

  self.merge = function (otherRegion) {
    self.cells         = self.cells.concat(otherRegion.cells);
    self.boundaryCells = self.boundaryCells.concat(otherRegion.boundaryCells);
    self.size          = self.cells.length;

    removeRegion(otherRegion);
  };

  var setOriginalColor = function () {
    var rawImage      = options.rawImage;
    var x             = self.cells[0][0];
    var y             = self.cells[0][1];
    var color         = rawImage.get(x, y);
    var hex           = toHex(color.red, color.green, color.blue);

    return "#" + hex.toUpperCase();
  };

  var removeRegion = function (region) {
    region.cells         = [];
    region.boundaryCells = [];
    region.size          = 0;

    var regionedImage = options.regionedImage;
    regionedImage.regions = _.reject(regionedImage.regions, function (r) {
      return _.isEqual(r, region);
    });
  };

  initialize();
};

Region.fromJson = function (json, regionedImage) {
  var data = JSON.parse(json);
  data.regionedImage = regionedImage;
  return new Region(data);
};

module.exports = Region;
