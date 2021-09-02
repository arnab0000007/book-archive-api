// toggle function for spinner,error,disply
const toggle = (divId, displayStyle) => {
  document.getElementById(divId).style.display = displayStyle;
};
// search book function
const searchBook = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // clear data of input field
  searchField.value = "";
  if (searchText == "") {
    toggle("error-message", "block");
  } else {
    toggle("spinner", "block");
    toggle("books", "none");
    toggle("error-message", "none");
    // load data
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data))
      .catch((error) => console.log(error));
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
    toggle("spinner", "none");
    toggle("books", "block");
  } else {
    totalDiv.innerHTML = `
    <h3>Total ${books.numFound} results found</h3>
    `;
    const displayBooks = books.docs.slice(0, 30);
    displayBooks?.forEach((book) => {
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
                    book.author_name ? book.author_name[0] : "Unknown"
                  }</p>
                  <p class="card-text">First published in: ${
                    book.first_publish_year
                      ? book.first_publish_year
                      : "Not Available"
                  }</p>
      
                  <small>
                  Publisher: ${
                    book.publisher ? book.publisher[0] : "Not available"
                  }
                  </small>
          </div>
        </div>
      </div>
      </div>
      `;
      searchResult.appendChild(div);
    });
    toggle("spinner", "none");
    toggle("books", "block");
  }
};
