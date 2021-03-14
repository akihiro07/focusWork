import { IncomingMessage, ServerResponse } from "http"
import url from "url"
import axios from "axios"

export default ((req: IncomingMessage, res: ServerResponse) => {
  const paseUrl = url.parse(req.url as string, true)
  const path = paseUrl.pathname

  switch (path) {
    case '/authentication':
      const code = paseUrl.query.code

      if (code) {
        authentication(req, res, code as string)
      }
      break
    default:
      console.log('none')
      res.end()
  }
})

type SpotifyAuthenticationRes = {
    access_token: string,
    token_type: string,
    scope?: string,
    expires_in: number,
    refresh_token?: string
}

const authentication = async (req: IncomingMessage, res: ServerResponse, code: string) => {
  try {
    const host = req.headers.host as string
    const schema = (host === 'localhost:3000') ? 'http://' : 'https://'
    const CLIENT_ID = process.env.CLIENT_ID
    const CLIENT_SECRET = process.env.CLIENT_SECRET

    // Use application/x-www-form-urlencoded format
    const params = new URLSearchParams({
      grant_type: "client_credentials",
      code,
      redirect_uri: host
    })

    // Use Base 64 Encoding
    const encodedData = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
    const authorizationHeaderString = `Basic ${encodedData}`

    const response = await axios.post<SpotifyAuthenticationRes>(
      'https://accounts.spotify.com/api/token',
      params,
      {
        headers: {
          'Authorization': authorizationHeaderString
        }
      }
    )

    res.setHeader('location', `${schema}${host}`)
    res.statusCode = 302
  } catch (error) {
    console.error('error', error)
  } finally {
    res.end()
  }
}

const logout = () => {
  console.log('call logout')
}