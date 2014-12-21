// This file is used to generate bundle.js
// browserify examples/toggle/main.js > examples/toggle/bundle.js

var RegionedImage = require("../../lib/regionedImage");

var image = new RegionedImage("France.svg", {
  width: 600,
  height: 400
});

image.onload = function () {
  var canvas = document.getElementById("canvas");
  image.render(canvas);
};

image.ontouch = function (coordinates) {
  var region = image.regionAt(coordinates);
  if (!region) {
    region = image.buildRegion(coordinates);
  }

  region.color = "#"+Math.floor(Math.random()*16777215).toString(16);
  region.boundaryColor = "#000000";

  image.render(canvas);
};
