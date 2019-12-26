//To bundle run: node bundler.js
const fs = require('fs');

var fullFile = ""

var files = ["Two.js","ObjectTypes/Tween.js","ObjectTypes/Mouse.js","ObjectTypes/Rectangle.js","ObjectTypes/Button.js","ObjectTypes/RaisedButton.js","ObjectTypes/TextLabel.js","ObjectTypes/TextButton.js","ObjectTypes/TextBox.js","ObjectTypes/Image.js","ObjectTypes/Folder.js","ObjectTypes/AlertTextBox.js","index.js"]

files.forEach(function(fileName){
    var contents = fs.readFileSync("./" + fileName,'utf8')
    fullFile = fullFile + "\n" + contents
})

fs.writeFile('TwoJsBundle.js', fullFile, (err) => {
    if (err) throw err;
    console.log('Bundled!');
});