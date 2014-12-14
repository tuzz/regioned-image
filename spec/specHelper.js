"use strict";

var mockImageData = {
  // mock rgba data for a 4x6 image.
  data: [
    255,255,255,255,   255,255,255,255,   255,255,255,255,   0,0,0,255,
    255,255,255,255,   255,255,255,255,   255,255,255,255,   0,0,0,255,
    255,255,255,255,   255,255,255,255,   255,255,255,255,   0,0,0,255,
    255,255,255,255,   255,255,255,255,   0,0,0,255,         0,0,0,255,
    255,255,255,255,   0,0,0,255,         0,0,0,255,         0,0,0,255,
    255,255,255,255,   0,0,0,255,         0,0,0,255,         0,0,0,255
  ]
};

var mockContext = {
  scale: function () {},
  drawImage: function () {},
  getImageData: function () { return mockImageData; },
  putImageData: function () {}
};

var mockCanvas = {
  setAttribute: function () {},
  getContext: function () { return mockContext; }
};

var mockDocument = {
  createElement: function () { return mockCanvas; }
};

var mockImage;
var MockImage = function () {
  var self = this;

  self.width = 4;
  self.height = 6;

  mockImage = self;
};

global.document      = mockDocument;
global.Image         = MockImage;
global.RegionedImage = require("../lib/regionedImage");

module.exports.triggerLoad = function () {
  mockImage.onload();
};
