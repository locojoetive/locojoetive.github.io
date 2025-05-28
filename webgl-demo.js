// start here
const positions = [
  -1, 0,
  0, -1,
  1, 1,
];

main();

function main() {
    const canvas = document.querySelector("#gl-canvas");
    // initialize the WebGL context
    const gl = canvas.getContext("webgl");

    // check if WebGL is available
    if (!gl) {
        alert("WebGL isn't available");
        return;
    }

    // resize the canvas to match the display size
    if (resizeCanvasToDisplaySize(canvas)) {
        // Notify the shader program that the canvas size has changed
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }

    const vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
    const fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;
     
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    // clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    
    // 2 components per iteration
    const size = 2;
    // the data is 32bit floats
    const type = gl.FLOAT;
    // don't normalize the data
    const normalize = false;
    // 0 = move forward size * sizeof(type) each iteration to get the next position
    const stride = 0;
    // start at the beginning of the buffer
    const offset = 0;
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
    
    const primitiveType = gl.TRIANGLES;
    const arraysOffset = 0;
    const count = 3;
    gl.drawArrays(primitiveType, arraysOffset, count);
}

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        console.log("Shader compiled successfully");
        return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }
    
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

function resizeCanvasToDisplaySize(canvas) {
    // Lookup the size the browser is displaying the canvas in CSS pixels.
    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    
    // Check if the canvas is not the same size.
    const needResize =
        canvas.width  !== displayWidth ||
        canvas.height !== displayHeight;
    
    if (needResize) {
        // Make the canvas the same size
        canvas.width  = displayWidth;
        canvas.height = displayHeight;
    }
    
    return needResize;
}