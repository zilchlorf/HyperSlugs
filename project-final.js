const appId = 'b8cce7d514214016b192b5bfa4958cbf';
let units = 'imperial';

function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        return 'postal_code';
    else
        return 'city';
}

function searchWeather(searchTerm) {
    const searchMethod = getSearchMethod(searchTerm)
    const url = `https://api.weatherbit.io/v2.0/current?${searchMethod}=${searchTerm}&key=${appId}&units=${units}`

    fetch(url).then(result => result.json())
    .then(result => {
        console.log('result from api is: ', result);
        init(result);
    })
}
function init(resultFromServer) {
	var hello = resultFromServer
	return hello
}
console.log(hello)
