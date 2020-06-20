const appId = 'b8cce7d514214016b192b5bfa4958cbf';
let units = 'imperial';
var hello = null
var attrArray = []

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
		console.log(hello)
		// weatherGeneratorCall(result);
		// console.log('test')
    })
}
function init(resultFromServer) {
	hello = resultFromServer
	return hello
}

function weatherGeneratorCall(resultFromServer) {
	switch (resultFromServer.data[0].weather.description) {
		case 'Clear sky':
		case 'Smoke':
		case 'Sand/Dust':
		case 'Unkown Precipitation':
		case 'Few clouds':
			attrArray[0] = 1
			attrArray[1] = .3
			attrArray[2] = .5
			attrArray[3] = 0
			attrArray[4] = 1 
			attrArray[5] = .5
			attrArray[6] = .6
			attrArray[7] = .1
			attrArray[8] = 1
			attrArray[9] = .4
			console.log("In the function "+ attrArray)
			break;
		case 'Scattered clouds':
		case 'Broken clouds':
		case 'Overcast clouds':
			attrArray[0] = .7
			attrArray[1] = .2
			attrArray[2] = 1
			attrArray[3] = .2
			attrArray[4] = .7
			attrArray[5] = 0
			attrArray[6] = 1
			attrArray[7] = .3
			attrArray[8] = .8
			attrArray[9] = .3
			console.log("In the function "+ attrArray)
			break;
		case 'Light Rain':
		case 'Moderate Rain':
		case 'Heavy Rain':
		case 'Drizzle':
		case 'Heavy Drizzle':
		case 'Light shower rain':
		case 'Shower rain':
		case 'Heavy shower rain':
		case 'Mist':
		case 'Fog':
		case 'Freezing Fog':
		case 'Haze':
			attrArray[0] = .6
			attrArray[1] = 0
			attrArray[2] = 1
			attrArray[3] = .2
			attrArray[4] = .6
			attrArray[5] = 0
			attrArray[6] = 1
			attrArray[7] = .3
			attrArray[8] = .7
			attrArray[9] = 0
			console.log("In the function "+ attrArray)
			break;
		case 'Thunderstorm with light rain':
		case 'Thunderstorn with rain':
		case 'Thunderstorn with heavy rain':
		case 'Thunderstorm with light drizzle':
		case 'Thunderstorm with drizzle':
		case 'Thunderstorm with heavy drizzle':
		case 'Thunderstorm with hail':
			attrArray[0] = .6
			attrArray[1] = 0
			attrArray[2] = 1
			attrArray[3] = .2 
			attrArray[4] = .6
			attrArray[5] = 0
			attrArray[6] = 1
			attrArray[7] = .3
			attrArray[8] = .7
			attrArray[9] = 0
			console.log("In the function "+ attrArray)
			break;
		case 'Light snow':
		case 'Snow':
		case 'Heavy snow':
		case 'Mix snow/rain':
		case 'Sleet':
		case 'Heavy sleet':
		case 'Snow shower':
		case 'Heavy snow shower':
		case 'Flurries':
		case 'Freezing rain':
			attrArray[0] = .8
			attrArray[1] = .3
			attrArray[2] = 1
			attrArray[3] = .2
			attrArray[4] = .8
			attrArray[5] = .2
			attrArray[6] = .8
			attrArray[7] = .2
			attrArray[8] = 1
			attrArray[9] = .3
			console.log("In the function "+ attrArray)
			break;
		default:
			console.log('dam')
			break;
	}
	console.log(attrArray)
	return attrArray
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
})
