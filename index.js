var elem = document.getElementById('canvasarea');
var params = { width: window.innerWidth , height: window.innerHeight};
var two = new Two(params).appendTo(elem);


function watch(obj, prop, handler) {
    var currval = obj[prop];
    function callback() {
        if (obj[prop] != currval) {
            var temp = currval;
            currval = obj[prop];
            handler(temp, currval);
        }
    }
    return callback;
}

var Color3 = {
    new : function(r, g, b){
        return({r, g, b})
    }
}

function createRectangle(Height, Width) {
    var tworect = two.makeRectangle(window.innerWidth/2, window.innerHeight/2, window.innerWidth * Width, window.innerHeight * Height);
    var customrect = {
        Position : {
            x : tworect.translation.x,
            y : tworect.translation.y
        },
        fill : function(r, g, b){
            console.log("Filled!")
            tworect.fill = "rgba(" + r + "," +  g + "," +  b + ", 0.75)"
        },

        changeInnerColor : function(OldColor, NewColor){
            console.log("Inner Color Changed!")
            console.log(NewColor)
            //this.fill(NewColor[0], NewColor[1], NewColor[2])
            tworect.fill = "rgba(" + NewColor[0] + "," +  NewColor[1] + "," +  NewColor[2] + ", 0.75)"
        },

        innerColor : Color3.new(0, 255, 0),
        size : 0,
        resize : function(OldVal, NewVal){
            console.log("Resized to " + NewVal)
        }
    }
    setInterval(watch(customrect, "size", customrect.resize), 100);
    setInterval(watch(customrect, "innerColor", customrect.changeInnerColor), 100);
    return customrect
}

function moveRectangle(Rectangle, NewX, NewY) {
    Rectangle.translation.set(window.innerWidth * NewX, window.innerHeight * NewY)
}

var rect = createRectangle(0.5, 0.5)
console.log(rect.Position.x)
//moveRectangle(rect, 0.5, 0.6)

rect.innerColor = Color3.new(0,255,0)
rect.size = 10
//rect.opacity = 0.75;
//rect.noStroke();

two.update();
