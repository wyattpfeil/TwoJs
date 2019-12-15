class TextLabel {
    constructor(text) {
      var Name = "TextLabel" + makeName(10);
      Objects[Name] = this;
      this.TextLabel = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      this.TextLabel.textContent = text;
      document.querySelector("#two_0").appendChild(this.TextLabel);
      this.size = 0.1;
      this.position = Vector2.new(0.5, 0.5);
      this.fontFamily = "sans-serif";
      this.visible = true
    }
    set text(NewText) {
      this.TextLabel.textContent = NewText;
      this.setPropertyAndUpdate("text", NewText);
    }
    get text() {
      return this._text;
    }
    set size(NewSize) {
      this.TextLabel.setAttributeNS(null, "font-size", NewSize * 100 + "vw");
      this.setPropertyAndUpdate("size", NewSize);
    }
    get size() {
      return this._size;
    }
    set position(NewPosition) {
      var PosX = NewPosition.x;
      var PosY = NewPosition.y;
      this.TextLabel.setAttributeNS(
        null,
        "x",
        (window.innerWidth * PosX - this.boundingBoxSize.x / 2).toString()
      );
      this.TextLabel.setAttributeNS(
        null,
        "y",
        (window.innerHeight * PosY + this.boundingBoxSize.y / 4).toString()
      );
      this.setPropertyAndUpdate("position", NewPosition);
    }
    get position() {
      return this._position;
    }
    set textColor(NewColor) {
      var SVGColor =
        "#" + Color3.rgbToHex(NewColor.red, NewColor.green, NewColor.blue);
      this.TextLabel.setAttributeNS(null, "fill", SVGColor);
      this.setPropertyAndUpdate("textColor", NewColor);
    }
    get textColor() {
      return this._textColor;
    }
    set fontFamily(NewFontFamily) {
      this.TextLabel.setAttributeNS(null, "font-family", NewFontFamily);
      this.setPropertyAndUpdate("fontFamily", NewFontFamily);
    }
    get fontFamily() {
      return this._fontFamily;
    }
    get boundingBoxSize() {
      var bbox = this.TextLabel.getBBox();
      var width = bbox.width;
      var height = bbox.height;
      return Vector2.new(width, height);
    }
    set layer(NewLayer) {
      this.setPropertyAndUpdate("layer", NewLayer)
      ReLayerObjects()
    }
    get layer() {
      return this._layer
    }
    set rotation(NewRotation) {
      var bbox = this.TextLabel.getBBox();
      var cx = bbox.x + bbox.width/2;
      var cy = bbox.y + bbox.height/2;
      this.TextLabel.setAttribute("transform", "rotate(" + NewRotation + "," + cx + "," + cy + ")")
      this.setPropertyAndUpdate("rotation", NewRotation)
    }
    get rotation() {
      return this._rotation
    }
    set visible(NewVisibility) {
      if(NewVisibility == true) {
        this.TextLabel.setAttribute("visibility", "visible")
      } else {
        this.TextLabel.setAttribute("visibility", "hidden")
      }
      this.setPropertyAndUpdate("visible", NewVisibility)
    }
    get visible() {
      return this._visible
    }
    destroy() {
      this.visible = false
      if(this.TextLabel.parentNode) {
        this.TextLabel.parentNode.removeChild(this.TextLabel);
      }
      
    }
    BringToFront() {
      document.querySelector("#two_0").appendChild(this.TextLabel);
    }
    setPropertyAndUpdate(PropName, PropValue) {
      this["_" + PropName] = PropValue;
      two.update();
    }
  }