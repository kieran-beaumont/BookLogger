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

    addBookToList(book);
    saveBooksToLocalStorage();
    clearForm();
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
        onSort: saveBooksToLocalStorage
    });
}

function clearForm() {
    document.getElementById('bookForm').reset();
}

function deleteBook(button) {
    button.parentElement.remove();
    saveBooksToLocalStorage();
}

function saveBooksToLocalStorage() {
    let books = [];
    let bookElements = document.querySelectorAll('.book');
    bookElements.forEach(bookElement => {
        let book = {
            cover: bookElement.querySelector('img').src,
            title: bookElement.querySelector('h3').innerText,
            author: bookElement.querySelector('p:nth-child(3)').innerText.split(': ')[1],
            genre: bookElement.querySelector('p:nth-child(4)').innerText.split(': ')[1],
            series: bookElement.querySelector('p:nth-child(5)').innerText.split(': ')[1],
            rating: bookElement.querySelector('p:nth-child(6)').innerText.split(': ')[1],
            status: bookElement.querySelector('p:nth-child(7)').innerText.split(': ')[1],
            thoughts: bookElement.querySelector('p:nth-child(8)').innerText.split(': ')[1],
            description: bookElement.querySelector('p:nth-child(9)').innerText.split(': ')[1]
        };
        books.push(book);
    });
    localStorage.setItem('books', JSON.stringify(books));
}

function loadBooksFromLocalStorage() {
    let books = JSON.parse(localStorage.getItem('books'));
    if (books) {
        books.forEach(book => addBookToList(book));
    }
}

window.onload = loadBooksFromLocalStorage;
