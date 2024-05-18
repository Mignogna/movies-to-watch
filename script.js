const searchButtonElement = document.getElementById("search-btn");
const overlay = document.getElementById("modal-overlay");
const movieName = document.getElementById("name-movie");
const yearMovie = document.getElementById("year-movie");
const movieListContainer = document.getElementById("movie-list");

let movieList = JSON.parse(localStorage.getItem("movieList")) ?? [];

async function searchButtonClickHandler() {
  try {
    let url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movieNameParamenterGenerator()}${movieYearParameterGenerator()}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log("data: ", data);
    if (data.Error) {
      throw new Error("Movie not found");
    }
    createModal(data);
    overlay.classList.add("open");
  } catch (error) {
    notie.alert({ type: "error", text: error.message });
  }
}

function movieNameParamenterGenerator() {
  if (movieName.value === "") {
    throw new Error("A movie name must be informed");
  }
  return movieName.value.split(" ").join("+");
}

function movieYearParameterGenerator() {
  if (yearMovie.value === "") {
    return "";
  }
  if (yearMovie.value.length !== 4 || Number.isNaN(Number(yearMovie.value))) {
    throw new Error("Year of the movie invalid");
  }
  return `&y=${yearMovie.value}`;
}

function addToList(movieObject) {
  movieList.push(movieObject);
}

function isMovieAlreadyOnList(id) {
  function doesThisIdBelongToThisMovie(movieObject) {
    return movieObject.imdbID === id;
  }
  return Boolean(movieList.find(doesThisIdBelongToThisMovie));
}

function updateUI(movieObject) {
  movieListContainer.innerHTML += ` <article id="movie-card-${movieObject.imdbID}">
        <img src=${movieObject.Poster} alt="movie poster of ${movieObject.Title}">
        <button class="remove-btn" onclick="
        {removeMovieFromList('${movieObject.imdbID}')}">
        <i class="bi bi-trash"></i>Remove
        </button>
        </article>`;
}

function removeMovieFromList(id) {
  movieList = movieList.filter((movie) => movie.imdbID !== id);
  document.getElementById(`movie-card-${id}`).remove();
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem("movieList", JSON.stringify(movieList));
}

for (const movieInfo of movieList) {
  updateUI(movieInfo);
  ("1");
}

searchButtonElement.addEventListener("click", searchButtonClickHandler);
