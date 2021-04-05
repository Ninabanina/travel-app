function getGeonameData(event) {
    event.preventDefault();

    const location = document.getElementById('location').value;
    const geonameBaseURL = 'http://api.geonames.org/';

    fetch('http://localhost:8080/getKey')
    .then((res) => res.json())
    .then((keys) => {
        const key = keys.GeonameKey;
        console.log(key)

        if(location) {
            fetch(`${geonameBaseURL}searchJSON?q=${location}&maxRows=1&username=${key}`)
            .then((response) => response.json())
            .then(data => console.log('data:', data))
        }
    })
}

export { getGeonameData }