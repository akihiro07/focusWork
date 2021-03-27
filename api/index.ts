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
    const data = await spotifyApi.authorizationCodeGrant(code)
    const accesToken = data.body['access_token']
    // アクセストークンをセット
    await spotifyApi.setAccessToken(accesToken)

    const host = req.headers.host as string
    const schema = (host === 'localhost:3000') ? 'http://' : 'https://'
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
    const jpopBest50 = '37i9dQZF1DXafb0IuPwJyF'
    const response = await spotifyApi.getPlaylist(jpopBest50)
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