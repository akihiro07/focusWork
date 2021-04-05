<template>
  <div>
    <ATitle :class="$style.titleComponent">PlayList</ATitle>

    <MInput :class="$style.inputBox" text="save" />

    <div :class="$style.contentBox">
      <!-- TODO:ループで回す -->
      <template v-for="item in playlistTracks">
        <MMusicItem
          :key="item.track.id"
          :isPlaylist="isPlaylist"
          :name="item.track.name"
          :artist="item.track.artists[0].name"
          :image="item.track.album.images[0].url"
          :time="item.track.duration_ms"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    playlistTracks: {
      type: Array as PropType<SpotifyApi.PlaylistTrackObject[] | []>,
      required: true
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