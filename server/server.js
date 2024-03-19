const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const SpotifyWebApi = require("spotify-web-api-node")

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri:  "http://localhost:3000",
    clientId: "1a4f57adf26642ab827be0fe7d11810d",
    clientSecret: "6cad8dabb3a649aa91030ef34b88ad20",
    refreshToken
  })

  spotifyApi.refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn
      })
    })
    .catch(() => {
      res.sendStatus(400)
    })
})

app.post("/login", (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri:  "http://localhost:3000",
    clientId: "1a4f57adf26642ab827be0fe7d11810d",
    clientSecret: "6cad8dabb3a649aa91030ef34b88ad20"
  })

  spotifyApi.authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in
      })
    })
    .catch(error => {
      res.sendStatus(400)
    })
})

app.listen(3001)