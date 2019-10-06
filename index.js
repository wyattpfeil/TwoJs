var elem = document.getElementById("canvasarea");
var params = { width: window.innerWidth, height: window.innerHeight };
var two = new Two(params).appendTo(elem);


var Color3 = {
  new: function(red, green, blue) {
    return { red: red, green: green, blue: blue };
  }
};

var Vector2 = {
  new: function(x, y) {
    return { x: x, y: y };
  }
};

var Rectangle = {
  new: function(Height, Width) {
    var tworect = two.makeRectangle(
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerWidth * Width,
      window.innerHeight * Height
    );
    var customrect = {
      set: function(obj, prop, value) {
        var lowerCasedProp = prop.toLowerCase();
        if (lowerCasedProp === "position") {
          var NewX = value.x;
          var NewY = value.y;
          tworect.translation.set(
            window.innerWidth * NewX,
            window.innerHeight * NewY
          );
        } else if (lowerCasedProp === "innercolor") {
          console.log("inner color changed to ");
          console.log(value);
          var NewColor = value;
          var r = NewColor.red;
          var g = NewColor.green;
          var b = NewColor.blue;
          console.log(r, g, b);
          tworect.fill = "rgba(" + r + "," + g + "," + b + ", 0.75)";
        }
        obj[lowerCasedProp] = value;
        two.update();
        return true;
      },
      get: function(obj, prop) {
        return prop in obj ? obj[prop] : null;
      }
    };

    var custrect = new Proxy({}, customrect);

    custrect.position = Vector2.new(0, 0);
    custrect.innerColor = Color3.new(255, 255, 255);

    return custrect;
  }
};

var rect = Rectangle.new(0.5, 0.5);
rect.position = Vector2.new(0.5, 0.5);
rect.innercolor = Color3.new(0, 0, 0);

var rect2 = Rectangle.new(0.4, 0.5);

rect.size = 10;

two.update();
