const request = require("request")

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidmlzaGFsbWFsYXY5NSIsImEiOiJja3BoeWV2OXAxNnBiMnZyaXRpYmZzZDU5In0.jq-x-YSUdnhbBDMXA-TwgQ&limit=1`
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("oh dear!please check connectivity", undefined)

        } else if (response.body.features.length === 0) {
            callback("Oh oo!location not find", undefined)

        } else {
            callback(undefined, {
                place: response.body.features[0].place_name,
                latitude: response.body.features[0].center[0],
                logitude: response.body.features[0].center[1]
            })
        }
    })
}
module.exports = geoCode