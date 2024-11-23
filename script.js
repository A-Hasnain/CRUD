// Add new book functionality
document.getElementById("create-form")?.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh

    const form = this;

    const newBook = {
        id: `custom-${Date.now()}`, // Unique ID
        title: form.title.value.trim(),
        author: form.author.value.trim(),
        editorial: form.editorial.value.trim(),
        pages: form.pages.value.trim(),
    };

    const books = JSON.parse(localStorage.getItem("books")) || [];
    books.push(newBook); // Add new book
    localStorage.setItem("books", JSON.stringify(books)); // Save to localStorage

    alert("Book created successfully!");
    window.location.href = "index.html"; // Redirect to homepage
});

// Load current book details into the edit form
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("edit-form")) {
        const params = new URLSearchParams(window.location.search);
        const bookId = params.get("id");

        const books = JSON.parse(localStorage.getItem("books")) || [];
        const book = books.find(b => b.id === bookId);

        if (book) {
            document.getElementById("title").value = book.title;
            document.getElementById("author").value = book.author;
            document.getElementById("editorial").value = book.editorial;
            document.getElementById("pages").value = book.pages;
        } else {
            alert("Book not found!");
            window.location.href = "index.html";
        }
    }
});

// Save changes made to a book
document.getElementById("edit-form")?.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh

    const form = this;
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get("id");

    const books = JSON.parse(localStorage.getItem("books")) || [];
    const updatedBooks = books.map(book => {
        if (book.id === bookId) {
            return {
                ...book,
                title: form.title.value.trim(),
                author: form.author.value.trim(),
                editorial: form.editorial.value.trim(),
                pages: form.pages.value.trim(),
            };
        }
        return book;
    });

    localStorage.setItem("books", JSON.stringify(updatedBooks)); // Save updated books
    alert("Book details updated!");
    window.location.href = "index.html"; // Redirect to homepage
});

// Display books on the homepage
function displayBooks() {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const itemList = document.getElementById("item-list");
    itemList.innerHTML = ""; // Clear the list

    books.forEach(book => {
        const listItem = document.createElement("li");

        const link = document.createElement("a");
        link.href = `item.html?id=${book.id}`;
        link.textContent = `${book.title} by ${book.author}`;
        listItem.appendChild(link);

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit-button");
        editButton.onclick = () => {
            window.location.href = `edit.html?id=${book.id}`;
        };
        buttonContainer.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.onclick = () => {
            deleteBook(book.id);
        };
        buttonContainer.appendChild(deleteButton);

        listItem.appendChild(buttonContainer);
        itemList.appendChild(listItem);
    });
}

// Delete a book
function deleteBook(bookId) {
    const books = JSON.parse(localStorage.getItem("books"));
    const updatedBooks = books.filter(book => book.id !== bookId);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    displayBooks();
}

// Initialize the homepage
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("item-list")) {
        displayBooks();
    }
});
