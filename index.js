const api_key = '1bfdbff05c2698dc917dd28c08d41096';
const api_url = 'https://api.themoviedb.org/3/movie/upcoming';

// Make a GET request to the TMDb API
fetch(`${api_url}?api_key=${api_key}`)
.then(response => response.json())
.then(data => {
    // Handle the data here
    console.log(data);

    // Assuming you have an HTML element with id "movie-list"
    const movieList = document.getElementById('movie-list');

    // Check if 'results' property exists in the response data
    if (data.results) {
        data.results.forEach(movie => {
            // Create container for each movie
            const movieContainer = document.createElement('div');
            movieContainer.className = 'movie-container'; // Apply CSS class

            // Create img element for the movie poster
            const moviePoster = document.createElement('img');
            moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            moviePoster.alt = movie.title;
            moviePoster.className = 'movie-poster'; // Apply CSS class

            // Create a p element for the movie title
            const movieTitle = document.createElement('p');
            movieTitle.textContent = movie.title;
            movieTitle.className = 'movie-title'; // Apply CSS class

            // Add click event listener to show movie details on click
            movieContainer.addEventListener('click', () => fetchMovieDetails(movie.id));

            // Append the movie poster and title to the movieContainer
            movieContainer.appendChild(moviePoster);
            movieContainer.appendChild(movieTitle);

            // Append the movieContainer to the movieList container
            movieList.appendChild(movieContainer);
        });
    } else {
        console.error('No results found in the API response.');
    }
})
.catch(error => {
    console.error('Error fetching data:', error);
});

// Function to fetch and display movie details
async function fetchMovieDetails(movieId) {
try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`);
    const movieDetails = await response.json();
    displayMovieDetails(movieDetails);
} catch (error) {
    console.error('Error fetching movie details:', error);
}
}

// Function to display movie details
function displayMovieDetails(movieDetails) {
const movieDetailsContainer = document.getElementById('movie-details');
movieDetailsContainer.innerHTML = `
    <h2>${movieDetails.title}</h2>
    <img src="https://image.tmdb.org/t/p/w500${movieDetails.poster_path}" alt="${movieDetails.title}">
    <p>${movieDetails.overview}</p>
    <p>Release Date: ${movieDetails.release_date}</p>
`;
}