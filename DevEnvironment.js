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

var MouseCoordinates = new TextLabel("Mouse Coordinates:")
MouseCoordinates.position = Vector2.new(0.07,0.95)

Mouse.MouseMove.connect(function(e){
    var xPosInPixels = e.x
    var yPosInPixels = e.y
    MouseCoordinates.text = "Mouse Coordinates: x = " + (xPosInPixels / window.innerWidth).toFixed(2) + ", y = " + (yPosInPixels / window.window.innerHeight).toFixed(2)
})