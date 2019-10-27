var elem = document.getElementById("canvasarea");
var params = { width: window.innerWidth, height: window.innerHeight };
var two = new Two(params).appendTo(elem);
var CurrentTextBox;

var Objects = {}

function getAllObjects(){
  var Positions = {}
  for (index = 0; index < Objects.length; ++index) {
    Obj = Objects[0][index]
    var Position = Obj._position
    console.log(Position)
    Positions[index] = Position
  }
  return Positions
}


function makeName(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

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
  static fromRandom() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return { red: red, green: green, blue: blue };
  }
  static rgbToHex = function(r, g, b) {
    var rgbSingleToHex = function(rgb) {
      var hex = Number(rgb).toString(16);
      if (hex.length < 2) {
        hex = "0" + hex;
      }
      return hex;
    };
    var red = rgbSingleToHex(r);
    var green = rgbSingleToHex(g);
    var blue = rgbSingleToHex(b);
    return red + green + blue;
  };
}

class Vector2 {
  static new(x, y) {
    return { x: x, y: y };
  }
}

class Rectangle {
  constructor(Width, Height) {
    var Name = "Rectangle" + makeName(10)
    this.tworect = two.makeRectangle(
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerWidth * Width,
      window.innerHeight * Height
    );
    Objects[Name] = this
    this.position = Vector2.new(0.5, 0.5);
    this.size = Vector2.new(Width, Height);
    this.innerColor = Color3.fromRGB(255, 0, 0);
    this.outline = 0;
    this.opacity = 1;
    this.outlineColor = Color3.fromRGB(0, 0, 0);
    this.visible = true;
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
  set outlineColor(NewColor) {
    this.tworect.stroke =
      "#" + Color3.rgbToHex(NewColor.red, NewColor.green, NewColor.blue);
    this.setPropertyAndUpdate("outlineColor", NewColor);
  }
  get outlineColor() {
    return this._outlineColor;
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
  set visible(NewVisibility) {
    if (NewVisibility == false) {
      this.tworect.opacity = 0;
    } else {
      this.tworect.opacity = 1;
    }
    this.setPropertyAndUpdate("visible", NewVisibility);
  }
  get visible() {
    return this._visible;
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
  static MouseMoveFunctions = [];
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
    document.addEventListener("mousemove", function(e) {
      Mouse.MouseMoveFunctions.forEach(function(func) {
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
  static get MouseMove() {
    if (Mouse.isInitialized == false) {
      Mouse.init();
      Mouse.isInitialized = true;
    }
    return {
      connect: function(func) {
        Mouse.MouseMoveFunctions.push(func);
      }
    };
  }
}

Mouse.MouseDown.connect(function(e) {});

Mouse.MouseUp.connect(function(e) {});

Mouse.Click.connect(function(e) {});

Mouse.MouseMove.connect(function(e) {});

class RaisedButton {
  constructor(Width, Height) {
    var Name = "RaisedButton" + makeName(10)
    Objects[Name] = this
    this.rectangle = new Rectangle(Width, Height);
    this.backtangle = new Rectangle(Width, Height);
    this.size = Vector2.new(Width, Height);
    this.setRectangleToBacktangle(this.rectangle, this.backtangle);

    this.backtangle.opacity = 0.5;
    this.onButtonClicked = function() {};
    document.addEventListener("click", this.click.bind(this));

    document.addEventListener("mousedown", this.mousedown.bind(this));

    document.addEventListener("mouseup", this.mouseup.bind(this));
  }

  setRectangleToBacktangle(Rectangle, Backtangle) {
    Rectangle.position = Vector2.new(
      Backtangle.position.x,
      Backtangle.position.y - this.size.y / 10
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
        this.backtangle.position.y - this.size.y / 10
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
    this.setPropertyAndUpdate("size", NewSize);
    this.backtangle.size = NewSize;
    this.setRectangleToBacktangle(this.rectangle, this.backtangle);
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

class TextButton {
  constructor(Width, Height) {
    var Name = "TextButton" + makeName(10)
    Objects[Name] = this
    this.rectangle = new Rectangle(Width, Height);
    this.backtangle = new Rectangle(Width, Height);
    this.textlabel = new TextLabel("Button");
    this.size = Vector2.new(Width, Height);
    this.setRectangleToBacktangle(this.rectangle, this.backtangle);

    this.backtangle.opacity = 0.5;
    this.onButtonClicked = function() {};
    document.addEventListener("click", this.click.bind(this));

    document.addEventListener("mousedown", this.mousedown.bind(this));

    document.addEventListener("mouseup", this.mouseup.bind(this));
  }

  setRectangleToBacktangle(Rectangle, Backtangle) {
    Rectangle.position = Vector2.new(
      Backtangle.position.x,
      Backtangle.position.y - this.size.y / 10
    );
    Rectangle.size = Backtangle.size;
    this.textlabel.position = Rectangle.position;
    Rectangle.innerColor = Backtangle.innerColor;
  }
  click(e) {
    if (this.isPointInRectangle(e.clientX, e.clientY, this.rectangle)) {
      this.onButtonClicked();
    }
  }
  mouseup(e) {
    if (this.rectangle.position == this.backtangle.position) {
      /*this.rectangle.position = Vector2.new(
        this.backtangle.position.x,
        this.backtangle.position.y - this.size.y / 10
      );*/
      this.setRectangleToBacktangle(this.rectangle, this.backtangle);
    }
  }
  mousedown(e) {
    if (this.isPointInRectangle(e.clientX, e.clientY, this.rectangle)) {
      this.rectangle.position = this.backtangle.position;
      this.textlabel.position = this.rectangle.position;
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
    this.setPropertyAndUpdate("size", NewSize);
    this.backtangle.size = NewSize;
    this.setRectangleToBacktangle(this.rectangle, this.backtangle);
    this.scaleTextToButton();
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
  set textSize(NewSize) {
    this.textlabel.size = NewSize;
    this.setPropertyAndUpdate("textSize", NewSize);
  }
  get textSize() {
    return this._textSize;
  }
  set textColor(NewColor) {
    this.textlabel.textColor = NewColor;
    this.setPropertyAndUpdate("textColor", NewColor);
  }
  get textColor() {
    return this._textColor;
  }
  set text(NewText) {
    this.textlabel.text = NewText;
    this.scaleTextToButton()
    this.setPropertyAndUpdate("text", NewText);
  }
  get text() {
    return this._text;
  }
  scaleTextToButton() {
    var ButtonSize = this.rectangle.size;
    var TextBoundingSize = Vector2.new(
      (this.textlabel.boundingBoxSize.x / window.innerWidth).toFixed(3),
      (this.textlabel.boundingBoxSize.y / window.innerHeight).toFixed(3)
    );
    console.log(ButtonSize);
    console.log(TextBoundingSize);
    this.textlabel.size = 0;
    var i;
    
    while(true){
        this.textlabel.size = this.textlabel.size + 0.001;
        var NewBoundingSizeX = (
          this.textlabel.boundingBoxSize.x /
          window.innerWidth /
          10
        ).toFixed(3);
        var NewBoundingSizeY = (
          this.textlabel.boundingBoxSize.y /
          window.innerHeight /
          10
        ).toFixed(3);
        if (NewBoundingSizeX >= ButtonSize.x.toFixed(3)) {
          console.log("Button size is " + ButtonSize.x);
          console.log("New text size is " + this.textlabel.size);
          this.textSize = this.textlabel.size / 10;
          this.textlabel.position = this.rectangle.position;
          break;
        }
        if (NewBoundingSizeY >= ButtonSize.y.toFixed(3)){
          console.log("Button size is " + ButtonSize.x);
          console.log("New text size is " + this.textlabel.size);
          this.textSize = this.textlabel.size / 10;
          this.textlabel.position = this.rectangle.position;
          break;
        }
    }
  }
  setPropertyAndUpdate(PropName, PropValue) {
    this["_" + PropName] = PropValue;
    two.update();
  }
}

class Button {
  constructor(Width, Height) {
    var Name = "Button" + makeName(10)
    Objects[Name] = this
    this.rectangle = new Rectangle(Width, Height);
    this.onButtonClicked = function() {};
    document.addEventListener("click", this.click.bind(this));

    document.addEventListener("mousedown", this.mousedown.bind(this));

    document.addEventListener("mouseup", this.mouseup.bind(this));
  }
  click(e) {
    if (this.isPointInRectangle(e.clientX, e.clientY, this.rectangle)) {
      //Mouse Clicked
      this.onButtonClicked();
    }
  }
  mouseup(e) {
    //Mouse Up
  }
  mousedown(e) {
    if (this.isPointInRectangle(e.clientX, e.clientY, this.rectangle)) {
      //Mouse Down
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
    this.rectangle.position = NewPos;
    this.setPropertyAndUpdate("position", NewPos);
  }
  get position() {
    return this._position;
  }
  set size(NewSize) {
    this.rectangle.size = NewSize;
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
    this.rectangle.innerColor = NewColor;
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
  constructor(text) {
    var Name = "TextLabel" + makeName(10)
    Objects[Name] = this
    var svgCanvas = document.querySelector("#canvasarea > svg");
    this.TextLabel = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    this.TextLabel.textContent = text;
    svgCanvas.appendChild(this.TextLabel);
    this.size = 0.1;
    this.position = Vector2.new(0.5, 0.5);
    this.fontFamily = "sans-serif";
  }
  set text(NewText) {
    this.TextLabel.textContent = NewText;
    this.setPropertyAndUpdate("text", NewText);
  }
  get text() {
    return this._text;
  }
  set size(NewSize) {
    this.TextLabel.setAttributeNS(null, "font-size", NewSize * 100 + "vw");
    this.setPropertyAndUpdate("size", NewSize);
  }
  get size() {
    return this._size;
  }
  set position(NewPosition) {
    var PosX = NewPosition.x;
    var PosY = NewPosition.y;
    this.TextLabel.setAttributeNS(
      null,
      "x",
      (window.innerWidth * PosX - this.boundingBoxSize.x / 2).toString()
    );
    this.TextLabel.setAttributeNS(
      null,
      "y",
      (window.innerHeight * PosY + this.boundingBoxSize.y / 4).toString()
    );
    this.setPropertyAndUpdate("position", NewPosition);
  }
  get position() {
    return this._position;
  }
  set textColor(NewColor) {
    var SVGColor =
      "#" + Color3.rgbToHex(NewColor.red, NewColor.green, NewColor.blue);
    this.TextLabel.setAttributeNS(null, "fill", SVGColor);
    this.setPropertyAndUpdate("textColor", NewColor);
  }
  get textColor() {
    return this._textColor;
  }
  set fontFamily(NewFontFamily) {
    this.TextLabel.setAttributeNS(null, "font-family", NewFontFamily);
    this.setPropertyAndUpdate("fontFamily", NewFontFamily);
  }
  get fontFamily() {
    return this._fontFamily;
  }
  get boundingBoxSize() {
    var bbox = this.TextLabel.getBBox();
    var width = bbox.width;
    var height = bbox.height;
    return Vector2.new(width, height);
  }
  setPropertyAndUpdate(PropName, PropValue) {
    this["_" + PropName] = PropValue;
    two.update();
  }
}

class TextBox {
  constructor(Text) {
    var Name = "TextBox" + makeName(10)
    Objects[Name] = this
    this.BackBox = new Rectangle(0.1, 0.1);
    this.BackBox.innerColor = Color3.fromRGB(255, 255, 255);
    this.TextLabel = new TextLabel(Text);
    this.TextLabel.size = 0.1;
    this.BackBox.outline = 2;

    this.onButtonClicked = function() {
      CurrentTextBox = this;
      this.BackBox.outlineColor = Color3.fromRGB(0, 189, 255);
      this.TextLabel.text = this.TextLabel.text + "|";
    };
    document.addEventListener("click", this.click.bind(this));
    //GEFLGHSDFLJDF
    //this.TextLabel.size = 0.23;
    this.text = "Inser Text Here";
    this.sizeTextToFitBox();
  }
  sizeTextToFitBox(Removing) {
    var Delta;
    if (Removing == true) {
      Delta = -0.001;
    } else {
      Delta = 0.001;
    }
    var counter = 0
    while (true) {
      counter = counter + 1
      this.TextLabel.size = this.TextLabel.size + Delta;
      var NewBoundingSizeX = (
        this.TextLabel.boundingBoxSize.x /
        window.innerWidth /
        10
      ).toFixed(3);
      var NewBoundingSizeY = (
        this.TextLabel.boundingBoxSize.y /
        window.innerHeight /
        10
      ).toFixed(3);
      if (NewBoundingSizeX >= this.BackBox.size.x.toFixed(3)) {
        var size = this.TextLabel.size;
        this.TextLabel.size = size / 10;
        this.TextLabel.position = this.BackBox.position;
        console.log("New text size is " + this.TextLabel.size);
        break;
      } else {
      }
      if (NewBoundingSizeY >= this.BackBox.size.y.toFixed(3)){
        var size = this.TextLabel.size;
        this.TextLabel.size = size / 10;
        this.TextLabel.position = this.BackBox.position;
        console.log("New text size is " + this.TextLabel.size);
        break;
      }
    }
    
    console.log("count is " + counter)
    //for (i = 0; i < 1000; i++) {}
  }
  set size(NewSize) {
    this.BackBox.size = NewSize;
    this.TextLabel.size = NewSize.x;
    this.sizeTextToFitBox();
    this.setPropertyAndUpdate("size", NewSize);
  }
  get size() {
    return this._size;
  }
  set text(NewText) {
    this.TextLabel.text = NewText;
    this.setPropertyAndUpdate("text", NewText);
  }
  get text() {
    return this._text;
  }
  set position(NewPosition) {
    this.BackBox.position = NewPosition;
    this.TextLabel.position = NewPosition;
    this.setPropertyAndUpdate("position", NewPosition);
  }
  get position() {
    return this._position;
  }
  setPropertyAndUpdate(PropName, PropValue) {
    this["_" + PropName] = PropValue;
    two.update();
  }
  click(e) {
    if (this.isPointInRectangle(e.clientX, e.clientY, this.BackBox)) {
      if (CurrentTextBox == null) {
        this.onButtonClicked();
      }
    } else {
      if (CurrentTextBox != null) {
        CurrentTextBox = null;
        this.BackBox.outlineColor = Color3.fromRGB(0, 0, 0);
        var TextWithoutCursor = this.TextLabel.text.slice(0, -1);
        this.TextLabel.text = TextWithoutCursor;
        this.sizeTextToFitBox();
      }
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

class Image {
  constructor(Image) {
    var Name = "Image" + makeName(10)
    Objects[Name] = this
    var svgCanvas = document.querySelector("#canvasarea > svg");
    this.Img = document.createElementNS("http://www.w3.org/2000/svg", "image");
    this.Img.setAttributeNS("http://www.w3.org/1999/xlink", "href", Image);
    this.Img.setAttributeNS(null, "width", "200");
    this.Img.setAttributeNS(null, "height", "200");
    this.Img.setAttribute("preserveAspectRatio", "none");
    svgCanvas.appendChild(this.Img);
  }
  set size(NewSize) {
    var SizeX = window.innerWidth * NewSize.x;
    var SizeY = window.innerHeight * NewSize.y;
    this.Img.setAttributeNS(null, "width", SizeX.toString());
    this.Img.setAttributeNS(null, "height", SizeY.toString());
    this.setPropertyAndUpdate("size", NewSize);
  }
  get size() {
    return this._size;
  }
  set position(NewPosition) {
    var PositionX = window.innerWidth * NewPosition.x;
    var PositionY = window.innerHeight * NewPosition.y;
    this.Img.setAttributeNS(null, "x", PositionX.toString());
    this.Img.setAttributeNS(null, "y", PositionY.toString());
    this.setPropertyAndUpdate("position", NewPosition);
  }
  get position() {
    return this._position;
  }
  setPropertyAndUpdate(PropName, PropValue) {
    this["_" + PropName] = PropValue;
    two.update();
  }
}

document.addEventListener("keydown", logKey);

function logKey(e) {
  if (CurrentTextBox == null) {
  } else {
    //console.log(e.code);
    var KeyCode = e.code;
    //console.log(CurrentTextBox);
    var BaseNum = 0.23;
    var BaseSize = 22.5;
    function updateTextSize() {
      /* //CurrentTextBox.TextLabel.size = CurrentTextBox.size.x/CurrentTextBox.text.length*5.3
      if (CurrentTextBox.text.length <= CurrentTextBox.size.x * BaseSize) {
        //CurrentTextBox.TextLabel.size = CurrentTextBox.size.x/CurrentTextBox.text.length*5.3
        CurrentTextBox.TextLabel.size = BaseNum;
      } else {
        CurrentTextBox.TextLabel.size =
          (CurrentTextBox.size.x / CurrentTextBox.text.length) * 4.5;
      }*/
      CurrentTextBox.sizeTextToFitBox();
    }
    var ShiftDown = false;
    //console.log(e.key);
    if (KeyCode.includes("Key")) {
    }
    if (KeyCode == "Backspace") {
      console.log("Backspace pressed");
      CurrentTextBox.text =
        CurrentTextBox.text.substring(0, CurrentTextBox.text.length - 2) + "|";
      // updateTextSize();
    } else if (e.key == "Shift") {
    } else if (e.key == "Tab") {
      CurrentTextBox.text = CurrentTextBox.text.substring(
        0,
        CurrentTextBox.text.length - 1
      );
      CurrentTextBox.text = CurrentTextBox.text + "   " + "|";
    } else if (e.key == "CapsLock") {
    } else if (e.key == "Meta") {
    } else if (e.key == "Enter") {
    } else if (e.key == "Meta") {
    } else if (e.key == "v" && e.metaKey) {
      var input = document.createElement("textarea");
      input.name = "textarea";

      document.body.appendChild(input);
      input.focus();
      function handlePaste(e) {
        var clipboardData, pastedData;

        // Stop data actually being pasted into div
        e.stopPropagation();
        e.preventDefault();

        // Get pasted data via clipboard API
        clipboardData = e.clipboardData || window.clipboardData;
        pastedData = clipboardData.getData("Text");
        CurrentTextBox.text = CurrentTextBox.text + pastedData;
        input.remove();
      }

      input.addEventListener("paste", handlePaste);
      document.execCommand("paste");
      input.select();

      //CurrentTextBox.text = CurrentTextBox.text + window.clipboardData.getData('Text')
    } else if (e.key == "ArrowLeft" && e.metaKey) {
      var input = document.createElement("textarea");
      input.name = "textarea";

      document.body.appendChild(input);
      input.focus();
      function handlePaste(e) {
        var clipboardData, pastedData;

        // Stop data actually being pasted into div
        e.stopPropagation();
        e.preventDefault();

        // Get pasted data via clipboard API
        clipboardData = e.clipboardData || window.clipboardData;
        pastedData = clipboardData.getData("Text");
        CurrentTextBox.text = CurrentTextBox.text.substring(
          0,
          CurrentTextBox.text.length - 1
        );
        CurrentTextBox.text = CurrentTextBox.text + pastedData + "|";
        input.remove();
      }

      input.addEventListener("paste", handlePaste);
      document.execCommand("paste");
      input.select();

      //CurrentTextBox.text = CurrentTextBox.text + window.clipboardData.getData('Text')
    } else if (e.key == "ArrowRight") {
    } else if (e.key == "ArrowUp") {
    } else if (e.key == "ArrowDown") {
    } else if (e.key == "Alt") {
    } else if (e.key == "Escape") {
    } else {
      CurrentTextBox.text = CurrentTextBox.text.substring(
        0,
        CurrentTextBox.text.length - 1
      );
      CurrentTextBox.text = CurrentTextBox.text + e.key + "|";
    }
    if (KeyCode == "Backspace") {
      updateTextSize(true);
    } else {
      updateTextSize(false);
    }

    //CurrentTextBox.sizeTextToFitBox();
  }
}
