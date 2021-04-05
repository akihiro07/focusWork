<template>
  <div>
    <ATitle :class="$style.titleComponent">Search</ATitle>

    <MInput :class="$style.inputBox" text="search" />

    <div :class="$style.contentBox">
      <template v-for="item in searchTracks">
        <MMusicItem
          :isPlaylist="isPlaylist"
          :key="item.track.id"
          :name="item.track.name"
          :artist="item.track.artists[0].name"
          :image="item.track.album.images[0].url"
          :time="item.track.duration_ms"
          :playbackFunc="playbackFunc"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    searchTracks: {
      type: Array as PropType<SpotifyApi.PlaylistTrackObject[] | []>,
      required: true
    },
    playbackFunc: {
      type: Function,
      default: () => {}
    },
    isPlaylist: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    return {}
  },
})
</script>

<style lang="scss" module>
.titleComponent {
  text-align: center;
}

.inputBox {
  margin-top: 1.625rem;
}

.contentBox {
  max-height: calc(100vh - 14rem);
  overflow: scroll;
  margin-top: 1rem;
  background-color: $bg-secondary;
  color: $white;
  border: 1px solid $border;
  padding: 1.25rem 0.75rem;
  font-size: 0.875rem;
  display: grid;
  grid-row-gap: 0.75rem;
}
</style>
