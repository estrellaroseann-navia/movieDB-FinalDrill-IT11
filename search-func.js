function searchFunc() {
    const searchValue = document.getElementById('search').value;
    if (searchValue) {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_key}&query=${encodeURIComponent(searchValue)}`)
            .then(response => response.json())
            .then(data => {
                const movies = data.results;
                const movieDiv = document.getElementById('movies');
                movieDiv.innerHTML = '';
                movies.forEach(movie => {
                    const div = document.createElement('div');
                    div.className = 'movie';
                    div.innerHTML = `<img src="${img_path}${movie.poster_path}" alt="${movie.title}"><p>${movie.title}</p>`;
                    div.addEventListener('click', function () {
                        showMovieDetail(movie.id);
                    });
                    movieDiv.appendChild(div);
                });
            });
    }
}