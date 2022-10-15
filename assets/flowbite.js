var searchFormEl = document.querySelector('#search-form');
var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var resultContent2El = document.querySelector('#result-content2');
var searchInputVal = document.querySelector('#searchInput').value;

function SearchInputSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#searchInput').value;

    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    }
    console.log(searchInputVal)

    searchGoogleBooks(searchInputVal);
    searchOMDB(searchInputVal);
}

searchFormEl.addEventListener('submit', SearchInputSubmit);

function movieResults(resultObj) {
    console.log(resultObj);

    var resultCard = document.createElement('div');

    var resultBody = document.createElement('div');
    resultCard.append(resultBody);

    var titleEl = document.createElement('h3');
    titleEl.textContent = resultObj.Title;
    console.log(resultObj);

    var bodyContentEl1 = document.createElement('p');
    bodyContentEl1.innerHTML =
        '<strong>Year:</strong> ' + resultObj.Year;

    var bodyContentEl2 = document.createElement('p');
    bodyContentEl2.innerHTML =
        '<strong>Genre:</strong> ' + resultObj.Genre;
    console.log(resultObj.Genre);

    var bodyContentEl3 = document.createElement('p');
    bodyContentEl3.innerHTML =
        '<strong>Director:</strong> ' + resultObj.Director;
    
    var bodyContentEl4 = document.createElement('button')
    bodyContentEl4.innerHTML = '☆';
    bodyContentEl4.classList.add('favoriteBtn');

    var img = document.createElement('img');
    img.src = resultObj.Poster;

    var searchInputVal = document.querySelector('#searchInput').value;
    var linkButtonEl = document.createElement('a');
    linkButtonEl.textContent = 'Read More';
    linkButtonEl.setAttribute('href', "https://www.imdb.com/find?q=" + searchInputVal + "&ref_=nv_sr_sm");

    resultBody.append(titleEl, bodyContentEl1, bodyContentEl2, bodyContentEl3, bodyContentEl4, img, linkButtonEl);

    resultContentEl.append(resultCard);
}

function searchOMDB(movie) {
    var omdbAPI = "https://www.omdbapi.com/?apikey=58823a0&t=" + movie;

    fetch(omdbAPI)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)

            // movieResults(data);

            if (!data) {
                console.log('No results found!');
                resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
            } else {
                resultContentEl.textContent = '';
                movieResults(data);
            }
        })
        .catch(function (error) {
            console.error(error);

        });
};

function bookResults(resultObj, i) {
    console.log(resultObj, i);

    var resultCard = document.createElement('div');

    var resultBody = document.createElement('div');
    resultCard.append(resultBody);

    var titleEl = document.createElement('h3');
    titleEl.textContent = resultObj.items[i].volumeInfo.title;
    console.log(resultObj);

    var bodyContentEl1 = document.createElement('p');
    bodyContentEl1.innerHTML =
        '<strong>Author(s):</strong> ' + resultObj.items[i].volumeInfo.authors;

    var bodyContentEl2 = document.createElement('p');
    bodyContentEl2.innerHTML =
        '<strong>Genre:</strong> ' + resultObj.items[i].volumeInfo.categories;
    console.log(resultObj.Genre);

    var bodyContentEl3 = document.createElement('p');
    bodyContentEl3.innerHTML =
        '<strong>Publisher:</strong> ' + resultObj.items[i].volumeInfo.publisher;

    var bodyContentEl4 = document.createElement('button')
    bodyContentEl4.innerHTML = '☆';
    bodyContentEl4.classList.add('favoriteBtn');

    var img = document.createElement('img');
    img.src = resultObj.items[i].volumeInfo.imageLinks.thumbnail;

    var searchInputVal = document.querySelector('#searchInput').value;
    var linkButtonEl = document.createElement('a');
    linkButtonEl.textContent = 'Read More';
    console.log(linkButtonEl.textContent);
    linkButtonEl.setAttribute('href', "https://www.google.com/search?tbm=bks&hl=en&q=" + searchInputVal);

    var bodyContentEl5 = document.createElement('br')

    resultBody.append(titleEl, bodyContentEl1, bodyContentEl2, bodyContentEl3, bodyContentEl4, img, linkButtonEl);

    // resultBody.append(titleEl, bodyContentEl1, bodyContentEl2, bodyContentEl3, img);

    resultContent2El.append(resultCard, bodyContentEl5);

}


function searchGoogleBooks(book) {
    var bookAPI = "https://www.googleapis.com/books/v1/volumes?q=" + book;

    fetch(bookAPI)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)

            // bookResults(data);

            if (!data.items.length) {
                console.log('No results found!');
                resultContent2El.innerHTML = '<h3>No results found, search again!</h3>';
            } else {
                resultContent2El.textContent = '';
                console.log(data.items.length);
                for (var i = 0; i < data.items.length; i++) {
                    bookResults(data, i);
                }
            }
        })
        .catch(function (error) {
            console.error(error);

        });

};

var searchHistoryList = [];

$("#searchBtn").on("click", function (event) {
    event.preventDefault();

    searchInputVal = $("#searchInput").val().trim();
    searchGoogleBooks(searchInputVal);
    searchOMDB(searchInputVal);
    if (!searchHistoryList.includes(searchInputVal)) {
        searchHistoryList.push(searchInputVal);
        var searchedList = $(`
            <li class="list-group-item">${searchInputVal}</li>
            `);
        $("#searchHistory").append(searchedList);
    };

    localStorage.setItem("city", JSON.stringify(searchHistoryList));
    console.log(searchHistoryList);
});


$(document).on("click", ".list-group-item", function () {
    var listMovieBooks = $(this).text();
    searchGoogleBooks(listMovieBooks);
    searchOMDB(listMovieBooks);
});



// searchOMDB("spider-man");
// searchOMDB('goonies');

// function searchGoogleBooks(book){

//     var googleBookAPI = "https://www.googleapis.com/books/v1/volumes?q=harry+potter";

//     fetch(googleBookAPI)
//         .then(function(response){ 
//         return response.json()})
//         .then(function(data) {
//         console.log(data)
//     });
// };
// searchGoogleBooks();