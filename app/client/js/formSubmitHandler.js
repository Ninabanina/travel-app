const submitForm = async (event) => {
    event.preventDefault();

    const location = document.getElementById('location').value;
    const departingDate = document.getElementById('departure-date').value;
    const forecastType =  dateDifferences(departingDate) > 7 ? 'daily' :  'current';

    if(location && departingDate) {
        const weartherData = await Client.getWeatherData(location, forecastType);
        const cityImage = await Client.getCityImage(location);
        console.log(weartherData);
        console.log(cityImage);
    }
}

function dateDifferences(departingDate) {
    let currentDate = new Date();
    let LeavingDate = new Date(departingDate);

    const differenceInTime = LeavingDate.getTime() - currentDate.getTime();
    const differenceInDays =  Number(Math.round(differenceInTime / (1000 * 3600 * 24)));
    
    return differenceInDays;
}

export { submitForm }