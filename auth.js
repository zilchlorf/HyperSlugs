$(document).ready(function () {
    console.log(document.getElementById("url"))
    let bearerURL = document.getElementById("url")
    let bearerURLTwo = bearerURL.replace('https://weerklank.github.io/HyperSlugs/auth.html#access_token=','')
    let bearerURLThree = bearerURLTwo.replace('&token_type=Bearer&expires_in=3600','')

    function bearerURL(x){
		let bearerURLPrime=x
	}
})