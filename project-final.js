const appId = 'b8cce7d514214016b192b5bfa4958cbf';
let units = 'imperial';
let weatherResult = null
let attrArray = []

function getSearchMethod(searchTerm) {
	if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
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
	weatherResult = resultFromServer.data[0]
	return weatherResult
}

function weatherGeneratorCall(resultFromServer) {
	switch (resultFromServer.weather.decription) {
		case 'Clear':
		case 'Smoke':
		case 'Sand/Dust':
			attrArray[0] = 1
			attrArray[1] = .3
			attrArray[2] = .5
			attrArray[3] = 0 //accoustic
			attrArray[4] = 1 //energy
			attrArray[5] = .5
			attrArray[6] = .6
			attrArray[7] = .1 //instrumental
			attrArray[8] = 1
			attrArray[9] = .4
			console.log("In the function "+attrArray)
			break;
		case 'Clouds':
			attrArray[0] = .7
			attrArray[1] = .2
			attrArray[2] = 1
			attrArray[3] = .2 //accoustic
			attrArray[4] = .7 //energy
			attrArray[5] = 0
			attrArray[6] = 1
			attrArray[7] = .3 //instrumental
			attrArray[8] = .8
			attrArray[9] = .3
			console.log("In the function "+attrArray)
			break;
		case 'Rain':
		case 'Drizzle':
		case 'Mist':
		case 'Fog':
			attrArray[0] = .6
			attrArray[1] = 0
			attrArray[2] = 1
			attrArray[3] = .2 //accoustic
			attrArray[4] = .6 //energy
			attrArray[5] = 0
			attrArray[6] = 1
			attrArray[7] = .3 //instrumental
			attrArray[8] = .7
			attrArray[9] = 0
			console.log("In the function "+attrArray)
			break;
		case 'Thunderstorm':
			attrArray[0] = .6
			attrArray[1] = 0
			attrArray[2] = 1
			attrArray[3] = .2 //accoustic
			attrArray[4] = .6 //energy
			attrArray[5] = 0
			attrArray[6] = 1
			attrArray[7] = .3 //instrumental
			attrArray[8] = .7
			attrArray[9] = 0
			console.log("In the function "+attrArray)
			break;
		case 'Snow':
		case 'Flurries':
			attrArray[0] = .8
			attrArray[1] = .3
			attrArray[2] = 1
			attrArray[3] = .2 //accoustic
			attrArray[4] = .8 //energy
			attrArray[5] = .2
			attrArray[6] = .8
			attrArray[7] = .2 //instrumental
			attrArray[8] = 1
			attrArray[9] = .3
			console.log("In the function "+attrArray)
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
	if (searchTerm)
		searchWeather(searchTerm);
})