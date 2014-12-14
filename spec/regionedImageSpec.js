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
});
