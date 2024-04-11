const octavePattern = "BNBNBBNBNBNB";
let octavecount = 2;
let container = document.querySelector(".container");
for (let i = 0; i < octavecount;i++) {
for (let j = 0; j < octavePattern.length; j++) {
if (octavePattern[j] === "B"
    && octavePattern[j+1] === "N") {
const createWhiteKey = document.createElement('div');
createWhiteKey.classList = "white-key";
container.appendChild(createWhiteKey);

const createBlackKey = document.createElement('div');
createBlackKey.classList = "black-key";
createWhiteKey.appendChild(createBlackKey);
}
else if (octavePattern[j] === "B"
    && octavePattern [j+1] === "B") {
const createWhiteKey = document.createElement('div');
createWhiteKey.classList = "white-key";
container.appendChild(createWhiteKey);
}
}
const createWhiteKey = document.createElement('div');
createWhiteKey.classList = "white-key";
container.appendChild(createWhiteKey);
}