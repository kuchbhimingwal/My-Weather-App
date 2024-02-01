const listItems = document.querySelectorAll("#suggestedLoc ul li");
const inputField = document.querySelector('#searchInput');

listItems.forEach((item)=>{
  item.addEventListener('click',(e)=>{
    searchWeather(e.target.innerText);
  })
})
// to listen the click event on the listed cities name and fetch the lat and long from the geo api to send to getWeatherData function as to print the weather info into the web
function searchWeather(location){
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${APIkey}`).then((response)=>{
    return response.json()
  }).then((data)=>{
    getWeatherData(data[0].lat,data[0].lon);
  }).catch((error)=>{
    console.log(error)
  });
}
// listning to the keydown in the input field as to fetch each character in the open weather geo api to make a list of first  five counties
inputField.addEventListener('keydown',(e)=>{
  let inpVal = '';
  let searchHtml = '';

  if(e.key !== "Backspace"){
    inpVal = e.target.value+e.key ;
    console.log(inpVal);
  }else{
    inpVal = e.target.value.slice(0, -1);
    console.log(inpVal);
  }
  //fetching each character in the input field to from the geo api to get the first five country in result
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inpVal}&limit=5&appid=${APIkey}`).then((response)=>{
    return response.json()
  }).then((data)=>{
    data.forEach((data)=>{
      searchHtml += `
        <p onclick="getWeatherData(${data.lat},${data.lon})">${data.name},${data.country}</P>
      `
      document.querySelector('#searchResult').innerHTML = searchHtml;
    })
  }).catch((error)=>{
    console.log(error)
  });
})