let books = JSON.parse(localStorage.getItem("books")) || [];

function displayBooks(filter = "") {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    books
        .filter(book =>
            book.title.toLowerCase().includes(filter.toLowerCase()) ||
            book.author.toLowerCase().includes(filter.toLowerCase()) ||
            book.genre.toLowerCase().includes(filter.toLowerCase())
        )
        .forEach((book, index) => {
            const card = document.createElement("div");
            card.className = "book-card";

            card.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Genre:</strong> ${book.genre}</p>
        <div class="actions">
          <button onclick="editBook(${index})">✏️</button>
          <button onclick="deleteBook(${index})">🗑️</button>
        </div>
      `;

            bookList.appendChild(card);
        });
}

function addBook() {
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const genre = document.getElementById("genre").value.trim();

    if (!title || !author || !genre) {
        alert("Please fill all The fields!");
        return;
    }

    books.push({ title, author, genre });
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
    clearForm();
}

function deleteBook(index) {
    if (confirm("Are you sure you want to delete this book?")) {
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        displayBooks();
    }
}

function editBook(index) {
    const book = books[index];
    const newTitle = prompt("Edit Title:", book.title);
    const newAuthor = prompt("Edit Author:", book.author);
    const newGenre = prompt("Edit Genre:", book.genre);

    if (newTitle && newAuthor && newGenre) {
        books[index] = { title: newTitle, author: newAuthor, genre: newGenre };
        localStorage.setItem("books", JSON.stringify(books));
        displayBooks();
    }
}

function searchBooks() {
    const searchValue = document.getElementById("search").value;
    displayBooks(searchValue);
}

function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("genre").value = "";
}


displayBooks();
