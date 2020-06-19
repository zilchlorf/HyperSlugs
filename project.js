// var settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://api.weatherbit.io/v2.0/current?city=PORTLANDOR&key=b8cce7d514214016b192b5bfa4958cbf",
// 	"method": "GET",
// 	}

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });

// var userInput
// var temp

//pull input based on location 
//build IDs to grab to know where to put the response//
//grab HTML elements//
// $('.class').text(response.temp)

// if (temp , 50) {
//     addtoplaylist genre 
// }

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
//     let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
//     let temperatureElement = document.getElementById('temperature');
//     let humidityElement = document.getElementById('humidity');
//     let windSpeedElement = document.getElementById('windSpeed');
//     let cityHeader = document.getElementById('cityHeader');

//     let resultDescription = resultFromServer.weather[0].description;
//     weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

//     temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
//     windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + 'm/s';
//     cityHeader.innerHTML = resultFromServer.name;
//     humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';

//     setPositionForWeatherInfo();
// }

// function setPositionForWeatherInfo() {
//     let weatherContainer = document.getElementById('weatherContainer');
//     let weatherContainerHeight = weatherContainer.clientHeight;
//     let weatherContainerWidth = weatherContainer.clientWidth;

//     weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
//     weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
//     weatherContainer.style.visibility = 'visible';
// }

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
})

