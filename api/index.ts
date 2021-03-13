import { IncomingMessage, ServerResponse } from "http"
import url from "url"
import axios from "axios"

export default ((req: IncomingMessage, res: ServerResponse) => {
  const paseUrl = url.parse(req.url as string, true)
  const host = req.headers.host as string
  const path = paseUrl.pathname

  switch (path) {
    case '/authentication':
      const code = paseUrl.query.code

      if (code) {
        authentication(code as string, host)
      }
      res.end()
      break
    default:
      console.log('none')
      res.end()
  }
})

type SpotifyAuthenticationRes = {
    access_token: string,
    token_type: string,
    scope: string,
    expires_in: number,
    refresh_token: string
}

const authentication = (code: string, host: string) => {
  const CLIENT_ID = process.env.CLIENT_ID
  const CLIENT_SECRET = process.env.CLIENT_SECRET

  // Using application/x-www-form-urlencoded format
  const params = new URLSearchParams({
    grant_type: "client_credentials",
    code,
    redirect_uri: host
  }).toString()

  // Use Base 64 Encoding
  const encodedData = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
  const authorizationHeaderString = `Basic ${encodedData}`

  axios.post<SpotifyAuthenticationRes>(
    'https://accounts.spotify.com/api/token',
    params,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': authorizationHeaderString
      }
    }
  )
  .then((response: any) => console.log('data', response.data))
  .catch((error: any) => console.log('error', error))
}

const logout = () => {
  console.log('call logout')
}