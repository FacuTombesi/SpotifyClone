const express = require("express")
const SpotifyWebApi = require("spotify-web-api-node")

const app = express()

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
    .catch(() => {
      res.sendStatus(400)
    })
})