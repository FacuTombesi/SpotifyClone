import { useEffect, useState } from "react";
import axios from "axios"

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

  useEffect(() => {
    axios
      .post("http://localhost:3001/login", {
        code
      })
      .then(res => {
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
        window.history.pushState({}, null, "/")
      })
      .catch((err) => {
        console.log("Login error:", err)
        // window.location = "/"
      })
  }, [code])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return

    const timeout = setTimeout(()=> {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken
        })
        .then(res => {
          setAccessToken(res.data.accessToken)
          setExpiresIn(res.data.expiresIn)
        })
        .catch((err) => {
          console.log("Refresh error:", err)
          window.location = "/"
        })
    }, (expiresIn - 60) * 1000)

    return () => clearTimeout(timeout)
  }, [refreshToken, expiresIn])

  return accessToken
}