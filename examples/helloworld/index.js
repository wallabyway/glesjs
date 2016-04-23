"use strict";

var gl = (typeof _gl === "undefined") ? twgl.getWebGLContext(document.getElementById("c")):_gl;
var programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);

var arrays = {
  position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
};
var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

var time = 0;
var mouse = {clientX:0,clientY:0};

addEventListener("mousemove",function(e){mouse=e})
gl.useProgram(programInfo.program);

function render() {
    requestAnimationFrame(render);
    time += 1;
    
    var w = gl.canvas.width;
    var h = gl.canvas.height;
    gl.viewport(0, 0, w, h);

    var uniforms = {
      time: time * 0.01,
      resolution: [w, h],
      mouse: [mouse.clientX, 200-mouse.clientY]
    };

    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
    twgl.setUniforms(programInfo, uniforms);
    twgl.drawBufferInfo(gl, gl.TRIANGLES, bufferInfo);

}
render();
