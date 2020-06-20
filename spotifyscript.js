let clientID = "9f547ffe813f412baf1c09310914078f";
const redirectURI = "https://www.spotify.com/us/account/apps/";
var spotifyUrl = ("https://accounts.spotify.com/authorize?client_id=" + clientID + "&redirect_uri=" + redirectURI + "&response_type=token&scope=user-library-read%20user-library-modify%20user-read-playback-state%20streaming%20user-modify-playback-state%20playlist-modify-public%20user-read-currently-playing%20playlist-read-private%20user-follow-read")

console.log(spotifyUrl)

// 		maxAcousticness: "1",
// 		minAcousticness: "0",
// 		maxDanceability: "1",
// 		minDanceability: "0",
// 		maxEnergy: "1",
// 		minEnergy: "0",
// 		maxInstrumentalness: "1",
// 		minInstrumentalness: "0",
// 		maxValence: "1",
// 		minValence: "0",
// 		limit: "50",

$(document).ready(function () {

	const limit = 50
	let offset = 0
	let savedSongArray = []
	let idArray = []
	let songsFit = []
	let danceMax = 1
	let danceMin = 0
	let accMax = 1
	let accMin = 0 //accoustic
	let enMax = 1 //energy
	let enMin = 0
	let instMax = 1
	let instMin = 0 //instrumental
	let valMax = 1
	let valMin = 0
	var bearerToken = "Bearer BQAKBiqBt7pVV_zCBDkkq5pAOH-TEBhRLAxaG1d0qZTR6BVO6yoBxxt0hD24MJy0RyUYPEvaXN8kt9GvS1jiwudSxuiVr1JE_gLn3ghFWGh4WToggRsR6qJjNrYwGIsJurCGRYpj6WsrPagUzyxCtiH4M5JuYAPRVPbbH4LKYFH7ko3A0FmcDAS0GwYACBfJaiRSgXq3KqnXF9HaK5OGDMpPLg"

	$(".button").on("click", function(e) {
		e.preventDefault()
		console.log('click', document.getElementById('playlistGenreInput').value)
		if (document.getElementById('playlistGenreInput').value === 'Option 2') {
			minMax()
			console.log('oh shit moooood')
		}
		else if (document.getElementById('playlistGenreInput').value === 'Option 1') {
			console.log('fuck da weather')
		}
		// getLikedSongs(limit, offset)
	})
	getID()

	$('.saveControl').on("click", function() {
		getID()
	})

	function minMax () {
		let dance = parseInt(document.getElementById("Danceability").value)
		let acc = parseInt(document.getElementById("Acousticness").value)
		let en = parseInt(document.getElementById("Energy").value)
		let inst = parseInt(document.getElementById("Instrumentalness").value)
		let val = parseInt(document.getElementById("Positivity").value)
		if (dance === 0){
			danceMax = .4
			danceMin = 0
		}
		if (dance === 25) {
			danceMax = .5
			danceMin = .1
		}
		if (dance === 50) {
			danceMax = 1
			danceMin = 0
		}
		if (dance === 75) {
			danceMax = .8
			danceMin = .4
		}
		if (dance === 100) {
			danceMax = 1
			danceMin = .6
		}
		console.log(danceMax, danceMin, dance)
		if (acc = 0){
			accMax = .4
			accMin = 0
		}
		if (acc = 25) {
			accMax = .5
			accMin = .1
		}
		if (acc = 50) {
			accMax = 1
			accMin = 0
		}
		if (acc = 75) {
			accMax = .8
			accMin = .4
		}
		if (acc = 100) {
			accMax = 1
			accMin = .6
		}
		if (en === 0){
			enMax = .4
			enMin = 0
		}
		if (en === 25) {
			enMax = .5
			enMin = .1
		}
		if (en === 50) {
			enMax = 1
			enMin = 0
		}
		if (en === 75) {
			enMax = .8
			enMin = .4
		}
		if (en === 100) {
			enMax = 1
			enMin = .6
		}
		if (inst === 0){
			instMax = .4
			instMin = 0
		}
		if (inst === 25) {
			instMax = .5
			instMin = .1
		}
		if (inst === 50) {
			instMax = 1
			instMin = 0
		}
		if (inst === 75) {
			instMax = .8
			instMin = .4
		}
		if (inst === 100) {
			instMax = 1
			instMin = .6
		}
		if (val === 0){
			valMax = .4
			valMin = 0
		}
		if (val === 25) {
			valMax = .5
			valMin = .1
		}
		if (val === 50) {
			valMax = 1
			valMin = 0
		}
		if (val === 75) {
			valMax = .8
			valMin = .4
		}
		if (val === 100) {
			valMax = 1
			valMin = .6
		}
	}

	function getLikedSongs(limit, offset) {

		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://api.spotify.com/v1/me/tracks?limit=" + limit + "&offset=" + offset,
			"method": "GET",
			"headers": {
				"content-type": "application/x-www-form-urlencoded",
				"Authorization": bearerToken
			}
		}

		$.ajax(settings).done(function (response) {
			for (let i = 0; i < response.items.length; i++) {
				savedSongArray[i + offset] = response.items[i]
			}
			offset = offset + limit
			if (response.items.length < 50) {
				console.log("done!")
				getSongsAttributes(savedSongArray)
				return
			} else {
				getLikedSongs(limit, offset)
			}
		}).fail(function (response) {
			alert('oh no, something went wrong')
			return
		});
	};

	function getSongsAttributes(array) {
		let length = Math.floor(array.length / 100)
		let lessThanOneHundred = String(array.length).slice(-2)
		for (let i = 0; i < length; i++) {
			for (let j = 0; j < 100; j++) {
				idArray[j] = array[j + (i * 100)].track.id
				// Don't forget
				// Make it so extra songs past the last full 100 get counted too
			}
			idString = idArray.join()
			settings = {
				"async": true,
				"crossDomain": true,
				"url": "https://api.spotify.com/v1/audio-features?ids=" + idString,
				"method": "GET",
				"headers": {
					"content-type": "application/x-www-form-urlencoded",
					"Authorization": bearerToken
				}
			}

			$.ajax(settings).done(function (response) {
				for (let c = 0; c < response.audio_features.length; c++) {
					console.log(danceMax,danceMin)
					if (response.audio_features[c].danceability < danceMax &&
						response.audio_features[c].danceability > danceMin &&
						response.audio_features[c].acousticness < accMax &&
						response.audio_features[c].acousticness > accMin &&
						response.audio_features[c].energy < enMax &&
						response.audio_features[c].energy > enMin &&
						response.audio_features[c].instrumentalness < instMax &&
						response.audio_features[c].instrumentalness > instMin &&
						response.audio_features[c].valence < valMax &&
						response.audio_features[c].valence > valMin) {
						songsFit.push(response.audio_features[c])
						console.log(songsFit)
					}
				}
			})
		}
	};

	function getID() {
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://api.spotify.com/v1/me",
			"method": "GET",
			"headers": {
				"content-type": "application/x-www-form-urlencoded",
				"Authorization": bearerToken
			},
		}

		$.ajax(settings).done(function (response) {
			let userId = response.id
			console.log(response)
			console.log(userId)
			// makeNewPlaylist(userId)
		})
	}

	function makeNewPlaylist(userId) {
		inputName = "Test 1"
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://api.spotify.com/v1/users/" + userId + "/playlists",
			"method": "POST",
			"headers": {
				"content-type": "application/JSON",
				"Authorization": bearerToken
			},
			"data": {
				"name": inputName,
				"public": false
			}
		}

		$.ajax(settings).done(function (response) {
			console.log(response)
		})
	}
});