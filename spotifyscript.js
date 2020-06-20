let clientID = "9f547ffe813f412baf1c09310914078f";
// const redirectURI = "https://www.spotify.com/us/account/apps/";
const redirectURI = "https://weerklank.github.io/HyperSlugs/auth.html";
var spotifyUrl = ("https://accounts.spotify.com/authorize?client_id=" + clientID + "&redirect_uri=" + redirectURI + "&response_type=token&scope=user-library-read%20user-read-playback-state%20streaming%20user-modify-playback-state%20playlist-modify-public%20playlist-modify-private%20user-read-currently-playing%20playlist-read-private%20user-follow-read")

$(document).ready(function () {

	const limit = 50
	let offset = 0
	let savedSongArray = []
	let idArray = []
	let songsFit = []
	let songsFitURIs = []
	let idStringArray = []
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
	let timing = 0
	let inputName = "New Playlist"
	let weatherResult = null

	load()

	if (window.location.href.startsWith("https://weerklank.github.io/HyperSlugs/auth.html#access_token=")) {
		console.log(window.location.href)
		let bearerURL = window.location.href
		let bearerURLTwo = bearerURL.replace('https://weerklank.github.io/HyperSlugs/auth.html#access_token=', '')
		let bearerURLThree = bearerURLTwo.replace('&token_type=Bearer&expires_in=3600', '')
		let bearer = "Bearer" + bearerURLThree
		console.log(bearer)

		window.close()
	}


	function load() {
		let boxy = localStorage.getItem('playlist')
		if (boxy == null) {
			return
		} else {
			$(".iframe").attr("src", boxy)
		}
	}

	$('.auth').on('click', function (e) {
		e.preventDefault()
		window.open(spotifyUrl)
		console.log(window.location.href)
		let bearerURL = window.location.href
		let bearerURLTwo = bearerURL.replace('https://weerklank.github.io/HyperSlugs/auth.html#access_token=', '')
		let bearerURLThree = bearerURLTwo.replace('&token_type=Bearer&expires_in=3600', '')
		let bearer = "Bearer" + bearerURLThree
		console.log(bearer)
		}
	})

	$(".apply").on("click", function (e) {
		e.preventDefault()
		if (document.getElementById('playlistGenreInput').value === 'Option 2') {
			minMax()
		} else if (document.getElementById('playlistGenreInput').value === 'Option 1') {
			if (weatherResult !== null) {
				weatherGeneratorCall(weatherResult)
				danceMax = attrArray[0]
				danceMin = attrArray[1]
				accMax = attrArray[2]
				accMin = attrArray[3]
				enMax = attrArray[4]
				enMin = attrArray[5]
				instMax = attrArray[6]
				instMin = attrArray[7]
				valMax = attrArray[8]
				valMin = attrArray[9]
				getLikedSongs(limit, offset)
			} else {
				confirm('Please enter an accurate zip code or city name and try again')
				return
			}
		}
		// getLikedSongs(limit, offset)
	});

	$(".saveName").on("click", function (e) {
		e.preventDefault()
		if ($('.saveControl')[1].value != "") {
			inputName = $('.saveControl')[1].value
		} else {
			return
		}
	});

	function minMax() {
		let dance = parseInt(document.getElementById("Danceability").value)
		let acc = parseInt(document.getElementById("Acousticness").value)
		let en = parseInt(document.getElementById("Energy").value)
		let inst = parseInt(document.getElementById("Instrumentalness").value)
		let val = parseInt(document.getElementById("Positivity").value)
		if (dance === 0) {
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
		if (acc = 0) {
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
		if (en === 0) {
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
		if (inst === 0) {
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
		if (val === 0) {
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
		getLikedSongs(limit, offset)
	};

	function getLikedSongs(limit, offset) {

		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://api.spotify.com/v1/me/tracks?limit=" + limit + "&offset=" + offset,
			"method": "GET",
			"headers": {
				"content-type": "application/x-www-form-urlencoded",
				"Authorization": bearer
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
			}
			idStringArray[i] = idArray.join()
			// songAJAX(idString, length)
		}
		idArray = []
		for (let c = 0; c < lessThanOneHundred; c++) {
			idArray.push(array[c + (length * 100)].track.id)
		}
		idStringArray[length] = idArray.join()
		songAJAX(idStringArray, length)
		// $.when(songAJAX(idString, length)).then(ifNeedExtra(songsFit))
	};

	function songAJAX(idStringArray, length) {
		for (var i = 0; i < idStringArray.length; i++) {
			settings = {
				"async": true,
				"crossDomain": true,
				"url": "https://api.spotify.com/v1/audio-features?ids=" + idStringArray[i],
				"method": "GET",
				"headers": {
					"content-type": "application/x-www-form-urlencoded",
					"Authorization": bearer
				}
			}

			$.ajax(settings).done(function (response) {
				for (let c = 0; c < response.audio_features.length; c++) {
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
					}
				}
				timing++
				if (timing == length) {
					if (songsFit.length < 20) {
						let amount = (20 - songsFit.length)
						getExtraSongs(amount, songsFit)
						songsFitURI(songsFit)
					} else {
						songsFitURI(songsFit)
					}
				}
			})
		}
	}

	function getExtraSongs(amount, songsFit) {
		settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://api.spotify.com/v1/recommendations?market=US",
			"method": "GET",
			"timeout": 0,
			"headers": {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Authorization": bearer
			},
			data: {
				// seed_tracks: songsFit[0].id,
				seed_tracks: '7egj375ez0KtF3bYCfAHdZ',
				max_acousticness: accMax,
				min_acousticness: accMin,
				max_danceability: danceMax,
				min_danceability: danceMin,
				max_energy: enMax,
				min_energy: enMin,
				max_instrumentalness: instMax,
				min_instrumentalness: instMin,
				max_valence: valMax,
				min_valence: valMin,
				limit: amount
			}
		};

		$.ajax(settings).done(function (response) {
			for (let c = 0; c < response.tracks.length; c++) {
				songsFit.push(response.tracks[c])
			}
			songsFitURI(songsFit)
		}).fail(function (response) {
			console.log('something seems to have gone wrong', response, settings)
		})
	};

	function songsFitURI(songsFit) {
		for (var c = 0; c < songsFit.length; c++) {
			songsFitURIs[c] = songsFit[c].uri
		}
		let songsFitURIsArray = []
		let songsFitURIBit = []
		let incrtwo = Math.ceil(songsFitURIs.length / 50)
		if (songsFitURIs.length > 50) {
			let incriment = 0
			for (c = 0; c < incrtwo; c++) {
				songsFitURIBit.push(songsFitURIs.slice(incriment, incriment + 50))
				incriment = incriment + 50
				songsFitURIsArray.push(encodeURIComponent(songsFitURIBit[c]))
			}
		}
		getID(songsFitURIsArray)
	};

	function getID(songsFitURIsArray) {
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://api.spotify.com/v1/me",
			"method": "GET",
			"headers": {
				"content-type": "application/x-www-form-urlencoded",
				"Authorization": bearer
			},
		}

		$.ajax(settings).done(function (response) {
			let userId = response.id
			makeNewPlaylist(userId, songsFitURIsArray)
		})
	};

	function makeNewPlaylist(userId, songsFitURIsArray) {

		inputNameTwo = encodeURIComponent(inputName)

		var settings = {
			type: "POST",
			url: 'https://api.spotify.com/v1/users/' + userId + '/playlists',
			"method": "POST",
			"timeout": 0,
			"headers": {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Authorization": bearer
			},
			data: JSON.stringify({
				name: inputNameTwo,
				public: 'false'
			}),
			json: true
		}


		$.ajax(settings).done(function (response) {
			var playlistId = response.id
			addToPlaylist(playlistId, songsFitURIsArray)
		}).fail(function (response) {
			console.log('something seems to have gone wrong', response, settings)
		})
	};

	function addToPlaylist(playlistId, songsFitURIsArray) {

		for (var c = 0; c < songsFitURIsArray.length; c++) {

			var box = ('https://open.spotify.com/embed/playlist/' + playlistId)
			localStorage.setItem('playlist', box)

			var settings = {
				"url": "https://api.spotify.com/v1/playlists/" + playlistId + "/tracks?uris=" + songsFitURIsArray[c],
				"method": "POST",
				"timeout": 0,
				"headers": {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Authorization": bearer
				},
			};

			$.ajax(settings).done(function (response) {
				$(".iframe").attr("src", box)
				console.log($('.iframe'))
			}).fail(function (response) {
				$(".iframe").attr("src", box)
				console.log('something seems to have gone wrong', response, settings)
			})
		}
	};

});