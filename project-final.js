const appId = 'b8cce7d514214016b192b5bfa4958cbf';
let units = 'imperial';
var hello = null

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
    })
}
function init(resultFromServer) {
	hello = resultFromServer
	return hello
}

function weatherGeneratorCall(resultFromServer) {
    switch (resultFromServer.weather.decription) {
    	case 'Clear':
		case 'Smoke':
		case 'Sand/Dust':
			danceMax = 1
			danceMin = .3
			accMax = .5
			accMin = 0 //accoustic
			enMax = 1 //energy
			enMin = .5
			instMax = .6
            instMin = .1 //instrumental
            valMax = 1
            valMin = .4
        	break;
		case 'Clouds':
			danceMax = .7
			danceMin = .2
			accMax = 1
			accMin = .2 //accoustic
			enMax = .7 //energy
			enMin = 0
			instMax = 1
            instMin = .3 //instrumental
            valMax = .8
            valMin = .3
			break;
		case 'Rain':
        case 'Drizzle':
        case 'Mist':
		case 'Fog':
			danceMax = .6
			danceMin = 0
			accMax = 1
			accMin = .2 //accoustic
			enMax = .6 //energy
			enMin = 0
			instMax = 1
            instMin = .3 //instrumental
            valMax = .7
            valMin = 0
            break;
        case 'Thunderstorm':
            danceMax = .6
			danceMin = 0
			accMax = 1
			accMin = .2 //accoustic
			enMax = .6 //energy
			enMin = 0
			instMax = 1
            instMin = .3 //instrumental
            valMax = .7
            valMin = 0
            break;
        case 'Snow':
		case 'Flurries':
            danceMax = .8
			danceMin = .3
			accMax = 1
			accMin = .2 //accoustic
			enMax = .8 //energy
			enMin = .2
			instMax = .8
            instMin = .2 //instrumental
            valMax = 1
            valMin = .3
            break;

        default:
        	break;
 	}
}

document.getElementById('searchBtn').addEventListener('click', () => {
	searchBtn.setAttribute("style", "background:lightgreen; color:black; ")
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
})
