const tday = document.getElementById("today");
const tdayD = document.getElementById("today-date") ;
const tdayC = document.getElementById("today-c") ;
const cnd = document.getElementById("cnd") ;
const imgg = document.getElementById("tday-img") ;
const tmorrowD = document.getElementById("tmrD") ;
const tmorrowcond = document.getElementById("tmr-con") ;
const Atmorrowcond = document.getElementById("a-tmr-con") ;
const tmorrowImg = document.getElementById("tmr-img") ;
const AtmorrowImg = document.getElementById("a-tmr-img") ;
const maxtmp = document.getElementById("mxtmp") ;
const mintmp = document.getElementById("mntmp") ;
const maxtmp2 = document.getElementById("mxtmp2") ;
const mintmp2 = document.getElementById("mntmp2") ;
const AfterDate = document.getElementById("AtomD") ;
const findBtn=document.getElementById("find");
const srcLocation = document.getElementById("srcloc");
function search(){
    getWeather(srcLocation.value);
}

const locationn = document.getElementById("location");
function addActive(id){
document.querySelector(".active").classList.remove("active");
document.getElementById(`${id}`).classList.add("active");
}
navigator.geolocation.getCurrentPosition((position)=>{
let myLet = position.coords.latitude;
let myLong = position.coords.longitude;
getWeather(`${myLet},${myLong}`);
});
async function getWeather(data){
let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=560fe4147128404db3991301242412&q=${data}&days=3&aqi=no&alerts=no
`);
let res=  await response.json();
displayTodaydata( res);
}
async function displayTodaydata(data){
  let myforecast = data.forecast.forecastday;
  let todayDate = new Date (myforecast[0].date);
  let tdayDateName = todayDate.toLocaleString("en-us",{weekday:"long"});
  tday.innerHTML =  tdayDateName ;
  tdayD.innerHTML = todayDate.toLocaleString("en-us",{day:"2-digit"})+todayDate.toLocaleString("en-us",{month:"long"}) ;
  let conditionn = data.current.condition;
  cnd.innerHTML = conditionn["text"];
  let image = conditionn["icon"];
  tdayC.innerHTML = data.current.temp_c+"<sup>o</sup>C" ;
  imgg.innerHTML=`<img class="card-img-top" src="https:${image}" alt="${cnd.innerHTML}">`;
  let locat = data["location"];
  locationn.innerHTML = locat["name"];
  displayTomorrow( await myforecast);
}
async function displayTomorrow( myforecast){
    let todayDate = new Date (myforecast[1].date);
    let tdayDateName = todayDate.toLocaleString("en-us",{weekday:"long"});
    tmorrowD.innerHTML = tdayDateName;
    let tmrCon= myforecast[1].day.condition.text;
    let tmrImg = myforecast[1].day.condition.icon;
    let maxTemp = myforecast[1].day.maxtemp_c;
    let minTemp = myforecast[1].day.mintemp_c;
    maxtmp.innerHTML= maxTemp+"<sup>o</sup>C";
    mintmp.innerHTML= minTemp+"<sup>o</sup>C";
    tmorrowcond.innerHTML = tmrCon;
    tmorrowImg.innerHTML=`<img class="card-img-top" src="https:${tmrImg}" alt="">`;
    displayAftTomorrow( await myforecast);
}
async function displayAftTomorrow(myforecast){
    let todayDate = new Date (myforecast[2].date);
    let tdayDateName = todayDate.toLocaleString("en-us",{weekday:"long"});
    AfterDate.innerHTML = tdayDateName;
    let AtmrCon= myforecast[2].day.condition.text;
    let AtmrImg = myforecast[2].day.condition.icon;
    let maxTemp2 = myforecast[2].day.maxtemp_c;
    let minTemp2 = myforecast[2].day.mintemp_c;
    maxtmp2.innerHTML= maxTemp2+"<sup>o</sup>C";
    mintmp2.innerHTML= minTemp2+"<sup>o</sup>C";
    tmorrowcond.innerHTML = AtmrCon;
    AtmorrowImg.innerHTML=`<img class="card-img-top" src="https:${AtmrImg}" alt="">`;

}