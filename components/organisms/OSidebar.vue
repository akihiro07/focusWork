<template>
  <div :class="$style.wrapper">
    <!-- タイトル＆ログイン部分 -->
    <div :class="$style.topBlock">
      <div :class="$style.title">Spotify Timer</div>

      <AButton el="button" :click="login" :class="$style.buttonComponent">
        Login
      </AButton>
    </div>

    <!-- タイマー部分 -->
    <div :class="$style.bottomBlock">
      <MTimer />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { app } = useContext()
    const login = () => {
      const scopes = ['streaming', 'user-read-email', 'user-read-private', 'playlist-modify-public', 'playlist-modify-private']
      const CLIENT_ID = process.env.clientId as string
      const REDIRECT_URL = `${process.env.baseUrl}/api/authentication`
      const ramdomString = Math.random().toString(36).slice(-8)

      const url = new URL('https://accounts.spotify.com/authorize')
      url.searchParams.append('client_id', CLIENT_ID)
      url.searchParams.append('response_type', 'code')
      url.searchParams.append('state', ramdomString)
      url.searchParams.append('scope', scopes.join(' '))
      url.searchParams.append('redirect_uri', REDIRECT_URL)
      location.href = url.href
    }
    return {
      login
    }
  },
})
</script>

<style lang="scss" module>
.wrapper {
  background-color: $bg-secondary;
  text-align: center;
  display: grid;
  padding: 25px 15px 40px;
}

.title {
  text-align: left;
  color: $green;
  font-size: 1.75rem;
  font-weight: 700;
}

.buttonComponent {
  margin-top: 3.125rem;
  width: 75%;
}

.bottomBlock {
  margin: auto 0 0;
}
</style>