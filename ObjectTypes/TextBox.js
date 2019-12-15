class TextBox {
  constructor(Text) {
    var Name = "TextBox" + makeName(10);
    Objects[Name] = this;
    this.BackBox = new Rectangle(0.1, 0.1);
    this.BackBox.innerColor = Color3.fromRGB(255, 255, 255);
    this.TextLabel = new TextLabel(Text);
    this.TextLabel.size = 0.1;
    this.BackBox.outline = 2;
    this.visible = true
    this.onButtonClicked = function() {
      CurrentTextBox = this;
      this.BackBox.outlineColor = Color3.fromRGB(0, 189, 255);
      this.TextLabel.text = this.TextLabel.text + "|";
    };
    document.addEventListener("click", this.click.bind(this));
    //GEFLGHSDFLJDF
    //this.TextLabel.size = 0.23;
    this.text = "Insert Text Here";
    this.sizeTextToFitBox(false);
  }
  sizeTextToFitBox(Removing) {
    if (this.TextLabel.text != null) {
      var Delta;
      if (Removing == true) {
        Delta = -0.001;
      } else {
        Delta = 0.001;
      }
      var counter = 0;
      while (true) {
        counter = counter + 1;
        this.TextLabel.size = this.TextLabel.size + Delta;
        var NewBoundingSizeX = (
          this.TextLabel.boundingBoxSize.x /
          window.innerWidth /
          10
        ).toFixed(3);
        var NewBoundingSizeY = (
          this.TextLabel.boundingBoxSize.y /
          window.innerHeight /
          10
        ).toFixed(3);
        if (NewBoundingSizeX >= this.BackBox.size.x.toFixed(3)) {
          var size = this.TextLabel.size;
          this.TextLabel.size = size / 10;
          this.TextLabel.position = this.BackBox.position;
          console.log("New text size is " + this.TextLabel.size);
          break;
        } else {
        }
        if (NewBoundingSizeY >= this.BackBox.size.y.toFixed(3)) {
          var size = this.TextLabel.size;
          this.TextLabel.size = size / 10;
          this.TextLabel.position = this.BackBox.position;
          console.log("New text size is " + this.TextLabel.size);
          break;
        }
      }
    }
  }
  set size(NewSize) {
    this.BackBox.size = NewSize;
    this.TextLabel.size = NewSize.x;
    this.sizeTextToFitBox();
    this.setPropertyAndUpdate("size", NewSize);
  }
  get size() {
    return this._size;
  }
  set text(NewText) {
    this.TextLabel.text = NewText;
    this.setPropertyAndUpdate("text", NewText);
  }
  get text() {
    return this._text;
  }
  set position(NewPosition) {
    this.BackBox.position = NewPosition;
    this.TextLabel.position = NewPosition;
    this.setPropertyAndUpdate("position", NewPosition);
  }
  get position() {
    return this._position;
  }
  set rotation(NewRotation) {
    this.BackBox.rotation = NewRotation;
    this.TextLabel.rotation = NewRotation;
    this.setPropertyAndUpdate("rotation", NewRotation);
  }
  get rotation() {
    return this._rotation;
  }
  set innerColor(NewColor) {
    this.BackBox.innerColor = NewColor;
    this.setPropertyAndUpdate("innerColor", NewColor);
  }
  get innerColor() {
    return this._innerColor;
  }
  set outline(NewOutline) {
    this.BackBox.outline = NewOutline;
    this.setPropertyAndUpdate("outline", NewOutline);
  }
  get outline() {
    return this._outline;
  }
  set textColor(NewColor) {
    this.TextLabel.textColor = NewColor;
    this.setPropertyAndUpdate("textColor", NewColor);
  }
  get textColor() {
    return this._textColor;
  }
  set onTextSubmit(Code) {
    this.setPropertyAndUpdate("onTextSubmit", Code);
  }
  get onTextSubmit() {
    return this._onTextSubmit;
  }
  set visible(NewVisible) {
    this.TextLabel.visible = NewVisible;
    this.BackBox.visible = NewVisible;
    this.setPropertyAndUpdate("visible", NewVisible);
  }
  get visible() {
    return this._visible;
  }
  destroy() {
    this.visible = false;
    this.TextLabel.destroy();
    this.BackBox.destroy();
  }
  setPropertyAndUpdate(PropName, PropValue) {
    this["_" + PropName] = PropValue;
    two.update();
  }
  click(e) {
    if (this.visible == true) {
      if (this.isPointInRectangle(e.clientX, e.clientY, this.BackBox)) {
        if (CurrentTextBox == null) {
          this.onButtonClicked();
        }
      } else {
        if (CurrentTextBox != null) {
          if(CurrentTextBox == this) {
            CurrentTextBox = null;
            this.BackBox.outlineColor = Color3.fromRGB(0, 0, 0);
            var TextWithoutCursor = this.TextLabel.text.slice(0, -1);
            this.TextLabel.text = TextWithoutCursor;
            this.sizeTextToFitBox();
            this.onTextSubmit();
          }

        }
      }
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
}
