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
CloseButton.textSize = 0.018;
CloseButton.text = "Close Explorer";

CloseButton.onButtonClicked = function() {
    if(BackFrame.visible == true) {
        BackFrame.visible = false
        CloseButton.text = "Open Explorer"
    } else {
        BackFrame.visible = true
        CloseButton.text = "Close Explorer";
    }
};

var MouseCoordinates = new NewText("Mouse Coordinates:")


MouseCoordinates.size = 0.01
MouseCoordinates.position = Vector2.new(0.05,0.98)
MouseCoordinates.fontFamily = "sans-serif"
Mouse.MouseMove.connect(function(e){
    console.log("Mouse moved")
    var xPosInPixels = e.x
    var yPosInPixels = e.y
    MouseCoordinates.text = "Mouse Coordinates: x = " + (xPosInPixels / window.innerWidth).toFixed(2) + ", y = " + (yPosInPixels / window.window.innerHeight).toFixed(2)
})

var NewText1 = new NewText("hi")
NewText1.textColor = Color3.fromRGB(255, 0 ,0)
NewText1.size = 0.1
NewText1.position = Vector2.new(0.5,0.5)
