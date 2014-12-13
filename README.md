## regionedImage.js

Coming soon...

Breaks an image into regions of contiguous pixels. You can set the colors
and boundaries of regioned images and render them to a canvas.

## Usage

```html
<canvas id="canvas"></canvas>

<script>
  var image = new RegionedImage("france.svg");
  image.onload = function () {

    // Print the dimensions of the image.
    console.log(image.width);  // 600
    console.log(image.height); // 400

    // Build the regions for the flag of france.
    image.buildRegion({ x: 100, y: 10 }); // Blue
    image.buildRegion({ x: 300, y: 10 }); // White
    image.buildRegion({ x: 500, y: 10 }); // Red

    // Get the blue region from the 'regions' property.
    var blueRegion = image.regions[0];

    // Print the number of pixels in the region.
    console.log(blueRegion.size); // 80000

    // Print the original color of the region.
    console.log(blueRegion.originalColor); // #0055A4

    // Set the region's color to yellow.
    blueRegion.setColor("#FFFF00");

    // Print the current color of the region.
    console.log(blueRegion.currentColor); // #FFFF00

    // Set the region's boundary color to green.
    blueRegion.setBoundaryColor("#00FF00");

    // Print the current boundary color of the region.
    console.log(blueRegion.currentBoundaryColor); // #00FF00

    // Get the red region by specifying a pixel inside the region.
    var redRegion = image.regionAt({ x: 490, y: 20 });

    // Merge the red region into the blue region.
    blueRegion.merge(redRegion);

    // Print the number of pixels in the blue and red regions.
    console.log(blueRegion.size); // 160000
    console.log(redRegion.size);  // 0

    // Print the number of regions in the regioned image.
    console.log(image.regions.length); // 2

    // Render the image to the canvas.
    var canvas = document.getElementById("canvas");
    image.render(canvas);
  };
</script>
```

You can specify a different width and height for the image at initialization:

```javascript
var image = new RegionedImage("france.svg", {
  width: 300,
  height: 200
});
```

The aspect ratio of the image will be preserved. This means that the image may
be smaller than the width and height specified.
