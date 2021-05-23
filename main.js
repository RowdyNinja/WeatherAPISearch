const API_URL = "http://api.openweathermap.org/data/2.5/weather?"

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getCity("Sydney");

async function getCity(cityName) {
    console.log(`entered ${cityName}`)
    const respose = await fetch(API_URL + `q=${cityName}&APPID=3a2c30a03141ae70c414676b0c7684b5`)
    const responseData = await respose.json();

    createCityCard(responseData);
}

function createCityCard(city) {
    let temperature = city.main.temp - 273;
    const cardHTML = `
        <div class="card">
            <h1>${city.name}</h1>
            <div class="weather-info">
                <img src="http://openweathermap.org/img/w/${city.weather[0].icon}.png">
                <h4 class="description">${city.weather[0].description}</h4>
                <h4 class="temp">${Math.round(temperature*10)/10}&#8451</h4>
            </div>
        <div>
    `;
    main.innerHTML = cardHTML;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityName = search.value;
    if (cityName) {
        getCity(cityName);
        search.value = "";
    }
});