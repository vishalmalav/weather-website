const request = require("request")

const Weather = (a, b, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=f70ff1770825319d5fa65d9fd164d368&query=${a},${b}`
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("cannot connet to server", undefined)

        } else if (response.body.error) {
            callback("not found location on weather server", undefined)

        } else {
            callback(undefined, {
                temp: response.body.current.temperature,
                feelslike: response.body.current.feelslike
                , forcast: `It is currently ${response.body.current.temperature} celsius in ${response.body.location.name} but dear it feels like ${response.body.current.feelslike}.  Enjoy your day`

            })
        }
    })
}
module.exports = Weather