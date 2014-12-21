// This file is used to generate bundle.js
// browserify examples/toggle/main.js > examples/toggle/bundle.js

var RegionedImage = require("../../lib/regionedImage");

var image = new RegionedImage("France.svg", {
  width: 400,
  height: 300
});

image.onload = function () {
  var canvas = document.getElementById("canvas");
  image.render(canvas);
};

var button = document.getElementById("button");
var blueRegion, redRegion, whiteRegion;
var clicks = 0;

button.addEventListener("click", function () {
  clicks += 1;

  if (clicks === 1) {
    blueRegion = image.buildRegion({ x: 50,  y: 10 });
    redRegion  = image.buildRegion({ x: 350, y: 10 });

    blueRegion.color         = "#FF9999";
    blueRegion.boundaryColor = "#FF0000";
    redRegion.color          = "#9999FF";
    redRegion.boundaryColor  = "#0000FF";
  }
  else if (clicks === 2) {
    whiteRegion = image.buildRegion({ x: 200, y: 10 });
  }

  if (clicks > 1) {
    whiteRegion.color = "#"+Math.floor(Math.random()*16777215).toString(16);
    whiteRegion.boundaryColor = "#000000";
  }

  image.render(canvas);
});
