<template>
  <div :class="$style.wrapper">
    <OSidebar />

    <div :class="$style.main">
      <OListBlock :playlistTracks="playlistTracks" :isPlaylist="true" />
      <OSearchBlock :searchTracks="searchTracks" :playbackFunc="playbackFunc" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, Ref, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import { SpotifyWebApi } from 'spotify-web-api-ts'

export default defineComponent({
  setup() {
    const { app } = useContext()
    const playlistTracks: Ref<SpotifyApi.PlaylistTrackObject[] | []> = ref([])
    const searchTracks: Ref<SpotifyApi.PlaylistTrackObject[] | []> = ref([])

    useAsync(async() => {
      try {
        const recommendTracks: SpotifyApi.PlaylistTrackObject[] = await app.$axios.$get('/api/reccomendList')
        searchTracks.value.splice(0, searchTracks.value.length+1, ...recommendTracks)
      } catch (error) {
        // TODO:throw new Error()に分ける
        const { response } = error
        // 存在しないファイルを叩いた場合(問題:エンドポントが存在しなくてもerrorにならない)
        if (response.status === 404) {
          console.error(error)
        } else {
          const responseError = response.data.error
          console.error(`status:${responseError.status} (${responseError.message})`)
        }
      }
    })

    const deviceId = ref('')
    // Web Playback SDKはクライアントサイドのライブラリ
    onMounted(() => {
      // TODO:cookie
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new Spotify.Player({
          name: 'Spotify Timer',
          getOAuthToken: () => 'BQBeTj_vIxTgsReNz440g_vKPfPjuXtoJonaw0nufNojt4LmkYBoNYEXQTACWftbkM9FxM_9SimeNsiNJUB9X1XN6iJaqb_oDmGFvgrGl0whDEIunde9afhH3BhLqhhgCOgS-huhCm6ol9TeiREQtJfxz2WyXSw-ifhvw-2udnmuXW5yvD_2DvTtOXgu8N6bVZQ_1vhg2bQUuncaIhQHd8ItrdCHyzc3k6f8B-wsQo7H2RfvyVjf_T8vWQ'
        })

        player.addListener('ready', ({ device_id }) => {
            deviceId.value = device_id
        })
        player.connect()
      }
    })

    const playbackFunc = () => {
      app.$axios.$post('/api/playback')
    }

    return {
      playlistTracks,
      searchTracks,
      deviceId,
      playbackFunc
    }
  }
})
</script>

<style lang="scss" module>
.wrapper {
  display: grid;
  grid-template-columns: 20% 80%;
  min-height: 100vh;
}

.main {
  margin: 3.125rem 2.8125rem 1.875rem;
  display: grid;
  grid-column-gap: 5.625rem;
  grid-template-columns: 1fr 1fr;
}
</style>
