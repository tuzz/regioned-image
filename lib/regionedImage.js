"use strict";

var _         = require("underscore");
var floodFill = require("n-dimensional-flood-fill");
var RawImage  = require("raw-image");
var Region    = require("./region");

module.exports = function (path) {
  var self = this;
  var rawImage = new RawImage(path);

  rawImage.onload = function () {
    self.width = rawImage.width;
    self.height = rawImage.height;
  };

  self.regions = [];

  self.buildRegion = function (coordinates) {
    var seed = [coordinates.x, coordinates.y];

    var result = floodFill({
      getter: rawImage.get,
      seed: seed,
      equals: _.isEqual
    });

    var region = new Region({
      regionedImage: self,
      rawImage: rawImage,
      cells: result.flooded
    });

    self.regions.push(region);
    return region;
  };

  self.regionAt = function (coordinates) {
    return _.detect(self.regions, function (region) {
      return region.contains(coordinates);
    });
  };
};
