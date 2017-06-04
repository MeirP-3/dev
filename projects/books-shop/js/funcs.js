'use strict'

////////////////// rest of the functions ///////////////////////

function deleteBook(bookId) {

    //TODO: implement binary search
    var idxToDelete = gBooks.findIndex(function (book) {
        return book.id === bookId;
    });
    gBooks.splice(idxToDelete, 1)[0];
    renderBooks();
}

function readAndAddBook(selectorTitle, selectorPrice) {

    var id = gNextId;
    gNextId++;

    var title = document.querySelector(selectorTitle).value;
    var price = document.querySelector(selectorPrice).value;

    if (title && price) {
        gBooks.push({
            id: id,
            title: title,
            price: +price
        });
        renderBooks();
        document.forms[0].reset();
    }
}

function readAndUpdateBook(id, idx) {
    var newPrice = document.querySelector('.update-price').querySelectorAll('input')[idx].value;
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === id;
    });
    gBooks[bookIdx].price = newPrice;
    renderBooks();
}

function renderBookDetails(i) {
    var strHtml = '<div class="modal fade" id="book-' + i + '-details">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" ' +
        'aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
        '<h4 class="modal-title">' + gBooks[i].title + '</h4>' +
        '</div>' +
        '<div class="modal-body">' +
        '<div class="row">' +
        '<div class="col-xs-6">' +
        '<img class="img-responsive" src="' +
        gBooks[i].pic + '" alt="' + gBooks[i].title + '">' +
        '</div>' +
        '<div class="col-xs-6">' +
        '<p class="float-right">' + gBooks[i].title +
        ' Is lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut iste earum ipsum, fugiat, excepturi esse quisquam ab, quis expedita necessitatibus quia.</p>' +
        '</div>' +
        '</div>' +
        '<div class="stars">' +
        `<form action="javascript:changeRatings(${i})">` +
        `<input class="star-rate star-5" id="star-5-${i}" type="radio" name="star" value="${i * 10 + 5}" onclick="changeRate(event)"/>` +
        `<label class="star-rate star-5" for="star-5-${i}"></label>` +
        `<input class="star-rate star-4" id="star-4-${i}" type="radio" name="star" value="${i * 10 + 4}" onclick="changeRate(event)"/>` +
        `<label class="star-rate star-4" for="star-4-${i}"></label>` +
        `<input class="star-rate star-3" id="star-3-${i}" type="radio" name="star" value="${i * 10 + 3}" onclick="changeRate(event)"/>` +
        `<label class="star-rate star-3" for="star-3-${i}"></label>` +
        `<input class="star-rate star-2" id="star-2-${i}" type="radio" name="star" value="${i * 10 + 2}" onclick="changeRate(event)"/>` +
        `<label class="star-rate star-2" for="star-2-${i}"></label>` +
        `<input class="star-rate star-1" id="star-1-${i}" type="radio" name="star" value="${i * 10 + 1}" onclick="changeRate(event)"/>` +
        `<label class="star-rate star-1" for="star-1-${i}" ></label>` +
        `</form>` +
        '</div>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return strHtml;
}

function ratings(i) {
    var strHtml =
 '<div class="stars">' +
        '<form action="">' +
        `<input class="star star-5" id="read-star-5-${i}" type="radio" name="star"/>` +
        `<label class="star star-5" for="read-star-5-${i}"></label>` +
        `<input class="star star-4" id="read-star-4-${i}" type="radio" name="star"/>` +
        `<label class="star star-4" for="read-star-4-${i}"></label>` +
        `<input class="star star-3" id="read-star-3-${i}" type="radio" name="star"/>` +
        `<label class="star star-3" for="read-star-3-${i}"></label>` +
        `<input class="star star-2" id="read-star-2-${i}" type="radio" name="star"/>` +
        `<label class="star star-2" for="read-star-2-${i}"></label>` +
        `<input class="star star-1" id="read-star-1-${i}" type="radio" name="star"/>` +
        `<label class="star star-1" for="read-star-1-${i}"></label>` +
        `</form>` +
        '</div>';
    return strHtml;
}

function changeRate(e) {
    var val = e.target.value;
    var idx = Math.floor(val / 10);
    var rate = val % 10;

    gBooks[idx].rate = rate;
    var $readStar = $(`#read-star-${rate}-${idx}`);
    $readStar.prop('checked', true);
}