import React, { useEffect } from 'react'
import io from 'socket.io-client'

let timeout,
  ctx,
  isDrawing = false

const socket = io.connect('http://localhost:5000')
// var root = { timeout }
var root = { timeout, socket }

const BoardFun = (props) => {
  const { color, size } = props

  socket.on('canvas-data', (data) => {
    let image = new Image()
    let canvas = document.querySelector('#board')
    let ctx = canvas.getContext('2d')
    image.onload = function () {
      ctx.drawImage(image, 0, 0)
    }
    image.src = data
  })

  useEffect(() => {
    drawOnCanvas()
  }, [color, size])

  function drawOnCanvas() {
    var canvas = document.querySelector('#board')
    ctx = canvas.getContext('2d')

    var sketch = document.querySelector('#sketch')
    var sketch_style = getComputedStyle(sketch)
    canvas.width = parseInt(sketch_style.getPropertyValue('width'))
    canvas.height = parseInt(sketch_style.getPropertyValue('height'))

    var mouse = { x: 0, y: 0 }
    var last_mouse = { x: 0, y: 0 }

    /* Mouse Capturing Work */
    canvas.addEventListener(
      'mousemove',
      function (e) {
        last_mouse.x = mouse.x
        last_mouse.y = mouse.y

        mouse.x = e.pageX - this.offsetLeft
        mouse.y = e.pageY - this.offsetTop
      },
      false,
    )

    /* Drawing on Paint App */
    ctx.lineWidth = props.size
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.strokeStyle = props.color

    canvas.addEventListener(
      'mousedown',
      function (e) {
        canvas.addEventListener('mousemove', onPaint, false)
      },
      false,
    )

    canvas.addEventListener(
      'mouseup',
      function () {
        canvas.removeEventListener('mousemove', onPaint, false)
      },
      false,
    )

    console.log(root)
    var onPaint = function () {
      ctx.beginPath()
      ctx.moveTo(last_mouse.x, last_mouse.y)
      ctx.lineTo(mouse.x, mouse.y)
      ctx.closePath()
      ctx.stroke()
      if (root.timeout != undefined) clearTimeout(root.timeout)
      root.timeout = setTimeout(function () {
        var base64ImageData = canvas.toDataURL('image/png')
        root.socket.emit('canvas-data', base64ImageData)
      }, 1000)
    }
  }

  return (
    <div className="sketch" id="sketch">
      <canvas className="board" id="board"></canvas>
    </div>
  )
}

export default BoardFun

// function() {
//     var canvas = document.querySelector('#paint');
//     var ctx = canvas.getContext('2d');

//     var sketch = document.querySelector('#sketch');
//     var sketch_style = getComputedStyle(sketch);
//     canvas.width = parseInt(sketch_style.getPropertyValue('width'));
//     canvas.height = parseInt(sketch_style.getPropertyValue('height'));

//     var mouse = {x: 0, y: 0};
//     var last_mouse = {x: 0, y: 0};

//     /* Mouse Capturing Work */
//     canvas.addEventListener('mousemove', function(e) {
//         last_mouse.x = mouse.x;
//         last_mouse.y = mouse.y;

//         mouse.x = e.pageX - this.offsetLeft;
//         mouse.y = e.pageY - this.offsetTop;
//     }, false);

//     /* Drawing on Paint App */
//     ctx.lineWidth = 5;
//     ctx.lineJoin = 'round';
//     ctx.lineCap = 'round';
//     ctx.strokeStyle = 'blue';

//     canvas.addEventListener('mousedown', function(e) {
//         canvas.addEventListener('mousemove', onPaint, false);
//     }, false);

//     canvas.addEventListener('mouseup', function() {
//         canvas.removeEventListener('mousemove', onPaint, false);
//     }, false);

//     var onPaint = function() {
//         ctx.beginPath();
//         ctx.moveTo(last_mouse.x, last_mouse.y);
//         ctx.lineTo(mouse.x, mouse.y);
//         ctx.closePath();
//         ctx.stroke();
//     };

// }
