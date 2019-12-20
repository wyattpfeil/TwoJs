var elem = document.getElementById("canvasarea");
var params = { width: window.innerWidth, height: window.innerHeight };
var two = new Two(params).appendTo(elem);

var CurrentTextBox;
var CurrentAlertTextBox;

var Objects = {};

function round(NumToRound, PlaceValueToRound) {
  rounded_number = Math.round(NumToRound * PlaceValueToRound) / PlaceValueToRound
  return rounded_number
}

Array.prototype.insert = function(index, item) {
  this.splice(index, 0, item);
};

function ReLayerObjects() {
  LayerOrder = [];
  function LoopOverObjects(ObjectType) {
    for (var ObjName in Objects) {
      //if(ObjName.includes(ObjectType)){
      var Obj = Objects[ObjName];
      ObjectLayer = Obj.layer;
      LayerOrder.insert(ObjectLayer, Obj);
      //}
    }
    var SortedLayerOrder = LayerOrder.slice(0);
    SortedLayerOrder.sort(function(a, b) {
      return a.layer - b.layer;
    });
    for (let i = SortedLayerOrder.length - 1; i >= 0; i--) {
      var Obj = SortedLayerOrder[i];
      Obj.BringToFront();
    }
    LayerOrder = [];
  }
  /*LoopOverObjects("Rectangle")
    //LoopOverObjects("TextLabel")
    LoopOverObjects("TextButton")*/
}

function getAllObjects() {
  var Positions = {};
  for (index = 0; index < Objects.length; ++index) {
    Obj = Objects[0][index];
    var Position = Obj._position;
    console.log(Position);
    Positions[index] = Position;
  }
  return Positions;
}

function makeName(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
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

Mouse.MouseDown.connect(function(e) {});

Mouse.MouseUp.connect(function(e) {});

Mouse.Click.connect(function(e) {});

Mouse.MouseMove.connect(function(e) {});

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