var LastScriptLoaded = true
class Image {
    constructor(Image) {
      var Name = "Image" + makeName(10);
      Objects[Name] = this;
      var svgCanvas = document.querySelector("#canvasarea > svg");
      this.Img = document.createElementNS("http://www.w3.org/2000/svg", "image");
      this.Img.setAttributeNS("http://www.w3.org/1999/xlink", "href", Image);
      this.Img.setAttributeNS(null, "width", "200");
      this.Img.setAttributeNS(null, "height", "200");
      this.Img.setAttribute("preserveAspectRatio", "none");
      svgCanvas.appendChild(this.Img);
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
      var PositionX = window.innerWidth * NewPosition.x;
      var PositionY = window.innerHeight * NewPosition.y;
      this.Img.setAttributeNS(null, "x", PositionX.toString());
      this.Img.setAttributeNS(null, "y", PositionY.toString());
      this.setPropertyAndUpdate("position", NewPosition);
    }
    get position() {
      return this._position;
    }
    set rotation(NewRotation) {
      var bbox = this.Img.getBBox();
      var cx = bbox.x + bbox.width/2;
      var cy = bbox.y + bbox.height/2;
      this.Img.setAttribute("transform", "rotate(" + NewRotation + "," + cx + "," + cy + ")")
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