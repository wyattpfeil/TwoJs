var elem = document.getElementById("canvasarea");
var params = { width: window.innerWidth, height: window.innerHeight };
var two = new Two(params).appendTo(elem);
var CurrentTextBox;

class Color3 {
  static fromRGB(red, green, blue) {
    return { red: red, green: green, blue: blue };
  }
  static fromHex(HexValue) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(HexValue);
    return result
      ? {
          red: parseInt(result[1], 16),
          green: parseInt(result[2], 16),
          blue: parseInt(result[3], 16)
        }
      : null;
  }
  static fromHSV(h, s, v) {
    var r, g, b;
    var i;
    var f, p, q, t;
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));
    s /= 100;
    v /= 100;
    if (s == 0) {
      r = g = b = v;
      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    h /= 60;
    i = Math.floor(h);
    f = h - i;
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));

    switch (i) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;

      case 1:
        r = q;
        g = v;
        b = p;
        break;

      case 2:
        r = p;
        g = v;
        b = t;
        break;

      case 3:
        r = p;
        g = q;
        b = v;
        break;

      case 4:
        r = t;
        g = p;
        b = v;
        break;

      default:
        r = v;
        g = p;
        b = q;
    }

    return {
      red: Math.round(r * 255),
      green: Math.round(g * 255),
      blue: Math.round(b * 255)
    };
  }
  static rgbToHex = function(r,g,b) {   
    var rgbSingleToHex = function (rgb) { 
      var hex = Number(rgb).toString(16);
      if (hex.length < 2) {
           hex = "0" + hex;
      }
      return hex;
    };
    var red = rgbSingleToHex(r);
    var green = rgbSingleToHex(g);
    var blue = rgbSingleToHex(b);
    return red+green+blue;
  };
  
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
  set outlineColor(NewColor){
    this.tworect.stroke = "#" + Color3.rgbToHex(NewColor.red, NewColor.green, NewColor.blue)
    this.setPropertyAndUpdate("outlineColor", NewColor);
  }
  get outlineColor(){
    return this._outlineColor
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
    this.tworect.fill = "rgba(" + r + "," + g + "," + b + ", 1)";
    this.setPropertyAndUpdate("innerColor", NewColor);
  }
  get innerColor() {
    return this._innerColor;
  }
  set size(NewSize) {
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

class Mouse {
  static isInitialized = false;
  static MouseDownFunctions = [];
  static MouseUpFunctions = [];
  static ClickFunctions = [];
  static init() {
    document.addEventListener("mousedown", function(e) {
      Mouse.MouseDownFunctions.forEach(function(func) {
        func(e);
      });
    });
    document.addEventListener("mouseup", function(e) {
      Mouse.MouseUpFunctions.forEach(function(func) {
        func(e);
      });
    });
    document.addEventListener("click", function(e) {
      Mouse.ClickFunctions.forEach(function(func) {
        func(e);
      });
    });
  }
  static get MouseDown() {
    if (Mouse.isInitialized == false) {
      Mouse.init();
      Mouse.isInitialized = true;
    }
    return {
      connect: function(func) {
        Mouse.MouseDownFunctions.push(func);
      }
    };
  }
  static get MouseUp() {
    if (Mouse.isInitialized == false) {
      Mouse.init();
      Mouse.isInitialized = true;
    }
    return {
      connect: function(func) {
        Mouse.MouseUpFunctions.push(func);
      }
    };
  }
  static get Click() {
    if (Mouse.isInitialized == false) {
      Mouse.init();
      Mouse.isInitialized = true;
    }
    return {
      connect: function(func) {
        Mouse.ClickFunctions.push(func);
      }
    };
  }
}

Mouse.MouseDown.connect(function(e) {});

Mouse.MouseUp.connect(function(e) {});

Mouse.Click.connect(function(e) {});

class RaisedButton {
  constructor(Width, Height) {
    this.rectangle = new Rectangle(0.25, 0.25);
    this.backtangle = new Rectangle(0.25, 0.25);
    this.setRectangleToBacktangle(this.rectangle, this.backtangle);
    this.backtangle.opacity = 0.5;

    this.onButtonClicked = function(){}
    document.addEventListener("click", this.click.bind(this));

    document.addEventListener("mousedown", this.mousedown.bind(this));

    document.addEventListener("mouseup", this.mouseup.bind(this));
  }

  setRectangleToBacktangle(Rectangle, Backtangle) {
    Rectangle.position = Vector2.new(
      Backtangle.position.x,
      Backtangle.position.y - 0.02
    );
    Rectangle.size = Backtangle.size;
    Rectangle.innerColor = Backtangle.innerColor;
  }
  click(e) {
    if (this.isPointInRectangle(e.clientX, e.clientY, this.rectangle)) {
      this.onButtonClicked();
    }
  }
  mouseup(e) {
    if (this.rectangle.position == this.backtangle.position) {
      this.rectangle.position = Vector2.new(
        this.backtangle.position.x,
        this.backtangle.position.y - 0.02
      );
    }
  }
  mousedown(e) {
    if (this.isPointInRectangle(e.clientX, e.clientY, this.rectangle)) {
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
    this.backtangle.position = NewPos;
    this.setRectangleToBacktangle(this.rectangle, this.backtangle);
    this.setPropertyAndUpdate("position", NewPos);
  }
  get position() {
    return this._position;
  }
  set size(NewSize) {
    this.backtangle.size = NewSize;
    this.setRectangleToBacktangle(this.rectangle, this.backtangle);
    this.setPropertyAndUpdate("size", NewSize);
  }
  get size() {
    return this._size;
  }
  set onButtonClicked(codeToRun) {
    this.setPropertyAndUpdate("onButtonClicked", codeToRun);
  }
  get onButtonClicked() {
    return this._onButtonClicked;
  }
  set innerColor(NewColor) {
    this.backtangle.innerColor = NewColor;
    this.setRectangleToBacktangle(this.rectangle, this.backtangle);
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


class TextLabel {
  constructor(Text){
    this.TwoTextLabel = two.makeText(Text, window.innerWidth / 2, window.innerHeight / 2);
    two.update()
  }
  set text(NewText){
    this.TwoTextLabel.value = NewText
    this.setPropertyAndUpdate("text", NewText)
  }
  get text(){
    return this._text
  }
  set size(NewSize){
    this.TwoTextLabel.size = NewSize * ((window.innerWidth + window.innerHeight) / 2) / 2
    this.setPropertyAndUpdate("size", NewSize)
  }
  get size(){
    return this._size
  }
  set position(NewPosition){
    console.log("Position changed")
    var NewX = NewPosition.x
    var NewY = NewPosition.y
    this.TwoTextLabel.translation.set(
      window.innerWidth * NewX,
      window.innerHeight * NewY
    );
    this.setPropertyAndUpdate("position", NewPosition)
  }
  get position(){
    return this._position
  }
  setPropertyAndUpdate(PropName, PropValue) {
    this["_" + PropName] = PropValue;
    two.update();
  }
}

class TextBox{
  constructor(Text){
    this.BackBox = new Rectangle(0.1, 0.1)
    this.BackBox.innerColor = Color3.fromRGB(255, 255, 255)
    this.TextLabel = new TextLabel(Text)
    this.TextLabel.size = 0.1
    this.BackBox.outline = 2
    this.BackBox.outlineColor = Color3.fromRGB(0, 189, 255)
    this.onButtonClicked = function(){
      CurrentTextBox = this
      this.BackBox.outline = 2
    }
    document.addEventListener("click", this.click.bind(this));
  }

  
  set size(NewSize){
    this.BackBox.size = NewSize
    this.TextLabel.size = NewSize.x
    this.setPropertyAndUpdate("size", NewSize)
  }
  get size(){
    return this._size
  }
  set text(NewText){
    this.TextLabel.text = NewText
    this.setPropertyAndUpdate("text", NewText)
  }
  get text(){
    return this._text
  }
  setPropertyAndUpdate(PropName, PropValue) {
    this["_" + PropName] = PropValue;
    two.update();
  }
  click(e) {
    if (this.isPointInRectangle(e.clientX, e.clientY, this.BackBox)) {
      this.onButtonClicked();
    } else {
      CurrentTextBox = null
      this.BackBox.outline = 2
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
}

//var nrect = new Rectangle(0.25,0.25);
var rectangle = new Rectangle(0.1, 0.1);
rectangle.position = Vector2.new(0.5, 0.5);
rectangle.innerColor = Color3.fromRGB(0, 255, 0);
var button = new RaisedButton(0.5, 0.5);

//var button2 = new Button(0.2, 0.2);
button.position = Vector2.new(0.8, 0.8);
button.size = Vector2.new(0.1, 0.3);
button.innerColor = Color3.fromRGB(255, 0, 0);

var Label1 = new TextLabel("Hello World!")
Label1.text = "Test123"
Label1.size = 0.1
Label1.position = Vector2.new(0.5,0.5)

var Box1 = new TextBox("Hello")
Box1.size = Vector2.new(0.5,0.3)
document.addEventListener('keydown', logKey);
Box1.text = ""
Box1.TextLabel.size = 0.22714285714285715
console.log(Box1.text)
function logKey(e) {
  if(CurrentTextBox == null){

  } else {
    console.log(e.code)
    var KeyCode = e.code
    console.log(CurrentTextBox)
    if(KeyCode.includes("Key")){
      CurrentTextBox.text = CurrentTextBox.text + KeyCode.replace("Key", "")
      //CurrentTextBox.TextLabel.size = CurrentTextBox.size.x/CurrentTextBox.text.length*5.3
      //size.x*360
      //size.x * 0.05
      if (CurrentTextBox.text.length <= CurrentTextBox.size.x * 360){
        CurrentTextBox.TextLabel.size = 0.01419642858
      }
      if (CurrentTextBox.text.length <= CurrentTextBox.size.x * 180){
        CurrentTextBox.TextLabel.size = 0.02839285715
      }
      if (CurrentTextBox.text.length <= CurrentTextBox.size.x * 90){
        CurrentTextBox.TextLabel.size = 0.0567857143
      }
      if (CurrentTextBox.text.length <= CurrentTextBox.size.x * 45){
        CurrentTextBox.TextLabel.size = 0.1135714286
      }
      if (CurrentTextBox.text.length <= CurrentTextBox.size.x * 22) {
        //CurrentTextBox.TextLabel.size = CurrentTextBox.size.x/CurrentTextBox.text.length*5.3
        CurrentTextBox.TextLabel.size = 0.22714285714285715
      }  
      // 4 letters fill up Box size of 0.1
      // 5 letters fill up Box size of 0.2

    }  else if (KeyCode == "Backspace"){
      CurrentTextBox.text = CurrentTextBox.text.substring(0, CurrentTextBox.text.length - 1);
      if (CurrentTextBox.text.length > 6) {
        CurrentTextBox.TextLabel.size = CurrentTextBox.size.x/CurrentTextBox.text.length*5.3
      } else {
        CurrentTextBox.TextLabel.size = 0.22714285714285715
      }
      
    }
    
  }
}

console.log(Color3.rgbToHex(0, 189, 255))