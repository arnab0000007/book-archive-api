// toggle spinner function
const toggleSpinner = (displayStyle) => {
  document.getElementById("spinner").style.display = displayStyle;
};
// toggle search result
const toggleSearchResult = (displayStyle) => {
  document.getElementById("books").style.display = displayStyle;
};
// search book function
const searchBook = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // clear data of input field
  searchField.value = "";
  if (searchText == "") {
    alert("Please write something");
  } else {
    // load data
    toggleSpinner("block");
    toggleSearchResult("none");
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data));
  }
};
// display result function
const displaySearchResult = (books) => {
  const totalResult = document.getElementById("total");
  totalResult.textContent = "";
  const totalDiv = document.createElement("div");
  totalDiv.classList.add("text-primary");
  totalDiv.classList.add("text-center");

  totalResult.appendChild(totalDiv);
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";

  if (books.numFound === 0) {
    totalDiv.innerHTML = `
    <h3>No Results Found</h3>
    `;
    totalResult.appendChild(totalDiv);
    toggleSpinner("none");
    toggleSearchResult("block");
  } else {
    totalDiv.innerHTML = `
    <h3>Total ${books.numFound} results found</h3>
    `;
    books.docs?.forEach((book) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
      <div class="card mb-3  h-100 " style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-4">
        <img src="https://covers.openlibrary.org/b/id/${
          book.cover_i
        }-M.jpg" class="rounded-start img-fluid" alt="Not Available">
        </div>
        <div class="col-md-8">
          <div class="card-body">
          <h5 class="card-title">${book.title} ${
        book.subtitle ? ": " + book.subtitle : ""
      }</h5>
                  <p class="card-text">Author: ${
                    book.author_name ? book.author_name[0] : "Unknown Author"
                  }</p>
                  <p class="card-text">First published in: ${
                    book.first_publish_year
                      ? book.first_publish_year
                      : "Not Available"
                  }</p>
      
                  <small>
                  Publisher: ${
                    book.publisher ? book.publisher[0] : "Not Available"
                  }
                  </small>
          </div>
        </div>
      </div>
      </div>
      `;
      searchResult.appendChild(div);
    });
    toggleSpinner("none");
    toggleSearchResult("block");
  }
};
