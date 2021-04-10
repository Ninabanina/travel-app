function checkCityName(city) {
    var pattern = new RegExp('^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$')

    return !!pattern.test(city);
}

export { checkCityName }