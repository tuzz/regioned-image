// This file is used to generate bundle.js
// browserify examples/serialize/main.js > examples/serialize/bundle.js

var RegionedImage = require("../../lib/regionedImage");

var image = new RegionedImage("France.svg", {
  width: 400,
  height: 300
});

image.onload = function () {
  image.buildRegion({x: 200, y: 10 });
  image.regions[0].color = "#FFFF00";

  var canvas1 = document.getElementById("canvas1");
  image.render(canvas1);
};

var button = document.getElementById("button");
button.addEventListener("click", function () {
  var json = image.toJson();
  var clone = RegionedImage.fromJson(json);

  var canvas2 = document.getElementById("canvas2");
  clone.render(canvas2);
  alert(json);
});
