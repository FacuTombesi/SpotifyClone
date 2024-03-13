const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=1a4f57adf26642ab827be0fe7d11810d&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
  return (
    <>
      <a href={AUTH_URL} >
        <button>Login with Spotify</button>
      </a>
    </>
  )
}