import { IncomingMessage, ServerResponse } from "http"
import url from "url"
import axios from "axios"
import SpotifyWebApi from 'spotify-web-api-node'

const credentials = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  // TODO:環境変数が使用できる様に解決する
  redirectUri: `http://localhost:3000/api/authentication`
};
const spotifyApi = new SpotifyWebApi(credentials)

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
    case '/reccomendList':
      reccomendList(req, res)
      break
    default:
      console.log('default')
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

    const data = await spotifyApi.authorizationCodeGrant(code)
    const accesToken = data.body['access_token']
    const expiresIn = data.body['expires_in'] // 1h
    await spotifyApi.setAccessToken(accesToken)
    // MEMO:以下はなぜか有効なaccess tokenが取得できなかった(=> spotify-web-api-nodeを使用する経緯)
    // const CLIENT_ID = process.env.CLIENT_ID
    // const CLIENT_SECRET = process.env.CLIENT_SECRET

    // // Use application/x-www-form-urlencoded format
    // const params = new URLSearchParams({
    //   grant_type: "client_credentials",
    //   code,
    //   redirect_uri: host
    // })

    // // Use Base 64 Encoding
    // const encodedData = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
    // const authorizationHeaderString = `Basic ${encodedData}`

    // const response = await axios.post<SpotifyAuthenticationRes>(
    //   'https://accounts.spotify.com/api/token',
    //   params,
    //   {
    //     headers: {
    //       'Authorization': authorizationHeaderString
    //     }
    //   }
    // )
    // const cookie = `ACCESS_TOKEN=${response.data.access_token}; Max-Age=${expiresIn}; Path=/; SameSite=Strict; HttpOnly;`

    const cookie = `ACCESS_TOKEN=${accesToken}; Max-Age=${expiresIn}; Path=/; SameSite=Strict; HttpOnly;`
    res.setHeader('Set-Cookie', cookie)

    res.setHeader('location', `${schema}${host}`)
    res.statusCode = 302
  } catch (error) {
    console.error('error', error)
  } finally {
    res.end()
  }
}

const reccomendList = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const response = await spotifyApi.getPlaylist('37i9dQZF1DXafb0IuPwJyF')
    // web-apiを使わなかった場合
    // const cookies = req.headers.cookie
    // const accessToken = cookies?.split('=')[1] // cookieが1つの場合のみ有効
    // const response = await axios.get('https://api.spotify.com/v1/playlists/37i9dQZF1DXafb0IuPwJyF',{
    //   headers: {
    //     'Authorization': `Bearer ${accessToken}`
    //   }
    // })
    console.log(response.body)
  } catch (error) {
    throw new Error(error)
  } finally {
    res.end()
  }
}

const logout = () => {
  console.log('call logout')
}