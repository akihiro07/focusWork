<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, useContext, useAsync } from '@nuxtjs/composition-api'

type SpotifyAuthenticationRes = {
    access_token: string,
    token_type: string,
    scope: string,
    expires_in: number,
    refresh_token: string
}

export default defineComponent({
  setup() {
    const { app, query } = useContext()
    useAsync(async () => {
      // if (process.server) {
        const code = query.value.code as string
        const REDIRECT_URL = process.env.baseUrl as string
        const CLIENT_ID = process.env.CLIENT_ID
        const CLIENT_SECRET = process.env.CLIENT_SECRET

        // Using application/x-www-form-urlencoded format
        const params = new URLSearchParams()
        params.append('grant_type', 'authorization_code')
        params.append('code', code)
        params.append('redirect_uri', REDIRECT_URL)

        // Use Base 64 Encoding
        const encodedData = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
        const authorizationHeaderString = `Basic ${encodedData}`

        const response = await app.$axios.$post<SpotifyAuthenticationRes>(
          '/spotify/api/token',
          params,
          {
            headers: {
              'Authorization': authorizationHeaderString
            }
          }
        )
        .then((data) => console.log('data', data))
        .catch((error) => console.log('error', error))
      // }
    })
  }
})
</script>