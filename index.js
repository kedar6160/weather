const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
// const  = document.getElementById('am-pm');
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timeZone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const currentTempEl = document.getElementById("current-temp");
const weatherForcastEl = document.getElementById("weather-forcast");





const week = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];


getWeatherData();
function getWeatherData() {
 
   
  navigator.geolocation.getCurrentPosition((success) => {
    console.log(success);
    // boolean enableHighAccuracy = false;
    const { latitude, longitude } = success.coords;

      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=ece17acdd7064c16af862741232403&q=${latitude},${longitude}&days=7`
      )
        .then((res) => res.json())
        .then((data)=>{
          console.log("Data2");
          console.log(data);
          showWeatherData(data);
          showTimezone(data);
          showCurrent(data);
          showForecast(data);
        

        })
          
  });
}



function showCurrent(data) {
  let {sunrise, sunset} = data.forecast.forecastday[0].astro;
  let {avgtemp_c,avghumidity}= data.forecast.forecastday[0].day;
  let icon = data.forecast.forecastday[0].day.condition.icon;
  const time = new Date();
  let day= time.getDay();
  

  currentTempEl.innerHTML = `
  <img
  src="${icon}"
  alt="weather icon"
  class="w-icon"
/>
<div class="others">
  <div class="day">${week[day-1]}</div>
  <div class="temp">${avgtemp_c}&#176; c</div>
  <div class="Sunrise"> Sunrise ${sunrise}</div>
  <div class="Sunset">Sunset ${sunset}</div>
</div>`
}
function showForecast(data) {
  const time = new Date();
  let day= time.getDay();

  let forecastDay= '';
  for(let i=1;i<7;i++){
  let {sunrise, sunset} = data.forecast.forecastday[i].astro;
  let {avgtemp_c,avghumidity}= data.forecast.forecastday[i].day;
  let icon = data.forecast.forecastday[i].day.condition.icon;
  let da = week[day>=7 ? day-6-1 : day];
  day++;
  console.log(da);
    forecastDay += `
  <div class="weather-forcast-item">
    <img
    src="${icon}"
    alt="weather icon"
    class="w-icon"
  />
  
    <div class="day">${da}</div>
    <div class="temp">${avgtemp_c}&#176; c</div>
    <div class="Sunrise"> Sunrise ${sunrise}</div>
    <div class="Sunset">Sunset ${sunset}</div>
  </div>`
  }
  weatherForcastEl.innerHTML = forecastDay;

}

function showTimezone(data) {
let {tz_id,country} = data.location;
countryEl.innerHTML=country;
timeZone.innerHTML=tz_id;

}

function showWeatherData(data) {
  let{humidity,pressure_in,wind_kph,temp_c} = data.current;
  let {sunrise, sunset} = data.forecast.forecastday[0].astro;


  currentWeatherItemsEl.innerHTML= 
    `
  <div class="weather-item">
    <div>Humidity</div>
    <div>${humidity} %</div>
  </div>
  <div class="weather-item">
    <div>Pressure</div>
    <div>${pressure_in}</div>
  </div>
  <div class="weather-item">
    <div>Wind Speed</div>
    <div>${wind_kph} k/h</div>
  </div>
  <div class="weather-item">
    <div>Temprature</div>
    <div>${temp_c} &#176; c</div>
  </div>
  <div class="weather-item">
    <div>Sunrise</div>
    <div>${sunrise}</div>
  </div>
  <div class="weather-item">
    <div>Sunset</div>
    <div>${sunset}</div>
  </div>
  `
}
setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const minutes = time.getMinutes();
  const hour12 = hour > 12 ? hour % 12 : hour;
  const ampm = hour <= 12 ? "AM" : "PM";

  timeEl.innerHTML =
    hour12 +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    " " +
    `<span id="am-pm">${ampm}</span>`;
  dateEl.innerHTML = week[day-1] + " , " + date + " " + months[month];

}, 1000);
