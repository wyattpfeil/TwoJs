var ExplorerPanel = {};
ExplorerPanel.BackFrame = new Rectangle(0.15, 1);
var BackFrame = ExplorerPanel.BackFrame;
BackFrame.position = Vector2.new(0.93, 0.5);
BackFrame.outline = 2;
BackFrame.outlineColor = Color3.fromRGB(143, 148, 156);
BackFrame.innerColor = Color3.fromRGB(255, 255, 255);
ExplorerPanel.CloseButton = new TextButton(0.05, 0.05);
var CloseButton = ExplorerPanel.CloseButton;
CloseButton.position = Vector2.new(0.82, 0.5);
CloseButton.textColor = Color3.fromRGB(255, 255, 255);
CloseButton.innerColor = Color3.fromRGB(143, 148, 156);
CloseButton.text = "Close Explorer";
CloseButton.scaleTextToButton();

CloseButton.onButtonClicked = function() {
  if (BackFrame.visible == true) {
    BackFrame.visible = false;
    CloseButton.text = "Open Explorer";
  } else {
    BackFrame.visible = true;
    CloseButton.text = "Close Explorer";
  }
};

var MouseCoordinates = new TextLabel("Mouse Coordinates:");

MouseCoordinates.size = 0.01;
MouseCoordinates.position = Vector2.new(0.05, 0.98);
MouseCoordinates.fontFamily = "sans-serif";
Mouse.MouseMove.connect(function(e) {
  var xPosInPixels = e.x;
  var yPosInPixels = e.y;
  MouseCoordinates.text =
    "Mouse Coordinates: x = " +
    (xPosInPixels / window.innerWidth).toFixed(2) +
    ", y = " +
    (yPosInPixels / window.window.innerHeight).toFixed(2);
});

var SizerToolButton = new TextButton(0.1, 0.05);
SizerToolButton.position = Vector2.new(0.93, 0.04);
SizerToolButton.innerColor = Color3.fromRGB(36, 167, 242);
SizerToolButton.textColor = Color3.fromRGB(255, 255, 255);
SizerToolButton.text = "Sizer Tool";

function EnableSizerTool(){
  var SizerToolEnabled = false;
  var Down1st = false;
  var FirstPos = Vector2.new(0, 0);
  var SecondPos = Vector2.new(0, 0);
  var Rect = null;
  SizerToolButton.onButtonClicked = function() {
    SizerToolEnabled = true;
  };
  
  Mouse.MouseDown.connect(function(e) {
    if (SizerToolEnabled == true) {
      if (Down1st == false) {
        Down1st = true;
        FirstPos = Vector2.new(
          (e.x / window.innerWidth).toFixed(2),
          (e.y / window.window.innerHeight).toFixed(2)
        );
        Rect = new Rectangle(0.01, 0.01);
        Rect.innerColor = Color3.fromRandom()
        Rect.position = FirstPos;
        console.log(FirstPos);
      }
    }
  });
  Mouse.MouseMove.connect(function(e) {
    if (SizerToolEnabled == true) {
      if (Down1st == true) {
        if (Rect != null) {
          var SizeXOfRect = (e.x / window.innerWidth).toFixed(2) - FirstPos.x
          var SizeYOfRect = (e.y / window.window.innerHeight).toFixed(2) - FirstPos.y
          Rect.size = Vector2.new(SizeXOfRect, SizeYOfRect)
          console.log(FirstPos.x + Rect.size.x)
          var FirstPosX = FirstPos.x
          var Xpos = (e.x / window.innerWidth).toFixed(2) - SizeXOfRect/2
          var Ypos = (e.y / window.innerHeight).toFixed(2) - SizeYOfRect/2
  
          Rect.position = Vector2.new(Xpos, Ypos)
        }
      }
    }
  });
  Mouse.MouseUp.connect(function(e) {
    if (SizerToolEnabled == true) {
      if (Down1st == true) {
        SecondPos = Vector2.new(
          (e.x / window.innerWidth).toFixed(2),
          (e.y / window.window.innerHeight).toFixed(2)
        );
        var DimensionLabel = new TextLabel("Width = " + Rect.size.x.toFixed(2) +  ", Height = " + Rect.size.y.toFixed(2))
        DimensionLabel.textColor = Color3.fromRGB(255, 255, 255)
        var ButtonSize = Rect.size;
        var TextBoundingSize = Vector2.new(
          (DimensionLabel.boundingBoxSize.x / window.innerWidth).toFixed(3),
          (DimensionLabel.boundingBoxSize.y / window.innerHeight).toFixed(3)
        );
        console.log(ButtonSize);
        console.log(TextBoundingSize);
        DimensionLabel.size = 0;

        function SizeDimensionLabel(){
          while(true){
            DimensionLabel.size = DimensionLabel.size + 0.001;
              var NewBoundingSizeX = (
                DimensionLabel.boundingBoxSize.x /
                window.innerWidth /
                10
              ).toFixed(3);
              var NewBoundingSizeY = (
                DimensionLabel.boundingBoxSize.y /
                window.innerHeight /
                10
              ).toFixed(3);
              if (NewBoundingSizeX >= ButtonSize.x.toFixed(3)) {
                console.log("Button size is " + ButtonSize.x);
                console.log("New text size is " + DimensionLabel.size);
                this.textSize = DimensionLabel.size / 1000;
                DimensionLabel.position = Rect.position;
                break;
              }
              if (NewBoundingSizeY >= ButtonSize.y.toFixed(3)){
                console.log("Button size is " + ButtonSize.x);
                console.log("New text size is " + DimensionLabel.size);
                this.textSize = DimensionLabel.size / 1000;
                DimensionLabel.position = Rect.position;
                break;
              }
          }
        }
        
        SizeDimensionLabel()
        DimensionLabel.size = DimensionLabel.size/ 10
        DimensionLabel.position = Rect.position
        console.log(SecondPos);
        SizerToolEnabled = false;
        Down1st = false;
        Rect = null;
      }
    }
  });  
}

EnableSizerTool()
console.log(Objects)
console.log(getAllObjects())

var TestingRect1 = new Rectangle(0.25, 0.25)
var TestingRect2 = new Rectangle(0.25, 0.25)
TestingRect1.innerColor = Color3.fromRGB(255,0,0)
TestingRect2.innerColor = Color3.fromRGB(0,255,0)
TestingRect1.BringToFront()
ReLayerObjects()
TestingRect1.layer = 15
TestingRect2.layer = 19
ReLayerObjects()