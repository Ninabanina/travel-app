async function getCityImage(cityName) {
    const pixabayBaseURL = `http://localhost:8080/city/${cityName}`;
    
    let response = await fetch(pixabayBaseURL)
    let data = await response.json();
    
    return data
}

export { getCityImage }