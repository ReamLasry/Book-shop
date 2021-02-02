'use strict';

$(function oninit() {
    addOnClicks();
    createBooks();
    renderBooks();
})


function renderBooks() {
    var books = getBooksForDisplay();
    var strHTML = books.map(function(book) {
        return ` 
            <tr class="book ${book.id}">
                <td class= in>${book.id}</td>
                <td class= in>${book.name}</td>
                <td class= in>${formatCurrency(book.price)}</td>
                <td class="in read"><button data-translate="read" onclick="onRead(${book.id})">Read</button></td>
                <td class="in Update"><button data-translate="update" onclick="onUpdateBook(${book.id})">Update</button></td>
                <td class="in delete"><button data-translate="delete" onclick="onRemoveBook(${book.id})">Delete</button></td>
            </tr>`
    }).join('');

    $('.table-body').html(strHTML);
}

function onRemoveBook(bookId) {
    _onCloseRead();

    removeBook(bookId);
    renderBooks();
}

function onAddBook() {
    _onCloseRead();
    $('form').show('slide');

    var $newName = $('.new-book-name').val();
    var $newPrice = +$('.new-book-price').val();
    var $imgUrl = $('.new-book-image').val();

    addBook($newName, $newPrice, $imgUrl);


    $newName = $('.new-book-name').val('');
    $newPrice = +$('.new-book-price').val('');
    $imgUrl = $('.new-book-image').val('');
    renderBooks();
    var currLang = getCurrLan();
    onSetLang(currLang);

}

function onSortBy(val) {
    sortBy(val);
    renderBooks();
}

function onUpdateBook(bookId) {
    _onCloseRead();
    var newPrice = +prompt('Book new price: ');
    updateBook(bookId, newPrice);
    renderBooks();
}

function onRead(bookId) {
    var books = getBooksForDisplay();
    var bookIdx = findBookIdx(books, bookId);
    var currBook = books[bookIdx];
    var $elBookDetails = $('.book-details');
    $elBookDetails.html(_bookDetails(currBook));
    $elBookDetails.show('slide');
}

function onRateChange(button, bookId) {
    let books = getBooksForDisplay();
    let idx = findBookIdx(books, bookId)
    rateChange(button, idx);

    onRead(bookId);
}

function onSetLang(lang) {
    setLang(lang);
    _onCloseRead();
    // onCloseNewBook
    if (lang === 'he') {
        document.body.classList.add('rtl');
        $('.book-details').addClass('rtl');
    } else {
        document.body.classList.remove('rtl');
        $('.book-details').removeClass('rtl');
    }
    renderBooks();
    doTrans();
}

function onCloseNewBook() {
    $('form').hide('slide');
}

function onRenderPage(el) {
    //TODO
    // if (el.innerText === 'x') console.log('gogo');
}

function _onCloseRead() {
    var $elBookDetails = $('.book-details');
    $elBookDetails.hide('slide');
}

function _bookDetails(book) {
    var detailsStart = `<div class=book-details-container>`;
    var closeButton = `<button class="close" onclick="_onCloseRead()">x</button>`;
    var bookRate = `<p class="rate-text" data-translate="table-rate">Rate:</p>
                    <div class="rate-container">
                        <button class="rate button" onclick=onRateChange(this,${book.id})>-</button>
                        <div class="rate number">${book.rate}</div>
                        <button class="rate button" onclick=onRateChange(this,${book.id})>+</button>
                    </div>`;
    var bookPrice = `<p class="book-price" data-translate="table-price">price:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${formatCurrency(book.price)}</p>`;
    var bookImg = `<img src="${book.imgUrl}" alt="">`;
    var bookName = `<h1 class="book-name">${book.name}</h1>`;
    var bookBio = `<p> Lorem ipsum dolor sit amet consectetur. 
                    Ad, maxime velit. Repellat, quos quibusdam doloribus numquam voluptates ratione reiciendis laboriosam.
                    Quod soluta maxime eveniet quos modi velit esse, alias aspernatur ratione, laborum odit, deserunt
                    sed nesciunt expedita voluptates.</p>
                    </div>`;
    return detailsStart + closeButton + bookRate +
        bookPrice + bookImg + bookName + bookBio;
}