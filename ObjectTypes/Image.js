var LastScriptLoaded = true;
class Image {
  constructor(Image) {
    var Name = "Image" + makeName(10);
    Objects[Name] = this;
    var svgCanvas = document.querySelector("#canvasarea > svg");
    var twoCanvas = document.querySelector("#two_0");
    this.Img = document.createElementNS("http://www.w3.org/2000/svg", "image");
    this.Img.setAttributeNS("http://www.w3.org/1999/xlink", "href", Image);
    this.Img.setAttributeNS(null, "width", "200");
    this.Img.setAttributeNS(null, "height", "200");
    this.Img.setAttribute("preserveAspectRatio", "none");
    this.visible = true
    twoCanvas.appendChild(this.Img);
    var TotalObjectsNumber = Object.keys(Objects).length + 1;
    this.layer = TotalObjectsNumber;
  }
  set size(NewSize) {
    var SizeX = window.innerWidth * NewSize.x;
    var SizeY = window.innerHeight * NewSize.y;
    this.Img.setAttributeNS(null, "width", SizeX.toString());
    this.Img.setAttributeNS(null, "height", SizeY.toString());
    this.setPropertyAndUpdate("size", NewSize);
  }
  get size() {
    return this._size;
  }
  set position(NewPosition) {
    var PositionX = window.innerWidth * (NewPosition.x - this.size.x / 2);
    var PositionY = window.innerHeight * (NewPosition.y - this.size.y / 2);
    this.Img.setAttributeNS(null, "x", PositionX.toString());
    this.Img.setAttributeNS(null, "y", PositionY.toString());
    this.setPropertyAndUpdate("position", NewPosition);
  }
  get position() {
    return this._position;
  }
  set rotation(NewRotation) {
    var bbox = this.Img.getBBox();
    var cx = bbox.x + bbox.width / 2;
    var cy = bbox.y + bbox.height / 2;
    this.Img.setAttribute(
      "transform",
      "rotate(" + NewRotation + "," + cx + "," + cy + ")"
    );
    this.setPropertyAndUpdate("rotation", NewRotation);
  }
  get rotation() {
    return this._rotation;
  }
  set layer(NewLayer) {
    this.setPropertyAndUpdate("layer", NewLayer);
    ReLayerObjects();
  }
  get layer() {
    return this._layer;
  }
  set visible(NewVisibility) {
    if (NewVisibility == true) {
      this.Img.setAttribute("visibility", "visible");
    } else {
      this.Img.setAttribute("visibility", "hidden");
    }
    this.setPropertyAndUpdate("visible", NewVisibility);
  }
  get visible() {
    return this._visible;
  }
  destroy() {
    this.visible = false
  }
  setPropertyAndUpdate(PropName, PropValue) {
    this["_" + PropName] = PropValue;
    two.update();
  }
}
