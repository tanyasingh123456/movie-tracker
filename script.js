
let APIKey = "677ce260"; // Use environment variable in production
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

const getData = async (movie) => {
    try {
        let fetchData = await fetch(`https://www.omdbapi.com/?s=${movie}&apikey=${APIKey}`);
        let jsonData = await fetchData.json();

        if (jsonData.Response === "True") {
            document.querySelector(".card").innerHTML = ""; // Clear previous results
            jsonData.Search.forEach((data) => {
                let div = document.createElement("div");
                div.classList.add("movieCard");
                div.innerHTML = `
                    <img src="${data.Poster}" alt="${data.Title}">
                    <div class="cardText">
                        <h1><span>${data.Title}</span></h1>
                        <p>Year:<span> ${data.Year}</span></p>
                        <p>Type:<span> ${data.Type}</span></p>
                        <p>imdbID:<span> ${data.imdbID}</span></p>
                    </div>
                `;
                document.querySelector(".card").appendChild(div);
            });
        } else {
            document.querySelector(".card").innerHTML = `<h1>${jsonData.Error}</h1>`;
        }
    } catch (error) {
        document.querySelector(".card").innerHTML = "<h1>Something went wrong!</h1>";
        console.error("Error fetching data:", error);
    }
};

searchBtn.addEventListener("click", function () {
    let movieName = searchInput.value.trim();
    if (movieName) {
        getData(movieName);
    } else {
        document.querySelector(".card").innerHTML = "<h1>First search for a movie name</h1>";
    }
});










