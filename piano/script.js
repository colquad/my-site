$(function(){
    $("#nav-placeholder").load("/src/nav5.html");
});

const C = new Audio("keys/C.mp3");
const Db = new Audio("keys/Db.mp3");
const D = new Audio("keys/D.mp3");
const Eb = new Audio("keys/Eb.mp3");
const E = new Audio("keys/E.mp3");
const F = new Audio("keys/F.mp3");
const Gb = new Audio("keys/Gb.mp3");
const G = new Audio("keys/G.mp3");
const Ab = new Audio("keys/Ab.mp3");
const A = new Audio("keys/A.mp3");
const Bb = new Audio("keys/Bb.mp3");
const B = new Audio("keys/B.mp3");

let selected = document.getElementById("selected");

const playSound = audio => {
    const clone = audio.cloneNode();
    clone.play();
    setTimeout(() => (clone.volume = 0.8), 400);
    setTimeout(() => (clone.volume = 0.6), 800);
    setTimeout(() => (clone.volume = 0.4), 1200);
    setTimeout(() => (clone.volume = 0.2), 1600);
    setTimeout(() => (clone.volume = 0), 2000);
};

// C
const CKey = document.querySelector(".C-key");
CKey.addEventListener("click",
    function() {
        if (!CKey.classList.contains("active")) {
            playSound(C);
            CKey.classList.add("active");
            selected.innerHTML = "<h2>C</h2>";
        }
        else {
            CKey.classList.remove("active");
        }
});


// Db
const DbKey = document.querySelector(".Db-key");
DbKey.addEventListener("click",
    function() {
        if (!DbKey.classList.contains("active")) {
            playSound(Db);
            DbKey.classList.add("active");

        }
        else {
            DbKey.classList.remove("active");
        }
});

// D
const DKey = document.querySelector(".D-key");
DKey.addEventListener("click",
    function() {
        if (!DKey.classList.contains("active")) {
            playSound(D);
            DKey.classList.add("active");
        }
        else {
            DKey.classList.remove("active");
        }
});

// Eb
const EbKey = document.querySelector(".Eb-key");
EbKey.addEventListener("click",
    function() {
        if (!EbKey.classList.contains("active")) {
            playSound(Eb);
            EbKey.classList.add("active");
        }
        else {
            EbKey.classList.remove("active");
        }
});

// E
const EKey = document.querySelector(".E-key");
EKey.addEventListener("click",
    function() {
        if (!EKey.classList.contains("active")) {
            playSound(E);
            EKey.classList.add("active");
        }
        else {
            EKey.classList.remove("active");
        }
});

// F
const FKey = document.querySelector(".F-key");
FKey.addEventListener("click",
    function() {
        if (!FKey.classList.contains("active")) {
            playSound(F);
            FKey.classList.add("active");
        }
        else {
            FKey.classList.remove("active");
        }
});

// Gb
const GbKey = document.querySelector(".Gb-key");
GbKey.addEventListener("click",
    function() {
        if (!GbKey.classList.contains("active")) {
            playSound(Gb);
            GbKey.classList.add("active");
        }
        else {
            GbKey.classList.remove("active");
        }
});

// G
const GKey = document.querySelector(".G-key");
GKey.addEventListener("click",
    function() {
        if (!GKey.classList.contains("active")) {
            playSound(G);
            GKey.classList.add("active");
        }
        else {
            GKey.classList.remove("active");
        }
});


// Ab
const AbKey = document.querySelector(".Ab-key");
AbKey.addEventListener("click",
    function() {
        if (!AbKey.classList.contains("active")) {
            playSound(Ab);
            AbKey.classList.add("active");
        }
        else {
            AbKey.classList.remove("active");
        }
});


// A
const AKey = document.querySelector(".A-key");
AKey.addEventListener("click",
    function() {
        if (!AKey.classList.contains("active")) {
            playSound(A);
            AKey.classList.add("active");
        }
        else {
            AKey.classList.remove("active");
        }
});

// Bb
const BbKey = document.querySelector(".Bb-key");
BbKey.addEventListener("click",
    function() {
        if (!BbKey.classList.contains("active")) {
            playSound(Bb);
            BbKey.classList.add("active");
        }
        else {
            BbKey.classList.remove("active");
        }
});


// B
const BKey = document.querySelector(".B-key");
BKey.addEventListener("click",
    function() {
        if (!BKey.classList.contains("active")) {
            playSound(B);
            BKey.classList.add("active");
        }
        else {
            BKey.classList.remove("active");
        }
});