const path = require('path')
const express = require('express')
const hbs = require("hbs")
const request = require("request")
const weather = require("./utils/weather")
const geoCode = require("./utils/geoLoc")

const port = process.env.PORT || 3000


const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, "../templates/views")
const partials = path.join(__dirname, "../templates/partials")



app.use(express.static(publicDirectoryPath))



app.set("view engine", "hbs")
app.set("views", viewPath)
hbs.registerPartials(partials)


app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Vishal Malav"
    })
})
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Vishal Malav"
    })
})

app.get("/help", (req, res) => {

    res.render("help", {
        title: "Help",
        name: "Vishal Malav"

    })
})


app.get("/product", (req, res) => {
    console.log(req.query.search)
    res.send({
        product: []
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {

        return res.send({

            error: "error page"
        })

    }

    geoCode(req.query.address, (error, { latitude, logitude, place } = {}) => {
        if (error) {
            return res.send({
                error: erro
            })
        }
        console.log(place)
        console.log(latitude)
        console.log(logitude)
        weather(logitude, latitude, (error, appdata) => {
            if (error) {
                return res.send({
                    error: "Location not found please try again"
                })
            }
            res.send({
                forcast: appdata.forcast,
                location: place,
                address: req.query.address
            })
        })

    })
})
// res.send({

//     forecast: 'It is snowing',
//     location: 'Philadelphia'
//     , address: req.query.address



app.get('*', (req, res) => {
    res.render("404", {

    })
})

app.listen(port, () => {
    console.log('Server is up on port .' + 3000)
})