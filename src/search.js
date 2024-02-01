const listItems = document.querySelectorAll("#suggestedLoc ul li");
listItems.forEach((item)=>{
  item.addEventListener('click',(e)=>{
    searchWeather(e.target.innerText);
  })
})

function searchWeather(location){
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${APIkey}`).then((response)=>{
    return response.json()
  }).then((data)=>{
    getWeatherData(data[0].lat,data[0].lon);
  }).catch((error)=>{
    console.log(error)
  });
}