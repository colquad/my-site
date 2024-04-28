// this function actually makes the API call,
// it takes what was searched and pastes it to the base URL
// and also pastes whatever type of search it was into the URL with it
function searchBooks() {
    const searchText = document.getElementById('search-box').value;
    const searchType = document.getElementById('search-type').value;
    const limit = 100;
    let baseUrl = `https://openlibrary.org/search.json?`;
    let searchQuery = `${searchType}=${encodeURIComponent(searchText)}&limit=${limit}`;
    
    const url = baseUrl + searchQuery;
    
    // fetching the json response from the endpoint
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data.docs);
        })
        .catch(error => console.error('Error fetching data: ', error));
}


// this function actually displays the results on the HTML page
function displayResults(books) {
    const resultsSection = document.getElementById('results-section');
    resultsSection.innerHTML = '';
    resultsSection.classList.add('grid');
    
    // pasting each book onto the page
    books.forEach(book => {
        const div = document.createElement('div');
        div.innerHTML = `
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="${book.title}">
            <h2>${book.title}</h2>
            <p>${book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
        `;
        div.onclick = () => showBookDetails(book);
        resultsSection.appendChild(div);
    });
}

// this function is setting the modal to show information about whatever book you chose
function showBookDetails(book) {
    document.getElementById('book-image').src = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
    document.getElementById('book-image').alt = book.title;
    document.getElementById('book-title').textContent = book.title;
    document.getElementById('book-author').textContent = `Author(s): ${book.author_name ? book.author_name.join(', ') : 'Unknown'}`;
    document.getElementById('book-year').textContent = `Publish Year: ${book.first_publish_year || 'Unknown'}`;
    
    // Check if the Add to Favorites button already exists
    let addButton = document.getElementById('add-to-favorites-button');
    if (!addButton) {
        addButton = document.createElement('button');
        addButton.id = 'add-to-favorites-button';
        addButton.textContent = 'Add to Favorites';
        document.querySelector('.modal-content').appendChild(addButton);
    }
    
    // Update the onclick event every time a new book is shown
    addButton.onclick = () => addToFavorites(book);

    // make the modal visible
    document.getElementById('book-modal').style.display = 'block';
}

// when hitting the close button this makes the modal invisible
function closeModal() {
    document.getElementById('book-modal').style.display = 'none';
}

// a function for usability, if the user clicks outside of the modal then it disappears
window.onclick = function(event) {
    const modal = document.getElementById('book-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

function addToFavorites(book) {
    const bookDetails = {
        title: book.title,
        author: book.author_name ? book.author_name.join(', ') : 'Unknown',
        cover_id: book.cover_i,
        publish_year: book.first_publish_year
    };

    fetch('add_to_favorites.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookDetails)
    })
    .then(response => response.json())
    .then(result => {
        alert(result.message);
        closeModal();
    })
    .catch(error => console.error('Error adding book to favorites: ', error));
}