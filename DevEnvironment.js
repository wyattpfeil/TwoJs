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
CloseButton.bevel = 10;

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
SizerToolButton.bevel = 10;
function EnableSizerTool() {
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
        Rect.innerColor = Color3.fromRandom();
        Rect.position = FirstPos;
        console.log(FirstPos);
      }
    }
  });
  Mouse.MouseMove.connect(function(e) {
    if (SizerToolEnabled == true) {
      if (Down1st == true) {
        if (Rect != null) {
          var SizeXOfRect = (e.x / window.innerWidth).toFixed(2) - FirstPos.x;
          var SizeYOfRect =
            (e.y / window.window.innerHeight).toFixed(2) - FirstPos.y;
          Rect.size = Vector2.new(SizeXOfRect, SizeYOfRect);
          console.log(FirstPos.x + Rect.size.x);
          var FirstPosX = FirstPos.x;
          var Xpos = (e.x / window.innerWidth).toFixed(2) - SizeXOfRect / 2;
          var Ypos = (e.y / window.innerHeight).toFixed(2) - SizeYOfRect / 2;

          Rect.position = Vector2.new(Xpos, Ypos);
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
        var DimensionLabel = new TextLabel(
          "Width = " +
            Rect.size.x.toFixed(2) +
            ", Height = " +
            Rect.size.y.toFixed(2)
        );
        DimensionLabel.textColor = Color3.fromRGB(255, 255, 255);
        var ButtonSize = Rect.size;
        var TextBoundingSize = Vector2.new(
          (DimensionLabel.boundingBoxSize.x / window.innerWidth).toFixed(3),
          (DimensionLabel.boundingBoxSize.y / window.innerHeight).toFixed(3)
        );
        console.log(ButtonSize);
        console.log(TextBoundingSize);
        DimensionLabel.size = 0;
        Rect.BringToFront();
        DimensionLabel.BringToFront();
        function SizeDimensionLabel() {
          while (true) {
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
            if (NewBoundingSizeY >= ButtonSize.y.toFixed(3)) {
              console.log("Button size is " + ButtonSize.x);
              console.log("New text size is " + DimensionLabel.size);
              this.textSize = DimensionLabel.size / 1000;
              DimensionLabel.position = Rect.position;
              break;
            }
          }
        }

        SizeDimensionLabel();
        DimensionLabel.size = DimensionLabel.size / 10;
        DimensionLabel.position = Rect.position;
        console.log(SecondPos);
        SizerToolEnabled = false;
        Down1st = false;
        Rect = null;
      }
    }
  });
}

EnableSizerTool();
console.log(Objects);
console.log(getAllObjects());

console.log(Objects);

var TestFolder = new Folder();
TestFolder.addChild("Test");
TestFolder.addChild("Testing");
var LoopIndex = 0;
TestFolder.forEachChild(function() {
  console.log(TestFolder.getChildByIndex(LoopIndex));
  LoopIndex = LoopIndex + 1;
});
console.log(TestFolder.getChildren());
console.log("Mouse position is " + Mouse.position);

var Image1 = new Image(
  "./santa-hat-merry-christmas-cartoon-icon-vector-10147096-removebg-preview.png"
);
Image1.rotation = 180;

var Rectangle7 = new Rectangle(0.3, 0.2);
Rectangle7.innerColor = Color3.fromRGB(245, 66, 66);
async function AsyncCode() {
  await Tween.TweenVector(Rectangle7, "size", Vector2.new(0.2, 0.2), 0.2);
  await Tween.TweenVector(Rectangle7, "position", Vector2.new(0.1, 0.2), 2);
  await Tween.TweenVector(Rectangle7, "position", Vector2.new(0.5, 0.9), 2);
  await Tween.TweenVector(Rectangle7, "position", Vector2.new(0.9, 0.5), 2);
  await Tween.TweenVector(Rectangle7, "position", Vector2.new(0.6, 0.1), 2);
  await Tween.TweenVector(Rectangle7, "position", Vector2.new(0.5, 0.5), 1);
  await Tween.TweenVector(Rectangle7, "size", Vector2.new(0, 0), 0.5);
}
async function AsyncColorCode() {
  await Tween.TweenColor(
    Rectangle7,
    "innerColor",
    Color3.fromRGB(245, 155, 66),
    3
  );
  await Tween.TweenColor(
    Rectangle7,
    "innerColor",
    Color3.fromRGB(245, 236, 66),
    3
  );
  await Tween.TweenColor(
    Rectangle7,
    "innerColor",
    Color3.fromRGB(66, 245, 84),
    3
  );
}
AsyncCode();
AsyncColorCode();
console.log(Rectangle7.tworect.rotation);
Rectangle7.rotation = 0;
Tween.TweenNumber(Rectangle7, "rotation", 500, 20);

