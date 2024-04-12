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

navigator.requestMIDIAccess().then((access) => {
  const inputs = access.inputs.values();
  const outputs = access.outputs.values();

  access.onstatechange = (Event) => {
    console.log(
      Event.stopPropagation.name,
      Event.port.manufacturer,
      Event.port.state
    );
  };
});

navigator.permissions.query({ name: "midi", sysex: true }).then((result) => {
  if (result.state === "granted") {
    //access granted
  } else if (result.state === "prompt") {
    //using API will prompt for permission
  }
  // permission was denied by user prompt or permission policy
});

let midi = null;

function onMIDISuccess(midiAccess) {
  console.log("MIDI ready!");
  midi = midiAccess;
}

function onMIDIFailure(msg) {
  console.error(`Failed to get MIDI access - ${msg}`);
}
navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function listInputsAndOutputs(midiAccess) {
  for (const entry of midiAccess.inputs) {
    const input = entry[1];
    console.log(
      `Input port [type:'${input.type}']` +
        ` id:'${input.id}'` +
        ` manufacturer:'${input.manufacturer}'` +
        ` name:'${input.name}'` +
        ` version:'${input.version}'`
    );
  }
  for (const entry of midiAccess.outputs) {
    const output = entry[1];
    console.log(
      `Output port [type:'${output.type}']
         id:'${output.id}' 
         manufacturer:'${output.manufacturer}' 
         name:'${output.name}' 
         version:'${output.version}'`
    );
  }
}

function onMIDIMessage(Event) {
  let str = `MIDI message received at timestamp ${Event.timeStamp}[${Event.data.length} bytes]: `;
  for (const character of Event.data) {
    str += `0x${character.toString(16)} `;
  }
  console.log(str);
}

function startLoggingMIDIInput(midiAccess) {
  midiAccess.inputs.forEach((entry) => {
    entry.onmidimessage = onMIDIMessage;
  });
}
