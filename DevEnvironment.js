var ExplorerPanel = {}
ExplorerPanel.BackFrame = new Rectangle(0.15,1)
var BackFrame = ExplorerPanel.BackFrame
BackFrame.position = Vector2.new(0.93, 0.5)
BackFrame.outline = 2
BackFrame.outlineColor = Color3.fromRGB(143, 148, 156)
BackFrame.innerColor = Color3.fromRGB(255, 255, 255)

ExplorerPanel.CloseButton = new RaisedButton(0.1,0.1)
var CloseButton = ExplorerPanel.CloseButton