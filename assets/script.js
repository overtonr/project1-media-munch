var searchFormEl = document.querySelector('#search-form');

function SearchInputSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#searchInput').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }
  console.log(searchInputVal)
}

searchFormEl.addEventListener('submit', SearchInputSubmit);

