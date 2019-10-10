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

class Rectangle {
  constructor(Width, Height) {
    this.tworect = two.makeRectangle(
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerWidth * Width,
      window.innerHeight * Height
    );
    this.position = Vector2.new(0.5, 0.5);
    this.size = Vector2.new(0.25, 0.25);
    this.innerColor = Color3.fromRGB(255, 0, 0);
    this.outline = 0;
    this.opacity = 1;
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
  set outline(NewOutline) {
    this.tworect.linewidth = NewOutline;
    this.setPropertyAndUpdate("outline", NewOutline);
  }
  get outline() {
    return this._outline;
  }
  set opacity(NewOpacity) {
    this.tworect.opacity = NewOpacity;
    this.setPropertyAndUpdate("opacity", NewOpacity);
  }
  get opacity() {
    return this._opacity;
  }
  get position() {
    return this._position;
  }
  set innerColor(NewColor) {
    var r = NewColor.red;
    var g = NewColor.green;
    var b = NewColor.blue;
    console.log(r, g, b);
    this.tworect.fill = "rgba(" + r + "," + g + "," + b + ", 1)";
    this.setPropertyAndUpdate("innerColor", NewColor);
  }
  get innerColor() {
    return this._innerColor;
  }
  set size(NewSize) {
    console.log("New size is ");
    console.log(NewSize);
    var SizeX = window.innerWidth * NewSize.x;
    var SizeY = window.innerHeight * NewSize.y;
    this.tworect.width = SizeX;
    this.tworect.height = SizeY;
    this.setPropertyAndUpdate("size", NewSize);
  }
  get size() {
    return this._size;
  }
  setPropertyAndUpdate(PropName, PropValue) {
    this["_" + PropName] = PropValue;
    two.update();
  }
}

class Button {
  constructor(Width, Height) {
    this.rectangle = new Rectangle(0.25, 0.25);
    this.backtangle = new Rectangle(0.25, 0.25);
    this.backtangle.position = Vector2.new(
      this.rectangle.position.x,
      this.rectangle.position.y + 0.025
    );
    this.backtangle.opacity = 0.5;

    document.addEventListener("click", this.click.bind(this));

    document.addEventListener("mousedown", this.mousedown.bind(this));

    document.addEventListener("mouseup", this.mouseup.bind(this));
  }

  click(e) {
    if (this.isPointInRectangle(e.clientX, e.clientY, this.rectangle)) {
      console.log("Clicked!");
    }
  }
  mouseup(e) {
    if (this.isPointInRectangle(e.clientX, e.clientY, this.rectangle)) {
      console.log("mouse up in square!");
      this.rectangle.position = Vector2.new(
        this.backtangle.position.x,
        this.backtangle.position.y - 0.025
      );
    }
  }
  mousedown(e) {
    if (this.isPointInRectangle(e.clientX, e.clientY, this.rectangle)) {
      console.log("Mouse Down in Rectangle!");
      this.rectangle.position = this.backtangle.position;
    }
  }
  isPointInRectangle(X, Y, Rectangle) {
    var CenterOfButtonX = Rectangle.position.x * window.innerWidth;
    var CenterOfButtonY = Rectangle.position.y * window.innerHeight;
    var SizeOfButtonX = Rectangle.size.x * window.innerWidth;
    var SizeOfButtonY = Rectangle.size.y * window.innerHeight;

    var LeftSideOfButton = CenterOfButtonX - SizeOfButtonX / 2;
    var RightSideOfButton = CenterOfButtonX + SizeOfButtonX / 2;

    var TopOfButton = CenterOfButtonY - SizeOfButtonY / 2;
    var BottomOfButton = CenterOfButtonY + SizeOfButtonY / 2;

    if (
      X > LeftSideOfButton &&
      X < RightSideOfButton &&
      Y > TopOfButton &&
      Y < BottomOfButton
    ) {
      return true;
    } else {
      return false;
    }
  }

  set position(NewPos) {
    var NewX = NewPos.x;
    var NewY = NewPos.y;
    this.rectangle.position = Vector2.new(NewPos.x, NewPos.y + 0.025)
    this.backtangle.position = NewPos
    this.setPropertyAndUpdate("position", NewPos);
  }

}
//var nrect = new Rectangle(0.25,0.25);
var rectangle = new Rectangle(0.1, 0.1);
rectangle.position = Vector2.new(0.2, 0.2);
rectangle.innerColor = Color3.fromRGB(0, 255, 0);
var button = new Button(0.5, 0.5);
//var button2 = new Button(0.2, 0.2);
//button2.position = Vector2.new(0.9, 0.9);

//console.log(nrect.innerColor);
//console.log(nrect.position);
