// https://glitch.com/different-northern-exhaust
let fetchMethod = "post";
const moviesURL = "https://different-northern-exhaust.glitch.me/movies";
const deleteOptions = {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
}
// THIS IS A DOM SELECTOR THAT TARGETS THE BUTTON NAME DELETE-MOVIE
// we use variable movieID to store the attribute data-id which is our movies id
// we then fetch the moviesURl concatenating the movieID to it and then running the deleteOptions const to delete
// a movie from the JSON, then it is stored in result and appended using the append-movie-function
$(document).on("click", ".delete-movie", function(){
    let movieID = $(this).attr('data-id');

    fetch(moviesURL + "/" + movieID, deleteOptions).then(result => {
        appendMovie();
    });

});


// THE IN A DOM SELECTOR THAT ON CLICK OF THE ADD-MOVIE BUTTON WILL PULL UP A MODAL AND ALLOW THE USER TO ENTER THE
// MOVIE DETAILS. DISPLAY-MODAL IS A FUNCTION WHICH DISPLAYS THE MENTIONED MODAL.
$(document).on('click', '#addMovie', function(){
    displayModal(fetchMethod);
});

// GETS EACH MOVIE FROM THE JSON
async function getMovies() {
    return await fetch(moviesURL)
        .then(resp => resp.json())

}

//DOM SELECTOR THAT TARGETS THE MODAL AND STORES IT IN A VARIABLE, VARIABLE IS THEN USED IN
// DISPLAY-MODAL FUNCTION AND SET TO OPEN
let modal = document.querySelector('.modal');
function displayModal(method) {
    fetchMethod = method;
    modal.classList.toggle('open');
}

// $(selector).click(function() { ... });
// $(document.body).on("click", "selector", function() { ... } );


// THIS IS AN ASYNC FUNCTION THAT WAITS FOR GET-MOVIES TO RETURN FROM THE API AND THEN DISPLAYS
// THE OBJECTS RETURNED IN LOOPED THROUGH USING FOREACH AND IS APPENDED TO THE PAGE USING A STRING LITERAL
async function appendMovie() {
    $("#display-movies").html('');
    let movies = await getMovies();
    // console.log(movies);
    movies.forEach((movie) => {
        $("#display-movies").append(`
            <div class="movie-card-wrapper border border-2 my-5 text-center">  
                 <div class="movie-card">
                    <div class="poster-img">
                        <img src="${movie.poster}" alt="movie poster" class="movie-poster-img">                
                    </div> 
                    <h4>${movie.title}</h4>
                    <p class="movie-director">${movie.director}</p>
                    <p class="movie-year">${movie.year}</p>
                    <div class="stars-outer"></div> 
                    <p class="movie-rating stars-inner">${movie.rating}</p>   
                </div>
                <button class="edit-button" data-edit="${movie.id}">Edit</button>
                <button class="delete-movie" data-id="${movie.id}">Delete</button>             
            </div>            
        `)
    });
}
appendMovie();

const starsTotal = 5;
let ratings;
document.addEventListener('DOMContentLoaded', getRatings);
function getRatings(){
    for (let rating in ratings) {
        let movies = getMovies();
        movies.forEach((movie) => {
             ratings = `${movie.rating}`;
             const starPercentage = (ratings[rating]/starsTotal) * 100;
            document.querySelector(`.${rating}.star-inner`).style.width = `${Math.round(starPercentage / 10) * 10}%`;
        }); console.log(movies);
    }
}

function addMovie () {
    $("#submit-movie-button").click(function(e) {
        e.preventDefault();

        const $newMovieTitle = $("#add-title").val();
        const $movieDirector = $("#movie-director").val();
        const $movieRating = $("#enter-rating").val();

        const movieToPost = {
            title: $newMovieTitle,
            director: $movieDirector,
            rating: $movieRating
        }
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieToPost)
        }
        const patchOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieToPost)
        }
        switch (fetchMethod) {
            case "post":
                fetch(moviesURL, postOptions).then(getMovies);
                break;
            case "edit":
                fetch(moviesURL, patchOptions).then(getMovies);
                break;
        }
        modal.classList.remove('open');
    });
}
addMovie();


// function editEventListener () {
//     modal.classList.add('open');
// }
$(document).on("click", ".edit-button", function(){
    fetchMethod = "edit";
    modal.classList.add('open');
    let editMovieID = $(this).attr('data-edit');
    let $parentCard = $(this).parents('.movie-card-wrapper');
    let movieTitle = $parentCard.find('h4').text(),
        movieDirector = $parentCard.find('.movie-director').text(),
        moviePoster = $parentCard.find('.movie-poster-img').attr('src'),
        movieYear = $parentCard.find('.movie-year').text();
    $("#poster-user-input").val(moviePoster);
    $("#add-title").val(movieTitle);
    $("#movie-director").val(movieDirector);
    $("#enter-rating").val(movieYear);
});





