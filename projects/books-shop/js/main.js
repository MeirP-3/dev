'use strict'

////////////////// Global vars & render function /////////////////////

var gCURRENCY = '&#8362;'

var gBooks = [
    {
        id: 1,
        title: 'Nice building',
        price: '50',
        pic: 'img/nice-building.jpg',
        rate: 2
    },
    {
        id: 2,
        title: 'Nice flower',
        price: '80',
        pic: 'img/nice-flower.jpg',
        rate: 3
    },
    {
        id: 3,
        title: 'Nice france',
        price: '76',
        pic: 'img/nice-france.jpg',
        rate: 5
    }
];

var gNextId = 4;

function renderBooks(elThBtn) {

    // sort if required
    if (elThBtn) {
        var dataSort = elThBtn.getAttribute('data-sort');
        var order = elThBtn.classList.contains('descending') ? 1 : -1;
        if (dataSort === 'title') {
            gBooks.sort(function (a, b) {
                return (a.title < b.title ? order : -order)
            });
        } else {
            gBooks.sort(function (a, b) {
                if (+a.price < +b.price) return order;
                return - order;
            });
        }
    }

    var strHtmlUpdatePrice = '';
    var strHtmlBooksDetails = '';

//########################################################################################
//                              TABLE HEAD
//########################################################################################
    var strHtmlTable = '<thead>' +
        '<tr>' +

        '<th> <button class="btn btn-link disabled"> id </button> </th>' +

        '<th><button class="btn btn-link" data-sort="title"' +
        ' onclick="renderBooks(this)">Title</button></th>' +

        '<th><button class="btn btn-link" data-sort="price"' +
        ' onclick="renderBooks(this)">Price</button></th>' +

        '<th> <button class="btn btn-link disabled">Ratings</th>' +
        
        '<th colspan="3"> <button class="btn btn-link disabled">Actions</th>' +
        

        '</tr>' +

        '</thead>' +

        '<tbody>';


    for (var i = 0; i < gBooks.length; i++) {

//########################################################################################
//                              UPDATE PRICE FORM
//########################################################################################
        strHtmlUpdatePrice += '<div class="collapse" data-idx="' + i +
            '" id="update-book-' + i + '-form">' +

            '<div class="card card-block">' +

            '<form class="form-inline"' +
            ' action="javascript:readAndUpdateBook(' + gBooks[i].id + ',' + i + ')" autocomplete="off">' +

            '<div class="input-group mb-2 mr-sm-2 mb-sm-0">' +

            '<input type="text" data-idx="' + i + '" class="form-control" placeholder="Enter new price">' +

            '<div class="input-group-addon">&#8362;</div> </div>' +

            '<button class="btn btn-primary" data-toggle="collapse"' +
            ' data-target="#update-book-' + i + '-form" id="btn-submit">Submit</button>' +

            '</form> </div> </div>';

//########################################################################################
//                              TABLE WITH BUTTONS
//########################################################################################        
        var strHtmlRatings = ratings(i);

        var strHtmlBtnRead = '<button class="btn btn-primary" data-toggle="modal" data-target="#book-' + i + '-details">Read</button>';

        var strHtmlBtnUpdate = '<button class="btn btn-warning" data-toggle="collapse"' +
            ' data-target="#update-book-' + i + '-form">Update</button>';

        var strHtmlBtnDelete = '<button class="btn btn-danger"' +
            ' onclick="deleteBook' +
            '(+this.parentElement.parentElement.firstElementChild.innerText)">Delete</button>';

        strHtmlTable += '<tr> <th scope="row">' + gBooks[i].id + '</th>';
        strHtmlTable += '<td>' + gBooks[i].title + '</td>';
        strHtmlTable += '<td>' + gBooks[i].price + gCURRENCY + '</td>';
        strHtmlTable += '<td>' + strHtmlRatings + '</td>';
        strHtmlTable += '<td>' + strHtmlBtnRead + '</td>';
        strHtmlTable += '<td>' + strHtmlBtnUpdate + '</td>';
        strHtmlTable += '<td>' + strHtmlBtnDelete + '</td>';
        strHtmlTable += '</tr>';

//########################################################################################
//                              BOOKS DETAILS AREA
//########################################################################################
        strHtmlBooksDetails += renderBookDetails(i);
    }
    //END OF RENDER LOOP

    strHtmlTable += '</tbody>';

//########################################################################################
//                EMBED THE TABLE, THE UPDATE FORM, AND BOOKS DETAILS
//########################################################################################
    var elTable = document.querySelector('.table-books');
    elTable.innerHTML = strHtmlTable;

    var elUpdatePrice = document.querySelector('.update-price');
    elUpdatePrice.innerHTML = strHtmlUpdatePrice;

    var elBooksDetails = document.querySelector('.books-details');
    elBooksDetails.innerHTML = strHtmlBooksDetails;

//########################################################################################
//                              SWITCH SORT DIRECTION
//########################################################################################
    if (elThBtn) {
        var currElThBtn = document.querySelector('[data-sort="' + dataSort + '"]');

        // if before render there was no class descending, add it for next sort
        if (!elThBtn.classList.contains('descending')) {
            currElThBtn.classList.add('descending');
        }
    }
}
