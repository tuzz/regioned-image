"use strict";

var MockImage = function () {
  this.width = 600;
  this.height = 400;
};

global.Image = MockImage;
global.RegionedImage = require("../lib/regionedImage");
