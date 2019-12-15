class Button {
  constructor(Width, Height) {
    var Name = "Button" + makeName(10);
    Objects[Name] = this;
    this.rectangle = new Rectangle(Width, Height);
    this.onButtonClicked = function() {};
    this._isMouseDown = false
    this.visible = true
    document.addEventListener("click", this.click.bind(this));

    document.addEventListener("mousedown", this.mousedown.bind(this));

    document.addEventListener("mouseup", this.mouseup.bind(this));

    document.addEventListener("mousemove", this.mousemove.bind(this));
    this.onMouseUnhover = function() {

    }
    this.onMouseHover = function() {

    }
    this.onMouseDown = function() {

    }
    this.onMouseUp = function() {

    }
  }
  mousemove(e) {
    if(this.visible == true){
      if (this.isPointInRectangle(e.clientX, e.clientY, this.rectangle)) {
        this.onMouseHover();
      } else {
        this.onMouseUnhover()
      }
    }
  }
  click(e) {
    if(this.visible == true){
      if (this.isPointInRectangle(e.clientX, e.clientY, this.rectangle)) {
        //Mouse Clicked
        this.onButtonClicked();
      }
    }
  }

  mouseup(e) {
    //Mouse Up
    if(this.visible == true){
      if(this._isMouseDown == true) {
        this.onMouseUp()
        this._isMouseDown = false
      }
    }
  }
  mousedown(e) {
    if(this.visible == true) {
      if (this.isPointInRectangle(e.clientX, e.clientY, this.rectangle)) {
        //Mouse Down
        this.onMouseDown()
        this._isMouseDown = true
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
  set onMouseDown(codeToRun) {
    this.setPropertyAndUpdate("onMouseDown", codeToRun);
  }
  get onMouseDown() {
    return this._onMouseDown;
  }
  set onMouseUp(codeToRun) {
    this.setPropertyAndUpdate("onMouseUp", codeToRun);
  }
  get onMouseUp() {
    return this._onMouseUp;
  }
  set onMouseHover(codeToRun) {
    this.setPropertyAndUpdate("onMouseHover", codeToRun);
  }
  get onMouseHover() {
    return this._onMouseHover
  }
  set onMouseUnhover(codeToRun) {
    this.setPropertyAndUpdate("onMouseUnhover", codeToRun);
  }
  get onMouseUnhover() {
    return this._onMouseUnhover
  }
  set innerColor(NewColor) {
    this.rectangle.innerColor = NewColor;
    this.setPropertyAndUpdate("innerColor", NewColor);
  }
  get innerColor() {
    return this._innerColor;
  }
  set rotation(NewRotation) {
    this.rectangle.rotation = NewRotation
    this.setPropertyAndUpdate("rotation", NewRotation)
  }
  get rotation() {
    return this._rotation
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
  get isMouseDown() {
    return this._isMouseDown
  }
  set visible(NewVisibility) {
    this.rectangle.visible = NewVisibility
    this.setPropertyAndUpdate("visible", NewVisibility)
  }
  get visible() {
    return this._visible
  }
  destroy() {
    this.visible = false
    this.rectangle.destroy()
  }
  setPropertyAndUpdate(PropName, PropValue) {
    this["_" + PropName] = PropValue;
    two.update();
  }
}
