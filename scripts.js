// Check for saved dark mode preference or system preference
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
}
// Listen for dark mode toggle
document.getElementById('darkModeToggle').addEventListener('click', function () {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    }
});


//  Write your JavaScript code here...
const searchResults = document.querySelector("#searchResults");
const movieInfo = document.querySelector("#movieInfo");


const showMovieDetails = (imdbID) => {
    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=2845724f`)
    .then(response => response.json())
    .then((data) => {
        const genre_html = data.Genre.split(", ").map(
            genre => ` <span class="px-3 py-1 rounded-full glass-effect text-sm">${genre}</span>`
        ).join("");
        
        
        const movieDetails = `<div class="glass-effect rounded-xl p-8 transform transition-all duration-500">
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="md:col-span-1">
                        <!-- Poster Image -->
                        <img src="${data.Poster}"
                            alt="${data.Title}"
                            class="w-full rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300">

                        <div class="mt-6 grid grid-cols-2 gap-4">
                            <!-- IMDB Rating -->
                            <div class="glass-effect rounded-lg p-4 text-center">
                                <div class="text-3xl font-bold text-blue-400">${data.imdbRating}</div>
                                <div class="text-sm text-gray-400">IMDb</div>
                            </div>

                            <!-- Metascore -->
                            <div class="glass-effect rounded-lg p-4 text-center">
                                <div class="text-3xl font-bold text-purple-400">${data.Metascore}</div>
                                <div class="text-sm text-gray-400">Metascore</div>
                            </div>
                        </div>
                    </div>
                    <div class="md:col-span-2">
                        <!-- Movie Title -->
                        <h2 class="text-4xl font-bold mb-4">${data.Title}
                            <!-- Movie Year -->
                            <span class="text-gray-400">${data.Year}</span>
                        </h2>

                        <!-- Movie Genre -->
                        <div class="flex flex-wrap gap-2 mb-6">
                           ${genre_html}
                        </div>

                        <!-- Movie Plot -->
                        <p class="text-lg mb-6 leading-relaxed text-gray-300">
                            ${data.Plot}
                        </p>
                        <div class="grid grid-cols-2 gap-6">
                            <!-- Movie Director -->
                            <div>
                                <h3 class="font-semibold text-blue-400 mb-2">Director</h3>
                                <p class="text-gray-300">${data.Director}</p>
                            </div>

                            <!-- Movie Cast -->
                            <div>
                                <h3 class="font-semibold text-blue-400 mb-2">Cast</h3>
                                <p class="text-gray-300">${data.Actors}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        movieInfo.innerHTML += movieDetails;
        movieInfo.classList.remove("hidden");
    })
    }

const searchMovie = (title) => {
    fetch(
        `http://www.omdbapi.com/?i=tt3896198&apikey=2845724f&s=${title}`
    )
    .then(response => response.json())
    .then((data) => {
        data.Search.forEach((movie)=> {
        const movie_card = `<div class="movie-card glass-effect rounded-xl overflow-hidden cursor-pointer hover:shadow-xl"
        onclick="showMovieDetails('${movie.imdbID}')">
                <div class="aspect-[2/3] bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                    <!-- Movie Poster -->
                    <img src="${movie.Poster}"
                        alt="${movie.Title}"
                        class="w-full h-full object-cover hover:scale-110 transition-transform duration-300">
                </div>
                <div class="p-4">
                    <!-- Movie Title -->
                    <h3 class="font-semibold text-gray-900 dark:text-white line-clamp-1">${movie.Title}</h3>
                    <!-- Movie Year -->
                    <p class="text-sm text-gray-600 dark:text-gray-400">${movie.Year}</p>
                </div>
            </div>`
        searchResults.innerHTML += movie_card;
    }
    );
    
})
}

document.querySelector("#searchInput").addEventListener("keypress",(e) => {
    if (e.key == "Enter") {
        movieInfo.classList.add("hidden");
        movieInfo.innerHTML="";
        searchResults.innerHTML = "";
        searchMovie(e.target.value);
    }
});