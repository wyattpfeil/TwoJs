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
    BringToFront() {
      document.querySelector("#two_0").appendChild(this.TextLabel);
    }
    setPropertyAndUpdate(PropName, PropValue) {
      this["_" + PropName] = PropValue;
      two.update();
    }
  }