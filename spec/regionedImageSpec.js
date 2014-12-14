"use strict";

require("./specHelper");

describe("RegionedImage", function () {
  var subject;

  beforeEach(function () {
    subject = new RegionedImage("france.svg");
  });

  it("has a 'width' property", function () {
    expect(subject.width).toEqual(600);
  });

  it("has a 'height' property", function () {
    expect(subject.height).toEqual(400);
  });

  describe("#buildRegion", function () {
    it("adds an element to the image's regions", function () {
      expect(subject.regions.length).toEqual(0);
      subject.buildRegion({ x: 100, y: 10 });
      expect(subject.regions.length).toEqual(1);
    });
  });

  // TODO specs for region
});
