var ExplorerPanel = {}
ExplorerPanel.BackFrame = new Rectangle(0.15,1)
var BackFrame = ExplorerPanel.BackFrame
BackFrame.position = Vector2.new(0.93, 0.5)
BackFrame.outline = 2
BackFrame.outlineColor = Color3.fromRGB(143, 148, 156)
BackFrame.innerColor = Color3.fromRGB(255, 255, 255)

ExplorerPanel.CloseButton = new RaisedButton(0.05,0.05)
var CloseButton = ExplorerPanel.CloseButton
CloseButton.position = Vector2.new(0.82,0.5)

ExplorerPanel.CloseButtonText = new TextLabel("Close Explorer")
var CloseButtonText = ExplorerPanel.CloseButtonText
CloseButtonText.position = Vector2.new(0.82,0.5)
CloseButtonText.textColor = Color3.fromRGB(255,255,255)