const API_KEY = '7fa9b3f22bacdc9d4dd13c68aecb18e1'; 
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const DISCOVER_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const form = document.getElementById('search-form');
const search = document.getElementById('search-input');
const main = document.getElementById('movie-grid');
const searchHeader = document.getElementById('search-header');
const pageTitle = document.getElementById('page-title');
const toastContainer = document.getElementById('toast-container');

let currentView = 'search';

// Load initial movies
getMovies(DISCOVER_API);

async function getMovies(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        showMovies(data.results);
    } catch (error) {
        console.error("Error fetching data:", error);
        main.innerHTML = '<p class="text-red-500 text-center col-span-full">Failed to load movies. Check your API key.</p>';
    }
}

function getFavorites() {
    return JSON.parse(localStorage.getItem('movie_favorites')) || [];
}

function showMovies(movies) {
    main.innerHTML = '';
    const favorites = getFavorites();

    if (!movies || movies.length === 0) {
        main.innerHTML = '<p class="text-gray-400 text-center col-span-full">No movies found.</p>';
        return;
    }

    movies.forEach((movie) => {
        const { id, title, poster_path, vote_average } = movie;
        if (!poster_path) return; // Skip movies without images to keep the UI clean

        // Check if movie is already in favorites to color the heart icon
        const isFav = favorites.some(fav => fav.id === id);
        const heartColor = isFav ? 'text-red-500' : 'text-white';

        const movieEl = document.createElement('div');
        movieEl.classList.add('bg-gray-800', 'rounded-lg', 'overflow-hidden', 'shadow-lg', 'relative', 'group', 'hover:scale-[1.02]', 'transition-transform');

        // Safely pass movie data to the toggle function
        const movieData = JSON.stringify({id, title, poster_path, vote_average}).replace(/"/g, '&quot;');

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}" class="w-full h-80 object-cover">
            <button onclick="toggleFavorite(${movieData})" 
                class="absolute top-2 right-2 bg-black/70 p-2 rounded-full hover:bg-black transition-colors">
                <span id="heart-${id}" class="text-xl ${heartColor} drop-shadow-md">❤</span>
            </button>
            <div class="p-4">
                <h3 class="font-bold text-lg mb-1 truncate" title="${title}">${title}</h3>
                <div class="flex justify-between items-center text-sm">
                    <span class="text-yellow-400 font-bold flex items-center gap-1">
                        ★ ${vote_average ? vote_average.toFixed(1) : 'N/R'}
                    </span>
                </div>
            </div>
        `;
        main.appendChild(movieEl);
    });
}

function toggleFavorite(movie) {
    let favorites = getFavorites();
    const index = favorites.findIndex(fav => fav.id === movie.id);
    const heartIcon = document.getElementById(`heart-${movie.id}`);

    if (index !== -1) {
        // Remove from favorites
        favorites.splice(index, 1);
        showToast(`${movie.title} removed`, 'bg-gray-700');
        if (heartIcon) heartIcon.classList.replace('text-red-500', 'text-white');
        
        // If we are currently looking at the favorites page, refresh the grid
        if (currentView === 'favorites') showFavorites(); 
    } else {
        // Add to favorites
        favorites.push(movie);
        showToast(`${movie.title} added!`, 'bg-red-600');
        if (heartIcon) heartIcon.classList.replace('text-white', 'text-red-500');
    }

    localStorage.setItem('movie_favorites', JSON.stringify(favorites));
}

// Navigation Functions
function showSearch() {
    currentView = 'search';
    searchHeader.classList.remove('hidden');
    pageTitle.classList.add('hidden');
    
    // Reset sidebar styling
    document.getElementById('nav-search').classList.replace('bg-transparent', 'bg-red-600');
    document.getElementById('nav-search').classList.replace('text-gray-300', 'text-white');
    document.getElementById('nav-fav').classList.replace('bg-red-600', 'bg-transparent');
    
    getMovies(DISCOVER_API); // Load popular movies
}

function showFavorites() {
    currentView = 'favorites';
    searchHeader.classList.add('hidden');
    pageTitle.classList.remove('hidden');
    
    // Update sidebar styling
    document.getElementById('nav-fav').classList.replace('bg-transparent', 'bg-red-600');
    document.getElementById('nav-fav').classList.replace('text-gray-300', 'text-white');
    document.getElementById('nav-search').classList.replace('bg-red-600', 'bg-transparent');

    showMovies(getFavorites()); // Load from LocalStorage
}

// Custom Toast Notification System
function showToast(message, colorClass) {
    const toast = document.createElement('div');
    toast.className = `${colorClass} text-white px-6 py-3 rounded shadow-lg mb-2 transition-opacity duration-300 font-semibold`;
    toast.innerText = message;
    
    toastContainer.appendChild(toast);
    
    // Fade out and remove
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// Handle the Search Bar Submit
if(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = search.value.trim();
        if (searchTerm) {
            getMovies(SEARCH_API + searchTerm);
            search.value = '';
        } else {
            getMovies(DISCOVER_API); // If search is empty, show trending
        }
    });
}