<template>
  <div :class="$style.wrapper">
    <OSidebar  />

    <div :class="$style.main">
      <OListBlock />
      <OSearchBlock :tracks="tracks" />

      <button @click="test()">click</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { app } = useContext()
    const tracks: Ref<SpotifyApi.PlaylistTrackObject[]> = ref([])

    const test = async () => {
      try {
        const recommendTraks: SpotifyApi.PlaylistTrackObject[] = await app.$axios.$get('/api/reccomendList')
        tracks.value.splice(0, tracks.value.length+1, ...recommendTraks)
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
    }

    return {
      tracks,
      test
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
