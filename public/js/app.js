const message1 = document.querySelector("#message1")
const message2 = document.querySelector("#message2")
// const message1 = document.querySelector("#message1")

const weatherform = document.querySelector("form")
const search = document.querySelector("input")
weatherform.addEventListener("submit", (e) => {
    e.preventDefault()
    const loc = search.value

    message1.textContent = "Loading..."
    message2.textContent = ""
    fetch(`http://localhost:3000/weather?address=${loc}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // message1.textContent = "
                message1.textContent = data.error

            } else {
                message1.textContent = data.location
                message2.textContent = data.forcast

            }
        })
    })
})