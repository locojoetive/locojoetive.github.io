main();

// start here

function main() {
    const canvas = document.querySelector("#gl-canvas");
    // initialize the WebGL context
    const gl = canvas.getContext("webgl");

    // check if WebGL is available
    if (!gl) {
        alert("WebGL isn't available");
        return;
    }

    // set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
}
