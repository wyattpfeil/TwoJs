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

var Backround = new Rectangle(1, 1);
Backround.innerColor = Color3.fromRGB(56, 56, 56);

var ToolboxBack = new Rectangle(0.15, 1);
ToolboxBack.position = Vector2.new(0.925, 0.5);
ToolboxBack.innerColor = Color3.fromRGB(66, 66, 66);

var SelectToolEnabled = false;
var SelectToolButton = new TextButton(0.2, 0.2);
SelectToolButton.innerColor = Color3.fromRGB(115, 115, 115);
SelectToolButton.size = Vector2.new(0.1, 0.05);
SelectToolButton.position = Vector2.new(0.925, 0.05);
SelectToolButton.textColor = Color3.fromRGB(255, 255, 255);
SelectToolButton.bevel = 10;
SelectToolButton.onButtonClicked = function() {
  SelectToolEnabled = true;
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

function createDraggingTool(Obj) {
  var Draggers = [];
  var MouseInRect = false;
  var ResetPos;
  var Offset = 0.0075
  Mouse.MouseMove.connect(function(e) {
    if (MouseInRect == true) {
      var XMousePos = (e.x / window.innerWidth)
     // console.log(XMousePos)
      //console.log((XMousePos + Obj.position.x - XMousePos))
      Obj.position = Vector2.new(
        (XMousePos),
        (e.y / window.innerHeight)
      );
      //Obj.position = Vector2.new(XMousePos + (XMousePos - Obj.position.x ), Obj.position.y)
    }
    if (NoDragersBeingClicked == true) {
      ResetPos = Vector2.new(Obj.position.x + Obj.size.x/2 - Offset, Obj.position.y + Obj.size.y/2 - Offset);
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
        MouseMoveCode(e, ResetPos);
      }
    });
    // Dragger.position = Position;
  }
  var LeftDragger = new Button(0.01, 0.01);
 
  CreateDragger(
    LeftDragger,
    Vector2.new(Obj.position.x - Obj.size.x / 2 - Offset, Obj.position.y),
    function(e, ObjPos) {
      
      var MouseXPos = e.x / window.innerWidth;
      
      if (MouseXPos < Obj.position.x + Obj.size.x / 2 - Offset) {
          var DifferenceX = ObjPos.x - MouseXPos;
          //console.log("DifferenceX = " + DifferenceX + ", ObjPos.x = " + ObjPos.x + ", MouseXPos = " + MouseXPos + ", Obj.Size.x = " + Obj.size.x)
          
          Obj.size = Vector2.new(DifferenceX, Obj.size.y);
          Obj.position = Vector2.new(
            ObjPos.x - (DifferenceX) / 2 + Offset,
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

  /*var RightDragger = new Button(0.01, 0.01);
    CreateDragger(
      RightDragger,
      Vector2.new(Obj.position.x + Obj.size.x / 2 + 0.0075, Obj.position.y),
      function(e) {
        var MouseXPos = e.x / window.innerWidth;
        if (MouseXPos > Obj.position.x - Obj.size.x / 2 - 0.0075) {
          var DifferenceX = MouseXPos - ObjPosition.x;
          Obj.size = Vector2.new(DifferenceX, Obj.size.y);
          Obj.position = Vector2.new(
            ObjPosition.x + DifferenceX / 2 + 0.0075,
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
    );*/
  var TopDragger = new Button(0.01, 0.01);
  CreateDragger(
    TopDragger,
    Vector2.new(Obj.position.x, Obj.position.y - Obj.size.y / 2 - Offset),
    function(e, ObjPos) {
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
  return Draggers;
}

Mouse.MouseDown.connect(function(e) {
  //if (SelectToolEnabled == true) {
  AllObjects.forEach(Obj => {
    if (Obj.position != null && Obj.size != null) {
      var ObjectPosition = Obj.position;
      var ObjectSize = Obj.size;
      if (isPointInRectangle(e.clientX, e.clientY, Obj)) {
        //console.log("Clicked in rect!");
        GlobalDraggers.forEach(function(draggerData) {
          draggerData[0].destroy();
        });
        var Draggers = createDraggingTool(Obj);
        GlobalDraggers = Draggers;
        SelectToolEnabled = false;
      }
    }
  });
  //}
});