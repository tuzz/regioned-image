"use strict";

var _         = require("underscore");
var toRGB     = require("hex-rgb-converter").toRGB;
var floodFill = require("n-dimensional-flood-fill");
var RawImage  = require("raw-image");
var Region    = require("./region");

var RegionedImage = function (path, options) {
  var self = this;

  self.path    = path;
  self.options = options;
  self.regions = [];
  self.onload  = function () { };

  var rawImage = new RawImage(path, options);

  rawImage.onload = function () {
    self.width = rawImage.width;
    self.height = rawImage.height;

    self.onload();
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

  self.toJson = function () {
    return JSON.stringify(self);
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

module.exports = RegionedImage;

module.exports.fromJson = function (json) {
  var data = JSON.parse(json);

  var regionedImage = new RegionedImage(data.path, data.options);
  regionedImage.regions = _.map(data.regions, function (regionData) {
    return Region.load(regionData, regionedImage);
  });

  return regionedImage;
};
