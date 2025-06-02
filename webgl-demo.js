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

    // define shader sources
    const vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
    const fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;

    // create shaders and program
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);

    // resize the canvas to match the display size
    if (resizeCanvasToDisplaySize(canvas)) {
        // Notify the shader program that the canvas size has changed
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }

    // clear the canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);

    // get the location of the attribute in the shader program
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    // create a buffer to hold the vertex positions
    const positionBuffer = gl.createBuffer();
    // bind the buffer to the ARRAY_BUFFER target
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // define the positions of the triangle vertices
    const positions = [
        -1, 0,
        0, -1,
        1, 1,
    ];
    // create a buffer and fill it with the positions
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    // bind the position buffer to the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    gl.vertexAttribPointer(
        positionAttributeLocation,
        // size:
        // 2 components per iteration
        2,
        // type:
        // the data is 32bit floats
        gl.FLOAT,
        // normalize:
        // don't normalize the data
        false,
        // stride:
        // 0 = move forward size * sizeof(type) each iteration to get the next position
        0,
        // offset:
        // start at the beginning of the buffer
        0
    );
    
    const primitiveType = gl.TRIANGLES;
    const offset = 0;
    const count = 3;
    gl.drawArrays(primitiveType, offset, count);
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