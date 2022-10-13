var searchFormEl = document.querySelector('#search-form');

function SearchInputSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#searchInput').value;
  
  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }
  console.log(searchInputVal)
  
  searchOMDB(searchInputVal);
}

searchFormEl.addEventListener('submit', SearchInputSubmit);


function searchOMDB(movie){
    var omdbAPI = "https://www.omdbapi.com/?apikey=58823a0&t=" + movie;

    fetch(omdbAPI)
        .then(function(response){ 
        return response.json()})
        .then(function(data) {
        console.log(data)
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