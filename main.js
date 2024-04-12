const octavePattern = "BNBNBBNBNBNB";
let octavecount = 2;
let container = document.querySelector(".container");
for (let i = 0; i < octavecount; i++) {
  for (let j = 0; j < octavePattern.length; j++) {
    if (octavePattern[j] === "B" && octavePattern[j + 1] === "N") {
      const createWhiteKey = document.createElement("div");
      createWhiteKey.classList = "white-key";
      container.appendChild(createWhiteKey);

      const createBlackKey = document.createElement("div");
      createBlackKey.classList = "black-key";
      createWhiteKey.appendChild(createBlackKey);
    } else if (octavePattern[j] === "B" && octavePattern[j + 1] === "B") {
      const createWhiteKey = document.createElement("div");
      createWhiteKey.classList = "white-key";
      container.appendChild(createWhiteKey);
    }
  }
  const createWhiteKey = document.createElement("div");
  createWhiteKey.classList = "white-key";
  container.appendChild(createWhiteKey);
}

let isMapping = false;

let mapBtn = document.querySelector("#mapping-btn");
mapBtn.addEventListener("click", () => {
  isMapping = true;
  mapBtn.disabled = true;
});

navigator.permissions.query({ name: "midi", sysex: true }).then((result) => {
  if (result.state === "granted") {
    // Access granted.
  } else if (result.state === "prompt") {
    // Using API will prompt for permission
  }
  // Permission was denied by user prompt or permission policy
});

navigator.requestMIDIAccess().then((access) => {
  // Get lists of available MIDI controllers
  const inputs = access.inputs.values();
  const outputs = access.outputs.values();
  // …
});

let midi = null; // global MIDIAccess object
//function onMIDISuccess(midiAccess) {
//  console.log("MIDI ready!");
//  midi = midiAccess; // store in the global (in real usage, would probably keep in an object instance)
//}

function onMIDIFailure(msg) {
  console.error(`Failed to get MIDI access - ${msg}`);
}

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function onMIDIMessage(event) {
  let str = `MIDI message received at timestamp ${event.timeStamp}[${event.data.length} bytes]: `;
  for (const character of event.data) {
    str += `0x${character.toString(16)} `;
  }
  console.log(str);
}

function onMIDISuccess(midiAccess) {
  midiAccess.inputs.forEach((entry) => {
    entry.onmidimessage = onMIDIMessage;
  });
}

function onKeyPress() {
  //this gotta change the key to blue
}
