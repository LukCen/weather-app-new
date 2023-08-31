

const userQuery = document.querySelector('.user-query')
const btnFetch = document.querySelector('.btn-search')
const userKey = '7cc4b1b363df46e7aa2112456232808'

async function getWeatherData(){
    const linkToQuery = `https://api.weatherapi.com/v1/current.json?key=${userKey}&q=${userQuery.value.toLowerCase()}`

    const weatherImage = document.querySelector('img')
    const weatherDataTemp = document.querySelector('.weather-data-temperature');
    const weatherDataCityName = document.querySelector('.weather-data-city-name');
    const weatherDataWindspeed = document.querySelector('.weather-data-windspeed');
    const weatherDataHumidity = document.querySelector('.weather-data-humidity');

    const iconWindspeed = document.createElement('box-icon')
    iconWindspeed.setAttribute('name', 'wind')
    iconWindspeed.setAttribute('color', '#ffffff')

    const iconHumidity = document.createElement('box-icon')
    iconHumidity.setAttribute('name', 'water')
    iconHumidity.setAttribute('color', '#ffffff')

    const response = await fetch(linkToQuery, {mode: 'cors'}).catch((err => {console.log(err)}))

    

    if(response.ok){
        const finalResult = await response.json()
        weatherImage.src = finalResult.current.condition.icon;
        weatherDataCityName.textContent = finalResult.location.name
        weatherDataTemp.textContent = `${finalResult.current.temp_c}°C`

        weatherDataWindspeed.innerHTML = '';
        weatherDataHumidity.innerHTML = '';
        // weatherDataWindspeed.append(iconWindspeed, finalResult.current.wind_kph)
        // weatherDataWindspeed.appendChild(${iconWindspeed)
        weatherDataWindspeed.appendChild(iconWindspeed)
        weatherDataWindspeed.insertAdjacentHTML('beforeend', `<p>${finalResult.current.wind_kph} km/h</p>`)

        weatherDataHumidity.appendChild(iconHumidity)
        weatherDataHumidity.insertAdjacentHTML('beforeend',`<p>${finalResult.current.humidity}%</p>`) 


    } else {
        console.log(`Error occured, returns status : ${response.status}`)
    }
}

btnFetch.addEventListener('click', () => {
    if(userQuery.value === ''){
        alert('Please input a valid city name into the search bar, then try again!')
    } else {
        getWeatherData()
    }
})