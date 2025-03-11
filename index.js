const timeOutput = document.querySelector('.time');
const app = document.querySelector('.weather-app');
const dateOutput = document.querySelector('.date');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');
const cloudOutput = document.querySelector('.cloud');
const icon = document.querySelector('.icon');
const temp = document.querySelector('.temp');
const search = document.querySelector('.search');

let cityInput = "Chennai";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity = "0";
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (search.value.trim().length === 0) {
        alert('Please type in a city');
    } else {
        cityInput = search.value.trim();
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }
});

function dayOfTheWeek(day, month, year) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[new Date(`${year}-${month}-${day}`).getDay()];
}

function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=6c0bf9cdb3b24ea38c8171413241608&q=${cityInput}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            temp.innerHTML = data.current.temp_c + "&#176;";
            conditionOutput.innerHTML = data.current.condition.text;

            const date = data.location.localtime;
            const [year, month, day] = date.substr(0, 10).split('-');
            const time = date.substr(11);

            dateOutput.innerHTML = `${dayOfTheWeek(day, month, year)} ${day}, ${month}, ${year}`;
            timeOutput.innerHTML = time;

            nameOutput.innerHTML = data.location.name;
            icon.src = "https:" + data.current.condition.icon;

            cloudOutput.innerHTML = data.current.cloud + "%";
            humidityOutput.innerHTML = data.current.humidity + "%";
            windOutput.innerHTML = data.current.wind_kph + "km/h";

            let timeOfDay = "day";
            const code = data.current.condition.code;

            if(!data.current.is_day){
                timeOfDay = "night";
            }

            

            if (code === 1000) {
                app.style.backgroundImage = `url(./${timeOfDay}/beach.avif)`;
                btn.style.background = timeOfDay === "day" ? "#e5ba92" : "#181e27";
            } else if ([1003, 1006, 1009, 1030, 1069, 1087, 1135, 1273, 1276, 1279, 1282].includes(code)) {
                app.style.backgroundImage = `url(./${timeOfDay}/weather.avif)`;
                btn.style.background = timeOfDay === "day" ? "#fa6d1b" : "#181e27";
            } else if ([ 1063, 1150, 1180, 1183, 1186, 1192, 1240, 1243, 1246].includes(code)) {
                app.style.backgroundImage = `url(.${timeOfDay}/rainys.jpg)`;
                btn.style.background = timeOfDay === "day" ? "#647d75" : "#325c80";

            
            } else {
                app.style.backgroundImage = `url(./${timeOfDay}/snowy.jpg)`;
                btn.style.background = timeOfDay === "day" ? "#4d72aa" : "#1b1b1b";
            }

            app.style.opacity = "1";
        })
        .catch(err => {
            console.error(err);
            alert('City not found, please try again');
            app.style.opacity = "1";
        });
}

fetchWeatherData();
app.style.opacity = "1";
