"use strict";

var MockImage = function () {
  this.bar = function () {};
};

global.Image = MockImage;
global.RegionedImage = require("../lib/regionedImage");
