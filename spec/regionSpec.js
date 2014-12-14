"use strict";

var helpers = require("./specHelper");

describe("Region", function () {
  var whiteRegion;
  var blackRegion;

  beforeEach(function () {
    var regionedImage = new RegionedImage("image.png");
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
});
