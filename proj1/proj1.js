$(function(){
    $("#nav-placeholder").load("/src/nav2.html");
});

let currentIndex = 0;
let playing = false;

function playPause(){
    let audio = document.getElementById("audio");
    let button = document.getElementById("pause");
    
    if (button.innerHTML == "Pause") {
        audio.pause();
        button.innerHTML = "Play";
        playing = false;
    }
    else {
        audio.play();
        button.innerHTML = "Pause";
        playing = true;
    }
}

function getInfo() {
    let audio = document.getElementById("audio");
    let thisFile = document.getElementById("audioFile");
    let currTime = document.getElementById("currentTime");

    let fileName = audio.src.split('/').pop();
    thisFile.innerHTML = "<h3>File Name: " + fileName + "</h3>";
    
    audio.addEventListener('timeupdate', function() {
        currTime.innerHTML = timeFormatHelper(audio.currentTime);
    });
}

function timeFormatHelper(time) {
    let mins = Math.floor(time / 60);
    let secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function fastForward() {
    let audio = document.getElementById("audio");
    audio.currentTime += 5
}

function rewind() {
    let audio = document.getElementById("audio");
    audio.currentTime -= 5
}

function showTitles() {
    let titleList = document.getElementById("titles");
    titleList.innerHTML = '';
    titles.forEach((title, index) => {
        let li = document.createElement("LI");
        li.textContent = `${title.title}`;
        li.addEventListener('click', () => {
            currentIndex = index;
            playTitle();
        });
        titleList.appendChild(li);
    });
}

function addTitle() {
    let audio = document.getElementById("audio");
    if (titles.length >= 50) {
        alert("Error: Can't add more than 50 titles!");
        return;
    }
    let newTitle = prompt("Enter a name for the title: ");
    let titleTime = audio.currentTime;
    titles.push({ title: newTitle, time: titleTime });
    showTitles();
}

function removeTitle() {
    titles.splice(currentIndex, 1);
    showTitles();
}

function playTitle() {
    let audio = document.getElementById("audio");
    let button = document.getElementById("pause");
    let title = titles[currentIndex];
    audio.currentTime = title.time;
    
    if (!playing) {
        audio.play();
        button.innerHTML = "Pause";
    }
}
