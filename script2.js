let url = "https://www.omdbapi.com/?apikey=4df01060";
let input = document.querySelector("#input");
let button = document.querySelector(".search");
let display = document.getElementById("display");

async function getData() {
    let inputData = input.value;
    let data = await fetch(`${url}&s=${inputData}&type=movie`);
    let resultData = await data.json();
    console.log(resultData);
    return resultData;
}

async function renderMovies() {
    let data = await getData();
    input.value = "";
    display.innerHTML = "";

    if (data.Response === "False") {
        display.innerHTML = `<h2 style="color:white;">No movies found!</h2>`;
        return;
    }

    let movies = data.Search.slice(0, 10); 

    for (let movie of movies) {
        let div = document.createElement("div");
        div.className = "movie";

        div.innerHTML = `
            <img class="image" src="${movie.Poster !== "N/A" ? movie.Poster : "notfound.png"}" />
            <h2 class="title">${movie.Title}</h2>
            <h3 class="title">${movie.Year}</h3>
        `;
        display.appendChild(div);
    }
}

button.addEventListener("click", renderMovies);

input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        renderMovies();
    }
});
