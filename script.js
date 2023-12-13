const apikey1="589b42544b3f2c44e96fe9ff1e855529";
const apiurl1="https://api.openweathermap.org/data/2.5/weather?s&units=metric&q=";
const apikey2="b8c5eb3b98fefc5637e5cacc7dc934a0";
const apiurl2="https://api.openweathermap.org/data/2.5/forecast?&units=metric&q=";

const seacrchBox=document.querySelector(".search input");
const seacrchBut=document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather-icon");
const dat=document.getElementById('dat');
const dis=document.getElementById("weather-dis");
const audio1=document.getElementById("myaudio");

async function chweather1(city){
    audio1.pause();
    audio1.currentTime = 0;
    const res=await fetch(apiurl1+city+`&appid=${apikey1}`);
    if(res.status==404){
        document.querySelector(".undefined").style.display="block";
        document.querySelector(".weather").style.display="none";
    }else{    
    var data1=await res.json();
    console.log(data1);
    document.querySelector(".city").textContent=data1.name;
    document.querySelector(".temp").textContent=Math.round(data1.main.temp)+"°c";
    document.querySelector(".humid").textContent=data1.main.humidity+"%";
    document.querySelector(".wind").textContent=data1.wind.speed+"km/hr";
    if(data1.weather[0].main=="Clouds"){
        weatherIcon.src="images/clouds.png";
        document.body.style.backgroundImage='url(gif/cloudy.gif)';
        playWeathersound("cloud");
        
    }
    else if(data1.weather[0].main=="Clear"||data1.weather[0].main=="Haze"){
        weatherIcon.src="images/clear.png";
        document.body.style.backgroundImage='url(gif/sun.webp)';
        playWeathersound("clear");
    }
    else if(data1.weather[0].main=="Rain"||data1.weather[0].main=="Thunderstorm"){
        weatherIcon.src="images/rain.png";
        document.body.style.backgroundImage='url(gif/rain.gif)';
        playWeathersound("rain");
    }
    else if(data1.weather[0].main=="Drizzle"){
        weatherIcon.src="images/drizzle.png";
        document.body.style.backgroundImage='url(gif/rain2.gif)';
        playWeathersound("rain");
    }
    else if(data1.weather[0].main=="Mist"||data1.weather[0].main=="Smoke"){
        weatherIcon.src="images/mist.png";
        document.body.style.backgroundImage='url(gif/mist.gif)';
        playWeathersound("cloud");
    }
    else if(data1.weather[0].main=="Snow"){
        weatherIcon.src="images/snow.png";
        document.body.style.backgroundImage='url(gif/snow.gif)';
        playWeathersound("snow");
    }

    dis.style.display="block";
    const curdat=new Date().toDateString();
    dat.textContent=` DAY1 ${curdat}`;
    document.querySelector(".undefined").style.display="none";
}
}
seacrchBut.addEventListener("click",()=>{
        chweather1(seacrchBox.value);
        chweather4(seacrchBox.value);
        audio1.pause();
        audio1.currentTime = 0;
});
seacrchBox.addEventListener("keypress",(event)=>{
    if(event.key==="Enter"){
        event.preventDefault();
        chweather1(seacrchBox.value);
        chweather4(seacrchBox.value);
        
    }
})
const currentDate=new Date();
const weatherIcon1=document.querySelector(".weather-icon1");
const weadis4=document.getElementById('weathers4-dis');
async function chweather4(city){
    const res4=await fetch(apiurl2+city+`&appid=${apikey2}`);
    if(res4.status==404){
        document.querySelector(".undefined").style.display="block";
        document.querySelector(".weather").style.display="none";
    }else{
        var data4=await res4.json();
        console.log(data4);
        // Get the current date
        const currentDate = new Date();
        // Initialize an array to store the next 3 days
        const next3Days = [];
        // Loop to calculate and store the next 3 days
        for (let i = 0; i < 3; i++) {
            const nextDate = new Date(currentDate);
            nextDate.setDate(currentDate.getDate() + i + 1);
          
            // Format the date string to include only day, month, date, and year
            const formattedDate = nextDate.toDateString();
          
            next3Days.push(formattedDate);
          }
          console.log(next3Days);
        // Display the dates in a readable format
        const matchingData = data4.list.filter(item => {
  // Convert the timestamp to a date string for comparison
  const itemDate = new Date(item.dt * 1000).toDateString();
  return next3Days.includes(itemDate);
});
    console.log(matchingData);
    const final4=matchingData.filter(entry=>{
        const time=entry.dt_txt.split(' ')[1];
        return time==='06:00:00';
    });
    console.log(final4);
    for (let i = 1; i <= 3; i++) {
        const city = `.city${i}`;
        const temp=`.temp${i}`;
        const humid=`.humid${i}`;
        const wind=`.wind${i}`;
        const imgsrc=`.weather-icon${i}`;
        const dat4=`dat${i}`;
        var ite=i;
        updateCityData(city,temp,humid,wind,ite,imgsrc,dat4,next3Days);
      }
      function updateCityData(city,temp,humid,wind,ite,imgsrc,dat4,next3Days){
        document.querySelector(city).textContent=final4[ite-1].name;
        document.querySelector(temp).textContent=Math.round(final4[ite-1].main.temp)+"°c";
        document.querySelector(humid).textContent=final4[ite-1].main.humidity+"%";
        document.querySelector(wind).textContent=final4[ite-1].wind.speed+"km/hr";
        document.getElementById(dat4).textContent=`DAY${ite+1}   ${next3Days[ite-1]}`;
        const weatherIcon4=document.querySelector(imgsrc);
        if(final4[ite-1].weather[0].main=="Clouds"){
            weatherIcon4.src="images/clouds.png";
        }
        else if(final4[ite-1].weather[0].main=="Clear"){
            weatherIcon4.src="images/clear.png";
        }
        else if(final4[ite-1].weather[0].main=="Rain"||final4[ite-1].weather[0].main=="Thunder"){
            weatherIcon4.src="images/Rain.png";
        }
        else if(final4[ite-1].weather[0].main=="Drizzle"){
            weatherIcon4.src="images/drizzle.png";
        }
        else if(final4[ite-1].weather[0].main=="Mist"||final4[ite-1].weather[0].main=="Smoke"){
            weatherIcon4.src="images/mist.png";
        }
        else if(final4[ite-1].weather[0].main=="Snow"){
            weatherIcon.src="images/snow.png";
        }
        weadis4.style.display="flex";
      }
    }
}
function playWeathersound(name){
    audio1.src=`sounds/${name}.mp3`;
    audio1.load();
    audio1.play();
}