// Define UI Vars
const title = document.querySelector("#form-title");
const author = document.querySelector("#form-author");
const pages = document.querySelector("#form-pages");
const status = document.querySelector("#form-status");
const submit = document.querySelector("#form-submit");
const tableBody = document.querySelector("#table-body");
const body = document.querySelector("body");

// Load all event listeners
tableBody.addEventListener("click", toggleBookStatus);
tableBody.addEventListener("click", removeBook);
submit.addEventListener("click", addBook);

let myLibrary = [];

// Constructor pattern
/*
function Book(id, title, author, pages, status) {
  (this.id = id), (this.title = title), (this.author = author), (this.pages = pages), (this.status = status);
}

Book.prototype.toggleStatus = function () {
  this.status === "Read" ? (this.status = "Unread") : (this.status = "Read");
};

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

// Initial books
let a = new Book(1, "Fairview", "Jackie Sibblies Drury", "121", "Unread");
let b = new Book(2, "Appropriate/An Octoroon", "Branden Jacobs-Jenkins", "235", "Unread");
let c = new Book(3, "The Clean House and Other Plays", "Sarah Ruhl", "635", "Unread");
let d = new Book(4, "How I Learned to Drive", "Paula Vogel", "102", "Unread");
let e = new Book(5, "Speech & Debate", "Stephen Karam", "134", "Unread");
let f = new Book(6, "Slave Play", "Jeremy O. Harris", "186", "Unread");
*/

// Factory function pattern
const bookFactory = (id, title, author, pages, status) => {
  return { id, title, author, pages, status };
};

let a = bookFactory(1, "Fairview", "Jackie Sibblies Drury", "121", "Unread");
let b = bookFactory(2, "Appropriate/An Octoroon", "Branden Jacobs-Jenkins", "235", "Unread");
let c = bookFactory(3, "The Clean House and Other Plays", "Sarah Ruhl", "635", "Unread");
let d = bookFactory(4, "How I Learned to Drive", "Paula Vogel", "102", "Unread");
let e = bookFactory(5, "Speech & Debate", "Stephen Karam", "134", "Unread");
let f = bookFactory(6, "Slave Play", "Jeremy O. Harris", "186", "Unread");

// Add the initial books to array
function addBookToLibrary(book) {
  myLibrary.push(book);
}
addBookToLibrary(a);
addBookToLibrary(b);
addBookToLibrary(c);
addBookToLibrary(d);
addBookToLibrary(e);
addBookToLibrary(f);

// Render books
function renderBooks() {
  tableBody.innerHTML = ``;
  myLibrary.forEach((book) => {
    const html = `
    <tr data-key="${book.id}">
      <th>${book.id}</th>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
    <td>
      <a class="btn ${book.status === "Read" ? "btn-success" : "btn-warning"} toggle-book-status" href="#" role="button">${book.status}</a>
      </td>
      <td>
      <a class="btn btn-outline-danger remove-book" href="#" role="button">Delete</a>
      </td>
    </tr>
  `;
    tableBody.innerHTML += html;
  });
}
renderBooks();

// Add a book
function addBook(e) {
  if (title.value !== "" && author.value !== "" && pages.value !== "" && status.value !== "Status") {
    const nextIdGenerator = myLibrary.length + 1;
    // const newBook = new Book(nextIdGenerator, title.value, author.value, pages.value, status.value);
    const newBook = bookFactory(nextIdGenerator, title.value, author.value, pages.value, status.value);
    myLibrary.push(newBook);
    renderBooks();
  }
  e.preventDefault();
}

// Remove book
function removeBook(e) {
  if (e.target.classList.contains("remove-book")) {
    const index = myLibrary.findIndex((book) => book.id === parseInt(e.target.parentElement.parentElement.dataset.key));
    myLibrary.splice(index, 1);
    renderBooks();
  }
  e.preventDefault();
}

// Toggle status (read or unread)
function toggleBookStatus(e) {
  if (e.target.classList.contains("toggle-book-status")) {
    myLibrary[e.target.parentElement.parentElement.dataset.key - 1].status === "Read"
      ? (myLibrary[e.target.parentElement.parentElement.dataset.key - 1].status = "Unread")
      : (myLibrary[e.target.parentElement.parentElement.dataset.key - 1].status = "Read");
    renderBooks();
  }
  e.preventDefault();
}
