const inputText = document.querySelector(".inputText")
const errorText = document.getElementById("errorText")
const apikey = "e0cbd6835d5c8a119392e7b20a03b6ef"
let cityName = "hongkong"

function searchBtn() {
     if(inputText.value === ""){
        errorText.textContent = `Please write the city name`
    }else{
        cityName = inputText.value
        errorText.textContent = ""
        getCurrentWeatherAPI() 
        getfivedaysWeatherAPI()
        inputText.value = ""
    }
}



async function getCurrentWeatherAPI(){
    try{
        setTimeout(async ()=>{
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apikey}`)
                if(!res.ok) throw Error (error.statusText) 
                const data = await res.json()

                let iconId = data.weather[0].id
                document.getElementById("currentWeather").textContent = getWeatherIcon(iconId)

                const time = new Date(data.dt *1000).toLocaleTimeString() //time
                document.getElementById("date").textContent = `Update at ${time}`
                document.getElementById("location").textContent = `📪 ${data.name}`
                document.getElementById("temp_min").textContent = `⬇️${data.main.temp_min.toFixed(1)}°C`
                document.getElementById("temp_max").textContent = `⬆️${data.main.temp_max.toFixed(1)}°C`
                document.getElementById("temp").textContent = `${data.main.temp.toFixed(1)}°C`
                document.getElementById("humidity").textContent = `💧${data.main.humidity}%`
        },100)
    }catch(error){
        console.log(error)
    }

    function getWeatherIcon(iconId){
        if (iconId >= 200 && iconId <= 232) {
            return `⛈`
        } else if (iconId >= 300 && iconId <= 321){
            return `🌦`
        } else if (iconId >= 500 && iconId <= 531){
            return `🌧`
        } else if (iconId >= 600 && iconId <= 622){
            return `❄️`
        } else if (iconId >= 701 && iconId <= 781){
            return `💦`
        } else if (iconId === 800){
            return `☀️`
        } else if (iconId >= 801 && iconId <= 804) {
            return `☁️`
        }
    }
}

async function getfivedaysWeatherAPI(){
    try{
        setTimeout(async ()=>{
            const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apikey}`);
                    if(!res.ok) throw Error (error.statusText);
                    const data = await res.json()
                        
                    document.getElementById("titleText2").textContent = `5 days weather forecast - ${data.city.name}`
                    let output = document.getElementById("fiveDays")
                    output.innerHTML = ""

                    const numberId = [4,12,20,28,36]

                    numberId.forEach((element, index) =>{
                        const date = new Date(data.list[numberId[index]].dt *1000).toUTCString().slice(4,11)
                        const week = new Date(data.list[numberId[index]].dt *1000).toUTCString().slice(0,3).toUpperCase()
                        const iconId = data.list[numberId[index]].weather[0].id;
                        const temp_min1 = data.list[numberId[index]].main.temp_min.toFixed(0)
                        const temp_max1 = data.list[numberId[index]].main.temp_max.toFixed(0)
                        const humidity1 = data.list[numberId[index]].main.humidity

                        output.innerHTML += `
                        <div class="box">
                            <p id="day${index}" class="day1">${date}</p>
                            <p id="week${index}" calss="week1">${week}</p>
                            <p id="icon${index}" class="icon1">${getIcon(iconId)}</p>
                        <div class="row">
                            <p id="temp_min${index}" class="temp_min1">${temp_min1} |</p>
                            <p id="temp_max${index}" class="temp_max1">${temp_max1}°C</p>
                        </div>
                            <p id="humidity${index}" class="humidity1">${humidity1}%</p>
                        </div>
                        `       
                    })
        },100)
    }catch(error){
        console.log(error)
    }
    function getIcon(iconId){
        if (iconId >= 200 && iconId <= 232) {
            return `⛈`
        } else if (iconId >= 300 && iconId <= 321){
            return `🌦`
        } else if (iconId >= 500 && iconId <= 531){
            return `🌧`
        } else if (iconId >= 600 && iconId <= 622){
            return `❄️`
        } else if (iconId >= 701 && iconId <= 781){
            return `💦`
        } else if (iconId === 800){
            return `☀️`
        } else if (iconId >= 801 && iconId <= 804) {
            return `☁️`
        }
    }
}

getCurrentWeatherAPI()
getfivedaysWeatherAPI()
