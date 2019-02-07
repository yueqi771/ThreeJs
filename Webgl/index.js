let canvas = document.getElementById('canvas'),
    webgl = canvas.getContext('webgl');

function createShader(webgl, sourceCode, type) {
    // 创建shader
    let shader = webgl.createShader(type);

    // 在shader上挂载代码
    webgl.shaderSource(shader, sourceCode);

    // 编译shader
    webgl.compileShader(shader);

    return shader;
}

// 初始化vertexBuffer, 并且将相关的数据传递到vertexBuffer中， 最终将数据传递到vertexShder中
function initVertexBuffers(webgl) {
    // 所有顶点的数据
    let vertices = new Float32Array([
        0, 0.5, -0.5, -0.5, 0.5, -0.5 
    ])

    let n = 3;

    // 创建bugger
    let vertexBuffer = webgl.createBuffer();

    // 将vertexbuffer绑定到webgl上
    webgl.bindBuffer(webgl.ARRAY_BUFFER, vertexBuffer);

    // write data into the buffer object
    webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

    // get attribute a_Position address in vertex shader
    let a_Position = webgl.getAttribLocation(webgl.program, 'a_Position');

    webgl.vertexAttribPointer(a_Position, 2, webgl.FLOAT, false, 0, 0);

    // enable a_Position variable
    webgl.enableVertexAttribArray(a_Position);

    return n;
}

// 绘制方法
webgl.clearColor(0, 0, 0, 1);

function draw() {
    // clear canvas and add background color;
    webgl.clear(webgl.COLOR_BUFFER_BIT);

    webgl.drawArrays(webgl.TRIANGLES, 0, n);
}

// 定义顶点着色器, 片源着色器
let vertexShader, fragmentShader;
// 着色器相关源代码
let VSHADER_SOURCE, FSHADER_SOURCE;

/** 
VSHADER_SOURCE = 
   `attribute vec4 a_Position;\n
    void main() {\n 
        gl_Position = a_Position'\n
    }\n
   `; 
FSHADER_SOURCE = `
    void main () {\n
        gl_FragCOlor = vec4(1.0, 0.0, 0.0, 1.0)\n
`
*/

 /* */
VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' + 
  'void main () {\n' + 
    'gl_Position = a_Position;\n' + 
  '}\n'

FSHADER_SOURCE =
  'void main () {\n' + 
    'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + 
  '}\n'


// define vertex shader
vertexShader = createShader(webgl, VSHADER_SOURCE, webgl.VERTEX_SHADER)
// define frament shader
fragmentShader = createShader(webgl, FSHADER_SOURCE, webgl.FRAGMENT_SHADER)

let program = webgl.createProgram();
// 链接着色器
webgl.attachShader(program, vertexShader);
webgl.attachShader(program, fragmentShader);


// 链接program至context， 可以同时存在多个项目
webgl.linkProgram(program);
webgl.useProgram(program);

webgl.program = program;

// js代码通过显往着色器中传递数据

// write the position of vs\ertices to a vertex shader
let n = initVertexBuffers(webgl);

draw();

