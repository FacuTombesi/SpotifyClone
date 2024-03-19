export default function TrackSearchResults({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

  return (
    <div
      className="d-flex m-2 align-items-center justify-content-between"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <div className="d-flex flex-row">
        <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} alt="Album cover" />
        <div className="mx-3">
          <div>{track.title}</div>
          <div className="text-muted">{track.artist}</div>
        </div>
      </div>
      <div>{track.duration}</div>
    </div>
  )
}