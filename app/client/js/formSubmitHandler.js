const submitForm = async (event) => {
    event.preventDefault();

    const location = document.getElementById('location').value;
    const startDate = document.getElementById('start-date').value;
    const finishDate = document.getElementById('finish-date').value;
    const forecastType =  dateDifferences(startDate, 'now') > 7 ? 'daily' :  'current';
    const travelPeriod = dateDifferences(startDate, finishDate);

    if(location && startDate) {
        const weartherData = await Client.getWeatherData(location, forecastType);
        const cityImage = await Client.getCityImage(location);

        updateUI(weartherData, cityImage, travelPeriod);
        console.log(weartherData);
        console.log(cityImage);
    }
    console.log("travel period: " + travelPeriod);
}

function dateDifferences(startDate, finishDate) {
    let dateOne 
    let dateTwo = new Date(startDate);

    if (finishDate === 'now') {
        dateOne = new Date();
    } else {
        dateOne = new Date(finishDate);
    }

    const differenceInTime = dateTwo.getTime() - dateOne.getTime();
    const differenceInDays =  Math.abs(Number(Math.round(differenceInTime / (1000 * 3600 * 24))));
    
    return differenceInDays;
}

async function updateUI(weatherInfo, cityInfo, travelInfo) {
    document.getElementById("results").classList.remove("hidden");
    displayWeatherData(weatherInfo);
    displayTravelPeriod(travelInfo);
    displayCityImg(cityInfo);
}

function displayCityImg(cityInfo) {
    if(cityInfo) {
        document.getElementById("city-img").src = cityInfo.hits[0].webformatURL;
    } else {
        document.getElementById("city-img").src = cityInfo.hits[0].webformatURL;
    }
    
}

function displayWeatherData(allWeatherData) {
    document.getElementById("city-name").innerHTML = allWeatherData.data[0].city_name;
    document.getElementById("weather-icon").src = `./app/client/icons/${allWeatherData.data[0].weather.icon}.png`;
    document.getElementById("weather-tem").innerHTML = `${allWeatherData.data[0].temp} °C`;
    document.getElementById("weather-des").innerHTML = allWeatherData.data[0].weather.description;
}

function displayTravelPeriod(travelPeriodData) {
    if(travelPeriodData === 1) {
        document.getElementById("travel-period").innerHTML = 'The length of trip is ' + travelPeriodData + ' Day';
    } else {
        document.getElementById("travel-period").innerHTML = 'The length of trip is ' + travelPeriodData + ' Days';
    }
}



export { submitForm }