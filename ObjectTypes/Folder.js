class Folder {
  constructor() {
    this.children = [];
  }
  addChild(Object) {
    this.children.push(Object);
  }
  getChildren() {
    return this.children;
  }
  getChildByIndex(Index){
      return this.children[Index]
  }
  forEachChild(CodeToRun) {
    this.children.forEach(function(child) {
      CodeToRun()
    });
  }
  get Objects(){
      return this.children
  }
}
