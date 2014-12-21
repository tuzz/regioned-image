"use strict";

var _         = require("underscore");
var toRGB     = require("hex-rgb-converter").toRGB;
var floodFill = require("n-dimensional-flood-fill");
var RawImage  = require("raw-image");
var Region    = require("./region");

var RegionedImage = function (path, options) {
  var self = this;

  var initialize = function () {
    if (path) {
      self.path    = path;
      self.rawImage = new RawImage(path, options);
      self.rawImage.onload = function () {
        self.width = self.rawImage.width;
        self.height = self.rawImage.height;

        self.onload();
      };
      self.regions = [];
      self.onload  = function () { };
    }
    else {
      self.path     = options.path;
      var rawImageJson = JSON.stringify(options.rawImage);
      self.rawImage = RawImage.fromJson(rawImageJson);
      self.regions  = _.map(options.regions, function (regionData) {
        var regionJson = JSON.stringify(regionData);
        return Region.fromJson(regionJson, self);
      });
      self.width    = options.width;
      self.height   = options.height;
    }
  };

  self.buildRegion = function (coordinates) {
    var seed = [coordinates.x, coordinates.y];

    var result = floodFill({
      getter: self.rawImage.get,
      seed: seed,
      equals: _.isEqual
    });

    var region = new Region({
      regionedImage: self,
      rawImage:      self.rawImage,
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
        self.rawImage.set(c[0], c[1], color);
      });

      _.each(region.boundaryCells, function (c) {
        self.rawImage.set(c[0], c[1], boundaryColor);
      });
    });

    self.rawImage.render(canvas);
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

  initialize();
};

RegionedImage.fromJson = function (json) {
  var data = JSON.parse(json);
  return new RegionedImage(undefined, data);
};

module.exports = RegionedImage;
