

# 🎬 Movie Search App Pro

A modern, responsive movie discovery application featuring a cinematic user interface. Users can search for specific titles, browse trending movies, filter by mood/genre, and save their favorite picks directly to their browser.

**[🚀 View Live Demo][(https://movie-search-app-six-sand.vercel.app/)]**

---

## ✨ Key Features

* **Cinematic UI:** The app background dynamically shifts to match the movie you are hovering over, utilizing glass-morphism effects.
* **Smart Search & Filters:** Search by specific title or instantly browse by "Mood" (Action, Comedy, Sci-Fi, Spooky, etc.).
* **Persistent Favorites:** Save movies to a dedicated watchlist using `localStorage` so they are waiting for you when you come back.
* **Dynamic Scoring Badge:** Custom percentage-based score rings that change color based on the movie's rating (Green = Great, Yellow = Mixed, Red = Poor).
* **Secure Backend Proxy:** Utilizes Vercel Serverless Functions to securely fetch data from the TMDB API without exposing the private API key to the frontend.
* **Fully Responsive:** Clean sidebar navigation on desktop that seamlessly shifts to a mobile-friendly layout on smaller screens.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, Vanilla JavaScript, Tailwind CSS
* **Backend/Proxy:** Vercel Serverless Functions (Node.js)
* **Data Source:** [The Movie Database (TMDB) API](https://developer.themoviedb.org/docs)
* **Deployment:** Vercel

---

## 🚀 Running it Locally

Because this project uses a Vercel Serverless Function to hide the API key, you will need the Vercel CLI to run it locally so the `/api/movies` route works.

**1. Clone the repository:**
```bash
git clone [https://github.com/Obakeng520/MovieSearchApp.git](https://github.com/Obakeng520/MovieSearchApp.git)
cd MovieSearchApp
