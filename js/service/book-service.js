'use strict';

const STORAGE_KEY = 'booksDB';
const ID_KEY = 'ID';
var gBooks;
var gId;




function getBooksForDisplay() {
    var booksDisplay = gBooks.map(function(book) {
        return book;
    })
    return booksDisplay;
}

function removeBook(bookId) {
    //find index to function TODO
    var bookIdx = gBooks.findIndex(function(book) {
        return book.id === bookId;
    })
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}

function addBook(name, price, urlLink) {
    if (!name || !price) return;
    onCloseNewBook();

    var newBook = {
        id: gId++,
        name: name,
        price: price,
        rate: 0,
        imgUrl: urlLink
    };

    gBooks.push(newBook);
    _saveBooksToStorage();
}

function updateBook(bookId, newPrice) {
    if (!newPrice) return;
    var bookIdx = gBooks.findIndex(function(book) {
        return book.id === bookId;
    })
    gBooks[bookIdx].price = newPrice;
    _saveBooksToStorage();
}

function findBookIdx(books, bookId) {
    var idx = books.findIndex(function(book) {
        return book.id === bookId;
    })
    return idx;
}

function rateChange(button, idx) {
    var currBook = gBooks[idx];
    var btnValue = button.firstChild.data;
    btnValue === '+' ? currBook.rate++ : currBook.rate--;
    if (currBook.rate > 10) currBook.rate = 10;
    if (currBook.rate < 0) currBook.rate = 0;
    _saveBooksToStorage();
}

function createBooks() {
    gId = loadFromStorage(ID_KEY) || 101;
    var books = loadFromStorage(STORAGE_KEY);
    if (!books || !books.length) {
        books = [{
            id: 99,
            name: 'Superman',
            price: 8,
            rate: 0,
            imgUrl: 'https://upload.wikimedia.org/wikipedia/he/7/72/Superman.jpg'
        }, {
            id: 100,
            name: 'Batman',
            price: 9,
            rate: 0,
            imgUrl: 'data:image/jpeg;base64,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'
        }];
    }
    gBooks = books;
    _saveBooksToStorage()
}

function sortBy(val) {
    if (val === 'name') {
        gBooks.sort(function(a, b) {
            var bookA = a.name.toUpperCase();
            var bookB = b.name.toUpperCase();
            if (bookA < bookB) return -1;
            if (bookA > bookB) return 1;
            else return 0;
        });
    } else if (val === 'price') {
        gBooks.sort(function(bookA, bookB) {
            return bookA.price - bookB.price;
        });
    }
}

function addOnClicks() {
    $('a').click(onAddBook);
    $('.close-new-book').click(onCloseNewBook);
}

function _saveBooksToStorage() {

    saveToStorage(ID_KEY, gId);
    saveToStorage(STORAGE_KEY, gBooks)
}