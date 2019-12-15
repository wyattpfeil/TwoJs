var AllObjects = [];
var Backround = new Rectangle(1, 1);
Backround.innerColor = Color3.fromRGB(56, 56, 56);

var ToolboxBack = new Rectangle(0.15, 1);
ToolboxBack.position = Vector2.new(0.925, 0.5);
ToolboxBack.innerColor = Color3.fromRGB(66, 66, 66);

var TestCreationButton = new TextButton(0.2, 0.2);
TestCreationButton.innerColor = Color3.fromRGB(115, 115, 115);
TestCreationButton.size = Vector2.new(0.1, 0.05);
TestCreationButton.position = Vector2.new(0.925, 0.05);
TestCreationButton.textColor = Color3.fromRGB(255, 255, 255);
TestCreationButton.bevel = 10;

var CreateRectangleButton = new TextButton(0.2, 0.2);
CreateRectangleButton.innerColor = Color3.fromRGB(115, 115, 115);
CreateRectangleButton.size = Vector2.new(0.1, 0.05);
CreateRectangleButton.position = Vector2.new(0.925, 0.125);
CreateRectangleButton.textColor = Color3.fromRGB(255, 255, 255);
CreateRectangleButton.bevel = 10;
CreateRectangleButton.text = "Rectangle";
CreateRectangleButton.onButtonClicked = function() {
  console.log("Clicked!");
  var CreatedRect = new Rectangle(0.1, 0.1);
  CreatedRect.innerColor = Color3.fromRGB(255, 255, 255);
  AllObjects.push(CreatedRect);
};

function createDraggingTool(Obj, On) {
  var Draggers = [];
  if (On == true) {
    Mouse.MouseMove.connect(function(e) {
      UpdateDraggerPositions();
    });
    var ObjPosition = Obj.position;
    var ObjSize = Obj.size;
    
    function UpdateDraggerPositions() {
      Draggers.forEach(function(draggerData) {
        draggerData[3]();
      });
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
          MouseMoveCode(e);
        }
      });
      // Dragger.position = Position;
    }
    var LeftDragger = new Button(0.01, 0.01);
    CreateDragger(
      LeftDragger,
      Vector2.new(Obj.position.x - Obj.size.x / 2 - 0.0075, Obj.position.y),
      function(e) {
        var MouseXPos = e.x / window.innerWidth;
        if (MouseXPos < Obj.position.x + Obj.size.x / 2 - 0.0075) {
          var DifferenceX = ObjPosition.x - MouseXPos;
          Obj.size = Vector2.new(DifferenceX, Obj.size.y);
          Obj.position = Vector2.new(
            ObjPosition.x - DifferenceX / 2 + 0.0075,
            Obj.position.y
          );
          LeftDragger.position = Vector2.new(
            Obj.position.x - Obj.size.x / 2 - 0.0075,
            Obj.position.y
          );
        } else {
        }
      },
      function() {
        LeftDragger.position = Vector2.new(
          Obj.position.x - Obj.size.x / 2 - 0.0075,
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
      Vector2.new(Obj.position.x, Obj.position.y - Obj.size.y / 2 - 0.0075),
      function(e) {
        var MouseYPos = e.y / window.innerHeight;
        if (MouseYPos < Obj.position.y + Obj.size.y / 2 - 0.0075) {
          var DifferenceY = ObjPosition.y - MouseYPos;
          Obj.size = Vector2.new(Obj.size.x, DifferenceY);
          Obj.position = Vector2.new(
            Obj.position.x,
            ObjPosition.y - DifferenceY / 2 + 0.0075
          );
          TopDragger.position = Vector2.new(
            Obj.position.x,
            Obj.position.y - Obj.size.y / 2 - 0.0075
          );
        } else {
        }
      },
      function() {
        TopDragger.position = Vector2.new(
          Obj.position.x,
          Obj.position.y - Obj.size.y / 2 - 0.0075
        );
      }
    );
  } else {
    Draggers.forEach(function(draggerData) {
      draggerData[0].destroy();
    });
  }
  return Draggers
}

var TestRect = new Rectangle(0.1, 0.1);
var Draggers = createDraggingTool(TestRect, true);

var TestButton = new TextButton(0.1, 0.1)
TestButton.position = Vector2.new(0.1, 0.1)
TestButton.onButtonClicked = function() {
  Draggers.forEach(function(draggerData) {
    draggerData[0].visible = false
  });
}
Mouse.MouseDown.connect(function(e) {
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
  AllObjects.forEach(Obj => {
    if (Obj.position != null && Obj.size != null) {
      var ObjectPosition = Obj.position;
      var ObjectSize = Obj.size;
      if (isPointInRectangle(e.clientX, e.clientY, Obj)) {
        console.log("Clicked in rect!");
      }
    }
  });
});
