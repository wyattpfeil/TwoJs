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
  var CreatedRect = new Rectangle(0.1, 0.1);
  CreatedRect.innerColor = Color3.fromRGB(255, 255, 255);
  AllObjects.push(CreatedRect);
};

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
      if(isPointInRectangle(e.clientX, e.clientY, Obj)) {
          console.log("Clicked in rect!")
      }
    }
  });
});
