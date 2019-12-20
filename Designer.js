var AllObjects = [];
var SelectedObject;
var GlobalDraggers = [];
function isPointInRectangle(X, Y, Rectangle) {
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

function generateExportCode() {
  var FullCode = "";
  function MakeNewLine(Variable) {
    Variable = Variable + "\n";
    return Variable;
  }
  function SetPropertyInCode(Code, ObjName, PropName, NewValue) {
    if (NewValue != null) {
      Code = Code + ObjName + "." + PropName + " = " + NewValue;
      Code = MakeNewLine(Code);
    }
    return Code;
  }
  AllObjects.forEach(Obj => {
    var ObjType = Obj.constructor.name;
    if (ObjType == "Rectangle") {
      console.log("Its a rect!");
      console.log(Obj.name);
      var name = Obj.name;
      var position = Obj.position;
      var size = Obj.size;
      var outline = Obj.outline;
      var outlineColor = Obj.outlineColor;
      var innerColor = Obj.innerColor;
      var opacity = Obj.opacity;
      var visible = Obj.visible;
      var layer = Obj.layer;
      var rotation = Obj.rotation;
      var bevel = Obj.bevel;
      var Code = "";
      Code = "var " + name + " = new Rectangle(" + (size.x).toFixed(4) + ", " + (size.y).toFixed(4) + ")";
      Code = MakeNewLine(Code);
      Code = SetPropertyInCode(
        Code,
        name,
        "position",
        "Vector2.new(" + (position.x).toFixed(4) + ", " + (position.y).toFixed(4) + ")"
      );
      Code = SetPropertyInCode(
        Code,
        name,
        "size",
        "Vector2.new(" + (size.x).toFixed(4) + ", " + (size.y).toFixed(4) + ")"
      );
      Code = SetPropertyInCode(Code, name, "outline", outline);
      Code = SetPropertyInCode(
        Code,
        name,
        "outlineColor",
        "Color3.fromRGB(" +
          outlineColor.red +
          ", " +
          outlineColor.green +
          ", " +
          outlineColor.blue +
          ")"
      );
      Code = SetPropertyInCode(
        Code,
        name,
        "innerColor",
        "Color3.fromRGB(" +
          innerColor.red +
          ", " +
          innerColor.green +
          ", " +
          innerColor.blue +
          ")"
      );
      Code = SetPropertyInCode(Code, name, "opacity", opacity);
      Code = SetPropertyInCode(Code, name, "visible", visible);
      Code = SetPropertyInCode(Code, name, "layer", layer);
      Code = SetPropertyInCode(Code, name, "rotation", rotation);
      Code = SetPropertyInCode(Code, name, "bevel", bevel);
      FullCode = FullCode + Code + "\n\n";
    }
  });
  console.log(FullCode);
  return FullCode;
}

var Backround = new Button(1, 1);
Backround.innerColor = Color3.fromRGB(56, 56, 56);

var ToolboxBack = new Rectangle(0.15, 1);
ToolboxBack.position = Vector2.new(0.925, 0.5);
ToolboxBack.innerColor = Color3.fromRGB(66, 66, 66);

var SelectToolEnabled = false;
var ExportButton = new TextButton(0.2, 0.2);
ExportButton.text = "Export"
ExportButton.innerColor = Color3.fromRGB(115, 115, 115);
ExportButton.size = Vector2.new(0.1, 0.05);
ExportButton.position = Vector2.new(0.925, 0.05);
ExportButton.textColor = Color3.fromRGB(255, 255, 255);
ExportButton.bevel = 10;
ExportButton.onButtonClicked = function() {
  console.log("Clicked!");
  prompt("Export Code", generateExportCode());
};

var CreateRectangleButton = new TextButton(0.2, 0.2);
CreateRectangleButton.innerColor = Color3.fromRGB(115, 115, 115);
CreateRectangleButton.size = Vector2.new(0.1, 0.05);
CreateRectangleButton.position = Vector2.new(0.925, 0.125);
CreateRectangleButton.textColor = Color3.fromRGB(255, 255, 255);
CreateRectangleButton.bevel = 10;
CreateRectangleButton.text = "Rectangle";
CreateRectangleButton.onButtonClicked = function() {
  var CreatedRect = new Rectangle(0.1, 0.1);
  CreatedRect.innerColor = Color3.fromRGB(255, 255, 255);
  AllObjects.push(CreatedRect);
};

var BringToFrontButton = new TextButton(0.2, 0.2);
BringToFrontButton.innerColor = Color3.fromRGB(115, 115, 115);
BringToFrontButton.size = Vector2.new(0.1, 0.05);
BringToFrontButton.position = Vector2.new(0.925, 0.2);
BringToFrontButton.textColor = Color3.fromRGB(255, 255, 255);
BringToFrontButton.bevel = 10;
BringToFrontButton.text = "BringToFront";
BringToFrontButton.onButtonClicked = function() {
  if(SelectedObject) {
    SelectedObject.BringToFront()
  }
};
function createDraggingTool(Obj) {
  var Draggers = [];
  var MouseInRect = false;
  var ResetPosTopRight;
  var ResetPosBottomRight;
  var Offset = 0.0075;
  Mouse.MouseMove.connect(function(e) {
    if (MouseInRect == true) {
      var XMousePos = e.x / window.innerWidth;
      // console.log(XMousePos)
      //console.log((XMousePos + Obj.position.x - XMousePos))
      Obj.position = Vector2.new(XMousePos, e.y / window.innerHeight);
      //Obj.position = Vector2.new(XMousePos + (XMousePos - Obj.position.x ), Obj.position.y)
    }
    if (NoDragersBeingClicked == true) {
      ResetPosTopRight = Vector2.new(
        Obj.position.x + Obj.size.x / 2 - Offset,
        Obj.position.y + Obj.size.y / 2 - Offset
      );
      ResetPosBottomRight = Vector2.new(
        Obj.position.x - Obj.size.x / 2 - Offset,
        Obj.position.y - Obj.size.y / 2 + Offset
      );
    }
    UpdateDraggerPositions();
  });

  Mouse.MouseDown.connect(function(e) {
    if (isPointInRectangle(e.x, e.y, Obj)) {
      MouseInRect = true;
    }
  });
  Mouse.MouseUp.connect(function(e) {
    if (MouseInRect == true) {
      MouseInRect = false;
    }
  });
  var NoDragersBeingClicked;
  DraggersNotBeingClicked = [];
  function UpdateDraggerPositions() {
    Draggers.forEach(function(draggerData) {
      draggerData[3]();
      if (draggerData[0].isMouseDown == false) {
        DraggersNotBeingClicked.push(draggerData);
      }
    });
    if (DraggersNotBeingClicked.length == Draggers.length) {
      NoDragersBeingClicked = true;
    } else {
      NoDragersBeingClicked = false;
    }
    DraggersNotBeingClicked = [];
  }

  function CreateDragger(Dragger, Position, MouseMoveCode, UpdateFunction) {
    Draggers.push([Dragger, Position, MouseMoveCode, UpdateFunction]);
    Dragger.innerColor = Color3.fromRGB(255, 255, 255);
    Dragger.size = Vector2.new(0.005, 0.01);
    //LeftDragger.outline = 1
    Dragger.onMouseHover = function() {
      Dragger.innerColor = Color3.fromRGB(140, 140, 140);
    };
    Dragger.onMouseUnhover = function() {
      Dragger.innerColor = Color3.fromRGB(255, 255, 255);
    };
    Mouse.MouseMove.connect(function(e) {
      if (Dragger.isMouseDown == true) {
        UpdateDraggerPositions();
        MouseMoveCode(e, ResetPosTopRight, ResetPosBottomRight);
      }
    });
    // Dragger.position = Position;
  }
  var LeftDragger = new Button(0.01, 0.01);

  CreateDragger(
    LeftDragger,
    Vector2.new(Obj.position.x - Obj.size.x / 2 - Offset, Obj.position.y),
    function(e, ObjPos, NonObjPos) {
      var MouseXPos = e.x / window.innerWidth;

      if (MouseXPos < Obj.position.x + Obj.size.x / 2 - Offset) {
        var DifferenceX = ObjPos.x - MouseXPos;
        //console.log("DifferenceX = " + DifferenceX + ", ObjPos.x = " + ObjPos.x + ", MouseXPos = " + MouseXPos + ", Obj.Size.x = " + Obj.size.x)

        Obj.size = Vector2.new(DifferenceX, Obj.size.y);
        Obj.position = Vector2.new(
          ObjPos.x - DifferenceX / 2 + Offset,
          Obj.position.y
        );
        LeftDragger.position = Vector2.new(
          Obj.position.x - Obj.size.x / 2 - Offset,
          Obj.position.y
        );
      }
    },
    function() {
      LeftDragger.position = Vector2.new(
        Obj.position.x - Obj.size.x / 2 - Offset,
        Obj.position.y
      );
    }
  );

  var RightDragger = new Button(0.01, 0.01);
  CreateDragger(
    RightDragger,
    Vector2.new(Obj.position.x + Obj.size.x / 2 + Offset, Obj.position.y),
    function(e, NonObjPos, ObjPos) {
      var MouseXPos = e.x / window.innerWidth;
      if (MouseXPos > Obj.position.x - Obj.size.x / 2 + Offset) {
        var DifferenceX = MouseXPos - ObjPos.x - Offset * 2;
        Obj.size = Vector2.new(DifferenceX, Obj.size.y);
        Obj.position = Vector2.new(
          ObjPos.x + DifferenceX / 2 + Offset,
          Obj.position.y
        );
        RightDragger.position = Vector2.new(
          Obj.position.x + Obj.size.x / 2 + 0.0075,
          Obj.position.y
        );
      } else {
      }
    },
    function() {
      RightDragger.position = Vector2.new(
        Obj.position.x + Obj.size.x / 2 + 0.0075,
        Obj.position.y
      );
    }
  );

  var TopDragger = new Button(0.01, 0.01);
  CreateDragger(
    TopDragger,
    Vector2.new(Obj.position.x, Obj.position.y - Obj.size.y / 2 - Offset),
    function(e, ObjPos, NonObjPos) {
      var MouseYPos = e.y / window.innerHeight;
      if (MouseYPos < Obj.position.y + Obj.size.y / 2 - Offset) {
        var DifferenceY = ObjPos.y - MouseYPos;
        Obj.size = Vector2.new(Obj.size.x, DifferenceY);
        Obj.position = Vector2.new(
          Obj.position.x,
          ObjPos.y - DifferenceY / 2 + Offset
        );
        TopDragger.position = Vector2.new(
          Obj.position.x,
          Obj.position.y - Obj.size.y / 2 - Offset
        );
      } else {
      }
    },
    function() {
      TopDragger.position = Vector2.new(
        Obj.position.x,
        Obj.position.y - Obj.size.y / 2 - Offset
      );
    }
  );

  var BottomDragger = new Button(0.01, 0.01);
  CreateDragger(
    BottomDragger,
    Vector2.new(Obj.position.x, Obj.position.y + Obj.size.y / 2 + Offset),
    function(e, NonObjPos, ObjPos) {
      var MouseYPos = e.y / window.innerHeight;
      if (MouseYPos > Obj.position.y - Obj.size.y / 2 + Offset) {
        var DifferenceY = MouseYPos - ObjPos.y;
        Obj.size = Vector2.new(Obj.size.x, DifferenceY);
        Obj.position = Vector2.new(
          Obj.position.x,
          ObjPos.y + DifferenceY / 2 - Offset
        );
        BottomDragger.position = Vector2.new(
          Obj.position.x,
          Obj.position.y + Obj.size.y / 2 + Offset
        );
      } else {
      }
    },
    function() {
      BottomDragger.position = Vector2.new(
        Obj.position.x,
        Obj.position.y + Obj.size.y / 2 + Offset
      );
    }
  );
  return Draggers;
}

Mouse.MouseDown.connect(function(e) {
  if (!e.shiftKey) {
    AllObjects.forEach(Obj => {
      if (Obj.position != null && Obj.size != null) {
        var ObjectPosition = Obj.position;
        var ObjectSize = Obj.size;
        if (isPointInRectangle(e.clientX, e.clientY, Obj)) {
          GlobalDraggers.forEach(function(draggerData) {
            draggerData[0].destroy();
          });
          var Draggers = createDraggingTool(Obj);
          SelectedObject = Obj
          GlobalDraggers = Draggers;
          removeProperties()
          createProperties()
          SelectToolEnabled = false;
        }
      }
    });
  } else {
    GlobalDraggers.forEach(function(draggerData) {
      draggerData[0].destroy();
    });
    removeProperties()
    SelectedObject = null
  }
});

var PropertiesBox = new Rectangle(0.15731435643564357, 0.4079373678646935)
PropertiesBox.position = Vector2.new(0.09067222511724857, 0.2040169133192389)
PropertiesBox.size = Vector2.new(0.15731435643564357, 0.4079373678646935)
PropertiesBox.innerColor = Color3.fromRGB(66, 66, 66)

var PropertiesTop = new Rectangle(0.15766414799374673, 0.022415433403805498)
PropertiesTop.position = Vector2.new(0.09084353830119854, 0.010890591966173362)
PropertiesTop.size = Vector2.new(0.15766414799374673, 0.022415433403805498)
PropertiesTop.innerColor = Color3.fromRGB(45, 45, 45)

var PropertyNum = 1
var PropertyBoxes = []
function createProperties() {
  createNewProperty("innerColor", function(NewValue){
    var Colors = NewValue.split(',');
    SelectedObject.innerColor = Color3.fromRGB(parseInt(Colors[0]), parseInt(Colors[1]), parseInt(Colors[2]))
  }, SelectedObject.innerColor.red + ", " + SelectedObject.innerColor.green + ", " + SelectedObject.innerColor.blue)
  
  createNewProperty("rotation", function(NewValue){
    console.log(NewValue)
    SelectedObject.rotation = NewValue
  }, 0)
  createNewProperty("position", function(NewValue){
    console.log(NewValue)
    var XAndYPositions = NewValue.split(',');
    SelectedObject.position = Vector2.new(XAndYPositions[0], XAndYPositions[1])
  }, (SelectedObject.position.x).toFixed(4) + ", " + (SelectedObject.position.y).toFixed(4))
}
function createNewProperty(PropertyName, onTextSubmitCode, BaseValue) {
  var SamplePropertyInput = new AlertTextBox(PropertyName)
  SamplePropertyInput.position = Vector2.new(0.1193, 0.05708245243128964 * PropertyNum)
  SamplePropertyInput.size = Vector2.new(0.09, 0.03)
  SamplePropertyInput.textColor = Color3.fromRGB(255, 255, 255)
  SamplePropertyInput.innerColor = Color3.fromRGB(100, 100, 100)
  SamplePropertyInput.outline = 0
  SamplePropertyInput.text = BaseValue
  
  var SamplePropertyLabel = new TextButton(0.05, 0.03)
  SamplePropertyLabel.position = Vector2.new(0.0425, 0.05708245243128964 * PropertyNum)
  SamplePropertyLabel.textColor = Color3.fromRGB(255, 255, 255)
  SamplePropertyLabel.raised = false
  SamplePropertyLabel.onlyTextVisible = true
  SamplePropertyLabel.text = PropertyName
  PropertyBoxes.push(SamplePropertyInput)
  PropertyBoxes.push(SamplePropertyLabel)
  PropertyNum = PropertyNum + 1
  SamplePropertyInput.onTextSubmit = function() {
   // var TextWithoutCursor = SamplePropertyInput.text.slice(0, -1);
    onTextSubmitCode(SamplePropertyInput.PromptInput)
    console.log(SamplePropertyInput.PromptInput)
  }
}
function removeProperties() {
  PropertyBoxes.forEach(PropertyBox => {
    PropertyBox.destroy()
  })
  PropertyNum = 1
}

//var TestAlertBox = new AlertTextBox("Test")

//SamplePropertyLabel.size = 0.015