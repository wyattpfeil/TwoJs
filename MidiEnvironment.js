(async () => {
  const midi = new Midi();
  const track = midi.addTrack();
  track
    .addNote({
      midi: 60,
      time: 0,
      duration: 0.2
    })
    .addNote({
      name: "C5",
      time: 0.3,
      duration: 0.1
    })
    .addCC({
      number: 64,
      value: 127,
      time: 0.2
    });

  console.log(track);
  var data = midi.toJSON();
  const url = "https://midi-downloader.glitch.me/download";
  console.log(JSON.stringify(data, null, 2));
  //$.post(url, data, null, 'json')

  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });

  const responseContents = await response.text();
  console.log(responseContents)

  var MidiToNames = [
    "A0",
    "A#0",
    "B0",
    "C1",
    "C#1",
    "D1",
    "D#1",
    "E1",
    "F1",
    "F#1",
    "G1",
    "G#1",
    "A1",
    "A#1",
    "B1",
    "C2",
    "C#2",
    "D2",
    "D#2",
    "E2",
    "F2",
    "F#2",
    "G2",
    "G#2",
    "A2",
    "A#2",
    "B2",
    "C3",
    "C#3",
    "D3",
    "D#3",
    "E3",
    "F3",
    "F#3",
    "G3",
    "G#3",
    "A3",
    "A#3",
    "B3",
    "C4",
    "C#4",
    "D4",
    "D#4",
    "E4",
    "F4",
    "F#4",
    "G4",
    "G#4",
    "A4",
    "A#4",
    "B4",
    "C5",
    "C#5",
    "D5",
    "D#5",
    "E5",
    "F5",
    "F#5",
    "G5",
    "G#5",
    "A5",
    "A#5",
    "B5",
    "C6",
    "C#6",
    "D6",
    "D#6",
    "E6",
    "F6",
    "F#6",
    "G6",
    "G#6",
    "A6",
    "A#6",
    "B6",
    "C7",
    "C#7",
    "D7",
    "D#7",
    "E7",
    "F7",
    "F#7",
    "G7",
    "G#7",
    "A7",
    "A#7",
    "B7",
    "C8"
  ];

  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

  function onMIDISuccess(midiAccess) {
    for (var input of midiAccess.inputs.values()) {
      input.onmidimessage = getMIDIMessage;
    }
  }

  function onMIDIFailure() {
    warn("Could not access your MIDI devices.");
  }

  var NoteText = new TextLabel("Note: ");
  NoteText.textColor = Color3.fromRGB(52, 158, 235);
  var Notes = {};
  var LastNotePosition = Vector2.new(0.1, 0.75);

  function CreateNote(NoteName, Sharp) {
    if (Sharp == false) {
      Notes[NoteName] = new Rectangle(0.015, 0.1);
      Notes[NoteName].size = Vector2.new(0.015, 0.1);
      Notes[NoteName].position = Vector2.new(
        LastNotePosition.x + Notes[NoteName].size.x,
        0.75
      );
      Notes[NoteName].outline = 2;
      Notes[NoteName].innerColor = Color3.fromRGB(255, 255, 255);
      LastNotePosition = Notes[NoteName].position;
    } else {
      Notes[NoteName] = new Rectangle(0.0075, 0.06);
      Notes[NoteName].position = Vector2.new(
        Notes[NoteName.replace("#", "")].position.x + Notes[NoteName].size.x,
        0.73
      );
      Notes[NoteName].outline = 0;
      Notes[NoteName].innerColor = Color3.fromRGB(0, 0, 0);
    }
  }
  var SharpsToDoLater = [];

  MidiToNames.forEach(function(element) {
    if (element.includes("#")) {
      SharpsToDoLater.push(element);
    } else {
      CreateNote(element, false);
    }
  });

  SharpsToDoLater.forEach(function(element) {
    CreateNote(element, true);
  });

  function getMIDIMessage(midiMessage) {
    if (midiMessage.data.length == 3) {
      if (midiMessage.data[2] > 0) {
        var notenum = midiMessage.data[1];
        var noteVelocity = midiMessage.data[2]
        var note = MidiToNames[notenum - 21];
        console.log(note + " On");
        NoteText.text = "Note: " + note;
        var NoteDisplay = Notes[note];
        NoteDisplay.innerColor = Color3.fromRGB(52, 158, 235);
        NoteDisplay.opacity = noteVelocity/100
      } else {
        var notenum = midiMessage.data[1];
        var note = MidiToNames[notenum - 21];
        console.log(note + " Off");
        var NoteDisplay = Notes[note];
        if (note.includes("#")) {
          NoteDisplay.innerColor = Color3.fromRGB(0, 0, 0);
        } else {
          NoteDisplay.innerColor = Color3.fromRGB(255, 255, 255);
        }
        NoteDisplay.opacity = 1
        if (NoteText.text.includes(note)) {
          NoteText.text = "Note: ";
        }
      }
    }
  }
})();
