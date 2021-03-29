<template>
  <div :class="$style.wrapper">
    <OSidebar />

    <div :class="$style.main">
      <OListBlock :playlistTracks="playlistTracks" />
      <OSearchBlock :searchTracks="searchTracks" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, useAsync, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { app } = useContext()
    const playlistTracks: Ref<SpotifyApi.PlaylistTrackObject[] | []> = ref([])
    const searchTracks: Ref<SpotifyApi.PlaylistTrackObject[] | []> = ref([])

    useAsync(async() => {
      try {
        const recommendTraks: SpotifyApi.PlaylistTrackObject[] = await app.$axios.$get('/api/reccomendList')
        searchTracks.value.splice(0, searchTracks.value.length+1, ...recommendTraks)
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

    return {
      playlistTracks,
      searchTracks
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
