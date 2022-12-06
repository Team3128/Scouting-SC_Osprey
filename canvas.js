//import field image and draw on canvas for starting position
var img = new Image(); 
img.src = 'img/field.png';
var canvas = document.getElementById('fieldCanvas');
var ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(img, 0, 0);
document.getElementById("fieldCanvas").addEventListener("click", ()=>{
    canvasClicked()
})

//canvas functions to get mouse position, translate to canvas position
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
      y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}
function canvasClicked(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    var pos = getMousePos(canvas, event);
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    console.log("canvas clicked, x: " + Math.round(pos.x) + ", y: " + Math.round(pos.y));
}