Rectangle7.bevel = 10;

var LeftSideUi = new Rectangle(0.125, 1);
LeftSideUi.position = Vector2.new(0.0625, 0.5);
LeftSideUi.innerColor = Color3.fromRGB(94, 94, 94);

var LeftSideButton = new TextButton(0.1, 0.1);
LeftSideButton.raised = false;
LeftSideButton.innerColor = Color3.fromRGB(73, 156, 135);
LeftSideButton.textColor = Color3.fromRGB(255, 255, 255);
LeftSideButton.bevel = 10;
LeftSideButton.size = Vector2.new(0.1, 0.05);
LeftSideButton.position = Vector2.new(0.0625, 0.04);


for (i = 0; i < 10; i++) {
  var LeftSideButtonClone = LeftSideButton.clone()
  LeftSideButtonClone.position = Vector2.new(LeftSideButton.position.x, LeftSideButton.position.y + i*0.07)
}

var CoolUiBack = new Rectangle(0.2, 0.6)
CoolUiBack.innerColor = Color3.fromRGB(64, 64, 76)
var SendMeDailyEmailButton = new TextButton(0.13, 0.04)
SendMeDailyEmailButton.position = Vector2.new(0.5, 0.6)
SendMeDailyEmailButton.raised = false
SendMeDailyEmailButton.text = "Send me a daily email"
SendMeDailyEmailButton.textColor = Color3.fromRGB(255, 255, 255)
SendMeDailyEmailButton.innerColor = Color3.fromRGB(64, 64, 76)
SendMeDailyEmailButton.outlineColor = Color3.fromRGB(255, 255, 255)
SendMeDailyEmailButton.outline = 1
SendMeDailyEmailButton.bevel = 18

var NoThanksButton = new TextButton(0.13, 0.04)
NoThanksButton.position = Vector2.new(0.5, 0.66)
NoThanksButton.raised = false
NoThanksButton.text = "No, thanks"
NoThanksButton.textColor = Color3.fromRGB(255, 255, 255)
NoThanksButton.innerColor = Color3.fromRGB(64, 64, 76)
NoThanksButton.outlineColor = Color3.fromRGB(255, 255, 255)
NoThanksButton.outline = 1
NoThanksButton.bevel = 18
NoThanksButton.textSize = SendMeDailyEmailButton.textSize
NoThanksButton.textlabel.position = NoThanksButton.position

var UpperDarkerRect = new Rectangle(0.2,0.08)
UpperDarkerRect.position = Vector2.new(0.5, 0.43)
UpperDarkerRect.innerColor = Color3.fromHex("#2A2A32")

var UppestDarkestRect = new Rectangle(0.2, 0.2)
UppestDarkestRect.position = Vector2.new(0.5, 0.3)
UppestDarkestRect.innerColor = Color3.fromRGB(48, 48, 56)

var ColorBar = new Image("/Users/brianpfeil/Downloads/ColorBarNew.png")

ColorBar.size = Vector2.new(0.175,0.0615)
ColorBar.position = Vector2.new(0.5, 0.34)

var OurHelpfulEmailText = new TextLabel("Our helpful email")
OurHelpfulEmailText.size = 0.01
OurHelpfulEmailText.position = Vector2.new(0.5, 0.435)
OurHelpfulEmailText.textColor = Color3.fromRGB(255, 255, 255)

var XBar = new TextLabel("x")
XBar.size = 0.02
XBar.position = Vector2.new(0.415, 0.23)
XBar.textColor = Color3.fromRGB(255, 255, 255)