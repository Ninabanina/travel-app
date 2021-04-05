async function getGeonameData(location) {
    const geonameBaseURL = 'http://api.geonames.org/';

    let data = await fetch('http://localhost:8080/getKey')
    let keys = await data.json()
    const key = keys.GeonameKey;
    if (key) {
        let response = await fetch(`${geonameBaseURL}searchJSON?q=${location}&maxRows=1&username=${key}`);
        let json = await response.json()
        return json
    }
}

export { getGeonameData }