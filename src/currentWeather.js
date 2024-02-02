let currentLat = 0;
let currentLong = 0;
const APIkey = 'e1418eb1d9c7b0835d33abf765159443';

//function to print the data we got from fetch
function printMain(weatherData){
  //To get local date accorning to the timezone
  const datefirst = new Date();
  var utc = datefirst.getTime() + (datefirst.getTimezoneOffset() * 60000);
  var date = new Date(utc + (3600000*(weatherData.timezone/3600)));

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const mainDisplayHtml = `
  <span><h1>${(weatherData.main.temp-273.15).toFixed(1)}</h1></span>
  <span>
    <h3>${weatherData.name}</h3>
    <p>${date.getHours()}:${date.getMinutes()}-${date.toLocaleDateString(undefined, options)}</p>
  </span>
  <span>
  <p1>${weatherData.weather[0].description}</p1>
  <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png"></img>
  </span>`;

  const sideDisplayHtml = `

    <table>
      <tbody>
        <tr>
          <td>Feels like</td>
          <td class="align-right">${(weatherData.main.feels_like - 273.15).toFixed(1)}</td>
        </tr>
        <tr>
          <td>Max Temperature</td>
          <td class="align-right">${(weatherData.main.temp_max - 273.15).toFixed(1)}</td>
        </tr>
        <tr>
          <td>Min Temperature</td>
          <td class="align-right">${(weatherData.main.temp_min - 273.15).toFixed(1)}</td>
        </tr>
        <tr>
          <td>Cloudy</td>
          <td class="align-right">${weatherData.clouds.all}</td>
        </tr>
        <tr>
          <td>Humidity</td>
          <td class="align-right">${weatherData.main.humidity}</td>
        </tr>
        <tr>
          <td>Wind</td>
          <td class="align-right">${weatherData.wind.speed}km/h</td>
        </tr>
        <tr>
          <td>Wind</td>
          <td class="align-right">${weatherData.wind.speed}km/h</td>
        </tr>
      </tbody>
    </table>
  `
  document.querySelector('#wethaerInfo').innerHTML = mainDisplayHtml;
  document.querySelector('#info').innerHTML = sideDisplayHtml;
}

//this is the function to call the api with fetch
function getWeatherData(la,lo){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${la}&lon=${lo}&appid=${APIkey}`).then((response)=>{
    return response.json()
  }).then((data)=>{
    console.log(data)
    printMain(data);
  }).catch((error)=>{
    console.log(error)
  });

}

//this is a api call to get your current location from the browser
async function getLocation() {
  return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function main() {
  try {
      const position = await getLocation();
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      getWeatherData (latitude,longitude);
      // console.log("Latitude:", latitude);
      // console.log("Longitude:", longitude);
      // Use latitude and longitude for further processing
  } catch (error) {
      console.error("Error getting location:", error);
  }
}

main();




