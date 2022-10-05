// https://glitch.com/different-northern-exhaust

const moviesURL = "https://different-northern-exhaust.glitch.me/movies";
// getMovie get each movie and display it in the page
async function getMovies() {
    return await fetch(moviesURL)
        .then(resp => resp.json())

}
// getMovies();

function appendMovie() {
    $("#display-movies").html('');
    getMovies().then(data => {
        console.log(data);
        data.forEach((movie) => {
            $("#display-movies").append(`
                <div class="">
                    <img src="${movie.poster}" alt="" class="">
                    <h3>${movie.title}</h3>
                    <p>${movie.director}</p>
                    <p>${movie.year}</p>
                    <button id="delete-movie-${movie.id}" data-id="${movie.id}">Delete</button>
                </div>
            `)
            $(`#delete-movie-${movie.id}`).on("click", function() {
                const deleteOptions = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                fetch(moviesURL + "/" + movie.id, deleteOptions).then(appendMovie());

            });
        });
    })
}
appendMovie();

function addMovie () {
    $("#addNewMovie").click(function(e) {
        // console.log("inside addMovie click jquery event");
        e.preventDefault();
        const $newMovieTitle = $("#add-title").val();
        // console.log($newMovieTitle);
        const $movieRating = $("#enter-rating").val();
        // console.log($movieRating);
        const $movieDirector = $("#movie-director").val();

        const movieToPost = {
            title: `${$newMovieTitle}`,
            director: `${$movieDirector}`,
            rating: `${$movieRating}`
        }
        // console.log("complete movie object");
        // console.log(movieToPost);
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieToPost)
        }

        fetch(moviesURL, postOptions).then(getMovies);
    });
}
addMovie();


