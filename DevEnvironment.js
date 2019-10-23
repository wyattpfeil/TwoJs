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
