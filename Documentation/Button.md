A button is an object that is used for user input. Functions can be connected to button events in order for the user to have control over an aspect on the page.

 - [Creation](#creation)
 - [Properties](#properties)
 - [Events](#events)

# <a name="creation"></a> Creation
To create a button, you must specify the desired width and height.

**Constructor**
 - Width (Float from 0-1)
 - Height (Float from 0-1)

```javascript
var Button = new Button(0.1, 0.1)
```

Code Sample 1 shows the creation of a button that has a height of 10% of the window and a width of 10% of the window.

**NOTE: When created, the width and height values are _NOT_ to be specified as Vector2 values.**

***

# <a name="properties"></a> Properties
 - [position](#position)
 - [size](#size)
 - [innerColor](#innerColor)
 - [rotation](#rotation)
***
## <a name="position"></a> position (Get/Set)

**Returns the position of the button as a Vector2 value.**

```javascript
Button.position = Vector2.new(0.5, 0.5)
```
Code Sample 1 positions the button to the center of the window.

```javascript
console.log(Button.position)
```
Code Sample 2 prints the position of the button.

***

## <a name="size"></a> size (Get/Set)

**Returns the size of the button as a Vector2 value.**

```javascript
Button.size = Vector2.new(0.1, 0.1)
```
Code Sample 1 sets the size of the button to 10% of the windows width and 10% of the windows height.

```javascript
console.log(Button.size)
```
Code Sample 2 prints the size of the button to the console.

***

## <a name="rotation"></a> rotation (Get/Set)
**Returns the rotation of the button as a number.**
```javascript
Button.rotation = 180
```
Code sample 1 flips the button upsidedown.

```javascript
console.log(Button.rotation)
```
Code Sample 2 prints the rotation of the button to the console.

***

## <a name="innerColor"></a> innerColor (Get/Set)
**Returns the color of the button as a Color3 value.**
```javascript
Button.innerColor = Color3.fromRGB(255, 0, 0)
```
Code sample 1 sets the color of the button to red.

```javascript
console.log(Button.innerColor)
```
Code Sample 2 prints the color of the button to the console.

***
# <a name="events"></a> Events
 - [onButtonClicked](#onButtonClicked)
 - [onMouseHover](#onMouseHover)
***
## <a name="onButtonClicked"></a> onButtonClicked

**Fires when the user clicks their mouse while it is over the button.**

```javascript
Button.onButtonClicked = function() {
    console.log("Button Clicked!")
}
```
Sample 1 prints "Button Clicked!" when the user clicks the button.
***
## <a name="onMouseHover"></a> onMouseHover

**Fires when the user moves their mouse over the button.**

```javascript
Button.onMouseHover = function() {
    console.log("Mouse Hovered!")
}
```
Sample 1 prints "Mouse Hovered!" when the user hovers over the button.
***
