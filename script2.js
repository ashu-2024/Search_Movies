const url = "https://www.omdbapi.com/?apikey=4df01060";
const input = document.querySelector("#input");
const button = document.querySelector(".search");
const display = document.getElementById("display");

const getData = async (searchTerm) => {
  try {
    const res = await fetch(`${url}&s=${searchTerm}&type=movie`);
    const data = await res.json();
    return data.Search || [];
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return [];
  }
};

const showMovies = (movies) => {
  display.innerHTML = "";

  if (movies.length === 0) {
    display.innerHTML = "<h2 style='color:white; text-align:center;'>No results found.</h2>";
    return;
  }

  movies.slice(0, 10).forEach((movie) => {
    display.innerHTML += `
      <div class="movie">
        <img class="image" src="${movie.Poster}" />
        <h2 class="title">${movie.Title}</h2>
        <h3 class="title">${movie.Year}</h3>
      </div>
    `;
  });
};

const handleSearch = async () => {
  const searchTerm = input.value.trim();
  if (!searchTerm) return;
  const movies = await getData(searchTerm);
  showMovies(movies);
  input.value = "";
};

button.addEventListener("click", handleSearch);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});
