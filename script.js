document.getElementById('bookForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let genre = document.getElementById('genre').value;
    let series = document.getElementById('series').value;
    let rating = document.getElementById('rating').value;
    let status = document.getElementById('status').value;
    let thoughts = document.getElementById('thoughts').value;
    let description = document.getElementById('description').value;
    let cover = document.getElementById('cover').value;

    let book = {
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

    fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    })
    .then(response => response.json())
    .then(data => {
        addBookToList(data);
        clearForm();
    });
});

function addBookToList(book) {
    let bookList = document.getElementById('bookList');

    let bookDiv = document.createElement('div');
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
        <button onclick="deleteBook(this)">Delete</button>
    `;

    bookList.appendChild(bookDiv);

    new Sortable(bookList, {
        animation: 150,
        ghostClass: 'sortable-ghost',
    });
}

function clearForm() {
    document.getElementById('bookForm').reset();
}

function deleteBook(button) {
    let index = Array.from(button.parentElement.parentElement.children).indexOf(button.parentElement);

    fetch(`http://localhost:3000/books/${index}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        button.parentElement.remove();
    });
}

function loadBooksFromServer() {
    fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(data => {
        data.forEach(book => addBookToList(book));
    });
}

window.onload = loadBooksFromServer;
