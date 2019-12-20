const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class Rectangle {
    constructor(Width, Height) {
      this.name = "Rectangle" + makeName(10);
      /*this.tworect = two.makeRectangle(
        window.innerWidth / 2,
        window.innerHeight / 2,
        window.innerWidth * Width,
        window.innerHeight * Height
      );*/
      this.tworect = two.makeRoundedRectangle(window.innerWidth / 2,window.innerHeight / 2, window.innerWidth * Width, window.innerHeight * Height, 0)
      Objects[this.name] = this;
      this.position = Vector2.new(0.5, 0.5);
      this.size = Vector2.new(Width, Height);
      this.innerColor = Color3.fromRGB(255, 0, 0);
      this.outline = 0;
      this.opacity = 1;
      this.outlineColor = Color3.fromRGB(0, 0, 0);
      this.visible = true;
      this.rotation = 0
      this.bevel = 0
      this.SVGElement = document.querySelector("#two_0").childNodes[
        document.querySelector("#two_0").childNodes.length - 1
      ];
      var TotalObjectsNumber = Object.keys(Objects).length + 1
      this.layer = TotalObjectsNumber
      console.log("Layer is " + this.layer)
    }
    set position(NewPos) {
      var NewX = NewPos.x;
      var NewY = NewPos.y;
      this.tworect.translation.set(
        window.innerWidth * NewX,
        window.innerHeight * NewY
      );
      this.setPropertyAndUpdate("position", NewPos);
    }
    set outline(NewOutline) {
      this.tworect.linewidth = NewOutline;
      this.setPropertyAndUpdate("outline", NewOutline);
    }
    get outline() {
      return this._outline;
    }
    set outlineColor(NewColor) {
      this.tworect.stroke =
        "#" + Color3.rgbToHex(NewColor.red, NewColor.green, NewColor.blue);
      this.setPropertyAndUpdate("outlineColor", NewColor);
    }
    get outlineColor() {
      return this._outlineColor;
    }
    set opacity(NewOpacity) {
      this.tworect.opacity = NewOpacity;
      this.setPropertyAndUpdate("opacity", NewOpacity);
    }
    get opacity() {
      return this._opacity;
    }
    get position() {
      return this._position;
    }
    set innerColor(NewColor) {
      var r = NewColor.red;
      var g = NewColor.green;
      var b = NewColor.blue;
      this.tworect.fill = "rgba(" + r + "," + g + "," + b + ", 1)";
      this.setPropertyAndUpdate("innerColor", NewColor);
    }
    get innerColor() {
      return this._innerColor;
    }
    set size(NewSize) {
      var SizeX = window.innerWidth * NewSize.x;
      var SizeY = window.innerHeight * NewSize.y;
      this.tworect.width = SizeX;
      this.tworect.height = SizeY;
      this.setPropertyAndUpdate("size", NewSize);
    }
    get size() {
      return this._size;
    }
    set visible(NewVisibility) {
      if (NewVisibility == false) {
        this.tworect.opacity = 0;
      } else {
        this.tworect.opacity = 1;
      }
      this.setPropertyAndUpdate("visible", NewVisibility);
    }
    get visible() {
      return this._visible;
    }
    set layer(NewLayer) {
      this.setPropertyAndUpdate("layer", NewLayer);
      ReLayerObjects()
    }
    get layer() {
      return this._layer;
    }
    set rotation(NewRotation) {
      //Formula for degrees to radians is degrees * pi / 180
      this.tworect.rotation = NewRotation * Math.PI / 180
      this.setPropertyAndUpdate("rotation", NewRotation)
    }
    get rotation() {
      return this._rotation
    }
    set bevel(NewBevel) {
      this.tworect.radius = NewBevel
      this.setPropertyAndUpdate("bevel", NewBevel)
    }
    get bevel() {
      return this._bevel
    }
    destroy() {
      this.visible = false
      this.tworect.remove()
      two.update()
    }
    BringToFront() {
      document.querySelector("#two_0").appendChild(this.SVGElement);
    }
    setPropertyAndUpdate(PropName, PropValue) {
      this["_" + PropName] = PropValue;
      two.update();
    }
  }