class TextButton {
    constructor(Width, Height) {
      var Name = "TextButton" + makeName(10);
      Objects[Name] = this;
      this.rectangle = new Rectangle(Width, Height);
      this.backtangle = new Rectangle(Width, Height);
      this.textlabel = new TextLabel("Button");
      this.size = Vector2.new(Width, Height);
      this.raised = true
      this.visible = true
      this.textColor = Color3.fromRGB(0, 0, 0)
      this.innerColor = Color3.fromRGB(255, 255, 255)
      this.bevel = 0
      this.onlyTextVisible = false
      this.outline = 0
      this.outlineColor = Color3.fromRGB(0, 0, 0)
      this.setRectangleToBacktangle(this.rectangle, this.backtangle);
      var TotalObjectsNumber = Object.keys(Objects).length + 1
      this.layer = TotalObjectsNumber
      this.backtangle.opacity = 0.5;
      this.onButtonClicked = function() {};
      document.addEventListener("click", this.click.bind(this));
  
      document.addEventListener("mousedown", this.mousedown.bind(this));
  
      document.addEventListener("mouseup", this.mouseup.bind(this));
  }
    setRectangleToBacktangle(Rectangle, Backtangle) {
      if(this.raised == true) {
        Rectangle.position = Vector2.new(
          Backtangle.position.x,
          Backtangle.position.y - this.size.y / 10
        );
        Rectangle.size = Backtangle.size;
        this.textlabel.position = Rectangle.position;
        Rectangle.innerColor = Backtangle.innerColor;
      } else {
        Rectangle.position = Vector2.new(
          Backtangle.position.x,
          Backtangle.position.y
        );
        Rectangle.size = Backtangle.size;
        this.textlabel.position = Rectangle.position;
        Rectangle.innerColor = Backtangle.innerColor;
      }
    }
    click(e) {
      if (this.isPointInRectangle(e.clientX, e.clientY, this.rectangle)) {
        if(this.visible == true) {
          this.onButtonClicked();
        }
      }
    }
    mouseup(e) {
      if (this.rectangle.position == this.backtangle.position) {
        /*this.rectangle.position = Vector2.new(
          this.backtangle.position.x,
          this.backtangle.position.y - this.size.y / 10
        );*/
        this.setRectangleToBacktangle(this.rectangle, this.backtangle);
      }
    }
    mousedown(e) {
      if (this.isPointInRectangle(e.clientX, e.clientY, this.rectangle)) {
        this.rectangle.position = this.backtangle.position;
        this.textlabel.position = this.rectangle.position;
      }
    }
    mousemove(e) {
      if (this.isPointInRectangle(e.clientX, e.clientY, this.rectangle)) {
        this.onMouseHover();
      }
    }
    isPointInRectangle(X, Y, Rectangle) {
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
  
    set position(NewPos) {
      this.backtangle.position = NewPos;
      this.setRectangleToBacktangle(this.rectangle, this.backtangle);
      this.setPropertyAndUpdate("position", NewPos);
    }
    get position() {
      return this._position;
    }
    set size(NewSize) {
      this.setPropertyAndUpdate("size", NewSize);
      this.backtangle.size = NewSize;
      this.setRectangleToBacktangle(this.rectangle, this.backtangle);
      this.scaleTextToButton();
    }
    get size() {
      return this._size;
    }
    set onButtonClicked(codeToRun) {
      this.setPropertyAndUpdate("onButtonClicked", codeToRun);
    }
    get onButtonClicked() {
      return this._onButtonClicked;
    }
    set innerColor(NewColor) {
      this.backtangle.innerColor = NewColor;
      this.setRectangleToBacktangle(this.rectangle, this.backtangle);
      this.setPropertyAndUpdate("innerColor", NewColor);
    }
    get innerColor() {
      return this._innerColor;
    }
    set textSize(NewSize) {
      this.textlabel.size = NewSize;
      this.setPropertyAndUpdate("textSize", NewSize);
    }
    get textSize() {
      return this._textSize;
    }
    set textColor(NewColor) {
      this.textlabel.textColor = NewColor;
      this.setPropertyAndUpdate("textColor", NewColor);
    }
    get textColor() {
      return this._textColor;
    }
    set text(NewText) {
      this.textlabel.text = NewText;
      this.scaleTextToButton();
      this.setPropertyAndUpdate("text", NewText);
    }
    get text() {
      return this._text;
    }
    set raised(NewRaised) {
      this.setPropertyAndUpdate("raised", NewRaised)
      this.setRectangleToBacktangle(this.rectangle, this.backtangle)
    }
    get raised() {
      return this._raised
    }
    set layer(NewLayer) {
      this.setPropertyAndUpdate("layer", NewLayer);
      ReLayerObjects()
    }
    get layer() {
      return this._layer
    }
    set rotation(NewRotation) {
      this.backtangle.rotation = NewRotation
      this.rectangle.rotation = NewRotation
      this.textlabel.rotation = NewRotation
      this.setPropertyAndUpdate("rotation", NewRotation)
    }
    get rotation() {
      return this._rotation
    }
    set bevel(NewBevel) {
      this.backtangle.bevel = NewBevel
      this.rectangle.bevel = NewBevel
      this.setPropertyAndUpdate("bevel", NewBevel)
    }
    get bevel() {
      return this._bevel
    }
    set outline(NewOutline) {
      this.rectangle.outline = NewOutline
      this.setPropertyAndUpdate("outline", NewOutline)
    }
    get outline() {
      return this._outline
    }
    set outlineColor(NewOutlineColor) {
      this.rectangle.outlineColor = NewOutlineColor
      this.setPropertyAndUpdate("outlineColor", NewOutlineColor)
    }
    get outlineColor() {
      return this._outlineColor
    }
    set onMouseHover(codeToRun) {
      this.setPropertyAndUpdate("onMouseHover", codeToRun);
    }
    get onMouseHover() {
      return this._onMouseHover
    }
    set visible(NewVisibility) {
      this.rectangle.visible = NewVisibility
      this.backtangle.visible = NewVisibility
      this.textlabel.visible = NewVisibility
      this.setPropertyAndUpdate("visible", NewVisibility);
    }
    get visible() {
      return this._visible
    }
    set onlyTextVisible(NewOnlyTextVisible) {
      if(NewOnlyTextVisible == true) {
        this.textlabel.visible = true
        this.rectangle.visible = false
        this.backtangle.visible = false
      } else {
        this.textlabel.visible = true
        this.rectangle.visible = true
        this.backtangle.visible = true
      }
      this.setPropertyAndUpdate("onlyTextVisible", NewOnlyTextVisible);
    }
    get onlyTextVisible() {
      return this._onlyTextVisible
    }
    destroy() {
      this.visible = false
      this.rectangle.destroy()
      this.backtangle.destroy()
      this.textlabel.destroy()
    }
    clone() {
      var ClonedButton = new TextButton(this.size.x, this.size.y)
      ClonedButton.position = this.position
      ClonedButton.size = this.size
      ClonedButton.innerColor = this.innerColor
      ClonedButton.raised = this.raised
      ClonedButton.textSize = this.textSize
      ClonedButton.textColor = this.textColor
      ClonedButton.bevel = this.bevel
      //ClonedButton.text = this._text
     /* ClonedButton.size = this.size
      ClonedButton.innerColor = this.innerColor
      ClonedButton.rotation = this.rotation
      ClonedButton.raised = this.raised
      ClonedButton.textSize = this.textSize
      ClonedButton.textColor = this.textColor
      ClonedButton.text = this.text
      ClonedButton.bevel = this.bevel*/
      return ClonedButton
    }
    BringToFront() {
      if(this.backtangle != null) {
        document.querySelector("#two_0").appendChild(this.backtangle.SVGElement)
        document.querySelector("#two_0").appendChild(this.rectangle.SVGElement)
        document.querySelector("#canvasarea > svg").appendChild(this.textlabel.TextLabel);
      }
    }
    scaleTextToButton() {
      var ButtonSize = this.rectangle.size;
      var TextBoundingSize = Vector2.new(
        (this.textlabel.boundingBoxSize.x / window.innerWidth).toFixed(3),
        (this.textlabel.boundingBoxSize.y / window.innerHeight).toFixed(3)
      );
      console.log(ButtonSize);
      console.log(TextBoundingSize);
      this.textlabel.size = 0;
      var i;
  
      while (true) {
        this.textlabel.size = this.textlabel.size + 0.001;
        var NewBoundingSizeX = (
          this.textlabel.boundingBoxSize.x /
          window.innerWidth /
          10
        ).toFixed(3);
        var NewBoundingSizeY = (
          this.textlabel.boundingBoxSize.y /
          window.innerHeight /
          10
        ).toFixed(3);
        if (NewBoundingSizeX >= ButtonSize.x.toFixed(3)) {
          console.log("Button size is " + ButtonSize.x);
          console.log("New text size is " + this.textlabel.size);
          this.textSize = this.textlabel.size / 10;
          this.textlabel.position = this.rectangle.position;
          break;
        }
        if (NewBoundingSizeY >= ButtonSize.y.toFixed(3)) {
          console.log("Button size is " + ButtonSize.x);
          console.log("New text size is " + this.textlabel.size);
          this.textSize = this.textlabel.size / 10;
          this.textlabel.position = this.rectangle.position;
          break;
        }
      }
      this.textSize = this.textlabel.size - this.textlabel.size/10
      this.textlabel.position = this.rectangle.position;
    }
    setPropertyAndUpdate(PropName, PropValue) {
      this["_" + PropName] = PropValue;
      two.update();
    }
  }