import { useEffect, useState } from "react"
import useAuth from "../utils/useAuth"
import SpotifyWebApi from "spotify-web-api-node"
import { Container, Form } from "react-bootstrap"
import TrackSearchResults from "./TrackSearchResults"
import Player from "./Player"

const spotifyApi = new SpotifyWebApi({
  clientId: "1a4f57adf26642ab827be0fe7d11810d"
})

export default function Dashboard({ code }) {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()

  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
  }

  useEffect(() => {
    if (!accessToken) return

    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false

    spotifyApi.searchTracks(search)
      .then(res => {
        if (cancel) return
        setSearchResults(
          res.body.tracks.items.map(track => {
            const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            }, track.album.images[0])

            const duration = convertDurationToMin(track.duration_ms)

            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: smallestAlbumImage.url,
              duration: duration
            }
          })
        )
      })

      return () => cancel = true
  }, [search, accessToken])

  function convertDurationToMin(duration_ms) {
    let seconds = Math.floor((duration_ms / 1000) % 60)
    let minutes = Math.floor((duration_ms / (1000 * 60)) % 60)
    let formattedTime = minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0")
    return formattedTime
  }

  return (
    <Container
      className="d-flex flex-column py-2"
      style={{ height: "100vh" }}
    >
      <Form.Control
        type="search"
        placeholder="Search songs/artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div
        className="flex-grow-1 my-2"
        style={{ overflowY: "auto" }}
      >
        {searchResults.map(track => (
          <TrackSearchResults track={track} key={track.uri} chooseTrack={chooseTrack} />
        ))}
      </div>
      <div><Player accessToken={accessToken} trackUri={playingTrack?.uri} /></div>
    </Container>
  )
}