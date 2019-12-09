class Tween {
    static TweenVector = async function(Obj, Property, NewValue, TimeInSeconds) {
        var TimeInMilliseconds = TimeInSeconds * 1000
        var OldValueX = Obj[Property].x
        var OldValueY = Obj[Property].y
        var NewValueX = NewValue.x - OldValueX
        var NewValueY = NewValue.y - OldValueY
        var i;
        for (i = 0; i < TimeInSeconds * 100; i++) {
            Obj[Property] = Vector2.new(Obj[Property].x + (NewValueX / (TimeInSeconds * 100)), Obj[Property].y + (NewValueY / (TimeInSeconds * 100)))
            await sleep(TimeInMilliseconds / (TimeInSeconds * 100))
        }
    }
    static TweenColor = async function(Obj, Property, NewValue, TimeInSeconds) {
        var TimeInMilliseconds = TimeInSeconds * 1000
        var OldValueRed = Obj[Property].red
        var OldValueGreen = Obj[Property].green
        var OldValueBlue = Obj[Property].blue
        var NewValueRed = NewValue.red - OldValueRed
        var NewValueGreen = NewValue.green - OldValueGreen
        var NewValueBlue = NewValue.blue - OldValueBlue
        var i;
        for (i = 0; i < TimeInSeconds * 100; i++) {
            Obj[Property] = Color3.fromRGB(Obj[Property].red + (NewValueRed / (TimeInSeconds * 100)), Obj[Property].green + (NewValueGreen / (TimeInSeconds * 100)), Obj[Property].blue + (NewValueBlue / (TimeInSeconds * 100)))
            await sleep(TimeInMilliseconds / (TimeInSeconds * 100))
        }
    }
    static TweenNumber = async function(Obj, Property, NewValue, TimeInSeconds) {
        var TimeInMilliseconds = TimeInSeconds * 1000
        var OldValue = Obj[Property]
        var NewValue = NewValue - OldValue
        var i;
        for (i = 0; i < TimeInSeconds * 100; i++) {
            Obj[Property] = Obj[Property] + (NewValue / (TimeInSeconds * 100))
            await sleep(TimeInMilliseconds / (TimeInSeconds * 100))
        }
    }
}