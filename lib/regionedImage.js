"use strict";

var _         = require("underscore");
var toRGB     = require("hex-rgb-converter").toRGB;
var floodFill = require("n-dimensional-flood-fill");
var RawImage  = require("raw-image");
var Region    = require("./region");

module.exports = function (path, options) {
  var self = this;
  var rawImage = new RawImage(path, options);

  rawImage.onload = function () {
    self.width = rawImage.width;
    self.height = rawImage.height;
    self.regions = [];
  };

  self.buildRegion = function (coordinates) {
    var seed = [coordinates.x, coordinates.y];

    var result = floodFill({
      getter: rawImage.get,
      seed: seed,
      equals: _.isEqual
    });

    var region = new Region({
      regionedImage: self,
      rawImage:      rawImage,
      cells:         result.flooded,
      boundaryCells: result.boundaries
    });

    self.regions.push(region);
    return region;
  };

  self.regionAt = function (coordinates) {
    return _.detect(self.regions, function (region) {
      return region.contains(coordinates);
    });
  };

  self.render = function (canvas) {
    _.each(self.regions, function (region) {
      var color = toColor(region.color);
      var boundaryColor = toColor(region.boundaryColor);

      _.each(region.cells, function (c) {
        rawImage.set(c[0], c[1], color);
      });

      _.each(region.boundaryCells, function (c) {
        rawImage.set(c[0], c[1], boundaryColor);
      });
    });

    rawImage.render(canvas);
  };

  var toColor = function (hex) {
    var rgb = toRGB(hex.slice(1, hex.length));

    return {
      red:   rgb[0],
      green: rgb[1],
      blue:  rgb[2],
      alpha: 255
    };
  };
};
