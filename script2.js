// let url = "https://www.omdbapi.com/?apikey=4df01060";
// let input = document.querySelector("#input");
// let button = document.querySelector(".search");
// let display = document.getElementById("display");

// async function getData() {
//     let inputData = input.value;
//     let data = await fetch(`${url}&s=${inputData}&type=movie`);
//     let resultData = await data.json();
//     console.log(resultData);
//     return resultData;
// }

// button.addEventListener('click', async () => {
//     let data = await getData();
//     input.value = "";
//     display.innerHTML="";
//     //let length = data.Search.length;
//     for (let i = 0; i < 10; i++) {
//         let div = document.createElement("div");
//         div.className="movie";
//         div.innerHTML = `
//             <img class="image" src="${data.Search[i].Poster}">
//             <h2 style="text-align:center;" class="title">
//                 ${data.Search[i].Title}
//             </h2>
//             <h3 class="title">
//                 ${data.Search[i].Year}
//             </h3>
//         `;
//         display.appendChild(div);
//     }
// });


const url = "https://www.omdbapi.com/?apikey=4df01060";
const input = document.querySelector("#input");
const button = document.querySelector(".search");
const display = document.getElementById("display");

const getData = async (searchTerm) => {
    const res = await fetch(`${url}&s=${searchTerm}&type=movie`);
    const data = await res.json();
    return data.Search || [];
};

const showMovies = (movies) => {
    display.innerHTML = "";
    movies.slice(0, 10).forEach(movie => {
        display.innerHTML += `
            <div class="movie">
                <img class="image" src="${movie.Poster}">
                <h2 style="text-align:center;" class="title">${movie.Title}</h2>
                <h3 class="title">${movie.Year}</h3>
            </div>
        `;
    });
};

button.addEventListener("click", async () => {
    const searchTerm = input.value.trim();
    if (!searchTerm) return;
    const movies = await getData(searchTerm);
    showMovies(movies);
    input.value = "";
});
