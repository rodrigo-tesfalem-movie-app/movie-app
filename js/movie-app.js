let fetchMethod = "post";
const moviesURL = "https://different-northern-exhaust.glitch.me/movies";
const deleteOptions = {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
}
//
$(document).on("click", ".delete-movie", function(){
    let movieID = $(this).attr('data-id');

    fetch(moviesURL + "/" + movieID, deleteOptions).then(result => {
        appendMovie();
    });

});

// getMovie function gets each movie and display it in the page
async function getMovies() {
    return await fetch(moviesURL)
        .then(resp => resp.json())

}

let modal = document.querySelector('.modal');
function displayModal(method) {
    fetchMethod = method;
    modal.classList.toggle('open');
}

$(document).on('click', '.add-movie-button', function(){
    displayModal("post");
});

// $(selector).click(function() { ... });
// $(document.body).on("click", "selector", function() { ... } );

async function appendMovie() {
    $("#display-movies").html('');
    let movies = await getMovies();
    // console.log(movies);
    movies.forEach((movie) => {
        $("#display-movies").append(`
            <div class="movie-card-wrapper">  
                 <div class="movie-card">
                    <div class="poster-img">
                        <img src="${movie.poster}" alt="movie poster" class="movie-poster-img">                
                    </div> 
                    <p class="text-center">${movie.title}</p>
                    <p class="movie-director text-center">${movie.director}</p>
                    <p class="movie-year text-center">${movie.year}</p>    
                </div>          
                <button class="edit-button" data-edit="${movie.id}">Edit</button>
                <button class="delete-movie" data-id="${movie.id}">Delete</button>                                         
            </div>            
        `)
    });
}
appendMovie();

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





