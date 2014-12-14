"use strict";

var helpers = require("./specHelper");

describe("RegionedImage", function () {
  var subject;

  beforeEach(function () {
    subject = new RegionedImage("image.png");
    helpers.triggerLoad();
  });

  it("has a 'width' property", function () {
    expect(subject.width).toEqual(4);
  });

  it("has a 'height' property", function () {
    expect(subject.height).toEqual(6);
  });

  it("has a 'regions' property", function () {
    expect(subject.regions.length).toEqual(0);
  });

  describe("initialization", function () {
    beforeEach(function () {
      var options = { width: 2, height: 3 };
      subject = new RegionedImage("image.png", options);
      helpers.triggerLoad();
    });

    it("supports specifying a width and height", function () {
      expect(subject.width).toEqual(2);
      expect(subject.height).toEqual(3);
    });
  });

  describe("#buildRegion", function () {
    it("adds an element to the image's regions", function () {
      expect(subject.regions.length).toEqual(0);
      subject.buildRegion({ x: 0, y: 0 });
      expect(subject.regions.length).toEqual(1);
    });

    it("returns the region", function () {
      var region = subject.buildRegion({ x: 0, y: 0 });
      expect(region.size).toBeDefined();
    });
  });

  describe("#regionAt", function () {
    it("returns the region that contains the given coordinates", function () {
      subject.buildRegion({ x: 0, y: 0 });
      subject.buildRegion({ x: 3, y: 5 });

      var whiteRegion = subject.regionAt({ x: 1, y: 1 });
      var blackRegion = subject.regionAt({ x: 1, y: 4 });

      expect(whiteRegion.color).toEqual("#FFFFFF");
      expect(blackRegion.color).toEqual("#000000");
    });

    it("returns 'undefined' if no regions contain the coordinates", function (){
      expect(subject.regionAt({ x: 0,  y: 0 })).toBeUndefined();
      expect(subject.regionAt({ x: -1, y: 0 })).toBeUndefined();
      expect(subject.regionAt({ x: 0,  y: 9 })).toBeUndefined();
    });
  });

  describe("#render", function () {
    it("renders the image to a canvas", function (){
      var canvas = helpers.mockCanvas;
      var context = canvas.getContext("2d");
      var imageData = context.getImageData();

      var whiteRegion = subject.buildRegion({ x: 0, y: 0 });
      var blackRegion = subject.buildRegion({ x: 3, y: 0 });

      whiteRegion.color         = "#111111";  // 17
      whiteRegion.boundaryColor = "#222222";  // 34
      blackRegion.color         = "#333333";  // 51
      blackRegion.boundaryColor = "#444444";  // 68

      subject.render(canvas);

      expect(imageData.data).toEqual([
        34,34,34,255,   34,34,34,255,      34,34,34,255,      68,68,68,255,
        34,34,34,255,   17,17,17,255,      34,34,34,255,      68,68,68,255,
        34,34,34,255,   17,17,17,255,      34,34,34,255,      68,68,68,255,
        34,34,34,255,   34,34,34,255,      68,68,68,255,      68,68,68,255,
        34,34,34,255,   68,68,68,255,      51,51,51,255,      68,68,68,255,
        34,34,34,255,   68,68,68,255,      68,68,68,255,      68,68,68,255
      ]);
    });
  });
});
