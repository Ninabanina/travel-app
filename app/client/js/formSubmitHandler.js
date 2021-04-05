const submitForm = async (event) => {
    event.preventDefault();

    const location = document.getElementById('location').value;
    const departingDate = document.getElementById('departure-date').value;
    const forecastType =  dateDifferences(departingDate) > 7 ? 'daily' :  'current';

    if(location && departingDate) {
        const geonameData = await Client.getGeonameData(location);
        const lat = geonameData.geonames[0].lat;
        const lng = geonameData.geonames[0].lng

        const weartherData = await Client.getWeatherData(lat, lng, forecastType);
        console.log(weartherData);
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