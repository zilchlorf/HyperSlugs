
    console.log(window.location.href)
    let bearerURL = window.location.href
    let bearerURLTwo = bearerURL.replace('https://weerklank.github.io/HyperSlugs/auth.html#access_token=','')
    let bearerURLThree = bearerURLTwo.replace('&token_type=Bearer&expires_in=3600','')

    function lala(){
        var tea = 'mars'
        console.log(tea)
        return tea
    }

    function theBearerURL(){
        let bearerURLPrime=bearerURLThree
        return bearerURLPrime
    }
    
    window.close()
