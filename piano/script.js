// initializations of audio files as well as variables for keys, reset button
// and chord names

const C0 = new Audio("keys/C0.mp3");
const Db0 = new Audio("keys/Db0.mp3");
const D0= new Audio("keys/D0.mp3");
const Eb0 = new Audio("keys/Eb0.mp3");
const E0 = new Audio("keys/E0.mp3");
const F0 = new Audio("keys/F0.mp3");
const Gb0 = new Audio("keys/Gb0.mp3");
const G0 = new Audio("keys/G0.mp3");
const Ab0 = new Audio("keys/Ab0.mp3");
const A0 = new Audio("keys/A0.mp3");
const Bb0 = new Audio("keys/Bb0.mp3");
const B0 = new Audio("keys/B0.mp3");
const C1 = new Audio("keys/C1.mp3");
const Db1 = new Audio("keys/Db1.mp3");
const D1 = new Audio("keys/D1.mp3");
const Eb1 = new Audio("keys/Eb1.mp3");
const E1 = new Audio("keys/E1.mp3");
const F1 = new Audio("keys/F1.mp3");
const Gb1 = new Audio("keys/Gb1.mp3");
const G1 = new Audio("keys/G1.mp3");
const Ab1 = new Audio("keys/Ab1.mp3");
const A1 = new Audio("keys/A1.mp3");
const Bb1 = new Audio("keys/Bb1.mp3");
const B1 = new Audio("keys/B1.mp3");

const AM = new Audio("chords/AM.mp3");
const AMi = new Audio("chords/AMi.mp3");
const BM = new Audio("chords/BM.mp3");
const BMi = new Audio("chords/BMi.mp3");
const CM = new Audio("chords/CM.mp3");
const CMi = new Audio("chords/CMi.mp3");
const DM = new Audio("chords/DM.mp3");
const DMi = new Audio("chords/DMi.mp3");
const EM = new Audio("chords/EM.mp3");
const EMi = new Audio("chords/EMi.mp3");
const FM = new Audio("chords/FM.mp3");
const FMi = new Audio("chords/FMi.mp3");
const GM = new Audio("chords/GM.mp3");
const GMi = new Audio("chords/GMi.mp3");

const allKeys = document.querySelectorAll('.white-key, .black-key');
const resetButton = document.getElementById('reset');

let activeNotes = [];
const chordName = document.getElementById('chord-name');

const noteSounds = {
    "C0": C0,
    "Db0": Db0,
    "D0": D0,
    "Eb0": Eb0,
    "E0": E0,
    "F0": F0,
    "Gb0": Gb0,
    "G0": G0,
    "Ab0": Ab0,
    "A0": A0,
    "Bb0": Bb0,
    "B0": B0,
    "C1": C1,
    "Db1": Db1,
    "D1": D1,
    "Eb1": Eb1,
    "E1": E1,
    "F1": F1,
    "Gb1": Gb1,
    "G1": G1,
    "Ab1": Ab1,
    "A1": A1,
    "Bb1": Bb1,
    "B1": B1
}

const chords = {
    "A Major": [["A0", "Db1", "E1"]],
    "A Minor": [["A0", "C1", "E1"]],
    "B Major": [["B0", "Eb1", "Gb1"]],
    "B Minor": [["B0", "D1", "Gb1"]],
    "C Major": [["C0", "E0", "G0"], ["C1", "E1", "G1"]],
    "C Minor": [["C0", "Eb0", "G0"], ["C1", "Eb1", "G1"]],
    "D Major": [["D0", "Gb0", "A0"], ["D1", "Gb1", "A1"]],
    "D Minor": [["D0", "F0", "A0"], ["D1", "F1", "A1"]],
    "E Major": [["E0", "Ab0", "B0"], ["E1", "Ab1", "B1"]],
    "E Minor": [["E0", "G0", "B0"], ["E1", "G1", "B1"]],
    "F Major": [["F0", "A0", "C1"]],
    "F Minor": [["F0", "Ab0", "C1"]],
    "G Major": [["G0", "B0", "D1"]],
    "G Minor": [["G0", "Bb0", "D1"]],
    "B Diminished": [["B0", "D1", "F1"], ["B1", "D2", "F2"]],
    // Add more chords here
};

const chordSounds = {
    "A Major": AM,
    "A Minor": AMi,
    "B Major": BM,
    "B Minor": BMi,
    "C Major": CM,
    "C Minor": CMi,
    "D Major": DM,
    "D Minor": DMi,
    "E Major": EM,
    "E Minor": EMi,
    "F Major": FM,
    "F Minor": FMi,
    "G Major": GM,
    "G Minor": GMi
}


