// Sample initial JSON data
let booksData = [];

// Function to fetch books data from local JSON file
function fetchBooks() {
    fetch('books.json')
        .then(response => response.json())
        .then(data => {
            booksData = data;
            displayBooks();
        })
        .catch(error => console.error('Error fetching books:', error));
}

// Function to display books on the webpage
function displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    booksData.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        bookDiv.innerHTML = `
            <img src="${book.cover}" alt="Cover">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <p><strong>Series:</strong> ${book.series}</p>
            <p><strong>Rating:</strong> ${book.rating}</p>
            <p><strong>Status:</strong> ${book.status}</p>
            <p><strong>Thoughts:</strong> ${book.thoughts}</p>
            <p><strong>Description:</strong> ${book.description}</p>
            <button onclick="deleteBook(${index})">Delete</button>
        `;

        bookList.appendChild(bookDiv);
    });
}

// Function to add a new book
document.getElementById('bookForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const series = document.getElementById('series').value;
    const rating = document.getElementById('rating').value;
    const status = document.getElementById('status').value;
    const thoughts = document.getElementById('thoughts').value;
    const description = document.getElementById('description').value;
    const cover = document.getElementById('cover').value;

    const newBook = {
        title,
        author,
        genre,
        series,
        rating,
        status,
        thoughts,
        description,
        cover
    };

    booksData.push(newBook); // Add new book to the array

    // Save updated data to local JSON file
    saveBooks();

    // Clear the form and display updated list
    clearForm();
    displayBooks();
});

// Function to delete a book by index
function deleteBook(index) {
    if (index >= 0 && index < booksData.length) {
        booksData.splice(index, 1); // Remove book from array
        saveBooks(); // Save updated data to local JSON file
        displayBooks(); // Update displayed list
    }
}

// Function to save books data to local JSON file
function saveBooks() {
    fetch('books.json', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(booksData, null, 2),
    })
    .catch(error => console.error('Error saving books:', error));
}

// Load books data initially when the page is loaded
fetchBooks();
