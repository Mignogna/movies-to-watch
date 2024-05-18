
const background = document.getElementById("modal-background");
const modalContainer = document.getElementById("modal-container");

let currentMovie = {};


function backgroundClickHandler() {
    overlay.classList.remove('open');
}
function closeModal () {overlay.classList.remove('open')}   

function addCurrentMovieToList () {
    if (isMovieAlreadyOnList(currentMovie.imdbID)) {
        notie.alert({type:"error", text:"This movie is already on your list"});
        return;
    }
    addToList(currentMovie);
    updateUI(currentMovie);
    updateLocalStorage();
    closeModal();
}

function  createModal (data) {
    currentMovie = data;
    modalContainer.innerHTML = `<h1 id="modal-title">${data.Title}-${data.Year}</h1>
<section id="modal-body">
    <img 
    id = "movie-poster"
    src=${data.Poster},
     alt="movie poster"/>

    <div id="modal-info">
        <div id="movie-plot"><h3>Description:</h3><h4>${data.Plot}</h4></div>
        <div id="movie-cast"><h3>Cast:</h3><h4>${data.Actors}</h4></div>
        <div id="movie-genre"><h3>Genre:</h3><h4>${data.Genre}</h4></div>
    </div>
</section>
    <section id="modal-footer"><button id="add-to-list" onclick = '{addCurrentMovieToList()}'>Add to the list</button></section>`;}


background.addEventListener('click', backgroundClickHandler);


