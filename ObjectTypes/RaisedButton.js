class RaisedButton {
    constructor(Width, Height) {
      var Name = "RaisedButton" + makeName(10);
      Objects[Name] = this;
      this.rectangle = new Rectangle(Width, Height);
      this.backtangle = new Rectangle(Width, Height);
      this.size = Vector2.new(Width, Height);
      this.setRectangleToBacktangle(this.rectangle, this.backtangle);
      this.backtangle.opacity = 0.5;
      this.onButtonClicked = function() {};
      document.addEventListener("click", this.click.bind(this));
  
      document.addEventListener("mousedown", this.mousedown.bind(this));
  
      document.addEventListener("mouseup", this.mouseup.bind(this));
    }
  
    setRectangleToBacktangle(Rectangle, Backtangle) {
      Rectangle.position = Vector2.new(
        Backtangle.position.x,
        Backtangle.position.y - this.size.y / 10
      );
      Rectangle.size = Backtangle.size;
      Rectangle.innerColor = Backtangle.innerColor;
    }
    click(e) {
      if (this.isPointInRectangle(e.clientX, e.clientY, this.rectangle)) {
        this.onButtonClicked();
      }
    }
    mouseup(e) {
      if (this.rectangle.position == this.backtangle.position) {
        this.rectangle.position = Vector2.new(
          this.backtangle.position.x,
          this.backtangle.position.y - this.size.y / 10
        );
      }
    }
    mousedown(e) {
      if (this.isPointInRectangle(e.clientX, e.clientY, this.rectangle)) {
        this.rectangle.position = this.backtangle.position;
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
    set rotation(NewRotation) {
      console.log("Set rotation")
      this.rectangle.rotation = NewRotation
      this.backtangle.rotation = NewRotation
      this.setPropertyAndUpdate("rotation", NewRotation)
    }
    get rotation() {
      return this._rotation
    }
    setPropertyAndUpdate(PropName, PropValue) {
      this["_" + PropName] = PropValue;
      two.update();
    }
  }