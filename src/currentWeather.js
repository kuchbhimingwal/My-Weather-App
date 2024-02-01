let currentLat = 0;
let currentLong = 0;
const APIkey = 'e1418eb1d9c7b0835d33abf765159443';
//function to print the data we got from fetch
function printMain(weatherData){
  const date = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const mainDisplayHtml = `
  <span><h1>${(weatherData.main.temp-273.15).toFixed(1)}</h1></span>
  <span>
    <h3>${weatherData.name}</h3>
    <p>${date.getHours()}:${date.getMinutes()}-${date.toLocaleDateString(undefined, options)}}</p>
  </span>
  <span><p1>${weatherData.weather[0].description}</p1></span>`;

  document.querySelector('#wethaerInfo').innerHTML = mainDisplayHtml;
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
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);
      // Use latitude and longitude for further processing
  } catch (error) {
      console.error("Error getting location:", error);
  }
}

main();




