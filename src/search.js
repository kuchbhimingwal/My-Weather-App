const listItems = document.querySelectorAll("#suggestedLoc ul li");
const inputField = document.querySelector('#searchInput');
listItems.forEach((item)=>{
  item.addEventListener('click',(e)=>{
    searchWeather(e.target.innerText);
  })
})
// to set the weather data for the listed city in the second panel
function searchWeather(location){
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${APIkey}`).then((response)=>{
    return response.json()
  }).then((data)=>{
    getWeatherData(data[0].lat,data[0].lon);
  }).catch((error)=>{
    console.log(error)
  });
}

inputField.addEventListener('keydown',(e)=>{
  // console.log('value = '+e.target.value);
  // console.log(e.key);
  // console.log(e.target.value+e.key);
  const inpVal = e.target.value+e.key ;
  let searchHtml = '';
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inpVal}&limit=5&appid=e1418eb1d9c7b0835d33abf765159443`).then((response)=>{
    return response.json()
  }).then((data)=>{
    data.forEach((data)=>{
      // console.log(`name: ${data.name} county: ${data.country} state: ${data.state} lat: ${data.lat} lon: ${data.lon}`)
      searchHtml += `
        <p onclick="getWeatherData(${data.lat},${data.lon})">${data.name},${data.country}</P>
      `
      document.querySelector('#searchResult').innerHTML = searchHtml;
    })
  }).catch((error)=>{
    console.log(error)
  });
})