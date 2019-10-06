var elem = document.getElementById("canvasarea");
var params = { width: window.innerWidth, height: window.innerHeight };
var two = new Two(params).appendTo(elem);

class Color3 {
  static fromRGB(red, green, blue) {
    return { red: red, green: green, blue: blue };
  }
}

class Vector2 {
  static new(x, y) {
    return { x: x, y: y };
  }
}

class NewRect {
  constructor(Width, Height) {
    this.tworect = two.makeRectangle(
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerWidth * Width,
      window.innerHeight * Height
    );
  }
  set position(NewPos) {
    var NewX = NewPos.x;
    var NewY = NewPos.y;
    this.tworect.translation.set(
      window.innerWidth * NewX,
      window.innerHeight * NewY
    );
    this.setPropertyAndUpdate("position", NewPos);
  }
  get position() {
    return this._position;
  }
  set innerColor(NewColor) {
    var r = NewColor.red;
    var g = NewColor.green;
    var b = NewColor.blue;
    console.log(r, g, b);
    this.tworect.fill = "rgba(" + r + "," + g + "," + b + ", 0.75)";
    this.setPropertyAndUpdate("innerColor", NewColor);
  }
  get innerColor() {
    return this._innerColor;
  }
  setPropertyAndUpdate(PropName, PropValue) {
    this["_" + PropName] = PropValue;
    two.update();
  }
}

var nrect = new NewRect(0.5, 0.4);
nrect.position = Vector2.new(0.2, 0, 2);
nrect.innerColor = Color3.fromRGB(255, 0, 0);

console.log(nrect.innerColor);
console.log(nrect.position);