const playSound = audio => {
    const clone = audio.cloneNode();
    clone.play();
    setTimeout(() => (clone.volume = 0.8), 400);
    setTimeout(() => (clone.volume = 0.6), 800);
    setTimeout(() => (clone.volume = 0.4), 1200);
    setTimeout(() => (clone.volume = 0.2), 1600);
    setTimeout(() => (clone.volume = 0), 2000);
};

const toggleKey = (key, note) => {
    if (!key.classList.contains("active")) {
        playSound(noteSounds[note]);
        key.classList.add("active");
        activeNotes.push(note);
    } else {
        key.classList.remove("active");
        activeNotes = activeNotes.filter(n => n !== note);
    }
    checkChord();
};

const checkChord = () => {
    let chordFound = false;
    for (let chord in chords) {
        for (let variation of chords[chord]) {
            if (variation.every(note => activeNotes.includes(note)) && activeNotes.length === variation.length) {
                chordName.textContent = `${chord}`;
                chordName.classList.remove("hidden");
                chordName.classList.add("visible");
                chordFound = true;
                setTimeout(() => (playSound(chordSounds[chord])), 1000);
                break;
            }
        }
        if (chordFound) break;
    }
    if (!chordFound) {
        chordName.classList.remove("visible");
        chordName.classList.add("hidden");
    }
};

resetButton.addEventListener('click', () => {
    allKeys.forEach(key => {
        key.classList.remove('active');
    });
    activeNotes = [];
    chordName.classList.remove("visible");
    chordName.classList.add("hidden");
})


const C0Key = document.querySelector(".C0-key");
C0Key.addEventListener("click", () => toggleKey(C0Key, "C0"));

const Db0Key = document.querySelector(".Db0-key");
Db0Key.addEventListener("click", () => toggleKey(Db0Key, "Db0"));

const D0Key = document.querySelector(".D0-key");
D0Key.addEventListener("click", () => toggleKey(D0Key, "D0"));

const Eb0Key = document.querySelector(".Eb0-key");
Eb0Key.addEventListener("click", () => toggleKey(Eb0Key, "Eb0"));

const E0Key = document.querySelector(".E0-key");
E0Key.addEventListener("click", () => toggleKey(E0Key, "E0"));

const F0Key = document.querySelector(".F0-key");
F0Key.addEventListener("click", () => toggleKey(F0Key, "F0"));

const Gb0Key = document.querySelector(".Gb0-key");
Gb0Key.addEventListener("click", () => toggleKey(Gb0Key, "Gb0"));

const G0Key = document.querySelector(".G0-key");
G0Key.addEventListener("click", () => toggleKey(G0Key, "G0"));

const Ab0Key = document.querySelector(".Ab0-key");
Ab0Key.addEventListener("click", () => toggleKey(Ab0Key, "Ab0"));

const A0Key = document.querySelector(".A0-key");
A0Key.addEventListener("click", () => toggleKey(A0Key, "A0"));

const Bb0Key = document.querySelector(".Bb0-key");
Bb0Key.addEventListener("click", () => toggleKey(Bb0Key, "Bb0"));

const B0Key = document.querySelector(".B0-key");
B0Key.addEventListener("click", () => toggleKey(B0Key, "B0"));

const C1Key = document.querySelector(".C1-key");
C1Key.addEventListener("click", () => toggleKey(C1Key, "C1"));

const Db1Key = document.querySelector(".Db1-key");
Db1Key.addEventListener("click", () => toggleKey(Db1Key, "Db1"));

const D1Key = document.querySelector(".D1-key");
D1Key.addEventListener("click", () => toggleKey(D1Key, "D1"));

const Eb1Key = document.querySelector(".Eb1-key");
Eb1Key.addEventListener("click", () => toggleKey(Eb1Key, "Eb1"));

const E1Key = document.querySelector(".E1-key");
E1Key.addEventListener("click", () => toggleKey(E1Key, "E1"));

const F1Key = document.querySelector(".F1-key");
F1Key.addEventListener("click", () => toggleKey(F1Key, "F1"));

const Gb1Key = document.querySelector(".Gb1-key");
Gb1Key.addEventListener("click", () => toggleKey(Gb1Key, "Gb1"));

const G1Key = document.querySelector(".G1-key");
G1Key.addEventListener("click", () => toggleKey(G1Key, "G1"));

const Ab1Key = document.querySelector(".Ab1-key");
Ab1Key.addEventListener("click", () => toggleKey(Ab1Key, "Ab1"));

const A1Key = document.querySelector(".A1-key");
A1Key.addEventListener("click", () => toggleKey(A1Key, "A1"));

const Bb1Key = document.querySelector(".Bb1-key");
Bb1Key.addEventListener("click", () => toggleKey(Bb1Key, "Bb1"));

const B1Key = document.querySelector(".B1-key");
B1Key.addEventListener("click", () => toggleKey(B1Key, "B1"));
