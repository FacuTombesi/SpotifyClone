import useAuth from "../utils/useAuth"

export default function Dashboard({ code }) {
  const accessToken = useAuth(code)

  return (
    <>
      {code}
    </>
  )
}