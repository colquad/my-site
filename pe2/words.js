$(function(){
  $("#nav-placeholder").load("/src/nav4.html");
});

function loadWords(vowelCount) {
    fetch('words.php?vowel_count=' + vowelCount)
    .then(response => response.json())
    .then(words => {
        const wordList = document.getElementById('wordList');
        wordList.innerHTML = ''; // Clear previous words

        const ul = document.createElement('ul'); // Create a list container
        wordList.appendChild(ul);

        words.forEach((word, index) => {
            const li = document.createElement('li');
            li.textContent = word;
            li.id = 'word-' + index;  // Assign a unique ID
            li.setAttribute('draggable', 'true');
            li.classList.add('draggable');
            addDnDHandlers(li);
            ul.appendChild(li); // Append each word as a list item
        });
    });
}

var dragSrcEl = null;

function handleDragStart(e) {
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.id);  // Pass the id of the element
    this.classList.add('dragElem');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }
    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
    return false;
}

function handleDragEnter(e) {
    if (this.id === 'dropArea') {
        this.classList.add('over');
    }
}

function handleDragLeave(e) {
    if (this.id === 'dropArea') {
        this.classList.remove('over');
    }
}

function handleDrop(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Stop the browser from performing the default action (open as link, for example).
    }
    if (e.stopPropagation) {
        e.stopPropagation(); // Stops the browser from redirecting.
    }

    // Only perform the drop logic if the target is the dropArea
    if (this.id === 'dropArea') {
        const id = e.dataTransfer.getData('text/plain');
        const draggedElement = document.getElementById(id);
        
        if (draggedElement && dragSrcEl) {
            updateWordCount(); // Update the count of dropped words
        }

        this.classList.remove('over');
    }
}

function handleDragEnd(e) {
    // Clean up any classes or styles
    var cols = document.querySelectorAll('.over');
    [].forEach.call(cols, function (col) {
        col.classList.remove('over');
    });
    this.classList.remove('dragElem');
}

function addDnDHandlers(elem) {
    elem.addEventListener('dragstart', handleDragStart, false);
    elem.addEventListener('dragenter', handleDragEnter, false);
    elem.addEventListener('dragover', handleDragOver, false);
    elem.addEventListener('dragleave', handleDragLeave, false);
    elem.addEventListener('drop', handleDrop, false);
    elem.addEventListener('dragend', handleDragEnd, false);
}

function updateWordCount() {
    let countLabel = document.getElementById('countLabel');
    let currentCount = parseInt(countLabel.textContent.split(' ')[0]);
    countLabel.textContent = (currentCount + 1) + ' words dropped';
}

// Ensure the dropArea is ready to accept drops
document.addEventListener('DOMContentLoaded', () => {
    addDnDHandlers(document.getElementById('dropArea'));
});
