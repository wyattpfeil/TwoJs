var elem = document.getElementById('canvasarea');
var params = { width: window.innerWidth , height: window.innerHeight};
var two = new Two(params).appendTo(elem);

function createRectangle(Height, Width) {
    var rect = two.makeRectangle(window.innerWidth/2, window.innerHeight/2, window.innerWidth * Width, window.innerHeight * Height);
    return rect
}

var rect = createRectangle(0.5, 0.5)

rect.fill = 'rgb(0, 200, 255)';
rect.opacity = 0.75;
rect.noStroke();

two.update();
