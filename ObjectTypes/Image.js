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
    setPropertyAndUpdate(PropName, PropValue) {
      this["_" + PropName] = PropValue;
      two.update();
    }
  }