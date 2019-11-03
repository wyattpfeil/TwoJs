class Mouse {
    static isInitialized = false;
    static MouseDownFunctions = [];
    static MouseUpFunctions = [];
    static ClickFunctions = [];
    static MouseMoveFunctions = [];
    static init() {
      document.addEventListener("mousedown", function(e) {
        Mouse.MouseDownFunctions.forEach(function(func) {
          func(e);
        });
      });
      document.addEventListener("mouseup", function(e) {
        Mouse.MouseUpFunctions.forEach(function(func) {
          func(e);
        });
      });
      document.addEventListener("click", function(e) {
        Mouse.ClickFunctions.forEach(function(func) {
          func(e);
        });
      });
      document.addEventListener("mousemove", function(e) {
        Mouse.MouseMoveFunctions.forEach(function(func) {
          func(e);
        });
      });
    }
    static get MouseDown() {
      if (Mouse.isInitialized == false) {
        Mouse.init();
        Mouse.isInitialized = true;
      }
      return {
        connect: function(func) {
          Mouse.MouseDownFunctions.push(func);
        }
      };
    }
    static get MouseUp() {
      if (Mouse.isInitialized == false) {
        Mouse.init();
        Mouse.isInitialized = true;
      }
      return {
        connect: function(func) {
          Mouse.MouseUpFunctions.push(func);
        }
      };
    }
    static get Click() {
      if (Mouse.isInitialized == false) {
        Mouse.init();
        Mouse.isInitialized = true;
      }
      return {
        connect: function(func) {
          Mouse.ClickFunctions.push(func);
        }
      };
    }
    static get MouseMove() {
      if (Mouse.isInitialized == false) {
        Mouse.init();
        Mouse.isInitialized = true;
      }
      return {
        connect: function(func) {
          Mouse.MouseMoveFunctions.push(func);
        }
      };
    }
  }