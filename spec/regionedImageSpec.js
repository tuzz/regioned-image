"use strict";

require("./specHelper");

describe("RegionedImage", function () {
  var subject;

  beforeEach(function () {
    subject = new RegionedImage("france.svg");
  });

  it("has some tests", function () {
    expect(subject.hello()).toEqual("Hello, world");
  });
});
