var searchFormEl = document.querySelector('#search-form');
var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchInputVal = document.querySelector('#searchInput').value;

function SearchInputSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#searchInput').value;

    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    }
    console.log(searchInputVal)

    //   var queryString = 'https://www.omdbapi.com/?apikey=58823a0&t=' + searchInputVal;
    //   location.assign(queryString);

    searchOMDB(searchInputVal);
}

searchFormEl.addEventListener('submit', SearchInputSubmit);

function printResults(resultObj) {
    console.log(resultObj);

    var resultCard = document.createElement('div');
    resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

    var resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);

    var titleEl = document.createElement('h3');
    titleEl.textContent = resultObj.Title;
    console.log(resultObj[0]);

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

    var img = document.createElement('img');
    img.src = resultObj.Poster;

    var searchInputVal = document.querySelector('#searchInput').value;
    var linkButtonEl = document.createElement('a');
    linkButtonEl.textContent = 'Read More';
    linkButtonEl.setAttribute('href', "https://www.imdb.com/find?q="+ searchInputVal +"&ref_=nv_sr_sm");
    
    linkButtonEl.classList.add('btn', 'btn-dark');

    resultBody.append(titleEl, bodyContentEl1, bodyContentEl2, bodyContentEl3, img, linkButtonEl);

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

            printResults(data);
        });

};




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