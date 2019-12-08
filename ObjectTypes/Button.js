class Button {
  constructor(Width, Height) {
    var Name = "Button" + makeName(10);
    Objects[Name] = this;
    this.rectangle = new Rectangle(Width, Height);
    this.onButtonClicked = function() {};
    document.addEventListener("click", this.click.bind(this));

    document.addEventListener("mousedown", this.mousedown.bind(this));

    document.addEventListener("mouseup", this.mouseup.bind(this));

    document.addEventListener("mousemove", this.mousemove.bind(this));

  }
  mousemove(e) {
    if (this.isPointInRectangle(e.clientX, e.clientY, this.rectangle)) {
      this.onMouseHover();
    }
  }
  click(e) {
    if (this.isPointInRectangle(e.clientX, e.clientY, this.rectangle)) {
      //Mouse Clicked
      this.onButtonClicked();
    }
  }

  mouseup(e) {
    //Mouse Up
  }
  mousedown(e) {
    if (this.isPointInRectangle(e.clientX, e.clientY, this.rectangle)) {
      //Mouse Down
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
    this.rectangle.position = NewPos;
    this.setPropertyAndUpdate("position", NewPos);
  }
  get position() {
    return this._position;
  }
  set size(NewSize) {
    this.rectangle.size = NewSize;
    this.setPropertyAndUpdate("size", NewSize);
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
  set onMouseHover(codeToRun) {
    this.setPropertyAndUpdate("onMouseHover", codeToRun);
  }
  get onMouseHover() {
    return this._onMouseHover
  }
  set innerColor(NewColor) {
    this.rectangle.innerColor = NewColor;
    this.setPropertyAndUpdate("innerColor", NewColor);
  }
  get innerColor() {
    return this._innerColor;
  }
  setPropertyAndUpdate(PropName, PropValue) {
    this["_" + PropName] = PropValue;
    two.update();
  }
}
