"use strict";

var helpers = require("./specHelper");

describe("Region", function () {
  var regionedImage, whiteRegion, blackRegion;

  beforeEach(function () {
    regionedImage = new RegionedImage("image.png");
    helpers.triggerLoad();

    whiteRegion = regionedImage.buildRegion({ x: 0, y: 0 });
    blackRegion = regionedImage.buildRegion({ x: 3, y: 5 });
  });

  it("has a 'size' property", function () {
    expect(whiteRegion.size).toEqual(13);
    expect(blackRegion.size).toEqual(11);
  });

  it("has an 'originalColor' property", function () {
    expect(whiteRegion.originalColor).toEqual("#FFFFFF");
    expect(blackRegion.originalColor).toEqual("#000000");
  });

  it("has a 'color' property", function () {
    expect(whiteRegion.color).toEqual("#FFFFFF");
    expect(blackRegion.color).toEqual("#000000");
  });

  it("has a 'boundaryColor' property", function () {
    expect(whiteRegion.boundaryColor).toEqual("#FFFFFF");
    expect(blackRegion.boundaryColor).toEqual("#000000");
  });

  describe("#contains", function () {
    it("returns true if the coordinates are inside the region", function () {
      expect(whiteRegion.contains({ x: 0, y: 0 })).toEqual(true);
      expect(whiteRegion.contains({ x: 1, y: 1 })).toEqual(true);
    });

    it("returns false if the coordinates are outside the region", function () {
      expect(whiteRegion.contains({ x: 3,  y: 5 })).toEqual(false);
      expect(whiteRegion.contains({ x: 4,  y: 6 })).toEqual(false);
      expect(whiteRegion.contains({ x: 0,  y: 9 })).toEqual(false);
      expect(whiteRegion.contains({ x: -1, y: 0 })).toEqual(false);
    });
  });

  describe("#merge", function () {
    beforeEach(function () {
      whiteRegion.merge(blackRegion);
    });

    it("combines the given region's cells with this region's", function () {
      expect(whiteRegion.size).toEqual(24);
    });

    it("removes the given region's cells", function () {
      expect(blackRegion.size).toEqual(0);
    });

    it("removes the merged region from the regioned image", function () {
      expect(regionedImage.regions.length).toEqual(1);
      expect(regionedImage.regions[0]).toEqual(whiteRegion);
    });
  });
});
